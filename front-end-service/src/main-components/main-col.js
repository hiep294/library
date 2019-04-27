import React, { Component } from 'react'
import Auth from './../modules/Auth'

export default class MainCol extends Component {
  render() {
    const {auth, tasks} = this.props
    let mainCol = Auth.isUserAuthenticated()? this.props.children[2] : this.props.children[2]
    if(tasks.onHome) mainCol = this.props.children[2];
    // if(user.role === 2 && tasks.onMyTickets ) mainCol = this.props.children[1];
    if(auth && tasks.onDashboard ) mainCol = this.props.children[0];
    if(auth && tasks.onTickets ) mainCol = this.props.children[1];
    if(auth && tasks.onBooks ) mainCol = this.props.children[2];
    if(auth && tasks.onStudents ) mainCol = this.props.children[3];
    if(auth && tasks.onBookBasket ) mainCol = this.props.children[4];
    if(auth && tasks.onReport) mainCol = this.props.children[5]
    return (
      <article id="main-col" style={{minHeight: "900px"}}>
        {mainCol}  
      </article> 
    )
  }
}
