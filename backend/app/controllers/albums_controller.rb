class AlbumsController < ApplicationController
    before_action :set_album, except: [:new, :create, :index]

    def new 
        album = Album.new
    end

    def create
        album = Album.create(album_params)
    end

    def index
        albums = Album.all
        render json: AlbumSerializer.new(albums).to_serialized_json
    end

    private

    def album_params
        params.require(:album).permit(:name, :artist_name, :img_url, :genre_id, songs_attributes: [:title, :runtime, :artist_name])
    end

    def set_album
        album = Album.find(params[:id])
    end
end
