@dislikes.each do |dislike|
  json.set! dislike.program_id do
    json.extract! dislike, :program_id, :id, :created_at
  end
end