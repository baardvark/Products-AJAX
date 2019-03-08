namespace :populate do
  desc "Populates Data"
  task planets: :environment do
    20.times do
      planet = Planet.create(name: Faker::Space.planet)
      5.times { Moon.create(name: Faker::Space.moon, planet_id: planet.id) }
    end
  end

end
