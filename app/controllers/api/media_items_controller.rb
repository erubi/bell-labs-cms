class Api::MediaItemsController < ApplicationController
  before_action :require_admin

  def destroy
    @media_item = MediaItem.find(params[:id])
    @media_item.destroy

    render json: true
  end
end
