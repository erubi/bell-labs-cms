class Api::MediaItemsController < ApplicationController
  before_action :require_admin

  def destroy
    @media_item = MediaItem.find(params[:id])
    @media_item.destroy

    render json: true
  end

  def show
    @media_item = MediaItem.find(params[:id])
    render "show"
  end

  def index
    @media_items = MediaItem.all
  end

  def update
    @media_item = MediaItem.find(params[:id])

    if @media_item.update(media_item_params)
      render json: true
    else
      render json: @media_item.errors, status: :unprocessable_entity
    end
  end


  private

  def media_item_params
    params.require(:media_item).permit(:id, :bell_labs_people, :scene_association, :top_level_category, :keywords, :additional_metadata, :description)
  end

end
