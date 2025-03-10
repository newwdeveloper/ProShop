import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";

const Rating = ({ value, text }) => {
  return (
    <div className="flex items-center">
      {[...Array(5)].map((_, index) => (
        <span key={index}>
          {value >= index + 1 ? ( // Full star if rating is greater or equal to index+1
            <FaStar className="text-yellow-500" />
          ) : value >= index + 0.5 ? ( // Half star if rating is greater or equal to index+0.5
            <FaStarHalfAlt className="text-yellow-500" />
          ) : (
            <FaRegStar className="text-gray-400" /> // Empty star otherwise
          )}
        </span>
      ))}
      {text && <span className="ml-2">{text && text}</span>}
    </div>
  );
};

export default Rating;
