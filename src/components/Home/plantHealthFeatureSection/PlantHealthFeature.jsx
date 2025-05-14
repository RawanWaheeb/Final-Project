import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { userContext } from "../../../Context/User.context"; 

export default function PlantHealthFeature() {
  const { token } = useContext(userContext); 
  const navigate = useNavigate();

  const handleUploadClick = () => {
    if (token) {
      navigate("/ai_help"); 
    } else {
      navigate("/login"); 
    }
  };

  return (
    <div className="relative min-h-[400px] w-full font-fira-sans-condensed">
      
      <div className="absolute inset-0 w-full h-full bg-fixed bg-center bg-cover" style={{ backgroundImage: 'url("lovable-uploads/feature01.png")' }}></div>

      <div className="absolute inset-0 bg-black/70"></div>

      <div className="relative z-10 container mx-auto px-4 py-20">
        <div className="max-w-[800px] text-white space-y-6 gap-1">
          <h2 className="text-[56px] font-bold leading-[1.2]">
            Explore The New Feature
          </h2>

          <div className="space-y-4">
            <p className="text-3xl">
              Now you Can Easily Check the Plant health from website too
            </p>
            <p className="text-3xl">Upload The Photo, Check and Learn</p>
          </div>

          <button
            onClick={handleUploadClick} 
            className="mt-8 bg-primary-buttons hover:bg-primary text-white  px-8 py-2 text-lg transition-colors flex items-center space-x-2 gap-3 rounded-xl"
          >
            Upload Photo
            <img
              src="lovable-uploads/uploadIMG.svg"
              alt="uploadIMG"
              className="w-6 h-6 "
            />
          </button>
        </div>
      </div>
    </div>
  );
}
