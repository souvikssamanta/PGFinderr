
import React, { useState } from "react";
import {
  Bed,
  Phone,
  Mail,
  MapPin,
  Facebook,
  Twitter,
  Instagram,
  Youtube,
  CreditCard,
  ArrowRight,
  Send,
  Shield,
  Lock,
  Award,
  Heart,
} from "lucide-react";
import { motion } from "framer-motion";

const Footer = () => {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setTimeout(() => setSubscribed(false), 3000);
      setEmail("");
    }
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
      },
    },
  };

  const iconVariants = {
    hover: {
      scale: 1.2,
      rotate: 5,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 10,
      },
    },
  };

  const buttonVariants = {
    initial: { scale: 1 },
    hover: {
      scale: 1.05,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 10,
      },
    },
    tap: { scale: 0.95 },
  };

  return (
    <footer className="bg-gradient-to-b from-gray-900 to-gray-950 text-white overflow-hidden">
      {/* Decorative elements */}
      <div className="relative">
        <div className="absolute -top-20 left-1/4 w-72 h-72 bg-blue-600/10 rounded-full blur-3xl"></div>
        <div className="absolute -top-10 right-1/4 w-48 h-48 bg-purple-600/10 rounded-full blur-3xl"></div>
      </div>

      {/* Main footer content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative z-10">
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {/* Brand and description */}
          <motion.div className="lg:col-span-1" variants={itemVariants}>
            <motion.div
              className="flex items-center mb-4"
              whileHover={{ x: 5 }}
              transition={{ type: "spring", stiffness: 400 }}
            >
              <motion.div
                whileHover={{ rotate: 10 }}
                transition={{ type: "spring", stiffness: 400 }}
              >
                <Bed className="h-8 w-8 text-blue-400" />
              </motion.div>
              <span className="ml-2 text-2xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                LuxStay
              </span>
            </motion.div>
            <p className="text-gray-400 mb-6 leading-relaxed">
              Discover the perfect accommodation for your next trip. We offer
              the best hotels and resorts at competitive prices.
            </p>
            <div className="flex space-x-4">
              {[
                { icon: Facebook, color: "hover:text-blue-400" },
                { icon: Twitter, color: "hover:text-cyan-400" },
                { icon: Instagram, color: "hover:text-pink-400" },
                { icon: Youtube, color: "hover:text-red-400" },
              ].map((social, index) => (
                <motion.a
                  key={index}
                  href="#"
                  className="text-gray-400 bg-gray-800 p-2 rounded-full transition-colors duration-300"
                  variants={iconVariants}
                  whileHover="hover"
                  whileTap={{ scale: 0.9 }}
                >
                  <social.icon className="h-5 w-5" />
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div variants={itemVariants}>
            <h3 className="text-lg font-semibold mb-6 flex items-center">
              <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                Quick Links
              </span>
              <ArrowRight className="h-4 w-4 ml-2 text-blue-400" />
            </h3>
            <ul className="space-y-3">
              {["About Us", "Contact Us", "FAQs", "Blog", "Careers"].map(
                (link, index) => (
                  <motion.li
                    key={index}
                    whileHover={{ x: 5 }}
                    transition={{ type: "spring", stiffness: 500 }}
                  >
                    <a
                      href="#"
                      className="text-gray-400 hover:text-blue-400 transition-colors duration-300 flex items-center group"
                    >
                      <ArrowRight className="h-3 w-3 mr-2 text-blue-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                      {link}
                    </a>
                  </motion.li>
                )
              )}
            </ul>
          </motion.div>

          {/* Top Destinations */}
          <motion.div variants={itemVariants}>
            <h3 className="text-lg font-semibold mb-6 flex items-center">
              <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                Top Destinations
              </span>
              <MapPin className="h-4 w-4 ml-2 text-blue-400" />
            </h3>
            <ul className="space-y-3">
              {["Paris", "London", "New York", "Tokyo", "Dubai"].map(
                (city, index) => (
                  <motion.li
                    key={index}
                    whileHover={{ x: 5 }}
                    transition={{ type: "spring", stiffness: 500 }}
                  >
                    <a
                      href="#"
                      className="text-gray-400 hover:text-blue-400 transition-colors duration-300 flex items-center group"
                    >
                      <MapPin className="h-3 w-3 mr-2 text-blue-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                      {city}
                    </a>
                  </motion.li>
                )
              )}
            </ul>
          </motion.div>

          {/* Contact Information */}
          <motion.div variants={itemVariants}>
            <h3 className="text-lg font-semibold mb-6 flex items-center">
              <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                Contact Info
              </span>
              <Phone className="h-4 w-4 ml-2 text-blue-400" />
            </h3>
            <div className="space-y-4">
              <motion.div
                className="flex items-start group"
                whileHover={{ x: 5 }}
                transition={{ type: "spring", stiffness: 500 }}
              >
                <MapPin className="h-5 w-5 text-blue-400 mt-1 mr-3 flex-shrink-0" />
                <span className="text-gray-400 group-hover:text-blue-400 transition-colors">
                  123 Luxury Avenue, Hospitality District, HT 54321
                </span>
              </motion.div>
              <motion.div
                className="flex items-center group"
                whileHover={{ x: 5 }}
                transition={{ type: "spring", stiffness: 500 }}
              >
                <Phone className="h-5 w-5 text-blue-400 mr-3" />
                <span className="text-gray-400 group-hover:text-blue-400 transition-colors">
                  +1 (555) 123-4567
                </span>
              </motion.div>
              <motion.div
                className="flex items-center group"
                whileHover={{ x: 5 }}
                transition={{ type: "spring", stiffness: 500 }}
              >
                <Mail className="h-5 w-5 text-blue-400 mr-3" />
                <span className="text-gray-400 group-hover:text-blue-400 transition-colors">
                  info@luxstay.com
                </span>
              </motion.div>
            </div>

            {/* Newsletter Subscription */}
            <div className="mt-8">
              <h3 className="text-lg font-semibold mb-4">Newsletter</h3>
              <p className="text-gray-400 mb-4">
                Subscribe for exclusive offers
              </p>
              {subscribed ? (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-green-500/20 text-green-400 p-3 rounded-lg flex items-center"
                >
                  <Heart className="h-5 w-5 mr-2 fill-green-400" />
                  Thank you for subscribing!
                </motion.div>
              ) : (
                <form
                  onSubmit={handleSubscribe}
                  className="flex overflow-hidden rounded-lg bg-gray-800 border border-gray-700 focus-within:border-blue-400 transition-colors"
                >
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Your email"
                    className="px-4 py-3 w-full bg-transparent focus:outline-none text-white"
                    required
                  />
                  <motion.button
                    type="submit"
                    className="bg-gradient-to-r from-blue-600 to-cyan-600 px-4 flex items-center justify-center"
                    variants={buttonVariants}
                    whileHover="hover"
                    whileTap="tap"
                  >
                    <Send className="h-5 w-5" />
                  </motion.button>
                </form>
              )}
            </div>
          </motion.div>
        </motion.div>

        {/* Payment methods and trust badges */}
        <motion.div
          className="border-t border-gray-800 mt-12 pt-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          viewport={{ once: true }}
        >
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-6 md:mb-0">
              <h4 className="font-medium mb-3 text-gray-300">We Accept</h4>
              <div className="flex items-center space-x-3 bg-gray-800/50 p-3 rounded-xl">
                <CreditCard className="h-8 w-8 text-blue-400" />
                <span className="text-gray-400 text-sm">
                  All major credit cards
                </span>
              </div>
            </div>

            <div className="flex flex-wrap justify-center gap-3">
              {[
                { icon: Shield, text: "SSL Secured", color: "text-green-400" },
                {
                  icon: Lock,
                  text: "Privacy Protected",
                  color: "text-blue-400",
                },
                {
                  icon: Award,
                  text: "Best Price Guarantee",
                  color: "text-amber-400",
                },
              ].map((badge, index) => (
                <motion.div
                  key={index}
                  className="bg-gray-800/50 px-4 py-2 rounded-xl flex items-center space-x-2"
                  whileHover={{ y: -3 }}
                  transition={{ type: "spring", stiffness: 400 }}
                >
                  <badge.icon className={`h-5 w-5 ${badge.color}`} />
                  <span className="text-gray-300 text-sm">{badge.text}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>

      {/* Copyright section */}
      <motion.div
        className="bg-gray-950/80 py-6 backdrop-blur-sm"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        viewport={{ once: true }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-500 text-sm">
              © {new Date().getFullYear()} LuxStay. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-2 md:mt-0">
              {["Terms of Service", "Privacy Policy", "Cookie Policy"].map(
                (item, index) => (
                  <motion.a
                    key={index}
                    href="#"
                    className="text-gray-500 hover:text-blue-400 text-sm transition-colors"
                    whileHover={{ y: -2 }}
                  >
                    {item}
                  </motion.a>
                )
              )}
            </div>
          </div>
        </div>
      </motion.div>
    </footer>
  );
};

export default Footer;