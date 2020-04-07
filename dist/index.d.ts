import { GoogleCredentials } from "./model/google-credentials.interface";
import { SheetRowData } from "./model/row-data-map.interface";
export default class GoogleSheetsApi {
    private readonly credentials;
    constructor(credentials: GoogleCredentials);
    /**
     * Reads all row data.
     *
     * @param sheetId - id of our spreadsheet
     * @param sheetIndex - optional sheet index
     */
    getRows(sheetId: string, sheetIndex?: number): Promise<SheetRowData[]>;
    /**
     * Writes a single row to our spreadsheet.
     *
     * @param sheetId - id of our spreadsheet
     * @param rowData - row data to write to our spreadsheet
     * @param sheetIndex - optional sheet index
     */
    createRow(sheetId: string, rowData: any, sheetIndex?: number): Promise<any>;
    private loadSheet;
    private loadDocument;
    private transformRows;
    private transformRow;
}
