function DataTable(config) {
    const columns = [{title: '№', value: 'index'}, ...config.columns];
    getDataByUrl(config.apiUrl).then(resp =>
        generateColumnsWithValues(resp, columns))
        .then(columns => addDeleteButton(columns, config))
        .then(columns => generateTable(columns, config));
    document.querySelector(`${config.parent}`).addEventListener('click', (e) => {
        const target = e.target;
        if (target.tagName === 'BUTTON') {
            let targetId = target.id;
            if (targetId.startsWith('delete')) {
                deleteUser(targetId.slice(7)); // 7 - length of 'delete-'
            }
        }
    })
}

async function getDataByUrl(url) {
    return await fetch(url).then((resp) => resp.json()).then(json => json.data);
}

function generateColumnsWithValues(resp, columns) {
    const columnsWithValues = columns.map((column) => {
        return {column: column.title, values: Object.values(resp).map((val) => val[column.value])}
    });
    columnsWithValues[0].values = Object.keys(resp);
    return columnsWithValues;
}

const table = document.createElement("table");

function generateTable(columnsWithValues, config) {
    config.tableLength = columnsWithValues.reduce((max, column) => Math.max(max, column.values.length), 0);
    table.createTHead();
    const tbody = table.createTBody();
    const trHead = table.createTHead();
    const trBody = Array.from({
        length: config.tableLength
    }, (_) => table.insertRow());
    columnsWithValues.forEach(column => {
        const th = document.createElement("th");
        th.appendChild(document.createTextNode(column.column));
        trHead.appendChild(th);
        column.values.forEach((value, index) => {
            let cell = trBody[index].insertCell();
            if (value instanceof HTMLElement) {
                cell.appendChild(value);
            } else if (value.endsWith('.jpg')) {
                let img = document.createElement('img');
                img.setAttribute('src', value);
                cell.appendChild(img);
            } else {
                cell.appendChild(document.createTextNode(value));
            }
        });
    });
    trBody.forEach((el) => tbody.appendChild(el));
    document.querySelector(config.parent).appendChild(table);
}

function addDeleteButton(columnsWithValues, config) {
    columnsWithValues.push({
        column: 'Delete',
        values: columnsWithValues[0].values.map((row) => {
            const btn = document.createElement("button");
            btn.setAttribute('id', `delete-${row}`);
            btn.innerText = 'Delete';
            return btn;
        })
    });
    return columnsWithValues;
}

const tableConfig = {
    parent: '#usersTable',
    columns: [
        {title: 'Name', value: 'name'},
        {title: 'Surname', value: 'surname'},
        {title: 'Avatar', value: 'avatar'},
        {title: 'Birthday', value: 'birthday'}
    ],
    apiUrl: 'https://mock-api.shpp.me/rhrebenozhko/users'
};

DataTable(tableConfig);

async function deleteUser(id, config) {
    await fetch(`${config.apiUrl}/${id}`, {
        method: 'DELETE'
    }).then(() => window.location.reload())
}

const btn = document.getElementById("add-btn");
btn.addEventListener("click", () => {
    btn.remove();
    const newRow = table.insertRow(0);
    newRow.setAttribute('id', 'add-record-row');
    tableConfig.columns.forEach((column, index) => {
        let inputField = document.createElement('input');
        inputField.setAttribute('type', 'text');
        inputField.setAttribute('placeholder', column.title);
        inputField.setAttribute('name', column.value);
        let cell = newRow.insertCell(index);
        cell.appendChild(inputField);
    })
    let btnCell = newRow.insertCell(newRow.cells.length);
    let newBtn = document.createElement('button');
    newBtn.innerText = 'Add';
    newBtn.addEventListener('click', () => addRecord(newRow));
    btnCell.appendChild(newBtn);
})

function addRecord(newRow) {
    let data;
    try {
        data = [...newRow.cells].map(cell => cell.children[0])
            .filter(e => e.getAttribute('type') === 'text')
            .reduce((acc, inputField) => {
            if (inputField.getAttribute('name') && inputField.value) {
                inputField.style.outline = 'initial';
                acc[inputField.getAttribute('name')] = inputField.value;
                return acc;
            } else {
                inputField.style.outline = '2px solid red';
                throw new Error(`Field ${inputField.getAttribute('name')} is not set`);
            }
        }, {});
    } catch (e){
        console.error(e);
        return;
    }
    fetch(tableConfig.apiUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
        .then(response => response.json())
        .then(data => {
            console.log('Success:', data);
        })
        .catch(error => {
            console.error('Error:', error);
        });
}