


import React, { useState, useEffect } from "react";

const VideoShowcase = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

   const videos = [
     {
       id: 1,
       title: "Smart Living Spaces",
       description:
         "Discover our premium PG accommodations with modern amenities",
       duration: "1:45",
       views: "2.4K",
       likes: "1.2K",
       thumbnail:
         "https://images.unsplash.com/photo-1555854877-bab0e564b8d5?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
       videoUrl:
      
         "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
       category: "PG Tour",
       badge: "Popular",
     },
     {
       id: 2,
       title: "Luxury Apartments Tour",
       description:
         "Take a virtual tour of our fully furnished 2BHK apartments",
       duration: "2:30",
       views: "5.7K",
       likes: "3.1K",
       thumbnail:
         "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
       videoUrl:
         "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
       category: "Flat Tour",
       badge: "New",
     },
     {
       id: 3,
       title: "Student Hostel Life",
       description:
         "Experience the vibrant community life in our student hostels",
       duration: "1:15",
       views: "8.9K",
       likes: "4.5K",
       thumbnail:
         "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
       videoUrl:
         "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
       category: "Hostel",
       badge: "Trending",
     },
     {
       id: 4,
       title: "Working Professionals PG",
       description:
         "Perfect spaces for working professionals with premium facilities",
       duration: "2:15",
       views: "3.2K",
       likes: "1.8K",
       thumbnail:
         "https://images.unsplash.com/photo-1560185127-6ed189bf02f4?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
       videoUrl:
         "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
       category: "PG Tour",
       badge: "Featured",
     },
     {
       id: 5,
       title: "Family Apartments",
       description: "Spacious family apartments with security and amenities",
       duration: "3:20",
       views: "7.1K",
       likes: "3.9K",
       thumbnail:
         "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
       videoUrl:
         "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4",
       category: "Family Flat",
       badge: "Premium",
     },
   ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % videos.length);
    }, 7000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-gray-900 py-12 px-4">
      <div className="max-w-md mx-auto">
        <h2 className="text-3xl font-bold text-white text-center mb-8">
          Property Tours 📹
        </h2>

        <div className="relative h-80 rounded-2xl overflow-hidden">
          {videos.map((video, index) => (
            <div
              key={video.id}
              className={`absolute inset-0 transition-opacity duration-500 ${
                index === currentIndex ? "opacity-100" : "opacity-0"
              }`}
            >
              <div className="relative h-full">
                <video
                  className="w-full h-full object-cover"
                  poster={video.thumbnail}
                  muted
                  autoPlay
                  loop
                >
                  <source src={video.videoUrl} type="video/mp4" />
                </video>

                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-6">
                  <h3 className="text-white font-bold text-lg mb-2">
                    {video.title}
                  </h3>
                  <p className="text-gray-300 text-sm">{video.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-center mt-6 space-x-2">
          {videos.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-2 h-2 rounded-full transition-all ${
                currentIndex === index ? "bg-white w-6" : "bg-gray-600"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
export default VideoShowcase;


