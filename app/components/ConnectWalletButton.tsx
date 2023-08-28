"use client"
import { useState } from "react"
import { Button, Typography } from "@mui/material"

async function connectedMetamaskWallet(): Promise<string | void> {
    try {
        const acccounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        if (acccounts.length > 0) {
            // console.log(acccounts[0]);
            return acccounts[0]
        }
    } catch (err: any) {
        if (err.code === 4001) {
            // EIP-1193 userRejectedRequest error
            // ユーザーが接続を拒否するとここに来ます
            console.log('Please connect to MetaMask.');
        } else {
            console.error(err);
        }
    }
}



export default function ConnectWalletButton() {
    const [isConnected, setIsConnected] = useState(false)
    const [isProgress, setIsProgress] = useState(false)
    const [accountId, setAccountId] = useState("");


    return (
        <>
            {
                !isConnected ? (
                    <Button variant="contained" color="info" className="bg-blue-700"
                        disabled={isProgress}
                        onClick={async () => {
                            setIsProgress(true)
                            setAccountId(await connectedMetamaskWallet() ?? "")
                            setIsConnected(true)
                            setIsProgress(false)
                        }}
                    >
                        walletに接続する
                    </Button>
                ) : (
                    <Typography className="text-black">
                        id: {accountId}
                    </Typography>
                )
            }
        </>
    )
}