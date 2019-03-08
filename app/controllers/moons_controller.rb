class MoonsController < ApplicationController
  before_action :set_planet
  before_action :set_moon, except: [:index, :create]

  def index
    render json: @planet.moons
  end

  def show
    render json: @moon
  end

  def create
    @moon = @planet.moons.new(moon_params)
    if @moon.save
      render json: @moon
    else
      render_error(@moon)
    end
  end

  def update
    if @moon.update(moon_params)
      render json: @moon
    else
      render_error(@moon)
    end
  end

  def destroy
    @moon.destroy
    render json: { message: "Removed" }, status: :ok
  end

  private
    def set_planet
      @planet = Planet.find(params[:planet_id])
    end

    def set_moon
      @moon = Moon.find(params[:id])
    end

    def moon_params
      params.require(:moon).permit(:name)
    end
end
