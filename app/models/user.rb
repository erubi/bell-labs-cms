class User < ActiveRecord::Base
  # Include devise modules
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable,
         :omniauthable

  # including this concern causes uid to be required and raises error immediately
  # this concern does have potentially useful methods though
  # include DeviseTokenAuth::Concerns::User

  validates :email, presence: true

  # before_save -> do
  #   self.uid = SecureRandom.uuid
  #   skip_confirmation!
  # end
end
