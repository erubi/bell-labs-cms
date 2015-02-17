class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery with: :exception

  def require_signed_in
    if !signed_in?
      redirect_to landing_url
    end
  end

  def require_signed_out
    if signed_in?
      redirect_to root_url
    end
  end
end
