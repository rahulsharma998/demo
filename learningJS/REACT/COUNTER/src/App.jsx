import React, { useState } from 'react'
const counter = () => {
  const [count, setCount]=useState(0);
  const [cval, setCval] = useState(0);
  const [name, setName]=useState("add");
  return (
    <>
    <div style={{color: count>0?'green':count<0?'red':'blue'}}>
      {count}
    </div>
    <div>{count>0?'positive':count<0?'negative':'Neutral'}</div>
      <div>
        <button onClick={()=>setCount(prev=>prev+1)}>increase</button>
        <button onClick={()=>setCount(prev=>prev-1)}>decrease</button>
        <button onClick={()=>{setCount(0)}}>Reset</button>
        <br />
        <input type="number" value={cval} onChange={(e)=>setCval(parseInt(e.target.value)) ||0}/>
        <button onClick={()=>setCount(prev=>prev+cval)}>Add Value</button>
        <button onClick={()=>setCount(prev=>prev-cval)} >Subtract Value</button>
      </div>
    </>
  );
}
export default counter