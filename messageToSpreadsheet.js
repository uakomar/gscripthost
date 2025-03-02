function SaveToSpreadsheet(message){
    message = String(message).trim();
    var regExp = new RegExp("^([0-9\-]+)\ ?(.*)"); // "i" is for case insensitive
    
    if (!regExp.test(message)){
      Logger.log("not accept");
      return;
    }
    
    var record = regExp.exec(message);

    var dataRow = new Array(1);
    dataRow[0] = new Array(2);

    dataRow[0][0] = record[1];
    dataRow[0][1] = record[2];

    var ss = SpreadsheetApp.openById(spreadSheetId);

    var sheet = ss.getSheets()[0];
    sheet.getRange(
      sheet.getLastRow() + 1,
      1,
      1,
      2
    ).setValues(dataRow);
}
