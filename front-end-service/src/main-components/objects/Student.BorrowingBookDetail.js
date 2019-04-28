import React, { Component } from 'react'
import moment from 'moment'
import FeePerDay from '../../modules/ FeePerDay';

export default class BorrowingBookDetail extends Component {

  constructor(props){
    super(props)
    const { is_good, note, due_date, price, is_text_book } = this.props.borrowingBookDetail    
    const parseNow = moment().valueOf()
    const parseDueDate = moment(due_date).valueOf()
    const isOverDue = parseNow > parseDueDate
    
    
    // calculate fee
    let fee = 0 
    if(isOverDue) {
      const feeEachDay = is_text_book ? FeePerDay.getForTextBook() : FeePerDay.getForReferenceBook()
      //minisecond: /1000
      fee = Math.trunc((parseNow - parseDueDate) * feeEachDay / (24 * 60 * 60 * 1000))
    }

    
    this.state = {
      priceOfBook: price,
      fee,
      isOverDue,
      isGood: is_good? true: false,
      note
    }
    console.log(this.state)
  }


  /**
   * handle when student returns book
   */
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
    const {book_title, created_at, due_date, ticket_detail_id, book_id, ticket_id, price, is_text_book} = this.props.borrowingBookDetail

    const createdAtDateString = moment(created_at).format('DD-MM-YYYY, h:mm a')
    const dueDateString =  moment(due_date).format('DD-MM-YYYY, h:mm a')
    // const nowString = this.convertDateToReadableString(new Date())
    // console.log(nowString)
    // console.log(this.props.borrowingBookDetail)
    return (
      <div className="ticketdetail">
        <div 
          className={`sss book-title ${this.state.isOverDue? "over-due" : "borrowing"}`} 
          title={book_title} >{book_title}      
        </div>
        <div className="sss" title="ticket detail id"
          style={{fontSize: "13px"}}>
          (<span title="ticket id" style={{display: "inline"}}>
            {ticket_id}
          </span> || &nbsp;
          <span title="ticket detail id" style={{display: "inline"}}>
            {ticket_detail_id}
          </span> || &nbsp;
          <span title="book id" style={{display: "inline"}}>
            {book_id}
          </span> || &nbsp;
          <span title="price of book" style={{display: "inline"}}>
            (VND) {price}
          </span>)
        </div>
        <div 
          className="sss" 
          title={"kind of book"}>{is_text_book? 'Text Book' : 'Reference Book'}
        </div>
        <div 
          className="sss" 
          title={"created date at"}>{`At: ${createdAtDateString}`}
        </div>
        <div 
          className="sss" 
          title={"due date at"}>{`Due: ${dueDateString}`}
        </div>
        <div id="is-good" title="status">Is Good? 
          <input type="checkbox" 
          name="isGood"
          checked={this.state.isGood? true : false}
          onChange={this.handleChangeBoolean}/>
        </div>

        {this.state.fee? (
          <div className="sss" style={{color: "red"}}>
            Fee (VND):&nbsp; 
            <input 
            style={{width: "100px"}}
            type="number" 
            name="fee"
            value={this.state.fee}
            onChange={this.handleChangeText}/>
          </div>
        ) : <span></span>}
        
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
