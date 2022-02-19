//upload function

let form = document.querySelector('#upload');
let file = document.querySelector('#file');
let exportButton = document.getElementById('exportButton');

form.addEventListener('submit', handleUpload);

function handleUpload(event) {
    event.preventDefault();

    if (!file.value.length) return;

    let reader = new FileReader();
    reader.onload = logFile;
    reader.readAsText(file.files[0]);
}

function logFile(event) {
    let str = event.target.result;
    let json = JSON.parse(str);
    CreateTableFromJSON(json);
}

function CreateTableFromJSON(json) {
    var myJSON = json;

    // EXTRACT VALUE FOR HTML HEADER.
    // ('Book ID', 'Book Name', 'Category' and 'Price')
    var col = [];
    for (var i = 0; i < myJSON.length; i++) {
        for (var key in myJSON[i]) {
            if (col.indexOf(key) === -1) {
                col.push(key);
            }
        }
    }

    // CREATE DYNAMIC TABLE.
    var table = document.createElement('table');

    // CREATE HTML TABLE HEADER ROW USING THE EXTRACTED HEADERS ABOVE.

    var tr = table.insertRow(-1); // TABLE ROW.

    for (var i = 0; i < col.length; i++) {
        var th = document.createElement('th'); // TABLE HEADER.
        th.innerHTML = col[i];
        tr.appendChild(th);
    }

    // ADD JSON DATA TO THE TABLE AS ROWS.
    for (var i = 0; i < myJSON.length; i++) {
        tr = table.insertRow(-1);

        for (var j = 0; j < col.length; j++) {
            var tabCell = tr.insertCell(-1);
            tabCell.innerHTML = myJSON[i][col[j]];
        }
    }

    // FINALLY ADD THE NEWLY CREATED TABLE WITH JSON DATA TO A CONTAINER.
    var divContainer = document.getElementById('showData');
    divContainer.innerHTML = '';
    divContainer.appendChild(table);
}

//TO-DO export function
