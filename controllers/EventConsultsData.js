ui = null;

try {

    this.ui = SpreadsheetApp.getUi();

} catch (e) { }

/**
 * Evento para traer los datos de scraper merge
 */
function showDataScraper() {

    consult_manager = new ConsultDataManager();

    consult_manager.initialize();

    consult_manager.document.toast('Timothy esta consultando los datos al servidor.', 'Data Scrapers');

    web_site = consult_manager.getValue(consult_manager.fields.search.web_site_id)

    commune = consult_manager.getValue(consult_manager.fields.search.commune_id)

    filters = { web_site: web_site, commune: commune, order_publish_date: 'desc' }

    limit = consult_manager.getValue(consult_manager.fields.search.limit)

    if (limit != '') {
        filters.limit = limit
    }

    consult_manager.showDataFromSM(
        filters = filters
    )

    consult_manager.document.toast('Timothy, a comenzado a filtrar los datos.', 'Data Scrapers');

    consult_manager.showFilterData()

    consult_manager.document.toast('Uff!, Datos listos.', 'Data Scrapers');
}

/**
 * Evento para filtrar los datos de scraper merge
 */
function showDataFilterScraper() {

    consult_manager = new ConsultDataManager();

    consult_manager.initialize();

    consult_manager.document.toast('Timothy, a comenzado a filtrar los datos.', 'Data Scrapers');

    consult_manager.showFilterData()

    consult_manager.document.toast('Uff!, Datos listos.', 'Data Scrapers');
}

/**
 * Evento para subir los comentarios a Scraper Merge
 */
function UpdateCommentScraper() {

    consult_manager = new ConsultDataManager();

    consult_manager.initialize();

    consult_manager.document.toast('Subiendo comentarios', 'Upload data');

    consult_manager.updateCommentEntries()

    consult_manager.cleanSheet(
        row_from = 2,
        column_from = 2,
        row_to = undefined,
        column_to = undefined,
        data_sheet = consult_manager.data_sheet.upload_data
    )

    consult_manager.document.toast('Proceso finalizado', 'Upload data');

}