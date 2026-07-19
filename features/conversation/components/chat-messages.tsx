"use client";

import type { ChatStatus, UIMessage } from "ai";

import {
  Conversation,
  ConversationContent,
  ConversationScrollButton,
} from "@/components/ai-elements/conversation";
import {
  Message,
  MessageContent,
  MessageResponse,
} from "@/components/ai-elements/message";
import { Loader } from "@/components/ai-elements/loader";
import { ToolPart } from "@/features/ai/components/tool-part";

type ChatMessagesProps = {
  messages: UIMessage[];
  status: ChatStatus;
};

/**
 * Renders the conversation message list with markdown responses,
 * tool execution, and a loading indicator.
 */
export function ChatMessages({
  messages,
  status,
}: ChatMessagesProps) {
  const isWaiting =
    status === "submitted" &&
    messages.at(-1)?.role === "user";

  return (
    <Conversation>
      <ConversationContent className="py-8">
        {messages.map((message) => (
          <Message
            key={message.id}
            from={message.role}
          >
            <MessageContent>
              {message.parts.map((part, index) => {
    if (part.type === "text") {
      return (
        <MessageResponse key={index}>
          {part.text}
        </MessageResponse>
      );
    }

    return (
      <ToolPart
        key={index}
        part={part}
      />
    );
  })}
            </MessageContent>
          </Message>
        ))}

        {isWaiting && (
          <Message from="assistant">
            <MessageContent>
              <Loader />
            </MessageContent>
          </Message>
        )}
      </ConversationContent>

      <ConversationScrollButton />
    </Conversation>
  );
}