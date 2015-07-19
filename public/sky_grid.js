SkyGridData = this.sky_grid_data = [];

function SkyGrid(){

  grids = $('.grid').each( function() {
    columns = $(this).data('columns');

    SkyGridData.push({
      url: $(this).data('url'),
      start: 0,
      end: 25,
      columns: columns,
      sort: columns[0]
    });
  });
}
