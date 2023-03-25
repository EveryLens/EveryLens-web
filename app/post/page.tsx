"use client";
import { useFetchPublications, usePosts } from "@/service/lens";
import { useEffect } from "react";
import PostCard from "@/modules/postCard";
import PostBoard from "@/modules/postBoard";
const Post: React.FC = () => {
  const fetchPublications = useFetchPublications();
  const posts = usePosts();

  useEffect(() => {
    fetchPublications();
  }, []);
  return (
    <div className="flex flex-row gap-x-[16px] w-full min-h-screen">
      <div className="flex-auto">
        {posts.map((post, index) => (
          <div key={index} className="mb-[10px]">
            <PostCard content={post.content} url={post.url} name={post.name} />
          </div>
        ))}
      </div>
      <PostBoard className="border-2 border-black" />
    </div>
  );
};
export default Post;
