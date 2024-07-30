import { ITEM_IMG_CDN_URL } from "../constant.jsx";

const FoodItem = ({ food }) => {
  const { name, description, imageId, price } = food;

  return (
    <div className="card">
      <img src={ITEM_IMG_CDN_URL + imageId} alt={name} />
      <h3>{name}</h3>
      <h5>{description}</h5>
      <h5>{price / 100}</h5>
    </div>
  );
};

export default FoodItem;
