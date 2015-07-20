SkyGridData = this.sky_grid_data = [];

function AttachHandlers(e) {
  $('.pager').click(function (event) {
    var grid = $(this).closest('.grid');
    grid.attr('data-start', $(this).data('start'));

    FetchGridData(grid);
  });

  $('.sorter').click(function (event) {
    event.preventDefault();
    var grid = $(this).closest('.grid');
    var current_sort = grid.attr('data-sort_by');
    var current_direction = grid.attr('data-sort_direction');
    var next_sort = $(this).attr('data-sort_by');
    var reverse_direction = current_direction == 'asc' ? 'desc' : 'asc'

    if(current_sort == next_sort) {
      grid.attr('data-sort_direction', reverse_direction);
    }else{
      grid.attr('data-sort_direction', 'asc');
    }

    grid.attr('data-sort_by', next_sort);

    FetchGridData(grid);
  });
};

function DisplayGrid(grid, data){
  var tr = document.createElement('tr');
  var columns = grid.data('columns')
  var sort_by = grid.attr('data-sort_by')
  var sort_direction = grid.attr('data-sort_direction') == 'asc' ? ' ^' : ' v'

  for(var index in columns) {
    var text = columns[index];
    var sort_text = sort_by == text ? sort_direction : ''
    var th = document.createElement('th');
    $(th).append('<span class="sorter" data-sort_by="'+ text +'">' + text + sort_text + '</span>');
    $(tr).append(th);
  };

  var table = document.createElement('table');
  table.appendChild(tr);

  for(var dindex in data.records) {
    var datum = data.records[dindex];
    var tr = document.createElement('tr');
    table.appendChild(tr);
    for(var cindex in columns) {
      var column = columns[cindex];
      var value = datum[column];
      var td = document.createElement('td');

      $(td).html(value)
      tr.appendChild(td);
    };
  };

  var page_count = parseInt(data.count) / 25;
  var pager = document.createElement('div');
  for(var i = 0; i < page_count; i ++){
    page = i + 1
    $(pager).append('<span class="pager" data-start="'+ (i * 25) + '">' + page + '</span>');
  }

  grid.html(table);
  grid.append(pager);

  $.event.trigger("grid.built");
};

function FetchGridData(grid){
  var url = grid.attr('data-url') + "?start=" + grid.attr('data-start') + "&sort_by=" + grid.attr('data-sort_by') + "&sort_direction=" + grid.attr('data-sort_direction');

  $.ajax({
    url: url
  }).done(function (data){
    DisplayGrid(grid, data);
  });
};

function FetchAllGridData(){
  $.each(SkyGridData, function(index, grid){
    FetchGridData($(grid.e));
  });
};

$( document ).ready(function() {
  $(this).on("grids.initialized", FetchAllGridData);
  $(this).on("grid.built", AttachHandlers);

  $('.grid').each( function() {
    var grid = $(this);
    var columns = grid.data('columns');
    grid.attr('data-start', 0);
    grid.attr('data-sort_by', columns[0]);
    grid.attr('data-sort_direction', 'asc');

    SkyGridData.push({
      e: this,
      id: grid.attr('id'),
      url: grid.attr('data-url'),
      start: 0,
      columns: columns,
      sort: columns[0]
    });

    $.event.trigger("grids.initialized");
  });
});
