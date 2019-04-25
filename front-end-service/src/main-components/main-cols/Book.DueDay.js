import React, { Component } from 'react'
import { Spring } from 'react-spring/renderprops'
import axios from 'axios'
import Auth from '../../modules/Auth';

export default class DueDay extends Component {

  constructor(props){
    super(props)
    const item = this.props.item
    this.state = {
      id: item.id,
      typeOfBook: item.type_of_book,
      dueDays: item.due_days,
      changed: false
    }
  }

  handleChange = (e) => {
    this.setState({
      dueDays: e.target.value,
      changed: true
    })
  }

  saveChange = async () => {
    axios({
      url: Auth.getUrl() + '/duedays/' + this.state.id,
      method: 'patch',
      data: {
        due_days: this.state.dueDays
      },
      headers: {
        token: Auth.getToken(),
        'Authorization': `Token ${Auth.getToken()}`
      }
    }).then( res => {
      if (res.data.status === 'SUCCESS'){
        //close save button
        this.setState({
          changed: false
        })
        //save in book management
        this.props.updateDueDay(this.state.id, this.state.dueDays)
        
      }
    }).catch( errs => console.log(errs))
  }

  render() {
    
    return (
      <div id="book-type" style={{textAlign: "center"}}>
        <h3>{this.state.typeOfBook}</h3>
        <input type="number" 
          value={this.state.dueDays} 
          onChange={this.handleChange}
          style={{width: "35px"}}/> (days)&nbsp;
        {this.state.changed? (
          <Spring
            from={{ opacity: 0 }}
            to={{ opacity: 1 }}
          >
            {props => {
              return(
                <div style={props} className="display-inline">
                  <button style={{ position: "absolute" }} onClick={this.saveChange}>
                    <i className="fa fa-save fa-lg"/>&nbsp;Save
                  </button>
                </div>)
            }}
          </Spring>
          )  : '' 
        }
      </div>
    )
  }
}
