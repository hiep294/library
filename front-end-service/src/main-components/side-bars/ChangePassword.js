import React, { Component } from 'react'
import axios from 'axios';
import Auth from '../../modules/Auth';

export default class ChangePassword extends Component {
  state = {
    currentPassword : '',
    newPassword : '',
    passwordConfirmation : ''
  }

  onValueChange = (e) => {
    this.setState({
      [e.target.name] : e.target.value
    })
  }

  onSavePassword = (e) => {
    e.preventDefault()
    //if change password ok, changingPassword => false
    //if change password not ok, print message
    axios({
      url: Auth.getUrl() + '/users/1',
      method: 'patch',
      data: {
        current_password: this.state.currentPassword,
        new_password: this.state.newPassword,
        password_confirmation: this.state.passwordConfirmation
      },
      headers: {
        token: Auth.getToken(),
        'Authorization': `Token ${Auth.getToken()}`
      }
    }).then(res => {
      if(res.data.status === 'SUCCESS'){
        this.onChangePassword()
      } else {
        alert(res.data.data)
      }
    }).catch(errs => console.log(errs))
  }

  onChangePassword = () => {
    //while closing form, reset state
    if(this.props.changingPassword){
      const clone = {...this.state}
      for(var key in clone){
        clone[key] = ''
      }
      this.setState(clone)
    }
    //on close form
    this.props.onChangePassword()
  }

  render() {
    const DraftForm = (
      <form id="change-password" onSubmit={this.onSavePassword}>
        <div className="field">
          <label htmlFor="password"><i className="fa fa-key fa-fw" /> Current Password</label><br />
          <input 
            type="password" 
            name="currentPassword"
            placeholder="*******" 
            value={this.state.currentPassword || ''}
            onChange={this.onValueChange}
          />
        </div>
        <div className="field">
          <label htmlFor="password"><i className="fa fa-key fa-fw" /> New Password</label><br />
          <input 
            type="password" 
            name="newPassword"
            placeholder="*******" 
            value={this.state.newPassword || ''}
            onChange={this.onValueChange}
          />
        </div>
        <div className="field">
          <label htmlFor="password"><i className="fa fa-key fa-fw" /> Confirm Password</label><br />
          <input 
            type="password" 
            name="passwordConfirmation"
            placeholder="*******" 
            value={this.state.passwordConfirmation || ''}
            onChange={this.onValueChange}
          />
        </div> 
        <div id="btn-group">
          <button 
            className="button_1 save"
            onClick={this.onSavePassword}>
            <div className="forStyle">Save</div>
          </button>
          <button 
            className="button_1 close" 
            onClick={this.onChangePassword} type="button">
            <div className="forStyle">Close</div>
          </button>
        </div>
        
      </form>
    )
    const Form = this.props.changingPassword? DraftForm : <div></div>
    
    const threeDots = {
      textOverflow: "ellipsis",
      whiteSpace: "nowrap",
      overflow: "hidden"
    }
    return (
      <div>
        <button className="btn-task" 
          onClick={this.onChangePassword} style={threeDots}>
        <i className="fa fa-wrench fa-fw" /> Change Password
        </button>
        {Form}
      </div>
    )
  }
}
