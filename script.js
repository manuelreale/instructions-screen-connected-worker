let currentStep = 0;
let currentFlow = 0;

document.onkeypress = function (e) {
    e = e || window.event;
    receiveJSON(1, 0)
};

// createOptions(currentStep);
// changeText(currentStep);

receiveJSON(0, 0);

function clearOptions(){
    document.querySelectorAll(".option").forEach(e => e.remove());
    document.querySelectorAll(".optional").forEach(e => e.remove());
    document.querySelectorAll("h5").forEach(e => e.remove());
}

function createOptions(message){
    let options = document.getElementById("options");
    clearOptions();
    let control = message.Controls;

    for(let i=0; i<control.length; i++){
        createOption(message, i);
    }

    
    if(message.Optional){
        let optionalContent = message.Optional;
        let optional = document.createElement("h5");
        optional.innerHTML = "Optional";
        options.appendChild(optional);

        for(let i=0; i<optionalContent.length; i++){
            createOptional(message, i);
        }
    }
}

function createOption(message, n){
    let control = message.Controls[n];

    let options = document.getElementById("options");
    let option = document.createElement("div");
    let textDiv = document.createElement("div");
    option.classList.add("option")
    option.classList.add(control.Type)

    let icon = document.createElement("i");
    icon.classList.add("fa-sharp", "fa-regular");
    

    let p = document.createElement("p");
    p.innerHTML= control.Text
    textDiv.appendChild(icon);
    textDiv.appendChild(p)
    option.appendChild(textDiv);

    if(control.Media=="feed"){
        let feed = document.createElement("video");
        let source = document.createElement("source");
        source.src="./video.mp4";
        source.type="video/mp4";

        feed.autoplay=true;
        feed.loop=true;
        feed.muted=true;

        feed.appendChild(source);
        option.appendChild(feed);
    }


    options.appendChild(option);
}

function createOptional(message, n){
    let control = message.Optional[n];

    let options = document.getElementById("options");
    let optional = document.createElement("div");
    optional.classList.add("optional");
    optional.classList.add(control.Type)

    let icon = document.createElement("i");
    icon.classList.add("fa-sharp", "fa-regular");
    optional.appendChild(icon);

    let p = document.createElement("p");
    p.innerHTML= control.Text
    optional.appendChild(p);
    options.appendChild(optional);
}

function changeText(message){
    // let stepContent = currentStepContent();
    // let flow= document.getElementById("flow");
    // flow.textContent=content.Flow;

    let title= document.getElementById("title");
    title.textContent=message.Title;

    let instructions= document.getElementById("instructions");
    instructions.textContent=message.Instructions;
}

function hide(){
    // let bg0 = document.getElementById("bg0");
    // let bg1 = document.getElementById("bg1");

    let top = document.getElementById("top");
    let options = document.getElementById("options");
    let bg = document.getElementById("background");

    bg.classList.add("highlight")

    // bg0.classList.add("hide");
    // bg1.classList.add("hide");

    top.classList.add("hide");
    options.classList.add("hide");

}

function show(){
    // let bg0 = document.getElementById("bg0");
    // let bg1 = document.getElementById("bg1");

    let top = document.getElementById("top");
    let options = document.getElementById("options");
    let bg = document.getElementById("background");

    setTimeout(function(){bg.classList.remove("highlight")}, 2200);

    

    // bg0.classList.remove("hide");
    // bg1.classList.remove("hide");

    top.classList.remove("hide");
    options.classList.remove("hide");
}

function nextStep(){
    hide();
    currentStep++;

    setTimeout(function() {
        createOptions(); 
        changeText();
    }, 2000);

    setTimeout(show, 2100);
}

function changeStep(flow, step){
    currentFlow=flow;
    currentStep=step;
    hide();

    if(currentStepContent().AnimationType=="Instant"){
        setTimeout(function() {
            createOptions(); 
            changeText();
        }, 800);
    
        setTimeout(show, 900);
    }
}

// function currentStepContent(){
//     return content[currentFlow].Steps[currentStep];
// }

function receiveJSON(flow, step){
    message = content[flow].Steps[step];
    hide();

    setTimeout(function() {
        createOptions(message); 
        changeText(message);
    }, 800);

    if(message.AnimationType=="Instant"){
        setTimeout(show, 2000);
    }
}

function receiveMQTT(messageString){
    let message = JSON.parse(messageString);

    // message = content[flow].Steps[step];
    hide();

    setTimeout(function() {
        createOptions(message); 
        changeText(message);
    }, 800);

    if(message.AnimationType=="Instant"){
        setTimeout(show, 2000);
    }
}

function finish(){
    setTimeout(show, 100);
}