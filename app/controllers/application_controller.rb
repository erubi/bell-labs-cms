class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  #
  # TODO: add back for certain parts of the website, whitelist third party sources
  # protect_from_forgery with: :exception

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

  def after_sign_in_path_for(resource)
    root_url
  end

  def after_sign_out_path_for(resource_or_scope)
    landing_url
  end
end
