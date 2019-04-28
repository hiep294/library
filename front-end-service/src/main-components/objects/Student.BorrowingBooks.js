import React, { Component } from 'react'
import axios from 'axios'
import Auth from '../../modules/Auth'
import BorrowingBookDetail from './Student.BorrowingBookDetail'
import { Spring } from 'react-spring/renderprops'

export default class BorrowingBooks extends Component {

  constructor(props){
    super(props)
    this.state = {
      borrowingBooks: [],
      isShown: false,
      rendering: true
    }
  }

  componentDidMount = () => {
    axios({
      url: Auth.getUrl() + '/students/'+this.props.studentId,
      method:'get',
      headers: {
        token: Auth.getToken(),
        'Authorization': `Token ${Auth.getToken()}`
      }
    }).then( res => {
      if (res.data.status === 'SUCCESS') {
        this.setState({
          borrowingBooks: res.data.data.borrowing_books,
          rendering: false
        })
      }
    }).catch(errs => console.log(errs))  
  }

  componentDidUpdate = (prevProps) => {
    if(prevProps.reload !== this.props.reload){
      this.componentDidMount()
    }
  }


  handleShow = () => {
    this.setState({
      isShown: !this.state.isShown
    })
  }


  /**
   * handle when student returns book
   */
  studentReturnsBook = async (ticketDetailId, bookId, bookIsGood, note) => {
    
    await axios({
      url: Auth.getUrl() + '/ticketdetails/' + ticketDetailId,
      method: 'patch',
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
        // remove book in borrowing book
        let clone = this.state.borrowingBooks.filter(item => {
          return item.ticket_detail_id !== ticketDetailId
        })
        this.setState({
          borrowingBooks: clone
        })
      }
    }).catch(errs => console.log(errs))
  }

  Details = () => {
    return (
      <Spring 
        from={{ opacity: 0 }}
        to={{ opacity: 1 }}
      >
        {props => (
          <div style={props}>
            {this.state.borrowingBooks.map( borrowingBookDetail => {
              return <BorrowingBookDetail 
                      key={borrowingBookDetail.ticket_detail_id}
                      borrowingBookDetail={borrowingBookDetail}  
                      studentReturnsBook={this.studentReturnsBook}                  
                      />
            })}
          </div>
        )}
      </Spring>
    )
  }

  render() {
    const books = this.state.borrowingBooks
    let countOverDueOfReturningBook = 0
    var now = new Date().getTime()
    books.map(book => {
      var dueDate = Date.parse(book.due_date)
      if (now > dueDate) countOverDueOfReturningBook++
      return book
    }) 
    if(books.length){
      return (
        <Spring
          from={{ opacity: 0 }}
          to={{ opacity: 1 }}
        >
          {props => (
            <div style={props}>
              {books.length - countOverDueOfReturningBook? (
                <span style={{color: "green", display: "inline"}}>
                    <i className="fa fa-book fa-fw" title="Number of books which have been borrowing" onClick={this.handleShow}/>
                    <span style={{display: "inline", cursor: "pointer"}} title="Number of books which have been borrowing before due date" onClick={this.handleShow}>
                      ({books.length - countOverDueOfReturningBook})
                  </span>
                </span>) : <span></span>}
              
              &nbsp;
              {countOverDueOfReturningBook? (
                <span style={{color: "red", display: "inline"}}>
                  <i className="fa fa-book fa-fw" title="Number of books which overdue of returning" onClick={this.handleShow}/>
                  <span style={{display: "inline", cursor: "pointer"}} title="Number of books which overdue of returning" onClick={this.handleShow}>({countOverDueOfReturningBook})</span>
                </span>
              ) : <span></span>}
              <div>{this.state.isShown? <hr /> : ''}{this.state.isShown? this.Details() : <div></div>}</div>
            </div>
          )}
        </Spring>
      )
    }else {
      return (
        <Spring
          from={{ opacity: 0 }}
          to={{ opacity: 1 }}
        >
          {props => (
            <div style={props}>
              {this.state.rendering? "loading..." : <span><i className="fa fa-book fa-fw"/>(0)</span>}
            </div>
          )}
        </Spring>
      )
    }  
  }
}
