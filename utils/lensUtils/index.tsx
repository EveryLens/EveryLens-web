import { PublicationFragment } from "@lens-protocol/client";
import { Post } from "@/service/lens";

export const publicationItemsTrans = (items: PublicationFragment[]) => {
  let tempPosts: Post[] = [];
  items.forEach((item) => {
    let metadata = item.metadata;
    let url: string[] = [];
    if (metadata.media) {
      let media = metadata.media;
      media.forEach((e) => {
        url.push(e.original.url.replace("ipfs://", "https://ipfs.io/ipfs/"));
        // url.push(e.original.url);
      });
    }
    tempPosts.push({
      mainContentFocus: metadata.mainContentFocus,
      content: metadata.content ?? "",
      url: url,
      name: metadata.name ?? "",
    });
  });
  return tempPosts;
};
