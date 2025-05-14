import { useEffect, useState } from "react";
import styles from './FetchedImage.module.css';
import { AiOutlineReload } from "react-icons/ai";

function FetchedImage({url, pixelated}: {url: string, pixelated: boolean}) {
    const [isImageLoaded, setIsImageLoaded] = useState(true);
    const [reloadTimeout, setReloadTimeout] = useState<boolean>(false);

    async function reloadImage(e: React.MouseEvent<HTMLButtonElement>) {
        e.stopPropagation();
        setIsImageLoaded(true);
        setReloadTimeout(true);
        setTimeout(() => setReloadTimeout(false), 5000);
    }

    useEffect(() => setIsImageLoaded(true), [url]);

    return ( <>
        {isImageLoaded? 
        <img
            className={styles['fetched-image']} src={url} onError={img => setIsImageLoaded(false)}
            style={{imageRendering: pixelated? 'pixelated': 'auto'}}
        />:
        <button className={`${styles['error']} ${reloadTimeout? styles.loading: ''}`} onClick={(e: React.MouseEvent<HTMLButtonElement>) => !reloadTimeout && reloadImage(e)}>
        {// @ts-ignore
            <AiOutlineReload size={48} />
        }
        </button>}
    </> );
}

export default FetchedImage;