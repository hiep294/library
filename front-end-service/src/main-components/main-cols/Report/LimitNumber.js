import React from 'react'

export default function LimitNumber(props) {
  return (
    <input 
      style={{width: "30px", paddingLeft: "5px"}}
      min={1}
      type="number" 
      value={props.value} 
      onChange={props.onChange}
    />
  )
}

