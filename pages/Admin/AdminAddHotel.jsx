import { useState } from 'react';
import axios from 'axios';

import './AdminAddHotel.css';
import { FaUpload, FaPlusCircle, FaMapMarkerAlt, FaHotel, FaInfoCircle, FaMoneyBillWave } from 'react-icons/fa';

function AdminAddHotel() {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    location: ''
  });

  const [imageFile, setImageFile] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState({ text: '', type: '' });

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = e => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      // Create preview URL
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage({ text: '', type: '' });

    const data = new FormData();
    data.append('name', formData.name);
    data.append('description', formData.description);
    data.append('price', formData.price);
    data.append('location', formData.location);
    if (imageFile) {
      data.append('image', imageFile);
    }

    try {
      await axios.post('http://localhost:5000/api/hotels', data, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      
      setMessage({ text: 'Hotel added successfully!', type: 'success' });
      setFormData({ name: '', description: '', price: '', location: '' });
      setImageFile(null);
      setPreviewImage(null);
      document.getElementById('image-upload').value = '';
    } catch (err) {
      console.error('Upload error:', err);
      setMessage({ 
        text: err.response?.data?.message || 'Failed to add hotel', 
        type: 'danger' 
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container hotel-form-container">
      <div className="row justify-content-center">
        <div className="col-lg-8">
          <div className="card shadow">
            <div className="card-header bg-primary text-white">
              <h2 className="mb-0">
                <FaHotel className="me-2" />
                Add New Hotel
              </h2>
            </div>
            <div className="card-body">
              {message.text && (
                <div className={`alert alert-${message.type}`}>
                  {message.text}
                </div>
              )}
              
              <form onSubmit={handleSubmit} encType="multipart/form-data">
                <div className="mb-3">
                  <label htmlFor="name" className="form-label">
                    <FaHotel className="me-2" />
                    Hotel Name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="name"
                    name="name"
                    placeholder="Enter hotel name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="description" className="form-label">
                    <FaInfoCircle className="me-2" />
                    Description
                  </label>
                  <textarea
                    className="form-control"
                    id="description"
                    name="description"
                    rows="4"
                    placeholder="Enter hotel description"
                    value={formData.description}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="location" className="form-label">
                    <FaMapMarkerAlt className="me-2" />
                    Location
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="location"
                    name="location"
                    placeholder="Enter hotel location"
                    value={formData.location}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="price" className="form-label">
                    <FaMoneyBillWave className="me-2" />
                    Price Per Night ($)
                  </label>
                  <input
                    type="number"
                    className="form-control"
                    id="price"
                    name="price"
                    placeholder="Enter price per night"
                    value={formData.price}
                    onChange={handleChange}
                    min="0"
                    step="0.01"
                    required
                  />
                </div>

                <div className="mb-4">
                  <label htmlFor="image-upload" className="form-label">
                    <FaUpload className="me-2" />
                    Hotel Image
                  </label>
                  <input
                    type="file"
                    className="form-control"
                    id="image-upload"
                    name="image"
                    accept="image/*"
                    onChange={handleImageChange}
                    required
                  />
                  {previewImage && (
                    <div className="mt-3 image-preview-container">
                      <img 
                        src={previewImage} 
                        alt="Preview" 
                        className="img-thumbnail mt-2" 
                        style={{ maxHeight: '200px' }}
                      />
                    </div>
                  )}
                </div>

                <div className="d-grid">
                  <button 
                    type="submit" 
                    className="btn btn-primary btn-lg"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                        Adding...
                      </>
                    ) : (
                      <>
                        <FaPlusCircle className="me-2" />
                        Add Hotel
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminAddHotel;