
export const imageLoader = ({ src, width, quality }) => {
    return `${process.env.NEXT_PUBLIC_API_BASE_URL}/${src}?w=${width}&q=${quality || 75}`;
}

