function DataTable(config, data) {
    const columns = [{title: '№', value: 'index'}, ...config.columns];
    const columnsWithValues = columns.map((column) => {
        const values = data.map((val) => val[column.value]);
        return {column: column.title, values};
    });
    /* indexing */
    const maxLength = columnsWithValues.reduce((max, column) => Math.max(max, column.values.length)
        , 0);
    columnsWithValues[0].values = Array.from({
            length: maxLength
        },
        (_, index) => index + 1);
    const table = document.createElement("table");
    table.createTHead();
    const tbody = table.createTBody();
    const trHead = table.insertRow();
    const trBody = Array.from({
        length: maxLength
    }, (_) => table.insertRow());
    columnsWithValues.forEach(((column) => {
        const th = document.createElement("th");
        th.appendChild(document.createTextNode(column.column));
        trHead.appendChild(th);
        column.values.forEach((value, index) => trBody[index].insertCell().appendChild(document.createTextNode(value)));
    }));
    trBody.forEach((el) => tbody.appendChild(el));
    document.querySelector(config.parent).appendChild(table);
}

const config1 = {
    parent: '#usersTable',
    columns: [
        {title: 'Ім’я', value: 'name'},
        {title: 'Прізвище', value: 'surname'},
        {title: 'Вік', value: 'age'},
    ]
};

const users = [
    {id: 30050, name: 'Вася', surname: 'Петров', age: 12},
    {id: 30051, name: 'Вася', surname: 'Васечкін', age: 15},
    {id: 30051, name: 'Вася', surname: 'Васечкін', age: 15},
    {id: 30051, name: 'Вася', surname: 'Васечкін', age: 15},
];

DataTable(config1, users);

/** Table with tabulator */
let table = new Tabulator("#example-table", {
    data:users, //assign data to table
    layout:"fitColumns", //fit columns to width of table (optional)
    columns:[ //Define Table Columns
        {title:"№", field: "index", formatter:"rownum"},
        {title:"Ім’я", field:"name"},
        {title:"Прізвище", field:"surname"},
        {title:"Вік", field:"age"},
    ],
});