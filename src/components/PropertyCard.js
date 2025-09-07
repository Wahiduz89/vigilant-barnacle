import React from 'react';

// Component for individual property card display
function PropertyCard({ property, onViewDetails }) {
  // Function to format price in Indian currency format
  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(price);
  };

  // Function to capitalize first letter of each word
  const capitalizeWords = (text) => {
    return text.replace(/\b\w/g, l => l.toUpperCase());
  };

  return (
    <div className="property-card">
      {/* Property Image */}
      <div className="property-image">
        <img 
          src={property.image} 
          alt={property.name}
          onError={(e) => {
            // Fallback image if the original fails to load
            e.target.src = 'https://via.placeholder.com/400x250?text=Property+Image';
          }}
        />
        <div className="property-type-badge">
          {capitalizeWords(property.type)}
        </div>
      </div>

      {/* Property Details */}
      <div className="property-details">
        <h3 className="property-name">{property.name}</h3>
        
        <p className="property-location">
          <span className="location-icon">📍</span>
          {property.location}
        </p>

        <p className="property-price">
          {formatPrice(property.price)}
        </p>

        <p className="property-description">
          {property.description.length > 100 
            ? `${property.description.substring(0, 100)}...` 
            : property.description
          }
        </p>

        {/* Property Features */}
        <div className="property-features">
          <span className="feature">🛏️ {property.bedrooms} Beds</span>
          <span className="feature">🚿 {property.bathrooms} Baths</span>
          <span className="feature">📐 {property.area}</span>
        </div>

        {/* View Details Button */}
        <div className="card-actions">
          <button 
            className="btn btn-outline"
            onClick={() => onViewDetails(property)}
          >
            View Details
          </button>
        </div>
      </div>
    </div>
  );
}

export default PropertyCard;