import {  useState } from "react";
import RestaurantCard from "./RestaurantCard";
import Shimmer from "./Shimmer";
import { FOODFIRE_API_URL } from "../constant";
import { Link } from "react-router-dom";

import  useOnline from "./hooks/useOnline"
import UserOffline from "./UserOffline";
import useResData from "./hooks/useResData";
import { filterData } from "../utils/helper";  


const Body = () => {
  // useState: To create a state variable, searchText, allRestaurants and filteredRestaurants is local state variable
  

  const [allRestaurants, setAllRestaurant]= useResData([FOODFIRE_API_URL])
  const [filteredRestaurants, setFilteredRestaurants] = useState(null);
  const [searchInput, setSearchInput] = useState("")
  const [errorMessage, setErrorMessage] = useState("");
  const isOnline =useOnline();
    
  

  if (!isOnline) {
    return <UserOffline />;
  }

 

  const searchData = (searchText, restaurants) => {
    if (searchText !== "") {
      const filteredData = filterData(searchText, restaurants);
      setFilteredRestaurants(filteredData);
      setErrorMessage("");
      if (filteredData?.length === 0) {
        setErrorMessage(
          `Sorry, we couldn't find any results for "${searchText}"`
        );
      }
    } else {
      setErrorMessage("");
      setFilteredRestaurants(restaurants);
    }
  };
  
    // if allRestaurants is empty don't render restaurants cards
  if (!allRestaurants) return null;
  

  return  (
    <div className="body-container">
      <div className="search-container">
      <input
        type="text"
        className="search-input"
        placeholder="Search a restaurant you want..."
        value={searchInput}
        // update the state variable searchText when we typing in input box
        onChange={(e) => { setSearchInput(e.target.value)
        searchData(e.target.value, allRestaurants);
        }}
      ></input>
       <button
          className="search-btn"
          onClick={() => {
            // user click on button searchData function is called
            searchData(searchInput, allRestaurants);
          }}
        >
          Search
        </button>
      </div>
      {errorMessage && <div className="error-container">{errorMessage}</div>}

      {/* if restaurants data are fetched then display restaurants cards otherwise display Shimmer UI */}
      {allRestaurants?.length === 0 && setAllRestaurant?.length === 0 ? (
        <Shimmer />
      ) : (
        <div className="restaurant-list">
          {/* We are mapping restaurants array and passing JSON array data to RestaurantCard component as props with unique key as restaurant.data.id */}
          {(filteredRestaurants === null ? setAllRestaurant : filteredRestaurants).map(
            (restaurant) => {
              return (
                <Link
                  to={"/restaurant/" + restaurant?.info?.id}
                  key={restaurant?.info?.id}
                >
                  {/* if we click on any restaurant card it will redirect to that restaurant menu page */}
                  <RestaurantCard {...restaurant?.info} />
                </Link>
              );
            }
          )}
        </div>
      )}
    </div>
  );
};

export default Body;
