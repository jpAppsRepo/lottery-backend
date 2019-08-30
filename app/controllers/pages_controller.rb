class PagesController < ApplicationController
  skip_before_action :verify_authenticity_token
  def home
    
  end

  def get_dataset
    render json: { items: Item.all }
  end

  def post_dataset
    item = Item.new(pages_params)   
    if item.price_info != nil && item.price_info.to_i >= 100000
      lottery_count = item.price_info.to_i/100000
      string_arr = Lottery.pluck(:lottery_number)
      l_number_arr = string_arr.map(&:to_i)
      for lottery in 1..lottery_count
        lottery = Lottery.new do |l|
          l.phone_number = item.phone_number
          random_pick = ([*1..999999] - l_number_arr).sample
          l_number_arr.push(random_pick)              
          formatted_str = random_pick.to_s.rjust(6, "0")
          l.lottery_number = formatted_str
        end
        lottery.save!
      end
    end

    respond_to do |format|   
      if item.save   
        data = { :status => "ok", :message => "Success!", :html => "<b>...</b>" }
        format.json  { render :json => data }
      else   
        format.json { render json: item.errors }   
      end   
    end   
  end

  def put_dataset
    puts params[:id]
    item_id = params[:id]
    item = Item.find_by_id(item_id)
    old_value = item.price_info
    permitted = params.permit(:purchase_date, :location, :phone_number, :surname, :name, :product_name, :price_info, :phone_imei) 
    item_update = item.update_attributes!(permitted)
    updated_value = permitted[:price_info].to_i
    if old_value != updated_value
      difference = updated_value/100000 - old_value/100000 
      if difference > 0
        lottery_count = difference
        string_arr = Lottery.pluck(:lottery_number)
        l_number_arr = string_arr.map(&:to_i)
        for lottery in 1..lottery_count
          lottery = Lottery.new do |l|
            l.phone_number = item.phone_number
            random_pick = ([*1..999999] - l_number_arr).sample
            l_number_arr.push(random_pick)              
            formatted_str = random_pick.to_s.rjust(5, "0")
            l.lottery_number = formatted_str
          end
          lottery.save!
        end
      end
    end
    
    respond_to do |format|
      data = { :status => "ok", :message => "Success!", :html => "<b>...</b>" }
      format.json  { render :json => data } # don't do msg.to_json
    end
    # render json: {}, status: 204
  end
  
  def remove_dataset
    item_id = params[:Id]
    item = Item.destroy(item_id)
    if item.destroyed?
      render json: {}, status: 200
    else 
      render json: {}, status: 400
    end
  end

  private
    # Never trust parameters from the scary internet, only allow the white list through.
    def pages_params
        params.require(:page).permit(:purchase_date, :phone_number, :surname, :name, :product_name, :price_info, :phone_imei)
    end

end
