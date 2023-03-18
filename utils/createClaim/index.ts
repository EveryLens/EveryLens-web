import { fetchApi } from "@/utils/fetch/fetchApi";

export const createClaim = async () => {
  try {
    const res = await fetchApi({
      path: "create",
    });
    const processedRes = JSON.stringify(res);
    console.log("res", processedRes);
  } catch (err) {
    console.log("err", err);
  }
};
