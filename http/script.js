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

function generateTable(columnsWithValues, config) {
    config.tableLength = columnsWithValues.reduce((max, column) => Math.max(max, column.values.length), 0);
    const table = document.createElement("table");
    table.createTHead();
    const tbody = table.createTBody();
    const trHead = table.insertRow();
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
