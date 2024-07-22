
import { useParams } from "react-router-dom";
import {FOODFIRE_MENU_API_URL,
  IMG_CDN_URL,
  ITEM_IMG_CDN_URL,
  MENU_ITEM_TYPE_KEY,
  RESTAURANT_TYPE_KEY,} from "../constant";
import Shimmer from "./Shimmer";
import useRestaurantMenu from "./hooks/UseRestaurantMenu";




const RestaurantMenu = () => {
  const { resId } = useParams(); // call useParams and get value of restaurant id using object destructuring
  const [restaurant, menuItems] = useRestaurantMenu(FOODFIRE_MENU_API_URL,
    resId,
    RESTAURANT_TYPE_KEY,
    MENU_ITEM_TYPE_KEY)

    
    return (!restaurant) ? <Shimmer /> : (
        <div className="menu">
            <div>
                <h1>Restaurant id: {resId}</h1>
                <h2>{restaurant?.name}</h2>
                <img src={IMG_CDN_URL + restaurant?.cloudinaryImageId} />
                <h3>{restaurant?.areaName}</h3>
                <h3>{restaurant?.city}</h3>
                <h3>{restaurant?.avgRating} stars</h3>
                <h3>{restaurant?.costForTwoMessage}</h3>
            </div><div className="restaurant-menu-content"><div className="menu-title-wrap">
            <h3 className="menu-title">Recommended</h3>
            <p className="menu-count">
              {menuItems.length} ITEMS
            </p>
          </div>
            <div>
                <h1>Menu</h1>
                <div className="menu-items-list">
            {menuItems.map((item) => (
              <div className="menu-item" key={item?.id}>
                <div className="menu-item-details">
                  <h3 className="item-title">{item?.name}</h3>
                 
                  <p className="item-desc">{item?.description}</p>
                </div>
                <div className="menu-img-wrapper">
                  {item?.imageId && (
                    <img
                      className="menu-item-img"
                      src={ITEM_IMG_CDN_URL + item?.imageId}
                      alt={item?.name}
                    />
                  )}
                </div>
              </div>
            ))}
          </div>

            </div>
</div>
            
        </div>
    )
}

export default RestaurantMenu;