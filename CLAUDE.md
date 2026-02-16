# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a DIG4503 (Spring 2026) Week 4 assignment — a simple MCP (Model Context Protocol) server that gives Claude Code the ability to read local text files from a sandboxed directory.

## Architecture

- **`my-first-mcp/index.js`** — Single-file MCP server using `@modelcontextprotocol/sdk`. Exposes one tool: `read_local_file`, which reads files from `my-first-mcp/files/`. Uses ES modules (`"type": "module"` in package.json).
- **`my-first-mcp/files/`** — Sandboxed directory that the MCP server is allowed to read from. Contains sample files like `sample-notes.txt`.
- Communication happens over stdio (`StdioServerTransport`).

## Commands

```bash
# Install dependencies
cd my-first-mcp && npm install

# Run the MCP server
cd my-first-mcp && npm start    # or: node index.js
```

## Connecting to Claude Code

Register as an MCP server with:
```bash
claude mcp add local-file-reader node my-first-mcp/index.js
```
