class Auth {

  static authenticateToken(auth){
    sessionStorage.setItem('auth', auth)
  }

  static isUserAuthenticated(){
    return sessionStorage.getItem('auth') !== null
  }

  static deauthenticateToken(){
    sessionStorage.removeItem('auth')
    sessionStorage.removeItem('admin')
    sessionStorage.removeItem('name')
    sessionStorage.removeItem('taskOn')
  }

  static getToken(){
    return sessionStorage.getItem('auth')
  }

  //set and get admin
  static setIsAdmin(isAdmin){
    sessionStorage.setItem('admin', isAdmin)
  }
  static isAdmin(){
    return sessionStorage.getItem('admin')
  }
  //get and set name
  static setUserName(name){
    sessionStorage.setItem('name', name)
  }
  static getUserName(){
    return sessionStorage.getItem('name')
  }
  static getUrl(){
    return 'http://localhost:3001'
  }
}

export default Auth