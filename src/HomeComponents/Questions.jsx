import React from 'react';

const Questions = () => {
    return (
        <div className='bg-[#102638] pt-10'>
            <div className='text-center text-white pt-10 space-y-5 w-4/5 mx-auto'>
                <h2 className='text-[#CDF7FF] font-bold text-2xl md:text-4xl'>Common Questions And Answers</h2>
                <p className='text-[#cdf7ffa2]'>Find answers to your most common questions about our website, including features, reviews, submissions, updates, and community guidelines.</p>
            </div>
            <div className='gap-8 grid w-4/5 mx-auto py-20 '>
                <div tabIndex={0} className="collapse collapse-arrow  border border-[#7ea5ad] py-5 rounded-none bg-[#060D15] text-[#CDF7FF]">
                    <div className="collapse-title text-lg md:text-xl font-bold">What is the purpose of your website?</div>
                    <div className="collapse-content">
                        <p>Our website is designed to provide game enthusiasts with detailed reviews, ratings, and insights into the best free and premium games. We aim to help gamers make informed choices while fostering a community where they can share their experiences and opinions.</p>
                    </div>
                </div>
                <div tabIndex={0} className="collapse collapse-arrow  border border-[#7ea5ad] py-5 rounded-none bg-[#060D15] text-[#CDF7FF]">
                    <div className="collapse-title text-xl font-bold">2. How can I submit a review for a game I’ve played?</div>
                    <div className="collapse-content">
                        <p>To submit a review, simply navigate to the "Add New Review" page, fill in the required details such as game title, description, rating, and cover image, and submit your review. You need to be logged in to ensure that your review is linked to your account.</p>
                    </div>
                </div>
                <div tabIndex={0} className="collapse collapse-arrow  border border-[#7ea5ad] py-5 rounded-none bg-[#060D15] text-[#CDF7FF]">
                    <div className="collapse-title text-xl font-bold">3. Can I trust the reviews on your website?</div>
                    <div className="collapse-content">
                        <p>Yes, all reviews are written by real users who share their honest opinions. We also monitor submissions to ensure reviews are helpful and align with community guidelines, giving you accurate and unbiased insights.</p>
                    </div>
                </div>
                <div tabIndex={0} className="collapse collapse-arrow  border border-[#7ea5ad] py-5 rounded-none bg-[#060D15] text-[#CDF7FF]">
                    <div className="collapse-title text-xl font-bold">4. Do you provide updates on new game releases?</div>
                    <div className="collapse-content">
                        <p>Absolutely! Our website features a section dedicated to news and updates where we share information about upcoming game releases, updates, and industry trends. Sign up for our newsletter to stay informed.</p>
                    </div>
                </div>
                <div tabIndex={0} className="collapse collapse-arrow  border border-[#7ea5ad] py-5 rounded-none bg-[#060D15] text-[#CDF7FF]">
                    <div className="collapse-title text-xl font-bold">Is your website free to use?</div>
                    <div className="collapse-content">
                        <p>Yes, our website is completely free to use. Users can browse game reviews, submit their own, and access all features without any charges. We are committed to keeping it accessible for all gamers.</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Questions;