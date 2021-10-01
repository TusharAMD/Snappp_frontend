import '../App.css';
import Draggable from 'react-draggable'; 
import { Resizable } from "re-resizable";
import * as htmlToImage from 'html-to-image';
import SearchByTenor from "./SearchByTenor";
import axios from 'axios';
import {useState} from 'react';

function MemeCanvas() {
  const [cimages, setCimages] = useState(["https://i.ibb.co/QJqyb5b/image.png","https://c.tenor.com/mb24Vqz-MxgAAAAC/omg-shocked.gif"]);
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
    document.body.appendChild(img);
  })
  .catch(function (error) {
    console.error('oops, something went wrong!', error);
  });
  };

  function getOneImage(){
      
      axios.get('https://snapppbackend.herokuapp.com/addonetocanvas/')
      .then(res => {
        const oneImage = res.data["image"];
        console.log(oneImage)
        setCimages(precimages => [...precimages, oneImage])
      })
  }
  
  
  
  return (
    <div className = "arena">
    <div className = "memecanvas" id = "meme">
        <h1>Canvas here</h1>
        {cimages.map(cimage => (
        <Draggable>
        <Resizable
            style={style}
            defaultSize={{
              width: 100,
              height: 100
            }}
          >
        <div className="memeobject"><img style = {{objectFit: "cover", maxWidth:"500px"}} src = {cimage}></img></div>
        </Resizable>
        </Draggable>
      ))}
        
      
    </div>
    
    <div className = "warehouse">
    <SearchByTenor />
    </div>
    <div>
    <button id = "btnhtml2canvas" onClick={html2canvas}> Save</button>
    <button id = "getData" onClick={getOneImage}> Get Images </button>
    </div>
    </div>
  );
}

export default MemeCanvas;
