class CreateAlbums < ActiveRecord::Migration[6.0]
  def change
    create_table :albums do |t|
      t.string :name
      t.integer :artist_id
      t.integer :genre_id
      t.string :img_url

      t.timestamps
    end
  end
end
