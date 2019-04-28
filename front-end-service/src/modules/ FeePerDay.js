export default class FeePerDay{
  static setForReferenceBook(fee){
    sessionStorage.setItem('feePerDayOfReferenceBook', fee)
  }

  static setForTextBook(fee){
    sessionStorage.setItem('feePerDayOfTextBook', fee)
  }

  static getForReferenceBook(){
    return sessionStorage.getItem('feePerDayOfReferenceBook')
  }

  static getForTextBook(){
    return sessionStorage.getItem('feePerDayOfTextBook')
  }
}