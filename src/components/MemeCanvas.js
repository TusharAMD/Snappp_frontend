import '../App.css';
import Draggable from 'react-draggable'; 
import { Resizable } from "re-resizable";
import * as htmlToImage from 'html-to-image';
import Toolbox from "./Toolbox";
import axios from 'axios';
import {useState} from 'react';
import React from 'react';

function MemeCanvas() {
  
    
  const [, updateState] = React.useState();  
  const forceUpdate = React.useCallback(() => updateState({}), []);  
  const [cimages, setCimages] = useState([]);
  
  const [textbox, setTextbox] = useState({val:""});
  const [nos, setnos] = useState([]);

  
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
  })
  .catch(function (error) {
    console.error('oops, something went wrong!', error);
  });
  };

  function getOneImage(){
      
      axios.get('http://127.0.0.1:5000/addonetocanvas/')
      .then(res => {
        const oneImage = res.data["image"];

        setCimages(precimages => [...precimages, oneImage])
      })
  }
  
  function toggleborderson(){
      var xs = document.getElementsByClassName("memeobject");
      for (let i = 0; i < xs.length; i++) {
          try{
          xs[i].style.border = "dotted 5px #333";
          xs[i].children[1].style.display = "inline"
          xs[i].children[2].style.display = "inline"
          }
          catch{
              console.log("error")
          }
      }
  }
   function togglebordersoff(){
      var xs = document.getElementsByClassName("memeobject");
      for (let i = 0; i < xs.length; i++) {
          try{
          xs[i].style.border = "none";
          xs[i].children[1].style.display = "none"
          xs[i].children[2].style.display = "none"
          }
          catch{
              console.log("error")
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
               x[i].parentElement.parentElement.style.zIndex = zindexno+1
           }
           }
       }
    }
        
    
    function onAddTextHandler(e){
        var prevval = nos
        prevval.push(e.target.value)
        setTextbox(prevval)
        console.log(textbox,"<<<<<<<<<<<<<<<<<<<<<")
        
        var currentIndex = nos.length-1
        var id="textcanvas"+currentIndex
        var x = document.getElementById(id)
        var textbox = document.createElement("svg")
        textbox.setAttribute("viewBox","0 0 56 18")
        var texts = document.createElement("text")
        texts.setAttribute("x","0")
        texts.setAttribute("y","0")
        texts.innerText=textbox.val
        textbox.appendChild(texts)
        x.appendChild(textbox)
    }
  
  
  
  return (
    <>
    <div className = "heading">
    <h1>Canvas here</h1>
    </div>
    <div>
    
    </div>
    
    <div className = "arena">
        
        <Resizable enable={{
      bottomRight:true,
    }}>
        <div onMouseOver={toggleborderson} onMouseOut={togglebordersoff} className = "memecanvas" id = "meme">

            {/*console.log(cimages,"<<<<<<<")*/}
            {cimages.map(cimage => (
            <Draggable>
            <Resizable>
            <div className="memeobject"><img className = "memeimg" src = {cimage}></img>
            <button className="btn btn-incanvas" onClick={()=>{deleteele(cimage)}}><i class = "material-icons">delete</i></button>
            <button className="btn btn-incanvas" onClick={()=>{bringinfront(cimage)}}><i class = "material-icons">flip_to_front</i></button></div>
            </Resizable>
            </Draggable>
            
          ))} 

        {textbox.nos.map((t,index)=>
            
            <Draggable style={"none"}>
            <Resizable>
            <div className="memeobject" id={"textcanvas"+index}>
            <button className="btn btn-incanvas" ><i class = "material-icons">delete</i></button>
            <button className="btn btn-incanvas" ><i class = "material-icons">flip_to_front</i></button></div>
            </Resizable>
            </Draggable>
        )}
                
           

          
        </div>
        </Resizable>

    
    <div className = "warehouse">
    
    <Toolbox />
    
    </div>
    <div className = "buttons">
    <button className="btn btncanvas" id = "btnhtml2canvas" onClick={html2canvas}> Save</button>
    <button className="btn btncanvas" id = "getData" onClick={getOneImage}> Get Images </button>
    <button className="btn btncanvas" id = "Reset" onClick={()=>setCimages([])}>Reset</button>
    </div>
    </div>
    
    <div className="textboxes">
    

    <input type="text" value={textbox.val} onChange={(e) => setTextbox({...textbox, "val":e.target.value}) }/>
    <button type="submit" className="btn btncanvas" id = "inputbox" onClick={() => onAddTextHandler()}>Add Text</button>

    </div>
    </>
  );
}

export default MemeCanvas;
