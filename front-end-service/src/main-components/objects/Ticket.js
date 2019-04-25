import React, { Component } from 'react'
import moment from 'moment'
import axios from 'axios'
import Auth from '../../modules/Auth'
import TicketDetail from './TicketDetail'
import { Spring } from 'react-spring/renderprops'

export default class Ticket extends Component {

  constructor(props){
    super(props)
    const {id, student_id, created_at, name, email} = this.props.ticket
    const at = moment(created_at)
    this.state = {
      id,
      student_id,
      theDate: at.format('DD'),
      theMonthYear: at.format('MM / YYYY'),
      theDateString: at.format('MMMM Do YYYY, h:mm a'),
      studentName: name,
      studentEmail: email,
      ticketDetails: [],
      onShowDetails: false,
      rendering: true
    }
  }

  updateTicketDetail = async (id, bookId, bookIsGood, note) => {
    let pm = "Brave"
   
    await axios({
      method: 'patch',
      url: Auth.getUrl() + '/ticketdetails/' + id,
      params: {
        book_id: bookId,
        book_is_good: bookIsGood,
        note,
        return_date: new Date()
      },
      headers: {
        token: Auth.getToken(),
        'Authorization': `Token ${Auth.getToken()}`
      }
    }).then(res => {
      if(res.data.status === 'SUCCESS'){
        //update book
        this.setState( this.state.ticketDetails.map( item => {
          if(item.id === id){
            item.is_good = res.data.data.is_good
            item.note = res.data.data.note
            item.return_date = res.data.data.return_date
          }
          return item
        }) )
        // console.log(res.data.data)
        pm = 'SUCCESS'
      }
    }).catch(errs => console.log(errs))
    return pm
  }

  componentDidUpdate = (prevProps) =>{
    if(prevProps.reload !== this.props.reload){
      this.componentDidMount()
    }
  }

  componentDidMount = () => {
    axios({
      url: Auth.getUrl() + '/tickets/' + this.state.id,
      method: 'get',
      params: {
        student_id: this.state.student_id
      },
      headers: {
        token: Auth.getToken(),
        'Authorization': `Token ${Auth.getToken()}`
      }
    }).then(res => {
      const {ticketDetails} = res.data.data
      this.setState({
        ticketDetails,
        rendering: false
      })
    }).catch(errs => console.log(errs))
  }

  DateImageComponent = () => {
    const head = {
      backgroundColor: "rgb(175, 99, 39)",
      color: "#fff",
      width: "100px",
      textAlign: "center",
      fontSize: "16px",
      marginBottom: "1px"
    }
    const body = {
      backgroundColor: "rgb(73, 100, 111)",
      color: "#fff",
      width: "100px",
      height: "89px",
      fontSize: "70px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontFamily: "Comic Sans MS",
      fontWeight: "bold",
      borderBottomLeftRadius: "3px",
      borderBottomRightRadius: "3px",
      textShadow: "rgb(33, 115, 0) 3px 3px 5px"
    }
    const whole = {
      marginTop: "5px",
      marginRight: "5px"
    }
    return (
      <div style={whole}>
        <div style={head}>{this.state.theMonthYear}</div>
        <div style={body}><span>{this.state.theDate}</span></div>
        <button className="button_2" style={{width: "100px", backgroundColor: "rgb(73,100,111)"}} title="Ticket's Id"> Id: {this.state.id}</button>
      </div>
    )
  }

  TicketDetails = () => {
    return (
      <Spring
        from={{ opacity: 0 }}
        to={{ opacity: 1}}
      >
      {props => (
        <div style={props}>
        {this.state.ticketDetails.map(ticketDetail => {
          return <TicketDetail 
          key={ticketDetail.id} 
          ticketDetail={ticketDetail} 
          updateTicketDetail={this.updateTicketDetail}/>
        })}
        </div>

      )}
      </Spring>
    )
  }
  onShowDetails = () => {
    this.setState({
      onShowDetails: !this.state.onShowDetails
    })
  }


  totalOfBookIcon = (total) => {
    return (
      <span style={{display: "inline"}}>
        <span style={{display: "inline", cursor: "pointer"}} title="Number of books in ticket">
        <i className="fa fa-hand-o-right fa-fw"/>
        <span style={{fontWeight: "bold", display: "inline"}}>{total} books&nbsp;</span>
        </span>
      </span>
    )
  }
  borrowingBooksIcon = (number) => {
    return (
      <span style={{color: "green", display: "inline"}}>
        <i className="fa fa-book fa-fw" title="Number of books which have been borrowing and before due date"/>
        <span style={{display: "inline", cursor: "pointer"}} title="Number of books which have been borrowing and before due date">({number})</span>
      </span>
    )
  }
  overdueBooksIcon = (number) => {
    return (
      <span style={{color: "red", display: "inline"}}>
        <i className="fa fa-book fa-fw" title="Number of books which have been borrowing and over due date"/>
        <span style={{display: "inline", cursor: "pointer"}} title="Number of books which have been borrowing and over due date">({number})</span>
      </span>
    )
  }
  miniBookIcons = () => {
    const books = this.state.ticketDetails
    let countBookOverDue = 0
    let now = new Date().getTime()
    const borrowingBooks = books.filter(book => {
      if(book.return_date === null){
        //check over due or not
        const dueDate = Date.parse(book.due_date)
        if(now>dueDate) countBookOverDue++
      }
      return book.return_date === null
    })
    if(this.state.rendering) {
      return (
        <div>
          Loading...
        </div>
      )
    } else {
      return (
        <div>
          {this.totalOfBookIcon(books.length)}&nbsp;
          {borrowingBooks.length-countBookOverDue?  this.borrowingBooksIcon(borrowingBooks.length-countBookOverDue) : <div style={{display: "inline"}}/>}&nbsp;
          {countBookOverDue? this.overdueBooksIcon(countBookOverDue) : <div style={{display: "inline"}}/>}
        </div>
      )      
    }
  }
  render() {
    return (
      <Spring
        from={{ opacity: 0 }}
        to={{ opacity: 1 }}
      >
        {props => (
          <div className="student" style={props}>
            <div className="student-info">
              <div className="student-info-main">
                <div className="avatar-manager as-ticket">
                  {this.DateImageComponent()}              
                </div>
                <div className="student-info-detail as-ticket" style={{width: "100%"}}>
                  <i title="ticket date">{this.state.theDateString}</i>
                  <div id="name" className="name" style={{fontWeight: "bold", fontSize: "30px"}}>
                    {this.state.studentName}
                  </div>
                  <span> 
                    {this.state.studentEmail}
                  </span>
                  <div onClick={this.onShowDetails}>
                    {this.miniBookIcons()}                
                  </div>
                  <div>{this.state.onShowDetails? <hr/> : ''}{this.state.onShowDetails? this.TicketDetails(): <div />}</div>
                  
                </div>
                
              </div>
            </div>
            
          </div>
        )}
      </Spring>
    )
  }
}
