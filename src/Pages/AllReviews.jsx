import React, { useState, useEffect, useContext } from 'react';
import Navbar from '../Components/Navbar';
import { useLoaderData } from 'react-router-dom';
import Footer from '../Components/Footer';
import Review from './Review';
import { AuthContext } from '../AuthProvider';

const AllReviews = () => {


  const initialReviews = useLoaderData(); 
  const [reviews, setReviews] = useState(initialReviews); 
  const [sortOption, setSortOption] = useState(''); 
  const [filterGenre, setFilterGenre] = useState(''); 
  const [loadingTimer, setLoadingTimer] = useState(true)

  useEffect(() => {
    const loadingTimer = setTimeout(() => setLoadingTimer(false), 1000);
    return () => clearTimeout(loadingTimer); 
  }, []);

  useEffect(() => {
    document.title = "All reviews | Chill Gammer";
  }, []);


  useEffect(() => {
    // Apply sorting and filtering ---------------------
    let sortedAndFilteredReviews = [...initialReviews];

    // Filter by genre---------------------------------
    if (filterGenre) {
      sortedAndFilteredReviews = sortedAndFilteredReviews.filter(
        (review) => review.genre.toLowerCase() === filterGenre.toLowerCase()
      );
    }

    // Sort by year or rating------------------------------------
    if (sortOption === 'rating-asc') {
      sortedAndFilteredReviews.sort((a, b) => a.rating - b.rating);
    } else if (sortOption === 'year-asc') {
      sortedAndFilteredReviews.sort((a, b) => a.year - b.year);
    }

    setReviews(sortedAndFilteredReviews);
  }, [sortOption, filterGenre, initialReviews]);

  if (loadingTimer) {
    return (
      <div className="flex justify-center items-center h-screen bg-black">
        <span className="loading loading-bars loading-lg text-[#CDF7FF]"></span>
      </div>
    );
  }

  return (
    <div className='bg-[#060D15]'>
      <Navbar></Navbar>
      {/* Banner Section */}
      <section>
        <div className="relative bg-cover bg-center" style={{ backgroundImage: "url('https://i.ibb.co.com/Rywj4hP/reviews-banner.jpg')" }}>
          {/* Overlay */}
          <div className="absolute inset-0 bg-[#10058c] bg-opacity-45"></div>
          {/* Content */}
          <div className="relative pt-44 pb-44 md:pt-[500px] md:pb-28 pl-36">
          </div>
        </div>
      </section>

      {/* Sort and Filter Section */}
      <section className='w-4/5 mx-auto pt-10'>
        <div className="flex flex-col md:flex-row justify-between items-center mb-6 space-y-4 md:space-y-0">
          <div className=''>
            <label htmlFor="sort" className="text-[#CDF7FF] bg-black mr-3">Sort By:</label>
            <select
              id="sort"
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value)}
              className="border px-4 py-2 rounded bg-[#CDF7FF]"
            >
              <option value="">Select</option>
              <option value="rating-asc">Rating (Low to High)</option>
              <option value="year-asc">Year (Oldest to Newest)</option>
            </select>
          </div>

          <div>
            <label htmlFor="filter" className="text-[#CDF7FF] mr-3">Filter By Genre:</label>
            <select
              id="filter"
              value={filterGenre}
              onChange={(e) => setFilterGenre(e.target.value)}
              className="border px-4 py-2 rounded bg-[#CDF7FF]"
            >
              <option value="">Select Genre</option>
              <option value="Action">Action</option>
              <option value="Adventure">Adventure</option>
              <option value="RPG">RPG</option>
              <option value="Shooter">Shooter</option>
            </select>
          </div>
        </div>
      </section>

      {/* Reviews Section */}
      <section className='w-4/5 mx-auto pt-10 pb-28'>
        <div>
          <h1 className='md:text-7xl text-3xl font-Roboto font-bold text-[#CDF7FF] pt-10 pb-11'>Our Games Review</h1>
        </div>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7'>
          {
            reviews.map(review => <Review key={review._id} review={review}></Review>)
          }
        </div>
      </section>
      <Footer></Footer>
    </div>
  );
};

export default AllReviews;
