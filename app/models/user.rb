class User < ActiveRecord::Base
  validates :email, presence: true

  before_validation -> do
    self.uid = self.uid.empty? ? self.email : self.uid
  end

  # Include devise modules
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable,
         :omniauthable

  include DeviseTokenAuth::Concerns::User

end
