class Album < ApplicationRecord
    has_many :songs
    belongs_to :artist
    belongs_to :genre
    # belongs_to :user

    def artist_name 
        self.artist ? self.artist.name : nil
    end

    def artist_name=(name)
        self.artist = Artist.find_or_create_by(name: name)
    end

    def genre_name=(name)
        self.genre = Genre.find_or_create_by(name: name)
    end

    def genre_name
        self.genre.name
    end

    def songs_attributes=(attributes_hash)
        attributes_hash.each do |k, value|
            song = Song.new(k)
            song.artist_id = self.artist_id
            song.album_id = self.id
            song.save
            self.songs << song unless song.title.blank?
        end
    end


end
