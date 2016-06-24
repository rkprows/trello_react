class ItemsController < ApplicationController
  before_action :list
  
  def index
  	render json: list.items
  end

  def create
  	item = list.items.new(item_params)
  	if item.save
  		render json: item
  	else
  		render json: {errors: item.errors.full_messages}
  	end
  end

  def destroy
  	if Item.find(params[:id]).destroy
  		render json: { id: params[:id].to_i }
  	else
  		render json: {errors: item.errors.full_messages}
  	end
  end

  private
  	def list
  		List.find(params[:list_id])
  	end
  	
  	def item_params
  		params.require(:item).permit(:name)
  	end
end
