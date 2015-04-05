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

end
