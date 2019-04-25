import React, { Component } from 'react'

export default class main extends Component {
  render() {
    return (
      <section id="main" style={{minHeight: "1000px"}}>
        <div className="container container-main">
          {this.props.children[0]}
          
          {this.props.children[1]}          
          </div>
      </section>

    )
  }
}
