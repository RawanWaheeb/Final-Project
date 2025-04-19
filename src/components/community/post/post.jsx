/* eslint-disable react/prop-types */
import { useState } from "react";

const Post = ({ post }) => {

  const [comments, setComments] = useState(post.comments);

  const [newComment, setNewComment] = useState("");


  const [likes, setLikes] = useState(post.likes);

 
  const handleCommentSubmit = (e) => {
    e.preventDefault();
    if (newComment.trim()) {
      const comment = {
        id: Date.now(), 
        user: "CurrentUser", 
        text: newComment,
      };
      setComments([...comments, comment]); 
      setNewComment(""); 
    }
  };

  // Function to truncate text if it exceeds a certain length
  // const truncateText = (text, maxLength = 75) => {
  //   return text.length > maxLength ? `${text.slice(0, maxLength)} <br/>` : text;
  // };

  return (
    <div className="bg-white rounded-lg p-4 shadow-md mt-10 mx-auto w-full md:w-[600px]">
   
      <div className="flex items-center mb-4">
        <img
          src="lovable-uploads/profile.png"
          alt="Profile"
          className="w-10 h-10 rounded-full object-cover mr-3"
        />
        <div>
          <h3 className="font-semibold">{post.username}</h3>
          <p className="text-xs text-gray-500">
            {new Date(post.timestamp).toLocaleDateString()}
          </p>
        </div>
      </div>

    
      {post.image && (
        <div className="mb-4">
          <img
            src={post.image}
            alt="Post"
            className="w-full h-64 object-cover rounded-lg"
          />
        </div>
      )}
      <p className="text-gray-800 mb-2 whitespace-pre-line break-words">
       
        {post.content}
        {post.hashtag && (
          <span className="text-green-600 cursor-pointer"> {post.hashtag}</span>
        )}
      </p>

     
      <div className="flex items-center gap-2 mb-4">
        <button
          onClick={() => setLikes(likes + 1)} 
          className="flex items-center gap-1 text-gray-600 hover:text-green-600"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
            />
          </svg>
          {likes}
        </button>
      </div>

     
      <div className="border-t pt-4 ">
        <div className="max-h-[300px] text-ellipsis mb-4 overflow-hidden">
        
          {comments.map((comment) => (
            <div
              key={comment.id}
              className="flex items-start mb-3 last:mb-0 whitespace-pre-line break-words"
            >
              <img
                src="lovable-uploads/profile.png"
                alt="User"
                className="w-7 h-7 rounded-full object-cover mr-2"
              />
              <div>
                <p className="text-sm font-medium">{comment.user}</p>
                <p className="text-sm text-gray-600  w-full">{comment.text}</p>
              </div>
            </div>
          ))}
        </div>

      
        <form
          onSubmit={handleCommentSubmit}
          className="flex items-center gap-2 mt-4"
        >
          <img
            src="lovable-uploads/profile.png"
            alt="Profile"
            className="w-7 h-7 rounded-full object-cover"
          />
          <input
            type="text"
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Add a comment..."
            className="flex-1 bg-gray-100 rounded-full px-4 py-2 text-sm outline-none"
          />
          <button type="submit" className="text-green-600 font-medium text-sm">
            Post
          </button>
        </form>
      </div>
    </div>
  );
};

export default Post;
