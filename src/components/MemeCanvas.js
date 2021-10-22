import '../App.css';
import Draggable from 'react-draggable'; 
import { Resizable } from "re-resizable";
import * as htmlToImage from 'html-to-image';
import Toolbox from "./Toolbox";
import axios from 'axios';
import {useState} from 'react';
import React from 'react';
import { useAuth0 } from "@auth0/auth0-react";

function MemeCanvas() {
  
    
  const [, updateState] = React.useState();  
  const forceUpdate = React.useCallback(() => updateState({}), []);  
  const [cimages, setCimages] = useState([]);
  
  const [textbox, setTextbox] = useState("");
  const [nos, setnos] = useState([]);
  const [val, setVal] = useState([])
  const { user, isAuthenticated, isLoading , loginWithRedirect, logout} = useAuth0();
  
  const style = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  border: "solid 1px #ddd",
  objectFit: "fill"
    };
  
  
  function html2canvas(){
  var meme =  document.getElementById("meme");
  htmlToImage.toSvg(meme)
  .then(function (dataUrl) {
    var img = new Image();
    img.src = dataUrl;
    console.log(dataUrl);
    document.body.appendChild(img);
    img.download = "meme.svg"
    img.click();
    var z = img.download
    img.remove()
    axios.post('http://snapppbackend.herokuapp.com/html2canvas/',{"data":dataUrl,"user":user.email})
      .then(res => {
        console.log(res)
      })
      .catch(err =>{console.log(err)
})
    
  })
  .catch(function (error) {
    console.error('oops, something went wrong!', error);
  });
  };

  function getOneImage(){
      axios.post('http://snapppbackend.herokuapp.com/addonetocanvas/',{"user":user.email,"flag":2})
      .then(res => {
        const oneImage = res.data["image"];

        setCimages(precimages => [...precimages, oneImage])
      })
  }
  
  function toggleborderson(){
      var xs = document.getElementsByClassName("memeobject");
      for (let i = 0; i < xs.length; i++) {
          xs[i].style.border = "dotted 1px #333";
          xs[i].style.height = "100%"
          xs[i].children[1].style.display = "inline"
          xs[i].children[2].style.display = "inline"
          try{
          
          xs[i].children[3].style.display = "inline"
          }
          catch(err){
              console.log(err,"borders on")
          }
      }
  }
   function togglebordersoff(){
      var xs = document.getElementsByClassName("memeobject");
      for (let i = 0; i < xs.length; i++) {
          xs[i].children[1].style.display = "none"
          xs[i].children[2].style.display = "none"
          try{
          xs[i].style.border = "none";
          
          if (xs[i].children[0].children[0].nodeName == "text"){
          xs[i].style.height = "94%"
          }
          
          xs[i].children[3].style.display = "none"
          }
          catch(err){
              console.log(err,"borders off")
          }
      }
      }
      
    function deleteele(cimage){
       var x = cimages
       const index = x.indexOf(cimage);
        if (index > -1) {
          x.splice(index, 1);
        }
        console.log(x);
        setCimages(x);
        forceUpdate();
        };
        
    function deletetext(txt){
       var xs = document.getElementsByClassName("canvatext")
       for(let i=0;i<xs.length;i++){
           if(xs[i].innerHTML == txt){
               xs[i].parentElement.parentElement.parentElement.style.display="none"
           }
       }
    }
    function bringtextfront(txt){
       var xs = document.getElementsByClassName("canvatext")
       for(let i=0;i<xs.length;i++){
           if(xs[i].innerHTML == txt){
               var zindexno = xs[i].parentElement.parentElement.parentElement.style.zIndex
               console.log(zindexno)
               if (zindexno==""){
                   xs[i].parentElement.parentElement.parentElement.style.zIndex = 3
               }
               else{
                   xs[i].parentElement.parentElement.parentElement.style.zIndex = parseInt(zindexno)+1
                   console.log(xs[i].parentElement.parentElement.parentElement.style.zIndex)
               }
           }
       }
    }
       
    
    function bringinfront(cimage){
       var x = document.getElementsByClassName("memeimg")
       for (let i=0;i<x.length;i++){
           var ans = x[i].getAttribute("src")
           if(ans == cimage){
           console.log(ans, cimage,"<<<<")
           var zindexno = x[i].parentElement.parentElement.style.zIndex
           if (zindexno==""){
               x[i].parentElement.parentElement.style.zIndex = 3
           }
           else{
               x[i].parentElement.parentElement.style.zIndex = parseInt(zindexno)+1
               console.log(x[i].parentElement.parentElement.style.zIndex)
           }
           }
       }
    }
    
    function changeColor(txt){
       const colors = ["red", "green", "yellow", "white", "blue", "magenta", "orange"];
       var x = document.getElementsByClassName("canvatext")
       var randomNo = Math.floor(Math.random() * colors.length)
       var randomNo2 = Math.floor(Math.random() * colors.length)
        
        for (let i=0;i<x.length;i++){
            if(x[i].innerHTML == txt){
            x[i].style.stroke=colors[randomNo] 
            x[i].style.fill=colors[randomNo2]
            }
        }
    }
        
    
    
    function dothis(){
        
        setVal(prevtext=>[...prevtext,textbox])
        console.log(val,"<<<<<<<<<<<<<<,")
        var prevnos = [...nos]
        console.log(prevnos)
        console.log(prevnos.length)
        prevnos.push(prevnos.length)
        setnos(prevnos)
        forceUpdate();
        
        /*
        
        var prevnos =[]
        prevnos=[...nos]
        
        console.log(prevnos.length)
        console.log(typeof(prevnos))
        console.log(prevnos)
        console.log(nos,">>>")
        
        var len = prevnos.length
        prevnos.push(0)
        for(let i=0;i<len;i++){
        prevnos.push(i)
        console.log(prevnos)
        }
        setnos(prevnos)
        */

        
    }
    
    function getPwa(){
        axios.post('http://snapppbackend.herokuapp.com/getpwa/',{"user":user.email})
        
      .then(res => {
        const oneImage = res.data["image"];
        setCimages(precimages => [...precimages, oneImage])
      })
      .catch(function (error) {
    console.error('oops, something went wrong!', error);
  })
    }

  
  
  
  return (
    <>
    <div className = "heading">
    <h1>Make your Meme</h1>
    </div>
    <div>
    
    </div>
    
    <div className = "arena">
        
        <Resizable enable={{
      bottomRight:true,
      topRight:true,
      bottom:true,
    }}>
        <div onMouseOver={toggleborderson} onMouseOut={togglebordersoff} className = "memecanvas" id = "meme">

            {/*console.log(cimages,"<<<<<<<")*/}
            {cimages.map(cimage => (
            <Draggable>
            <Resizable>
            <div className="memeobject"><img className = "memeimg" src = {cimage}></img>
            <button className="btn btn-incanvas" onClick={()=>{deleteele(cimage)}}><i className = "material-icons">delete</i></button>
            <button className="btn btn-incanvas" onClick={()=>{bringinfront(cimage)}}><i className = "material-icons">flip_to_front</i></button></div>
            </Resizable>
            </Draggable>
            
          ))} 
          
          
          {nos.map(n => (
              
            <Draggable>
            <Resizable>
            <div className="memeobject">
            
            <svg className="textonmeme" viewBox="0 0 600 18">
              <text className = "canvatext" x="0" y="15" style={{stroke: "white", strokeWidth: 0.3}} fill = "black">{val[n]}</text>

            </svg>
            
            <button className="btn btn-incanvas" onClick={()=>{changeColor(val[n])}} ><i className = "material-icons">casino</i></button>
            <button className="btn btn-incanvas" onClick={()=>{deletetext(val[n])}} ><i className = "material-icons">delete</i></button>
            <button className="btn btn-incanvas" onClick={()=>{bringtextfront(val[n])}}><i className = "material-icons">flip_to_front</i></button></div>
            </Resizable>
            </Draggable>
            
          ))}

           
           

          
        </div>
        </Resizable>

    
    <div className = "warehouse">
    
    <Toolbox />
    
    </div>
    <div className = "buttons">
    <button className="btn btncanvas" id = "btnhtml2canvas" onClick={html2canvas}> Save</button>
    <button className="btn btncanvas" id = "getData" onClick={getOneImage}> Get Images </button>
    <button className="btn btncanvas" id = "getpwa" onClick={getPwa}> Get Snap </button>
    <button className="btn btncanvas" id = "Reset" onClick={()=>setCimages([])}>Reset</button>
    </div>
    </div>
    
    <div className="textboxes">
    
    <input className="inputbox" value={textbox} onChange={(e)=>setTextbox(e.target.value)} />
    <button className="btn" onClick={dothis}>Add</button>
    </div>
    </>
  );
}

export default MemeCanvas;
