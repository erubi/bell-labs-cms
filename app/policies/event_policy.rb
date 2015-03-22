class EventPolicy < ApplicationPolicy
  attr_reader :user, :event

  def initialize(user, event)
    @user = user
    @event = event
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
