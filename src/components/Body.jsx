import {  useState } from "react";
import RestaurantCard from "./RestaurantCard";
import Shimmer from "./Shimmer";
import { Link } from "react-router-dom";

import  useOnline from "./hooks/useOnline"
import UserOffline from "./UserOffline";
import useResData from "./hooks/useResData";
import { filterData } from "./utils/helper";  

import { FOODFIRE_API_URL } from "../constant";



// Filter the restaurant data according input type






// Body Component for body section: It contain all restaurant cards
const Body = () => {
  // useState: To create a state variable, searchText, allRestaurants and filteredRestaurants is local state variable
  

  const [allRestaurants, FilterRes]= useResData(FOODFIRE_API_URL)
  const [filteredRestaurants, setFilteredRestaurants] = useState(null);
  const [searchInput, setSearchInput] = useState("")
  const [errorMessage, setErrorMessage] = useState("");
  const isOnline =useOnline();
    
  

  if (!isOnline) {
    return <UserOffline />;
  }

 

    // use searchData function and set condition if data is empty show error message
  const searchData = (searchInput, restaurants) => {
      if (searchInput !== "") {
        const filteredData = filterData(searchInput, restaurants);
        setFilteredRestaurants(filteredData);
        setErrorMessage("");
        if (filteredData?.length === 0) {
          setErrorMessage("No matches restaurant found");
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
      <div className="search-container mt-[110px] mr-auto mb-[20px] flex justify-center items-center w-[100%] h-[39.2px]">
        <input
          type="text"
          className="search-input w-[30rem] box-border rounded-bl-[5px] rounded-tl-[5px] bg-#ffffff shadow-searchbarShadow pl-[8px] pt-[15px] pr-[8px] pb-[12px] border-solid border-[1px] bordeer-#aabcca border-r-0 text-textColor outline-none text-lg font-[500] "
          placeholder="Search a restaurant you want..."
          value={searchInput}
          onChange={(e) => {
            setSearchInput(e.target.value);
            setSearchInput(e.target.value, allRestaurants);
          }}
        />
        <button
          className="search-btn rounded-br-[5px] rounded-tr-[5px] bg-darkorange shadow-btnshadow text-#ffffff py-[12px] px-[22px] ml-[-4px] cursor-pointer border-none outline-none hover:bg-darkgreen"
          onClick={() => {
            searchData(searchInput, allRestaurants);
          }}
        >
          Search
        </button>
      </div>
      {errorMessage && <div className="error-container text-center text-xl my-[20px] mx-[10px]">{errorMessage}</div>}
       {/* if restaurants data is not fetched then display Shimmer UI after the fetched data display restaurants cards */}
       {allRestaurants?.length === 0 && FilterRes?.length === 0 ? (
        <Shimmer />
      ) : (
        <div className="restaurant-list w-auto flex flex-wrap items-center justify-center self-stretch">
      {/* We are mapping restaurants array and passing JSON array data to RestaurantCard component as props with unique key as restaurant.data.id */}
      {(filteredRestaurants === null ? FilterRes : filteredRestaurants).map(
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
        )};
      </div>
      )}
    </div>
  );
};

export default Body;
