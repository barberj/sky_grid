require 'sinatra'
require 'json'
require 'faker'
require 'slim'

transactions = (1..27).inject([]) do |t, i|
  record = {
    "id" => i,
    "company" => Faker::Company.name,
    "first_name" => Faker::Name.first_name,
    "last_name" => Faker::Name.last_name,
    "email" => Faker::Internet.email,
    "amount" => Faker::Number.decimal(2),
    "description" => Faker::Lorem.sentence
  }

  t << record
end

get '/transactions' do
  content_type :json

  start = params.fetch('start', 0).to_i
  sort_by = params.fetch('sort_by', :id)
  sort_direction = params.fetch('sort_direction', 'asc')

  sorted = transactions.sort_by{ |t| t[sort_by] }
  sorted = sorted.reverse if sort_direction == 'desc'

  queried = sorted[start...start+25]

  {
    records: queried,
    count: transactions.size
  }.to_json
end

get '/' do
  slim :index
end
