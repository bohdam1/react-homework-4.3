import React, {useState, useEffect} from "react";
import { Searchbar } from "./Searchbar/Searchbar";
import { ImageGallery } from "./ImageGallery/ImageGallery";

export const App = () => {
  const [images, setImages] = useState(null);
  const [name, setName] = useState("");

  useEffect(() => {
    fetch(`https://pixabay.com/api/?key=43324490-9271efc526d8e6f2666c059a2&image_type=photo&orientation=horizontal&per_page=12`)
      .then(response => response.json())
      .then(data => setImages(data.hits))
      .catch(error => console.error("Error fetching images:", error));
  }, []);

  
  const handleFormSearch = (name) => {
    setName(name);
  }

  return (
    <div>
      <Searchbar onSubmit={handleFormSearch} />
      <ImageGallery name={name} images={images} />
    </div>
  );
}
