const fileUpload = document.getElementById('fileUpload');
const fileContentPre = document.getElementById('fileContentPre');
const p5jsContainer = document.getElementById('p5jsContainer');
fileUpload.addEventListener('change', handleFileUpload);


function handleFileUpload(event) {
    const file = event.target.files[0];
    if (file) {
        let reader = new FileReader();
        reader.onload = function (e) {
            const fileContent = e.target.result;
            // displayFileContent(fileContent);
            runP5js(fileContent)
        };
        reader.readAsText(file);
    }
}
function displayFileContent(content) {
    fileContentPre.textContent = content;
    console.log(content);
}
function runP5js(code){
    const script = document.createElement('script');
    script.type='text/javascript';
    script.text=code;
    p5jsContainer.appendChild(script);

    console.log(p5jsContainer.firstChild.text);
}