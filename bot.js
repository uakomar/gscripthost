function doPost(e) {
    console.log(e);
  
    if (!e || !e.postData) {
      HtmlService.createHtmlOutput("No Data received");
    }
    
    console.log(e.postData);
  
    var data = JSON.parse(e.postData.contents);
    console.log(data);
  
    if (data.message) {
      var chatId = data.message.chat.id;
      var botId = "unknown";
      var senderId = data.message.from.id;
  
      if(botId == senderId)
      {
        HtmlService.createHtmlOutput("Ignored");
      }
  
      /*
      var response = callHuggingFace(data.message.text);
      sendMessage(chatId, response);
      */
  
      sendMessage(chatId, "привіт");
    }
    return HtmlService.createHtmlOutput("OK");
  }
  
  
  function setWebhook() {
  
    var options = {
      "method": "post"
    };
    // var deployment_URL = "";
    UrlFetchApp.fetch("https://api.telegram.org/bot"+token+"/setWebhook?url="+ deployment_URL, options);
  
  }
  
  
  function sendMessage(chatId, messageText) {
    var url = "https://api.telegram.org/bot" + token + "/sendMessage";
    var payload = {
      "chat_id": chatId,
      "text": messageText
    };
  
    var options = {
      "method": "post",
      "contentType": "application/json",
      "payload": JSON.stringify(payload)
    };
  
    UrlFetchApp.fetch(url, options);
  }