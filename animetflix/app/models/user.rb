# == Schema Information
#
# Table name: users
#
#  id              :bigint           not null, primary key
#  email           :string           not null
#  password_digest :string           not null
#  session_token   :string           not null
#  created_at      :datetime         not null
#  updated_at      :datetime         not null
#

class User < ApplicationRecord
    validates :email, :password_digest, :session_token, presence: true
    validates :password, length: {minimum: 6}, allow_nil: true
    validate :valid_email

    after_initialize :ensure_token
    attr_reader :password

    def self.find_by_cred(email, pw)
        user = User.find_by(email: email);
        return user if user && user.is_password?(pw)
    end

    def reset_token! 
        self.session_token = SecureRandom.urlsafe_base64(16)
        self.save!
        self.session_token
    end

    def ensure_token
        self.session_token ||= SecureRandom.urlsafe_base64(16)
    end

    def password=(pw)
        @password = pw
        self.password_digest = BCrypt::Password.create(pw)
    end

    def is_password?(pw)
        BCrypt::Password.new(self.password_digest).is_password?(pw)
    end

    def valid_email
        unless (self.email.split.one? {|char| char == "@"} ) && self.email[self.email.index("@")..-1].end_with?(".com")
            errors.add(:email, "must be end with a valid address")
        end

    end

   
end
