ui = null;

try {

    this.ui = SpreadsheetApp.getUi();

} catch (e) { }


function showDataScraper() {

    consult_manager = new ConsultDataManager();

    consult_manager.initialize();

    web_site = consult_manager.getValue(consult_manager.fields.search.web_site_id)

    commune = consult_manager.getValue(consult_manager.fields.search.commune_id)

    filters = { web_site: web_site, commune: commune }

    limit = consult_manager.getValue(consult_manager.fields.search.limit)

    if (limit != '') {
        filters.limit = limit
    }
    //TODO agregar filtos de comentarios
    with_comment = consult_manager.getValue(consult_manager.fields.search.with_comment)

    if (with_comment != '') {

        filters.with_comment = !with_comment ? 'true' : 'false'

    }

    consult_manager.cleanSheet(
        row_from = 1,
        column_from = 1,
        row_to = undefined,
        column_to = undefined,
        data_sheet = consult_manager.data_sheet.results
    )

    consult_manager.consultaDataFromSM(
        filters = filters
    )

}