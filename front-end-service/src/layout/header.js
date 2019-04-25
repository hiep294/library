import React, { Component } from 'react'

export default class header extends Component {

  render() {
    return (
      <header>
        <div className="container container-header">
          <div id="branding">
            <div id="logo"></div>
            <h1 id="branding" onClick={this.props.onHome}><span className="highlight">Open</span> Library</h1>
          </div>
        </div>
      </header> 
    )
  }
}
