# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

# add doctors data
User.create(email: "user1@gmail.com", password: "user1-pass191", role_id: 0)
User.create(email: "user2@gmail.com", password: "user2-pass202", role_id: 0)
User.create(email: "user3@gmail.com", password: "user3-pass313", role_id: 0)
User.create(email: "user4@gmail.com", password: "user4-pass424", role_id: 0)
User.create(email: "user5@gmail.com", password: "user5-pass535", role_id: 0)
User.create(email: "user6@gmail.com", password: "user6-pass646", role_id: 0)
User.create(email: "user7@gmail.com", password: "user7-pass757", role_id: 0)
User.create(email: "user8@gmail.com", password: "user8-pass868", role_id: 0)
User.create(email: "admin@gmail.com", password: "admin-password816", role_id: 1)

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