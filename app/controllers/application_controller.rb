class ApplicationController < ActionController::Base
    before_action :authenticate_user!
    protect_from_forgery unless: -> { request.format.json? }

    private
    def after_sign_out_path_for(resource_or_scope)
        if resource_or_scope == :user
            new_user_session_path
        elsif resource_or_scope == :admin
            new_admin_session_path
        else
            root_path
        end
    end
end
