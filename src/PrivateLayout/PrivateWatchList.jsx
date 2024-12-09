import React, { useContext } from 'react';
import { AuthContext } from '../AuthProvider';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';

const PrivateWatchList = ({children}) => {

    const {user, loading} = useContext(AuthContext)
    const location = useLocation();
    const navigate = useNavigate()

    if(user){
        return children
    }
    return (

        // <Navigate to='/auth/login' state={{ from: location }} replace></Navigate>
        navigate("/auth/login", {state: {from: location}})
    );
};

export default PrivateWatchList;