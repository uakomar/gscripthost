function resetLastExecutionDate() {
    PropertiesService.getUserProperties().deleteProperty("lastExecutionDate");
  }
  
  function getLastExecutionDateTick() {
    var properties = PropertiesService.getUserProperties();
    var ticks = properties.getProperty("lastExecutionDateTicks") || Math.floor((new Date("2024-05-13T17:00").getTime()/1000)).toString();
    Logger.log("lastExecutionDateTicks: " + ticks);
    return ticks;
  }
  
  function updateLastExecutionDateTick(ticks) {
    var properties = PropertiesService.getUserProperties();
    properties.setProperty("lastExecutionDateTicks", ticks);
  }
  
  function SaveNewEmailToSpreadsheet()
  {
    var searchQuery = ""; // Replace with the search query to find emails with attachments
    
    var now = new Date();
    var nowTicks = Math.floor(now.getTime()/1000).toString();
    var lastExecutionTime = getLastExecutionDateTick();
  
    var threads = GmailApp.search(searchQuery + " after:" + lastExecutionTime + " before:" + nowTicks);
    for (var i = 0; i < threads.length; i++) {
      var messages = threads[i].getMessages();
      for (var j = 0; j < messages.length; j++) {
        var message = messages[j];
        AddToSpreadsheet(message);
      }
    }
    updateLastExecutionDateTick(nowTicks);
  }
  
  function AddToSpreadsheet(message){
      var dataRow = new Array(1);
      dataRow[0] = new Array(1);
  
      dataRow[0][0] = message.getFrom();
  
      var ss = SpreadsheetApp.openById(spreadSheetId);
  
      var sheet = ss.getSheets()[0];
      sheet.getRange(
        sheet.getLastRow() + 1,
        1,
        1,
        1
      ).setValues(dataRow);
  
  }
  
  
  
  