class ItemsImport
  include ActiveModel::Model
  require 'roo'

  attr_accessor :attachment

  def initialize(attributes={})
      attributes.each { |name, value| send("#{name}=", value) }
  end

  def persisted?
      false
  end

  def open_spreadsheet
      case File.extname(attachment.original_filename)
      when ".xlsx" then Roo::Excelx.new('public/' + DocumentUploader.store_dir + '/' + attachment.original_filename)
      else raise "Unknown file type: #{attachment.original_filename}"
      end
  end
  
  def load_imported_items
    spreadsheet = open_spreadsheet
    header = spreadsheet.row(2)
    (3..spreadsheet.last_row).map do |i|
      row = Hash[[header, spreadsheet.row(i)].transpose]
      item = Item.find_by(phone_number: row["phone_number"], price_info: row["price_info"]) || Item.new
      if item.price_info != nil && row["price_info"].to_i >= 100000
        lottery_count = row["price_info"].to_i/100000
        string_arr = Lottery.pluck(:lottery_number)
        l_number_arr = string_arr.map(&:to_i)
        for lottery in 1..lottery_count
          lottery = Lottery.new do |l|
            l.phone_number = row["phone_number"]
            random_pick = ([*1..999999] - l_number_arr).sample
            l_number_arr.push(random_pick)              
            random_pick.to_s.rjust(6, "0")
            l.lottery_number = random_pick
          end
          lottery.save!
        end
      end
      item.attributes = row.to_hash
      item
    end
  end
  
  def imported_items
    @imported_items ||= load_imported_items
  end
  
  def save
    if imported_items.map(&:valid?).all?
      imported_items.each(&:save!)
      true
    else
      imported_items.each_with_index do |item, index|
        item.errors.full_messages.each do |msg|
          errors.add :base, "Row #{index + 6}: #{msg}"
        end
      end
      false
    end
  end
  
end