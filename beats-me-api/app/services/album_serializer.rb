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
                }
            },
            except: [:created_at, :updated_at],
        }
        @album.to_json(options)
    end
end