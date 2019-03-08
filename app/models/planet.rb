class Planet < ApplicationRecord
    has_many :moons, dependent: :destroy

    validates_presence_of :name
    
end
