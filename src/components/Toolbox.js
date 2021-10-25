import '../App.css';
import axios from 'axios';
import {useState} from 'react';
import { useAuth0 } from "@auth0/auth0-react";

// Toolbox component to get Tenor gifs, more features to be added
function Toolbox(){
    
    const [search_term, setsearch_term] = useState("");
    const [lmt, setlmt] = useState("");
    const [tenorresult, setTenorResult] = useState({"tenor":[]});
    const { user, isAuthenticated, isLoading , loginWithRedirect, logout} = useAuth0();
    
    // Get Tenor Images by making query to backend using axios
    function getTenor(path, queryObj) {
        
        var img = new Image();
        var dataUrl = "https://i.ibb.co/SR8xrZ2/loading-buffering.gif"
        img.src = dataUrl;
        img.height = 30;
        img.id = "loadingimg"
        var tenor = document.getElementById("tenor")
        if (tenor.childNodes.length < 5) {
            tenor.appendChild(img)
            }
        
        
        
        
        axios.post(path, queryObj).then(
            (response) => {
                try{
                document.getElementById("loadingimg").remove()}
                catch(error){console.log(error)}
                var result = response.data;
                setTenorResult(result)
                
                console.log(result);
            },
            (error) => {
                document.getElementById("loadingimg").remove()
                console.log(error);
            }
    );
    }
    
    // Two useState hooks to set the form fields
    const setsearch_termHandler = (event) => {
        console.log(event.target.value)
        setsearch_term(event.target.value);
    }
    
    const setlmtHandler = (event) => {
        console.log(event.target.value)
        setlmt(event.target.value);
    }
    
    // Delete image that we got
    function removeTenorImage (t)  {
        var x = tenorresult.tenor
        //console.log(x)
        //console.log(typeof(x))
        
        const index = x.indexOf(t);
        if (index > -1) {
          x.splice(index, 1);
        }
        console.log(x)
        
        
        setTenorResult({"tenor":x})
        
        //console.log(t);
        };
    
    // Send Image from toolbox to canvas
    function sendImageCanvas(t){

        axios.post('https://snapppbackend.herokuapp.com/addonetocanvas/',{"user":user.email,"image":t,"flag":1}).then(
            (response) => {
                var result = response.data;
    
    
                console.log(result);
            },
            (error) => {
                console.log(error);
            }
        );
    }
    
    return (
    <div className = "tenor" id="tenor">
    {/* <h1>{search_term}</h1>*/}
    {/* <h1>{lmt}</h1> */}
    <form>
      <h3>Tenor</h3>  
      <input className="form-control" placeholder="Enter Gif to search" type='text' onChange={setsearch_termHandler} />
      <input className="form-control" placeholder="Enter no of Gifs" type='text' onChange={setlmtHandler} />
    </form>

    <button className="btn btncanvas" onClick={()=>getTenor('https://snapppbackend.herokuapp.com/api/', {"search_term":search_term,"lmt":parseInt(lmt)})} >Search</button> <br />
    
   
    
    {tenorresult.tenor.map(t=>
        <>
        
        <img onClick={()=>{sendImageCanvas(t)}} src = {t} width = "100"></img><br />
        <button className="btn btn-remove" onClick={()=>{removeTenorImage(t)}}><i class = "material-icons">remove_circle_outline</i></button><br />
        </>
    )}
    
       
    
    
    </div>
  );
};
export default Toolbox;
