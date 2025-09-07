import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PropertyList from './components/PropertyList';
import AddPropertyForm from './components/AddPropertyForm';
import PropertyModal from './components/PropertyModal';
import FilterBar from './components/FilterBar';
import './App.css';

// Main App component that manages the entire application state
function App() {
  // State to store all properties fetched from API
  const [properties, setProperties] = useState([]);
  
  // State to store filtered properties based on search/filter criteria
  const [filteredProperties, setFilteredProperties] = useState([]);
  
  // State to show/hide the add property form
  const [showAddForm, setShowAddForm] = useState(false);
  
  // State to manage the property detail modal
  const [selectedProperty, setSelectedProperty] = useState(null);
  
  // State to show loading indicator
  const [loading, setLoading] = useState(true);

  // API base URL - change this if your json-server runs on different port
  const API_BASE_URL = 'http://localhost:3001/api';

  // Function to fetch all properties from the API
  const fetchProperties = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${API_BASE_URL}/properties`);
      setProperties(response.data);
      setFilteredProperties(response.data); // Initially show all properties
    } catch (error) {
      console.error('Error fetching properties:', error);
      alert('Failed to fetch properties. Make sure the server is running.');
    } finally {
      setLoading(false);
    }
  };

  // Function to add a new property via POST API
  const addProperty = async (newProperty) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/properties`, newProperty);
      console.log('Property added successfully:', response.data);
      
      // Refresh the property list after successful addition
      await fetchProperties();
      
      // Hide the add form
      setShowAddForm(false);
      
      alert('Property added successfully!');
    } catch (error) {
      console.error('Error adding property:', error);
      alert('Failed to add property. Please try again.');
    }
  };

  // Function to handle filtering and searching
  const handleFilter = (searchTerm, propertyType) => {
    let filtered = properties;

    // Filter by property type if selected
    if (propertyType && propertyType !== 'all') {
      filtered = filtered.filter(property => property.type === propertyType);
    }

    // Filter by search term (name or location)
    if (searchTerm.trim()) {
      filtered = filtered.filter(property => 
        property.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        property.location.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredProperties(filtered);
  };

  // Function to open property detail modal
  const openPropertyModal = (property) => {
    setSelectedProperty(property);
  };

  // Function to close property detail modal
  const closePropertyModal = () => {
    setSelectedProperty(null);
  };

  // Fetch properties when component mounts
  useEffect(() => {
    fetchProperties();
  }, []);

  return (
    <div className="App">
      {/* Header */}
      <header className="app-header">
        <h1>Property Listings</h1>
        <p>Find your dream property</p>
      </header>

      <div className="container">
        {/* Filter and Search Bar */}
        <FilterBar onFilter={handleFilter} />

        {/* Add Property Button */}
        <div className="action-buttons">
          <button 
            className="btn btn-primary"
            onClick={() => setShowAddForm(true)}
          >
            Add New Property
          </button>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="loading">
            <p>Loading properties...</p>
          </div>
        )}

        {/* Property List */}
        {!loading && (
          <PropertyList 
            properties={filteredProperties}
            onViewDetails={openPropertyModal}
          />
        )}

        {/* Add Property Form Modal */}
        {showAddForm && (
          <AddPropertyForm 
            onAddProperty={addProperty}
            onClose={() => setShowAddForm(false)}
          />
        )}

        {/* Property Detail Modal */}
        {selectedProperty && (
          <PropertyModal 
            property={selectedProperty}
            onClose={closePropertyModal}
          />
        )}
      </div>
    </div>
  );
}

export default App;