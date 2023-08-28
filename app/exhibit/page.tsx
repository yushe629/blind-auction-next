import Header from "../components/Header"
import web3 from "web3"

const samples = [
    {
        imgSrc: "",
        title: "メタデータとか",
    }
]
export default function ExhibitPage() {
    return (
        <>
            <Header />
            <div>
                exhibit page
            </div>
            <div className="text-center">
                wallet に接続されたnftの一覧を表示したい
                {samples.map((item) => (
                    <div className="flex flex-row justify-around width-10 height-10">
                        <div>
                            <img src={item.imgSrc} alt="画像" />
                        </div>
                        <div className="text-white">{item.title}</div>
                        <div>出品</div>
                    </div>))}
            </div>
        </>
    )
}