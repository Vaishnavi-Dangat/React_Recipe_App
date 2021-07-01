import React,{useState} from "react";
import Axios from "axios";
import {v4 as uuidv4} from "uuid";
import Receipe from "./components/Receipe";
import Alert from "./components/Alert";
import "./App.css";

const App = () => {
      const[query,setQuery] = useState("");
      const[recipes,setReceipes] = useState([]);
      const[alert,setAlert]=useState("");

  const APP_ID = "2f6f5873";

  const APP_KEY = "af3efdd5d2da8daa05e2fcc6d170b05a";

  const url =`https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`;

  const getData = async () =>{
    if(query !== ""){
    const result = await Axios.get(url);
    if(!result.data.more){
      return setAlert("No food with such name");
    }
    setReceipes(result.data.hits);
    console.log(result);
    setAlert("")
    setQuery("");
    }else{
      setAlert("please fill the form");
    }
  };

  const onChange = (e) =>{
      setQuery(e.target.value);
  };

  const onSubmit = (e) =>{
    e.preventDefault();
    getData();
  };
  
  return (
    <div className="App">
      <h1 onClick={getData}>Food Searching App</h1>
      <form className="search-form" onSubmit={onSubmit}>
      {alert !== "" && <Alert alert={alert}/>}
        <input 
               type = "text"
               placeholder ="search food" 
               autoComplete="off"
               onChange ={onChange}
               value={query}
         />
        <input type="submit" value="Search"/>
      </form>
      <div className="recipes">
        {recipes !==[] && recipes.map(recipe =><Receipe key={uuidv4()} recipe={recipe}/>)}
      </div>
    </div>
  );
};

export default App;

