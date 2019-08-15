class Archive < ApplicationRecord
    mount_uploader :attachment, DocumentUploader
end
