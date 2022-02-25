//upload function

let form = document.querySelector('#upload');
let file = document.querySelector('#file');
let exportButton = document.getElementById('exportButton');

form.addEventListener('submit', handleUpload);

function handleUpload(event) {
    event.preventDefault();

    if (!file.value.length) {
        alert('No file uploaded or File is empty');
        return;
    }

    let reader = new FileReader();
    reader.onload = logFile;
    reader.readAsText(file.files[0]);
    exportButton.addEventListener('click', exportTableToExcel);
}

function logFile(event) {
    let str = event.target.result;
    let json = JSON.parse(str);
    CreateTableFromJSON(json);
}

function CreateTableFromJSON(json) {
    var myJSON = json;

    //creating header
    var col = [];
    for (var i = 0; i < myJSON.length; i++) {
        for (var key in myJSON[i]) {
            if (col.indexOf(key) === -1) {
                col.push(key);
            }
        }
    }

    var table = document.createElement('table');
    var tr = table.insertRow(-1);

    for (var i = 0; i < col.length; i++) {
        var th = document.createElement('th');
        th.innerHTML = col[i];
        tr.appendChild(th);
    }

    // adding JSON data to the table as rows
    for (var i = 0; i < myJSON.length; i++) {
        tr = table.insertRow(-1);

        for (var j = 0; j < col.length; j++) {
            var tabCell = tr.insertCell(-1);
            tabCell.innerHTML = myJSON[i][col[j]];
        }
    }

    var divContainer = document.getElementById('showData');
    divContainer.innerHTML = '';
    divContainer.appendChild(table);
}

//export-function

function exportTableToExcel(showData, filename = '') {
    let downloadLink;
    let dataType = 'application/vnd.ms-excel';
    let tableSelect = document.getElementById('showData');
    let tableHTML = tableSelect.outerHTML.replace(/ /g, '%20');

    // Specify file name
    filename = filename ? filename + '.xls' : 'excel_data.xls';

    // Create download link element
    downloadLink = document.createElement('a');

    document.body.appendChild(downloadLink);

    if (navigator.msSaveOrOpenBlob) {
        var blob = new Blob(['\ufeff', tableHTML], {
            type: dataType,
        });
        navigator.msSaveOrOpenBlob(blob, filename);
    } else {
        // Create a link to the file
        downloadLink.href = 'data:' + dataType + ', ' + tableHTML;

        // Setting the file name
        downloadLink.download = filename;

        //triggering the function
        downloadLink.click();
    }
}
