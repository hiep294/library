import React, { Component } from 'react'
import BookImage from './BookImage'
import Auth from './../../modules/Auth'
import { Spring } from 'react-spring/renderprops'

/**
 * this class is to show infomation of book, update, delete book
 */
export default class Book extends Component {

  /**
   * store info book, in default it will show short info
   * if(inBasket) that mean, the book has been chosen in basket
   */
  state = {
  }

  /**
   * show more infor of book
   */
  onShowMore = () => {
    this.setState({
      shortInfo: !this.state.shortInfo
    })
  }


  
  /**for UI */
  NormalModeCOM = () => {
    const {book} = this.props 
    const qStyle = book.available_quantity > 0 ? {display : "inline", color : "green"} : {display : "inline", color : "red"}
    let shortReview = ""
    if(book.review) shortReview = book.review.split(" ").splice(0, 30).join(" ");
    const inline = { display: "inline" }
    if(this.props.inBookBasket && this.state.shortInfo) {
      shortReview = ""
    }
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
        <span style={{fontSize : "13px"}}>{shortReview}</span>
      </div>
    )
  } 

  /**
   * book detail UI
   */
  BookInfoDetail = () => {
    // const check = this.state.onEditMode

    let moreReview = ""
    if(this.props.book.review) {
      moreReview = this.props.book.review.split(" ").splice(30).join(" ")
    }    

    const editTagCom = (
      <span className="info" style={{display: "block"}}>
        <span>- Tag(s):&nbsp;</span>
        {this.state.onEditMode? this.tagsCom() : <span><br/>{this.props.book.tags}</span>}
      </span>
    )

    const editPublisherCom = (
      <span className="info" style={{display: "block"}}>
        <span>- Publisher: &nbsp;</span>
        {this.state.onEditMode? this.publisherCom(): <span><br/>{this.props.book.publisher}</span>}
      </span>
    )

    const editCallNumberCom = (
      <span className="info" style={{display: "block"}}>
        <span>- Call Number: &nbsp;</span>
        {this.state.onEditMode? this.callNumberCom() : <span><br/>
          {this.props.book.call_number}
        </span>}
      </span>
    )

    const editYearOfPublication = (
      <span className="info" style={{display: "block"}}>
        <span>- Year Of Publication: &nbsp;</span>
        {this.state.onEditMode? this.yearOfPublication() : <span><br/>
          {this.props.book.year_of_publication}
        </span>}
      </span>
    )

    return (
      <Spring 
        from={{ opacity: 0 }}
        to={{ opacity: 1 }}
      >
        {props => (
          <div className="book-info-detail" style={props}>
            <div className="book-image-mg">
              <BookImage 
                book_image={this.props.book.book_image}  
                id={this.props.book.id}
                updateImage={this.updateImage}
                reload={this.state.reloadBigImage}
              />
              <div></div>
              { Auth.isUserAuthenticated()? this.props.inBookManagement? this.state.onEditMode? (
                <i className="fa fa-trash fa-lg" onClick={() => this.props.removeBookRequest(this.state)} title="remove" style={{marginTop : "8px", padding : "3px", float : "right"}}/>            
              ) : <div /> : <div /> : <div />}
            </div>
            <div id="review">
              <span>{this.state.onEditMode? this.reviewCom() : moreReview}</span>
              <p style={{fontStyle: "italic"}}>
                {editYearOfPublication}
                {editPublisherCom}
                {editCallNumberCom}
                {editTagCom}
              </p>
              
            </div> 
          </div>
        )}

      </Spring>
    )
  }
  
  render() {
    const btnText = !Auth.isUserAuthenticated()? this.state.shortInfo? "Show More" : " Show Less  " : `ID: ${this.props.book.id}`
    const MoreInfo = this.state.shortInfo? <div></div> : this.BookInfoDetail()
    return (
      <Spring
        from={{ opacity: 0 }}
        to={{ opacity: 1 }}
      >
      {props => (
        <div style={props}>
        <div className="book"> 
          <div className="book-info">
            <div className="book-info-main">
              <h2 id="title" className="title" style={{cursor: "pointer"}} onClick={this.onShowMore} title="title">{this.state.onEditMode? "" : this.props.book.title} 
              </h2>
              <hr style={{marginRight : "5px"}}/>
              {this.state.onEditMode? this.EditModeCOM() : this.NormalModeCOM()}
            </div>
            <BookImage 
                smallImage={true}
                onEditMode={this.state.onEditMode}
                shortInfo={this.state.shortInfo}
                book_image={this.props.book.book_image} 
                id={this.props.book.id} 
              />
            <span>
              {Auth.isUserAuthenticated()? this.RighTopIconManagment() : <div></div>}
            </span>   
          </div>
          {MoreInfo}
          <button className="button_2 button_3" onClick={this.onShowMore} type="button" title="Show more or less">
            {btnText}
          </button>
        </div>
        </div>
      )}
      </Spring>
    )
  }

  
}

