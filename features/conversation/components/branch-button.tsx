"use client";

import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { GitBranch } from "lucide-react";

import { branchConversation } from "@/features/conversation/actions/conversation-actions";
import { Button } from "@/components/ui/button";

type Props = {
  conversationId: string;
  messageId: string;
};

export function BranchButton({
  conversationId,
  messageId,
}: Props) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  return (
    <Button
  variant="ghost"
  size="icon"
  className="
h-8 w-8
rounded-full
text-amber-500
hover:bg-amber-500/20
hover:text-yellow-300
hover:shadow-[0_0_15px_rgba(245,158,11,0.35)]
transition-all
"
>
  <GitBranch
    className="h-4 w-4 transition-transform group-hover:rotate-15"
/>
</Button>
  );
}