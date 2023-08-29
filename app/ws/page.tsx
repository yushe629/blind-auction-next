"use client";
import { useState } from "react";
import { Button, Typography } from "@mui/material";
import { BrowserProvider, ethers } from "ethers";
import { initFhevm, createInstance, FhevmInstance } from "fhevmjs";
import contractAbi from "../../abi.json";
import Header from "../components/Header";

const contractAddress = "0x328b1D63a60d019B73443bB9EC969e03D2f90ee4";


// async function createInstance(): Promise<string | void> {
//     try {
//         const acccounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
//         if (acccounts.length > 0) {
//             // console.log(acccounts[0]);
//             return acccounts[0]
//         }
//     } catch (err: any) {
//         if (err.code === 4001) {
//             // EIP-1193 userRejectedRequest error
//             // ユーザーが接続を拒否するとここに来ます
//             console.log('Please connect to MetaMask.');
//         } else {
//             console.error(err);
//         }
//     }
// }

export default function WorkSpace() {
  const [isConnected, setIsConnected] = useState(false);
  const [isProgress, setIsProgress] = useState(false);
  const [accountId, setAccountId] = useState("");

  const [userAddress, setUserAddress] = useState("");
  const [signer, setSiner] = useState<ethers.JsonRpcSigner | null>(null);

  //   const contractAddress = "0x138d91974e88E463021016D49B3b981eeb27FbcE";

  const [result, setResult] = useState(-1);

  const initInstance = async () => {
    await initFhevm();
    const provider = new BrowserProvider(window.ethereum);
    // setUserAddress(await provider.send("eth_requestAccounts", []))
    const tmpSigner = await provider.getSigner();
	console.log(provider)
    setSiner(tmpSigner);
    // console.log(tmpSigner)
    // console.log(tmpSigner.address)
    // const tmpaddress = tmpSigner.address
    // setUserAddress(tmpaddress)
    // console.log(userAddress)
    // if (signer == null) {
    //   throw new Error("signer is null");
    // }
    const network = await provider.getNetwork();
    const chainId = +network.chainId.toString();
    const publicKey = await provider.call({
      from: null,
      to: "0x0000000000000000000000000000000000000044",
    });
	const commonPublicKey = "0x000000000030";
    return createInstance({ chainId, publicKey });
  };

  const getToken = async (instance: FhevmInstance) => {
    const { publicKey, token } = instance.generateToken({
      name: "Authentication",
      verifyingContract: contractAddress,
    });
    // console.log(signer?.address)
	// contract address
    const add = "0x37B04179693de0C0421295126647EB19B3f37d58";
    const params = [add, JSON.stringify(token)];
    const sign = await window.ethereum.request({
      method: "eth_signTypedData_v4",
      params,
    });
    instance.setTokenSignature(contractAddress, sign);
    return { publicKey, sign };
  };

  const executeContract = async (
    instance: FhevmInstance,
    publicKey: Uint8Array,
    sign: any
  ) => {
    const contract = new ethers.Contract(contractAddress, contractAbi, signer);

    // write your action cf.balanceof
    const response = await contract.getTotalSupply(publicKey, sign);
    const decryptData = instance.decrypt(contractAddress, response);

    // const encryptedAmount = instance.encrypt32(1234);
	// console.log(encryptedAmount)
    // const mintRes = await contract.mint(encryptedAmount);
    // const decryptData = instance.decrypt(contractAddress, mintRes);

    return decryptData;
  };

  const sendRequest = async () => {
    setIsProgress(true);
    const instance = await initInstance();
    const { publicKey, sign } = await getToken(instance);
    const contractResult = await executeContract(instance, publicKey, sign);
    setResult(contractResult);
    setIsConnected(true);
    setIsProgress(false);
  };

  return (
    <>
      <Header />
      {!isConnected ? (
        <Button
          variant="contained"
          color="info"
          className="bg-blue-700"
          disabled={isProgress}
          onClick={sendRequest}
        >
          contractを起動する
        </Button>
      ) : (
        <Typography className="text-black">result: {result}</Typography>
      )}
    </>
  );
}
