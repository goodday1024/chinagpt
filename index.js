var con = []
var n = 0
var sk = ""
function sendMessage() {
  
  var userInput = document.getElementById("user-input").value;
  if (userInput !== "" && con.length <= 20 && sk !== null) {
    addUserMessage(userInput);
    con.push({ "role": "user", "content": userInput })
  }
  else {
    alert("内容为空或者已达上限")
    if (con.length <= 20 && localStorage.getItem("sk") == null){
      pay()
      key()
    }
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

      con.push({ "role": "assistant", "content": data.choices[0].message.content })
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
  console.log(20 - (con.length + 1) / 2)
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
  else {
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
  else {
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
      instruction: "请修改文本中的拼写错误",
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
function key() {
  if (sk == "" && localStorage.getItem("sk") == null) {
    sk = prompt("请输入密钥")
    $.ajax({
      url: "https://chnkfdq5g6h5fqe8sg9g.baseapi.memfiredb.com/storage/v1/object/sign/key/%5BGPT%E5%AF%86%E9%92%A5%5D-100%E6%9D%A1-%E5%85%A8%E9%83%A8%E5%8D%A1%E5%AF%86-20230525121002.txt?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJrZXkvW0dQVOWvhumSpV0tMTAw5p2hLeWFqOmDqOWNoeWvhi0yMDIzMDUyNTEyMTAwMi50eHQiLCJpYXQiOjE2ODUwMTQ3NzgsImV4cCI6MjAwMDM3NDc3OH0.x7CjwHL6PiVl9y0LPoNr6EUlu_k2WDjmBP6GRrHh4pY",
      type: "GET",
      datatype: "json",
      success: function (data) {
        let arr = data.split("\n")
        //遍历并判断是否与输入一样
        for (let i = 0; i < arr.length; i++) {
          let key = arr[i].substr(0,arr[i].length-1)
          if (" " + sk == key) {
            localStorage.setItem("sk", sk)
            alert("密钥正确")
            console.log("密钥正确")
            return true
          }
        }
        alert("密钥错误")
        return false
      }
    })
  }
}
