class User < ActiveRecord::Base
  validates :email, presence: true

  # Include devise modules
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable

end
