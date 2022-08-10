import { Audio } from  'react-loader-spinner'
import React from 'react';
import PropTypes from 'prop-types';
import '../css/styles.css';

export default function Loader() {
    return (<div className='centrifi'>
        <Audio
            height = "200"
            width = "120"
            radius = "9"
            color = '#00a2ff'
            ariaLabel = 'three-dots-loading'     
            wrapperStyle
            wrapperClass
        />
        ;
    </div>
    );
}

Loader.propTypes = {
    query: PropTypes.string,
};