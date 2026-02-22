const trainingData = [];

const humanBox = document.createElement("input");
humanBox.type = "text";
humanBox.placeholder = "Ask the AI something...";
document.body.appendChild(humanBox);
humanBox.addEventListener("input", () => {

});
const button = document.createElement("button");
button.textContent = "Send to AI";

button.addEventListener("click", () => {
    printText("You said: " + humanBox.value);
    printText("AI says: " + aiReply(humanBox.value));
});

document.body.appendChild(button);

function printText(text) {
    const line = document.createElement("div");
    line.textContent = text;
    document.body.appendChild(line);
}
function train(input, output) {
    trainingData.push({
        input: input.toLowerCase(),
        output: output
    })
}

const aiIn = document.createElement("input");
aiIn.type = "text";
aiIn.placeholder = "Ask a human question...";
document.body.appendChild(aiIn);
aiIn.addEventListener("input", () => { });

const aiOut = document.createElement("input");
aiOut.type = "text";
aiOut.placeholder = "AI says...";
document.body.appendChild(aiOut);
aiOut.addEventListener("input", () => { });

const buttonTrain = document.createElement("button");
buttonTrain.textContent = "Train AI";

buttonTrain.addEventListener("click", () => {
    train(aiIn.value, aiOut.value)
    printText("Training Complete")
});

document.body.appendChild(buttonTrain);

function aiReply(text) {
    text = text.toLowerCase();
    for (let data of trainingData) {
        if (text.includes(data.input)) {
            return data.output;
        }
    }
    return ("I do not understand that question yet");
}



    humanBox.style.marginBottom = "10px";

button.style.marginLeft = "10px"
button.style.marginBottom = "20px";

aiIn.style.display = "block";
aiIn.style.marginTop = "200px"
aiIn.style.marginBottom = "10px";

aiOut.style.display =
    aiOut.style.marginBottom = "10px";


buttonTrain.style.display = "block";
buttonTrain.style.marginBottom = "20px";
