/* eslint-disable react/prop-types */
import { useState, useRef } from "react";

const UploadPost = ({ onCreatePost }) => {
  const [postContent, setPostContent] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);
  const [hashtag, setHashtag] = useState("");
  const fileInputRef = useRef(null);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedImage(URL.createObjectURL(file));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newPost = {
      id: Date.now(),
      username: "CurrentUser",
      content: postContent,
      hashtag: hashtag ? `#${hashtag}` : "",
      comments: [],
      image: selectedImage,
      likes: 0,
      timestamp: new Date().toISOString(),
    };

    onCreatePost(newPost);
    setPostContent("");
    setHashtag("");
    setSelectedImage(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white w-full max-w-[600px] mx-auto rounded-lg p-4 shadow-md "
    >
      <div className="flex items-center gap-2 md:gap-4">
        <img
          src="lovable-uploads/profile.png"
          alt="Profile"
          className="w-8 h-8 md:w-12 md:h-12 rounded-full object-cover"
        />
        <div className="flex-1">
          <input
            type="text"
            value={postContent}
            onChange={(e) => setPostContent(e.target.value)}
            placeholder="What's growing on?"
            className="w-full border-none outline-none text-gray-800 p-1.5 md:p-2 rounded-lg text-sm md:text-base"
            required
          />
          <input
            type="text"
            value={hashtag}
            onChange={(e) => setHashtag(e.target.value.replace(/#/g, ""))}
            placeholder="Add hashtag (optional)"
            className="w-full border-none outline-none text-gray-500 p-1 md:p-2 text-xs md:text-sm"
          />
        </div>
      </div>

      {selectedImage && (
        <div className="my-4 mx-auto max-w-full">
          <img
            src={selectedImage}
            alt="Preview"
            className="max-h-96 w-full object-cover rounded-lg"
          />
        </div>
      )}

      <div className="flex flex-wrap justify-between items-center mt-4 gap-2">
        <div className="flex items-center gap-2 md:gap-4">
          <input
            type="file"
            ref={fileInputRef}
            accept="image/*"
            onChange={handleImageUpload}
            className="hidden"
            id="image-upload"
          />
          <label
            htmlFor="image-upload"
            className="flex items-center gap-1 md:gap-2 text-gray-600 cursor-pointer hover:text-green-600 text-sm md:text-base"
          >
            <span className="md:hidden">📷</span>
            <span className="hidden md:inline">Add Photo</span>
          </label>
        </div>
        <button
          type="submit"
          className="bg-green-600 text-white px-4 py-2 md:px-6 md:py-2 rounded-full hover:bg-green-700 transition-colors text-sm md:text-base"
        >
          <img
            src="lovable-uploads/send.svg"
            alt="upload"
            className="w-5 h-5 md:w-6 md:h-6"
          />
        </button>
      </div>
    </form>
  );
};

export default UploadPost;
