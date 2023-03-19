import { fetchApi } from "@/utils/fetch/fetchApi";

export const signIn = async (address: string) => {
  let result = await fetchApi({
    path: `http://localhost:3000/sign-in?address=${address}`,
    params: { address: address },
  });
  return JSON.stringify(result);
};
