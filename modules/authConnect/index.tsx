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
      <button
        className={cx(
          className,
          inTransaction && "pointer-events-none opacity-30",
          "flex flex-row justify-center items-center"
        )}
        onClick={handleClick}
        {...props}
      >
        <>{account ? "switch to mumbai" : "connect wallet"}</>
      </button>
    );
  } else {
    return children as React.ReactElement;
  }
};

export default AuthConnect;
