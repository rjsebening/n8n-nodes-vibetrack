# n8n-nodes-vibetrack

![n8n Community Node](https://img.shields.io/badge/n8n-community--node-FF6D5A)
![Version](https://img.shields.io/badge/version-0.0.1-blue)
![License](https://img.shields.io/badge/license-MIT-green)

An n8n community node for the [Vibetrack](https://vibetrack.com) public API — read projects, triggers, conversions, and attribution data directly from your workflows.

---

## What is n8n?

[n8n](https://n8n.io) is a workflow automation tool that connects apps and APIs (Vibetrack, CRMs, Slack, databases, webhooks, …) so processes run automatically instead of by hand.

---

## Overview

Vibetrack is a conversion and ad-tracking platform. This node wraps the official Vibetrack API v1 so you can:

- **Validate API credentials** and retrieve the authenticated user metadata
- **List all projects** your API key has access to
- **List online conversions** with date range, trigger, email, limit, and offset filters
- **Create offline conversions** for active offline triggers
- **List online and offline conversion triggers** for a project
- **Aggregate attribution data** for campaign, ad set, or ad identifiers

The API version is part of the credential base URL, so future Vibetrack API versions can be configured without changing every node operation.

---

## Operations

### Resource: Project
| Operation  | Description                                        |
| ---------- | -------------------------------------------------- |
| Get Many   | Lists all projects accessible via the API key      |

### Resource: Auth
| Operation | Description                                      |
| --------- | ------------------------------------------------ |
| Validate  | Validates the API key and returns user metadata  |

### Resource: Conversion Triggers
| Operation        | Description                               |
| ---------------- | ----------------------------------------- |
| Get Many Online  | Lists active online conversion triggers   |
| Get Many Offline | Lists active offline conversion triggers  |

### Resource: Conversions
| Operation       | Description                                        |
| --------------- | -------------------------------------------------- |
| Get Many Online | Lists online conversions for a project and filters |
| Create Offline  | Sends one offline conversion                       |

### Resource: Attribution
| Operation | Description                                      |
| --------- | ------------------------------------------------ |
| Aggregate | Aggregates attribution data for selected IDs     |

Project and trigger dropdowns are populated automatically, so you can pick entries by name instead of pasting IDs. JSON fields such as metadata and attribution mappings accept JSON expressions or plain JSON objects.

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
| API Base URL | `https://api.vibetrack.com/api/v1` (default) |
| API Key      | Your personal Vibetrack API key              |

n8n sends the API key as `X-API-Key`. To switch to a future API version, update the API Base URL in the credential.

---

## Example: fetch online conversions of a project

1. Add a **Vibetrack** node
2. Select Resource **Project**, Operation **Get Many** → you get the list of projects
3. Add another **Vibetrack** node, Resource **Conversions**, Operation **Get Many Online**
4. Pick the project from the dropdown, choose a date range, and optionally filter by trigger or email
5. Execute — you receive the matching conversion records

---

## About the author

Built by [Rezk Jörg Sebening](https://github.com/rjsebening) — n8n, API and automation work for the DACH region. Follow on GitHub for more community nodes.

---

## Disclaimer

This is an **unofficial** community node. It is **not affiliated with, endorsed, or sponsored by Vibetrack**. It only provides an interface to the publicly available Vibetrack API under Vibetrack's terms of use.

- Maintained by the community
- For issues with the Vibetrack API itself, please contact Vibetrack directly
- All Vibetrack trademarks and logos belong to Vibetrack
