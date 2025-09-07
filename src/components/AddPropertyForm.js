import React, { useState } from 'react';

// Component for adding new property with form validation
function AddPropertyForm({ onAddProperty, onClose }) {
  // Form state to manage input values
  const [formData, setFormData] = useState({
    name: '',
    type: '',
    location: '',
    price: '',
    description: '',
    image: '',
    bedrooms: '',
    bathrooms: '',
    area: '',
    coordinates: ''
  });

  // State to manage form validation errors
  const [errors, setErrors] = useState({});
  
  // State to show loading during form submission
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Available property types for dropdown
  const propertyTypes = [
    { value: '', label: 'Select Property Type' },
    { value: 'apartment', label: 'Apartment' },
    { value: 'house', label: 'House' },
    { value: 'villa', label: 'Villa' }
  ];

  // Handle input field changes
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Clear specific error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  // Validate form data before submission
  const validateForm = () => {
    const newErrors = {};

    // Required field validations
    if (!formData.name.trim()) {
      newErrors.name = 'Property name is required';
    }

    if (!formData.type) {
      newErrors.type = 'Property type is required';
    }

    if (!formData.location.trim()) {
      newErrors.location = 'Location is required';
    }

    if (!formData.price || formData.price <= 0) {
      newErrors.price = 'Valid price is required';
    }

    if (!formData.description.trim()) {
      newErrors.description = 'Description is required';
    }

    if (!formData.bedrooms || formData.bedrooms <= 0) {
      newErrors.bedrooms = 'Number of bedrooms is required';
    }

    if (!formData.bathrooms || formData.bathrooms <= 0) {
      newErrors.bathrooms = 'Number of bathrooms is required';
    }

    if (!formData.area.trim()) {
      newErrors.area = 'Area is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();

    // Validate form before submission
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      // Prepare data for API submission
      const propertyData = {
        ...formData,
        price: parseInt(formData.price),
        bedrooms: parseInt(formData.bedrooms),
        bathrooms: parseInt(formData.bathrooms),
        image: formData.image || 'https://via.placeholder.com/400x250?text=Property+Image'
      };

      // Call parent component's add property function
      await onAddProperty(propertyData);
      
    } catch (error) {
      console.error('Error submitting form:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content add-property-modal">
        <div className="modal-header">
          <h2>Add New Property</h2>
          <button 
            className="close-button"
            onClick={onClose}
            disabled={isSubmitting}
          >
            ×
          </button>
        </div>

        <form onSubmit={handleSubmit} className="property-form">
          <div className="form-grid">
            {/* Property Name */}
            <div className="form-group">
              <label htmlFor="name">Property Name *</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className={errors.name ? 'error' : ''}
                placeholder="Enter property name"
              />
              {errors.name && <span className="error-message">{errors.name}</span>}
            </div>

            {/* Property Type */}
            <div className="form-group">
              <label htmlFor="type">Property Type *</label>
              <select
                id="type"
                name="type"
                value={formData.type}
                onChange={handleInputChange}
                className={errors.type ? 'error' : ''}
              >
                {propertyTypes.map(type => (
                  <option key={type.value} value={type.value}>
                    {type.label}
                  </option>
                ))}
              </select>
              {errors.type && <span className="error-message">{errors.type}</span>}
            </div>

            {/* Location */}
            <div className="form-group">
              <label htmlFor="location">Location *</label>
              <input
                type="text"
                id="location"
                name="location"
                value={formData.location}
                onChange={handleInputChange}
                className={errors.location ? 'error' : ''}
                placeholder="Enter location"
              />
              {errors.location && <span className="error-message">{errors.location}</span>}
            </div>

            {/* Price */}
            <div className="form-group">
              <label htmlFor="price">Price (INR) *</label>
              <input
                type="number"
                id="price"
                name="price"
                value={formData.price}
                onChange={handleInputChange}
                className={errors.price ? 'error' : ''}
                placeholder="Enter price in INR"
                min="0"
              />
              {errors.price && <span className="error-message">{errors.price}</span>}
            </div>

            {/* Bedrooms */}
            <div className="form-group">
              <label htmlFor="bedrooms">Bedrooms *</label>
              <input
                type="number"
                id="bedrooms"
                name="bedrooms"
                value={formData.bedrooms}
                onChange={handleInputChange}
                className={errors.bedrooms ? 'error' : ''}
                placeholder="Number of bedrooms"
                min="0"
              />
              {errors.bedrooms && <span className="error-message">{errors.bedrooms}</span>}
            </div>

            {/* Bathrooms */}
            <div className="form-group">
              <label htmlFor="bathrooms">Bathrooms *</label>
              <input
                type="number"
                id="bathrooms"
                name="bathrooms"
                value={formData.bathrooms}
                onChange={handleInputChange}
                className={errors.bathrooms ? 'error' : ''}
                placeholder="Number of bathrooms"
                min="0"
              />
              {errors.bathrooms && <span className="error-message">{errors.bathrooms}</span>}
            </div>

            {/* Area */}
            <div className="form-group">
              <label htmlFor="area">Area *</label>
              <input
                type="text"
                id="area"
                name="area"
                value={formData.area}
                onChange={handleInputChange}
                className={errors.area ? 'error' : ''}
                placeholder="e.g., 1200 sq ft"
              />
              {errors.area && <span className="error-message">{errors.area}</span>}
            </div>

            {/* Image URL (Optional) */}
            <div className="form-group">
              <label htmlFor="image">Image URL (Optional)</label>
              <input
                type="url"
                id="image"
                name="image"
                value={formData.image}
                onChange={handleInputChange}
                placeholder="Enter image URL"
              />
            </div>
          </div>

          {/* Description */}
          <div className="form-group full-width">
            <label htmlFor="description">Description *</label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              className={errors.description ? 'error' : ''}
              placeholder="Enter property description"
              rows="4"
            />
            {errors.description && <span className="error-message">{errors.description}</span>}
          </div>

          {/* Coordinates (Optional) */}
          <div className="form-group full-width">
            <label htmlFor="coordinates">Coordinates (Optional)</label>
            <input
              type="text"
              id="coordinates"
              name="coordinates"
              value={formData.coordinates}
              onChange={handleInputChange}
              placeholder="e.g., 19.0760, 72.8777"
            />
          </div>

          {/* Form Actions */}
          <div className="form-actions">
            <button 
              type="button" 
              onClick={onClose}
              className="btn btn-secondary"
              disabled={isSubmitting}
            >
              Cancel
            </button>
            <button 
              type="submit"
              className="btn btn-primary"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Adding Property...' : 'Add Property'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddPropertyForm;