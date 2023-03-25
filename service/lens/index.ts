import LensClient, {
  mumbai,
  PublicationFragment,
  PublicationMainFocus,
  type PaginatedResult,
} from "@lens-protocol/client";
import { create } from "zustand";
import { subscribeWithSelector } from "zustand/middleware";
import { publicationItemsTrans } from "@/utils/lensUtils";
import { fetchApi } from "@/utils/fetch/fetchApi";
import waitAsyncResult from "@/utils/waitAsyncResult";

const lensClient = new LensClient({
  environment: mumbai,
});

export interface Post {
  mainContentFocus: PublicationMainFocus;
  content: string;
  url?: string[];
  name?: string;
}

export interface LensStore {
  publications: PaginatedResult<PublicationFragment> | undefined;
  posts: Post[];
  statusQueryUrl: string;
  lensProved: boolean;
  setLensProved: (status: boolean) => void;
  fetchPublication: () => Promise<void> | void;
  setStatusQueryUrl: (url: string) => void;
}
export const lensStore = create(
  subscribeWithSelector<LensStore>((set, get) => ({
    publications: undefined,
    posts: [],
    lensProved: false,
    statusQueryUrl: "",
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
    setLensProved: (status: boolean) => set({ lensProved: status }),
    setStatusQueryUrl: (url: string) => set({ statusQueryUrl: url }),
  }))
);

interface VerifyResponse {
  statusQueryUrl: string;
}
export const verify = async (address: string) => {
  try {
    let result: VerifyResponse = await fetchApi({
      path: `http://localhost:3000/verify?address=${address}`,
      params: { address: address },
    });
    lensStore.setState({ statusQueryUrl: result.statusQueryUrl });
    return result;
  } catch (err) {
    alert("Failed to verify");
  }
};

export const usePublications = () => lensStore((state) => state.publications);
export const usePosts = () => lensStore((state) => state.posts);
export const useLensProved = () => lensStore((state) => state.lensProved);
export const useFetchPublications = () =>
  lensStore((state) => state.fetchPublication);
export const useSetLensProved = () => lensStore((state) => state.setLensProved);

const subStatusQuery = lensStore.subscribe(
  (state) => state.statusQueryUrl,
  async (statusQueryUrl) => {
    const [statusResultPromise] = waitAsyncResult(() =>
      fetchApi({ path: statusQueryUrl })
    );
    try {
      let statusRes = await statusResultPromise;
      lensStore.setState({ lensProved: !!statusRes, statusQueryUrl: "" });
    } catch (err) {}
  }
);

interface PostReq {
  name?: string;
  content?: string;
}
export const post = async (postReq: PostReq) => {
  const fetchPublication = lensStore.getState().fetchPublication;
  try {
    let result = await fetchApi({
      path: `http://localhost:3000/post?name=${
        postReq.name ?? "EveryLensBot"
      }&content=${postReq.content}&description='EveryLensPost'`,
      params: {
        name: postReq.name ?? "EveryLensBot",
        content: postReq.content,
        description: "EveryLensPost",
      },
    });
    await fetchPublication();
  } catch (err) {
    alert("Failed to post");
    console.log(err);
  }
};
