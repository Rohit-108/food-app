
import { useParams } from "react-router-dom";
import {FOODFIRE_MENU_API_URL,
  IMG_CDN_URL,
  ITEM_IMG_CDN_URL,
  MENU_ITEM_TYPE_KEY,
  RESTAURANT_TYPE_KEY,} from "../constant";
import {MenuShimmer} from "./Shimmer";
import useRestaurantMenu from "./hooks/UseRestaurantMenu";




const RestaurantMenu = () => {
  const { resId } = useParams(); // call useParams and get value of restaurant id using objzect destructuring
  const [restaurant, menuItems] = useRestaurantMenu(FOODFIRE_MENU_API_URL,
    resId,
    RESTAURANT_TYPE_KEY,
    MENU_ITEM_TYPE_KEY)

    
    return (!restaurant) ? <MenuShimmer /> : (
      <div className="mt-[80px] w-[850px] mx-auto">
      <div className="flex  flex-row justify-start items-center bg-lightblack text-lightwhitetext overflow-y-hidden">
        <img
          className="w-[250px] h-[157px] rounded-[5px] m-5"
          src={IMG_CDN_URL + restaurant?.cloudinaryImageId}
          alt={restaurant?.name}
        />
        <div className="flex flex-col justify-start mr-[20px]">
          <h2 className="text-[40px] max-w-[540px] text-[300]">{restaurant?.name}</h2>
          <p className="whitespace-nowrap text-inherit opacity-[0.07] text-[15px] max-w-[540px]">{restaurant?.cuisines?.join(", ")}</p>
          <div className="flex mt-[18px] justify-start items-center text-[12px] font-[600]  mb-[10px] text-inherit ">
            <div className="flex justify-center items-center py-[5px] px-[8px] bg-darkgreen rounded-md" style={
            (restaurant?.avgRating) < 4
              ? { backgroundColor: "var(--light-red)" }
              : (restaurant?.avgRating) === "--"
              ? { backgroundColor: "white", color: "black" }
              : { color: "white" }
          }>
            <i className="fa-solid fa-star"></i>
              <span>{restaurant?.avgRating}</span>
            </div>
            <div className="restaurant-rating-slash">|</div>
            <div>{restaurant?.sla?.slaString}</div>
            <div className="restaurant-rating-slash">|</div>
            <div>{restaurant?.costForTwoMessage}</div>
          </div>
        </div>
      </div>

      <div className="flex justify-center items-center">
        <div className="mt-8 max-w-[850px]">
          <div className="p-5">
            <h3 className="text-lightTextColor">Recommended</h3>
            <p className="mt-[10px] leading-[1.3] text-[rgba(940,44,63,0.45)] text-[1rem]">
              {menuItems.length} ITEMS
            </p>
          </div>
          <div className="flex justify-center flex-col">
            {menuItems.map((item) => (
              <div className="flex flex-row justify-between p-5  border-b-[0.5px] border-borderColor" key={item?.id}>
                <div className="flex flex-col justify-start overflow-hidden h-[auto]">
                  <h3 className="w-[auto] text-lightTextColor">{item?.name}</h3>
                  <p className="mt-2 text-[1rem] font-[400] text-#3e4152 w-[inherit]">
                    {item?.price > 0
                      ? new Intl.NumberFormat("en-IN", {
                          style: "currency",
                          currency: "INR",
                        }).format(item?.price / 100)
                      : " "}
                  </p>
                  <p className="mt-[14px] leading-[1.3] text-[rgba(40,44,63,0.450] w-[auto] tracking[-0.3] text-[1rem]">{item?.description}</p>
                </div>
                <div className="flex flex-col justify-center items-end w-[450px] overflow-hidden h-[auto]">
                  {item?.imageId && (
                    <img
                      className="h-[100px] w-[100px] rounded-[5px]"
                      src={ITEM_IMG_CDN_URL + item?.imageId}
                      alt={item?.name}
                    />
                  )}
                  <button className="bg-orange text-textColor  py-[6px] px-[22px] cursor-pointer outline-none border-darkorange mt-[10px] rounded-[5px] text-lg"> ADD +</button>
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