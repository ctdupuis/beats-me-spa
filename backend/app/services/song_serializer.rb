class SongSerializer

    def initialize(object)
        @song = object
    end

    def to_serialized_json
        options = {
            include: {
                album: {
                    only: [:name, :artist_name]
                },
                artist: {only: [:name]}
            },
            except: [:created_at, :updated_at]
        }
        @song.to_json(options)
    end
end