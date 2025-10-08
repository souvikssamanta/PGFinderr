import React, { createContext, useState, useContext } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";


const ChatbotContext = createContext();

export const useChatbot = () => {
  const context = useContext(ChatbotContext);
  if (!context) {
    throw new Error("useChatbot must be used within a ChatbotProvider");
  }
  return context;
};

export const ChatbotProvider = ({ children }) => {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Hello! I'm your booking assistant. I can help you with hotel reservations, PG accommodations, flat bookings, or answer any questions about our services!",
      sender: "bot",
      timestamp: new Date(),
    },
  ]);
  const [isLoading, setIsLoading] = useState(false);

  // Initialize Gemini AI
  const genAI = new GoogleGenerativeAI(
    import.meta.env.VITE_GEMINI_KEY
  );

  const systemPrompt = `You are a helpful customer service assistant for a booking platform that offers Hotels, PG (Paying Guest), and Flats. Your role is to:

  1. Help users find suitable accommodations based on their needs
  2. Explain the booking process for different property types
  3. Answer questions about pricing, amenities, and locations
  4. Assist with booking modifications or cancellations
  5. Provide information about our services

  Important details about our platform:
  - Hotels: Daily booking with full payment online
  - PG accommodations: Monthly stays with ₹100 reservation fee
  - Flats: Long-term rentals with ₹100 reservation fee
  - We operate in major cities across India
  - All bookings include secure payment processing

  Be friendly, informative, and helpful. If you don't know something, suggest contacting customer support.`;

  const sendMessage = async (userMessage) => {
    // Add user message to chat
    const userMessageObj = {
      id: Date.now(),
      text: userMessage,
      sender: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessageObj]);
    setIsLoading(true);

    try {
      const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

      const chat = model.startChat({
        history: [
          {
            role: "user",
            parts: [{ text: systemPrompt }],
          },
        ],
      });

      const result = await chat.sendMessage(userMessage);
      const response = await result.response;
      const text = response.text();

      const botMessageObj = {
        id: Date.now() + 1,
        text: text,
        sender: "bot",
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, botMessageObj]);
    } catch (error) {
      console.error("Error calling Gemini API:", error);

      const errorMessageObj = {
        id: Date.now() + 1,
        text: "I'm sorry, I'm having trouble connecting right now. Please try again later or contact our customer support team for immediate assistance.",
        sender: "bot",
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, errorMessageObj]);
    } finally {
      setIsLoading(false);
    }
  };

  const clearChat = () => {
    setMessages([
      {
        id: 1,
        text: "Hello! I'm your booking assistant. I can help you with hotel reservations, PG accommodations, flat bookings, or answer any questions about our services!",
        sender: "bot",
        timestamp: new Date(),
      },
    ]);
  };

  const value = {
    isChatOpen,
    setIsChatOpen,
    messages,
    sendMessage,
    isLoading,
    clearChat,
  };

  return (
    <ChatbotContext.Provider value={value}>{children}</ChatbotContext.Provider>
  );
};
