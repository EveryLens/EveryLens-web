"use client";
import { useState, useCallback } from "react";
import cx from "clsx";
import { useForm } from "react-hook-form";
import { QRCodeSVG } from "qrcode.react";
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
        "flex flex-col justify-evenly items-center h-[600px]"
      )}
    >
      {lensProved && <PostInputForm />}
      {proofQuery && !lensProved ? (
        <div className="flex flex-col items-center text-center">
          errors occur occasionally, please try again if you've gotten the claim
          but can't generate proof or create a new claim and retry
          <QRCodeSVG value={proofQuery} size={256} />
        </div>
      ) : (
        <div></div>
      )}
      {!lensProved && (
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
  const onSubmit = useCallback(async (data: FormData) => {
    await post({ ...data });
  }, []);

  return (
    <form
      onSubmit={withForm((data) => onSubmit(data))}
      className="flex flex-col items-center"
    >
      <div className="flex flex-col items-center mb-[16px]">
        <label htmlFor="name">pseudonym</label>
        <input id="name" {...register("name")} />
      </div>
      <div className="flex flex-col items-center mb-[16px]">
        <label htmlFor="content">
          What do you want to post :) ?(text only now)
        </label>
        <textarea
          id="content"
          {...register("content", { required: true })}
          rows={4}
        />
      </div>
      <Button className="w-[256px] h-[64px] rounded-[6px] text-[16px] font-normal">
        Post
      </Button>
    </form>
  );
};

export default PostBoard;
