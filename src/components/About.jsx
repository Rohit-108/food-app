// import { Outlet } from "react-router-dom";
import Profile from "./ProfileClass";
import { Component } from "react";



class About extends Component{
    constructor(props){
        super(props);
        this.state={
            userInfo:{
                name:"Dummy Name",
                location:"Dummy Location",
            }
        }
        console.log("parent-Constructor");
    }
    async componentDidMount() {
        
    }


    render() {
        console.log("parent-render");
        return(
           <div>
           <h1>About Page</h1>
           <p>This is a namste react course</p>
           <Profile name={"Rohit jumar"}/>
           </div>
        ) 
    }
}

export default About
