class MediaModulePolicy < ApplicationPolicy
  attr_reader :user, :media_module

  def initialize(user, media_module)
    @user = user
    @media_module = media_module
  end

  def update?
  end

  def create?
  end

  def new?
  end

  def edit?
  end

  def destroy?
  end
end
