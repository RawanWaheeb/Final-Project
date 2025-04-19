import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { X, Menu } from "lucide-react"; 

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [activeLink, setActiveLink] = useState("home");

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (e, sectionId) => {
    e.preventDefault();
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-white shadow-md" : "bg-transparent"
      }`}
    >
      <nav className="flex items-center justify-between px-6 py-3 lg:px-8">
        <div className="flex">
          <Link to="/" className="lg:pe-40 xl:pe-80 whitespace-nowrap">
            <div className="flex justify-start xl:justify-center flex-1">
              <img
                src="lovable-uploads/logo.png"
                alt="Grovana Logo"
                className="h-12 md:h-16 cursor-pointer"
              />
            </div>
          </Link>
        </div>

        <div className="hidden lg:flex lg:gap-x-12 w-1/2 justify-center capitalize">
  {["home", "shop", "about_us", "scanner", "review"].map((page) => (
    <a
      key={page}
      href={`#${page === "scanner" ? "ai_help" : page}`} 
      onClick={(e) => {
        scrollToSection(e, page === "scanner" ? "ai_help" : page);  
        setActiveLink(page);
      }}
      className={`text-lg px-4 py-2 text-black hover:text-primary-buttons transition-all duration-300 ease-in-out transform hover:scale-110 border-b-2 ${
        activeLink === page ? "border-primary-buttons" : "border-transparent"
      }`}
    >
      {page.replace("_", " ")}
    </a>
  ))}
</div>


        <div className="hidden lg:flex lg:flex-1 lg:justify-end w-1/4">
          <Link
            to="/login"
            className="bg-white text-black px-4 py-1.5 border-2 border-[#2E5B41] rounded-full text-lg hover:bg-[#2E5B41] hover:text-white transition-colors duration-300"
          >
            Login
          </Link>
        </div>

      
        <div onClick={() => setIsOpen(!isOpen)} className="lg:hidden">
          <button
            type="button"
            className="inline-flex items-center justify-center rounded-md p-2.5 text-gray-700 bg-gray hover:bg-gray-100"
          >
            <span className="sr-only">Open main menu</span>
            {isOpen ? (
              <X size={28} className="text-gray-700 hover:text-primary-buttons transition-colors" />
            ) : (
              <Menu size={28} className="text-gray-700 hover:text-primary-buttons transition-colors" />
            )}
          </button>
        </div>
      </nav>

     
      {isOpen && (
        <div className="xl:hidden bg-white shadow-md absolute top-16 left-0 w-full flex flex-col items-center py-4 space-y-4">
          
          {["Home", "Shop", "About Us", "Scanner", "Review"].map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase().replace(" ", "_")}`}
              onClick={() => setIsOpen(false)}
              className="block font-bold text-lg text-black hover:text-[#2E5B41] transition-colors duration-200 py-2"
            >
              {item}
            </a>
          ))}
          <Link
            to="/login"
            onClick={() => setIsOpen(false)}
            className="block font-bold text-lg text-black hover:text-[#2E5B41] transition-colors duration-200 py-2"
          >
            Login
          </Link>
        </div>
      )}
    </header>
  );
}
