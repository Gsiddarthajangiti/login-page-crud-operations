import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const UpdateStudent = () => {
    const { id } = useParams();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        axios.get(`http://localhost:8082/teacher/${id}`)
            .then(res => {
                setName(res.data.Name);
                setEmail(res.data.Email);
                setError(null);
            })
            .catch(err => {
                console.error('Error fetching teacher data:', err);
                setError('Failed to fetch teacher data');
            });
    }, [id]);

    const handleSubmit = (event) => {
        event.preventDefault();
        axios.put(`http://localhost:8082/update/${id}`, { name, email })
            .then(res => {
                console.log('Update response:', res);
                navigate('/');
            })
            .catch(err => {
                console.error('Error updating teacher:', err);
                setError(err.response?.data?.message || 'Failed to update teacher');
            });
    };

    return (
        <div className='d-flex vh-100 bg-primary justify-content-center align-items-center'>
            <div className='w-75 bg-white rounded p-3'>
                <form onSubmit={handleSubmit}>
                    <h2>Update Teacher</h2>
                    {error && <div className='alert alert-danger'>{error}</div>}
                    <div className='mb-2'>
                        <label htmlFor='name'>Name</label>
                        <input
                            id='name'
                            type='text'
                            placeholder='Enter Name'
                            className='form-control'
                            value={name}
                            onChange={e => setName(e.target.value)}
                        />
                    </div>
                    <div className='mb-2'>
                        <label htmlFor='email'>Email</label>
                        <input
                            id='email'
                            type='email'
                            placeholder='Enter Email'
                            className='form-control'
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                        />
                    </div>
                    <button type='submit' className='btn btn-success'>Update</button>
                </form>
            </div>
        </div>
    );
};

export default UpdateStudent;
