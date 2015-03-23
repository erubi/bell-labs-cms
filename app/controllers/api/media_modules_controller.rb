class Api::MediaModulesController < ApplicationController
  before_action :require_admin, except: [:show, :index]

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
    # TODO: save metadata here
    @media_module = MediaModule.find_by(name: params[:module_name])
    @media_item = @media_module.media_items.create()

    if params[:file_type] == 'image'
      @media_item.image = params[:files][0]
    elsif params[:file_type] == 'video'
      @media_item.video = params[:files][0]
    end

    @media_item.update_attributes(metadata_params)

    if @media_item.save
      if @media_module.name == 'Video Player' && params[:file_type] == 'video'
        update_video_player_duration
      end
      render json: true
    else
      render json: @media_module.errors, status: :unprocessable_entity
    end
  end

  private

  def update_video_player_duration
    # check and restart video duration if 0
    # new_video_duration = (MediaModule.find_by(name: "Video Player").videos.last.video_duration / 60)
    # current_duration = ENV['VIDEO_PLAYER_DURATION'].to_i
    # updated_duration = current_duration + new_video_duration
    #
    # ENV['VIDEO_PLAYER_DURATION'] = updated_duration.to_s
    new_duration = MedualModule.find_by(name: 'Video Player').movie_duration
    ENV['VIDEO_PLAYER_DURATION'] = new_duration.to_s
  end

  def media_module_params
    params.require(:media_module).permit(:name, :weight, :images, :videos, :scene_type, :active)
  end

  def metadata_params
    params.permit(:bell_labs_people, :top_level_category, :keywords, :additional_metadata)
  end

end
