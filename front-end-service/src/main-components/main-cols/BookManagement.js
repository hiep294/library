import React, { Component } from 'react'
import axios from 'axios'
import Book from '../objects/Book'
import Pagination from '../Pagination'
import SearchBox from './SearchBox'
import Auth from './../../modules/Auth'
import { Spring } from 'react-spring/renderprops'
import DueDay from './Book.DueDay'

/**
 * for book management: add book, delete book
 */
export default class BookManagement extends Component {

  /**
   * include information of new book: title, authors,...
   * info detemine whether open add book UI or not
   * info about booksPerPage in a page is defined in state of Pagination class
   * at the beginning, current page is 1
   * keyword which is updated from search box class
   * books are objects shown in UI
   */
  state = {
    books : [],
    current_page : 1,
    keyword : '',
    booksPerPage: 0,
    onAddBookComponent : false,
    id : '',
    title : '',
    authors : '',
    tags : '',
    available_quantity : 0,
    is_text_book : true,
    book_image : null,
    review : '',
    imagePreview : '',
    location: '',
    call_number: '',
    publisher: '',
    year_of_publication: new Date().getFullYear(),
    price: 100000,
    settingDueDays: false,
    viewingBooks: true,
    dueDays: [],
    total: 0
  }

  /**
   * setting alert for errors
   */
  printAlertMessage = (errs) => {
    let message = ""
    for (let x in errs) {
      //get name of x, push to message
      message += x + ": " + errs[x].join(", ") + '\n'
    }
    alert(message)
  }

  // componentDidMount = () => {
  //   this.loadingBooks(1)
  // }=> this function used in pagination

  /**
   * load books from API, 
   * newPageNumber is the new page number
   * this method is called first by method 'onUpdateObjectsPerPage'
   * this method based on the props.url, type of management, page, keyword, number of book per page
   */
  readBooksRequest = async (newPageNumber) => {
    // each time of loading, remove current books
    if(this.state.books.length) {
      this.setState({
        books: []
      })
    }
    // send request
    await axios.get(Auth.getUrl() + "/books",{
      params: {
        page: newPageNumber,
        keyword: this.state.keyword,
        booksPerPage: this.state.booksPerPage
      }
    }).then( (res) => {
      //should set current page to newPageNumber
      // const dueDaysOfNewBook = this.getDefaultDueDays("Text Book", res.data.data.dueDays)
      this.setState ({
        current_page: newPageNumber,
        books : res.data.data.books,        
        dueDays: res.data.data.dueDays,
        total: res.data.data.total
      })
      // console.log(this.state.total)
    }).catch( err => {console.log(err)} )
    
  }

  /**
   * this method will remove book, first in server, second is in UI
   */
  removeBookRequest = (book) => {
    const { inBasket } = book
    if(inBasket) {
      alert("Pls Remove This Book In Basket")
    } else {
      const check = window.confirm("Are you sure to remove?")
      if(check) {
        this.removeBookRequestDetail(book)
      }
    }
  }
  removeBookRequestDetail = async (book) => {
    const {id} = book
    const usedUrl = Auth.getUrl() + "/books/"+ id
    const res = await axios.delete(usedUrl, {
      headers: {
        token: Auth.getToken(),
        'Authorization': `Token ${Auth.getToken()}`
      }
    })
    if(res.data.status === 'SUCCESS'){
      alert(res.data.message)
      // step 2: delete in interface
      const newBooks = this.state.books.filter( item => {
        return item.id !== id
      })
      this.setState({
        books : newBooks
      })
    } else {
      this.printAlertMessage(res.data.data)
    }
  }
  /**
   * to send a request of adding book to server
   */
  createBookRequest = async(e) => {
    e.preventDefault()
    const usedUrl = Auth.getUrl() + "/books"
    var formData = new FormData()
    formData.append("book[title]", this.state.title)
    formData.append("book[authors]", this.state.authors)
    formData.append("book[tags]", this.state.tags)
    formData.append("book[available_quantity]", this.state.available_quantity)
    formData.append("book[is_text_book]", this.state.is_text_book)
    formData.append("book[book_image]", this.state.book_image)
    formData.append("book[review]", this.state.review)
    formData.append("book[location]", this.state.location)
    formData.append("book[call_number]", this.state.call_number)
    formData.append("book[publisher]", this.state.publisher)
    formData.append("book[year_of_publication]", this.state.year_of_publication)
    formData.append("book[price]", this.state.price)
    await axios.post(usedUrl,formData, {
      headers: {
        token: Auth.getToken(),
        'Authorization': `Token ${Auth.getToken()}`
      }
    }).then(res => {
      //if create ok, show id and clear
      if(res.data.status === 'SUCCESS'){
        alert("Created Book ID: " + res.data.data.id)
        this.setState({
          id : '',
          title : '',
          authors : '',
          tags : '',
          available_quantity : 0,
          is_text_book : true,
          book_image : null,
          review : '',
          imagePreview : '',
          location: '',
          call_number: '',
          publisher: '',
          year_of_publication: new Date().getFullYear(),
          price: 100000
        })
      } else {
        //show message: data as errors
        this.printAlertMessage(res.data.data)
      }
    }).catch( errs => console.log(errs))

    
  }

  // EDIT MODE: when librarian at book management
  /**
   * request to update book 
   */
  updateBookRequest = async (book) => {
    let returnPromise
    //get info
    const { id, title, authors, tags, available_quantity, is_text_book, newBookImage, review, location, call_number, publisher, year_of_publication, price } = book

    let formDT = new FormData()
    formDT.append("book[id]", id)
    formDT.append("book[title]", title)
    formDT.append("book[authors]", authors)
    formDT.append("book[tags]", tags)
    formDT.append("book[available_quantity", available_quantity)
    formDT.append("book[is_text_book]", is_text_book)
    if(newBookImage !== null){
      formDT.append("book[book_image]", newBookImage)
    }
    formDT.append("book[review]", review)
    formDT.append("book[location]", location)
    formDT.append("book[call_number]", call_number)
    formDT.append("book[publisher]", publisher)
    formDT.append("book[year_of_publication]", year_of_publication)
    formDT.append("book[price]", price) 
    //get url
    const usedUrl = Auth.getUrl() + "/books/"+id
    //send request
    await axios.patch(usedUrl,formDT, {
      headers: {
        token: Auth.getToken(),
        'Authorization': `Token ${Auth.getToken()}`
      }
    }).then( res => {
      if(res.data.status === 'SUCCESS'){
        this.updateBookInClient(res.data.data)
        returnPromise = "updated"
      }else{
        // res.data.data { title: [] }
        this.printAlertMessage(res.data.data)
      } 
    }).catch(errs => console.log(errs))
    //get response
    return returnPromise
  }
  /**
   * if update book, it will return url. If not, it will return null even it exists in database
   */
  updateBookInClient = (edittedBook) => {
    //config editted book image
    //change to name only, because url is in full url
    if(edittedBook.book_image.url !== null){
      const urlParts = edittedBook.book_image.url.split("/")
      edittedBook.book_image = urlParts[urlParts.length - 1]
    }

    let clone = [...this.state.books]
    clone = clone.map( item => {
      if(item.id === edittedBook.id){
        //set item equal to edittedbook
        item = edittedBook
      }
      return item
    })
    this.setState({
      books: clone
    })
  }

  



  

  

  /**
   * to define Add Book UI
   */
  AddBookComponent = () => {
    return (
      <Spring
        from={{ opacity: 0 }}
        to={{ opacity: 1 }}
      >
      {props => (
        <div id="add-book" className="book" style={props}> 
        <form onSubmit={this.createBookRequest}>
          <div className="book-info">
            <div className="book-info-main">
              <center><h2 id="title" className="title">Add Book</h2></center>
              <span className="info"><span> Title:&nbsp;</span><input id="book-title" className="text" type="text" value={this.state.title || ''} onChange={this.onEditChange} name="title"/></span>

              <span className="info"><span> Author(s):&nbsp;</span><input id="book-authors" className="text" type="text" value={this.state.authors|| ''} onChange={this.onEditChange} name="authors"/></span>
              

              <span className="info"><span> Location:&nbsp;</span><input id="book-tags" className="text" type="text" value={this.state.location || ''} onChange={this.onEditChange} name="location"/></span>

              <span className="info">
                <span> Is Text Book:&nbsp;</span>
                <input id="book-textbook" type="checkbox" onChange={this.onEditChange2} name="is_text_book" checked={this.state.is_text_book}/>
                
                
              </span>

              
              <span className="info"><span> Available Quantity:&nbsp;</span>
                <span id="quantity"><input id="book-quantity" className="text" type="number" value={this.state.available_quantity} onChange={this.onEditChange} name="available_quantity" min={0}/></span>
              </span>
            </div>  
          </div>

          <div className="book-info-detail">
            <div className="book-image-mg">
              <div 
                className="book-image"
                style={{backgroundImage : `url(${this.state.imagePreview})`}} 
              >
              <div>Choose a book image <br/><input type="file" onChange={this.onChooseImageBookDemo} multiple={false}/></div> 
              </div> 
              
            </div>          
            <div id="review">
              <span><textarea id="book-review" className="text" value={this.state.review || ''} rows="15" onChange={this.onEditChange} name="review" placeholder="review"/>
              </span>
              <p>
                <span>
                  <span>Price (VND): &nbsp;</span>
                  <input type="number" 
                    name="price"
                    value={this.state.price}
                    onChange={this.onEditChange}
                    style={{width: "98%"}}/>                  
                </span>
                <span>
                  <span>Year Of Publication: &nbsp;</span>
                  <input type="number" 
                    name="year_of_publication"
                    value={this.state.year_of_publication}
                    onChange={this.onEditChange}
                    style={{width: "98%"}}/>                  
                </span>
                <span>
                  <span>Publisher: &nbsp;</span>
                  <input type="text"
                    name="publisher"
                    value={this.state.publisher}
                    onChange={this.onEditChange}
                    style={{width: "98%"}}/>                  
                </span>
                <span>
                  <span>Call Number: &nbsp;</span>
                  <input type="text"
                    name="call_number"
                    value={this.state.call_number}
                    onChange={this.onEditChange}
                    style={{width: "98%"}}/>                  
                </span>
                <span className="info">
                  <span> Tag(s):&nbsp;</span>
                  <input id="book-tags" className="text" type="text" 
                  value={this.state.tags} 
                  onChange={this.onEditChange} name="tags"
                  style={{width: "98%"}}/>
                </span>
              </p>
              
            </div>
          </div>

          <div style={{display: "flex", marginTop: "5px"}}>
            <button style={{width: "50%", cursor: "pointer"}} onClick={this.createBookRequest}><i className="fa fa-save fa-lg"  /> Create</button>
            <button style={{width: "50%", cursor: "pointer"}} onClick={this.onAddBookComponent}><i className="fa fa-times-circle-o fa-lg" /> Close</button> 
          </div>
          <hr />
        </form>
      </div>
      )}
      </Spring>
    )
  }
  getDefaultDueDays = (typeBook, db) => {
    // console.log(typeBook)
    if (typeof db === "undefined") {
      const t = this.state.dueDays.find( item => {
        return item.type_of_book === typeBook
      })
      return t.due_days
    } else {
      const t = db.find( item => {
        return item.type_of_book === typeBook
      })
      return t.due_days
    }
    
  }
  /**
   * to open or close Add Book UI
   */
  onAddBookComponent = async (e) => {
    e.preventDefault()
    //clear 
    if(this.state.onAddBookComponent){
      await this.setState({
        onAddBookComponent : false,
        books:[],
        current_page : 1,
        id : '',
        title : '',
        authors : '',
        tags : '',
        available_quantity : 0,
        is_text_book : true,
        book_image : null,
        review : '',
        imagePreview : '',
        location: '',
        call_number: '',
        publisher: '',
        year_of_publication: new Date().getFullYear(),
        settingDueDays: false,
        viewingBooks: true
      })//clear page to 1, and reload page
    } else {
      this.setState({
        onAddBookComponent : true,
        viewingBooks: false,
        settingDueDays: false
      })
    }    
  }

  /**
   * to update image file to state, show preview of book
   */
  onChooseImageBookDemo = async (e) => {
    //will preview image and set the image
    try{
      await this.setState({
        book_image : e.target.files[0]
      })
      
      const reader = new FileReader()
      reader.onload = () => {
        this.setState({
            imagePreview : reader.result
          })
        }
      reader.readAsDataURL(this.state.book_image)
      
      
    } catch {
      //the error happen when user choose a file, but push cancel button, nothing handle here
    }
  }

  
  /**
   * to set text value input, corresponding to state
   * is recommended by React
   */
  onEditChange = (e) => {
    this.setState({
      [e.target.name] : e.target.value
    })
  }
  /**
   * to set value for true, false input
   */
  onEditChange2 = (e) => {
    this.setState({
      is_text_book: !this.state.is_text_book
    })
  }
  
  

  //PAGINATION: is called from class Pagination
  /**
   * get page number from Pagination, and request to server
   */
  onChangePage = async (newPageNumber) => {
    //load data first
    await this.readBooksRequest(newPageNumber)
    //set state second
    this.setState({
      current_page: newPageNumber
    })
  }
  
  /**
   * this method is called after rendering this class, 
   * because class Pagination has method 'componentDidMount' which will call this method
   */
  onUpdateObjectsPerPage = async (booksPerPage) => {
    await this.setState({
      booksPerPage
    })
    this.readBooksRequest(1)
  }//each time change of books per page, will load to page 1
  

  

  /**
   * to define main body book management UI
   */
  BodyOfBookManagement = () => {
    return (
      <div>
        <Pagination 
          currentPage={this.state.current_page} 
          numberOfObjects={this.state.books.length}
          onChangePage={this.onChangePage}
          onUpdateObjectsPerPage={this.onUpdateObjectsPerPage}/>
        
        <div id="books">
          {
            this.state.books.map( book => {
              return <Book 
                      key={book.id}
                      book={book} 
                      inBookManagement={true}
                      removeBookRequest={this.removeBookRequest}
                      updateBookRequest={this.updateBookRequest}

                      chosenBooks={this.props.bookBasket.chosenBooks}
                      onChooseBookInBasket={this.props.onChooseBookInBasket}
                      onRemoveBookInBasket={this.props.onRemoveBookInBasket}
                      user={this.props.user}

                      getDefaultDueDays={this.getDefaultDueDays}
                      />
            })
          }
        </div>
        {this.state.books.length? <center><a href="#top" style={{color: "#000"}}><i className="fa fa-angle-double-up fa-2x"></i></a></center> : <div></div>}
        
      </div>
    )
  }

  /**
   * setting keyword of state, then call load method to page 1
   */
  onSearch = (e) => {
    // await this.setState({
    //   keyword
    // })
    e.preventDefault()
    this.readBooksRequest(1)
  }
  handleChangeKeyword = (e) => {
    this.setState({
      keyword: e.target.value
    })
  }


  settingDueDays = () => {
    if(this.state.settingDueDays){
      this.setState({
        settingDueDays: false,
        onAddBookComponent: false,
        viewingBooks: true
      })
    } else {
      this.setState({
        settingDueDays: true,
        onAddBookComponent: false,
        viewingBooks: false
      })
    }
  }

  

  updateDueDay = (id, numberOfdays) => {
    const clone = this.state.dueDays.map( item => {
      if (item.id === id) {
        item.due_days = numberOfdays
      }
      return item
    })
    this.setState({
      dueDays: clone
    })
  }
  DueDaysComponent = () => {
    // console.log(this.state.dueDays)
    return (
      <Spring
        from={{ opacity: 0 }}
        to={{ opacity: 1 }}        
      > 
      {props => (
        <div id="book-types" className="book" style={props}>
          <center><h2>Due days of book types in default</h2></center>
          {
            this.state.dueDays.map( item => {
              return (
                <DueDay
                key={item.id}
                item={item}
                updateDueDay={this.updateDueDay}
                />
              )
            })
          }
          <center style={{margin: "10px"}}>
            <button onClick={this.settingDueDays}><i className="fa fa-close fa-lg" />&nbsp;Close</button>
          </center>
        </div>
      )}      
      </Spring>
    )
  }

  /**
   * manage: adding book, choose book to book basket, show book
   */
  render() {
    const a = this.state.viewingBooks
    const b = this.state.settingDueDays
    const c = this.state.onAddBookComponent
    return (
      
        <div>
          
          <h1 className="page-title">
          <div id="main-title">
            <span title="book management">Books&nbsp;</span>
            {Auth.isUserAuthenticated()? 
              <div style={{display: "inline"}}>
                {this.state.onAddBookComponent? (<span></span>) : (
                  <span>
                    <i className="fa fa-cog" title="config due days" onClick={this.settingDueDays}/>
                    &nbsp;
                  </span>
                )}
                {this.state.settingDueDays? (<span></span>): (
                  <i className="fa fa-plus-square-o fa-lg" onClick={this.onAddBookComponent} title="new* book"/> 
                )}
                
              </div>
              : <div></div>}
          </div>
            { a && !b && !c? (
              <SearchBox 
              onSearch={this.onSearch} 
              keyword={this.state.keyword}
              handleChangeKeyword={this.handleChangeKeyword}
              total={this.state.total}
              searchFor={"search book by title, tags, review, authors, location, ..."}
              />
            ) : (<div></div>)}
          </h1>
          
          { a && !b && !c ? this.BodyOfBookManagement(): <div></div>}
          {!a && b && !c? this.DueDaysComponent() : <span></span>}
          { !a && !b && c? this.AddBookComponent() : <div></div>}
        </div> 
      
    )
  }
}

