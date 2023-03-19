"use client";
import { useState, useCallback } from "react";
import { QRCodeSVG } from "qrcode.react";
import { signIn, useSignInPassed, useClaimInfo } from "@/service/claim";
import AuthConnect from "@/modules/authConnect";
import Button from "@/components/button";
import { useAccount } from "@/service/account";
const CreateClaim: React.FC = () => {
  const [claimData, setClaimData] = useState("");
  const account = useAccount();
  const signInPassed = useSignInPassed();
  const claimInfo = useClaimInfo();

  const createClaim = useCallback(async () => {
    try {
      let res = await signIn(account);
      setClaimData(JSON.stringify(res));
    } catch (err) {
      console.log(err);
    }
  }, [account]);

  return (
    <div>
      {!claimData && (
        <AuthConnect>
          <Button
            className="w-[256px] h-[64px] rounded-[6px] text-[16px] font-normal"
            onClick={createClaim}
          >
            Sign In
          </Button>
        </AuthConnect>
      )}
      {claimData && !signInPassed && <QRCodeSVG value={claimData} size={256} />}
      {signInPassed && claimInfo && <QRCodeSVG value={claimInfo} size={256} />}
    </div>
  );
};

export default CreateClaim;
