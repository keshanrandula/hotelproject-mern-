import { useEffect, useState } from 'react';
import axios from 'axios';

import './BookSearch.css';
import { FaCheck, FaTimes, FaTrash, FaSearch, FaSync } from 'react-icons/fa';

function BookSearch() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');

  const fetchBookings = async () => {
    try {
      setLoading(true);
      const res = await axios.get('http://localhost:5000/api/bookings');
      setBookings(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (id, status) => {
    try {
      await axios.put(`http://localhost:5000/api/bookings/${id}`, { status });
      fetchBookings();
    } catch (err) {
      console.error(err);
    }
  };

  const deleteBooking = async (id) => {
    if (window.confirm('Are you sure you want to delete this booking?')) {
      try {
        await axios.delete(`http://localhost:5000/api/bookings/${id}`);
        fetchBookings();
      } catch (err) {
        console.error(err);
      }
    }
  };

  const filteredBookings = bookings.filter(booking => {
    const matchesSearch = 
      booking.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.roomType.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = 
      statusFilter === 'All' || 
      booking.status.toLowerCase() === statusFilter.toLowerCase();
    
    return matchesSearch && matchesStatus;
  });

  const getStatusBadge = (status) => {
    switch(status) {
      case 'Accepted':
        return 'success';
      case 'Rejected':
        return 'danger';
      case 'Pending':
        return 'warning';
      default:
        return 'secondary';
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  return (
    <div className="container-fluid booking-admin-container">
      <div className="row mb-4">
        <div className="col-12">
          <h2 className="admin-header">Booking Management</h2>
          <div className="admin-controls">
            <div className="input-group search-box">
              <span className="input-group-text">
                <FaSearch />
              </span>
              <input
                type="text"
                className="form-control"
                placeholder="Search bookings..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <div className="filter-controls">
              <select
                className="form-select status-filter"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <option value="All">All Statuses</option>
                <option value="Pending">Pending</option>
                <option value="Accepted">Accepted</option>
                <option value="Rejected">Rejected</option>
              </select>
              
              <button 
                className="btn btn-outline-primary refresh-btn"
                onClick={fetchBookings}
                disabled={loading}
              >
                <FaSync className={loading ? 'spin' : ''} /> Refresh
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-12">
          {loading ? (
            <div className="text-center py-5">
              <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
              <p className="mt-2">Loading bookings...</p>
            </div>
          ) : filteredBookings.length === 0 ? (
            <div className="no-bookings text-center py-5">
              <h4>No bookings found</h4>
              <p>Try adjusting your search or filters</p>
            </div>
          ) : (
            <div className="table-responsive">
              <table className="table table-hover booking-table">
                <thead className="table-light">
                  <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Room Type</th>
                    <th>Check In</th>
                    <th>Check Out</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredBookings.map((booking) => (
                    <tr key={booking._id}>
                      <td>{booking.name}</td>
                      <td>{booking.email}</td>
                      <td>{booking.roomType}</td>
                      <td>{new Date(booking.checkIn).toLocaleDateString()}</td>
                      <td>{new Date(booking.checkOut).toLocaleDateString()}</td>
                      <td>
                        <span className={`badge bg-${getStatusBadge(booking.status)}`}>
                          {booking.status}
                        </span>
                      </td>
                      <td className="actions">
                        {booking.status === 'Pending' && (
                          <>
                            <button 
                              className="btn btn-sm btn-success me-2"
                              onClick={() => updateStatus(booking._id, 'Accepted')}
                              title="Accept"
                            >
                              <FaCheck />
                            </button>
                            <button 
                              className="btn btn-sm btn-danger me-2"
                              onClick={() => updateStatus(booking._id, 'Rejected')}
                              title="Reject"
                            >
                              <FaTimes />
                            </button>
                          </>
                        )}
                        <button 
                          className="btn btn-sm btn-outline-danger"
                          onClick={() => deleteBooking(booking._id)}
                          title="Delete"
                        >
                          <FaTrash />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default BookSearch;