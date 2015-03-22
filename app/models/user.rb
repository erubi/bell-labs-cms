class User < ActiveRecord::Base
  validates :email, presence: true

  scope :admin, -> {where(admin: true)}
  scope :not_admin, -> {where(admin: false)}

  # Include devise modules
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable


  def other_admin_users
    User.admin.where.not(id: self.id)
  end

end
