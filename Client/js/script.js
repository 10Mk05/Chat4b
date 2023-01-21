



$(window).on("load", function () {
    GetUserIP().then((ip) => { storeValue("ip", ip); });
    
    //keepAlive function
    setInterval(function () {
        let message = {
            "operation": "keepAlive",
            "username": getStoredValue("username"),
            "ip": getStoredValue("ip"),
            "receiver": "server",
            "data": "keepAlive"
        }
        sendToServer(JSON.stringify(message));
    }, 10000);

});


socket.addEventListener('open', (event) => {
    
    
  });

socket.addEventListener('message', (event) => {
    console.log(event.data);
    operation = JSON.parse(event.data).operation;
    username = JSON.parse(event.data).username;
    ip = JSON.parse(event.data).ip;
    receiver = JSON.parse(event.data).receiver;
    data = JSON.parse(event.data).data;

    switch(operation){
        case "login":
            if(data == "success"){
                window.location.pathname = 'Client/chat.html';
                storeValue("username", username);
            }else{
                alert("Login failed");
            }
            break;
        case "register":
            if(data == "success"){
                window.location.pathname = 'Client/chat.html';
            }else{
                alert("Register failed");
            }
            break;
        case "message":
            if(receiver == "server"){
                alert("Message from server: " + data);
            }else{
                alert("Message from " + username + ": " + data);
            }
            break;
            default:
                console.log(data);
    }
})


let sendToServer = (message) => {
    socket.send(message);
}

let sendMessage = (message, receiver) => {
    let messageObject = {
        "operation": "message",
        "username": getStoredValue("username"),
        "ip": getStoredValue("ip"),
        "receiver": receiver,
        "data": message
    }
    console.log(messageObject);
    sendToServer(JSON.stringify(messageObject));
}

let login = () => {
    let username = document.getElementById("username").value;
    let password = document.getElementById("password").value;
    let message = {
        "operation": "login",
        "username": username,
        "ip": getStoredValue("ip"),
        "receiver": "server",
        "data": password

    }
    sendToServer(JSON.stringify(message));
}

let getMessages = () => {
    let message = {
        "operation": "getMessages",
        "username": getStoredValue("username"),
        "ip": getStoredValue("ip"),
        "receiver": "server",
        "data": "getMessages"

    }
    sendToServer(JSON.stringify(message));
}

let register = () => {
    let username = document.getElementById("username1").value;
    let password = document.getElementById("password1").value;
    let message = {
        "operation": "register",
        "username": username,
        "ip": getStoredValue("ip"),
        "receiver": "server",
        "data": password

    }
    sendToServer(JSON.stringify(message));
}

async function GetUserIP(){
    //get the ip of the user
    var ip = "xxx.xxx.xxx.xxx";
    await $.getJSON('https://api.ipify.org?format=jsonp&callback=?', function(data) {
        ip = data.ip;
    });
    return Promise.resolve(ip);
  }

  
