import { NextSeo } from "next-seo";
import NavBar from "./components/layout/NavBar";
import Footer from "./components/layout/Footer";
import ImageBottomText from "./components/common/ImageBottomText";
const AdminIndex = () => {
    return (
        <>
            <NextSeo title="Главная" />
            <NavBar />
            <div className="flex flex-col container mx-auto max-w-[1440px] mt-[60px] md:mt-[94px]">
                <div className="px-4 md:px-[8.333333333%]">
                    <div className="grid grid-cols-3 gap-10 my-10">
                        <div className="col-span-3 md:col-span-1" >
                            <ImageBottomText imgDesc="Мета-тег" imgSrc="/img/popular6.png" linkAddress="/meta" />
                        </div>
                        <div className="col-span-3 md:col-span-1" >
                            <ImageBottomText imgDesc="SEO & Текстовый блок" imgSrc="/img/popular1.png" linkAddress="/seo" />
                        </div>
                        <div className="col-span-3 md:col-span-1" >
                            <ImageBottomText imgDesc="Направления" imgSrc="/img/popular2.png" linkAddress="/direction" />
                        </div>
                        <div className="col-span-3 md:col-span-1" >
                            <ImageBottomText imgDesc="Блог" imgSrc="/img/popular3.png" linkAddress="/blog" />
                        </div>
                        <div className="col-span-3 md:col-span-1" >
                            <ImageBottomText imgDesc="Достопримечательности" imgSrc="/img/popular4.png" linkAddress="/attraction" />
                        </div>
                        <div className="col-span-3 md:col-span-1" >
                            <ImageBottomText imgDesc="FAQ" imgSrc="/img/popular5.png" linkAddress="/faq" />
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    )
}

export default AdminIndex;