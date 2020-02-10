@programs.each do |program|
  json.set! program.id do
    json.partial! "program", program: program, details: false
  end
end