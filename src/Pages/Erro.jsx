import React from 'react';
import { Link } from 'react-router-dom';

const Error = () => {
    return (
        <div className='min-h-screen flex items-center justify-center text-center'>
            <div className='space-y-7'>
                <h2 className='text-4xl font-semibold'>Oops!</h2>
                <div>
                    <p>Sorry, an unexpected error has occurred.</p>
                </div>
                <div>
                    <p className='text-gray-200'>Not Found</p>
                    <Link to='/'>Back Home</Link>
                </div>
            </div>
        </div>
    );
};

export default Error;