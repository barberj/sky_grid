SkyGridData = this.sky_grid_data = [];

function CreateGrid(columns, data){
};

function DisplayGrid(el_grid, data){
  var th = document.createElement('th');
  var columns = $(el_grid).data('columns')

  for(var index in columns) {
    var column = columns[index];
    var td = document.createElement('td');
    $(td).append(column);
    $(th).append(td);
  };

  var table = document.createElement('table');
  table.appendChild(th);

  for(var dindex in data.records) {
    var datum = data.records[dindex];
    var tr = document.createElement('tr');
    table.appendChild(tr);
    for(var cindex in columns) {
      var column = columns[index];
      var value = datum[column];
      var td = document.createElement('td');

      $(td).html(value)
      tr.appendChild(td);
    };
  };

  $(el_grid).html(table);
};

function FetchGridData(el_grid){
  var grid = $(el_grid);
  var url = grid.data('url') + "?start=" + grid.attr('start');

  $.ajax({
    url: url
  }).done(function (data){
    DisplayGrid(el_grid, data);
  });
};

function FetchAllGridData(){
  $.each(SkyGridData, function(index, grid){
    FetchGridData(grid.e);
  });
};

function SkyGrid(){
  $(this).on("grids.initialized", FetchAllGridData);

  $('.grid').each( function() {
    var grid = $(this);
    var columns = grid.data('columns');
    grid.attr('start', 0);
    grid.attr('sort', columns[0]);

    SkyGridData.push({
      e: this,
      id: grid.attr('id'),
      url: grid.data('url'),
      start: 0,
      columns: columns,
      sort: columns[0]
    });

    $.event.trigger("grids.initialized");
  });
}
