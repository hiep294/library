import React, { Component } from 'react'
//css  
import './css/header.css'
import './css/main.css'
import './css/sidebar.css'
import './css/bookbasket.css'
import './css/footer.css'
import './css/font-awesome.css'
import './css/objects.css'
import './css/searchbox.css'
import './css/ticketdetail.css'
import './global.css'

//layout
import Header from './layout/header'
import Main from './layout/main'
import Footer from './layout/footer'
import MainCol from './main-components/main-col'
import SideBar from './main-components/side-bar'
//main side-bar
import LoginForm from './main-components/side-bars/LoginForm'
import Librarian from './main-components/side-bars/Librarian'


//main-col for Students
// import MyTickets from './main-components/main-cols/Std.MyTickets' 
//main-col for Librariens
import Dashboard from './main-components/main-cols/Dashboard'
import TicketManagement from './main-components/main-cols/TicketManagement'
import BookManagement from './main-components/main-cols/BookManagement'
import StudentManagement from './main-components/main-cols/StudentManagement'
import BookBasket from './main-components/main-cols/BookBasket'
import Report from './main-components/main-cols/Report/Report'

import Auth from './modules/Auth'

//connect to api
import axios from 'axios'
// import * as Cookies from 'es-cookie'


export default class App extends Component {
  

  state = {
    auth: Auth.isUserAuthenticated(),
    taskOn: false,
    tasks: {
      //for user role 3: Librarian
      onDashboard: false,
      onReport: false,
      onBooks: false,
      onStudents: false,
      onBookBasket: false,
      
      //for user role 2: Student
      onMyTickets: false,    
      //for everyone: in policy
      onHome: false
    },
    searchBox: {
      open: false,
      keyword: '',
      searchForStudent: false,
      list: []
    },
    bookBasket: {
      chosenStudent: {},
      chosenBooks: []
    }//for book bastket
  }

  //for
  setTaskOnOff = async () => {
    await this.setState({
      taskOn: !this.state.taskOn
    })
    sessionStorage.setItem('taskOn', this.state.taskOn)
  }
  componentDidMount = () => {
    const s = sessionStorage.getItem('taskOn') === "true"
    if(s !== null){
      this.setState({
        taskOn: s
      })
    }
  }


  render() {
    //setting current work
    return (
      <div>
        <div id="top"></div>
        <Header 
          user={this.state.user}
          searchForStudent={this.state.searchBox.searchForStudent}
          onSelectSearchChange={this.onSelectSearchChange}
          onOpenSearchBox={this.onOpenSearchBox}
          onHome={(e) => {
            const newTask = {
              onHome : true
            }
            this.setState({
              tasks : newTask
            })
          }}
        />
        <Main>

          <MainCol auth={this.state.auth} tasks={this.state.tasks}> 
            <Dashboard 
              chosenStudent={this.state.bookBasket.chosenStudent}
              onChooseStudent={this.onChooseStudent}
              onRemoveStudent={this.onRemoveStudent}
              />
            <TicketManagement />
            <BookManagement 
              bookBasket={this.state.bookBasket}
              onRemoveBookInBasket={this.onRemoveBookInBasket}
              onChooseBookInBasket={this.onChooseBookInBasket}
              url={this.state.url}/>
            <StudentManagement 
              chosenStudent={this.state.bookBasket.chosenStudent}
              onChooseStudent={this.onChooseStudent}
              onRemoveStudent={this.onRemoveStudent}
              />
            <BookBasket 
              bookBasket={this.state.bookBasket}
              onRemoveStudent={this.onRemoveStudent}
              onRemoveBookInBasket={this.onRemoveBookInBasket}
              onClearBasket={this.onClearBasket}
            />
            <Report
              
            />
          </MainCol>



          <SideBar auth={this.state.auth} taskOn={this.state.taskOn} setTaskOnOff={this.setTaskOnOff}>
            <LoginForm onLoginSubmit={this.onLoginSubmit}/>

            <Librarian 
              auth={this.state.auth}
              onDashboard={this.onDashboard}
              onBookBasket={this.onBookBasket}
              onTickets={this.onTickets}
              onBooks={this.onBooks}
              onStudents={this.onStudents}
              onLogout={this.onLogout}
              bookBasket={this.state.bookBasket}
              onReport={this.onReport}
            >              
            </Librarian>

            
          </SideBar>  



        </ Main>

        <Footer />
      </div>
    )
  }

  //FOR BOOK BASKET
  onRemoveBookInBasket = (book) => {
    //removing
    const newBooks = this.state.bookBasket.chosenBooks.filter( item => {
      return item.id !== book.id
    })
    //set book basket
    const newBookBasket ={
      chosenStudent : this.state.bookBasket.chosenStudent,
      chosenBooks : newBooks
    }
    this.setState({
      bookBasket: newBookBasket
    })
    //reference: https://love2dev.com/blog/javascript-remove-from-array/
  }

  onClearBasket = () => {
    
      const newBookBasket = {
        chosenStudent : this.state.bookBasket.chosenStudent,
        chosenBooks : []
      }
      this.setState({
        bookBasket : newBookBasket
      })
  }

  onChooseBookInBasket = (book) => {
    let newBooks = this.state.bookBasket.chosenBooks
    //addind 
    newBooks.push(book)
    const newBookBasket ={
      chosenStudent : this.state.bookBasket.chosenStudent,
      chosenBooks : newBooks
    }
    this.setState({
      bookBasket: newBookBasket
    })
  }

  onRemoveStudent = () => {
    
    //set book basket
    const newBookBasket ={
      chosenStudent : {},
      chosenBooks : this.state.bookBasket.chosenBooks
    }
    
    this.setState({
      bookBasket : newBookBasket
    })
    
  }

  onChooseStudent = (student) => {
    const newBookBasket ={
      chosenStudent : student,
      chosenBooks : this.state.bookBasket.chosenBooks
    }
    this.setState({
      bookBasket : newBookBasket
    })
  }

  

  //LOGIN
  onLoginSubmit = async (info) => {    
    await axios.post(Auth.getUrl() + "/login",{
      email: info.email,
      password: info.password
    }).then( res => {
      Auth.authenticateToken(res.data.token)
      //set name, is admin
      Auth.setIsAdmin(res.data.admin)
      Auth.setUserName(res.data.name)
      this.setState({
        auth: Auth.isUserAuthenticated(),
        
      })
    }).catch( err => {
      console.log(err)
      alert(err)
    })    
  }

  onLogout = async () => {
    const check = window.confirm('Do you want to log out?');
    if(check){
      await axios({
        method: 'delete',
        url: Auth.getUrl() + '/logout',
        headers: {
          token: Auth.getToken(),
          'Authorization': `Token ${Auth.getToken()}`
        }
      }).then()
        .catch( err => console.log(err))
      Auth.deauthenticateToken()
      this.setState({
        auth: Auth.isUserAuthenticated(),
        taskOn: false,
        bookBasket: {
          chosenStudent: {},
          chosenBooks: []
        },
        tasks: {}
      })

    }
  }


  //ROLE 3: librarian
  onDashboard = () => {    
    this.setState({
      tasks: {
        onDashboard: true
      }
    })
  }

  onBookBasket = () => {
    this.setState({
      tasks: {
        onBookBasket: true
      }
    })
  }

  onTickets = () => {
    this.setState({
      tasks: {
        onTickets: true
      }
    })
    return true
  }

  onBooks = () => {
    this.setState({
      tasks: {
        onBooks: true
      }
    })
  }

  onStudents = () => {
    this.setState({
      tasks : {
        onStudents: true
      }
    })
  }

  onReport = () => {
    this.setState({
      tasks: {
        onReport: true
      }
    })
  }


  

  
}
