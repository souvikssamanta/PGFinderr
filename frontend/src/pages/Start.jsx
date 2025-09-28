
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Home,
  Utensils,
  Wifi,
  Shield,
  Star,
  MapPin,
  Users,
  Calendar,
  Phone,
  Mail,
  Search,
  Facebook,
  Instagram,
  Twitter,
  ArrowRight,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import Footer from "@/components/Footer";
import FooterCard from "@/components/Footer";
import FAQ from "@/components/Faq";
const PGHomePage = () => {
  const navigate=useNavigate();
  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-green-50">
      {/* Navigation */}
      <nav className="flex items-center justify-between p-6 max-w-6xl mx-auto">
        <div className="flex items-center space-x-2 cursor-pointer">
          <div className="w-8 h-8 bg-green-600 rounded-md flex items-center justify-center">
            <Home className="h-5 w-5 text-white" />
          </div>
          <span className="text-xl font-bold">NestHub</span>
        </div>

        <div className="hidden md:flex space-x-6">
          <a href="#listings" className="text-gray-600 hover:text-green-600">
            Find Accomodation
          </a>
          <a
            href="#how-it-works"
            className="text-gray-600 hover:text-green-600"
          >
            How It Works
          </a>
          <a
            href="#testimonials"
            className="text-gray-600 hover:text-green-600"
          >
            Testimonials
          </a>
          <a href="#contact" className="text-gray-600 hover:text-green-600">
            Contact
          </a>
        </div>

        <div className="flex items-center space-x-4">
          <Button
            variant="ghost"
            onClick={() => navigate("/login")}
            className=" md:block"
          >
            Login
          </Button>
          <Button
            onClick={() => navigate("/signup")}
            className="bg-green-600 hover:bg-green-700"
          >
            Signup
          </Button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="py-16 px-6 max-w-6xl mx-auto">
        <div className="flex flex-col items-center text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
            Find Your Perfect
            <span className="text-green-600"> Accommodation</span>
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mb-10">
            Discover affordable, comfortable, and verified PG options for
            students and working professionals. Your ideal living space is just
            a search away.
          </p>
          <div className="flex  sm:flex-row gap-10 px-8  max-w-md">
            <Button
              onClick={() => navigate("/login")}
              variant="outline"
              className="bg-white border-green-600 text-green-600 hover:bg-green-50"
            > Let's Get Started
            </Button>
            
            <Button className="bg-green-600 hover:bg-green-700">
             
              Watch Demo
            </Button>
          </div>
          <div className="flex flex-wrap justify-center gap-4 mt-6">
            {[
              "Near Colleges",
              "For Professionals",
              "With Food",
              "AC Available",
            ].map((tag, index) => (
              <span
                key={index}
                className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Listings Section */}
      <section id="listings" className="py-5 px-6 max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">
            Some Demo Listings
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Handpicked accommodations with verified amenities and trusted hosts
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              title: "Premium PG for Working Professionals",
              img: "https://images.unsplash.com/photo-1633545923722-83621046b261?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fGZsYXRzfGVufDB8fDB8fHww",
              desc: "Spacious rooms with attached bathroom, high-speed WiFi, and housekeeping. Perfect for working professionals.",
              price: "₹12,000/month",
              features: ["AC", "WiFi", "Food", "Laundry"],
            },
            {
              title: "Student Friendly PG",
              img: "https://images.unsplash.com/photo-1566117997047-d239edea81c0?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8ZmxhdCUyMGJhY2tncm91bmR8ZW58MHx8MHx8fDA%3D",
              desc: "Affordable accommodation near college areas with study-friendly environment and meal options.",
              price: "₹8,000/month",
              features: ["WiFi", "Food", "Study Room", "Security"],
            },
            {
              title: "Luxury PG with All Amenities",
              img: "https://images.unsplash.com/photo-1643828302859-026168101b7f?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8ZmxhdHN8ZW58MHx8MHx8fDA%3D",
              desc: "Premium accommodation with gym access, gaming zone, and premium food options. All utilities included.",
              price: "₹15,000/month",
              features: ["AC", "Gym", "Premium Food", "Entertainment"],
            },
          ].map((pg, index) => (
            <Card
              key={index}
              className="border-none shadow-md hover:shadow-lg transition-shadow overflow-hidden group cursor-pointer"
            >
              <div className="h-48 bg-gradient-to-r from-green-100 to-blue-100 relative">
                <div className="absolute top-4 left-4 bg-green-600 text-white px-3 py-1 rounded-full text-sm">
                  Verified
                </div>
                <div className="absolute bottom-4 right-4 flex items-center text-yellow-500">
                  <Star className="h-4 w-4 fill-current" />
                  <span className="ml-1 text-sm">4.8</span>
                </div>
                <img className="h-48 w-full object-cover" src={pg.img} alt="" />
              </div>
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-2">{pg.title}</h3>
                <p className="text-gray-600 mb-4 text-sm">{pg.desc}</p>

                <div className="flex flex-wrap gap-2 mb-4">
                  {pg.features.map((feature, i) => (
                    <span
                      key={i}
                      className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded"
                    >
                      {feature}
                    </span>
                  ))}
                </div>

              
              </CardContent>
            </Card>
          ))}
        </div>

       
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-16 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              How It Works
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Find your perfect PG in just a few simple steps
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: <Search className="h-8 w-8 text-green-600" />,
                title: "Search",
                desc: "Browse through verified PG listings in your preferred location",
              },
              {
                icon: <Calendar className="h-8 w-8 text-green-600" />,
                title: "Visit & Book",
                desc: "Schedule visits and book your chosen accommodation",
              },
              {
                icon: <Shield className="h-8 w-8 text-green-600" />,
                title: "Move In",
                desc: "Secure booking with verified documentation and move in comfortably",
              },
            ].map((step, index) => (
              <div key={index} className="text-center p-6">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  {step.icon}
                </div>
                <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                <p className="text-gray-600">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-6 bg-green-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              Why Choose NestHub?
            </h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              {
                icon: <Shield className="h-6 w-6 text-green-600" />,
                name: "Verified Listings",
              },
              {
                icon: <Wifi className="h-6 w-6 text-green-600" />,
                name: "Amenities",
              },
              {
                icon: <Users className="h-6 w-6 text-green-600" />,
                name: "Trusted Community",
              },
              {
                icon: <MapPin className="h-6 w-6 text-green-600" />,
                name: "Prime Locations",
              },
              {
                icon: <Utensils className="h-6 w-6 text-green-600" />,
                name: "Food Options",
              },
              {
                icon: <Star className="h-6 w-6 text-green-600" />,
                name: "Ratings & Reviews",
              },
              {
                icon: <Home className="h-6 w-6 text-green-600" />,
                name: "Various Types",
              },
              {
                icon: <Phone className="h-6 w-6 text-green-600" />,
                name: "24/7 Support",
              },
            ].map((feature, index) => (
              <div
                key={index}
                className="flex flex-col items-center p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-3">
                  {feature.icon}
                </div>
                <span className="font-medium text-sm text-center">
                  {feature.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
     
            <FAQ/>
      {/* Footer */}
      <FooterCard/>
    
    </div>
  );
};

export default PGHomePage;