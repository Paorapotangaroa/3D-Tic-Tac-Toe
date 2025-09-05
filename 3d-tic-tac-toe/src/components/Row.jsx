import React from 'react'

const Row = ({row,...props}) => {
  return (
    <tr {...props}>
      {row.map((cell,index)=>(
        <td key={index} className={cell==="X"?"text-success":"text-danger"}>{cell}</td>
      ))}
    </tr>
  )
}

export default Row
