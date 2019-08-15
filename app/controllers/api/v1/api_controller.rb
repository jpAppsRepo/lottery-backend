class Api::V1::ApiController < ApplicationController
    skip_before_action :verify_authenticity_token
    skip_before_action :authenticate_user!
    # GET /lotteries/99001122
    # GET /lotteries/99001122.json 
    def lotteries_by_phone_number
        @lotteries = Lottery.where(:phone_number => params[:phone_number])
        render json: @lotteries
    end

    private
    def api_params
        params.permit(:phone_number)
    end
end
