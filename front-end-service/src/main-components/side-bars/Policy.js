import React, { Component } from 'react'

export default class Policy extends Component {


  render() {
    return (
      <div className="dark">
        <div id="policy">
          <h3 name="login">Policy</h3>
          <h4>How to borrow or return books</h4>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce
            vulputate massa massa, eu euismod ante iaculis id. Fusce eu
            libero non massa eleifend molestie. Duis porta, massa id blandit
            egestas, q
          </p>
          <h4>Penalty</h4>
          <p>
            Duis porta, massa id blandit egestas, quam odio tristique purus,
            et feugiat arcu leo id urna. Sed a aliquam justo, rutrum ornare
            ante. Etiam lobortis dolor a suscipit feugiat. Etiam sem augue,
            tempor non dui et, semper al
          </p>
        </div>
        
        <button className="button_1" style={{width: "100%"}} onClick={this.props.setTaskOnOff}>{this.props.taskOn? "Task Off" : "Task On"}</button>
      </div>
    )
  }
}
