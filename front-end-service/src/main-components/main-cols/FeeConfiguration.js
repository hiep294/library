import React, { Component } from 'react'
import FeePerDay from '../../modules/ FeePerDay'
import {Spring} from 'react-spring/renderprops'
import axios from 'axios'
import Auth from '../../modules/Auth';

export default class FeeConfiguration extends Component {
  state = {
    ofReferenceBook: FeePerDay.getForReferenceBook(),
    haveChangedofReferenceBook: false,
    ofTextBook: FeePerDay.getForTextBook(),
    haveChangedofTextBook: false    
  }

  onChangeFee = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
      ["haveChanged" + e.target.name]: true
    })
  }

  saveChange1 = () => {
    axios({
      url: Auth.getUrl() + "/fees/1",
      method: 'patch',
      headers: {
        token: Auth.getToken(),
        'Authorization': `Token ${Auth.getToken()}`
      },
      data: {
        updated_value: this.state.ofReferenceBook
      }
    }).then(res => {
      if(res.data.status === 'SUCCESS'){
        FeePerDay.setForReferenceBook(this.state.ofReferenceBook)
        this.setState({
          haveChangedofReferenceBook: false
        })
      }
    }).catch(errs => console.log(errs))
  }

  saveChange2 = () => {
    axios({
      url: Auth.getUrl() + "/fees/2",
      method: 'patch',
      headers: {
        token: Auth.getToken(),
        'Authorization': `Token ${Auth.getToken()}`
      },
      data: {
        updated_value: this.state.ofTextBook
      }
    }).then(res => {
      if(res.data.status === 'SUCCESS'){
        FeePerDay.setForTextBook(this.state.ofTextBook)
        this.setState({
          haveChangedofTextBook: false
        })
      }      
    }).catch(errs => console.log(errs))
  }

  render() {
    const styleBtn = { 
      position: "absolute", 
      display: "inline",
      marginTop: "1px",
      marginLeft: "7px"
    }
    return (    
      <div>
        <div>
          <h1>Fee Configuration</h1>
        </div>
        <Spring
          from={{ opacity: 0 }}
          to={{ opacity: 1 }}
        >
          {
            props => {
              return (
                <div id="book-types" className="book" style={props}>
                  <center><h2>Fee per day of each book type</h2></center>
                  <center>
                    <h3>Reference Book</h3>                    
                    <input type="number"
                      name="ofReferenceBook"
                      value={this.state.ofReferenceBook}
                      onChange={this.onChangeFee}
                      style={{width: "50px"}}
                    /> (VND)
                    {this.state.haveChangedofReferenceBook? (
                    <button style={styleBtn} onClick={this.saveChange1} name="Reference Book">
                      <i className="fa fa-save fa-lg"/>&nbsp;Save
                    </button>
                    ) : <span></span>}                      
                    
                    <h3>Text Book</h3>
                    <input type="number"
                      name="ofTextBook"
                      value={this.state.ofTextBook}
                      onChange={this.onChangeFee}
                      style={{width: "50px"}}
                    /> (VND)
                    {this.state.haveChangedofTextBook? (
                    <button style={styleBtn} onClick={this.saveChange2} name="Text Book">
                      <i className="fa fa-save fa-lg"/>&nbsp;Save
                    </button>
                    ) : <span></span>} 
                  </center>   
                  <div style={{height: "30px"}}></div>               
                </div>
              )
            }
          }
          
        </Spring> 
      </div> 
    )
  }
}
