"use client";
import { useFetchPublications, usePublications } from "@/service/lens";
import Card from "@/components/card";
import { useEffect } from "react";
const Post: React.FC = () => {
  const fetchPublications = useFetchPublications();
  const publications = usePublications();
  useEffect(() => {
    fetchPublications();
  }, []);
  return (
    <div>
      {publications?.items.map((item) => {
        return <Card content={item.metadata.content ?? ""}></Card>;
      })}
    </div>
  );
};
export default Post;
