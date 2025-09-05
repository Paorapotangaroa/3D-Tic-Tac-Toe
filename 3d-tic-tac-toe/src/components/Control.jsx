import React, { useState } from 'react'

const Control = ({handleMove}) => {
    const [entry,setEntry] = useState("");
    function handleChange(e){
        setEntry(e.target.value);
    }
    function handleKeyDown(e){
        if(e.code==="Enter"){
            let move = entry.replaceAll(" ","").replaceAll("[","").replaceAll("]","").trim();
            const [layer,row,col] = move.split("");
            handleMove(parseInt(layer),parseInt(row),parseInt(col));
            setEntry("");
        }
    }
    return (
    <div>
      <input type="text"  value={entry} onChange={handleChange} onKeyDown={handleKeyDown}/>
    </div>
  )
}

export default Control
