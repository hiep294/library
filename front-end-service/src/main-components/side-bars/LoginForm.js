import React, { Component } from 'react'


export default class LoginForm extends Component {
  state = {
    email: '',
    password: ''
  }

  onLoginChange = (e) => this.setState({
    [e.target.name]: e.target.value
  })

  onLoginSubmit = (e) => {
    e.preventDefault();
    this.props.onLoginSubmit(this.state)
  }
  
  render() {
    return (
      <div id="login" className="dark">
        <h3 name="login">Log in</h3>
        <form id="login-form" onSubmit={this.onLoginSubmit}>
          <div className="field">
            <label htmlFor="email"><i className="fa fa-envelope fa-fw" /> Email</label><br />
            <input 
              type="email" 
              name="email"
              placeholder="openmind@gmail.com" 
              value={this.state.email}
              onChange={this.onLoginChange}
            />
          </div>
          <div className="field">
            <label htmlFor="password"><i className="fa fa-key fa-fw" /> Password</label><br />
            <input 
              type="password" 
              name="password"
              placeholder="*******" 
              value={this.state.password}
              onChange={this.onLoginChange}
            />
          </div>
          <button className="button_1" style={{width: "100%"}}>Submit</button>
        </form>
      </div>
    )
  }
}
