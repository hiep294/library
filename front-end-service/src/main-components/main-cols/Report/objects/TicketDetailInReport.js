import React from 'react'
import moment from 'moment'

export default function TicketDetailInReport(props) {
  
  const { fee, note, name, email, title, created_at, due_date, return_date, is_good} = props.params
  return (
    <div className="student">  
        <div id="fee" style={{fontSize: "20px"}}>
          <b>Fee: </b>(VND) {fee}
        </div>
        <div id="note">
          <b>Note: </b> {note}
        </div> 

        <div className="fee-info">
          <div id="std-info" style={{ padding: "5px", flexGrow: "1"}}>
            <div id="name">
              <b>Name: </b>{name}
            </div>
            <div id="email">
              <b>Email: </b>{email}
            </div>
            <div>
              <b>Book title: </b>{title}
            </div> 
          </div>
          <div id="ticket-detail-info" style={{ minWidth: "227px", padding: "5px"}}>               
            <div><b>Create At: </b>{moment(created_at).format('DD-MM-YYYY, h:mm a')}</div> 
            <div><b>Due At: </b>{moment(due_date).format('DD-MM-YYYY, h:mm a')}</div> 
            <div><b>Return At: </b>{moment(return_date).format('DD-MM-YYYY, h:mm a')}</div>      
            <div><b>Returned Status: </b>{is_good? 'good': 'NOT good'}</div>      
          </div>
        </div>
      </div>
  )
}

