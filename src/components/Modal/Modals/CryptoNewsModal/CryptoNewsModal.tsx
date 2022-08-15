import React from "react";
import CryptoNewsItem from "../../../CryptoNewsItem/CryptoNewsItem";

import "./CryptoNewsModal.scss";

function CryptoNewsModal({ news }: any) {
    if (!news) return null;

    return (
        <CryptoNewsItem news={news} isFullWidth={false} isFull={true} />
    );
}

export default CryptoNewsModal;
