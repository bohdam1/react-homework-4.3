import React, { useState, useEffect, useCallback } from "react";
import { ImageGalleryItem } from "components/ImageGalleryItem/ImageGalleryItem";
import { CustomLoader } from "components/Loader/Loader.jsx";
import { Modal } from "components/Modal/Modal";
import { Button } from "components/Button/Button";
import css from "./ImageGallery.module.css";

export const ImageGallery = ({ name }) => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [page, setPage] = useState(1);
  const [error, setError] = useState(null);

  const fetchImages = useCallback(() => {
    setLoading(true);
    fetch(
      `https://pixabay.com/api/?key=43324490-9271efc526d8e6f2666c059a2&q=${name}&image_type=photo&orientation=horizontal&per_page=12&page=${page}`
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        setImages((prevImages) => {
          return page === 1 ? data.hits : [...prevImages, ...data.hits];
        });
      })
      .catch((error) => {
        console.error("Error fetching images:", error);
        setError(error);
      })
      .finally(() => setLoading(false));
  }, [name, page]);

  useEffect(() => {
    setPage(1); // Reset page number when name changes
    setImages([]); // Clear images when name changes
    setError(null); // Clear previous errors
  }, [name]);

  useEffect(() => {
    if (name) {
      fetchImages();
    }
  }, [name, fetchImages]);

  const handleModalOpen = (largeImageURL) => {
    setSelectedImage(largeImageURL);
    setModalOpen(true);
  };

  const handleModalClose = () => {
    setModalOpen(false);
    setSelectedImage(null);
  };

  const loadMoreImages = () => {
    setPage((prevPage) => prevPage + 1);
  };

  return (
    <div>
      <ul className={css.imagegallery}>
        {images.map((image) => (
          <ImageGalleryItem
            key={image.id}
            webformatURL={image.webformatURL}
            tags={image.tags}
            onClick={() => handleModalOpen(image.largeImageURL)}
          />
        ))}
      </ul>
      {loading && <CustomLoader />}
      {!loading && images.length > 0 && (
        <Button onClick={loadMoreImages}>Load More</Button>
      )}
      {modalOpen && (
        <Modal largeImageURL={selectedImage} onClose={handleModalClose} />
      )}
      {error && <div className={css.error}>Error: {error.message}</div>}
    </div>
  );
};
