class User < ActiveRecord::Base
  validates :email, presence: true

  before_validation -> do
    self.uid = SecureRandom.uuid
  end

  # Include devise modules
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable,
         :omniauthable

  include DeviseTokenAuth::Concerns::User
end
