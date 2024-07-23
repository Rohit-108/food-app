import { IMG_CDN_URL } from "../constant.jsx"


// Restaurant card component: Image, name, cuisine
const RestrauntCard = ({name, cuisines, cloudinaryImageId,areaName,sla,costForTwo,avgRatingString,lastMileTravelString }) => {
 
    return (
      <div className="card w-[240px] rounded-[5px] p-[10px] m-[20px] cursor-pointer shadow-cardshadow hover:scale-[0.98] box-border ">
      <img   className="w-[100%] rounded-[10px]  box-content h-[137px]"src={IMG_CDN_URL + cloudinaryImageId} />
      <h3 className=" font-[900] text-lighttexttitle whitespace-[nowrap] overflow-hidden text-ellipsis font-cardFont">{name}</h3>
      <h5 className="font-light whitespace-nowrap overflow-hidden font-cardFont text-ellipsis">{cuisines.join(", ")}</h5>
      <h5 className="font-light whitespace-nowrap overflow-hidden text-ellipsis font-cardFont">{areaName}</h5>
      <span className=" flex justify-between mt-[8px] text-center ">
        <h4 className="font-extrabold text-[14px] pl-0 pt-[2px] pr-0 mt-[10px] text-lighttexttitle"
          style={
            avgRatingString < 4
              ? { display:"flex",backgroundColor:"lightgreen", borderRadius:"5px",color:"white",padding:"5px",marginTop:"5px" }
              : avgRatingString === "--"
                ? { backgroundColor: "white", color: "black" }
                : { color: "white" }
          }
        >
          <i className=" text-[10px] pl-[2px] pt-[5px] pr-[3px] pb-0 fa-solid fa-star"></i>
          {avgRatingString}
        </h4>
        <h4 className="font-extrabold text-[14px] pl-0 pt-[2px] pr-0 mt-[10px] text-lighttexttitle">•</h4>
        <h4 className="font-bold text-[14px] pl-0 pt-[2px] pr-0 mt-[10px] text-lighttexttitle">{sla?.lastMileTravelString ?? '2.0 km'}</h4>
        <h4 className="font-bold text-[14px] pl-0 pt-[2px] pr-0 mt-[10px] text-lighttexttitle">•</h4>
        <h4 className="font-bold text-[14px] pl-0 pt-[2px] pr-0 mt-[10px] text-lighttexttitle">{costForTwo ?? '₹200 for two'}</h4>
      </span>
    </div>
    )
  }
  
  export default RestrauntCard
  