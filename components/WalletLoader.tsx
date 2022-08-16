import { ReactNode } from "react";
import { useSigningClient } from "contexts/cosmwasm";
import Loader from "./Loader";

function WalletLoader({
  children,
  loading = false,
}: {
  children: ReactNode;
  loading?: boolean;
}) {
  const {
    walletAddress,
    loading: clientLoading,
    error,
    connectWallet,
  } = useSigningClient();

  if (loading || clientLoading) {
    return (
      <div className="flex justify-center">
        <Loader />
      </div>
    );
  }

  if (walletAddress === "") {
    return (
      <div className="max-w-full">
        <h1 className="text-6xl font-bold">
          Welcome to{" "}
          <a className="link link-primary link-hover" href="https://informal.systems/CoFi/Obligatto/#">
            Obligatto!
          </a>
        </h1>

        <p className="mt-3 text-2xl">
          Here businesses save money by clearing their obligations together. {" "}
          {/* 
          <a
            className="pl-1 link link-primary link-hover"
            href="https://keplr.app/"
          >
            Keplr wallet
          </a> */}
          <a
            className="pl-1 link link-primary link-hover"
            href="https://obligatto.app/how-it-works/#"
          >
          Pay what you owe with trade credit owed to you. 
          </a>
        </p>

        <div className="flex flex-wrap items-center justify-around md:max-w-4xl mt-6 sm:w-full">
          <button
            className="p-6 mt-6 text-left border border-secondary hover:border-primary w-96 rounded-xl hover:text-primary focus:text-primary-focus"
            onClick={connectWallet}
          >
            <h3 className="text-2xl font-bold">Connect your wallet &rarr;</h3>
            <p className="mt-4 text-xl">
              Connect your Keplr wallet and start clearing away your obligations!
            </p>
          </button>
        </div>
      </div>
    );
  }

  if (error) {
    return <code>{JSON.stringify(error)}</code>;
  }

  return <>{children}</>;
}

export default WalletLoader;
