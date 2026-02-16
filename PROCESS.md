What I Built:
I built my first mcp server with a local file reader tool that allows Claude to read text files from a specified directory on my computer. The main focus of the design was to read just from one directory to keep safe. Doing it this way limits the tool from opening files from anywhere on my computer. I also made it to only read .txt files to keep things simple as it was my first mcp server and tool creation. 

How Claude Code Helped:
-”Keep it simple - this is my first MCP server.” -> Made the tool simple and read files from selected directory.
-”claude mcp listr” -> Explained the connection and pathing issues.
These questions helped me tell Claude what I wanted in my project and understand the issues I was experiencing. 

Debugging Journey:
I experienced issues with wrong file paths. I incorrectly added my path that was not in accordance to Windows paths (which is what my system is running on). I also had my mcp code in a different folder, so it was not appearing inside my project. Once I removed and readded it to the correct path directory, it connected successfully. 

How MCP Works:
MCP is a way for AI to connect to other tools. It is like a USB plug that connects your input devices to your computer. The server uses the tool to perform a task and outputs the results.

What I’d Do Differently:
Next time, I would make sure I am in the correct directory path and adding them with the correct format to the system I am using.
