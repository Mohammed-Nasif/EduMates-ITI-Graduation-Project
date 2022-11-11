import { useState } from "react";
import { BsFillStarFill } from "react-icons/bs";
import "./rating.scss";

export const Rating = () => {
  const [rating, setRating] = useState(null);
  const [hover, setHover] = useState(null);
  const [isRatingDone, setisRatingDone] = useState(false);
  const ratingHandeling = (ratingValue) => {
    setRating(ratingValue);
    setisRatingDone(true);
  };

  return (
    <div className="rating">
      {!isRatingDone && (
        <div>
          <div className="text-center mt-5">
            <p>Rate The Course</p>
          </div>
          <div className="text-center">
            {[...Array(5)].map((star, i) => {
              const ratingValue = i + 1;
              return (
                <label>
                  <input
                    type="radio"
                    name="rating"
                    value="ratingValue"
                    // onClick={()=>{setRating(ratingValue)}}
                    onClick={() => {
                      ratingHandeling(ratingValue);
                    }}
                  />
                  <BsFillStarFill
                    className="star"
                    size={20}
                    color={
                      ratingValue <= (hover || rating) ? "#ffc107" : "e4e5e9"
                    }
                    onMouseEnter={() => {
                      setHover(ratingValue);
                    }}
                    onMouseLeave={() => {
                      setHover(null);
                    }}
                  />
                </label>
              );
            })}
          </div>
        </div>
      )}
      {isRatingDone && (
        <p className="fw-bold mt-5 text-center rating-done">
          Thanks For Rating Us!
        </p>
      )}
      {/* <p>rating is {rating}</p> */}
    </div>
  );
};
