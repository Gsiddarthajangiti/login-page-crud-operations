import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const CreateStudent = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleSubmit = (event) => {
        event.preventDefault();
        axios.post('http://localhost:8082/create', { name, email })
            .then(res => {
                console.log('Create response:', res);
                navigate('/');
            })
            .catch(err => {
                console.error('Error creating teacher:', err);
                setError(err.response?.data?.message || 'Failed to create teacher');
            });
    };

    return (
        <div className='d-flex vh-100 bg-primary justify-content-center align-items-center'>
            <div className='w-75 bg-white rounded p-3'>
                <form onSubmit={handleSubmit}>
                    <h2>Add Teacher</h2>
                    {error && <div className='alert alert-danger'>{error}</div>}
                    <div className='mb-2'>
                        <label htmlFor='name'>Name</label>
                        <input
                            type='text'
                            id='name'
                            placeholder='Enter Name'
                            className='form-control'
                            value={name}
                            onChange={e => setName(e.target.value)}
                        />
                    </div>
                    <div className='mb-2'>
                        <label htmlFor='email'>Email</label>
                        <input
                            type='email'
                            id='email'
                            placeholder='Enter Email'
                            className='form-control'
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                        />
                    </div>
                    <button type='submit' className='btn btn-success'>Submit</button>
                </form>
            </div>
        </div>
    );
};

export default CreateStudent;
