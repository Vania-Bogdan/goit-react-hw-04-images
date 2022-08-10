import React from "react";
import '../css/styles.css';

import PropTypes from 'prop-types';

const Button = ({ onClick }) => (
    <div className="centrifi">
        <button type="button" onClick={onClick} className="Button">
        Load more
        </button>
    </div>
);

Button.propTypes = {
    changePage: PropTypes.func.isRequired,
};

export default Button;