class CurrentWork {
  static setCurrentWork(currentWork){
    sessionStorage.setItem('currentWork', currentWork)
  }

  static getCurrentWork(){
    return sessionStorage.getItem('currentWork')
  }
}
//set the first current work in render of app
export default CurrentWork