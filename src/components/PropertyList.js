import React from 'react';
import PropertyCard from './PropertyCard';

// Component to display list of properties in a grid layout
function PropertyList({ properties, onViewDetails }) {
  // Show message when no properties are found
  if (properties.length === 0) {
    return (
      <div className="no-properties">
        <h3>No properties found</h3>
        <p>Try adjusting your search criteria or add a new property.</p>
      </div>
    );
  }

  return (
    <div className="property-list">
      <div className="properties-count">
        <h2>Properties ({properties.length})</h2>
      </div>
      
      {/* Grid layout for property cards */}
      <div className="properties-grid">
        {properties.map(property => (
          <PropertyCard 
            key={property.id}
            property={property}
            onViewDetails={onViewDetails}
          />
        ))}
      </div>
    </div>
  );
}

export default PropertyList;