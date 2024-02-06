class AddInternetSpeedsTable < ActiveRecord::Migration[7.0]
  def change
    create_table :internet_speeds, id: :uuid do |t|
      t.references :places, null: false, foreign_key: true, index: true, type: :uuid
      t.string :download_speed, null: false, scale: 2, precision: 15
      t.string :download_units, null: false

      t.timestamps
    end
  end
end