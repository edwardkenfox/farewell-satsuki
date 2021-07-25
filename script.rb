require 'csv'
require 'json'

file = File.read("data.csv")
csv = CSV.parse(file)
rows = []

csv.each.with_index do |row, i|
  next if i < 2 # skip header + sample

  rows.push({
    user: {
      div: row[1],
      div_short: row[2],
      name: row[3],
      iconUrl: "img/users/#{row[7]}",
    },
    message: {
      body: row[4]
    }
  })
end

File.write("./docs/data.json", JSON.generate(rows))
