# n8n-nodes-vibetrack

![n8n Community Node](https://img.shields.io/badge/n8n-community--node-FF6D5A)
![Version](https://img.shields.io/badge/version-0.0.1-blue)
![License](https://img.shields.io/badge/license-MIT-green)

An n8n community node for the [Vibetrack](https://vibetrack.com) public API — read your projects and conversion events directly from your workflows.

---

## What is n8n?

[n8n](https://n8n.io) is a workflow automation tool that connects apps and APIs (Vibetrack, CRMs, Slack, databases, webhooks, …) so processes run automatically instead of by hand.

---

## Overview

Vibetrack is a conversion and ad-tracking platform. This node wraps its public API-key endpoints so you can:

- **List all projects** your API key has access to (id, name, plan type, domain, createdAt)
- **List all conversion events** defined for a given project (id, name)

The public Vibetrack API is intentionally small — this node matches it 1:1. Authentication is a single API key, nothing else.

---

## Operations

### Resource: Project
| Operation  | Description                                        |
| ---------- | -------------------------------------------------- |
| Get Many   | Lists all projects accessible via the API key      |

### Resource: Conversion Event
| Operation  | Description                                                |
| ---------- | ---------------------------------------------------------- |
| Get Many   | Lists all conversion events defined for a given project    |

The *Project* dropdown on "Get Many Conversion Events" is populated automatically, so you can pick a project by name instead of pasting its ID.

---

## Installation

### Requirements
- n8n **2.0.0** or higher
- A Vibetrack account with an **API key** (create one in your Vibetrack workspace settings)

### Install via Community Nodes

1. In n8n, open **Settings → Community Nodes**
2. Click **Install**
3. Enter one of the package names below
4. Restart n8n — the **Vibetrack** node will appear in the node panel

#### Option 1 – Scoped (recommended)

```
@rjsebening/n8n-nodes-vibetrack
```

#### Option 2 – Unscoped

```
n8n-nodes-vibetrack
```

---

## Credentials

Create a new credential of type **Vibetrack API**:

| Field        | Value                                        |
| ------------ | -------------------------------------------- |
| API Base URL | `https://app.vibetrack.com` (default)        |
| API Key      | Your personal Vibetrack API key              |

n8n injects the API key automatically on every call. On save, the credential is verified against the Vibetrack API.

---

## Example: fetch all conversion events of a project

1. Add a **Vibetrack** node
2. Select Resource **Project**, Operation **Get Many** → you get the list of projects
3. Add another **Vibetrack** node, Resource **Conversion Event**, Operation **Get Many**
4. Pick the project from the dropdown (or wire the ID from the previous node via an expression)
5. Execute — you receive an array like `[{ id, name }, …]`

---

## About the author

Built by [Rezk Jörg Sebening](https://github.com/rjsebening) — n8n, API and automation work for the DACH region. Follow on GitHub for more community nodes.

---

## Disclaimer

This is an **unofficial** community node. It is **not affiliated with, endorsed, or sponsored by Vibetrack**. It only provides an interface to the publicly available Vibetrack API under Vibetrack's terms of use.

- Maintained by the community
- For issues with the Vibetrack API itself, please contact Vibetrack directly
- All Vibetrack trademarks and logos belong to Vibetrack
