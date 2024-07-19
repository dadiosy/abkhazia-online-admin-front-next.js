import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { getMetaData } from "../../const/Apis";

const MetaTag = ({ pageName }) => {
    const [metaData, setMetaData] = useState({});
    useEffect(() => {
        getMetaData({ 'pageName': pageName }).then(res => {
            setMetaData(res.data.data.filter((ele) => ele.page === pageName)[0]);
        }).catch(err => {
            console.log(err);
        })
    }, [])
    // console.log(metaData?.title, metaData?.description, metaData?.keyword)
    return (
        <Helmet>
            {/* <title>{metaData?.title}</title>
            <meta name="description" content={metaData?.description} /> */}
            <meta name="keywords" content={metaData?.keyword} />
        </Helmet>
    )
}
export default MetaTag;
