class Api::MediaModulesController < ApplicationController
  def index
    @media_modules = MediaModule.all
  end

  def create
  end

  def destroy
  end

  private

  def media_module_params
  end
end
