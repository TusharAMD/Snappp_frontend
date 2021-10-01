import '../App.css';
import axios from 'axios';
import {useState} from 'react';

function SearchByTenor(){
    
    const [search_term, setsearch_term] = useState("");
    const [lmt, setlmt] = useState("");
    const [tenorresult, setTenorResult] = useState({"tenor":[]});
    
    function getTenor(path, queryObj) {
        axios.post(path, queryObj).then(
            (response) => {
                var result = response.data;
                setTenorResult(result)
                
                console.log(result);
            },
            (error) => {
                console.log(error);
            }
    );
    }
    
    
    const setsearch_termHandler = (event) => {
        console.log(event.target.value)
        setsearch_term(event.target.value);
    }
    
    const setlmtHandler = (event) => {
        console.log(event.target.value)
        setlmt(event.target.value);
    }
    
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
        
    function sendImageCanvas(t){

        axios.post('https://snapppbackend.herokuapp.com/addonetocanvas/',{"image":t}).then(
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
    <div className = "tenor">
    <h1>{search_term}</h1>
    <h1>{lmt}</h1>
    <form>
        <h3>Tenor</h3>
      <input type='text' onChange={setsearch_termHandler} />
      <input type='text' onChange={setlmtHandler} />
    
    </form>
    
    
    
    <button onClick={()=>getTenor('https://snapppbackend.herokuapp.com/api/', {"search_term":search_term,"lmt":parseInt(lmt)})} /> <br />
    
   
    
    {tenorresult.tenor.map(t=>
        <>
        
        <img onClick={()=>{sendImageCanvas(t)}} src = {t} width = "100"></img><br />
        <button onClick={()=>{removeTenorImage(t)}}>X</button><br />
        </>
    )}
    
    
    </div>
  );
};
export default SearchByTenor;