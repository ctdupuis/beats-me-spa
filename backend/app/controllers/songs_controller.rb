class SongsController < ApplicationController

    def index
        songs = Song.all
        render json: SongSerializer.new(songs).to_serialized_json
    end

end