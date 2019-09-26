function ScraperMerge() {

  this.url_merge = PropertiesService.getScriptProperties().getProperty("url_merge");

  this.urls = {
    entries: this.url_merge + '/dashboard/api/surroundings?',
    sector_of_point: this.url_merge + '/ahep/sector_of_point?',
    summary_data_for_operation: this.url_merge + '/dashboard/api/summary_data_for_operation?',
    update_home_advisor_comment: this.url_merge + '/dashboard/api/update_home_advisor_comments',
  }
}

ScraperMerge.prototype.initialize = function () { }

ScraperMerge.prototype.consultEntries = function (latitude, longitude, radius, limit) {
  /*
  Retorna las propiedades de SII en el área determinada
  */
  var options = {
    'method': 'get',
    'headers': {}
  }

  var url = this.urls.entries + 'latitude=' + latitude + '&longitude=' + longitude + '&radius=' + radius + '&limit=' + limit;

  response = UrlFetchApp.fetch(url, options).getContentText();

  response = JSON.parse(response)

  return response
}

ScraperMerge.prototype.consultSectorOfPoint = function (latitude, longitude) {
  /*
  Retorna los sectores correspondientes a las coordenadas
  */
  var options = {
    'method': 'get',
    'headers': {}
  }

  var url = this.urls.sector_of_point + 'latitude=' + latitude + '&longitude=' + longitude;

  response = UrlFetchApp.fetch(url, options).getContentText();

  response = JSON.parse(response)

  return response
}

/**
 * Función que retorna el resumen de los datos extraidos desde Scraper Merge
 * con sus tasaciones, según los filtros
 * @param filters: diccionario con los filtros a utilizar ejemplo:
 * {
 *    limit:10,
 *    commune:325,
 *    web_site:1,
 *    order_publish_date: asc | desc,
 * 
 * }
 */
ScraperMerge.prototype.consultSummaryDataForOperation = function (filters) {
  /*
  Retorna los sectores correspondientes a las coordenadas
  */
  var options = {
    'method': 'get',
    'headers': {}
  }
  var params = ''

  for (key in filters) {

    params += '&' + key + '=' + filters[key]

  }

  var url = this.urls.summary_data_for_operation + params;

  response = UrlFetchApp.fetch(url, options).getContentText();

  response = JSON.parse(response)

  return response

}
