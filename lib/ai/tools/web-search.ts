import { tavily } from "@tavily/core";
import { tool } from "ai";
import { z } from "zod";

const client = tavily({
  apiKey: process.env.TAVILY_API_KEY!,
});

export const webSearchTool = tool({
  description: `
Search the live web for current information.

Use this tool whenever the user asks about:

- latest news
- current events
- today's information
- recent releases
- live data
- anything after your knowledge cutoff

Always return the freshest available information.
`,

  inputSchema: z.object({
    query: z.string().describe("The search query"),
  }),

  execute: async ({ query }) => {
  console.log("🔍 Web Search Tool Called:", query);

  const response = await client.search(query, {
    topic: "news",
    searchDepth: "advanced",
    maxResults: 5,
  });

  return {
    query,
    results: response.results.map((item) => ({
      title: item.title,
      content: item.content,
      url: item.url,
    })),
  };
},
});