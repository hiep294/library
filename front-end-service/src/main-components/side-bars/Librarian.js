import React, { Component } from 'react'
import ChangePassword from './ChangePassword'

export default class Librarian extends Component {
  state = {
    list: {
      tickets: [],
      books: []
    },
    changingPassword: false
  }


  onChangePassword = () => {
    this.setState({
      changingPassword: !this.state.changingPassword
    })
  }
  
  render() {
    const {bookBasket } = this.props
    const threeDots = {
      textOverflow: "ellipsis",
      whiteSpace: "nowrap",
      overflow: "hidden"
    }
    return (  
      <div>     
        <div id="user-info" className="dark">   
          <ul id="tasks">
            <li>
              <button className="btn-task" onClick={this.props.onDashboard}><i className="fa fa-dashboard fa-fw" /> Dashboard
              </button>
            </li>
            
            <li>
              <button className="btn-task" onClick={this.props.onReport} style={threeDots}>
              <i className="fa fa-bar-chart fa-fw"/> Report
              </button>
            </li>

            <li>
              <button className="btn-task" onClick={this.props.onFee} style={threeDots}>
              <i className="fa fa-money fa-fw"/> Fee Configuration
              </button>
            </li>

            <li>
              <button className="btn-task" onClick={this.props.onBookBasket} style={threeDots}>
                <i className="fa fa-shopping-basket fa-fw" /> 
                &nbsp;Book Basket
                (<span style={{color: 'yellow'}}>{bookBasket.chosenBooks.length}</span>) 
                {bookBasket.chosenStudent.id? <i className="fa fa-user fa-fw" /> : <span></span>}
              </button>
            </li>

            <li>
              <button 
                className="btn-task task-is-chosen" 
                onClick={this.props.onTickets}
                style={threeDots}>
              <i className="fa fa-ticket fa-fw" /> Ticket Management
              </button>
            </li>

            <li>
              <button className="btn-task" onClick={this.props.onStudents} style={threeDots}><i className="fa fa-user fa-fw"/> Student Management
              </button>
            </li>
            
            <li>
              <button className="btn-task" onClick={this.props.onBooks} style={threeDots}>
              <i className="fa fa-book fa-fw"/> Book Management
              </button>
            </li>
            
            

            <li>
              <ChangePassword 
                onChangePassword={this.onChangePassword}
                changingPassword={this.state.changingPassword}
                />
            </li>
            <li>
              <button className="btn-task" onClick={this.props.onLogout}><i className="fa fa-sign-out fa-fw" style={threeDots}/> Logout
              </button>
            </li> 
          </ul>          
        </div>
      </div> 

    )
  }

  
}
