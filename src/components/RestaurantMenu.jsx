import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { IMG_CDN_URL,ITEM_IMG_CDN_URL,FOODFIRE_MENU_API_URL,RESTAURANT_TYPE_KEY,MENU_ITEM_TYPE_KEY } from "../constant";
import Shimmer from "./Shimmer";


const RestaurantMenu = () => {

    const { resId } = useParams(); // call useParams and get value of restaurant id using object destructuring
    const [restaurant, setRestaurant] = useState(null);
    const [menuItems, setMenuItems] = useState([]);


    useEffect(() => {
        getRestaurantInfo()
    }, []);

    async function getRestaurantInfo() {
        try {
            const response = await fetch(FOODFIRE_MENU_API_URL + resId);
            const json = await response.json();

            // Set restaurant data
            const restaurantData = json?.data?.cards?.map(x => x.card)?.
                find(x => x && x.card['@type'] === RESTAURANT_TYPE_KEY)?.card?.info || null;
            setRestaurant(restaurantData);

            // Set menu item data
            const menuItemsData = json?.data?.cards.find(x => x.groupedCard)?.
                groupedCard?.cardGroupMap?.REGULAR?.
                cards?.map(x => x.card?.card)?.
                filter(x => x['@type'] == MENU_ITEM_TYPE_KEY)?.
                map(x => x.itemCards).flat().map(x => x.card?.info) || [];



            const uniqueMenuItems = [];
            menuItemsData.forEach((item) => {
                if (!uniqueMenuItems.find(x => x.id === item.id)) {
                    uniqueMenuItems.push(item);

                }
            })
            setMenuItems(uniqueMenuItems);
        } catch (error) {
            setMenuItems([]);
            setRestaurant(null);
            console.log(error);
        }
    }

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
            </div>
            <div className="menu-title-wrap">
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
    )
}

export default RestaurantMenu;