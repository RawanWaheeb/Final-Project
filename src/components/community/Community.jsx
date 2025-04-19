
import { useState } from "react";
import Post from "./post/post";
import UploadPost from "./uploadPost/UploadPost";
import { Helmet } from "react-helmet";

const initialPosts = [
  {
    id: 1,
    username: "PlantLover123",
    content: "Just got this beautiful Monstera! 🌿 Anyone have care tips?",
    hashtag: "#MonsteraMonday",
    comments: [
      {
        id: 1,
        user: "GreenThumb",
        text: "Water once a week and bright indirect light!",
      },
      { id: 2, user: "LeafyLucy", text: "Stunning! 😍" },
    ],
    image: "lovable-uploads/postimg1.png",
    likes: 42,
    timestamp: "2024-03-10 09:30",
  },
  {
    id: 2,
    username: "SucculentFan",
    content: "My succulent collection is growing! 🌵",
    hashtag: "#SucculentLove",
    comments: [
      { id: 3, user: "CactusKing", text: "Amazing variety!" },
      { id: 4, user: "PlantNewbie", text: "Where do you get your pots?" },
    ],
    image: "lovable-uploads/postimg2.png",
    likes: 28,
    timestamp: "2024-03-09 15:45",
  },
];

export default function Community() {
  const [posts, setPosts] = useState(initialPosts);

  const handleNewPost = (newPost) => {
    setPosts([newPost, ...posts]);
  };

  return (
    <>

<Helmet>
        <title>Community</title>
        <meta name="description" content="Community Page" />
      </Helmet>

    <div className="py-20 h-auto mt-24">
      <section className="container mx-auto flex justify-center">
        <UploadPost onCreatePost={handleNewPost} />
      </section>

      <section className="container mx-auto flex flex-col items-center gap-8">
        {posts.map((post) => (
          <Post key={post.id} post={post} />
        ))}
      </section>
    </div>
    </>
  );
}
