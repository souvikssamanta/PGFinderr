import React, { useState } from "react";
import {
  ChevronDown,
  ChevronUp,
  HelpCircle,
  MessageCircle,
  Phone,
  Mail,
} from "lucide-react";

const FAQ = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const faqCategories = [
    {
      id: "booking",
      name: "Booking Process",
      icon: "📅",
      questions: [
        {
          question: "How do I book a PG or flat through your platform?",
          answer:
            "Booking is simple! Browse properties, select your preferred one, click 'Book Now', fill in your details, and pay the security deposit. You'll receive confirmation within 2 hours.",
        },
        {
          question: "What documents are required for booking?",
          answer:
            "You'll need a government-issued ID (Aadhar, PAN, or Driver's License), address proof, and 2 passport-size photographs. For students, college ID is additionally required.",
        },
        {
          question: "Can I visit the property before booking?",
          answer:
            "Absolutely! We encourage property visits. You can schedule a visit directly through our platform, and our representative will accompany you for a guided tour.",
        },
      ],
    },
    {
      id: "payment",
      name: "Payments & Pricing",
      icon: "💰",
      questions: [
        {
          question: "What is included in the rent amount?",
          answer:
            "Rent typically includes maintenance, water charges, and basic amenities. Electricity bills are usually extra and charged based on meter reading. Specific inclusions are mentioned in each property listing.",
        },
        {
          question: "What is the security deposit amount?",
          answer:
            "Security deposit is usually equivalent to 1-2 months' rent, refundable at the time of vacating after deducting any damages or pending bills.",
        },
        {
          question: "Are there any hidden charges?",
          answer:
            "No hidden charges! All costs are transparently displayed during booking. Brokerage fees are clearly mentioned, and we don't charge any platform fees from tenants.",
        },
      ],
    },
    {
      id: "properties",
      name: "Property Details",
      icon: "🏠",
      questions: [
        {
          question: "How do I verify property details and amenities?",
          answer:
            "All properties undergo a 3-step verification process: document verification, physical inspection, and amenity validation. You can also check verified photos and read genuine tenant reviews.",
        },
        {
          question: "What amenities can I expect in PG accommodations?",
          answer:
            "Standard amenities include WiFi, housekeeping, meals, laundry, security, and common areas. Premium PGs may offer AC, gym, parking, and recreational facilities.",
        },
        {
          question: "Are the properties pet-friendly?",
          answer:
            "This varies by property. Look for the 'Pet-Friendly' badge in listings, or use our pet-friendly filter to find suitable accommodations.",
        },
      ],
    },
    {
      id: "support",
      name: "Support & Services",
      icon: "🛡️",
      questions: [
        {
          question: "What support do you provide after moving in?",
          answer:
            "We offer 24/7 customer support for any issues. Our dedicated relationship manager will assist with maintenance requests, roommate conflicts, and any other concerns.",
        },
        {
          question: "How do I handle maintenance issues?",
          answer:
            "Report issues through our app/website, and we'll coordinate with the property owner. Emergency services are available 24/7 for urgent repairs.",
        },
        {
          question: "Can I transfer to another property if unsatisfied?",
          answer:
            "Yes! We offer a hassle-free transfer program within the first 15 days if you're unsatisfied with your current accommodation (terms and conditions apply).",
        },
      ],
    },
  ];

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className="bg-gradient-to-br from-gray-50 to-blue-50 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
            <HelpCircle className="w-8 h-8 text-blue-600" />
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Find quick answers to common questions about booking PG
            accommodations, flats, and our services. Can't find what you're
            looking for? Contact our support team.
          </p>
        </div>

        {/* Stats Bar */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          <div className="bg-white rounded-2xl p-6 text-center shadow-sm border border-gray-100">
            <div className="text-3xl font-bold text-blue-600">10K+</div>
            <div className="text-gray-600">Happy Tenants</div>
          </div>
          <div className="bg-white rounded-2xl p-6 text-center shadow-sm border border-gray-100">
            <div className="text-3xl font-bold text-green-600">24/7</div>
            <div className="text-gray-600">Customer Support</div>
          </div>
          <div className="bg-white rounded-2xl p-6 text-center shadow-sm border border-gray-100">
            <div className="text-3xl font-bold text-purple-600">98%</div>
            <div className="text-gray-600">Satisfaction Rate</div>
          </div>
          <div className="bg-white rounded-2xl p-6 text-center shadow-sm border border-gray-100">
            <div className="text-3xl font-bold text-orange-600">15min</div>
            <div className="text-gray-600">Avg Response Time</div>
          </div>
        </div>

        {/* FAQ Categories */}
        <div className="space-y-8">
          {faqCategories.map((category, categoryIndex) => (
            <div
              key={category.id}
              className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden"
            >
              {/* Category Header */}
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 px-6 py-4 border-b">
                <div className="flex items-center">
                  <span className="text-2xl mr-3">{category.icon}</span>
                  <h3 className="text-xl font-semibold text-gray-900">
                    {category.name}
                  </h3>
                </div>
              </div>

              {/* Questions */}
              <div className="divide-y divide-gray-100">
                {category.questions.map((item, questionIndex) => {
                  const index = `${categoryIndex}-${questionIndex}`;
                  const isActive = activeIndex === index;

                  return (
                    <div key={index} className="transition-all duration-200">
                      <button
                        onClick={() => toggleFAQ(index)}
                        className="w-full px-6 py-4 text-left hover:bg-gray-50 transition-colors duration-200 flex justify-between items-center"
                      >
                        <span className="text-lg font-medium text-gray-900 pr-4">
                          {item.question}
                        </span>
                        <div className="flex-shrink-0 ml-2">
                          {isActive ? (
                            <ChevronUp className="w-5 h-5 text-blue-600" />
                          ) : (
                            <ChevronDown className="w-5 h-5 text-gray-400" />
                          )}
                        </div>
                      </button>

                      {isActive && (
                        <div className="px-6 pb-4">
                          <div className="prose prose-blue max-w-none">
                            <p className="text-gray-700 leading-relaxed">
                              {item.answer}
                            </p>
                          </div>

                          {/* Additional Resources */}
                          <div className="mt-4 flex flex-wrap gap-2">
                            <button className="text-sm bg-blue-50 text-blue-700 px-3 py-1 rounded-full hover:bg-blue-100 transition-colors">
                              Related Properties
                            </button>
                            <button className="text-sm bg-green-50 text-green-700 px-3 py-1 rounded-full hover:bg-green-100 transition-colors">
                              Download Guide
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Still Have Questions Section */}
        <div className="mt-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-white">
          <div className="max-w-4xl mx-auto text-center">
            <h3 className="text-3xl font-bold mb-4">Still have questions?</h3>
            <p className="text-blue-100 text-lg mb-8">
              Our support team is here to help you find the perfect
              accommodation
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="flex flex-col items-center p-4">
                <div className="w-12 h-12 bg-white bg-opacity-20 rounded-full flex items-center justify-center mb-3">
                  <MessageCircle className="w-6 text-black h-6" />
                </div>
                <h4 className="font-semibold mb-2">Live Chat</h4>
                <p className="text-blue-100 text-sm">Instant help 24/7</p>
                <button className="mt-3 bg-white text-blue-600 px-4 py-2 rounded-lg font-medium hover:bg-gray-100 transition-colors">
                  Start Chat
                </button>
              </div>

              <div className="flex flex-col items-center p-4">
                <div className="w-12 h-12 bg-white bg-opacity-20 rounded-full flex items-center justify-center mb-3">
                  <Phone className="w-6 text-black h-6" />
                </div>
                <h4 className="font-semibold mb-2">Call Us</h4>
                <p className="text-blue-100 text-sm">+1 (555) 123-4567</p>
                <button className="mt-3 bg-white text-blue-600 px-4 py-2 rounded-lg font-medium hover:bg-gray-100 transition-colors">
                  Call Now
                </button>
              </div>

              <div className="flex flex-col items-center p-4">
                <div className="w-12 h-12 bg-white bg-opacity-20  rounded-full flex items-center justify-center mb-3">
                  <Mail className="w-6 text-black  h-6" />
                </div>
                <h4 className="font-semibold mb-2">Email Us</h4>
                <p className="text-blue-100 text-sm">support@NestHub.com</p>
                <button className="mt-3 bg-white text-blue-600 px-4 py-2 rounded-lg font-medium hover:bg-gray-100 transition-colors">
                  Send Email
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Help Cards */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 text-center hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">📋</span>
            </div>
            <h4 className="font-semibold mb-2">Booking Guide</h4>
            <p className="text-gray-600 text-sm">
              Step-by-step booking process
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 text-center hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">⚖️</span>
            </div>
            <h4 className="font-semibold mb-2">Rental Agreement</h4>
            <p className="text-gray-600 text-sm">Understand your rights</p>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 text-center hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">💰</span>
            </div>
            <h4 className="font-semibold mb-2">Payment Security</h4>
            <p className="text-gray-600 text-sm">Safe transaction process</p>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 text-center hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">🚚</span>
            </div>
            <h4 className="font-semibold mb-2">Moving Tips</h4>
            <p className="text-gray-600 text-sm">Smooth relocation guide</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FAQ;
