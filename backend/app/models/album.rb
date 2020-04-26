class Album < ApplicationRecord
    has_many :songs
    belongs_to :artist
    belongs_to :genre

end