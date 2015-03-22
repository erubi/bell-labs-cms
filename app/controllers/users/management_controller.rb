class Users::ManagementController < ApplicationController
  before_action :require_admin

  def show
  end

  def create
    @user = User.create(user_params)
    render :show
  end

  def destroy
    @user = User.find(params[:u_id])
    @user.destroy
    render :show
  end

  private

  def user_params
    params.permit(:user).require(:email, :admin, :password)
  end

end
