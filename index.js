var con = []
function sendMessage() {
        
        var userInput = document.getElementById("user-input").value;
        if (userInput !== "" && con.length <= 20) {
          addUserMessage(userInput);
          con.push({"role": "user", "content": userInput})
          console.log(20 - con.length/2 + 1)
        }
        else{
          return false
        }
        document.getElementById("seed").disabled = true;
        document.getElementById("user-input").value = "";
        
        $.ajax({
          url: "https://oa.api2d.net/v1/chat/completions",
          type: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer fk202577-stNwU8r2VJSLlcJkOPqvWBmIaAK7NhiS",
          },
          data: JSON.stringify({
            model: "gpt-3.5-turbo",
            messages: con,
          }),
          success: function (data) {
            con.push({"role": "assistant", "content": data.choices[0].message.content})
            console.log(data);
            addBotMessage(data.choices[0].message.content);
            console.log("success");
            document.getElementById("seed").disabled = false;
          },
          error: function (data) {
            console.log(data);
            document.getElementById("seed").disabled = false;
            addBotMessage("对话失败，请重试");
          },
        });
        console.log(con)
}
function addUserMessage(message) {
        var chatBody = document.getElementById("chat-body");
        var userMessage = document.createElement("div");
        userMessage.classList.add("chat-message", "user-message");
        userMessage.textContent = message;
        chatBody.appendChild(userMessage);
        chatBody.scrollTop = chatBody.scrollHeight; // 自动滚动到底部
}
function addBotMessage(message) {
        var chatBody = document.getElementById("chat-body");
        var botMessage = document.createElement("div");
        botMessage.classList.add("chat-message", "bot-message");
        botMessage.textContent = message;
        chatBody.appendChild(botMessage);
        chatBody.scrollTop = chatBody.scrollHeight; // 自动滚动到底部
}
