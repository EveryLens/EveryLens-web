"use client";
import AuthConnect from "@/modules/authConnect";
import { createClaim } from "@/utils/createClaim";
const Create: React.FC = () => {
  return (
    <div className="flex flex-col">
      Here're some explainations of how EveryLens works
      <AuthConnect>
        <button onClick={createClaim}>Claim</button>
      </AuthConnect>
    </div>
  );
};
export default Create;
