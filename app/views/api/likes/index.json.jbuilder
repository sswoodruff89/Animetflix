@likes.each do |like|
  json.set! like.program_id do
    json.extract! like, :program_id, :id, :created_at
  end
end