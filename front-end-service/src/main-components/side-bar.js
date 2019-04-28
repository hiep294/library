import React, { Component } from 'react'
import Policy from './side-bars/Policy'

class SideBar extends Component {


  render() {
    const { auth, taskOn } = this.props
    let sideBar = {}
    if(taskOn){
      sideBar = auth? this.props.children[1] : this.props.children[0] 
    } else {
      sideBar = <div></div>
    }
    return (
      <aside id="sidebar">
        <div id="login-neo"/>
        {sideBar}
        <Policy setTaskOnOff={this.props.setTaskOnOff} taskOn={taskOn}/>
      </aside>
    )
  }
}

export default SideBar
