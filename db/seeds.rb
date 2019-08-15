# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

# add doctors data
User.create(email: "user1@gmail.com", password: "12345678", role_id: 0)
User.create(email: "user2@gmail.com", password: "12345678", role_id: 0)
User.create(email: "user3@gmail.com", password: "12345678", role_id: 0)
User.create(email: "user1@gmail.com", password: "12345678", role_id: 0)
User.create(email: "user1@gmail.com", password: "12345678", role_id: 0)
User.create(email: "admin1@gmail.com", password: "12345678", role_id: 1)

# 10.times do
#     purchase_date = Date.parse('2019-08-10')
#     phone_number = Faker::PhoneNumber.cell_phone
#     surname = Faker::Coffee.blend_name
#     name = Faker::Coffee.blend_name
#     product_name = Faker::Device.model_name
#     price_info = rand(0..1000)
#     phone_imei = Faker::Device.serial
#     Item.create(purchase_date: purchase_date , phone_number: phone_number, surname: surname,
#         name: name, product_name: product_name, price_info: price_info, phone_imei: phone_imei )
# end