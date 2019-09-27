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

/**
 * Retorna las propiedades de SII en el área determinada
 */
ScraperMerge.prototype.consultEntries = function (latitude, longitude, radius, limit) {

  var options = {
    'method': 'get',
    'headers': {}
  }

  var url = this.urls.entries + 'latitude=' + latitude + '&longitude=' + longitude + '&radius=' + radius + '&limit=' + limit;

  response = UrlFetchApp.fetch(url, options).getContentText();

  response = JSON.parse(response)

  return response
}

/**
 * Retorn el sector correspondiente a una coordenada
 */
ScraperMerge.prototype.consultSectorOfPoint = function (latitude, longitude) {

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


/**
 * Sube los comentarios del home advisor a scraper merge
 */
ScraperMerge.prototype.uploadCommentData = function (data) {

  var options = {
    'method': 'post',
    'contentType': 'application/json',
    'payload': JSON.stringify(data)
  }

  var response = UrlFetchApp.fetch(this.urls.update_home_advisor_comment, options).getContentText();

  response = JSON.parse(response)

  return response

}
