class SessionsController < ApplicationController
  skip_before_action :verify_authenticity_token, only: [:create, :logout]

  def create
    @user = User.find_by(email: params["user"]["email"])

    if @user.present? && @user&.authenticate(params["user"]["password"])
      session[:user_id] = @user.id
      render json: { status: :ok, user: @user }
    else
      render json: { errors: ["Invalid username or password"], status: :unauthorized }
    end
  end

  def logged_in
    if @current_user
      render json: @current_user, status: :ok
    else
      render json: { message: "No user logged in" }, status: :unauthorized
    end
  end

  def logout
    session.delete :user_id
    head :no_content
    @current_user = nil
  end
end
