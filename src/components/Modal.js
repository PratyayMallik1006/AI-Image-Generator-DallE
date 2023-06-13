import { useRef, useState } from "react";

const Modal = ({
  setModalOpen,
  setSelectedImage,
  selectedImage,
  generateVariations,
}) => {
  const [error, setError] = useState(null);
  const ref = useRef(null);

  console.log("SelectedImage", selectedImage);
  const closeModal = () => {
    setModalOpen(false);
    setSelectedImage(null);
  };

  const checkSize = () => {
    if (ref.current.width === 256 && ref.current.height === 256) {
      generateVariations();
    } else {
      setError("Error: Chose image of 256x256");
    }
  };

  return (
    <div className="modal">
      <div onClick={closeModal}>X</div>
      <div className="img-container">
        {selectedImage && (
          <img
            ref={ref}
            src={URL.createObjectURL(selectedImage)}
            alt="uploaded file"
          />
        )}
      </div>
      <p>{error || "Image must be 256X256"}</p>
      {!error && <button onClick={checkSize}>Generate</button>}
      {error && <button onClick={closeModal}>Close and try again</button>}
    </div>
  );
};

export default Modal;
