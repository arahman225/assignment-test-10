import React, { useContext } from 'react';
import { AuthContext } from '../AuthProvider';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
const PrivateMyReview = ({ children }) => {

    const { user, loading } = useContext(AuthContext)
    const location = useLocation()
    const navigate = useNavigate()
    console.log(location)

    if (loading) {
        return <div className="min-h-screen items-center justify-center flex">
            <span className="loading bg-[#0d81fd] loading-bars loading-lg"></span>
        </div>
    }
    if (user) {
        return children
    }
    return (

       
        navigate('/auth/login', {state: {from: location}})
        
    );
};

export default PrivateMyReview;