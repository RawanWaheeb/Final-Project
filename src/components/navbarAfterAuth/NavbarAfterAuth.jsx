"use client";

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ShoppingCart, Heart, ScanLine, Menu, X, User, LogOut } from "lucide-react";
import logo from "../../assets/images/logo.png"; 

export default function NavbarAfterAuth() {
  const [isOpen, setIsOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [profileImage, setProfileImage] = useState("/default-profile.png");
  const [activeLink, setActiveLink] = useState(""); 
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
          const response = await fetch("https://mohamednowar.pythonanywhere.com/api/profile/", {
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

  const menuItems = [
    { name: "Home", action: () => { navigate("/");  }},
    { name: "Shop", action: () => { navigate("/Products");  }},
    { name: "Community", action: () => { navigate("/community"); ; }},
    { name: "About Us", action: () => { navigate("/", { state: { scrollTo: "about_us" } });  }},
    { name: "Review", action: () => { navigate("/", { state: { scrollTo: "review" } }); }},
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
    </nav>
  );
}


// import { useContext } from "react";
// import { CartContext } from "../../Context/Cart.context";
// import { WishListContext } from "../../Context/WishList.context";
// import { ShoppingCart, Heart, ScanLine, User, LogOut, Menu, X } from "lucide-react";
// import logo from "../../assets/images/logo.png"; 

// export default function NavbarAfterAuth() {
//   const { cartItemCount } = useContext(CartContext); // عدد العناصر في السلة
//   const { wishItemCount } = useContext(WishListContext); // عدد العناصر في الويشليست

//   const [isOpen, setIsOpen] = useState(false);
//   const [isDropdownOpen, setIsDropdownOpen] = useState(false);
//   const [isScrolled, setIsScrolled] = useState(false);
//   const [profileImage, setProfileImage] = useState("/default-profile.png");
//   const navigate = useNavigate();

//   useEffect(() => {
//     const handleScroll = () => setIsScrolled(window.scrollY > 50);
//     window.addEventListener("scroll", handleScroll);
//     return () => window.removeEventListener("scroll", handleScroll);
//   }, []);

//   const handleLogout = () => {
//     localStorage.clear();
//     setIsDropdownOpen(false);
//     window.dispatchEvent(new Event("authChange"));
//     setTimeout(() => {
//       window.location.replace("/login");
//     }, 100);
//   };

//   return (
//     <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${isScrolled ? "bg-white shadow-md" : "bg-transparent"}`}>
//       <div className="container mx-auto flex justify-between items-center px-6 py-4">
    
//         <div className="hidden xl:flex items-center gap-10">
//           {[ 
//             { icon: <ShoppingCart size={20} />, text: "Cart", action: () => navigate("/cart"), count: cartItemCount },
//             { icon: <Heart size={20} />, text: "Wishlist", action: () => navigate("/wishlist"), count: wishItemCount },
//             { icon: <ScanLine size={20} />, text: "Scanner", action: () => navigate("/ai_help") },
//           ].map((item, index) => (
//             <div key={index} onClick={item.action} className="flex items-center gap-2 cursor-pointer transform transition-transform hover:scale-105 relative">
//               <div className="p-2 bg-primary-buttons text-white rounded-full">
//                 {item.icon}
//               </div>
//               <span className="text-gray-700 font-medium">{item.text}</span>
//               {item.count > 0 && (
//                 <div className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
//                   {item.count}
//                 </div>
//               )}
//             </div>
//           ))}
//         </div>

//         <div className="flex justify-start xl:justify-center flex-1" style={{ position: 'relative', zIndex: 10 }}>
//           <img src={logo} alt="GroVana Logo" className="h-12 md:h-16 cursor-pointer" onClick={() => navigate("/")} />
//         </div>

//         <div className="hidden xl:flex items-center gap-6 text-gray-700 font-semibold">
//           {/* Menu items code */}
//           {/* Profile image and logout button */}
//         </div>

//         <div className="xl:hidden flex items-center">
//           <button onClick={() => setIsOpen(!isOpen)}>
//             {isOpen ? <X size={28} /> : <Menu size={28} />}
//           </button>
//         </div>
//       </div>

//       {isOpen && (
//         <div className="xl:hidden bg-white shadow-md absolute top-16 left-0 w-full flex flex-col items-center py-4 space-y-4">
//           {/* Menu items for mobile */}
//         </div>
//       )}
//     </nav>
//   );
// }
