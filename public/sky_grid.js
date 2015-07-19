SkyGridData = this.sky_grid_data = [];

function SkyGrid(){

  grids = $('.grid').each( function() {

    SkyGridData.push({
      url: $(this).data('url');
      start: 0,
      end: 25,
      columns: $(this).data('columns')
    });
  });
}
