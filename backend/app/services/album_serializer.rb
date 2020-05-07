class AlbumSerializer

    def initialize(object)
        @album = object 
    end

    def to_serialized_json
        options = {
            include: {
                artist: {
                    only: [:name]
                },
                genre: {
                    only: [:name]
                },
                songs: {
                    only: [:title, :runtime]
                },
                user: {
                    only: [:username]
                }
            },
            except: [:created_at, :updated_at],
        }
        @album.to_json(options)
    end
end