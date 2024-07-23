// Filter the restaurant data according input type
export function filterData(searchInput, restaurants) {
    const filterData = restaurants.filter((restaurant) =>
      restaurant?.info?.name?.toLowerCase().includes?.(searchInput.toLowerCase())
    );
    return filterData;
  }

  export const shimmer_card_unit = 20;

export const shimmer_menu_card_unit = 10;


