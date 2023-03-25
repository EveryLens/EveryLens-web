"use client";
import { useState, useCallback } from "react";
import cx from "clsx";
import { useForm } from "react-hook-form";
import { QRCodeSVG } from "qrcode.react";
import useInTranscation from "@/hooks/useInTransaction";
import { useLensProved, useSetLensProved, verify, post } from "@/service/lens";
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
    <div
      className={cx(
        className,
        "sticky top-[0px] right-[0px] flex flex-col justify-evenly items-center w-[300px] h-[600px]"
      )}
    >
      {lensProved && <PostInputForm />}
      {proofQuery && !lensProved ? (
        <div className="flex flex-col items-center text-center w-[256px]">
          errors occur occasionally, please try again if you've gotten the claim
          but can't generate proof or create a new claim and retry
          <QRCodeSVG value={proofQuery} size={256} />
        </div>
      ) : (
        <div></div>
      )}
      {!proofQuery && !lensProved && (
        <AuthConnect>
          <Button
            className="w-[256px] h-[64px] rounded-[6px] text-[16px] font-normal"
            onClick={verifyQuery}
          >
            Verify to post
          </Button>
        </AuthConnect>
      )}
    </div>
  );
};

interface FormData {
  name: string;
  content: string;
}
const PostInputForm: React.FC = () => {
  const {
    register,
    handleSubmit: withForm,
    watch,
    formState: { errors },
  } = useForm<FormData>();

  const _onSubmit = useCallback(async (data: FormData) => {
    await post({ ...data });
  }, []);

  const { inTransaction, execTransaction: onSubmit } =
    useInTranscation(_onSubmit);

  return (
    <form
      onSubmit={withForm((data) => onSubmit(data))}
      className="flex flex-col items-center"
    >
      <div className="flex flex-col items-center mb-[16px]">
        <label htmlFor="name">pseudonym</label>
        <input
          id="name"
          {...register("name")}
          className="bg-transparent border-[2px] border-[#000000]"
        />
      </div>
      <div className="flex flex-col items-center mb-[16px]">
        <label htmlFor="content">
          What do you want to post :) ?(text only now)
        </label>
        <textarea
          id="content"
          {...register("content", { required: true })}
          rows={4}
          className="bg-transparent border-[2px] border-[#000000]"
        />
      </div>
      <Button
        className={cx(
          "w-[256px] h-[64px] rounded-[6px] text-[16px] font-normal",
          inTransaction ?? "pointer-events-none opacity-30"
        )}
        disabled={inTransaction}
      >
        Post
      </Button>
    </form>
  );
};

export default PostBoard;
