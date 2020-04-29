class Album < ApplicationRecord
    has_many :songs
    belongs_to :artist
    belongs_to :genre

    def artist_name 
        self.artist ? self.artist.name : nil
    end

    def artist_name=(name)
        self.artist = Artist.find_or_create_by(name: name)
    end

    def songs_attributes=(attributes_hash)
        binding.pry
        attributes_hash.each do |k, value|
            binding.pry
            song = Song.new(value)
            song.artist_id = self.artist_id
            song.save
            self.songs << song 
        end
    end


end
