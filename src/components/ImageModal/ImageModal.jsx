import ReactModal from 'react-modal';
import styles from './ImageModal.module.css';
import { useEffect } from 'react';

function ImageModal({ isOpen, onClose, imageUrl }) {
  useEffect(() => {
    ReactModal.setAppElement('#root');
  }, []);

  const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
      background: 'none',
      border: 'none',
      padding: 0,
      maxWidth: '90vw',
      maxHeight: '90vh',
    },
    overlay: {
      backgroundColor: 'rgba(0, 0, 0, 0.8)',
    },
  };

  return (
    <ReactModal
      isOpen={isOpen}
      onRequestClose={onClose}
      style={customStyles}
      contentLabel="Image Modal"
    >
      <div className={styles.modalContent}>
        <img src={imageUrl} alt="Large" className={styles.modalImage} />
        <button className={styles.closeButton} onClick={onClose}>
          Close
        </button>
      </div>
    </ReactModal>
  );
}

export default ImageModal;
