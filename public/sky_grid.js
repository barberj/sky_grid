SkyGridData = this.sky_grid_data = [];

function DisplayGrid(data){
};

function FetchGridData(el_grid){
  grid = $(el_grid);
  url = grid.data('url') + "?start=" + grid.attr('start');

  $.ajax({
    url: url
  }).done(DisplayGrid);
};

function FetchAllGridData(){
  $.each(SkyGridData, function(index, grid){
    FetchGridData(grid.e);
  });
};

function SkyGrid(){
  $(this).on("grids.initialized", FetchAllGridData);

  $('.grid').each( function() {
    grid = $(this);
    columns = grid.data('columns');
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
