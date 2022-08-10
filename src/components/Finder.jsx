import React from "react";
import '../components/css/styles.css'
import ImageAPI from "../services/image-api"
import { ToastContainer } from 'react-toastify';

import Searchbar from "./parts/Searchbar";
import ImageGallery from "./parts/ImageGallery";
import Button from "./parts/Button";
import Loader from "./parts/Loader";
import Modal from "./parts/Modal";

class Finder extends React.Component {
    state = {
        imageSearch: '',
        images: [],
        page: 1,
        error: null,
        status: 'idle',
        largeImage: null,
        tags: null,
        showModal: false,
        showBtn: false,
        loaderActive: false,
    }

    loadMore = () => {
        this.setState(prevState => ({
            page: prevState.page + 1,
        }));
    };

    async componentDidUpdate(_, prevState) {
    const prevImage = prevState.imageSearch;
    const nextImage = this.state.imageSearch;
    const prevPage = prevState.page;
    const nextPage = this.state.page;

    if (prevImage !== nextImage || prevPage !== nextPage) {
        try {
            this.setState({ loaderActive: true, });
        
            const imagesData = await ImageAPI.fetchImage(nextImage, nextPage);

            this.setState(prevState => ({
                images: nextPage === 1 ? imagesData.hits : [...prevState.images, ...imagesData.hits],
                status: 'resolved',
                showBtn: true,
            }))
            
            if (imagesData.total === 0) {
                this.setState({
                    status: 'rejected',
                    images: [],
                    showBtn: false
                });
            }
        
            if (imagesData.total > 0 && imagesData.hits.length < 12) {
                this.setState({                
                    showBtn: false,
                });
            }                  
            } catch (error) {
                this.setState({ error, status: 'rejected' })
            } finally {
                this.setState({ loaderActive: false });
            }
        }
    }

    handleFormSubmit = imageSearch => {
    this.setState({
        imageSearch,
        images: [],
        page: 1, });
    };

    toggleModal = (largePicture, tags) => {
    this.setState(({ showModal }) => ({
        showModal: !showModal,
    }));
        this.setState({ largePicture: largePicture, tags:tags });
    };

    render() {
        const { images, largePicture, tags, status, showModal, showBtn, loaderActive } = this.state;
        return (
            <div>
                <Searchbar onSubmit={this.handleFormSubmit} />
                {status === 'idle' && (
                    <h2 className='centrifi'>Type something to find a picture.
                    </h2>
                )}
                {loaderActive && (
                    <Loader />
                )}
                {status === 'rejected' && (
                    <h2 className='centrifi'>Not found.</h2>
                )}
                {status === 'resolved' && (        
                    <ImageGallery images={images} openModal={this.toggleModal}/>
                )}
                {showBtn && <Button onClick={this.loadMore} />}
                {showModal && (<Modal
                    onClose={this.toggleModal}
                    largePicture={largePicture}
                    tags={tags}
                />)}
                <ToastContainer position="top-center" theme="colored" />
            </div>
        );
    }
}

export default Finder;