import React, { useState } from 'react';

// Component for search and filter functionality
function FilterBar({ onFilter }) {
  // State for search input value
  const [searchTerm, setSearchTerm] = useState('');
  
  // State for selected property type filter
  const [selectedType, setSelectedType] = useState('all');

  // Available property types for filtering
  const propertyTypes = [
    { value: 'all', label: 'All Types' },
    { value: 'apartment', label: 'Apartment' },
    { value: 'house', label: 'House' },
    { value: 'villa', label: 'Villa' }
  ];

  // Handle search input changes
  const handleSearchChange = (event) => {
    const newSearchTerm = event.target.value;
    setSearchTerm(newSearchTerm);
    
    // Call the parent component's filter function
    onFilter(newSearchTerm, selectedType);
  };

  // Handle property type filter changes
  const handleTypeChange = (event) => {
    const newType = event.target.value;
    setSelectedType(newType);
    
    // Call the parent component's filter function
    onFilter(searchTerm, newType);
  };

  // Clear all filters and search
  const clearFilters = () => {
    setSearchTerm('');
    setSelectedType('all');
    onFilter('', 'all');
  };

  return (
    <div className="filter-bar">
      <div className="filter-container">
        {/* Search Input */}
        <div className="search-box">
          <input
            type="text"
            placeholder="Search by property name or location..."
            value={searchTerm}
            onChange={handleSearchChange}
            className="search-input"
          />
          <span className="search-icon">🔍</span>
        </div>

        {/* Property Type Filter */}
        <div className="filter-dropdown">
          <select
            value={selectedType}
            onChange={handleTypeChange}
            className="filter-select"
          >
            {propertyTypes.map(type => (
              <option key={type.value} value={type.value}>
                {type.label}
              </option>
            ))}
          </select>
        </div>

        {/* Clear Filters Button */}
        <div className="filter-actions">
          <button 
            onClick={clearFilters}
            className="btn btn-secondary"
          >
            Clear Filters
          </button>
        </div>
      </div>

      {/* Active Filters Display */}
      {(searchTerm || selectedType !== 'all') && (
        <div className="active-filters">
          <span className="filters-label">Active filters:</span>
          
          {searchTerm && (
            <span className="filter-tag">
              Search: "{searchTerm}"
            </span>
          )}
          
          {selectedType !== 'all' && (
            <span className="filter-tag">
              Type: {propertyTypes.find(type => type.value === selectedType)?.label}
            </span>
          )}
        </div>
      )}
    </div>
  );
}

export default FilterBar;