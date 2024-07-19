import { useState } from "react";
import Router from "next/router"
import axios from "axios";
import { API_BASE_URL } from '../../const/CustomConsts';
import { BtnActive14 } from "../../const/CustomConsts";
import { toast } from 'react-toastify';

export default function IndexFaqPanel({ id, que, ans }) {
    const handleHelpfulButtonClick = () => {
        let saveData = JSON.parse(localStorage.saveData || null) || {};
        let rateArr = saveData.rateArr ? saveData.rateArr : [];
        let rateValue = rating
        if (rateArr.includes(rightAns.id)) {
            rateArr = rateArr.filter(item => item !== rightAns.id);
            rateValue--
        } else {
            rateArr.push(rightAns.id);
            rateValue++
        }
        saveData.rateArr = rateArr;
        localStorage.saveData = JSON.stringify(saveData);
        axios.put(API_BASE_URL + '/faq/admin/answer/' + rightAns.id,
            { 'rating': rateValue }
        ).then((res) => {
            if (res.data.statusCode == 200) {
                toast.success('sucess');
                setRating(rateValue)
            }
        }).catch((err) => {
            if (err.response?.status == 401) {
                toast.error("пожалуйста, войдите в систему");
                Router.push('/auth/login');
            }
            console.log(err);
        });
    }

    let rightAns = ans.filter(function (obj) { return obj.isRight == true && obj.approve == 1 })[0];
    const [rating, setRating] = useState(rightAns ? rightAns.rating : 0)

    return (
        <div className="w-full space-y-2 border border-[#D7D7D7] p-5 rounded-xl font-Manrop">
            <div className="hidden md:block">
                <h6 className="h-14 flex-wrap custom-ellipsis-one cursor-pointer"
                    onClick={() => { Router.push("/faq/" + id) }}>
                    {que}
                </h6>
                <div className="h-[100px] md:h-[105px] custom-ellipsis-two mt-4 class-p2">
                    {rightAns?.answerText}
                </div>
            </div>
            <div className="block md:hidden">
                <div className="h-14 flex-wrap custom-ellipsis-one class-btn cursor-pointer"
                    onClick={() => { Router.push("/faq/" + id) }}>
                    {que}
                </div>
                <div className="h-[100px] md:h-[105px] custom-ellipsis-two mt-4 class-p3">
                    {rightAns?.answerText}
                </div>
            </div>
            <div className="block md:hidden">
                <div onClick={() => { handleHelpfulButtonClick() }}>
                    {(rating > 1) ? (
                        <button className="defaultButton14">
                            Было полезно • {rating}
                        </button>
                    ) : (
                        <button className={BtnActive14}>
                            Было полезно{(rating == 0) ? '' : (' • ' + rating)}
                        </button>
                    )}
                </div>
            </div >
            <div className="hidden md:block pt-4">
                <div onClick={() => { handleHelpfulButtonClick() }}>
                    {(rating > 1) ? (
                        <div>
                            <button className="defaultButton14">
                                Было полезно • {rating}
                            </button>
                        </div>
                    ) : (
                        <button className={BtnActive14}>
                            Было полезно{(rating == 0) ? '' : (' • ' + rating)}
                        </button>
                    )}
                </div>
            </div >
        </div >
    )
}
