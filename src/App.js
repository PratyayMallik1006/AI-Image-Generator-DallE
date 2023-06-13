import { useState } from "react";
import Modal from "./components/Modal";

function App() {
  const [images, setImages] = useState(null);
  const [value, setValue] = useState("");
  const [error, setError] = useState(null);
  const [msg, setMsg] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  const supriseOptions = [
    "A blue ostrich eating melon",
    "A matisse style shark on the telephone",
    "Dancing Robot",
  ];

  const surpriseMe = () => {
    setImages(null);
    const randomValue =
      supriseOptions[Math.floor(Math.random() * supriseOptions.length)];

    setValue(randomValue);
  };

  const getImages = async () => {
    setImages(null);
    if (value === null) {
      setError("Error: Must have a search term");
      return;
    }
    setError(null);
    console.log("generate clicked");
    setMsg("Loading: please wait...");
    try {
      const options = {
        method: "POST",
        body: JSON.stringify({
          message: value,
        }),
        headers: {
          "Content-type": "application/json",
        },
      };
      const response = await fetch("http://localhost:8000/images", options);
      const data = await response.json();
      console.log(data);
      setImages(data);
      setMsg(null);
    } catch (error) {
      console.error(error);
    }
  };

  const uploadImage = async (e) => {
    console.log(e.target.files[0]);

    const formData = new FormData();
    formData.append("file", e.target.files[0]);
    setModalOpen(true);
    setSelectedImage(e.target.files[0]);
    e.target.value = null;

    try {
      const options = {
        method: "POST",
        body: formData,
      };
      const response = await fetch("http://localhost:8000/upload", options);
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  };

  const generateVariations = async () => {
    setImages(null);
    if (selectedImage === null) {
      setError("Error: No Image Selected");
      setModalOpen(false);
      return;
    }
    try {
      const options = {
        method: "POST",
      };
      const response = await fetch("http://localhost:8000/variations", options);
      const data = await response.json();
      setImages(data);
      setError(null);
      setModalOpen(false);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="app">
      <section className="search-section">
        <p>
          Start with a detailed description{" "}
          <span className="surprise" onClick={surpriseMe}>
            Surprise me
          </span>
        </p>
        <div className="input-container">
          <input
            value={value}
            placeholder="An impressionist oil painting of a sunflower in a purple vase..."
            onChange={(e) => setValue(e.target.value)}
          />
          <button onClick={getImages}>Generate</button>
        </div>
        <p className="extra-info">
          Or,
          <span>
            <label htmlFor="files" className="uploadlabel">
              {" "}
              upload an image{" "}
            </label>
            <input
              onChange={uploadImage}
              id="files"
              accept="image/*"
              type="file"
              hidden
            />
          </span>
          to edit.
        </p>
        {msg && <h3>{msg}</h3>}
        {error && <p>{error}</p>}
        {modalOpen && (
          <div className="overlay">
            <Modal
              setModalOpen={setModalOpen}
              setSelectedImage={setSelectedImage}
              selectedImage={selectedImage}
              generateVariations={generateVariations}
            />
          </div>
        )}
      </section>
      <section className="image-section">
        {images &&
          images.map((image, _index) => (
            <img key={_index} src={image.url} alt={`Generated ${value}`} />
          ))}
      </section>
    </div>
  );
}

export default App;
