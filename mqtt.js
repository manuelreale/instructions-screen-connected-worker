function startConnect(){

    clientID = "clientID - "+parseInt(Math.random() * 100);

    host = "192.168.200.178";
    port = "9001";
    userId  = "";  
    passwordId = "";   

    console.log("Connecting to " + host + "on port " +port);
    console.log("Using the client Id " + clientID);

    client = new Paho.MQTT.Client(host,Number(port),clientID);

    client.onConnectionLost = onConnectionLost;
    client.onMessageArrived = onMessageArrived;

    client.connect({
        onSuccess: onConnect
//        userName: userId,
 //       passwordId: passwordId
    });
}

startConnect();


function onConnect(){
    topic = "#"
    console.log("Subscribing to topic " + topic);

    client.subscribe(topic);
}



function onConnectionLost(responseObject){
    console.log("ERROR: Connection is lost.");
    if(responseObject !=0){
        console.log("ERROR: "+ responseObject.errorMessage);
    }
}

function onMessageArrived(message){
    // receiveJSON(1, 0);
    receiveMQTT(message.payloadString);
    console.log("OnMessageArrived: "+message.payloadString);
    console.log("Topic: "+message.destinationName+"| Message : "+message.payloadString);
}

function startDisconnect(){
    client.disconnect();
    console.log("Disconnected.");
}

function publishMessage(){

msg = "test";
topic = "topic";

Message = new Paho.MQTT.Message(msg);
Message.destinationName = topic;

client.send(Message);
console.log("Message to topic "+topic+" is sent ");

}