import { API_BASE_URL } from "../const/CustomConsts";

export const imageLoader = ({ src, width, quality }) => {
    return `${API_BASE_URL}/${src}?w=${width}&q=${quality || 75}`;
}

