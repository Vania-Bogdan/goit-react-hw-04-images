import { Component } from 'react';
import PropTypes from 'prop-types';
import '../css/styles.css';

import { BiSearch } from "@react-icons/all-files/bi/BiSearch";

export default class Searchbar extends Component {
        
    static propTypes = {
        onSubmit: PropTypes.func.isRequired,
    };
    
    state = {
        imageSearch: '',
    };

    handleImageChange = event => {
        this.setState({imageSearch: event.currentTarget.value.toLowerCase() });
    };

    handleSubmit = event => {
        event.preventDefault();
        if (this.state.imageSearch.trim() === '') {
            return;            
        }
        this.props.onSubmit(this.state.imageSearch);

        this.setState({ imageSearch: '' });
    };

    render() {
        const onSubmit = this.handleSubmit;
        const pictureChange = this.handleImageChange;

        return (
            <header className="Searchbar">
                <form className="SearchForm" onSubmit={onSubmit}>
                    <button type="submit" className="SearchForm-button">
                            <BiSearch className='SearchIcon' />
                    </button>
                    <input
                    className="SearchForm-input"
                    type="text"
                    autoComplete="off"
                    autoFocus
                    name="searchRequest"
                    value={this.state.imageSearch}
                    placeholder="Search images and photos"
                    onChange={pictureChange}
                    />
                </form>
            </header>
        );
    }
}