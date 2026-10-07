#!/usr/bin/env node
/**
 * Runs the exact rule set used by `npx @n8n/scan-community-package` against the local
 * working tree, without publishing to npm.
 *
 * The scanner's CLI only accepts a published package name (it requires npm provenance and a
 * reachable GitHub checkout), so it can never be run pre-publish. Its `analyzePackage()`
 * export, however, takes a local directory. Importing it means we inherit the scanner's exact
 * rule wiring instead of duplicating it in a hand-written flat config that would drift.
 *
 * The scanner is installed into an isolated tools directory rather than as a devDependency,
 * because it drags eslint 9 + a second TypeScript into the tree that `npm ci` builds and
 * publishes. The install is refreshed automatically whenever SCANNER_VERSION changes.
 *
 * Two legs, mirroring the scanner:
 *   source - package.json + {nodes,credentials} sources
 *   dist   - dist/ JS + package.json, i.e. what actually ends up in the npm tarball
 */
import { execFileSync } from 'node:child_process';
import { existsSync, mkdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const scriptDir = path.dirname(fileURLToPath(import.meta.url));
const packageDir = path.resolve(scriptDir, '..');
const toolsDir = path.join(scriptDir, '.scan-tools');

const SCANNER_VERSION = '0.38.0';

const TOOLS_MANIFEST = {
	name: 'vibetrack-scan-tools',
	private: true,
	description: 'Isolated install of the n8n community-package scanner. Not part of the package.',
	dependencies: {
		// Since 0.38.0 the scanner aliases typescript to @typescript/typescript6 itself, so the
		// former typescript@6 pin (to dodge its typescript@7 dependency) is no longer needed.
		'@n8n/scan-community-package': SCANNER_VERSION,
	},
};

const scannerDir = path.join(toolsDir, 'node_modules/@n8n/scan-community-package');
const scannerEntry = path.join(scannerDir, 'scanner/scanner.mjs');

function installedScannerVersion() {
	try {
		return JSON.parse(readFileSync(path.join(scannerDir, 'package.json'), 'utf8')).version;
	} catch {
		return undefined;
	}
}

const installedVersion = installedScannerVersion();

if (!existsSync(scannerEntry) || installedVersion !== SCANNER_VERSION) {
	console.log(
		installedVersion
			? `Updating the n8n community-package scanner ${installedVersion} -> ${SCANNER_VERSION} ...`
			: `Installing the n8n community-package scanner ${SCANNER_VERSION} into scripts/.scan-tools ...`,
	);
	rmSync(toolsDir, { recursive: true, force: true });
	mkdirSync(toolsDir, { recursive: true });
	writeFileSync(path.join(toolsDir, 'package.json'), `${JSON.stringify(TOOLS_MANIFEST, null, 2)}\n`);
	execFileSync('npm', ['install', '--silent', '--no-audit', '--no-fund'], {
		cwd: toolsDir,
		stdio: 'inherit',
	});
}

const { analyzePackage, SOURCE_FILE_PATTERNS } = await import(pathToFileURL(scannerEntry).href);

/**
 * The published scanner lints a fresh GitHub checkout, so anything git ignores
 * (scratch dirs, archived nodes) is invisible to it. Mirror that by listing
 * tracked plus untracked-but-not-yet-ignored sources - otherwise local-only
 * cruft reports violations that can never fail the real gate, while genuinely
 * new files still get checked. Falls back to the scanner's own globs outside
 * a git checkout.
 */
function sourceLegFiles() {
	try {
		const listed = execFileSync(
			'git',
			[
				'ls-files',
				'--cached',
				'--others',
				'--exclude-standard',
				'-z',
				'--',
				'package.json',
				'nodes',
				'credentials',
			],
			{ cwd: packageDir, encoding: 'utf8' },
		);
		const files = listed.split('\0').filter((file) => /\.(js|ts|json)$/.test(file));
		if (files.length) return files;
	} catch {
		// not a git checkout - fall through
	}
	return SOURCE_FILE_PATTERNS;
}

const legs = [['source', sourceLegFiles()]];

if (existsSync(path.join(packageDir, 'dist'))) {
	legs.push(['dist', ['dist/**/*.js', 'package.json']]);
} else {
	console.log('! dist/ not found - run `npm run build` first to also check the tarball leg');
}

let failed = false;

for (const [leg, patterns] of legs) {
	const result = await analyzePackage(packageDir, patterns);
	console.log(`--- ${leg} leg: ${result.passed ? 'PASS' : 'FAIL'}`);
	if (!result.passed) {
		failed = true;
		console.log(result.details ?? result.message);
	}
}

process.exit(failed ? 1 : 0);
