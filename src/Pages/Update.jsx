import React, { useContext } from 'react';

import { AuthContext } from '../AuthProvider';
import { useLoaderData } from 'react-router-dom';
import Navbar from '../Components/Navbar';
import Footer from '../Components/Footer';
import Swal from 'sweetalert2';

const Update = () => {


    const review = useLoaderData()
    console.log(review)

    const { user } = useContext(AuthContext)
    const handleAddReview = e => {
        e.preventDefault();

        const form = e.target;
        const name = form.name.value;
        const email = form.email.value;
        const gameTitle = form.gametitle.value;
        const genre = form.genre.value;
        const rating = form.rating.value;
        const publishingYear = form.publishingYear.value;
        const photoUrl = form.photourl.value;
        const reviewDescription = form.reviewDescription.value;
        const upadatedReviewInfo = { name, email, gameTitle, genre, rating, publishingYear, photoUrl, reviewDescription }

        fetch(`https://assignment-test-10-server.vercel.app/reviews/${review._id}`, {
            method: "PUT",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify(upadatedReviewInfo)
        })
            .then(res => res.json())
            .then(data => {
                console.log(data)
                if (data.modifiedCount > 0) {
                    Swal.fire({
                        title: "Good job!",
                        text: "You updated!",
                        icon: "success",
                        background: "#CDF7FF",
                        color: "#111",
                        width: '450px',
                    });
                }
            })
        console.log('clickde')
    }
    return (

        <div className='bg-[#060D15]'>
            <Navbar></Navbar>
            <main className='bg-[#010407]'>
                <div>
                    <div className='bg-[#102638] text-[#CDF7FF] w-4/5 mx-auto mt-10 mb-10 rounded-lg shadow-2xl'>
                        <div className='p-10 text-center space-y-5'>
                            <h2 className='text-4xl'>Update Review</h2>
                            <p>Effortlessly edit and enhance your reviews by updating game details, ratings, and descriptions to ensure accurate and up-to-date feedback.</p>
                        </div>
                        <div>
                            <div className="card  w-full  shrink-0 shadow-2xl">
                                <form onSubmit={handleAddReview} className="card-body">



                                    {/* name and email ---------------------------------*/}
                                    <div className="md:flex gap-4 ">
                                        <div className="form-control w-full">
                                            <label className="label">
                                                <span className="label-text text-[#CDF7FF]">Name</span>
                                            </label>
                                            <input type="text" placeholder="name" name='name' value={user ? user.displayName : ""} readOnly className="input input-bordered bg-[#101A23]" required />
                                        </div>
                                        <div className="form-control w-full">
                                            <label className="label">
                                                <span className="label-text text-[#CDF7FF]">Email</span>
                                            </label>
                                            <input type="email" placeholder="name" name='email' value={user ? user.email : ""} readOnly className="input input-bordered bg-[#101A23]" required />
                                        </div>
                                    </div>

                                    {/* title and genre------------------------------------ */}
                                    <div className="md:flex gap-4">
                                        <div className="form-control w-full">
                                            <label className="label">
                                                <span className="label-text text-[#CDF7FF]">Game Title</span>
                                            </label>
                                            <input type="text" placeholder="Enter Game Title" name='gametitle' className="input input-bordered bg-[#101A23]" required />
                                        </div>
                                        <div className='form-control w-full'>
                                            <label htmlFor="genre" className="block mb-2">Genre</label>
                                            <select
                                                id="genre"
                                                name="genre"
                                                required
                                                className="w-full p-2 border rounded bg-[#101A23]"
                                            >
                                                <option value="Action">Action</option>
                                                <option value="RPG">RPG</option>
                                                <option value="Adventure">Adventure</option>
                                                <option value="Strategy">Strategy</option>
                                            </select>
                                        </div>
                                    </div>




                                    {/* rating and data ---------------------- */}
                                    <div className="md:flex gap-4">
                                        <div className="form-control w-full">
                                            <label className="label">
                                                <span className="label-text text-[#CDF7FF]">Rating (1-5)</span>
                                            </label>
                                            <input type="text" placeholder="Write rating" name='rating' className="input input-bordered bg-[#101A23]" required />
                                        </div>

                                        <div className="form-control w-full">
                                            <label className="label">
                                                <span className="label-text text-[#CDF7FF]">Publishing Year</span>
                                            </label>
                                            <input type="text" placeholder="Write year" name='publishingYear' min="2009" max={new Date().getFullYear()} className="input input-bordered bg-[#101A23]" required />
                                        </div>
                                    </div>

                                    <div className="form-control w-full">
                                        <label className="label">
                                            <span className="label-text text-[#CDF7FF]">Photo Url</span>
                                        </label>
                                        <input type="text" placeholder="photo url" name='photourl' className="input input-bordered bg-[#101A23]" required />
                                    </div>

                                    <div className="form-control w-full">
                                        <label className="label">
                                            <span className="label-text text-[#CDF7FF]">Review Description</span>
                                        </label>
                                        <textarea
                                            id="reviewDescription"
                                            name="reviewDescription"
                                            placeholder="Write your detailed review"
                                            required
                                            className="w-full p-2 border rounded bg-[#101A23]"
                                            rows="4" cols="50"
                                        />
                                    </div>

                                    <div className="form-control mt-6">
                                        <button className="btn bg-[#101A23] hover:bg-[#CDF7FF] text-[#CDF7FF] hover:text-[#101A23]">Update Review</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
            <Footer></Footer>
        </div>

    );
};

export default Update;