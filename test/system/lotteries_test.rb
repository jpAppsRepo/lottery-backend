require "application_system_test_case"

class LotteriesTest < ApplicationSystemTestCase
  setup do
    @lottery = lotteries(:one)
  end

  test "visiting the index" do
    visit lotteries_url
    assert_selector "h1", text: "Lotteries"
  end

  test "creating a Lottery" do
    visit lotteries_url
    click_on "New Lottery"

    fill_in "Lottery Number", with: @lottery.lottery_number
    fill_in "Phone Number", with: @lottery.phone_number
    click_on "Create Lottery"

    assert_text "Lottery was successfully created"
    click_on "Back"
  end

  test "updating a Lottery" do
    visit lotteries_url
    click_on "Edit", match: :first

    fill_in "Lottery Number", with: @lottery.lottery_number
    fill_in "Phone Number", with: @lottery.phone_number
    click_on "Update Lottery"

    assert_text "Lottery was successfully updated"
    click_on "Back"
  end

  test "destroying a Lottery" do
    visit lotteries_url
    page.accept_confirm do
      click_on "Destroy", match: :first
    end

    assert_text "Lottery was successfully destroyed"
  end
end
