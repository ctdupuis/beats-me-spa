class AlbumsController < ApplicationController
    before_action :set_album, except: [:new, :create, :index]

    def new 

    end

    def create

    end

    def index
        albums = Album.all
    end

    private

    def album_params
        params.require(:album).permit(:name, :artist_name, :img_url, :genre_id, songs_attributes: [:title, :runtime, :artist_name])
    end

    def set_album
        album = Album.find(params[:id])
    end
end
