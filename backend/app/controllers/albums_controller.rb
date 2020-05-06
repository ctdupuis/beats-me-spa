class AlbumsController < ApplicationController
    before_action :set_album, except: [:new, :create, :index]

    def new 
        album = Album.new
    end

    def create
        album = Album.create(album_params)
        render json: AlbumSerializer.new(album).to_serialized_json
    end

    def index
        albums = Album.all
        render json: AlbumSerializer.new(albums).to_serialized_json
    end

    def destroy
        album = Album.find(params[:id])
        if album 
            album.songs.destroy
            album.destroy
            render json: {status: 200}
        else
            render json: {status: 404, redirected: true, ok: false}
        end
    end

    private

    def album_params
        params.require(:album).permit(:name, :artist_name, :img_url, :genre_name, songs_attributes: [:title, :runtime])
    end

    def set_album
        album = Album.find(params[:id])
    end
end
