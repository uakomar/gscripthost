function callHuggingFace(prompt) {
    console.log("Calling Personal Assistant");
  
    var systemMessage = "You are Solomiya, a helpful virtual assistant. Speak only Ukrainian.";
    
    var url = "https://router.huggingface.co/sambanova/v1/chat/completions";
    var headers = {
      "Authorization": "Bearer " + hfToken,
      "Content-Type": "application/json"
    };
  
    var messages = [
      {"role": "system", "content": systemMessage},
      {"role": "user", "content": prompt}
    ];
  
    var payload = JSON.stringify({
      "model": "Meta-Llama-3.2-3B-Instruct",
      "messages": messages, // Використовуємо сам messages, а не текстову версію
      "max_tokens": 500,
      "stream": false
    });
  
  
    console.log("Sending Payload: " + payload);
  
    var options = {
      "method": "post",
      "headers": headers,
      "payload": payload,
      "muteHttpExceptions": true
    };
  
    console.log("Sending Request");
  
    var response = UrlFetchApp.fetch(url, options);
  
    console.log(response.getContentText());
  
    var jsonResponse = JSON.parse(response.getContentText());
  
    console.log("Received Response: " + response);
  
    if (jsonResponse.error) {
      return "Error LLM: " + jsonResponse.error;
    }
  
    return jsonResponse.choices?.[0]?.message?.content;
  }