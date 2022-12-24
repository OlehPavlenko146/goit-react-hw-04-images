import { useState, useEffect } from 'react';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Loader } from './Loader/Loader';
import { SearchBar } from './Searchbar/Searchbar';
import { api } from '../services/api';
import { Button } from './Button/Button';
import { StartTitle, ErrorMessage } from './App.styled';

export const App = () => {
  const [query, setQuery] = useState('');
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [status, setStatus] = useState('idle');

  const handleFormSubmit = searchQuery => {
    if (searchQuery !== query) {
      setQuery(searchQuery);
      setImages([]);
      setPage(1);
      setStatus('idle');
      setTotal(0);
    }
  };

  useEffect(() => {
    if (query) {
      setIsLoading(true);
      api
        .fetchImages(query, page)
        .then(data => {
          setImages(images => [...images, ...data.hits]);
          setTotal(data.total);
          setStatus('resolved');
        })
        .catch(error => setError(error))
        .finally(() => setIsLoading(false));
    }
  }, [query, page]);

  const loadMore = () => {
    setPage(page => page + 1);
  };

  return (
    <>
      <SearchBar onSubmit={handleFormSubmit} />
      {isLoading && <Loader />}
      {!query && <StartTitle>Enter what would you like to find</StartTitle>}
      {error && <ErrorMessage> {error.message}</ErrorMessage>}
      {status === 'resolved' && <ImageGallery images={images} />}
      {status === 'resolved' && total === 0 && (
        <ErrorMessage>Nothing found</ErrorMessage>
      )}
      {images.length >= 12 && <Button onClick={loadMore} />}
    </>
  );
};
