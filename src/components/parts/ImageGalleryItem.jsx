import React from "react";
import '../css/styles.css';

import PropTypes from 'prop-types';

const ImageGalleryItem = ({ id, webformatURL, largeImageURL, tags, onClick}) => {
    return (
        <li className="ImageGalleryItem" key={id}>
            <img
            onClick={() => onClick(largeImageURL, tags)}
            src={webformatURL}
            alt={tags}
            data-source={largeImageURL}
            className="ImageGalleryItem-image"
            />
        </li>
    )
}

ImageGalleryItem.propTypes = {
    id: PropTypes.string,
    webformatURL: PropTypes.string,
    largeImageURL: PropTypes.string,
    tags: PropTypes.string,
};

export default ImageGalleryItem;