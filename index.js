var con = []
function sendMessage() {
        
        var userInput = document.getElementById("user-input").value;
        if (userInput !== "" && con.length <= 20) {
          addUserMessage(userInput);
          con.push({"role": "user", "content": userInput})
          
        }
        else{
          alert("内容为空或者已达上限")
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
            con.pop()
            console.log(data);
            document.getElementById("seed").disabled = false;
            addErrorMessage("对话失败，请重试");
          },
        });
        console.log(con)
        console.log(20 - (con.length+1)/2)
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
function addErrorMessage(message) {
        var chatBody = document.getElementById("chat-body");
        var errorMessage = document.createElement("div");
        errorMessage.classList.add("chat-message", "error-message");
        errorMessage.textContent = message;
        chatBody.appendChild(errorMessage);
        chatBody.scrollTop = chatBody.scrollHeight; // 自动滚动到底部
}
function sendImage() {
        
        var userInput = document.getElementById("user-input").value;
        if (userInput !== "" && con.length <= 20) {
          addUserText(userInput)
        }
        else{
          alert("内容为空或者已达上限")
          return false
        }
        document.getElementById("seed").disabled = true;
        document.getElementById("user-input").value = "";
        
        $.ajax({
          url: "https://openai.api2d.net/v1/images/generations",
          type: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer fk202577-stNwU8r2VJSLlcJkOPqvWBmIaAK7NhiS",
          },
          data: JSON.stringify({
            "prompt": userInput,
            "n": 1,
            "size": "256x256",
            "response_format": "url"
          }),
          success: function (data) {
            console.log(data);
            addBotImage(data.data[0].url);
            console.log("success");
            document.getElementById("seed").disabled = false;
            window.open(data.data[0].url)
          },
          error: function (data) {
            console.log(data);
            document.getElementById("seed").disabled = false;
            addErrorMessage("生成失败，请重试");
          },
        });
}
function addUserText(message) {
        var chatBody = document.getElementById("chat-body");
        var userMessage = document.createElement("div");
        userMessage.classList.add("chat-message", "user-message");
        userMessage.textContent = message;
        chatBody.appendChild(userMessage);
        chatBody.scrollTop = chatBody.scrollHeight; // 自动滚动到底部
}
function addBotImage(message) {
        var chatBody = document.getElementById("chat-body");
        var botMessage = document.createElement("div");
        botMessage.classList.add("chat-message", "bot-message");
        botMessage.textContent = "🔗图像生成完毕链接为:" + message;
        chatBody.appendChild(botMessage);
        chatBody.scrollTop = chatBody.scrollHeight; // 自动滚动到底部
}
function addErrorImage(message) {
        var chatBody = document.getElementById("chat-body");
        var errorMessage = document.createElement("div");
        errorMessage.classList.add("chat-message", "error-message");
        errorMessage.textContent = message;
        chatBody.appendChild(errorMessage);
        chatBody.scrollTop = chatBody.scrollHeight; // 自动滚动到底部
}
function sendEdit() {
        
        var userInput = document.getElementById("user-input").value;
        if (userInput !== "" && con.length <= 20) {
          addUserEdit(userInput)
        }
        else{
          alert("内容为空或者已达上限")
          return false
        }
        document.getElementById("seed").disabled = true;
        document.getElementById("user-input").value = "";
        
        $.ajax({
          url: "https://openai.api2d.net/v1/edits",
          type: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer fk202577-stNwU8r2VJSLlcJkOPqvWBmIaAK7NhiS",
          },
          data: JSON.stringify({
            input: userInput,
            model: "text-davinci-edit-001",
            n: 1,
            instruction: "修改这个句子或这篇文章的错误",
          }),
          success: function (data) {
            console.log(data);
            addBotEdit(data.choices[0].message.text);
            console.log("success");
            document.getElementById("seed").disabled = false;
          },
          error: function (data) {
            console.log(data);
            document.getElementById("seed").disabled = false;
            addErrorMessage("修改失败，请重试");
          },
        });
}
function addUserEdit(message) {
        var chatBody = document.getElementById("chat-body");
        var userMessage = document.createElement("div");
        userMessage.classList.add("chat-message", "user-message");
        userMessage.textContent = message;
        chatBody.appendChild(userMessage);
        chatBody.scrollTop = chatBody.scrollHeight; // 自动滚动到底部
}
function addBotEdit(message) {
        var chatBody = document.getElementById("chat-body");
        var botMessage = document.createElement("div");
        botMessage.classList.add("chat-message", "bot-message");
        botMessage.textContent = message;
        chatBody.appendChild(botMessage);
        chatBody.scrollTop = chatBody.scrollHeight; // 自动滚动到底部
}
function addErrorEdit(message) {
        var chatBody = document.getElementById("chat-body");
        var errorMessage = document.createElement("div");
        errorMessage.classList.add("chat-message", "error-message");
        errorMessage.textContent = message;
        chatBody.appendChild(errorMessage);
        chatBody.scrollTop = chatBody.scrollHeight; // 自动滚动到底部
}
