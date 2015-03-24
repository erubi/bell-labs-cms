class User < ActiveRecord::Base
  validates :email, presence: true

  before_validation :generate_tmp_pw, on: :create
  after_create :send_welcome_email

  scope :admin, -> {where(admin: true)}
  scope :not_admin, -> {where(admin: false)}

  # Include devise modules
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable


  def other_admin_users
    User.admin.where.not(id: self.id)
  end

  private

  # Give the new client user a temporary password that is included in their welcome email.
  def generate_tmp_pw
    self.password = Devise.friendly_token.first(8) if self.password.blank?
  end

  def send_welcome_email
    BellMailer.welcome_email(self).deliver
  end

end
