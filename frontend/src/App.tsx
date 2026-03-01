import api from "./services/api";
import { useEffect, useState } from "react";

const App=()=>{
  const [message,setMessage]=useState("");

  useEffect(()=>{
    api.get("/").then(res=>setMessage(res.data));
  },[]);

  return <div>{message}</div>
}

export default App;