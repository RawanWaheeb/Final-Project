import { useState } from "react";
import UploadPost from "./uploadPost/UploadPost";
import ContainerPost from "./ContainerPost";
import { Helmet } from "react-helmet";

export default function Community() {
  const [newPost, setNewPost] = useState(null);

  const handleNewPost = (post) => {
    setNewPost(post);
  };

  return (
    <>
     <Helmet>
        <title>Community</title>
        <meta name="description" content="Community page" />
      </Helmet>
    <div className="py-40 h-auto mt-24">
      <section className="container mx-auto flex justify-center">
        <UploadPost onCreatePost={handleNewPost} />
      </section>

      <ContainerPost newPost={newPost} />
    </div>
    </>
  );
}
