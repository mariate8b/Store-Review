import React from 'react';

const Review = () => {
  return (
    <div>
      <h1>Reviews Page</h1>
      <p>Here you can find reviews and ratings for various destinations.</p>
      
      {/* Example review items */}
      <div className="review">
        <h2>Barcelona, Spain</h2>
        <img
          src="https://res.cloudinary.com/worldpackers/image/upload/c_fill,f_auto,q_auto,w_1024/v1/guides/article_cover/oykblalpaehsuvc4eebp"
          alt="Barcelona"
        />
        <div>
          <fieldset className="rating">
            <input type="radio" id="1star5" name="rating" value="5" />
            <label className="full" htmlFor="1star5" title="Awesome - 5 stars"></label>
            <input type="radio" id="1star4half" name="rating" value="4 and a half" />
            <label className="half" htmlFor="1star4half" title="Pretty good - 4.5 stars"></label>
            <input type="radio" id="1star4" name="rating" value="4" />
            <label className="full" htmlFor="1star4" title="Pretty good - 4 stars"></label>
            <input type="radio" id="1star3half" name="rating" value="3 and a half" />
            <label className="half" htmlFor="1star3half" title="Meh - 3.5 stars"></label>
            <input type="radio" id="1star3" name="rating" value="3" />
            <label className="full" htmlFor="1star3" title="Meh - 3 stars"></label>
            <input type="radio" id="1star2half" name="rating" value="2 and a half" />
            <label className="half" htmlFor="1star2half" title="Kinda bad - 2.5 stars"></label>
            <input type="radio" id="1star2" name="rating" value="2" />
            <label className="full" htmlFor="1star2" title="Kinda bad - 2 stars"></label>
            <input type="radio" id="1star1half" name="rating" value="1 and a half" />
            <label className="half" htmlFor="1star1half" title="Meh - 1.5 stars"></label>
            <input type="radio" id="1star1" name="rating" value="1" />
            <label className="full" htmlFor="1star1" title="Sucks big time - 1 star"></label>
            <input type="radio" id="1starhalf" name="rating" value="half" />
            <label className="half" htmlFor="1starhalf" title="Sucks big time - 0.5 stars"></label>
          </fieldset>
        </div>
      </div>
      
      {/* You can add more review sections here */}

      {/* Link back to home */}
      <Link to="/home">
        <button type="button">Back to Home</button>
      </Link>
    </div>
  );
};

export default Review;