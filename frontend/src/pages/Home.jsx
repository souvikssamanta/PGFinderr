
import React from 'react'
import Navbar from '../components/Navbar.jsx'

import Footer from './footer.jsx'
import Navbar2 from '../components/Navbar2.jsx'
import { useContext } from 'react'
import { listingDataContext } from '../context/ListingContext.jsx'
import Card from '../components/Card.jsx'
import Hero from '@/components/Hero.jsx'
import FooterCard from '@/components/Footer.jsx'
import AllCards from '@/components/AllCards.jsx'
import VideoShowcase from '@/components/VideoShowcase.jsx'
import FAQ from '@/components/Faq.jsx'
import { ChatbotButton } from "../components/ChatbotButton";
import { useChatbot } from '../context/ChatbotContext.jsx'
import Chatbot from '../components/Chatbot.jsx'

const Home = () => {
const {listingData,setListingData}=useContext(listingDataContext)
const { isChatOpen } = useChatbot();
  return (
    <div className="flex flex-col ">
      <Navbar />

      {/* <Hero /> */}
      <VideoShowcase />
      <AllCards listingData={listingData} />
      {/* <Navbar2 /> */}

      {/* <Footer/> */}
      <FooterCard />
      <ChatbotButton />
      {isChatOpen && <Chatbot />}
    </div>
  );
}

export default Home
