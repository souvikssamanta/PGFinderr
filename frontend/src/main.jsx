import { createContext, StrictMode, useContext } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import AuthContext from './context/AuthContext.jsx'
import { Toaster } from 'react-hot-toast'
import UserContext from './context/UserContext.jsx'
import ListingContext from './context/ListingContext.jsx'
import MyListContext from './context/MyListContext.jsx'
import BookingContext from './context/BookingContext.jsx'
import { ChatbotProvider, useChatbot } from "./context/ChatbotContext";
createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <AuthContext>
      <ListingContext>
        <MyListContext>
          <UserContext>
            <Toaster />
            <BookingContext>
              <ChatbotProvider>
                <App/>
              </ChatbotProvider>
            </BookingContext>
          </UserContext>
        </MyListContext>
      </ListingContext>
    </AuthContext>
  </BrowserRouter>
);
