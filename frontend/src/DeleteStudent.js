import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const DeleteStudent = ({ id, onDelete }) => {
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleDelete = () => {
        axios.delete(`http://localhost:8082/delete/${id}`)
            .then(res => {
                console.log('Delete response:', res);
                onDelete(id); // Callback to update the UI after deletion
                navigate('/');
            })
            .catch(err => {
                console.error('Error deleting student:', err);
                setError(err.response?.data?.message || 'Failed to delete student');
            });
    };

    return (
        <div>
            <button className='btn btn-danger' onClick={handleDelete}>Delete</button>
            {error && <div className='alert alert-danger'>{error}</div>}
        </div>
    );
};

export default DeleteStudent;
