import React, { useEffect } from 'react';

interface ImagePreviewModalProps {
  imageUrl: string;
  achievementName: string;
  achievementRarity?: string;
  achievementNumber?: number;
  onClose: () => void;
}

const ImagePreviewModal: React.FC<ImagePreviewModalProps> = ({ 
  imageUrl, 
  achievementName, 
  achievementRarity,
  achievementNumber,
  onClose 
}) => {
  // Debug: Log the rarity value
  console.log('Modal rarity:', achievementRarity);
  
  // Function to convert abbreviated rarity to full name
  const getRarityDisplayName = (rarity: string) => {
    switch (rarity) {
      case 'C': return 'Common';
      case 'U': return 'Uncommon';
      case 'R': return 'Rare';
      case 'M': return 'Mythic';
      case 'L': return 'Legendary';
      case 'SPG': return 'SPG';
      case 'Expert': return 'Expert';
      default: return rarity || 'Common';
    }
  };

  // Function to get rarity-specific styles
  const getRarityStyles = (rarity: string) => {
    const baseStyles = {
      padding: '0.5rem 1rem',
      borderRadius: '20px',
      fontWeight: '600',
      fontSize: '0.9rem',
      textTransform: 'uppercase' as const,
      letterSpacing: '0.5px',
      whiteSpace: 'nowrap' as const,
    };
    
    switch (rarity) {
      case 'C':
      case 'Common':
        return { ...baseStyles, background: 'linear-gradient(135deg, #000000 0%, #333333 100%)', color: 'white' };
      case 'U':
      case 'Uncommon':
        return { ...baseStyles, background: 'linear-gradient(135deg, #c0c0c0 0%, #a0a0a0 100%)', color: 'black' };
      case 'R':
      case 'Rare':
        return { ...baseStyles, background: 'linear-gradient(135deg, #ffd700 0%, #ffed4e 100%)', color: 'black' };
      case 'M':
      case 'Mythic':
        return { ...baseStyles, background: 'linear-gradient(135deg, #ff6b35 0%, #f7931e 100%)', color: 'black' };
      case 'L':
      case 'Legendary':
        return { ...baseStyles, background: 'linear-gradient(135deg, #ff6b35 0%, #f7931e 100%)', color: 'black' };
      case 'SPG':
        return { ...baseStyles, background: 'linear-gradient(135deg, #ff6b35 0%, #f7931e 100%)', color: 'black' };
      case 'Expert':
        return { ...baseStyles, background: 'linear-gradient(135deg, #ff6b35 0%, #f7931e 100%)', color: 'black' };
      default:
        return { ...baseStyles, background: 'linear-gradient(135deg, #000000 0%, #333333 100%)', color: 'white' };
    }
  };
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
        <div className="modal-details">
          <div className="modal-caption">{achievementName}</div>
          <div className="modal-info">
            <span 
              style={getRarityStyles(achievementRarity || 'Common')}
            >
              {getRarityDisplayName(achievementRarity || 'Common')}
            </span>
            <span className="modal-number">#{achievementNumber}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImagePreviewModal; 