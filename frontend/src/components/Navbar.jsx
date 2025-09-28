import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Menu,
  Bed,
  UserPen,
  Search,
  LogOut,
  Home,
  Calendar,
  Building,
  Utensils,
} from "lucide-react";
import { authDataContext } from "../context/AuthContext";
import axios from "axios";
import { toast } from "react-hot-toast";
import { userDataContext } from "../context/UserContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet";
import { listingDataContext } from "@/context/ListingContext";
import SearchBar from "./Serchbar";

export default function Navbar() {
  const { userData, setUserData } = useContext(userDataContext);
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const{allListingData}=useContext(listingDataContext)  
  const { serverUrl } = useContext(authDataContext);
  const { serchListing } = useContext(listingDataContext);
  const logoutHandler = async () => {
    try {
      const response = await axios.post(serverUrl + "/api/auth/logout", {
        withCredentials: true,
      });
      if (response.status === 201) {
        setUserData(null);
        toast.success("Logged out successfully");
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  // const handleSearch = (e) => {
  //   e.preventDefault();
  //   if (search.trim()) {
  //     navigate(`/search?q=${encodeURIComponent(search.trim())}`);
  //   }
  //   serchListing(search);
  // };
  // useEffect(() => {
  //   handleSearch();
  // },[search])

  return (
    <div className="flex flex-col sticky top-0 z-50 bg-transparent border-b shadow-sm">
      {/* Main Navbar */}
      <nav className="w-full px-4 py-3 flex items-center justify-between bg-white">
        {/* Logo + Name */}
        <div
          className="flex items-center gap-2 cursor-pointer"
          onClick={() => navigate("/")}
        >
          <div className="w-8 h-8 bg-green-600 rounded-md flex items-center justify-center">
            <Building className="h-5 w-5 text-white" />
          </div>
          <span className="ml-2 text-xl font-bold text-gray-800">NestHub</span>
        </div>

        {/* Search Bar - Desktop */}


        <div className="hidden md:block flex-1 mx-6">
          <SearchBar allListingData={allListingData} />
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-4">
          <Button
            onClick={() => navigate("/listingpage1")}
            variant="outline"
            className="hidden sm:flex rounded-full border-green-600 text-green-600 hover:bg-green-50 hover:text-green-700"
          >
            <Home className="mr-2 h-4 w-4 text-black" />
            List Your Property
          </Button>
          <Button
            onClick={() => navigate("/mybookings")}
            variant="outline"
            className="hidden sm:flex rounded-full border-green-600 text-green-600 hover:bg-green-50 hover:text-green-700"
          >
            <Calendar className="mr-2 text-fuchsia-600 h-4 w-4" />
            MyBokings
          </Button>
          <Button
            onClick={() => navigate("/mylistings")}
            variant="outline"
            className="hidden sm:flex rounded-full border-green-600 text-green-600 hover:bg-green-50 hover:text-green-700"
          >
            <Building className="mr-2 text-amber-400 h-4 w-4" />
            MyListings
          </Button>

          {/* User Menu */}
          <div className="hidden md:block">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  className="rounded-full h-10 w-10 p-0"
                >
                  {userData?.name ? (
                    <span className="text-sm font-semibold">
                      {userData.name.charAt(0).toUpperCase()}
                    </span>
                  ) : (
                    <UserPen className="h-4 w-4" />
                  )}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                {!userData ? (
                  <DropdownMenuItem onClick={() => navigate("/login")}>
                    <UserPen className="mr-2 h-4 w-4" />
                    <span>Login / Sign Up</span>
                  </DropdownMenuItem>
                ) : (
                  <>
                    <DropdownMenuItem className="text-sm font-medium text-gray-600 cursor-default">
                      Hi, {userData.name}
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={logoutHandler}>
                      <LogOut className="mr-2 h-4 w-4" />
                      <span>Logout</span>
                    </DropdownMenuItem>
                  </>
                )}
                
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          {/* Mobile Menu */}
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="md:hidden">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-64">
              <div className="mt-8 flex flex-col space-y-4">
                {!userData ? (
                  <SheetClose asChild>
                    <Button
                      onClick={() => navigate("/login")}
                      variant="outline"
                      className="justify-start"
                    >
                      <UserPen className="mr-2 h-4 w-4" />
                      Login / Sign Up
                    </Button>
                  </SheetClose>
                ) : (
                  <SheetClose asChild>
                    <Button
                      onClick={logoutHandler}
                      variant="outline"
                      className="justify-start"
                    >
                      <LogOut className="mr-2 text-red-500 h-4 w-4" />
                      Logout
                    </Button>
                  </SheetClose>
                )}
                <SheetClose asChild>
                  <Button
                    onClick={() => navigate("/listingpage1")}
                    variant="outline"
                    className="justify-start"
                  >
                    <Home className="mr-2 text-pink-500 h-4 w-4" />
                    List Your Property
                  </Button>
                </SheetClose>
                {userData && (
                  <>
                    <SheetClose asChild>
                      <Button
                        onClick={() => navigate("/mylisting")}
                        variant="outline"
                        className="justify-start"
                      >
                        <Building className="mr-2 text-amber-400 h-4 w-4" />
                        My Listings
                      </Button>
                    </SheetClose>
                    <SheetClose asChild>
                      <Button
                        onClick={() => navigate("/mybookings")}
                        variant="outline"
                        className="justify-start"
                      >
                        <Calendar className="mr-2 text-green-400 h-4 w-4" />
                        My Bookings
                      </Button>
                    </SheetClose>
                  </>
                )}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </nav>

      {/* Mobile Search Bar */}
      <div className="md:hidden p-2  bg-white border-t">
  
        <SearchBar className="w-2/3 mx-auto" allListingData={allListingData} />
      </div>
    </div>
  );
}
