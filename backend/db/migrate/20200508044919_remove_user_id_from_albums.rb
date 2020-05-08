class RemoveUserIdFromAlbums < ActiveRecord::Migration[6.0]
  def change
    remove_column :albums, :user_id
  end
end
