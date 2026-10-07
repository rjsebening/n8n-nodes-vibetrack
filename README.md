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

- **Retrieve authentication data** through the API Call resource
- **List all projects** your API key has access to (Editor rights or higher)
- **List online conversions** with date range, trigger, email, unique, limit, and offset filters
- **Create, list and get offline conversions** incl. UTM/VibeTrack campaign fields and click IDs
- **Create, get, update and list conversion triggers** (online page rules and offline triggers)
- **Manage domains** of a project and check the tracking installation
- **Manage Magic Links** on verified custom domains
- **Aggregate attribution data** for campaign, ad set, or ad identifiers
- **Manage outgoing webhooks** for conversion.created events
- **List, add, invite and remove team members** for project or workspace access
- **Start workflows from Vibetrack webhooks** with the Vibetrack Trigger node

---

## Operations

### Resource: Project
| Operation  | Description                                        |
| ---------- | -------------------------------------------------- |
| Get Many   | Lists all projects accessible via the API key      |

### Resource: API Call
| Operation               | Description                                      |
| ----------------------- | ------------------------------------------------ |
| Get Authentication Data | Returns user metadata for the current API key    |
| Make Request            | Makes a custom authenticated VibeTrack API call  |

### Resource: Conversion Triggers
| Operation        | Description                                                      |
| ---------------- | ---------------------------------------------------------------- |
| Create           | Creates an online trigger with a page rule or an offline trigger |
| Get              | Returns one trigger, including deactivated triggers              |
| Get Many         | Lists online and offline triggers (optionally incl. inactive)    |
| Get Many Offline | Lists active offline conversion triggers                         |
| Update           | Updates a trigger; set Active to false to deactivate it          |

### Resource: Conversions
| Operation        | Description                                                 |
| ---------------- | ----------------------------------------------------------- |
| Create Offline   | Sends one offline conversion                                |
| Get Many Offline | Lists offline conversions (trigger, status, external ID, date range) |
| Get Many Online  | Lists online conversions for a project and filters          |
| Get Offline      | Returns one offline conversion with all data                |

### Resource: Domain
| Operation      | Description                                                      |
| -------------- | ---------------------------------------------------------------- |
| Check Tracking | Checks that the VibeTrack tracker and cookie script are installed |
| Create         | Adds a website domain to a project                               |
| Get Many       | Lists the domains of a project                                   |

### Resource: Magic Link
| Operation | Description                                        |
| --------- | -------------------------------------------------- |
| Create    | Creates a Magic Link on a verified custom domain   |
| Get       | Returns one Magic Link                             |
| Get Many  | Lists all Magic Links of a project, newest first   |
| Update    | Updates a Magic Link; set Active to false to deactivate it |

### Resource: Attribution
| Operation | Description                                      |
| --------- | ------------------------------------------------ |
| Aggregate | Aggregates attribution data for selected IDs     |

### Resource: Team Member
| Operation     | Description                                              |
| ------------- | -------------------------------------------------------- |
| Add or Invite | Adds an existing user or sends an invitation             |
| Get Many      | Lists members and pending invitations                    |
| Remove        | Removes a user's access or revokes a pending invitation  |

### Resource: Webhooks
| Operation  | Description                           |
| ---------- | ------------------------------------- |
| Create     | Creates a project webhook endpoint (HTTPS, public address, no redirects) |
| Delete     | Deletes a project webhook endpoint    |
| Get        | Returns one webhook endpoint          |
| Get Many   | Lists project webhook endpoints       |
| Update     | Updates a project webhook endpoint    |

### Node: Vibetrack Trigger
Starts a workflow when Vibetrack sends a `conversion.created` webhook for a selected project.

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
| API Base URL | `https://api.vibetrack.com` (default)        |
| API Key      | Your personal Vibetrack API key              |

n8n sends the API key as `X-API-Key`. API paths include `/api/v1` as defined by the official OpenAPI specification.

---

## Example: fetch online conversions of a project

1. Add a **Vibetrack** node
2. Select Resource **Project**, Operation **Get Many** → you get the list of projects
3. Add another **Vibetrack** node, Resource **Conversions**, Operation **Get Many Online**
4. Pick the project from the dropdown, optionally choose a date range and filter by trigger or email. By default only unique conversions are returned (like in the VibeTrack app); disable **Unique Only** to get all conversions
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
