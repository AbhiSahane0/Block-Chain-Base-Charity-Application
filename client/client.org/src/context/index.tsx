import React, { createContext, useContext, ReactNode } from "react";
import {
  useAddress,
  useContract,
  useContractWrite,
  SmartContract,
  WalletInstance,
  useConnect,
  metamaskWallet,
} from "@thirdweb-dev/react";
import { ethers } from "ethers";

// Wallet configuration for Metamask
const metamaskConfig = metamaskWallet();

// Define the shape of the context's value
interface CharityForm {
  title: string;
  description: string;
  target: number;
  deadline: string | number | Date;
  image: string;
}

interface StateContextType {
  address: string | undefined;
  contract: SmartContract<ethers.BaseContract> | undefined;
  createCharity: (form: CharityForm) => Promise<void>;
  connect: () => Promise<void>;
}

// Initialize StateContext with the correct type
const StateContext = createContext<StateContextType | undefined>(undefined);

// Define the props for the StateContextProvider
interface StateContextProviderProps {
  children: ReactNode;
}

// Create the StateContextProvider component
export const StateContextProvider: React.FC<StateContextProviderProps> = ({
  children,
}): JSX.Element => {
  // Fetching the contract instance
  const { contract } = useContract(
    "0x468a85f3A013B7417139A5B8C6F81504ae50B774"
  );

  // Hook to write to the contract
  const { mutateAsync: createCharity } = useContractWrite(
    contract,
    "createCharity"
  );

  // Fetching the connected wallet address
  const address = useAddress();

  // Hook to connect the wallet
  const connect = useConnect();

  // Function to publish a charity
  const publishCharity = async (form: CharityForm) => {
    try {
      if (!address) throw new Error("No wallet connected!");

      // Convert target to BigNumber for Ethereum compatibility
      const bigNumberTarget = ethers.BigNumber.from(form.target);

      // Calling the contract method
      const data = await createCharity({
        args: [
          address,
          form.title,
          form.description,
          bigNumberTarget,
          new Date(form.deadline).getTime(),
          form.image,
        ],
      });

      console.log("Contract call success:", data);
    } catch (error) {
      console.error("Contract call failed:", error);
    }
  };

  // Provide the context value
  return (
    <StateContext.Provider
      value={{
        address,
        contract,
        connect: async () => {
          // Connect using Metamask wallet
          try {
            const wallet = await connect(metamaskConfig);
            console.log("Connected to:", wallet);
          } catch (error) {
            console.error("Connection failed:", error);
          }
        },
        createCharity: publishCharity,
      }}
    >
      {children}
    </StateContext.Provider>
  );
};

// Create a custom hook to use the StateContext
export const useStateContext = () => {
  const context = useContext(StateContext);
  if (context === undefined) {
    throw new Error(
      "useStateContext must be used within a StateContextProvider"
    );
  }
  return context;
};
