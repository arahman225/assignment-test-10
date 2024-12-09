import React, { useContext } from 'react';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../AuthProvider';

const PrivateAddReview = ({children}) => {

    const {user, loading} = useContext(AuthContext)

    const location = useLocation()
    const navigate = useNavigate()
    console.log(location)
    
    if (loading) {
        return <div className="min-h-screen items-center justify-center flex">
            <span className="loading bg-[#0d81fd] loading-bars loading-lg"></span>
        </div>
    }
    
    if(user){
        return children
    }

    return (

        
        // <Navigate to="/auth/login" state={location.pathname} />
        navigate("auth/login", {state: {from: location}})
        

    );
};

export default PrivateAddReview;