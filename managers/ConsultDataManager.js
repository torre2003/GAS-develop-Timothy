function ConsultDataManager() {

    this.sheet_name = {
        main: "Main",
        results: "Result",
        filter_results: "Filter Result",
        values: "Values",
        upload_data: "UploadData"
    }

    this.document = null;

    this.data_sheet = {
        main: null,
        results: null,
        filter_results: null,
        values: null,
        upload_data: null
    }

    this.fields = {
        search: {
            web_site_id: "B4",
            web_site_name: "D4",
            commune_id: "B5",
            commune_name: "D5",
            limit: "D6",
            with_comment: "D7",
        },
        filter: {
            null_sector: "D17",
            max_year: "D18",
            min_year: "D19",
            null_year: "D20",
            max_bedrooms: "D21",
            min_bedrooms: "D22",
            null_bedrooms: "D23",
            max_useful_area: "D24",
            min_useful_area: "D25",
            null_useful_area: "D26",
            with_expired: "D27",
            max_price: "D28",
            min_price: "D29",
            null_price: "D30",
            with_comment: "D31",
            max_useful_mt2_price: "D32",
            min_useful_mt2_price: "D33",
            null_useful_mt2_price: "D34",
            max_price_for_bedroom: "D35",
            min_price_for_bedroom: "D36",
            null_price_for_bedroom: "D37",
            max_useful_mt2_avg_appraisal_price: "D38",
            min_useful_mt2_avg_appraisal_price: "D39",
            null_useful_mt2_avg_appraisal_price: "D40",
            max_delta_useful_mt2_price_with_useful_mt2_avg_appraisal_price: "D41",
            min_delta_useful_mt2_price_with_useful_mt2_avg_appraisal_price: "D42",
            null_delta_useful_mt2_price_with_useful_mt2_avg_appraisal_price: "D43",
        },
        values: {
            commune_id: { row: 2, column: 5 },
            commune_name: { row: 2, column: 6 },
            web_site_id: { row: 2, column: 7 },
            web_site_name: { row: 2, column: 8 },
        },
        upload: {
            entry_url: { row: 2, column: 3 },
            comment: { row: 2, column: 4 },
        }
    }
    this.keys_scraper_merge = ["web_site", "sector", "home_url", "home_construction_year", "home_total_area", "home_construction_area",
        "home_terrace_area", "home_bathrooms", "home_bedroom_quantity", "rol", "subrol", "address", "latitude", "longitude",
        "entry_id", "home_advisor_comment", "entry_url", "entry_internal_id", "entry_title", "entry_description",
        "furnished", "owner", "entry_publish_date", "entry_expiration_date", "entry_update_date", "entry_data_construction_year",
        "floor_number", "entry_data_total_area", "entry_data_construction_area", "entry_data_useful_area",
        "entry_data_terrace_area", "entry_data_bathrooms", "entry_data_half_bathrooms", "entry_data_bedroom_quantity",
        "entry_data_parking_lots", "orientation", "publisher_name", "role", "publisher_number", "property_price",
        "mt2_price", "currency", "doorlist_home_id", "appraisal_origin", "?column?", "appraisal_price",
        "reg_near_home_total_area_without_restriction", "reg_near_home_total_area_restriction_5_percentage_mt2",
        "reg_near_home_useful_area_without_restriction", "reg_near_home_useful_area_restriction_5_percentage_mt2",
        "useful_mt2_price", "price_for_bedroom", "avg_appraisal_method",
        "useful_mt2_avg_appraisal_price", "delta_useful_mt2_price_with_useful_mt2_avg_appraisal_price"

    ]

    this.scraper_merge = null
}

/**
 * Inicializa las variables del modelo
 */
ConsultDataManager.prototype.initialize = function () {

    this.document = SpreadsheetApp.getActiveSpreadsheet();

    this.data_sheet.main = this.document.getSheetByName(this.sheet_name.main);

    this.data_sheet.results = this.document.getSheetByName(this.sheet_name.results);

    this.data_sheet.values = this.document.getSheetByName(this.sheet_name.values);

    this.data_sheet.upload_data = this.document.getSheetByName(this.sheet_name.upload_data);

    this.data_sheet.filter_results = this.document.getSheetByName(this.sheet_name.filter_results);

    this.scraper_merge = new ScraperMerge()

    this.scraper_merge.initialize()


}


/**
 * Obtiene el valor del campo
 */
ConsultDataManager.prototype.getValue = function (field, data_sheet) {

    if (data_sheet === undefined) {

        data_sheet = this.data_sheet.main

    }

    return data_sheet.getRange(field + ":" + field).getCell(1, 1).getValue();

}

/**
 * Muestra el valor de un campo en la Hoja
 */
ConsultDataManager.prototype.showValue = function (field, value, data_sheet) {

    if (data_sheet === undefined) {

        data_sheet = this.data_sheet.main

    }

    data_sheet.getRange(field + ":" + field).getCell(1, 1).setValue(value);

}

/**
 * Limpia la hoja, en el rango indicado
 */
ConsultDataManager.prototype.cleanSheet = function (
    row_from, column_from, row_to, column_to, data_sheet
) {

    if (data_sheet === undefined) {

        data_sheet = this.data_sheet.main

    }

    if (row_to === undefined) {

        row_to = data_sheet.getLastRow()

    }

    if (column_to === undefined) {

        column_to = data_sheet.getLastColumn()

    }

    if (row_to == 0 || column_to == 0) {

        return

    }

    var range = data_sheet.getRange(row_from, column_from, row_to, column_to)

    range.setValue('')

}



/**
 * Muestra los datos en una hoja especifica desde un diccionario
 *  @params data:Diccionario con los datos
 *  @params keys_tuple:Arreglo con las keys y orden a mostrar en la hoja
 *  @params data_sheet:Hoja a mostrar los datos
 */
ConsultDataManager.prototype.showDataFromDic = function (data, keys_tuple, data_sheet) {

    data_for_sheet = []

    data_for_sheet.push(keys_tuple)

    for (tuple in data) {

        _tuple = data[tuple]

        aux_tuple = []

        for (key in keys_tuple) {

            aux_tuple.push(_tuple[keys_tuple[key]])

        }

        data_for_sheet.push(aux_tuple)

    }

    var range = data_sheet.getRange(1, 1, data_for_sheet.length, keys_tuple.length)

    range.setValues(data_for_sheet)

}


/**
 * Mapea la hoja correspondiente a un diccionario
 * La primera fila se toma como los nombres de los campos
 */
ConsultDataManager.prototype.mapSheetToDic = function (
    row_from, column_from, row_to, column_to, data_sheet
) {

    if (data_sheet === undefined) {

        data_sheet = this.data_sheet.main

    }

    if (row_to === undefined) {

        row_to = data_sheet.getLastRow()

    }

    if (column_to === undefined) {

        column_to = data_sheet.getLastColumn()

    }

    if (row_to == 0 || column_to == 0) {

        return

    }

    var range = data_sheet.getRange(row_from, column_from, row_to, column_to)

    values = range.getValues()

    keys = values[0]

    dic_data = []

    for (var row = 1; row < values.length; row++) {

        aux_row_dic = {}

        for (var column = 0; column < keys.length; column++) {

            aux_row_dic[keys[column]] = values[row][column]

        }

        dic_data.push(aux_row_dic)

    }

    return dic_data;
}


/**
 * Muestra los datos extraidos desde Scraper Merge en la hoja correspondiente
 * @param filters: diccionario con los filtros a utilizar ejemplo:
 * {
 *    limit:10,
 *    commune:325,
 *    web_site:1,
 *    order_publish_date: asc | desc,
 * 
 * }
 */
ConsultDataManager.prototype.showDataFromSM = function (filters) {

    this.cleanSheet(
        row_from = 1,
        column_from = 1,
        row_to = undefined,
        column_to = undefined,
        data_sheet = this.data_sheet.results
    )

    data = this.scraper_merge.consultSummaryDataForOperation(fitlers = filters)

    data = this.proccesDataFromSM(data)

    this.showDataFromDic(data = data, keys_tuple = this.keys_scraper_merge, data_sheet = this.data_sheet.results)

}

/**
 * Procesa la data extraida de scraper merge para agregar campos
 */
ConsultDataManager.prototype.proccesDataFromSM = function (data) {

    data = this.scraper_merge.consultSummaryDataForOperation(fitlers = filters)

    for (var i = 0; i < data.length; i++) {

        data[i].useful_mt2_price = ""

        if (data[i]["entry_data_useful_area"] != null &&
            data[i]["entry_data_useful_area"] != "" &&
            data[i]["entry_data_useful_area"] > 0 &&
            data[i]["property_price"] != null &&
            data[i]["property_price"] != "" &&
            data[i]["property_price"] > 0
        ) {
            data[i].useful_mt2_price = data[i]["property_price"] / data[i]["entry_data_useful_area"]
        }

        data[i].price_for_bedroom = ""

        if (data[i]["entry_data_bedroom_quantity"] != null &&
            data[i]["entry_data_bedroom_quantity"] != "" &&
            data[i]["entry_data_bedroom_quantity"] > 0 &&
            data[i]["property_price"] != null &&
            data[i]["property_price"] != "" &&
            data[i]["property_price"] > 0
        ) {
            data[i].price_for_bedroom = data[i]["property_price"] / data[i]["entry_data_bedroom_quantity"]
        }

        data[i].avg_appraisal_method = ""

        avg_appraisal_method = {
            count: 0,
            sum: 0
        }

        if (data[i]["reg_near_home_total_area_without_restriction"] != null &&
            data[i]["reg_near_home_total_area_without_restriction"] != "" &&
            data[i]["reg_near_home_total_area_without_restriction"] > 0
        ) {

            avg_appraisal_method.sum += data[i]["reg_near_home_total_area_without_restriction"]
            avg_appraisal_method.count += 1
        }

        if (data[i]["reg_near_home_total_area_restriction_5_percentage_mt2"] != null &&
            data[i]["reg_near_home_total_area_restriction_5_percentage_mt2"] != "" &&
            parseFloat(data[i]["reg_near_home_total_area_restriction_5_percentage_mt2"]) > 0
        ) {

            avg_appraisal_method.sum += data[i]["reg_near_home_total_area_restriction_5_percentage_mt2"]
            avg_appraisal_method.count += 1
        }

        if (data[i]["reg_near_home_useful_area_without_restriction"] != null &&
            data[i]["reg_near_home_useful_area_without_restriction"] != "" &&
            data[i]["reg_near_home_useful_area_without_restriction"] > 0
        ) {

            avg_appraisal_method.sum += data[i]["reg_near_home_useful_area_without_restriction"]
            avg_appraisal_method.count += 1
        }

        if (data[i]["reg_near_home_useful_area_restriction_5_percentage_mt2"] != null &&
            data[i]["reg_near_home_useful_area_restriction_5_percentage_mt2"] != "" &&
            data[i]["reg_near_home_useful_area_restriction_5_percentage_mt2"] > 0
        ) {

            avg_appraisal_method.sum += data[i]["reg_near_home_useful_area_restriction_5_percentage_mt2"]
            avg_appraisal_method.count += 1
        }

        if (avg_appraisal_method.count > 0) {
            data[i].avg_appraisal_method = avg_appraisal_method.sum / avg_appraisal_method.count
        }

        data[i].useful_mt2_avg_appraisal_price = ""

        if (data[i]["entry_data_useful_area"] != null &&
            data[i]["entry_data_useful_area"] != "" &&
            data[i]["entry_data_useful_area"] > 0 &&
            data[i].avg_appraisal_method != ""

        ) {
            data[i].useful_mt2_avg_appraisal_price = data[i].avg_appraisal_method / data[i]["entry_data_useful_area"]
        }

        data[i].delta_useful_mt2_price_with_useful_mt2_avg_appraisal_price = ""

        if (
            data[i].useful_mt2_price &&
            data[i].useful_mt2_avg_appraisal_price != ""
        ) {
            data[i].delta_useful_mt2_price_with_useful_mt2_avg_appraisal_price = data[i].useful_mt2_price - data[i].useful_mt2_avg_appraisal_price
        }

    }

    return data
}

/**
 * Extrae los registros de la hoja Upload Data, y
 * actualizar los registros en Scraper Merge
 */
ConsultDataManager.prototype.updateCommentEntries = function () {

    var range = this.data_sheet.upload_data.getRange(
        this.fields.upload.entry_url.row,
        this.fields.upload.entry_url.column,
        this.data_sheet.upload_data.getLastRow(),
        2
    )

    var values = range.getValues()

    var data = []

    for (key in values) {

        if (values[key][0] != "") {

            data.push(
                {
                    instance: { "url": values[key][0] },
                    comment: values[key][1]
                }
            )

        }

    }

    data = { "entries": data }

    this.scraper_merge.uploadCommentData(data)
}

/**
 * Muestra los datos filtrados en el docmuento
 */
ConsultDataManager.prototype.showFilterData = function () {

    this.cleanSheet(
        row_from = 1,
        column_from = 1,
        row_to = undefined,
        column_to = undefined,
        data_sheet = this.data_sheet.filter_results
    )

    var data = this.mapSheetToDic(
        row_from = 1,
        column_from = 1,
        row_to = undefined,
        column_to = undefined,
        data_sheet = this.data_sheet.results
    )

    filters = this.getFilters()

    var filter_data = []

    for (var i = 0; i < data.length; i++) {

        if (this.filterTuple(tuple = data[i], filters)) {

            filter_data.push(data[i])

        }

    }

    this.showDataFromDic(data = filter_data, keys_tuple = this.keys_scraper_merge, data_sheet = this.data_sheet.filter_results)

}


/**
 * Muestra los datos filtrados en el docmuento
 */
ConsultDataManager.prototype.getFilters = function () {
    filters = {}

    null_sector = this.getValue(this.fields.filter.null_sector);
    max_year = this.getValue(this.fields.filter.max_year);
    min_year = this.getValue(this.fields.filter.min_year);
    null_year = this.getValue(this.fields.filter.null_year);
    max_bedrooms = this.getValue(this.fields.filter.max_bedrooms);
    min_bedrooms = this.getValue(this.fields.filter.min_bedrooms);
    null_bedrooms = this.getValue(this.fields.filter.null_bedrooms);
    max_useful_area = this.getValue(this.fields.filter.max_useful_area);
    min_useful_area = this.getValue(this.fields.filter.min_useful_area);
    null_useful_area = this.getValue(this.fields.filter.null_useful_area);
    with_expired = this.getValue(this.fields.filter.with_expired);
    max_price = this.getValue(this.fields.filter.max_price);
    min_price = this.getValue(this.fields.filter.min_price);
    null_price = this.getValue(this.fields.filter.null_price);
    with_comment = this.getValue(this.fields.filter.with_comment);

    max_useful_mt2_price = this.getValue(this.fields.filter.max_useful_mt2_price);
    min_useful_mt2_price = this.getValue(this.fields.filter.min_useful_mt2_price);
    null_useful_mt2_price = this.getValue(this.fields.filter.null_useful_mt2_price);

    max_price_for_bedroom = this.getValue(this.fields.filter.max_price_for_bedroom);
    min_price_for_bedroom = this.getValue(this.fields.filter.min_price_for_bedroom);
    null_price_for_bedroom = this.getValue(this.fields.filter.null_price_for_bedroom);

    max_useful_mt2_avg_appraisal_price = this.getValue(this.fields.filter.max_useful_mt2_avg_appraisal_price);
    min_useful_mt2_avg_appraisal_price = this.getValue(this.fields.filter.min_useful_mt2_avg_appraisal_price);
    null_useful_mt2_avg_appraisal_price = this.getValue(this.fields.filter.null_useful_mt2_avg_appraisal_price);

    max_delta_useful_mt2_price_with_useful_mt2_avg_appraisal_price = this.getValue(this.fields.filter.max_delta_useful_mt2_price_with_useful_mt2_avg_appraisal_price);
    min_delta_useful_mt2_price_with_useful_mt2_avg_appraisal_price = this.getValue(this.fields.filter.min_delta_useful_mt2_price_with_useful_mt2_avg_appraisal_price);
    null_delta_useful_mt2_price_with_useful_mt2_avg_appraisal_price = this.getValue(this.fields.filter.null_delta_useful_mt2_price_with_useful_mt2_avg_appraisal_price);




    filters.null_sector = null_sector == "" ? false : null_sector

    filters.max_year = max_year == "" ? 999999999999999 : max_year

    filters.min_year = min_year == "" ? 0 : min_year

    filters.null_year = null_year == "" ? false : null_year

    filters.max_bedrooms = max_bedrooms == "" ? 999999999999999 : max_bedrooms

    filters.min_bedrooms = min_bedrooms == "" ? 0 : min_bedrooms

    filters.null_bedrooms = null_bedrooms == "" ? false : null_bedrooms

    filters.max_useful_area = max_useful_area == "" ? 999999999999999 : max_useful_area

    filters.min_useful_area = min_useful_area == "" ? 0 : min_useful_area

    filters.null_useful_area = null_useful_area == "" ? false : null_useful_area

    filters.with_expired = with_expired == "" ? false : with_expired

    filters.max_price = max_price == "" ? 999999999999999 : max_price

    filters.min_price = min_price == "" ? 0 : min_price

    filters.null_price = null_price == "" ? false : null_price

    filters.with_comment = with_comment == "" ? false : with_comment

    filters.max_useful_mt2_price = max_useful_mt2_price == "" ? 999999999999999 : max_useful_mt2_price

    filters.min_useful_mt2_price = min_useful_mt2_price == "" ? 0 : min_useful_mt2_price

    filters.null_useful_mt2_price = null_useful_mt2_price == "" ? false : null_useful_mt2_price

    filters.max_price_for_bedroom = max_price_for_bedroom == "" ? 999999999999999 : max_price_for_bedroom

    filters.min_price_for_bedroom = min_price_for_bedroom == "" ? 0 : min_price_for_bedroom

    filters.null_price_for_bedroom = null_price_for_bedroom == "" ? false : null_price_for_bedroom


    filters.max_useful_mt2_avg_appraisal_price = max_useful_mt2_avg_appraisal_price == "" ? 999999999999999 : max_useful_mt2_avg_appraisal_price

    filters.min_useful_mt2_avg_appraisal_price = min_useful_mt2_avg_appraisal_price == "" ? -99999999999999 : min_useful_mt2_avg_appraisal_price

    filters.null_useful_mt2_avg_appraisal_price = null_useful_mt2_avg_appraisal_price == "" ? false : null_useful_mt2_avg_appraisal_price

    filters.max_delta_useful_mt2_price_with_useful_mt2_avg_appraisal_price = max_delta_useful_mt2_price_with_useful_mt2_avg_appraisal_price == "" ? 999999999999999 : max_delta_useful_mt2_price_with_useful_mt2_avg_appraisal_price

    filters.min_delta_useful_mt2_price_with_useful_mt2_avg_appraisal_price = min_delta_useful_mt2_price_with_useful_mt2_avg_appraisal_price == "" ? -99999999999999 : min_delta_useful_mt2_price_with_useful_mt2_avg_appraisal_price

    filters.null_delta_useful_mt2_price_with_useful_mt2_avg_appraisal_price = null_delta_useful_mt2_price_with_useful_mt2_avg_appraisal_price == "" ? false : null_delta_useful_mt2_price_with_useful_mt2_avg_appraisal_price

    return filters
}


/**
 * Función que filtrar una tupla en forma de diccionario
 * Y devuelve true o false según corresponda 
 * @param tuple: Diccionario con los datos
 * @param filters: Diccionario con los filtros comprobar
 {
    null_sector : true, 
 }
 * @return true si la tupla cumple todas las condiciones, false en caso contrario
*/
ConsultDataManager.prototype.filterTuple = function (tuple, filters) {
    //-------
    // Sectors
    //-------
    if (!filters.null_sector &&
        !(tuple['sector'] == null || tuple['sector'] == '')
    ) {
        return false
    }
    //-------
    // year
    //-------
    if (//null
        (tuple['entry_data_construction_year'] == '' || tuple['entry_data_construction_year'] == 0) && !filters.null_year
    ) {
        return false
    }

    if (//max
        !(tuple['entry_data_construction_year'] == '' || tuple['entry_data_construction_year'] == 0) &&
        filters.max_year < tuple['entry_data_construction_year']
    ) {
        return false
    }

    if (//min
        !(tuple['entry_data_construction_year'] == '' || tuple['entry_data_construction_year'] == 0) &&
        filters.min_year > tuple['entry_data_construction_year']
    ) {
        return false
    }
    //-------
    // bedromms
    //-------
    if (//null
        (tuple['entry_data_bedroom_quantity'] == '' || tuple['entry_data_bedroom_quantity'] == 0) && !filters.null_bedrooms
    ) {
        return false
    }

    if (//max
        !(tuple['entry_data_bedroom_quantity'] == '' || tuple['entry_data_bedroom_quantity'] == 0) &&
        filters.max_bedrooms < tuple['entry_data_bedroom_quantity']
    ) {
        return false
    }

    if (//min
        !(tuple['entry_data_bedroom_quantity'] == '' || tuple['entry_data_bedroom_quantity'] == 0) &&
        filters.min_bedrooms > tuple['entry_data_bedroom_quantity']
    ) {
        return false
    }
    //-------
    // useful_area
    //-------
    if (//null
        (tuple['entry_data_useful_area'] == '' || tuple['entry_data_useful_area'] == 0) && !filters.null_useful_area
    ) {
        return false
    }

    if (//max
        !(tuple['entry_data_useful_area'] == '' || tuple['entry_data_useful_area'] == 0) &&
        filters.max_useful_area < tuple['entry_data_useful_area']
    ) {
        return false
    }

    if (//min
        !(tuple['entry_data_useful_area'] == '' || tuple['entry_data_useful_area'] == 0) &&
        filters.min_useful_area > tuple['entry_data_useful_area']
    ) {
        return false
    }
    //-------
    // with_expired
    //-------
    if (!filters.with_expired &&
        !(tuple['entry_expiration_date'] == null || tuple['entry_expiration_date'] == '')
    ) {
        return false
    }

    //-------
    // price
    //-------
    if (//null
        (tuple['property_price'] == '' || tuple['property_price'] == 0) && !filters.null_price
    ) {
        return false
    }

    if (//max
        !(tuple['property_price'] == '' || tuple['property_price'] == 0) &&
        filters.max_price < tuple['property_price']
    ) {
        return false
    }

    if (//min
        !(tuple['property_price'] == '' || tuple['property_price'] == 0) &&
        filters.min_price > tuple['property_price']
    ) {
        return false
    }

    //-------
    // with_comment
    //-------
    if (!filters.with_comment &&
        !(tuple['home_advisor_comment'] == null || tuple['home_advisor_comment'] == '')
    ) {
        return false
    }


    //-------
    // useful mt2 price
    //-------
    if (//null
        (tuple['useful_mt2_price'] == '' || tuple['useful_mt2_price'] == 0) && !filters.null_useful_mt2_price
    ) {
        return false
    }

    if (//max
        !(tuple['useful_mt2_price'] == '' || tuple['useful_mt2_price'] == 0) &&
        filters.max_useful_mt2_price < tuple['useful_mt2_price']
    ) {
        return false
    }

    if (//min
        !(tuple['useful_mt2_price'] == '' || tuple['useful_mt2_price'] == 0) &&
        filters.min_useful_mt2_price > tuple['useful_mt2_price']
    ) {
        return false
    }

    //-------
    // price for bedroom
    //-------
    if (//null
        (tuple['price_for_bedroom'] == '' || tuple['price_for_bedroom'] == 0) && !filters.null_price_for_bedroom
    ) {
        return false
    }

    if (//max
        !(tuple['price_for_bedroom'] == '' || tuple['price_for_bedroom'] == 0) &&
        filters.max_price_for_bedroom < tuple['price_for_bedroom']
    ) {
        return false
    }

    if (//min
        !(tuple['price_for_bedroom'] == '' || tuple['price_for_bedroom'] == 0) &&
        filters.min_price_for_bedroom > tuple['price_for_bedroom']
    ) {
        return false
    }


    //-------
    // useful_mt2_avg_appraisal_price
    //-------
    if (//null
        (tuple['useful_mt2_avg_appraisal_price'] == '' || tuple['useful_mt2_avg_appraisal_price'] == 0) && !filters.null_useful_mt2_avg_appraisal_price
    ) {
        return false
    }

    if (//max
        !(tuple['useful_mt2_avg_appraisal_price'] == '' || tuple['useful_mt2_avg_appraisal_price'] == 0) &&
        filters.max_useful_mt2_avg_appraisal_price < tuple['useful_mt2_avg_appraisal_price']
    ) {
        return false
    }

    if (//min
        !(tuple['useful_mt2_avg_appraisal_price'] == '' || tuple['useful_mt2_avg_appraisal_price'] == 0) &&
        filters.min_useful_mt2_avg_appraisal_price > tuple['useful_mt2_avg_appraisal_price']
    ) {
        return false
    }

    //-------
    // delta_useful_mt2_price_with_useful_mt2_avg_appraisal_price
    //-------
    if (//null
        (tuple['delta_useful_mt2_price_with_useful_mt2_avg_appraisal_price'] == '' || tuple['delta_useful_mt2_price_with_useful_mt2_avg_appraisal_price'] == 0) &&
        !filters.null_delta_useful_mt2_price_with_useful_mt2_avg_appraisal_price
    ) {
        return false
    }

    if (//max
        !(tuple['delta_useful_mt2_price_with_useful_mt2_avg_appraisal_price'] == '' || tuple['delta_useful_mt2_price_with_useful_mt2_avg_appraisal_price'] == 0) &&
        filters.max_delta_useful_mt2_price_with_useful_mt2_avg_appraisal_price < tuple['delta_useful_mt2_price_with_useful_mt2_avg_appraisal_price']
    ) {
        return false
    }

    if (//min
        !(tuple['delta_useful_mt2_price_with_useful_mt2_avg_appraisal_price'] == '' || tuple['delta_useful_mt2_price_with_useful_mt2_avg_appraisal_price'] == 0) &&
        filters.min_delta_useful_mt2_price_with_useful_mt2_avg_appraisal_price > tuple['delta_useful_mt2_price_with_useful_mt2_avg_appraisal_price']
    ) {
        return false
    }

    return true;
}