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
   // if user is not Online then return UserOffline component
   if (!isOnline) {
    return <UserOffline />;
  }

  return (allRestaurants?.length === 0) ?  <Shimmer /> : (
    <>
      <div className="search-container mt-[110px] mr-auto mb-[20px] flex justify-center items-center w-[100%] h-[39.2px]">
        <input
          type="text"
          className="search-input w-[480px] box-border rounded-bl-[5px] rounded-tl-[5px] bg-#ffffff shadow-searchbarShadow pl-[8px] pt-[15px] pr-[8px] pb-[12px] border-solid border-[1px] border-r-0 text-textColor outline-none text-lg font-medium font-cardFont text-ellipsis"
          placeholder="Search a restaurant you want..."
          value={searchInput}
          onChange={(e) => {
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
       {allRestaurants?.length === 0 ? (
        <Shimmer />
      ) : (
        <div className="restaurant-list w-auto flex flex-wrap items-center justify-center self-stretch">
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
