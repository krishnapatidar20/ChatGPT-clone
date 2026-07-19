-- CreateTable
CREATE TABLE "ConversationBranch" (
    "id" TEXT NOT NULL,
    "conversationId" TEXT NOT NULL,
    "name" TEXT NOT NULL DEFAULT 'New Branch',
    "parentMessageId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ConversationBranch_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "ConversationBranch_conversationId_idx" ON "ConversationBranch"("conversationId");

-- AddForeignKey
ALTER TABLE "ConversationBranch" ADD CONSTRAINT "ConversationBranch_conversationId_fkey" FOREIGN KEY ("conversationId") REFERENCES "Conversation"("id") ON DELETE CASCADE ON UPDATE CASCADE;
