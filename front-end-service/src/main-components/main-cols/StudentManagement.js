import React, { Component } from 'react'
import Student from '../objects/Student'
import SearchBox from './SearchBox'
import Auth from './../../modules/Auth'
import Pagination from '../Pagination'
import axios from 'axios'
// import axios from 'axios'
import {Spring} from 'react-spring/renderprops'

export default class StudentManagement extends Component {

  //set title for only in dashboard
  state = {
    students : [],
    current_page: 1,
    keyword: '',
    studentsPerPage: 0,
    onAddStudentComponent : false,
    name : '',
    email : '',
    avatarPreview : '',
    selectedAvatar : null,
    reloadBorrowingBooksOfEachStudent: false,
    title: 'Students who has not been returning books on time'
  }
  // Students who has been borrowing books
  // Students who has not been returning books on time
  
  printAlertMessage = (errs) => {
    let message = ""
    for (let x in errs) {
      //get name of x, push to message
      message += x + ": " + errs[x].join(", ") + '\n'
    }
    alert(message)
  }
  // DO REQUEST TO SERVER
  readStudentsRequest = async (newPageNumber) => {
    // each time of loading, remove current books, not use await here
    if(this.state.students.length){
      this.setState({
        students: []
      })
    }
    //set url and params based on user is in dashboard or not
    let url = Auth.getUrl() + '/students'
    let params = {}
    if(this.props.inDashboard){
      url = Auth.getUrl() + '/dashboard'
      if (this.state.title ==="Students who has not been returning books on time"){
        params = {
          keyword: this.state.keyword,
          page: newPageNumber,
          studentsPerPage: this.state.studentsPerPage,
          getStudentsLate: true,
          present: new Date()
        }
      } else if (this.state.title === "Students who has been borrowing books"){
        params = {
          keyword: this.state.keyword,
          page:newPageNumber,
          studentsPerPage: this.state.studentsPerPage,
          getStudentsBorrowing: true
        }
      }
    } else {
      url = Auth.getUrl() + '/students'
      params = {
        keyword: this.state.keyword,
        page: newPageNumber,
        studentsPerPage: this.state.studentsPerPage
      }
    }

    // send request
    await axios({
      url: url,
      method: 'get',
      params,
      headers: {
        token: Auth.getToken(),
        'Authorization': `Token ${Auth.getToken()}`
      }
    }).then( res => {
      this.setState({
        students: res.data.data.students,
        current_page: newPageNumber,
        total: res.data.data.total
      })
    }).catch( errs => console.log(errs) )
  }

  // send a request to remove
  removeStudentRequest = (id) => {
    if(this.props.chosenStudent.id === id){
      alert("Pls remove this student in basket!")
    } else {
      const check = window.confirm("Are you sure to remove?")
      if(check){
        this.removeStudentRequestDetail(id)
      }
    }
  }
  removeStudentRequestDetail = (id) => {
    axios({
      url: Auth.getUrl() + '/students/' + id,
      method: 'delete',
      headers: {
        token: Auth.getToken(),
        'Authorization': `Token ${Auth.getToken()}`
      }
    }).then( res => {
      if (res.data.status === 'SUCCESS') {
        // alert(res.data.message)
        //delete in state
        const newList = this.state.students.filter( st => {
          return st.id !== id
        })
        this.setState({
          students: newList
        })
      } else {
        //alert message
        this.printAlertMessage(res.data.data)
      }
    }).catch( errs => console.log(errs) )
  }

  // send a request to create student
  createStudentRequest = (e) => {
    e.preventDefault()
    let formData = new FormData()
    formData.append("student[email]", this.state.email)
    formData.append("student[name]", this.state.name)
    formData.append("student[avatar]", this.state.selectedAvatar)
    axios({
      url: Auth.getUrl() + '/students',
      method: 'post',
      data: formData,
      headers: {
        token: Auth.getToken(),
        'Authorization': `Token ${Auth.getToken()}`
      }
    }).then( res => {
      this.handleCreateStudentResponse(res.data)
    }).catch( errs => {
        console.log(errs)
      })
  }
  handleCreateStudentResponse = (res) => {
    if(res.status === "ERROR"){
      this.printAlertMessage(res.data)
    } else {
      alert("Created Student ID: " + res.data.id)
      this.setState({
        name : '',
        email : '',
        avatarPreview : '',
        selectedAvatar : null
      })
    }
  }

  updateStudentRequest = async (student) => {
    let returnPromise
    const {email, name, newUpdatedAvatar, id} = student
    let formData = new FormData()
    formData.append("student[email]", email)
    formData.append("student[name]", name)
    if (newUpdatedAvatar !== null) formData.append("student[avatar]", newUpdatedAvatar)
    await axios({
      url: Auth.getUrl() + '/students/' + id,
      method: 'patch',
      data: formData,
      headers: {
        token: Auth.getToken(),
        'Authorization': `Token ${Auth.getToken()}`
      }
    }).then( res => {
      if(res.data.status === 'SUCCESS') {
        this.updateStudentInClient(res.data.data)
        returnPromise = "updated"
      } else {
        this.printAlertMessage(res.data.data)
      }
    }).catch( errs => {
      console.log(errs)
    })
    return returnPromise
  }
  updateStudentInClient = (student) => {
    if(student.avatar !== null){
      const urlParts = student.avatar.url.split("/")
      student.avatar = urlParts[urlParts.length -1]
    }

    let clone = [...this.state.students]
    clone = clone.map( item => {
      if(item.id === student.id){
        item = student
      }
      return item
    })
    this.setState({
      students: clone
    })
  }

  
  


  AvatarDemoStyle = () => {
    return ({
      width : "200px",
      height : "200px",
      borderRadius : "100%",
      backgroundColor : "rgb(153, 147, 147)",
      backgroundImage : "url("+this.state.avatarPreview+")",
      backgroundSize : "cover",
      margin : "auto"
    })
  }
  //FOR DESIGN
  onAddStudentComponent = (e) => {
    e.preventDefault()
    //if form is open and now user would like to close
    if (this.state.onAddStudentComponent) {
      this.setState({
        onAddStudentComponent : !this.state.onAddStudentComponent,
        students : [],
        current_page: 1,
        keyword: '',
        studentsPerPage: 0,
        name : '',
        email : '',
        avatarPreview : '',
        selectedAvatar : ''
      })
    } else {
      this.setState({
        onAddStudentComponent : !this.state.onAddStudentComponent
      })
    }
  }
  // print a form to get info of new book
  AddStudentComponent = () => {
    return (
      <Spring
        from={{ opacity: 0 }}
        to={{ opacity: 1 }}
      >
      {props => (
        <div id="add-book" className="book" style={props}> 
          <form onSubmit={this.createStudentRequest}>
            <div className="book-info">
              <div className="book-info-main">
                <center><h2 id="title" className="title">Add Student</h2></center>
                <span>Name:</span>
                <span className="info"><input id="book-title" className="text" type="text" value={this.state.name} onChange={this.onEditChange} name="name"/></span>
                <span> Email:&nbsp;</span>
                <span className="info"><input id="book-authors" className="text" type="text" value={this.state.email} onChange={this.onEditChange} name="email"/></span>  

              </div>  
            </div>

            <div className="book-info-detail" style={{flexDirection : "column"}}>          
                <br/>
                <div>Choose a avatar <input type="file" multiple={false} name="avatarDemo" onChange={this.onChooseAvatarDemo} accept="image/*"/>
                </div>
                <div style={this.AvatarDemoStyle()}></div><br />
                
            </div>

            <div style={{display: "flex", marginTop: "5px"}}>
              <button style={{width: "50%", cursor: "pointer"}} onClick={this.createStudentRequest}><i className="fa fa-save fa-lg"/> Create</button>
              <button style={{width: "50%", cursor:"pointer"}} onClick={this.onAddStudentComponent}><i className="fa fa-times-circle-o fa-lg"/> Close</button>
            </div>
            <hr />
          </form>
        </div>
      )}
      
      </Spring>
    )
  }
  //get value to state
  onEditChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }
  //get avatar
  onChooseAvatarDemo = async (e) => {
    try{
      await this.setState({
        selectedAvatar : e.target.files[0]
      })
    
      const reader = new FileReader()
      reader.onload = () => {
        this.setState({
            avatarPreview : reader.result
          })
        }
      reader.readAsDataURL(this.state.selectedAvatar)      
    } catch {
      //the same error as book management
    }
  }

  
  // PAGINATION eHANDLE
  /**
   * this method is called after rendering this class, 
   * because class Pagination has method 'componentDidMount' which will call this method
   */
  onUpdateObjectsPerPage = async (studentsPerPage) => {
    await this.setState({
      studentsPerPage
    })
    this.readStudentsRequest(1)
  }

   //PAGINATION: is called from class Pagination
  /**
   * get page number from Pagination, and request to server
   */
  onChangePage = async (newPageNumber) => {
    //load data first
    await this.readStudentsRequest(newPageNumber)
    //set state second
    await this.setState({
      reloadBorrowingBooksOfEachStudent: !this.state.reloadBorrowingBooksOfEachStudent
    })
  }

  BodyOfStudentManagement = () => {
    return (
      <div>
        <Pagination 
          currentPage={this.state.current_page}
          numberOfObjects={this.state.students.length}
          onChangePage={this.onChangePage}
          onUpdateObjectsPerPage={this.onUpdateObjectsPerPage}/>
        
        <div id="students">
          {
            this.state.students.map( student => {
              return (
                <Student 
                  key={student.id}
                  student={student}
                  inStudentManagement={true}
                  updateStudentRequest={this.updateStudentRequest}
                  removeStudentRequest={this.removeStudentRequest}

                  chosenStudent={this.props.chosenStudent}
                  onChooseStudent={this.props.onChooseStudent}
                  onRemoveStudent={this.props.onRemoveStudent}

                  reload={this.state.reloadBorrowingBooksOfEachStudent}
                />
              )
            })
          }
        </div>
        {this.state.students.length? <center><a href="#top" style={{color: "#000"}}><i className="fa fa-angle-double-up fa-2x"/></a></center> : <div />}
      </div>
    )
  }

  

  handleTitleChange = async (e) => {
    await this.setState({
      title: e.target.value
    })
    this.onChangePage(1)
  }
  Title = () => {
    if(this.props.inDashboard){
      return (
        <div>
          <select value={this.state.title} onChange={this.handleTitleChange}  style={{fontSize: "15px", outline: "none", width: "100%"}}>
            <option value="Students who has not been returning books on time">Students who has not been returning books on time</option>
            <option value="Students who has been borrowing books">Students who has been borrowing books</option>
          </select>
        </div>
      )
    } else {
      return (
        <div id="main-title"><span title="student management">Student&nbsp;</span>
          {Auth.isUserAuthenticated()? <i className="fa fa-plus-square-o fa-lg" onClick={this.onAddStudentComponent} title="new* student"/> : <div></div>}          
        </div>
      )
    }
  }
  
  onSearch = async (e) => {
    //set keyword
    e.preventDefault()
    await this.readStudentsRequest(1)
  }
  handleChangeKeyword = (e) => {
    this.setState({
      keyword: e.target.value
    })
  }
  render() {
    return (
      <div>
        <h1 className="page-title">
          {this.Title()}
          { this.state.onAddStudentComponent? <div></div> : (
            <SearchBox 
            onSearch={this.onSearch} 
            keyword={this.state.keyword}
            handleChangeKeyword={this.handleChangeKeyword}
            searchFor={"search student by email, name, ..."}
            total={this.state.total}/>
          )}
        </h1>
        {this.state.onAddStudentComponent? this.AddStudentComponent() : this.BodyOfStudentManagement()}
      </div>
    )
  }
}
