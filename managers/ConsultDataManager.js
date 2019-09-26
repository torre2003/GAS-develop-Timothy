function ConsultDataManager() {

    this.sheet_name = {
        main: "Main",
        results: "Result",
        values: "Values"
    }

    this.document = null;

    this.data_sheet = {
        main: null,
        results: null,
        values: null
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
        values: {
            commune_id: { row: 2, column: 5 },
            commune_name: { row: 2, column: 6 },
            web_site_id: { row: 2, column: 7 },
            web_site_name: { row: 2, column: 8 },
        }
    }

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

    var range = this.data_sheet.results.getRange(row_from, column_from, row_to, column_to)

    range.setValue('')

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
ConsultDataManager.prototype.consultaDataFromSM = function (filters) {

    data = this.scraper_merge.consultSummaryDataForOperation(fitlers = filters)

    keys_tuple = ["web_site", "sector", "home_url", "home_construction_year", "home_total_area", "home_construction_area",
        "home_terrace_area", "home_bathrooms", "home_bedroom_quantity", "rol", "subrol", "address", "latitude", "longitude",
        "entry_id", "home_advisor_comment", "entry_url", "entry_internal_id", "entry_title", "entry_description",
        "furnished", "owner", "entry_publish_date", "entry_expiration_date", "entry_update_date", "entry_data_construction_year",
        "floor_number", "entry_data_total_area", "entry_data_construction_area", "entry_data_useful_area",
        "entry_data_terrace_area", "entry_data_bathrooms", "entry_data_half_bathrooms", "entry_data_bedroom_quantity",
        "entry_data_parking_lots", "orientation", "publisher_name", "role", "publisher_number", "property_price",
        "mt2_price", "currency", "doorlist_home_id", "appraisal_origin", "?column?", "appraisal_price",
        "reg_near_home_total_area_without_restriction", "reg_near_home_total_area_restriction_5_percentage_mt2",
        "reg_near_home_useful_area_without_restriction", "reg_near_home_useful_area_restriction_5_percentage_mt2"]

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

    var range = this.data_sheet.results.getRange(1, 1, data_for_sheet.length, keys_tuple.length)

    range.setValues(data_for_sheet)


}


