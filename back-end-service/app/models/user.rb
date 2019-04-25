class User < ApplicationRecord
  validates :email, presence: true, format: { with: URI::MailTo::EMAIL_REGEXP}, uniqueness: { case_sensitive: false }
  has_secure_password #password is stored in as token, as password_digest
  has_secure_token :auth_token #generate a random token for a given column, "auth_token", if the object.regenerate_auth_token is called, or when create user

  def self.validate_login(email, password)
    user = find_by(email: email) #no need User.find_by
    #this is a method to check user of bcript gem, if true, return the user
    if user && user.authenticate(password)
      user
    end
  end

  def invalidate_token
    #self as static
    self.update_columns(auth_token: nil)
  end

end
