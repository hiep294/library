import React from 'react'

export default function ComponentCountStudent(props) {
  return (
    <span style={{color: props.style2, display: "inline"}}>
      <i className="fa fa-user fa-fw" title={props.title}/>
      <span title={props.title} style={{display: "inline", cursor: "pointer"}}>
        ({props.value})
      </span>
    </span>
  )
}
