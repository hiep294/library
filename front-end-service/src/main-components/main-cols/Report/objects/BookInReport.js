import React, { Component } from 'react'
import BookImage from './../../../objects/BookImage'
import Auth from './../../../../modules/Auth'
import { Spring } from 'react-spring/renderprops'
import ComponentCountStudent from './ComponentCountStudent'
import TotalObjects from './TotalObjects'

export default class Book extends Component {

  state = {
    shortInfo: true
  }

  
  /**for UI */
  NormalModeCOM = () => {
    const {book} = this.props 
    const qStyle = book.available_quantity > 0 ? {display : "inline", color : "green"} : {display : "inline", color : "red"}
    
    const inline = { display: "inline" }

    const {total_of_students:s, total_of_black_students:a,total_of_green_students:b,total_of_red_students:c} = this.props.book
    return (
      <div>
        <span>
          <span style={qStyle} title="available quantity">
            {book.available_quantity}&nbsp;-&nbsp;
          </span>
          <span title={`kind of book`} style={inline}>
            {book.is_text_book? "Text Book" : "Reference Book"}&nbsp;-&nbsp;
          </span>
          <span title="author(s)" style={inline}>
            {book.authors}&nbsp;/&nbsp;
          </span>
          <span title="location" style={inline}>
            {book.location}
          </span>
        </span>
        <span>
          Total of students who have borrowed this book: {s}
        </span>
        <span className="count-student">
          <ComponentCountStudent 
            title={'Total of students who have returned this book'}
            value={a}
            style2={'black'}
          />
          <ComponentCountStudent 
            title={'Total of students who have been borrowing this book, and NOT overdue'}
            value={b}
            style2={'green'}
          />
          <ComponentCountStudent 
            title={'Total of students who have been borrowing this book, but OVERDUE'}
            value={c}
            style2={'red'}
          />
        </span>
      </div>
    )
  } 

  render() {
    const btnText = !Auth.isUserAuthenticated()? this.state.shortInfo? "Show More" : " Show Less  " : `ID: ${this.props.book.id}`
    
    return (
      <Spring
        from={{ opacity: 0 }}
        to={{ opacity: 1 }}
      >
      {props => (
        <div style={props}>
        <div className="book">
          
          <div className="book-info">
            <span className="fix-one">
              <BookImage 
                smallImage={true}
                shortInfo={this.state.shortInfo}
                book_image={this.props.book.book_image} 
                id={this.props.book.id} 
              />
              <button className="button_2 button_3 button_4" type="button" title="Show more or less">
                {btnText}
              </button>  
            </span>
            <div className="book-info-main">
              <h2 id="title" className="title" style={{cursor: "pointer"}} title="title">{this.props.book.title} 
              </h2>
              {this.NormalModeCOM()}
            </div>
            
            <TotalObjects s={this.props.book.total_of_students}/>  
          </div>
          <button className="button_2 button_3 button_5" type="button" title="Show more or less">
            {btnText}
          </button>       
        </div>
        </div>
      )}
      </Spring>
    )
  }

  
}

