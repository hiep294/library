import React, { Component } from 'react'
import Policy from './side-bars/Policy'

class SideBar extends Component {

  // state = {
  //   taskOn: false
  // }

  // setTasksOnOff = async () => {
  //   await this.setState({
  //     taskOn: !this.state.taskOn
  //   })
  //   sessionStorage.setItem('taskOn', this.state.taskOn)
  // }

  // componentDidMount = () => {
  //   const s = sessionStorage.getItem('taskOn') === "true"
  //   if(s !== null){
  //     this.setState({
  //       taskOn: s
  //     })
  //   }
    
  // }

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
