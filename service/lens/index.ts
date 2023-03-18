import LensClient, {
  mumbai,
  PublicationFragment,
  PublicationMainFocus,
  type PaginatedResult,
} from "@lens-protocol/client";
import { create } from "zustand";
import { publicationItemsTrans } from "@/utils/lensUtils";

const lensClient = new LensClient({
  environment: mumbai,
});

export interface Post {
  mainContentFocus: PublicationMainFocus;
  content: string;
  url?: string[];
}

export interface LensStore {
  publications: PaginatedResult<PublicationFragment> | undefined;
  posts: Post[];
  fetchPublication: () => Promise<void> | void;
}
export const lensStore = create<LensStore>((set, get) => ({
  publications: undefined,
  posts: [],
  fetchPublication: async () => {
    try {
      const result = await lensClient.publication.fetchAll({
        profileId: "0x7271",
      });
      const posts = publicationItemsTrans(result.items);
      set({ publications: result, posts: posts });
    } catch (err) {
      console.log(err);
    }
  },
}));

export const usePublications = () => lensStore((state) => state.publications);
export const usePosts = () => lensStore((state) => state.posts);
export const useFetchPublications = () =>
  lensStore((state) => state.fetchPublication);
