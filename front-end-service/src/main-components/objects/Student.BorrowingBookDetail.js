import React, { Component } from 'react'
import moment from 'moment'

export default class BorrowingBookDetail extends Component {

  state = {
    isGood: this.props.borrowingBookDetail.is_good? true: false,
    note: this.props.borrowingBookDetail.note
  }

  studentReturnsBook = async () => {
    this.props.studentReturnsBook(this.props.borrowingBookDetail.ticket_detail_id,this.props.borrowingBookDetail.book_id, this.state.isGood, this.state.note)
  }

  onKeyUp = (e) => {
    if (e.keyCode === 13) {
      e.preventDefault()
      this.studentReturnsBook()
    }
  }

  handleChangeBoolean = (e) => {
    this.setState({
      [e.target.name]: e.target.checked
    })
  }

  handleChangeText = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  render() {
    const {book_title, created_at, due_date, ticket_detail_id, book_id, ticket_id} = this.props.borrowingBookDetail
    const parseNow = new Date().getTime()
    const parseDueDate = Date.parse(due_date)
    const isOverDue = parseNow > parseDueDate

    const createdAtDateString = moment(created_at).format('DD-MM-YYYY, h:mm a')
    const dueDateString =  moment(due_date).format('DD-MM-YYYY, h:mm a')
    // const nowString = this.convertDateToReadableString(new Date())
    // console.log(nowString)
    // console.log(this.props.borrowingBookDetail)
    return (
      <div className="ticketdetail">
        <div 
          className={`sss book-title ${isOverDue? "over-due" : "borrowing"}`} 
          title={book_title} >{book_title}      
        </div>
        <div className="sss" title="ticket detail id"
          style={{fontSize: "13px"}}>(Ticket Id: {ticket_id} || Ticket Detail Id: {ticket_detail_id} || Book Id: {book_id})
        </div>
        <div 
          className="sss" 
          title={createdAtDateString}>{`At: ${createdAtDateString}`}
        </div>
        <div 
          className="sss" 
          title={dueDateString}>{`Due: ${dueDateString}`}
        </div>
        <div id="is-good">Is Good? 
          <input type="checkbox" 
          name="isGood"
          checked={this.state.isGood? true : false}
          onChange={this.handleChangeBoolean}/>
        </div>
        <div className="note">
          <input id="ss" type="text" 
          name="note"
          value={this.state.note || ''} 
          placeholder="..."
          onChange={this.handleChangeText}
          onKeyUp={this.onKeyUp}/>
          <button type="button" onClick={this.studentReturnsBook}>OK</button>
        </div>
      </div>
    )
  }

  
}
