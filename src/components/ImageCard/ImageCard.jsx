import styles from './ImageCard.module.css';

function ImageCard({ smallImage, alt, onClick }) {
  return (
    <div className={styles.card} onClick={onClick}>
      <img src={smallImage} alt={alt} className={styles.image} />
    </div>
  );
}

export default ImageCard;
