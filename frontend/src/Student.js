import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const Student = () => {
    const [students, setStudents] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        axios.get('http://localhost:8082/')
            .then(res => {
                setStudents(res.data);
                setError(null); // Clear any previous errors
            })
            .catch(err => {
                console.error('Error fetching students:', err);
                setError('Failed to fetch students');
            });
    }, []);

    const handleDelete = (id) => {
        axios.delete(`http://localhost:8082/delete/${id}`)
            .then(res => {
                console.log('Delete response:', res);
                setStudents(prevStudents => prevStudents.filter(student => student.id !== id));
            })
            .catch(err => {
                console.error('Error deleting student:', err);
                setError('Failed to delete student');
            });
    };

    return (
        <div className='d-flex vh-100 bg-primary justify-content-center align-items-center'>
            <div className='w-75 bg-white rounded p-3'>
                <Link to="/create" className='btn btn-success mb-3'>Add+</Link>
                {error && <div className='alert alert-danger'>{error}</div>}
                <table className='table'>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {students.length > 0 ? (
                            students.map(student => (
                                <tr key={student.id}>
                                    <td>{student.Name}</td>
                                    <td>{student.Email}</td>
                                    <td>
                                        <Link to={`update/${student.id}`} className='btn btn-primary'>Update</Link>
                                        <button className='btn btn-danger' onClick={() => handleDelete(student.id)}>Delete</button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="3">No students found</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Student;
