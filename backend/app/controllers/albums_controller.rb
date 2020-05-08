class AlbumsController < ApplicationController

    def new 
        album = Album.new
    end

    def create
        album = Album.new(album_params)
        # album.user_id = current_user(request.headers[:bearer]).id
        if album.save
            render json: AlbumSerializer.new(album).to_serialized_json
        else
            render json: { errors: album.errors }
        end
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

end
