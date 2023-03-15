import { NextApiRequest, NextApiResponse } from "next";
const create = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    console.log("In!");
    res.status(200).json({ message: "successfully called!" });
  } catch (err) {
    res.status(500).json({ message: "failed" });
  }
};
export default create;
