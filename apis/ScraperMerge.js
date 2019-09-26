function ScraperMerge(){

  this.url_merge = PropertiesService.getScriptProperties().getProperty("url_merge");

  this.urls = {
    entries : this.url_merge+'/dashboard/api/surroundings?',
    sector_of_point : this.url_merge+'/ahep/sector_of_point?',
  }
}

ScraperMerge.prototype.initialize = function(){}

ScraperMerge.prototype.consultEntries = function (latitude, longitude, radius, limit){
  /*
  Retorna las propiedades de SII en el área determinada
  */
  var options = {
    'method':'get',
    'headers': {}
  }
  
  var url = this.urls.entries+'latitude='+latitude+'&longitude='+longitude+'&radius='+radius+'&limit='+limit;
 
  response = UrlFetchApp.fetch(url, options).getContentText();
  
  response = JSON.parse(response)
  
  return response
}

ScraperMerge.prototype.consultSectorOfPoint = function (latitude, longitude){
  /*
  Retorna los sectores correspondientes a las coordenadas
  */
  var options = {
    'method':'get',
    'headers': {}
  }
  
  var url = this.urls.sector_of_point+'latitude='+latitude+'&longitude='+longitude;
 
  response = UrlFetchApp.fetch(url, options).getContentText();
  
  response = JSON.parse(response)
  
  return response
}

