// @ts-ignore
import { GoogleSpreadsheet, GoogleSpreadsheetRow, GoogleSpreadsheetWorksheet } from 'google-spreadsheet';
import { GoogleCredentials} from "./model/google-credentials.interface";
import { SheetRowData } from "./model/row-data-map.interface";

export default class GoogleSheetsApi {

    constructor(private readonly credentials: GoogleCredentials) {
        // Fix special characters
        this.credentials.private_key = this.credentials.private_key.replace(/\\n/g, '\n');
    }

    /**
     * Reads all row data.
     *
     * @param sheetId - id of our spreadsheet
     * @param sheetIndex - optional sheet index
     */
    public async getRows(sheetId: string, sheetIndex: number = 0): Promise<SheetRowData[]> {
        const sheet: GoogleSpreadsheetWorksheet = await this.loadSheet(sheetId, sheetIndex);
        return sheet.getRows()
            .then((rows: any) => this.transformRows(rows));
    }

    /**
     * Writes a single row to our spreadsheet.
     *
     * @param sheetId - id of our spreadsheet
     * @param rowData - row data to write to our spreadsheet
     * @param sheetIndex - optional sheet index
     */
    public async createRow(sheetId: string, rowData: any, sheetIndex: number = 0): Promise<any> {
        const sheet: GoogleSpreadsheetWorksheet = await this.loadSheet(sheetId, sheetIndex);
        const row: GoogleSpreadsheetRow = await sheet.addRow(rowData);
        return row.save();
    }

    private async loadSheet(sheetId: string, sheetIndex: number): Promise<GoogleSpreadsheetWorksheet> {
        const doc: GoogleSpreadsheet = await this.loadDocument(sheetId);
        return doc.sheetsByIndex[sheetIndex];
    }

    private async loadDocument(sheetId: string): Promise<GoogleSpreadsheet> {
        const doc: GoogleSpreadsheet = new GoogleSpreadsheet(sheetId);
        await doc.useServiceAccountAuth(this.credentials);
        await doc.loadInfo();
        return doc;
    }

    private transformRows(rows: GoogleSpreadsheetRow[]): SheetRowData[] {
        return rows.map((row: GoogleSpreadsheetRow) => this.transformRow(row));
    }

    private transformRow(row: GoogleSpreadsheetRow): SheetRowData {
        const headers = row._sheet.headerValues;
        const values = row._rawData;
        return headers.reduce((rowMap: any, header: string, index: number) => {
            rowMap[header] = values[index];
            return rowMap;
        }, {});
    }
}