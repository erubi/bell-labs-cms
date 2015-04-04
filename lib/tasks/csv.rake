namespace :csv do
  desc "Import metadata from csv"

  task image_metadata: :environment do
    require 'csv'

    csv_text = File.read("#{Rails.root}/public/csv/image_metadata.csv")

    csv = CSV.parse(csv_text, :headers => true)

    csv.each do |row|
      row_hash = row.to_hash
      asset_name = row_hash['Asset_Name'] || ''
      category = row_hash['Main Category'] || ''
      date = row_hash['Date'] || ''
      bell_labs_people = row_hash['Bell Labs People'] || ''
      keywords = row_hash['Keywords'] || ''
      description = row_hash['Description'] || ''

      media_item = MediaItem.select do |m|
        if m.file_name && (m.file_name == asset_name)
          true
        elsif m.base_image_name && (m.base_image_name == asset_name)
          true
        elsif m.base_video_name && (m.base_video_name == asset_name)
          true
        end
      end.first

      next if media_item.nil?

      # update mediaitem attrs here
      media_item.update_attributes(
        top_level_category: category,
        bell_labs_people: bell_labs_people,
        keywords: keywords,
        description: description,
        additional_metadata: date
      )

    end

  end

  task images_not_matched: :environment do
    require 'csv'

    csv_text = File.read("#{Rails.root}/public/csv/image_metadata.csv")

    csv = CSV.parse(csv_text, :headers => true)

    csv.each do |row|
      row_hash = row.to_hash
      asset_name = row_hash['Asset_Name'] || ''

      media_item = MediaItem.select do |m|
        if m.file_name && (m.file_name == asset_name)
          true
        elsif m.base_image_name && (m.base_image_name == asset_name)
          true
        end
      end.first

      if media_item.nil?
        puts(asset_name)
      end

    end
  end

end
