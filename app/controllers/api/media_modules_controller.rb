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

  def scene_weight
    @media_modules = MediaModule.order(:name)
  end

  def scene_override
    @media_modules = MediaModule.order(:name)
  end

  def set_active_scene
    @media_module = MediaModule.find(params[:id])
    @media_module.update(active: true)
    render json: true
  end

  # controller action for uploading media
  def upload_media
    # need to check for file type here
    @media_module = MediaModule.find_by(name: params[:module_name])
    @media_module.images += params[:files]

    if @media_module.save
      render json: true
    else
      render json: @media_module.errors, status: :unprocessable_entity
    end
  end

  private

  def media_module_params
    params.require(:media_module).permit(:name, :weight, :images, :videos, :scene_type, :active)
  end

end
