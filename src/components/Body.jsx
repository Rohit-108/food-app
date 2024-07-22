import { useEffect, useState } from "react";
import RestrauntCard from "./RestaurantCard";
import Shimmer from "./Shimmer";
import { Link } from "react-router-dom";

import  useOnline from "./hooks/useOnline"
import UserOffline from "./UserOffline";

import { FOODFIRE_API_URL } from "../constant";



// Filter the restaurant data according input type
function filterData(searchInput, restaurants) {
  const filterData = restaurants.filter((restaurant) =>
    restaurant?.info?.name?.toLowerCase().includes?.(searchInput.toLowerCase())
  );
  return filterData;
}





// Body Component for body section: It contain all restaurant cards
const Body = () => {
  // useState: To create a state variable, searchText, allRestaurants and filteredRestaurants is local state variable
  

  const [allRestaurants, setAllRestaurants]= useState("")
  const [filteredRestaurants, setFilteredRestaurants] = useState([]);
  const [searchInput, setSearchInput] = useState([])
  const [errorMessage, setErrorMessage] = useState("");
  const isOnline =useOnline();
    
   // if user is not Online then return UserOffline component
   if (!isOnline) {
    return <UserOffline />;
  }



    // use useEffect for one time call getRestaurants using empty dependency array
  useEffect(() => {
    getRestaurants();
  }, []);

 // async function getRestaurant to fetch Swiggy API data
  async function getRestaurants() {
  // handle the error using try... catch
  try {
    const response = await fetch(FOODFIRE_API_URL);
    const json = await response.json();

    // initialize checkJsonData() function to check Swiggy Restaurant data
    // eslint-disable-next-line no-inner-declarations
    function checkJsonData(jsonData) {
      for (let i = 0; i < jsonData?.data?.cards.length; i++) {
        // initialize checkData for Swiggy Restaurant data
        let checkData =
          json?.data?.cards[i]?.card?.card?.gridElements?.infoWithStyle
            ?.restaurants;

        // if checkData is not undefined then return it
        if (checkData !== undefined) {
          return checkData;
        }
      }
    }

   // call the checkJsonData() function which return Swiggy Restaurant data
    const resData = checkJsonData(json);
    
    // update the state variable restaurants with Swiggy API data
    setAllRestaurants(resData);
    setFilteredRestaurants(resData);
  } catch (error) {
    console.log(error);
  }
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
  

  return (allRestaurants?.length === 0) ?  <Shimmer /> : (
    <>
      <div className="search-container">
        <input
          type="text"
          className="search-input"
          placeholder="Search a restaurant you want..."
          value={searchInput}
          onChange={(e) => {
            setSearchInput(e.target.value);
          }}
        />
        <button
          className="search-btn"
          onClick={() => {
            searchData(searchInput, allRestaurants);
          }}
        >
          Search
        </button>
      </div>
      {errorMessage && <div className="error-container">{errorMessage}</div>}
       {/* if restaurants data is not fetched then display Shimmer UI after the fetched data display restaurants cards */}
       {allRestaurants?.length === 0 ? (
        <Shimmer />
      ) : (
        <div className="restaurant-list">
      {/* We are mapping restaurants array and passing JSON array data to RestaurantCard component as props with unique key as restaurant.data.id */}
      {filteredRestaurants.map((restaurant) => {
            return (
              <Link
                to={"/restaurant/" + restaurant?.info?.id}
                key={restaurant?.info?.id}
              >
                <RestrauntCard {...restaurant?.info} />
              </Link>
          );
        })};
      </div>
      )}
    </>
  );
};

export default Body;
