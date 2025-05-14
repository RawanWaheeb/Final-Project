"use client";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ShoppingCart, Heart, ScanLine, Menu, X, User, LogOut } from "lucide-react";
import logo from "../../assets/images/logo.png"; 
import axios from "axios";


export default function NavbarAfterAuth() {
  const [isOpen, setIsOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [profileImage, setProfileImage] = useState("/default-profile.png");
  const [activeLink, setActiveLink] = useState(""); 
  const [selectedImage, setSelectedImage] = useState(null);
  const [reviewContent, setReviewContent] = useState("");
  const [reviews, setReviews] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const fetchProfileImage = async () => {
      const accessToken = localStorage.getItem("accessToken");
      if (accessToken) {
        try {
          const response = await fetch("http://3.208.171.32/api/profile/", {
            method: "GET",
            headers: {
              Authorization: `Bearer ${accessToken}`,
              "Content-Type": "application/json",
            },
          });

          if (response.ok) {
            const data = await response.json();
            setProfileImage(data.image || "/default-profile.png");
            localStorage.setItem("profileImage", data.image);
          }
        } catch (error) {
          console.error("Error fetching profile image:", error);
        }
      }
    };

    fetchProfileImage();
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    setIsDropdownOpen(false);
    window.dispatchEvent(new Event("authChange"));
    setTimeout(() => {
      window.location.replace("/login");
    }, 100);
  };
  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("accessToken");

    const formData = new FormData();
    formData.append("review", reviewContent);
    if (selectedImage) {
      formData.append("image", selectedImage);
    }

    try {
      const response = await axios.post(
        "http://3.208.171.32/api/reviews/",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setIsModalOpen(false);
      setReviewContent("");
      setSelectedImage(null);

      const updatedReviews = await axios.get("http://3.208.171.32/api/reviews/");
      setReviews(updatedReviews.data);
    } catch (error) {
      console.error("Error submitting review:", error);
    }
  };

  const menuItems = [
    { name: "Home", action: () => { navigate("/");  }},
    { name: "Shop", action: () => { navigate("/Products");  }},
    { name: "Community", action: () => { navigate("/community"); ; }},
    { name: "About Us", action: () => { navigate("/", { state: { scrollTo: "about_us" } });  }},
    { name: "Review", action: () => setIsModalOpen(true) },
  ];

  return (
    <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${isScrolled ? "bg-white shadow-md" : "bg-transparent"}`}>
      <div className="container mx-auto flex justify-between items-center px-6 py-4">
    
        <div className="hidden xl:flex items-center gap-10">
          {[ 
            { icon: <ShoppingCart size={20} />, text: "Cart", action: () => navigate("/cart") },
            { icon: <Heart size={20} />, text: "Wishlist", action: () => navigate("/wishlist") },
            { icon: <ScanLine size={20} />, text: "Scanner", action: () => navigate("/ai_help") },
          ].map((item, index) => (
            <div
              key={index}
              onClick={item.action}
              className="flex items-center gap-2 cursor-pointer transform transition-transform hover:scale-105"
            >
              <div className="p-2 bg-primary-buttons text-white rounded-full">
                {item.icon}
              </div>
              <span className="text-gray-700 font-medium">{item.text}</span>
            </div>
          ))}
        </div>

     
        <div className="flex justify-start xl:justify-center flex-1" style={{ position: 'relative', zIndex: 10 }}>
        <img src={logo} alt="GroVana Logo" className="h-12 md:h-16 cursor-pointer"  onClick={() => navigate("/")} />
        </div>

        
        <div className="hidden xl:flex items-center gap-6 text-gray-700 font-semibold">
          {menuItems.map((item, index) => (
            <button
              key={index}
              onClick={item.action}
              className={`hover:text-primary-buttons transition duration-300 
                ${activeLink === item.name.toLowerCase() ? "border-b-2 border-primary-buttons" : ""}`}
            >
              {item.name}
            </button>
          ))}

       
          <div className="relative">
            <img src={profileImage} alt="Profile" className="w-10 h-10 rounded-full cursor-pointer hover:scale-110 transition" onClick={() => setIsDropdownOpen(!isDropdownOpen)} />
            {isDropdownOpen && (
              <div className="absolute right-0 mt-2 w-44 bg-white shadow-md rounded-lg overflow-hidden border border-gray-200">
                <button onClick={() => navigate("/profile")} className="flex items-center gap-3 px-4 py-3 text-primary-buttons  hover:bg-primary w-full text-left">
                  <User size={18} /> Profile
                </button>
                <button onClick={handleLogout} className="flex w-full items-center gap-3 px-4 py-3 text-red-600 hover:bg-gray-100 transition">
                  <LogOut size={18} /> Logout
                </button>
              </div>
            )}
          </div>
        </div>

       
        <div className="xl:hidden flex items-center">
          <button onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

 
      {isOpen && (
        <div className="xl:hidden bg-white shadow-md absolute top-16 left-0 w-full flex flex-col items-center py-4 space-y-4">
          
          {menuItems.map((item, index) => (
            <button key={index} onClick={item.action} className="hover:text-primary-buttons transition py-2">
              {item.name}
            </button>
          ))}
          <button onClick={() => navigate("/profile")} className="hover:text-primary-buttons transition py-2">
            Profile
          </button>
          <button onClick={handleLogout} className="hover:text-red-600 transition py-2 text-red-600">
            Logout
          </button>
          <div className="flex items-center justify-between w-full px-6">
    {[
      { icon: <ShoppingCart size={20} />, text: "Cart", action: () => navigate("/cart") },
      { icon: <Heart size={20} />, text: "Wishlist", action: () => navigate("/wishlist") },
      { icon: <ScanLine size={20} />, text: "Scanner", action: () => navigate("/ai_help") },
    ].map((item, index) => (
      <div
        key={index}
        onClick={item.action}
        className="flex items-center gap-2 cursor-pointer transform transition-transform hover:scale-105 py-2"
      >
        <div className="p-2 bg-primary-buttons text-white rounded-full">
          {item.icon}
        </div>
        <span className="text-gray-700 font-medium">{item.text}</span>
      </div>
    ))}
  </div>
        </div>
      )}
      
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-3xl">
            <h2 className="text-2xl font-semibold mb-4">Submit a Review</h2>
<form onSubmit={handleReviewSubmit}>
  <textarea
    value={reviewContent}
    onChange={(e) => setReviewContent(e.target.value)}
    placeholder="Write your review..."
    className="w-full p-2 border rounded mb-4"
    required
  />
  <div className="mb-4">
    <label
      htmlFor="fileUpload"
      className="cursor-pointer bg-primary-main text-white px-4 py-2 rounded hover:bg-[#98CBB0]  transition-colors inline-block"
    >
      Upload Photo
    </label>
    <input
      id="fileUpload"
      type="file"
      accept="image/*"
      onChange={(e) => setSelectedImage(e.target.files[0])}
      className="hidden"
    />
  </div>

  <div className="flex justify-end gap-2">
    <button
      type="button"
      onClick={() => setIsModalOpen(false)}
      className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition-colors"
    >
      Cancel
    </button>

    <button
      type="submit"
      
      className="bg-primary-main text-white px-4 py-2 rounded hover:bg-[#98CBB0] transition-colors"

    >
      Submit
    </button>
  </div>
</form>


          </div>
        </div>
      )}
    </nav>
  );
}
