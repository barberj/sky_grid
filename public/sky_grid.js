SkyGridData = this.sky_grid_data = [];

function DisplayAll(){
};

function SkyGrid(){
  $(this).on("grids.initialized", DisplayAll);

  $('.grid').each( function() {
    grid = $(this);
    columns = grid.data('columns');

    SkyGridData.push({
      e: this,
      id: grid.attr('id'),
      url: grid.data('url'),
      start: 0,
      end: 25,
      columns: columns,
      sort: columns[0]
    });

    $.event.trigger("grids.initialized");
  });
}
