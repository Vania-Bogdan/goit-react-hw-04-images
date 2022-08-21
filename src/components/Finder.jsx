import '../components/css/styles.css'
import fetchImage from "../services/image-api"
import { ToastContainer } from 'react-toastify';
import { useEffect, useState } from "react";

import Searchbar from "./parts/Searchbar";
import ImageGallery from "./parts/ImageGallery";
import Button from "./parts/Button";
import Loader from "./parts/Loader";
import Modal from "./parts/Modal";

export default function Finder() {
    const [imageSearch, setImageSearch] = useState ('');
    const [images, setImages] = useState ([]);
    const [page, setPage] = useState (1);
    const [status, setStatus] = useState ('idle');
    const [largeImage, setLargeImage] = useState ('');
    const [tags, setTags] = useState(null);
    const [showModal, setShowModal] = useState (false);
    const [showBtn, setShowBtn] = useState (false);
    const [loaderActive, setLoaderActive] = useState(false);
    
    const loadMore = () => {
        setPage(prevPage => prevPage + 1)
    };

  // это приходит из формы при submit
    const handleFormSubmit = imageSearch => {
        setImageSearch(imageSearch);
        setPage(1);
        setImages([]);
    };

    useEffect(() => {
        if (!imageSearch) return;

        setLoaderActive(true);

        const getData = async () => {
        try {
            const imagesData = await fetchImage(imageSearch, page);
            
            if (page === 1) {
            setImages([...imagesData.hits]);
            } else {
            setImages(prevImages => [...prevImages, ...imagesData.hits]);        
            };

            setStatus('resolved');
            setShowBtn(true);

            if (imagesData.total === 0) {
            setStatus('rejected');
            setImages([]);
            setShowBtn(false);
            };
            
            if (imagesData.total > 0 && imagesData.hits.length < 12) {
            setShowBtn(false);
            };
        }
        catch (error) {
        console.log('oops')
        setStatus('rejected');
        } finally {
        setLoaderActive(false);
        }
    };
    getData();    
    }, [page, imageSearch]);


    const toggleModal = (largeImage, tags) => {
    setShowModal(!showModal);
    setLargeImage(largeImage);
    setTags(tags);
    };
    
return (
    <div>
    <Searchbar onSubmit={handleFormSubmit} />

    {status === 'idle' && (
      <h2 className='centrifi'>Type something to find a picture</h2>
    )}

    {loaderActive && (
      <Loader />
    )}

    {status === 'rejected' && (
      <h2 className='centrifi'>Not found...</h2>
    )}

    {status === 'resolved' && (
      <ImageGallery images={images} openModal={toggleModal} />
    )}
      
    {showBtn && <Button onClick={loadMore} />}
          
        
    {showModal && <Modal
      onClose={toggleModal}
      largePicture={largeImage}
      tags={tags}
    />}

    <ToastContainer position="top-center" theme="colored" />
  </div>
);
};


// class Finder extends React.Component {
//     state = {
//         imageSearch: '',
//         images: [],
//         page: 1,
//         error: null,
//         status: 'idle',
//         largeImage: null,
//         tags: null,
//         showModal: false,
//         showBtn: false,
//         loaderActive: false,
//     }

//     loadMore = () => {
//         this.setState(prevState => ({
//             page: prevState.page + 1,
//         }));
//     };

//     async componentDidUpdate(_, prevState) {
//     const prevImage = prevState.imageSearch;
//     const nextImage = this.state.imageSearch;
//     const prevPage = prevState.page;
//     const nextPage = this.state.page;

//     if (prevImage !== nextImage || prevPage !== nextPage) {
//         try {
//             this.setState({ loaderActive: true, });
        
//             const imagesData = await ImageAPI.fetchImage(nextImage, nextPage);

//             this.setState(prevState => ({
//                 images: nextPage === 1 ? imagesData.hits : [...prevState.images, ...imagesData.hits],
//                 status: 'resolved',
//                 showBtn: true,
//             }))
            
//             if (imagesData.total === 0) {
//                 this.setState({
//                     status: 'rejected',
//                     images: [],
//                     showBtn: false
//                 });
//             }
        
//             if (imagesData.total > 0 && imagesData.hits.length < 12) {
//                 this.setState({                
//                     showBtn: false,
//                 });
//             }                  
//             } catch (error) {
//                 this.setState({ error, status: 'rejected' })
//             } finally {
//                 this.setState({ loaderActive: false });
//             }
//         }
//     }

//     handleFormSubmit = imageSearch => {
//     this.setState({
//         imageSearch,
//         images: [],
//         page: 1, });
//     };

//     toggleModal = (largePicture, tags) => {
//     this.setState(({ showModal }) => ({
//         showModal: !showModal,
//     }));
//         this.setState({ largePicture: largePicture, tags:tags });
//     };

//     render() {
//         const { images, largePicture, tags, status, showModal, showBtn, loaderActive } = this.state;
//         return (
//             <div>
//                 <Searchbar onSubmit={this.handleFormSubmit} />
//                 {status === 'idle' && (
//                     <h2 className='centrifi'>Type something to find a picture.
//                     </h2>
//                 )}
//                 {loaderActive && (
//                     <Loader />
//                 )}
//                 {status === 'rejected' && (
//                     <h2 className='centrifi'>Not found.</h2>
//                 )}
//                 {status === 'resolved' && (        
//                     <ImageGallery images={images} openModal={this.toggleModal}/>
//                 )}
//                 {showBtn && <Button onClick={this.loadMore} />}
//                 {showModal && (<Modal
//                     onClose={this.toggleModal}
//                     largePicture={largePicture}
//                     tags={tags}
//                 />)}
//                 <ToastContainer position="top-center" theme="colored" />
//             </div>
//         );
//     }
// }

// export default Finder;