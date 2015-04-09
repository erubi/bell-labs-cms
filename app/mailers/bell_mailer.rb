class BellMailer < ApplicationMailer
  default from: 'anomaly.cms@gmail.com'
  # ActionMailer::Base.server_settings = {
  #     :address        => 'smtp.gmail.com',
  #     :domain         => '<your domain>',
  #     :port           => 587,
  #     :user_name      => '<your gmail>',
  #     :password       => '<your password>',
  #     :authentication => :plain
  # }

  self.delivery_method = :smtp

  self.smtp_settings = {
    address: "smtp.gmail.com",
    port: 25,
    domain: "gmail.com",
    authentication: "plain",
    enable_starttls_auto: true,
    user_name: ENV["GMAIL_USERNAME"],
    password: ENV["GMAIL_PASSWORD"]
  }


  def welcome_email(user)
    @user = user
    @pw = user.password
    mail(to: @user.email, subject: 'Welcome to Bell Labs CMS')
  end
end
