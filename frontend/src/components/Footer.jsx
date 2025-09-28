import React from 'react'
import { Home, Phone, Mail, MapPin, Facebook, Instagram, Twitter } from "lucide-react";
const FooterCard = () => {
  return (
    <div>
       <footer className="py-12 px-10 max-w-6xl mx-auto bg-white mb-4  mt-10">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                <div>
                  <div className="flex items-center space-x-2 mb-4">
                    <div className="w-8 h-8 bg-green-600 rounded-md flex items-center justify-center">
                      <Home className="h-5 w-5 text-white" />
                    </div>
                    <span className="text-xl font-bold">NestHub</span>
                  </div>
                  <p className="text-gray-600">
                    Your trusted platform for finding perfect PG accommodations for
                    students and working professionals.
                  </p>
                </div>
      
                {[
                  {
                    title: "Quick Links",
                    links: [
                      "Find PG",
                      "List Property",
                      "How It Works",
                      "Testimonials",
                    ],
                  },
                  {
                    title: "Support",
                    links: ["Help Center", "Safety Tips", "Contact Us", "FAQ"],
                  },
                  {
                    title: "Contact",
                    links: [
                      { icon: <Phone className="h-4 w-4" />, text: "+91 9876543210" },
                      {
                        icon: <Mail className="h-4 w-4" />,
                        text: "hello@nesthub.com",
                      },
                      {
                        icon: <MapPin className="h-4 w-4" />,
                        text: "Bangalore, India",
                      },
                    ],
                  },
                ].map((section, index) => (
                  <div key={index}>
                    <h3 className="font-semibold mb-4">{section.title}</h3>
                    <ul className="space-y-2">
                      {section.links.map((link, i) => (
                        <li key={i}>
                          {typeof link === "string" ? (
                            <a
                              href="#"
                              className="text-gray-600 hover:text-green-600 text-sm"
                            >
                              {link}
                            </a>
                          ) : (
                            <div className="flex items-center space-x-2 text-gray-600 text-sm">
                              {link.icon}
                              <span>{link.text}</span>
                            </div>
                          )}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
      
              <div className="border-t mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
                <p className="text-gray-600 text-sm">
                  © 2025 NestHub. All rights reserved.
                </p>
                <div className="flex space-x-4 mt-4 md:mt-0">
                  <a href="#" className="text-gray-400 hover:text-green-600">
                    <Facebook className="h-5 w-5" />
                  </a>
                  <a href="#" className="text-gray-400 hover:text-green-600">
                    <Instagram className="h-5 w-5" />
                  </a>
                  <a href="#" className="text-gray-400 hover:text-green-600">
                    <Twitter className="h-5 w-5" />
                  </a>
                </div>
              </div>
            </footer>
    </div>
  )
}

export default FooterCard
