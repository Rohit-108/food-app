import { IMG_CDN_URL } from "../constant.jsx"


const FoodItem = (name,
    description, 
    cloudinaryImageId,
    price) => {
    return (
        <div className="card">
          <img src={IMG_CDN_URL + cloudinaryImageId} />
          <h3>{name}</h3>
          <h5>{description}</h5>
          <h5>{price/100}</h5>
          </div>
)

}
export default FoodItem;