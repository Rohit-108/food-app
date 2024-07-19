import { useEffect, useState } from "react";
import { restrauntList } from "../constant";
import RestrauntCard from "./RestaurantCard";
import Shimmer from "./Shimmer";

function filterData(searchInput, restaurants) {
  const filterData = restaurants.filter((restaurant) =>
    restaurant?.info?.name?.toLowerCase().includes?.(searchInput.toLowerCase())
  );
  return filterData;
}






const Body = () => {

  const [allRestaurants, setAllRestaurants]= useState()
  const [filteredRestaurants, setFilteredRestaurants] = useState(restrauntList);
  const [searchInput, setSearchInput] = useState("")



  useEffect(() => {
    getRestaurants();
}, []);

async function getRestaurants() {
  const data = await fetch (
    "https://www.swiggy.com/dapi/restaurants/list/v5?lat=28.65200&lng=77.16630&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING"
  );
  const json = await data.json();
  setAllRestaurants(json?.data?.cards?.card[2]?.card?.gridElements?.infoWithStyle?.restaurants?.info)
  setFilteredRestaurants(json?.data?.cards?.card[5]?.card?.gridElements?.infoWithStyle?.restaurants?.info)
  
}

if(!allRestaurants) return null;

if(filteredRestaurants?.length === 0)
  return <h1>No Restaurants match your filter!!</h1>




  return (allRestaurants?.length === 0) ?  <Shimmer /> : (
    <>
      <div className="search-container">
        <input
          type="text"
          className="search-input"
          placeholder="search"
          value={searchInput}
          onChange={(e) => {
            setSearchInput(e.target.value);
          }}
        />
        <button
          className="search-btn"
          onClick={() => {
            const data = filterData(searchInput, allRestaurants);
            setFilteredRestaurants(data);
          }}
        >
          Search
        </button>
      </div>
      <div className="restaurant-list">
      {/* You have to write logic for no restaurant fount here */}
        {filteredRestaurants.map((restaurant) => {
          return (
            <RestrauntCard {...restaurant.info} key={restaurant.info.id} />
          );
        })}
      </div>
    </>
  );
};

export default Body;
