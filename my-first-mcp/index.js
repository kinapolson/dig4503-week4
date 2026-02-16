// ===========================================
// My First MCP Server: Local File Reader
// ===========================================
// This server gives Claude Code the ability to read text files
// from a specific directory on your computer.
//
// MCP (Model Context Protocol) lets you extend Claude with
// custom tools. This file defines one tool: "read_local_file"
// ===========================================

import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import fs from "fs/promises";
import path from "path";
import { z } from "zod";

// -------------------------------------------
// CONFIGURATION
// -------------------------------------------
// Change this to the folder you want Claude to read files from.
// Only files inside this directory can be accessed (for safety).
const ALLOWED_DIRECTORY = path.resolve("./files");

// -------------------------------------------
// CREATE THE MCP SERVER
// -------------------------------------------
// This sets up a new MCP server with a name and version.
// Claude Code will see this name when it connects.
const server = new McpServer({
  name: "local-file-reader",
  version: "1.0.0",
});

// -------------------------------------------
// DEFINE THE "read_local_file" TOOL
// -------------------------------------------
// server.tool() registers a tool that Claude can call.
// It takes:
//   1. The tool name
//   2. A description (Claude reads this to know when to use it)
//   3. The input schema (what parameters the tool accepts)
//   4. A handler function (what happens when the tool is called)

server.tool(
  "read_local_file",
  "Reads a text file from the local files directory. Use this to access notes, configs, or data files.",
  {
    // The tool accepts one parameter: the filename to read
    filename: z.string().describe("The name of the file to read (e.g. 'notes.txt')"),
  },
  async ({ filename }) => {
    // --- Safety check: prevent reading files outside the allowed directory ---
    // path.resolve builds the full path, and we verify it stays within bounds.
    const filePath = path.resolve(ALLOWED_DIRECTORY, filename);

    if (!filePath.startsWith(ALLOWED_DIRECTORY)) {
      return {
        content: [
          {
            type: "text",
            text: `Error: Access denied. "${filename}" is outside the allowed directory.`,
          },
        ],
      };
    }

    // --- Try to read the file and return its contents ---
    try {
      const content = await fs.readFile(filePath, "utf-8");
      return {
        content: [
          {
            type: "text",
            text: content,
          },
        ],
      };
    } catch (error) {
      // If the file doesn't exist or can't be read, return a helpful error
      return {
        content: [
          {
            type: "text",
            text: `Error reading file "${filename}": ${error.message}`,
          },
        ],
      };
    }
  }
);

// -------------------------------------------
// START THE SERVER
// -------------------------------------------
// MCP servers communicate over "stdio" (standard input/output).
// Claude Code launches this script and talks to it through stdin/stdout.
async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error("Local File Reader MCP server is running!");
}

main();
