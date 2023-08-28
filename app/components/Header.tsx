import Head from "next/head";
import Link from "next/link";
import ConnectWalletButton from "./ConnectWalletButton";

export default function Header() {
    return (
        <>
            <Head>
                <title>blind-auction</title>
                <meta name="viewport" content="initial-scale=1.0, width=device-width" />
            </Head>
            <div className="sticky bg-white top-0">
                <div className="flex flex-row justify-between px-4">
                    <Link href="/">
                        <div className="text-black"> Home </div>
                    </Link>
                    {/* <div className="text-black"> wallet </div> */}
                    <ConnectWalletButton />
                </div>
            </div>
        </>
    )
}