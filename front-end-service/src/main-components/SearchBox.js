import React, { Component } from 'react'
import Book from './objects/Book'
import Student from './objects/Student'

export default class SearchBox extends Component {
  
  state = {
    chosenStudent: {},
    chosenBooks: []
  }

  onRemoveBook = (book) => {
    const clone = this.state.chosenBooks.filter( item => {
      return item.id !== book.id
    })
    this.setState({
      chosenBooks: clone
    })
    //reference: https://love2dev.com/blog/javascript-remove-from-array/
  }

  onChooseStudent = (student) => {
    this.setState({
      chosenStudent : student
    })
  }

  render() {
    const {open, keyword, searchForStudent, list} = this.props.searchBox
    let object = ''
    let popup_body = <div></div>
    if(searchForStudent){
      object = 'Student'
      popup_body = (
        <div id="students">
          { list.map( item => {
                return <Student 
                        key={item.id} 
                        student={item}
                        chosenStudent={this.props.bookBasket.chosenStudent}
                        onChooseStudent={this.props.onChooseStudent}
                        onRemoveStudent={this.props.onRemoveStudent}
                        inSearchBox={true} 
                       />
          })}
        </div>
      )
    } else {
      object = 'Book'
      popup_body = (
        <div id="books">
          { list.map( item => {
                return <Book 
                        key={item.id} 
                        book={item}
                        chosenBooks={this.props.bookBasket.chosenBooks}
                        onChooseBook={this.props.onChooseBook}
                        onRemoveBook={this.props.onRemoveBook}
                        inSearchBox={true}
                        user={this.props.user}
                      />
          })}           
        </div>
      )
    }

    

    const DraftRender_1 = (
      <div id="searchBox" className="popup popup-searchbox">
        <div className="popup-content popup-searchbox-content">
          <div className="popup-header">
            <div className="main">
              <div className="search-image">
              </div>
              <span> {object}: <i>{keyword}</i></span>            
            </div>              
            <div id="close-basket" onClick={this.props.onCloseSearchBox}>×</div>
          </div>
          <div className="popup-body">
            {popup_body} 
          </div>
          <div className="five-more-results"></div>
          <hr className="hr-else" />
          <div className="popup-footer">
            <button className="button_1" onClick={this.props.onCloseSearchBox}>Close</button>
          </div>
        </div>
      </div>
    )
    
    const MainRender_1 = open === true? DraftRender_1: <div></div>

    return (
      <div>
        {MainRender_1}
      </div>
    )
  }
}
