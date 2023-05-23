function sendMessage() {
        var con = con
        var userInput = document.getElementById("user-input").value;
        if (userInput !== "") {
          addUserMessage(userInput);
          con.push({"role": "user", "content": userInput})
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
