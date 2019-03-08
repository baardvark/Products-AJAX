class CreateMoons < ActiveRecord::Migration[5.2]
  def change
    create_table :moons do |t|
      t.string :name
      t.belongs_to :planet, foreign_key: true

      t.timestamps
    end
  end
end
