class CreateItems < ActiveRecord::Migration
  def change
    create_table :items do |t|
      t.string :name, null: false
      t.belongs_to :list, index: true, foreign_key: true

      t.timestamps null: false
    end
  end
end
