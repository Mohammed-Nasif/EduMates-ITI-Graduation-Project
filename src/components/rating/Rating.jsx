import "./rating.scss";
import { useState, useContext} from "react";
import { BsFillStarFill } from "react-icons/bs";
import coursesapi from "./../../coursesAPI/coursesapi";
import { AuthContext } from '../../context/AuthContext';
import { useEffect } from "react";
import { async } from "@firebase/util";


export const Rating = (props) => {
  const [rating, setRating] = useState(null);
  const [hover, setHover] = useState(null);
  const [isRatingDone, setisRatingDone] = useState(false);
  const { currentUser } = useContext(AuthContext); 
  const combId = `${currentUser?.uid}-${props.courseId}`;

  // patch request to upadate the rating value
  const updateRequest = async (endPoint, path, request)=>{
    await coursesapi.patch(`/${endPoint}/${path}`, request);
  }

  // get request: to get the rating value from api
  const getRatingFromApi = async (endPoint, path)=>{
    const response = await coursesapi.get(`/${endPoint}/${path}`);
    // console.log("request response", response.data);
    return response.data;
  }
  
  useEffect(()=>{
      const getRating = async()=>{
        const data = await getRatingFromApi('usercourses', combId);
        if(data){
          // console.log("rating in useeffect: ", data.userRating)
          setRating(data.userRating);
          if(data.userRating > 0){
            setisRatingDone(true);
          }
        }
      }
      getRating();
  }, [])

  const ratingHandeling = (ratingValue) => {
    const ratingRequest = {
      "userRating": ratingValue
    }
    updateRequest('usercourses', combId, ratingRequest);
    setRating(ratingValue);
    console.log(ratingValue)
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
