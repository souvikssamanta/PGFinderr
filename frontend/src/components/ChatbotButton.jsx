import { MessageCircle } from "lucide-react";
import { useChatbot } from "../context/ChatbotContext";
import { Button } from "./ui/button";

// components/Chatbot.js
export const ChatbotButton = () => {
  const { setIsChatOpen } = useChatbot();

  return (
    <Button
      onClick={() => setIsChatOpen(true)}
      className="fixed bottom-6 right-6 w-14 h-14 rounded-full shadow-lg bg-blue-600 hover:bg-blue-700 z-40"
      size="icon"
    >
      <MessageCircle className="h-6 w-6" />
    </Button>
  );
};
