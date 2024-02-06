class ChangeDownloadSpeedColumnType < ActiveRecord::Migration[7.0]
  def up
    change_column :internet_speeds, :download_speed, :numeric, precision: 15, scale: 2, using: 'download_speed::numeric'
  end

  def down
    change_column :internet_speeds, :download_speed, :string
  end
end
