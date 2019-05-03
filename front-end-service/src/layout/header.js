import React, { Component } from 'react'
import axios from 'axios';
import Auth from './../modules/Auth'

export default class header extends Component {

  state = {
    onFeedback: false,
    name: '',
    meetRequirement: '',
    usability: '',
    improvementComment: ''
  }

  onFeedback = () => {
    this.setState({
      onFeedback: !this.state.onFeedback
    })
  }

  onEditChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  onSendFeedback = () => {
    let fb = new FormData() 
    fb.append("feedback[name]", this.state.name)
    fb.append("feedback[meet_requirement]", this.state.meetRequirement)
    fb.append("feedback[usability]", this.state.usability)
    fb.append("feedback[improvement_comment]", this.state.improvementComment)
    axios({
      url: Auth.getUrl() + "/feedbacks",
      method: 'post',
      data: fb,
      headers: {
        token: Auth.getToken(),
        'Authorization': `token ${Auth.getToken()}`
      }
    }).then( res => {
      if(res.data.status === 'SUCCESS'){
        this.setState({
          onFeedback: false,
          name: '',
          meetRequirement: '',
          usability: '',
          improvementComment: ''
        })
      } else {
        console.log(res.data)
      }
    }).catch(errs => console.log(errs))
    
  }
  

  MainFeedback = () => {
    return (
      <div>
        <center style={{padding: "2px", fontSize: "20px", fontWeight: "bold"}}>Feedback sheet</center>
        <div style={{fontSize: "12px"}}>*min grade: 1 , max grade: 10</div>
        <div>Name</div>
        <input type="text" style={{width: "99%"}} placeholder={'Abc Nguyen'}
          name="name"
          value={this.state.name}
          onChange={this.onEditChange}
          />
        <div>Meeting user requirements </div>
        <input min={1} max={10} placeholder="1->10" type="number" style={{width: "99%"}}
          name="meetRequirement"
          value={this.state.meetRequirement}
          onChange={this.onEditChange}
          />
        <br />
        <div>Usability </div>
        <input min={1} max={10} placeholder="1->10" type="number" style={{width: "99%"}}
          name="usability"
          value={this.state.usability}
          onChange={this.onEditChange}
          />
        <br />
        <div>Improvement / Comment</div>
        <textarea style={{width: "99%", paddingRight: "0", height: "150px"}} placeholder={'language, UI design, user experience design, etc.'}
          name="improvementComment"
          value={this.state.improvementComment}
          onChange={this.onEditChange}
          ></textarea>
        <center style={{paddingTop: "3px"}}>
        <button className="button_1 save" style={{borderColor: "#e6e6e6"}}
          onClick={this.onSendFeedback}
          >
          Send
        </button>
        <button className="button_1 close" style={{borderColor: "#e6e6e6"}} onClick={this.onFeedback}>Close</button>
        </center>
      </div>
    )
  }

  render() {
    return (
      <div>
      <header>
        
        <div className="container container-header">
          <div id="branding">
            <div id="logo"></div>
            <h1 id="branding" onClick={this.props.onHome}><span className="highlight">Open</span> Library</h1>
          </div>
          <div id="feedback-show-hide">
            <i className="fa fa-star fa-2x" 
            style={{ color: "yellow" }}
            onClick={this.onFeedback}/>
          </div>
        </div>
        
      </header>
      <div>
        {
          this.state.onFeedback? (
            <div className="container container-feedback">
              <div className="book" 
              id="feedback" 
              style={{zIndex: "10", borderLeft: "3px solid #e8491d", borderBottom: "3px solid #e8491d"}}>
                
                {this.MainFeedback()}
              </div>
            </div>): 
            <div></div>
        }
        </div>
      </div>
    )
  }
}
