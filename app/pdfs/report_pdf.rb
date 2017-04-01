# frozen_string_literal: true

# Creates report pdf
class ReportPdf < Prawn::Document
  require 'prawn/table'

  def initialize(tickets)
    super()
    @tickets = tickets

    _header
    _table
    _footer
  end

  def _header
    define_grid(columns: 5, rows: 20, gutter: 0)
    grid([0, 0], [1, 2]).bounding_box do
      text 'Report - Solved Tickets Last Month', size: 16
      text "Date: #{Date.current}", size: 10
    end
  end

  def _table
    table (head + body), header: true, width: 540 do
      cells.style size: 9, align: :center, padding: [5, 5],
                  border_width: 0.5, border_color: 'DDDDDD'
      row(0).style font_style: :bold, padding: [10, 15]
    end
  end

  def _footer
    bounding_box([bounds.right - 50, bounds.bottom], width: 60, height: 20) do
      page_count.times do |i|
        go_to_page(i + 1)
        text "Page #{(i + 1)} from #{page_count}", size: 7, color: 'CCCCCC'
      end
    end

    bounding_box([bounds.left, bounds.bottom], width: 160, height: 20) do
      text 'Made by Awesome Support', size: 7, color: 'CCCCCC'
    end
  end

  private

  def head
    [%w(Title Created Customer Status)]
  end

  def body
    @tickets.map do |item|
      [item.title, item.created_at.strftime('%d. %m. %Y'),
       item.user.name, item.status]
    end
  end
end
