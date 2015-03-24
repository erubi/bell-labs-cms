class BellMailer < ApplicationMailer
  default from: 'bellcms@example.com'

  def welcome_email(user)
    @user = user
    @pw = user.password
    mail(to: @user.email, subject: 'Welcome to Bell Labs CMS')
  end
end
