import React, { useEffect } from 'react';

interface ImagePreviewModalProps {
  imageUrl: string;
  achievementName: string;
  onClose: () => void;
}

const ImagePreviewModal: React.FC<ImagePreviewModalProps> = ({ imageUrl, achievementName, onClose }) => {
  // Close modal when pressing Escape key
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [onClose]);

  // Close modal when clicking outside the image
  const handleBackdropClick = (event: React.MouseEvent) => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  return (
    <div className="modal-backdrop" onClick={handleBackdropClick}>
      <div className="modal-content">
        <button className="modal-close" onClick={onClose}>×</button>
        <img 
          src={imageUrl} 
          alt={achievementName} 
          className="modal-image"
        />
        <div className="modal-caption">{achievementName}</div>
      </div>
    </div>
  );
};

export default ImagePreviewModal; 