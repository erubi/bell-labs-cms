class Api::MediaModulesController < ApplicationController
  def index
    @media_modules = MediaModule.all
  end

  def create
    @media_module = MediaModule.build(media_module_params)

    if @media_module.save
      render "show"
    else
      render json: @media_module.errors, status: :unprocessable_entity
    end
  end

  def update
    @media_module = MediaModule.find(params[:id])
    if @media_module.update(media_module_params)
      render "show"
    else
      render json: @media_module.errors, status: :unprocessable_entity
    end
  end

  def show
    @media_module = MediaModule.find(params[:id])
    render "show"
  end

  def destroy
    @media_module = MediaModule.find(params[:id])
    @media_module.destroy!
    render json: true
  end

  private

  def media_module_params
    params.require(:media_module).permit(:name, :active_interval, :active_time, :active, :images, :videos)
  end

end
