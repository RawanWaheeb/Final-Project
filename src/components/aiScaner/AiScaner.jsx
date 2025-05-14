
"use client";

import { useState, useRef } from "react";
import { Helmet } from "react-helmet";

export default function AiScanner() {
  const [imageSrc, setImageSrc] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [analysisResult, setAnalysisResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const fileInputRef = useRef(null);

  const handleImageChange = (file) => {
    if (file) {
      const objectURL = URL.createObjectURL(file);
      setImageSrc(objectURL);
      setImageFile(file);
      setAnalysisResult(null);
    }
  };

  const handleFileSelect = (e) => {
    const file = e.target.files?.[0];
    handleImageChange(file);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    handleImageChange(file);
  };

  const handleSubmit = async () => {
    if (!imageFile) return alert("Please upload an image first.");
    setLoading(true);

    const formData = new FormData();
    formData.append("image", imageFile);

    const token = localStorage.getItem("accessToken");

    if (!token) {
      alert("You must be logged in to analyze a plant.");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch("http://3.208.171.32/api/predict/", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      if (!response.ok) throw new Error("Failed to analyze the plant.");

      const result = await response.json();

      const invalidResults = ["unknown", "northern leaf blight", "not a plant", "undefined", "null"];
      if (
        !result.disease_name ||
        invalidResults.some((val) => result.disease_name.toLowerCase().includes(val)) ||
        result.disease_name.length > 100
      ) {
        setAnalysisResult({
          status: "invalid",
          message:
            "🚫 The uploaded image doesn't appear to be a plant. Please upload a valid plant image.",
          advice: [],
        });
        setLoading(false);
        return;
      }

      setAnalysisResult({
        status: result.disease_name.toLowerCase().includes("healthy") ? "healthy" : "unhealthy",
        message: result.disease_name.toLowerCase().includes("healthy")
          ? "🌱 Your Plant is Healthy!"
          : `🩺 Diagnosis: ${result.disease_name}`,
        advice: [
          `🧾 Description: ${result.description}`,
          `🌿 Care Guide: ${result.care_guide}`,
          `🛡️ Prevention Steps: ${result.prevention_steps}`,
          `🧪 Supplement Recommended: ${result.supplement_name}`,
        ],
      });
    } catch (error) {
      console.error("Error analyzing image:", error);
      setAnalysisResult({
        status: "invalid",
        message:
          "🚫 The uploaded image doesn't appear to be a plant. Please upload a valid plant image.",
        advice: [],
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>Ai Scanner</title>
        <meta name="description" content="Ai Scanner Page" />
      </Helmet>

      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 px-6 py-8 gap-6">
{loading && (
  <div className="mb-4 px-4 py-2 text-center bg-primary-buttons text-white rounded-md shadow-md w-[300px]">
     Analyzing the image... Please wait.
  </div>
)}

        
        {analysisResult && !loading && (
          <div
            className={` mt-16 mb-4 text-center px-4 py-2 rounded-md w-[300px] shadow-lg ${
              analysisResult.status === "invalid"
                ? "bg-red-100 text-red-700 border border-red-300"
                : "bg-white text-gray-800"
            }`}
          >
            <p className="text-lg font-semibold">{analysisResult.message}</p>
          </div>
        )}

        <div className="flex flex-col md:flex-row items-center justify-center gap-[200px] md:gap-0 w-full">
          <div className="relative w-full md:w-1/2 flex flex-col justify-center items-center">
            <div className="absolute w-64 h-56 sm:w-72 sm:h-64 md:w-[450px] md:h-[350px] lg:w-[500px] lg:h-[400px] bg-green-200 opacity-50 rounded-[40%] animate-moveingBorder"></div>

            <div className="relative w-52 h-44 sm:w-60 sm:h-52 md:w-[400px] md:h-[300px] lg:w-[450px] lg:h-[350px] bg-white rounded-[40%] shadow-lg flex items-center justify-center overflow-hidden animate-moveingBorder">
              <img
                src={imageSrc || "lovable-uploads/AiScaner.jpg"}
                alt="Uploaded Preview"
                className="w-full h-full object-cover rounded-[40%]"
              />
            </div>
          </div>

          <div className="w-full md:w-1/2 flex flex-col items-center text-center px-4">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-800">
              Scan your <span className="text-green-700">Plant</span>
            </h2>
            <p className="text-gray-500 mt-2 text-sm sm:text-base">
              Upload The Photo, Check and Learn
            </p>

            <div
              className="mt-6 w-72 sm:w-80 md:w-[320px] lg:w-[350px] h-36 sm:h-40 border-2 border-solid border-[#20A049] flex flex-col items-center justify-center rounded-lg bg-white shadow-md cursor-pointer transition hover:bg-gray-100"
              onClick={() => fileInputRef.current?.click()}
              onDragOver={handleDragOver}
              onDrop={handleDrop}
            >
              <button className="mt-8 bg-primary-buttons hover:bg-primary text-white px-8 py-2 text-lg transition-colors flex items-center space-x-2 gap-3 rounded-xl">
                {imageSrc ? "Upload Another Photo" : "Upload Photo"}
                <img
                  src="lovable-uploads/uploadIMG.svg"
                  alt="uploadIMG"
                  className="w-6 h-6"
                />
              </button>
              <p className="text-black mt-2 text-sm sm:text-base">or drop a file</p>
            </div>

            <input
              ref={fileInputRef}
              type="file"
              className="hidden"
              accept="image/png, image/jpeg"
              onChange={handleFileSelect}
            />

            {imageSrc && (
              <button
                onClick={handleSubmit}
                disabled={loading}
                className="mt-4 bg-primary-buttons hover:bg-primary text-white hover:text-black font-semibold px-6 py-2 rounded-lg transition-colors w-40"
              >
                {loading ? "Analyzing..." : "Analyze Plant"}
              </button>
            )}
          </div>
        </div>

        {analysisResult?.advice?.length > 0 && !loading && (
          <div className="mt-6 w-full max-w-3xl text-center bg-white shadow-lg rounded-md px-6 py-4">
            <p className="text-gray-700 text-sm sm:text-base font-semibold mb-2">
              Diagnosis Details:
            </p>
<div className="text-gray-700 text-sm sm:text-base text-left mx-auto max-w-lg space-y-4 whitespace-pre-line leading-relaxed">
  {analysisResult.advice.map((tip, index) => (
    <p key={index}>
      {tip}
    </p>
  ))}
</div>

          </div>
        )}
      </div>
    </>
  );
}


