function DateUtils() {
    /**
    * Obtiene un objeto Date a través de un string 
    * "2019-10-07T20:00:18.279948Z" 
    */
    this.getDayForString = function (string_date) {
        var date = string_date.split('T')[0].split('-')
        var time = string_date.split('T')[1].replace('Z', '').split(':')
        var _date = new Date(date[0], date[1] - 1, date[2], time[0], time[1], time[2])
        return _date
    }
}