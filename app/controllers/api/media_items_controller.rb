class Api::MediaModulesController < ApplicationController
  before_action :require_admin

  def delete
    @media_item = MediaItem.find(params[:id])
    @media_item.destroy

    render json: true
  end
end
