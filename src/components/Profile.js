import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import axios from 'axios';
import {useState,useEffect} from 'react';
import 'material-icons/iconfont/material-icons.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useParams
} from "react-router-dom";

const Profile = () => {
  const { user, isAuthenticated, isLoading } = useAuth0();
  const [imgdata, setImgdata] = useState({"result":[]});
  const [upvotedby, setUpvotedby] = useState({"upvotedby":[["1"]]});
  const [, updateState] = React.useState(); 
  const forceUpdate = React.useCallback(() => updateState({}), []); 
  
  
  
  
  let {email} = useParams();
  console.log(email)
  
  function upvoteHandler(img){
      axios.post("http://snapppbackend.herokuapp.com/voting/", { "user":email, "img":img, "upvoter": user.email })
      .then(res => {
        //console.log(res);
        console.log(res.data);
        forceUpdate();
    })
  }
  
  useEffect(() => {
     
    var ele=document.getElementById("memeimages")
    try{ele.innerHTML="<img id='loadingimg' src ='https://i.ibb.co/SR8xrZ2/loading-buffering.gif'></img>"}
    catch{}
    axios.post("http://snapppbackend.herokuapp.com/profile/", { "user":email })
      .then(res => {
        //console.log(res);
        console.log(res.data);
        setImgdata(res.data)
        console.log(imgdata)
        try{
        document.getElementById("loadingimg").remove()
        }
        catch (err){
            console.log(err)
        }

    })
    
    axios.post("http://snapppbackend.herokuapp.com/profile/", { "user":email,"upvotedby":"" })
      .then(res => {
        //console.log(res);
        console.log(res.data);
        setUpvotedby(res.data);
        
    })
  }, []);
  
  
  if (isAuthenticated==false) {
    return(
    <div className="ProfileContainer">
      
        <div id="memeimages">
        
        
        {imgdata.result.map((img,index)=>(
        <div className="eachmeme"><img src={img}></img><br/><button className="btn upvote"><i className="material-icons">thumb_up</i></button><button className="btn downvote"><i className="material-icons">thumb_down</i></button> 
        
        <div className="likes"><i style={{color:"red", paddingLeft:"20px"}} className="material-icons">favorite</i> Likes : {upvotedby["upvotedby"][index].length} <span className="tooltiptext">{upvotedby["upvotedby"][index]}</span></div>
        
        </div>
        ))}
        </div>
        <div>       
            <p>Viewing User <b>{email}</b></p>
                <span className="fa fa-star checked"></span>
                <span className="fa fa-star checked"></span>
                <span className="fa fa-star checked"></span>
                <span className="fa fa-star checked"></span>
                <span className="fa fa-star"></span>

            <p>Posts :</p>
            <p>Likes : </p>
        </div>
        
      </div>
    )
  }
  
  else if (user.email!=email){
      do{
      return(
      <div className="ProfileContainer">
      
        <div id="memeimages">
        {imgdata.result.map((img,index)=>(
        <div className="eachmeme"><img src={img}></img><br/><button onClick={()=>upvoteHandler(img)} className="btn upvote"><i className="material-icons">thumb_up</i></button><button className="btn downvote"><i className="material-icons">share</i></button> 
        
        <div className="likes"><i style={{color:"red", paddingLeft:"20px"}} className="material-icons">favorite</i> Likes : {upvotedby["upvotedby"][index].length} <span className="tooltiptext">{upvotedby["upvotedby"][index]}</span></div>
        
        </div>
        ))}
        </div>
        <div>       
            <p>You are viewing account of <b>{email}</b></p>
                <span className="fa fa-star checked"></span>
                <span className="fa fa-star checked"></span>
                <span className="fa fa-star checked"></span>
                <span className="fa fa-star checked"></span>
                <span className="fa fa-star"></span>

            <p>Posts :</p>
            <p>Likes : </p>
        </div>
        
      </div>
      )}while(1)
  }
  do{
  return (
    isAuthenticated && (
      <div className="ProfileContainer">
      
        <div id="memeimages">
        
        
        {imgdata.result.map((img,index)=>(
        <div className="eachmeme"><img src={img}></img><br/><button onClick={()=>upvoteHandler(img)}  className="btn upvote"><i className="material-icons">thumb_up</i></button><button className="btn downvote"><i className="material-icons">share</i></button> 
        
        <div className="likes"><i style={{color:"red", paddingLeft:"20px"}} className="material-icons">favorite</i> Likes : {upvotedby["upvotedby"][index].length} <span className="tooltiptext">{upvotedby["upvotedby"][index]}</span></div>
        
        </div>
        ))}
        </div>
        <div>       
            <img style={{borderRadius:100}} src={user.picture} alt={user.name} />
            <h2>{user.name}</h2>
                <span className="fa fa-star checked"></span>
                <span className="fa fa-star checked"></span>
                <span className="fa fa-star checked"></span>
                <span className="fa fa-star checked"></span>
                <span className="fa fa-star"></span>

            <p>Posts :</p>
            <p>Likes : </p>
        </div>
        
      </div>
    )
);}while(1)
};

export default Profile;