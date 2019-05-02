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
    inBasket: true,
    shortInfo: true,
    onEditMode : false,
    id : '',
    title : '',
    authors : '',
    tags : '',
    available_quantity : 0,
    is_text_book : true,
    review : '',
    newBookImage: null,
    location: '',
    call_number: '',
    publisher: '',
    year_of_publication: '',
    price: 0,
    reloadBigImage: false
  }

  componentDidUpdate = (prevProps) => {
    if (this.props.book !== prevProps.book ){
      this.componentDidMount()
    }
  }// location is null ~~
  
  /**
   * mount the book, also check whether the book is in basket or not
   */
  componentDidMount = () => {
    const {book, chosenBooks} = this.props
    let existed// whether the current book is in book basket or not
    if(chosenBooks){
      //check the current book in chosen Books or not
      const checkIn = chosenBooks.find( item => {
        return item.id === book.id
      })
      existed = checkIn? true : false      
    }

    const {id, title, authors, tags, available_quantity, is_text_book, review, location,call_number, publisher, year_of_publication,price} = this.props.book

    this.setState({
      onEditMode: false,
      id, 
      title,
      authors,
      tags,
      available_quantity,
      is_text_book,
      review,
      inBasket: existed,
      location,
      call_number, 
      publisher, 
      year_of_publication,
      price,
      reloadBigImage: !this.state.reloadBigImage
    })
  }

  /**
   * update the text value
   */
  onEditChange = (e) => {
    this.setState({
      [e.target.name] : e.target.value
    })
  }

  /**
   * update the boolean value
   */
  onEditChange2 = (e) => {
    this.setState({
      is_text_book : !this.state.is_text_book
    })
  }

  /**
   * show more infor of book
   */
  onShowMore = () => {
    this.setState({
      shortInfo: !this.state.shortInfo
    })
  }

  /**
   * choose this book to basket or remove it to basket ket (when the librarian at the book managment)
   */
  onCheckBookInBasket = (e) => {
    //if available_quantity === 0, alert else doing action
    if (this.props.book.available_quantity === 0) {
      alert("There is not a copy of this book in library")
    } else {
      if(e.target.checked){
        this.props.onChooseBookInBasket(this.props.book)
        this.setState({
          inBasket: true
        })
      }else{
        this.props.onRemoveBookInBasket(this.props.book)
        this.setState({
          inBasket: false
        })
      }
    }
  }

  /**
   * remove book in basket, when the librarian at book basket
   */
  onRemoveBookInBasket = (e) => {
    this.props.onRemoveBookInBasket(this.props.book)
  }

  
  /**
   * if the book has been chosen in book basket, alert to avoid inconsistency
   */
  onEdit = (e) => {
    if(this.state.inBasket) {
      alert("Pls Remove This Book In Basket")
    } else {
      this.setState({
        onEditMode : true
      })
    }
    
  }


  /**
   * update image when user chooses another image
   */
  updateImage = (newBookImage) => {
    this.setState({
      newBookImage
    })
  }

  onKeyUp= (e) => {
    if(e.keyCode === 13){
      this.updateBookRequest()
    }
  }
  updateBookRequest = () => {
    const does = this.props.updateBookRequest(this.state)
    does.then( res => {
      if(res === "updated") this.setState({onEditMode: false})
    })
  }

  // UI for edit book
  titleCom = () => {
    return (
      <span className="info"><span> Title:&nbsp;</span><input id="book-title" className="text" type="text" value={this.state.title} onChange={this.onEditChange} name="title" onKeyUp={this.onKeyUp}/>
      </span>
    )
  } 
  /**for UI */
  authorsCom = () => {
    return (
      <input id="book-authors" className="text" type="text" value={this.state.authors || ''} onChange={this.onEditChange} name="authors" onKeyUp={this.onKeyUp}/>
    )
  }
   /**for UI */
  tagsCom = () => {
    return (
      <input id="book-tags" className="text" type="text" value={this.state.tags || ''} onChange={this.onEditChange} name="tags" style={{width: "98%"}} onKeyUp={this.onKeyUp}/>
    )
  } 
   /**for UI */
  locationCom = () => {
  return (
    <input id="book-tags" className="text" type="text" value={this.state.location || ''} onChange={this.onEditChange} name="location" onKeyUp={this.onKeyUp}/>
    )
  }  
  /**for UI */
  quantityCom = () => {
    return (
      <input id="book-quantity" className="text" type="number" value={this.state.available_quantity} onChange={this.onEditChange} name="available_quantity" min={0} onKeyUp={this.onKeyUp}/>
    )
  } 
  /**for UI */
  kindBookCom = () => {
    return (
      <input id="book-textbook" type="checkbox" onChange={this.onEditChange2} name="is_text_book" checked={this.state.is_text_book} onKeyUp={this.onKeyUp}/>
    )
  } 
  /**for UI */
  reviewCom = () => {
    return (
      <textarea id="book-review" className="text" value={this.state.review || ''} rows="15" onChange={this.onEditChange} name="review"/>
    )
  } 
   //for UI
  publisherCom = () => {
    return (
      <input name="publisher" type="text" value={this.state.publisher || ''} onChange={this.onEditChange} style={{width: "98%"}} onKeyUp={this.onKeyUp}/>
    )
  }
  callNumberCom = () => {
    return (
      <input name="call_number" type="text" value={this.state.call_number || ''} onChange={this.onEditChange} style={{width: "98%"}} onKeyUp={this.onKeyUp}/>
    )
  }
  yearOfPublication = () => {
    return (
      <input name="year_of_publication" type="number" value={this.state.year_of_publication || ''} onChange={this.onEditChange} style={{width: "98%"}} onKeyUp={this.onKeyUp}/>
    )
  }
  price = () => {
    return (
      <input name="price" type="number" value={this.state.price || ''} 
      onChange={this.onEditChange}
      style={{width: "98%"}} 
      onKeyUp={this.onKeyUp}
      />
    )
  }

  
  
  /**for UI */
  RighTopIconManagment = () => {
    const {inBookBasket} = this.props
    let theIcon 
    if(!inBookBasket){
      theIcon = this.IconInBookMG()
    } else {
      theIcon = this.IconRemoveBookInBasket()
    }
    return theIcon
  }

  
  /**for UI */
  IconInBookMG = () => {
    const emIconStyle = {
      marginTop : "8px", 
      padding : "3px", 
      float : "left"
    } 
    const onEditModeIcon =(
      <div id="onEditMode" style={{marginTop: "-6px"}}>
        <i className="fa fa-save fa-lg" onClick={this.updateBookRequest} title="save" style={emIconStyle}/>
        <i className="fa fa-close fa-lg" onClick={this.componentDidMount} title="close" style={emIconStyle}/>
      </div>
    )
    return (
        <div id="book-funcs" style={{width: "30px",marginRight: "-30px"}}>
          <div id="normal">
            {this.state.onEditMode ? <div></div> : this.IconForAddBookToBookBasket()}
            {this.state.onEditMode ? <div></div> : <div>              
              <i className="fa fa-edit fa-lg edit" onClick={this.onEdit} title="edit" style={emIconStyle}/>
            </div> }         
            {this.state.onEditMode ? onEditModeIcon : <div></div>}
          </div>          
        </div>
    )
  }
  /**for UI */
  IconForAddBookToBookBasket = () => {
    return (
      <input
        type="checkbox" 
        className="check-box-book"
        onChange={this.onCheckBookInBasket}
        checked={this.state.inBasket}
        />
    )
  }
  /**for UI */
  IconRemoveBookInBasket = () => {
    return (
      <i className="fa fa-trash fa-lg" onClick={this.onRemoveBookInBasket} title="remove" style={{marginTop : "8px", padding : "3px", float : "right"}}/>
    )
  }
  /**for UI */
  EditModeCOM = () => {
    
    return (
      <div>
        {this.titleCom()}
        <span className="info"><span> Author(s):&nbsp;</span>{this.authorsCom()}</span>
        <span className="info"><span> Location:&nbsp;</span>{this.locationCom()}</span>
        <span className="info">
          <span> Is Text Book:&nbsp;</span>
          {this.kindBookCom()}      
        </span>
        <span className="info"><span> Available Quantity:&nbsp;</span>
          <span id="quantity">{this.quantityCom()}</span>
        </span>
      </div>
    )
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

    const editPrice = (
      <span className="info" style={{display: "block"}}>
        <span>
          - Price (VND): &nbsp;
        </span>
        {
          this.state.onEditMode? this.price() : (
          <span><br />
            {this.props.book.price}
          </span>)
        }
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
                onEditMode={this.state.onEditMode}
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
                {editPrice}
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
        <div className="book" style={this.StyleOfChosenBook()}> 
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

  StyleOfChosenBook = () => {
    if (this.state.inBasket) {
      return {
        backgroundColor: "rgb(255, 207, 104)"
      }
    } else if (this.props.book.available_quantity === 0) {
      return {
        backgroundColor: "rgb(175, 169, 163)"
      }
    }
    
  }
}

