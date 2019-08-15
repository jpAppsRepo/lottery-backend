require 'test_helper'

class LotteriesControllerTest < ActionDispatch::IntegrationTest
  setup do
    @lottery = lotteries(:one)
  end

  test "should get index" do
    get lotteries_url
    assert_response :success
  end

  test "should get new" do
    get new_lottery_url
    assert_response :success
  end

  test "should create lottery" do
    assert_difference('Lottery.count') do
      post lotteries_url, params: { lottery: { lottery_number: @lottery.lottery_number, phone_number: @lottery.phone_number } }
    end

    assert_redirected_to lottery_url(Lottery.last)
  end

  test "should show lottery" do
    get lottery_url(@lottery)
    assert_response :success
  end

  test "should get edit" do
    get edit_lottery_url(@lottery)
    assert_response :success
  end

  test "should update lottery" do
    patch lottery_url(@lottery), params: { lottery: { lottery_number: @lottery.lottery_number, phone_number: @lottery.phone_number } }
    assert_redirected_to lottery_url(@lottery)
  end

  test "should destroy lottery" do
    assert_difference('Lottery.count', -1) do
      delete lottery_url(@lottery)
    end

    assert_redirected_to lotteries_url
  end
end
