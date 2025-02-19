class ApplicationController < ActionController::Base
  before_action :log_request_path

  private

  def current_user
    token = cookies.signed[:airbnb_session_token]
    session = Session.find_by(token: token)

    @current_user ||= session.user if session
  end

  def log_request_path
    Rails.logger.info "Processing request to: #{request.path}"
  end

  helper_method :current_user
end