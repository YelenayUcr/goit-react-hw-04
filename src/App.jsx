import { useState, useEffect } from 'react';
import { Toaster, toast } from 'react-hot-toast';
import SearchBar from './components/SearchBar/SearchBar';
import ImageGallery from './components/ImageGallery/ImageGallery';
import Loader from './components/Loader/Loader';
import ErrorMessage from './components/ErrorMessage/ErrorMessage';
import LoadMoreBtn from './components/LoadMoreBtn/LoadMoreBtn';
import ImageModal from './components/ImageModal/ImageModal';
import { fetchImages } from './services/imageService';

function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  const handleSearch = (query) => {
    if (query.trim() === '') {
      toast.error('Lütfen bir arama terimi girin!');
      return;
    }
    setSearchQuery(query);
    setImages([]);
    setPage(1);
  };

  useEffect(() => {
    if (!searchQuery) return; 

    const getImages = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await fetchImages(searchQuery, page, 12);
        if (data.results.length === 0) {
          toast.error('Aradığınız kriterde sonuç bulunamadı!');
        }
        setImages((prevImages) => [...prevImages, ...data.results]);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    getImages();
  }, [searchQuery, page]);

  const handleLoadMore = () => {
    setPage((prevPage) => prevPage + 1);
  };

  const openModal = (imageUrl) => {
    setSelectedImage(imageUrl);
    setShowModal(true);
  };

  const closeModal = () => {
    setSelectedImage(null);
    setShowModal(false);
  };

  return (
    <div>
      <SearchBar onSubmit={handleSearch} />
      {error && <ErrorMessage message={error} />}
      <ImageGallery images={images} onImageClick={openModal} />
      {loading && <Loader />}
      {!loading && images.length > 0 && (
        <LoadMoreBtn onClick={handleLoadMore} />
      )}
      {showModal && (
        <ImageModal
          isOpen={showModal}
          onClose={closeModal}
          imageUrl={selectedImage}
        />
      )}

      <Toaster position="top-right" />
    </div>
  );
}

export default App;
