"use client";
import { useState, useCallback } from "react";
import cx from "clsx";
import { QRCodeSVG } from "qrcode.react";
import { useLensProved, useSetLensProved, verify } from "@/service/lens";
import AuthConnect from "@/modules/authConnect";
import { useAccount } from "@/service/account";
import Button from "@/components/button";

interface PostBoardProps {
  className?: string;
}

const PostBoard: React.FC<PostBoardProps> = ({ className }) => {
  const [proofQuery, setProofQuery] = useState("");
  const lensProved = useLensProved();
  const setLensProved = useSetLensProved();
  const account = useAccount();

  const verifyQuery = useCallback(async () => {
    try {
      let res = await verify(account);
      setProofQuery(JSON.stringify(res));
    } catch (err) {
      console.log(err);
    }
  }, [account]);
  useCallback;
  return (
    <div className={cx(className, "flex flex-col justify-evenly h-[600px]")}>
      {proofQuery && !lensProved ? (
        <QRCodeSVG value={proofQuery} size={256} />
      ) : (
        <div></div>
      )}
      <AuthConnect>
        <Button
          className="w-[256px] h-[64px] rounded-[6px] text-[16px] font-normal"
          onClick={verifyQuery}
        >
          Verify to post
        </Button>
      </AuthConnect>
    </div>
  );
};

export default PostBoard;
