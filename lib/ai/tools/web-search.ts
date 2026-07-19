import { tavily } from "@tavily/core";
import { tool } from "ai";
import { z } from "zod";

const client = tavily({
  apiKey: process.env.TAVILY_API_KEY!,
});

export const webSearchTool = tool({
  description:
    "Search the web for recent or factual information. Use this whenever the user's question requires up-to-date information or information outside the model's knowledge.",

  inputSchema: z.object({
    query: z.string().describe("The search query"),
  }),

  execute: async ({ query }) => {
    console.log("🔍 Web Search Tool Called:", query);
    const response = await client.search(query, {
      maxResults: 5,
      topic: "general",
    });

    return response.results.map((item) => ({
      title: item.title,
      url: item.url,
      content: item.content,
    }));
  },
});