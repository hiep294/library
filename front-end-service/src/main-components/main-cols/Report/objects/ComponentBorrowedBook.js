import React from 'react'

export default function ComponentBorrowedBook(props) {
  return (
    <span style={{color: props.style2, display: "inline"}}>
      <i className="fa fa-book fa-fw" title={props.title}/>
      <span title={props.title} style={{display: "inline", cursor: "pointer"}}>
        ({props.value})
      </span>
    </span>
  )
}
