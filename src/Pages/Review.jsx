import React from 'react';
import { FaStar } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Review = ({ review }) => {

    const { _id, name, email, gameTitle, genre, rating, publishingYear, photoUrl, reviewDescription } = review || {}
    return (
        <div className='p-3 border border-[#50799b] bg-[#102638] hover:-translate-y-2 transition ease-in duration-200 shadow-xl rounded-lg'>
            <div className='relative'>
                <img className='w-full h-auto' src={photoUrl} alt="" />
                <div className="absolute inset-0 bg-[#111] bg-opacity-45"></div>
            </div>
            <div className='text-center text-[#CDF7FF] p-6'>
                <h3 className='md:text-4xl text-2xl font-semibold pb-4'>{gameTitle}</h3>
                <p>{reviewDescription}</p>
            </div>
            <span className="ml-2 text-[#CDF7FF] flex gap-2 items-center justify-center font-semibold mb-5">
            {rating}
                {Array.from({ length: 5 }, (_, index) => (
                    
                    <FaStar key={index} className={index < Math.floor(rating) ? 'text-yellow-500' : 'text-gray-300'} />
                ))}
            </span>
            <div className='flex justify-center'>
                <Link to={`/detail/${_id}`} className='bg-[#CDF7FF] px-4 py-2 hover:rounded-lg transition-all ease-out duration-200'>Explore Details</Link>
            </div>
        </div>
    );
};

export default Review;