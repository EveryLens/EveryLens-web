import LensClient, {
  mumbai,
  PublicationFragment,
  type PaginatedResult,
} from "@lens-protocol/client";
import { create } from "zustand";

const lensClient = new LensClient({
  environment: mumbai,
});

export interface LensStore {
  publications: PaginatedResult<PublicationFragment> | undefined;
  fetchPublication: () => Promise<void> | void;
}
export const lensStore = create<LensStore>((set, get) => ({
  publications: undefined,
  fetchPublication: async () => {
    try {
      const result = await lensClient.publication.fetchAll({
        profileId: "0x7271",
      });
      //TODO:
      console.log("result", result);
      set({ publications: result });
    } catch (err) {
      console.log(err);
    }
  },
}));

export const usePublications = () => lensStore((state) => state.publications);
export const useFetchPublications = () =>
  lensStore((state) => state.fetchPublication);
