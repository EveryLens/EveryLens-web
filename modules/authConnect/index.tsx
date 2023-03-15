"use client";
import React, { useEffect, type PropsWithChildren, useCallback } from "react";
import cx from "clsx";
import {
  useAccount,
  useConnect,
  useChainId,
  networkRefresher,
  useSwitchNetwork,
} from "@/service/account";
import { MUMBAI_CHAINID } from "@/utils/constants";
import useInTranscation from "@/hooks/useInTransaction";
import Button from "@/components/button";

type PropsWithOnClick = PropsWithChildren<{
  onClick?: () => void;
  className?: string;
}>;

const AuthConnect: React.FC<PropsWithOnClick> = ({
  onClick,
  children,
  className,
  ...props
}) => {
  const account = useAccount();
  const chainId = useChainId();
  const chainMatch = chainId === `0x${MUMBAI_CHAINID.toString(16)}`;
  const _connect = useConnect();
  const { inTransaction, execTransaction: connect } =
    useInTranscation(_connect);
  const switchNetwork = useSwitchNetwork();

  const handleClick = useCallback<React.MouseEventHandler<HTMLButtonElement>>(
    async (e) => {
      e.preventDefault();
      if (!account) {
        await connect();
      } else if (!!account && !chainMatch) {
        await switchNetwork(MUMBAI_CHAINID);
        await networkRefresher();
      }
    },
    [account, chainMatch, connect, switchNetwork]
  );

  if (!account || !chainMatch) {
    return (
      <Button
        className={cx(
          className,
          inTransaction && "pointer-events-none opacity-30",
          "flex flex-row justify-center items-center w-[256px] h-[64px] rounded-[6px] text-[16px] font-normal"
        )}
        onClick={handleClick}
        {...props}
      >
        <>{account ? "switch to mumbai" : "connect wallet"}</>
      </Button>
    );
  } else {
    return children as React.ReactElement;
  }
};

export default AuthConnect;
