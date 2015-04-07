class Users::ManagementController < ApplicationController
  before_action :require_admin_or_sign_out

  def show
    @new_admin = User.new(admin: true)
    @new_user = User.new()
  end

  def create
    @user = User.create(user_params)
    redirect_to action: :show
  end

  def destroy
    @user = User.find(params[:u_id])
    @user.destroy
    redirect_to action: :show
  end

  private

  def user_params
    params.require(:user).permit(:email, :admin)
  end

end
