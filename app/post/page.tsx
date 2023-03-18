"use client";
import { useFetchPublications, usePosts } from "@/service/lens";
import { useEffect } from "react";
import PostCard from "@/modules/postCard";
const Post: React.FC = () => {
  const fetchPublications = useFetchPublications();
  const posts = usePosts();
  console.log("posts", posts);
  useEffect(() => {
    fetchPublications();
  }, []);
  return (
    <div>
      {posts.map((post, index) => (
        <div key={index} className="mt-[10px]">
          <PostCard content={post.content} url={post.url} className="w-4/5" />
        </div>
      ))}
    </div>
  );
};
export default Post;
