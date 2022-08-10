import React from "react";
import '../css/styles.css';

import ImageGalleryItem from "./ImageGalleryItem";
import PropTypes from 'prop-types';

export default function ImageGallery({ images, openModal }) {
    return (
        <ul className="ImageGallery">
            {images.map(({ id, webformatURL, largeImageURL, tags }) => (
                <ImageGalleryItem
                key={id}
                webformatURL={webformatURL}
                largeImageURL={largeImageURL}
                tags={tags}
                onClick={openModal}
                />
            ))}
        </ul>   
    )
}
    
ImageGallery.propTypes = {
    images: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
    openModal: PropTypes.func.isRequired,
};