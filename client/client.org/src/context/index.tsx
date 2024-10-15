import React, { createContext, useContext, ReactNode } from "react";
import {
  useAddress,
  useContract,
  useContractWrite,
  SmartContract,
} from "@thirdweb-dev/react";
import { ethers } from "ethers";

// Define the shape of the context's value
interface StateContextType {
  address: string | undefined;
  contract: SmartContract<ethers.BaseContract> | undefined;
  createCharity: (form: {
    title: string;
    description: string;
    target: ethers.BigNumber;
    deadline: string | number | Date;
    minAmount: ethers.BigNumber;
    image: string;
  }) => Promise<void>;
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
  const { contract } = useContract(
    "0x468a85f3A013B7417139A5B8C6F81504ae50B774"
  );

  const { mutateAsync: createCharity } = useContractWrite(
    contract,
    "createCharity"
  );
  const address = useAddress();

  const publishCharity = async (form: {
    title: string;
    description: string;
    target: ethers.BigNumber;
    deadline: string | number | Date;
    minAmount: ethers.BigNumber;
    image: string;
  }) => {
    try {
      const data = await createCharity({
        args: [
          address,
          form.title,
          form.description,
          form.target,
          new Date(form.deadline).getTime(),
          form.minAmount,
          form.image,
        ],
      });
      console.log("Contract call success:", data);
    } catch (error) {
      console.error("Contract call fail:", error);
    }
  };

  // Provide the context value
  return (
    <StateContext.Provider
      value={{
        address,
        contract,
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
