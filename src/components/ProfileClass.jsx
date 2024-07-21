import React from "react";

class Profile extends React.Component{

    constructor(props){
        super(props);
        this.state={
            userInfo:{
                name:"Dummy Name",
                location:"Dummy Location",
        }
    }
        console.log("child-constructor")
    }

    async componentDidMount() {

        // best place to make an api call
        const data= fetch("https://api.github.com/users/Rohit-108");
        const json= await await data.json()

        this.setState({
            userInfo:json,
        })

        console.log("Parent-ComponentDidMount")



    }
    render() {

        console.log("child-render")
        return (
        <div>
            <h1>Profile Class based Component</h1>
            <h2>Name:{this.state.userInfo.name}</h2>
            <h2>Location:{this.state.userInfo.location}</h2>
            
        </div> 
        )
}
}

export default Profile;