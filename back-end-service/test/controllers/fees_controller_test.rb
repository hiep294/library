require 'test_helper'

class FeesControllerTest < ActionDispatch::IntegrationTest
  test "should get update" do
    get fees_update_url
    assert_response :success
  end

end
