import React from 'react';

// Modal component to display detailed property information
function PropertyModal({ property, onClose }) {
  // Function to format currency values in Indian format
  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(price);
  };

  // Function to capitalize property type text
  const capitalizeWords = (text) => {
    return text.replace(/\b\w/g, l => l.toUpperCase());
  };

  // Function to generate Google Maps URL from coordinates
  const getMapUrl = (coordinates) => {
    if (!coordinates) return null;
    return `https://www.google.com/maps?q=${coordinates}&t=&z=15&ie=UTF8&iwloc=&output=embed`;
  };

  // Handle click outside modal to close
  const handleOverlayClick = (event) => {
    if (event.target.classList.contains('modal-overlay')) {
      onClose();
    }
  };

  return (
    <div className="modal-overlay" onClick={handleOverlayClick}>
      <div className="modal-content property-detail-modal">
        {/* Modal Header */}
        <div className="modal-header">
          <h2>{property.name}</h2>
          <button className="close-button" onClick={onClose}>
            ×
          </button>
        </div>

        {/* Modal Body */}
        <div className="modal-body">
          <div className="property-detail-grid">
            {/* Property Image */}
            <div className="property-image-large">
              <img 
                src={property.image} 
                alt={property.name}
                onError={(e) => {
                  e.target.src = 'https://via.placeholder.com/600x400?text=Property+Image';
                }}
              />
              <div className="property-type-badge-large">
                {capitalizeWords(property.type)}
              </div>
            </div>

            {/* Property Information */}
            <div className="property-info">
              <div className="price-section">
                <h3 className="property-price-large">
                  {formatPrice(property.price)}
                </h3>
                <p className="property-location-large">
                  <span className="location-icon">📍</span>
                  {property.location}
                </p>
              </div>

              {/* Property Features Grid */}
              <div className="features-grid">
                <div className="feature-item">
                  <span className="feature-icon">🛏️</span>
                  <div className="feature-text">
                    <strong>{property.bedrooms}</strong>
                    <span>Bedrooms</span>
                  </div>
                </div>

                <div className="feature-item">
                  <span className="feature-icon">🚿</span>
                  <div className="feature-text">
                    <strong>{property.bathrooms}</strong>
                    <span>Bathrooms</span>
                  </div>
                </div>

                <div className="feature-item">
                  <span className="feature-icon">📐</span>
                  <div className="feature-text">
                    <strong>{property.area}</strong>
                    <span>Area</span>
                  </div>
                </div>
              </div>

              {/* Property Description */}
              <div className="description-section">
                <h4>Description</h4>
                <p>{property.description}</p>
              </div>

              {/* Contact Actions */}
              <div className="contact-actions">
                <button className="btn btn-primary">
                  Contact Agent
                </button>
                <button className="btn btn-outline">
                  Schedule Visit
                </button>
              </div>
            </div>
          </div>

          {/* Google Maps Integration (Optional) */}
          {property.coordinates && (
            <div className="map-section">
              <h4>Location on Map</h4>
              <div className="map-container">
                <iframe
                  src={getMapUrl(property.coordinates)}
                  width="100%"
                  height="300"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title={`Map location for ${property.name}`}
                />
              </div>
            </div>
          )}

          {/* Additional Property Details */}
          <div className="additional-details">
            <h4>Property Details</h4>
            <div className="details-grid">
              <div className="detail-item">
                <span className="detail-label">Property Type:</span>
                <span className="detail-value">{capitalizeWords(property.type)}</span>
              </div>
              
              <div className="detail-item">
                <span className="detail-label">Total Area:</span>
                <span className="detail-value">{property.area}</span>
              </div>
              
              <div className="detail-item">
                <span className="detail-label">Bedrooms:</span>
                <span className="detail-value">{property.bedrooms}</span>
              </div>
              
              <div className="detail-item">
                <span className="detail-label">Bathrooms:</span>
                <span className="detail-value">{property.bathrooms}</span>
              </div>

              {property.coordinates && (
                <div className="detail-item">
                  <span className="detail-label">Coordinates:</span>
                  <span className="detail-value">{property.coordinates}</span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="modal-footer">
          <button className="btn btn-secondary" onClick={onClose}>
            Close
          </button>
          <button className="btn btn-primary">
            Save to Favorites
          </button>
        </div>
      </div>
    </div>
  );
}

export default PropertyModal;