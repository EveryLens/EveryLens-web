import { create } from "zustand";
import { subscribeWithSelector } from "zustand/middleware";
import { accountStore } from "../account";
import waitAsyncResult from "@/utils/waitAsyncResult";
import { fetchApi } from "@/utils/fetch/fetchApi";

interface ClaimStore {
  signInPassed: boolean;
  statusQueryUrl: string;
  claimInfo: string;
  setSignInPassed: (result: boolean) => void;
  setStatusQueryUrl: (url: string) => void;
}

export const claimStore = create(
  subscribeWithSelector<ClaimStore>((set, get) => ({
    signInPassed: false,
    statusQueryUrl: "",
    claimInfo: "",
    setSignInPassed: (result: boolean) => set({ signInPassed: result }),
    setStatusQueryUrl: (url: string) => set({ statusQueryUrl: url }),
  }))
);

export const useSignInPassed = () => claimStore((state) => state.signInPassed);
export const useSetSignInPassed = () =>
  claimStore((state) => state.setSignInPassed);
export const useSetStatusQueryUrl = () =>
  claimStore((state) => state.setStatusQueryUrl);
export const useClaimInfo = () => claimStore((state) => state.claimInfo);

interface SignInResponse {
  body: object;
  from: string;
  id: string;
  statusQueryUrl: string;
  thid: string;
  typ: string;
  type: string;
  status?: number;
}
export const signIn = async (address: string) => {
  try {
    let result: SignInResponse = await fetchApi({
      path: `http://localhost:3000/sign-in?address=${address}`,
      params: { address: address },
    });
    if (result.status && result.status === 400) {
      throw new Error("no lens profile");
    }
    claimStore.setState({ statusQueryUrl: result.statusQueryUrl });
    return result;
  } catch (err) {
    alert("Failed to sign in");
  }
};

export const claim = async (address: string) => {
  try {
    let result = await fetchApi({
      path: `http://localhost:3000/claim?address=${address}`,
      params: { address: address },
    });
    return result;
  } catch (err) {
    alert("Failed to create claim, please maker sure you have a lens profile");
  }
};

const subSignInPassed = claimStore.subscribe(
  (state) => state.signInPassed,
  async (signInPassed) => {
    if (signInPassed) {
      try {
        let account = accountStore.getState().account;
        let res = await claim(account);
        claimStore.setState({ claimInfo: JSON.stringify(res) });
      } catch (err) {}
    }
  }
);

const subStatusQuery = claimStore.subscribe(
  (state) => state.statusQueryUrl,
  async (statusQueryUrl) => {
    const [statusResultPromise] = waitAsyncResult(() =>
      fetchApi({ path: statusQueryUrl })
    );
    try {
      let statusRes = await statusResultPromise;
      claimStore.setState({ signInPassed: !!statusRes });
    } catch (err) {}
  }
);
