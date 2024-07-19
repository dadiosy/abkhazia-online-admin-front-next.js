import axios from "axios";
import { API_BASE_URL } from './CustomConsts';
// import config from "./CustomConsts";
// config.API_BASE_URL

export const create_question = (access_token, data) => {
    const cfg = {
        headers: {
            Authorization: "Bearer " + access_token,
        },
    };
    return axios.post(API_BASE_URL + "/faq/question/create", data, cfg);
};

export const getMetaData = async (data) => {
    return await axios.get(API_BASE_URL + "/seometa", {});
};
export const postMetaData = (data) => {
    return axios.post(API_BASE_URL + "/meta", data);
};
export const putMetaData = (data) => {
    return axios.put(API_BASE_URL + "/meta", data);
};
export const deleteMetaData = (data) => {
    return axios.delete(API_BASE_URL + "/meta", data);
};
// export const get_favorites_groups = (access_token, type) => {
//     const cfg = {
//         headers: {
//             "Authorization": "Bearer " + access_token
//         }
//     }
//     return axios.get(config.base_url + '/user/favorite-groups/' + type, cfg);
// }

// export const create_favorites_groups = (access_token, data) => {
//     const cfg = {
//         headers: {
//             Authorization: "Bearer " + access_token,
//         },
//     };
//     return axios.post(config.base_url + "/user/favorite-groups", { name: data }, cfg);
// };

// export const put_favorites_groups = (access_token, data) => {
//     const cfg = {
//         headers: {
//             Authorization: "Bearer " + access_token,
//         },
//     };
//     return axios.post(config.base_url + "/user/favorites", { group_ids: data }, cfg);
// };

// export const create_favorite = (access_token, data) => {
//     const cfg = {
//         headers: {
//             Authorization: "Bearer " + access_token,
//         },
//     };
//     return axios.post(config.base_url + "/user/favorites", data, cfg);
// };

