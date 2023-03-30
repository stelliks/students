const tableHeaders = ['Имя', 'Фамилия', 'Возраст', 'Учится', 'Год Зачисления']
let studentsArr = [
    {
        name: 'Вовчик',
        surname: 'Залупкин',
        age: '78',
        learn: false,
        yearOfAdmission: '1986'
    }, {
        name: 'Олег',
        surname: 'Подзаборный',
        age: '17',
        learn: true,
        yearOfAdmission: '2022'
    }, {
        name: 'Дима',
        surname: 'Ололошин',
        age: '23',
        learn: true,
        yearOfAdmission: '2020'
    }, {
        name: 'Снежана',
        surname: 'Раздавалова',
        age: '49',
        learn: false,
        yearOfAdmission: '1993'
    }, {
        name: 'Андрей',
        surname: 'Хуйпобреев',
        age: '31',
        learn: true,
        yearOfAdmission: '2019'
    }, {
        name: 'Оляша',
        surname: 'Косовзглядова',
        age: '19',
        learn: true,
        yearOfAdmission: '2023'
    }
]

function getArr() {
    let inputAll = Array.from(document.querySelectorAll('#forms input, #forms select'));
    let obj = {};
    let checkFieldsLength = inputAll.every((el) => el.value.length);

    if (checkFieldsLength) {
        for (const input of inputAll) {
            if (input.tagName === 'SELECT') {
                obj[input.id] = input.value === 'true';
            } else {
                obj[input.id] = input.value;
            }
        }
        studentsArr.push(obj);
        console.log(studentsArr);
        createBodyTable()

        return alert('Зачислен!');
    }
    return alert('Не все поля заполнены');
}


//создаем шапку
function createTable(headers) {
    const table = document.createElement('table')
    table.id = 'table'

    const thead = document.createElement('thead')
    thead.id = 'thead'

    const tr = document.createElement('tr')

    for (let i = 0; i < headers.length; i++) {
        const th = document.createElement('th')
        th.textContent = headers[i]
        if (headers[i] === tableHeaders[2] || headers[i] === tableHeaders[4]) {
            th.dataset.type = 'number'
        }
        else {
            th.dataset.type = 'string'
        }
        tr.appendChild(th)
    }

    thead.appendChild(tr)
    table.appendChild(thead)
    document.body.appendChild(table)
}
createTable(tableHeaders)

// let delTab = function(){tbody .remove()}


//создаем тело таблицы
let createBodyTable = function () {
    let tbody = document.createElement('tbody')
    tbody.id = 'tbody'

    if (document.getElementById("tbody") !== null) {
        tbody.remove()
        console.log('123');
    }
    else {
        for (let student of studentsArr) {
            let tr = document.createElement('tr');

            let td1 = document.createElement('td');
            td1.textContent = student.name;
            tr.appendChild(td1);
            let td2 = document.createElement('td');
            td2.textContent = student.surname;
            tr.appendChild(td2);
            let td3 = document.createElement('td');
            td3.textContent = student.age;
            tr.appendChild(td3);
            let td4 = document.createElement('td');
            td4.textContent = student.learn ? 'да' : 'нет';
            tr.appendChild(td4);
            let td5 = document.createElement('td');
            td5.textContent = student.yearOfAdmission
            tr.appendChild(td5);

            tbody.appendChild(tr);
            console.log('321');
        }
    }
    table.appendChild(tbody);
}
createBodyTable()




table.onclick = function (e) {
    if (e.target.tagName != 'TH') return;
    let th = e.target;
    sortGrid(th.cellIndex, th.dataset.type);
};

function sortGrid(colNum, type) {
    let tbody = table.querySelector('tbody')
    let rowsArray = Array.from(tbody.rows)
    let compare

    switch (type) {
        case 'number':
            compare = function (rowA, rowB) {
                return rowA.cells[colNum].innerHTML - rowB.cells[colNum].innerHTML
            }
            break
        case 'string':
            compare = function (rowA, rowB) {
                return rowA.cells[colNum].innerHTML > rowB.cells[colNum].innerHTML ? 1 : -1
            }
            break
    }

    // сортировка
    rowsArray.sort(compare)
    tbody.append(...rowsArray)
}
