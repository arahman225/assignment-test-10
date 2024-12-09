import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../AuthProvider';
import { Link, useLoaderData } from 'react-router-dom';
import Swal from 'sweetalert2';
import { MdDelete } from "react-icons/md";
import { FaStar } from 'react-icons/fa';

const MyReview = () => {
  const { user } = useContext(AuthContext);
  const reviews = useLoaderData();
  const loadedUserReviews = user ? reviews.filter(review => review.email === user.email) : [];
  const [userReviews, setUserReviews] = useState(loadedUserReviews);
  const [loading, setLoading] = useState(true)


  useEffect(() => {
      const loadingTimer = setTimeout(() => setLoading(false), 1000);
      return () => clearTimeout(loadingTimer); // Cleanup timer
    }, []);

    useEffect(() => {
      document.title = "My review | Chill Gammer";
    }, []);


  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
      color: "#111",
      width: '450px',
      background: "#CDF7FF"
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`https://assignment-test-10-server.vercel.app/reviews/${id}`, { method: "DELETE" })
          .then(res => res.json())
          .then(data => {
            if (data.deletedCount > 0) {
              Swal.fire({
                title: "Deleted!",
                text: "Your review has been deleted.",
                icon: "success",
                color: "#111",
                width: '450px',
                background: "#CDF7FF"
              });

              const remainingReviews = userReviews.filter(review => review._id !== id);
              setUserReviews(remainingReviews);
            }
          });
      }
    });
  };


  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-black">
        <span className="loading loading-bars loading-lg text-[#CDF7FF]"></span>
      </div>
    );
  }

  return (
    <div className="bg-[#102638]">
      <div className="w-4/5 mx-auto py-16">
        {/* Page Title */}
        <div className="bg-gradient-to-r from-gray-900 via-gray-800 to-black py-8 text-center mb-5">
          <h1
            className="md:text-5xl text-3xl font-bold uppercase tracking-wide text-transparent bg-clip-text"
            style={{
              WebkitTextStroke: '1px #CDF7FF', // Outline color
              WebkitTextFillColor: 'transparent', // Transparent fill
            }}
          >
            MY REVIEW LISTS
          </h1>
        </div>

        {/* Reviews Section */}
        {userReviews.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="table-auto w-full border-collapse border border-gray-300">
              <thead>
                <tr className="bg-[#060D15] text-[#CDF7FF]">
                  <th className="border border-gray-300 px-4 py-2">Game Title</th>
                  <th className="border border-gray-300 px-4 py-2">Rating</th>
                  <th className="border border-gray-300 px-4 py-2 hidden sm:table-cell">Reviewer</th>
                  <th className="border border-gray-300 px-4 py-2">Update/Delete</th>
                </tr>
              </thead>
              <tbody>
                {userReviews.map((review) => (
                  <tr key={review._id} className="text-center hover:bg-[#060D15] text-[#CDF7FF] hover:text-[#CDF7FF]">
                    <td className="border border-gray-300 px-2 py-2 text-left">{review.gameTitle}</td>
                    <td className="border border-gray-300 px-2 py-2">
                      <div className="flex justify-center items-center">
                        {Array.from({ length: 5 }, (_, index) => (
                          <FaStar
                            key={index}
                            className={index < Math.floor(review.rating) ? 'text-yellow-500' : 'text-gray-300'}
                          />
                        ))}
                      </div>
                    </td>
                    <td className="border border-gray-300 px-2 py-2 hidden sm:table-cell">{review.name}</td>
                    <td className="border border-gray-300 px-2 py-2 flex flex-col sm:flex-row justify-center items-center gap-3">
                      <Link className="font-semibold bg-blue-500 px-4 py-2 rounded-md" to={`/update/${review._id}`}>UPDATE</Link>
                      <button
                        className="py-1 px-4 text-3xl bg-[#1a4270ad] rounded-md"
                        onClick={() => handleDelete(review._id)}
                      >
                        <MdDelete />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="py-24 text-center">
            <p className="text-red-400">No reviews available.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyReview;
