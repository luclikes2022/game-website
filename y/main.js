const fileUpload = document.getElementById('fileUpload');
const editor = document.getElementById('editor');
const runBtn = document.getElementById('run-btn');
const output = document.getElementById('output');

fileUpload.addEventListener('change', handleFileUpload);
runBtn.addEventListener('click', runP5jsFromEditor);

function handleFileUpload(event) {
    const file = event.target.files[0];
    if (file) {
        let reader = new FileReader();
        reader.onload = function (e) {
            const fileContent = e.target.result;
            editor.value = fileContent;
        };
        reader.readAsText(file);
    }
}

function runP5jsFromEditor() {
    const userCode = editor.value;
    runP5js(userCode);
}

function runP5js(code) {
    const iframeContent = `
        <html>
            <head>
                <script src="https://cdnjs.cloudflare.com/ajax/libs/p5.js/1.4.0/p5.js"></script>
            </head>
            <body>
                <script>
                    ${code}
                </script>
            </body>
        </html>
    `;
    output.srcdoc = iframeContent;
}
