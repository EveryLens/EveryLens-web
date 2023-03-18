import { fetchApi } from "@/utils/fetch/fetchApi";

import { NextApiResponse, NextApiRequest } from "next";
const create = async (address: string) => {
  try {
    let result = await fetchApi({
      path: `http://localhost:3000/sign-in?address=${address}`,
      // params: { address: address },
    });
    return JSON.stringify(result);
  } catch (err) {}
};
export default create;
