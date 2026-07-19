import { loadChatMessages, saveChatMessages } from "@/features/ai/actions/chat-store";
import { getChatModel } from "@/features/ai/utils/model";
import { requireUser } from "@/features/auth/action/require-user";
import { prisma } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { webSearchTool } from "@/lib/ai/tools/web-search";
import {
  convertToModelMessages,
  createIdGenerator,
  createUIMessageStreamResponse,
  streamText,
  toUIMessageStream,
  stepCountIs,
  type UIMessage,
} from "ai";/**
 * POST /api/chat — Streams an AI assistant reply for a conversation.
 *
 * Validates auth and ownership, persists the user message, then streams the
 * assistant response via the AI SDK. Final messages are saved when the stream ends.
 */
export async function POST(req: Request) {
    await auth.protect();

    const { message, id }: { message: UIMessage, id: string } = await req.json();

    if (!message || !id) {
        return new Response("Missing message or conversation id", { status: 400 });
    }

    const user = await requireUser();

    const conversation = await prisma.conversation.findFirst({
        where: {
            id,
            userId: user.id
        }
    });

    if (!conversation) {
        return new Response("Conversation not found", { status: 404 });
    }

    const previousMessages = await loadChatMessages(id);

    const alreadySaved = previousMessages.some(
        (storedMessage)=>storedMessage.id === message.id
    )

    const messages = alreadySaved ? previousMessages : [...previousMessages, message];

    if(!alreadySaved){
        await saveChatMessages(id, [message]);
    }

    const result = streamText({
  model: getChatModel(conversation.model),

  system:
  conversation.systemPrompt ??
  `
You are KGPT, a helpful AI assistant.

Only use the webSearch tool when the user explicitly needs live or current information.

Examples:
✅ Use web search:
- latest AI news
- today's weather
- current stock price
- India vs England live score
- today's date
- who won yesterday's match

❌ DO NOT use web search:
- explain Java
- what is React
- write code
- summarize this
- solve math
- explain algorithms
- history
- programming concepts
- interview questions

If your own knowledge is sufficient, answer directly without calling the tool.
`,

  messages: await convertToModelMessages(messages),

  tools: {
    webSearch: webSearchTool,
  },

  stopWhen: stepCountIs(5),
});

    result.consumeStream();

    return createUIMessageStreamResponse({
        stream:toUIMessageStream({
          stream:result.stream,
          originalMessages:messages,
          generateMessageId:createIdGenerator({prefix:"msg" , size:16}),
          onEnd:async({messages:finalMessages})=>{
            try {
                await saveChatMessages(id , finalMessages , {updateTitle:false})
            } catch (error) {
                console.error(error);
            }
          }
        })
    })

}