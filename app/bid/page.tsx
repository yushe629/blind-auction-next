import Header from "../components/Header";

async function connectwallet() {
    try {
        const acccounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        if (acccounts.length > 0) {
            // console.log(acccounts[0]);
            return acccounts
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

export default function BidPage() {
    return (
        <>
            <Header />
            <div>
                bid page
            </div>
            <div className="text-center">
                該当画像の詳細
            </div>
        </>
    )
}