import React, { Component } from 'react'
import moment from 'moment'

export default class BorrowingBookDetail extends Component {

  // #f7d399

  state = {
    isGood: this.props.ticketDetail.is_good === 1? true : false,
    note: this.props.ticketDetail.note,
    noting: false
  }

  updateTicketDetail = () => {
    // console.log(this.props.ticketDetail)
    const {id, book_id} = this.props.ticketDetail
    const req = this.props.updateTicketDetail(id, book_id, this.state.isGood, this.state.note)
    // if update ok > noting style is yellow, else not changing
    req.then(res => {
      if(res === 'SUCCESS'){
        this.setState({
          noting: false
        })
      }
    })
  }
  onKeyUp = (e) => {
    if(e.keyCode === 13) this.updateTicketDetail()
  }

  handleChangeBoolean = (e) => {
    this.setState({
      [e.target.name]: e.target.checked
    })
  }

  handleChangeText = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
      noting: true
    })
  }

  noting = () => {
    this.setState({
      noting: true
    })
  }
  notingStyle = () => {
    if (this.state.noting) {
      return {
        backgroundColor: "#fff"
      }
    } else {
      return {
        backgroundColor: "#f7d399"
      }
    }
  }
  renderReturnedBook = () => {
    const {book_title, due_date, return_date, id, book_id} = this.props.ticketDetail
    const returnDateString =  moment(return_date).format('DD-MM-YYYY, h:mm a')
    const dueDateString = moment(due_date).format('DD-MM-YYYY, h:mm a')
    return (
      <div className="ticketdetail">
        <span className="sss book-title">{book_title}</span>
        <span className="sss"
          style={{fontSize: "13px"}}
          title="ticket detail Id">(Ticket Detail Id: {id} || Book Id: {book_id})
        </span>
        <span className="sss">Due: {dueDateString}</span>
        <span className="sss">Return: {returnDateString}</span>
        <span className="sss">Status: {this.state.isGood? 'good': 'NOT good'}
        </span>
        <div className="note">
          <input id="ss" type="text" style={this.notingStyle()}
            name="note"
            value={this.state.note || ''}
            onChange={this.handleChangeText}
            onKeyUp={this.onKeyUp}
            onFocus={this.noting}
            placeholder="..."
          />
          <button onClick={this.updateTicketDetail}>OK</button>
        </div>
      </div>
    )
  }

  renderBorrowingBook = () => {
    const {book_title, due_date, id, book_id} = this.props.ticketDetail
    
    const parseNow = new Date().getTime()
    const parseDueDate = Date.parse(due_date)
    const isOverDue = parseNow > parseDueDate
    const dueDateString =  moment(due_date).format('DD-MM-YYYY, h:mm a')
    let returnDateString = isOverDue? 'none and over due' : 'none'        
    return (
      <div className="ticketdetail">
        <span
        className={`sss book-title ${isOverDue? "over-due" : "borrowing"}`} 
        title={book_title}>{book_title}
        </span>
        <span className="sss"
          style={{fontSize: "13px"}}
          title="ticket detail id">(Ticket Detail Id: {id} || Book Id: {book_id})
        </span>
        <span 
          className="sss" 
          title={dueDateString}>{`Due: ${dueDateString}`}
        </span>
        <span
          className="sss"
          title={returnDateString}>{`Return: ${returnDateString}`}
        </span>
        <div>Is Good? 
          <input type="checkbox" 
          name="isGood"
          checked={this.state.isGood? true : false}
          onChange={this.handleChangeBoolean}/>
        </div>
        <div className="note">
          <input id="ss" type="text" style={this.notingStyle()}
            name="note"
            value={this.state.note || ''} 
            onChange={this.handleChangeText}
            onKeyUp={this.onKeyUp}
            onFocus={this.noting}
            placeholder="..."/>
          <button onClick={this.updateTicketDetail}>OK</button>
        </div>
      </div>
    )
  }

  render() {
    return this.props.ticketDetail.return_date ? this.renderReturnedBook() : this.renderBorrowingBook()
  }

  
}
