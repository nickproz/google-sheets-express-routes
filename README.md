# google-sheets-api
A simple API for interacting with a google spreadsheet.

## Create necessary (free) Google accounts:
* Create a Google Cloud Platform Project [here](https://console.cloud.google.com/home/dashboard)
* Create a Google Service account within your project [here](https://console.cloud.google.com/iam-admin/serviceaccounts) 
* Create a private key for your Google Service account
    * On the newly created service account page, click the `Create Key` at the bottom, and choose `JSON` to download the key
* Be sure to take note of the following values
    * private_key: The `private_key` field in the JSON key created above
    * client_email: The `client_email` field in the JSON key created above
    
## Share spreadsheet with Google Service account
To be able to write/read to/from the spreadsheet, you need to share the spreadsheet with the created Google Service
account above. To do this, just click `Share` from the spreadsheet and add the `client_email` of the service account
(see how to find that above). Ensure you only share permissions that you want the service account to have (only view
permissions if you only plan on reading from the spreadsheet and don't want anyone to be able to manipulate it, or
view + edit permissions if you want to be able to manipulate the spreadsheet).

## API Documentation

### constructor
Creates an instance of the class.

```typescript
import GoogleSheetsApi from 'google-sheets-api'; 
import { GoogleCredentials } from './src/model/google-credentials.interface';

const credentials: GoogleCredentials = {
    private_key: '***',
    client_email: '***'
}

const api = new GoogleSheetsApi(credentials);
```

### getRows(sheetId, sheetIndex)
Gets all rows for a given sheet ID and sheet index.
* (sheetId: string) =  The ID of the spreadsheet (can be found in the spreadsheet url (after /d/ and before /edit))
* (sheetIndex: number) = The index of the worksheet within the spreadsheet (starts at 0)

Gets row data for the row index passed in.

```typescript
import { SheetRowData } from './src/model/sheet-row-data.interface';

const sheetId: string = '***';
const sheetIndex: number = 1;
const rowData: SheetRowData[] = api.getRows(sheetId, sheetIndex);
console.log(rowData);
```

Example output:

```json
[
  {
    "headerCol1": "row1Col1",
    "headerCol2": "row1Col2"
  },
  {
    "headerCol1": "row2Col1",
    "headerCol2": "row2Col2"
  }
]
```

### createRow(sheetId, rowData, sheetIndex)
Creates the passed in row data in the given sheet ID and sheet index. The row is created at the end of the spreadsheet
* (sheetId: string) =  The ID of the spreadsheet (can be found in the spreadsheet url (after /d/ and before /edit))
* (rowData: SheetRowData) = A map of column headers to row data you want to save 
* (sheetIndex: number) = The index of the worksheet within the spreadsheet (starts at 0)

Gets row data for the row index passed in.

```typescript
import { SheetRowData } from './src/model/sheet-row-data.interface';

const rowData: SheetRowData = 
    {
        "headerCol1": "row1Col1",
        "headerCol2": "row1Col2"
    };
const sheetId: string = '***';
const sheetIndex: number = 1;
api.createRow(sheetId, rowData, sheetIndex);
```