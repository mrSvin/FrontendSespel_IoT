// fetch запрос объекта в форме массива
function makeRequestArray(Name) {
    let time = (new Date(new Date().toString().split('GMT')[0] + ' UTC').toISOString()).slice(0, 10);
    let url = `/api/complexData/${Name}_days_date:${time}`

    return fetch(url, {
        method: 'GET'
    })
        .then(response => response.json())
        // Получение массива с полями
        .then(response => [response.work, response.pause, response.off, response.avar, response.nagruzka, response.programName, response.roundData])
}

// Запись данных в переменную
// с возможностью реализовать дальнейшую
// логику
function rewriteData(promiseVariable) {
    promiseVariable
        .then(result => {
            // console.log(result)
            Diagram = result;
            // Дальнейшая логика
            return Diagram
            //
        })
        .then(
            result => {
                // Не обязательное сообщение
                console.log('Все данные выведены', result);
            }
        )
        .catch(err => {
            console.error(err);
        });
}

// fetch запрос объекта в форме объекта
function makeRequestObject(Name) {
    let time = (new Date(new Date().toString().split('GMT')[0] + ' UTC').toISOString()).slice(0, 10);
    let url = `/api/complexData/${Name}_days_date:${time}`

    return fetch(url, {
        method: 'GET'
    })
        .then(response => response.json())
        .then((result) =>
        {
            // Создание пустого объекта
            let object = {}
            // Создание полей объекта
            object[Name] = {'work':null, 'off':null, 'avar':null, 'nagruzka':null, 'progamName':null, 'roundData':null}
            // Заполнение объекта
            object[Name]['work'] = result.work
            object[Name]['pause'] = result.pause
            object[Name]['off'] = result.off
            object[Name]['avar'] = result.avar
            object[Name]['nagruzka'] = result.nagruzka
            object[Name]['programName'] = result.programName
            object[Name]['roundData'] = result.roundData
            return object
        })
}

function rewriteDataObject(promiseVariable) {
    promiseVariable
        .then(result => {
            let objectKeys = result.map(item => Object.keys(item)[0])
            objectKeys.forEach(item=> Diagram[item]=null)
            objectKeys.forEach((item, i)=> Diagram[item]=result[i][item])
            return Diagram

        })
        .then(result => {console.log('Конец', result)
         })


        .catch(err => {
            console.error(err);
        });
}

// function ArrayToObject(Names) {
//     let back = {}
//     Names.forEach((item)=>{
//         let field = item;
//         let value = []
//         back[field] = value
//     })
//     return back
// }

// let object = ArrayToObject(Names)

let Names = ['navigator_1', 'navigator_2_golova_2', 'navigator_3']


let stanki = Promise.all(Names.map(item=>{
    return makeRequestArray(item)
}));

let Diagram = []
rewriteData(stanki)

// let stanki = Promise.all(Names.map(item=>{
//     return makeRequestObject(item)
// }));
//
// let Diagram = {}
// rewriteDataObject(stanki)


function FormTable(tableID='myTable', names=[], ruch=5) {
    for (let i = document.getElementById(tableID).getElementsByTagName('tr').length -1; i; i--) {
        document.getElementById(tableID).deleteRow(i);
    }

    let programTimeTable = document.getElementById('myTable')
    let categories = ['УФ5220', 'СТП Сеспель', 'NTX1000', 'SK50', 'APEC', 'DMU50 #3', 'DMU50 #4', 'CTX310 #2', 'CTX510 #2', 'CTX510 #3', 'CTX310 #3', 'CTX510 #4', 'CTX510 #5', 'DMC1035 #2', 'DMU50 #5','DMU50 #6','DMU50 #7', 'AR55']

    // Переменная для кратной записи
    let tableRow = null

    // индекс последней строки
    let lastRow = null

    // индекс последней ячейки
    let lastCell = null

    // переменная для краткой записи к телу таблицы
    let tbody = programTimeTable.querySelector('tbody')

    categories.forEach((elem, index) => {

            // добавляем новую строку
            tbody.appendChild(document.createElement('tr'));

            // Получаем все строки в теле
            tableRow = tbody.querySelectorAll('tr')

            // считываем длины строк и ячеек
            lastRow = tbody.rows.length -1
            lastCell = tableRow[lastRow].cells.length - 1

            console.log(tableRow[lastRow])

            tableRow[lastRow].appendChild(document.createElement('td'))

            tableRow[lastRow].querySelectorAll('td')[0].textContent = elem



            for(let i=1; i<=ruch; i++)
            {
                // добавляем в последнюю строку новую ячейку
                tableRow[lastRow].appendChild(document.createElement('td'))

                // обновляем индекс последней ячейки
                lastCell = tableRow[lastRow].cells.length - 1

                // записываем в последюю ячейку первый элемент  массива
               // tableRow[lastRow].querySelectorAll('td')[lastCell].textContent = elem[i]
            }

        })
    // Пробегаемся по всем элементам массива

    let linear_rabota = []
    let linear_pause = []
    let linear_off = []
    let linear_avar = []
    let linear_nagruzka = []
    let linear_kalibrovka = []
    let koef = []

    // Функция парсинга элементов массива на диаграмму и таблицу
    Diagram.map((element, index) => {
        // Если массив станка приходит пустым или нулевым, то записываем в диаграмму нули и следующий цикл
        if ((element === null) || (element == 0)) {
            linear_rabota.push(0);
            linear_pause.push(0);
            linear_off.push(0);
            linear_avar.push(0);
            linear_nagruzka.push(0);
            linear_kalibrovka.push(0);
            koef.push(0)
            return
        }
        else {
            // Иначе, объявляем массив круговой диаграммы из 6-го массива станка.
            let roundDiagram = element[6];

            // Если этот массив пустой или нулевой, то записываем в диаграмму нули и следующий цикл
            if ((roundDiagram == 0) || (roundDiagram === null)) {
                linear_rabota.push(0);
                linear_pause.push(0);
                linear_off.push(0);
                linear_avar.push(0);
                linear_nagruzka.push(0);
                linear_kalibrovka.push(0);
                koef.push(0)
                return
            }

            // Иначе, преобразовываем массив из строк в целые числа
            else {
                // Преобразование элементов круговой диаграммы из строк в числа
                roundDiagram = roundDiagram.map(item=>{
                    return parseInt(item)
                })

                if (index !== 1) {
                    // Затем вычисляем работу без нагрузки для линейной диаграммы, кроме APEC
                    roundDiagram[0] = roundDiagram[0] - roundDiagram[4];
                }

                // Условие для записи APEC, у которого записывается калибровка, а нагрузка ноль
                if (index === 1) {
                    linear_rabota.push(Array(1).fill(roundDiagram[0]));
                    linear_pause.push(Array(1).fill(roundDiagram[1]));
                    linear_off.push(Array(1).fill(roundDiagram[2]));
                    linear_avar.push(Array(1).fill(roundDiagram[3]));
                    linear_kalibrovka.push(Array(1).fill(roundDiagram[4]));
                    linear_nagruzka.push(0);
                    //Вычисление коэффициента APEC
                    koef.push((roundDiagram[0] + roundDiagram[1] + roundDiagram[2] + roundDiagram[3] + roundDiagram[4]) / 100);
                }

                // Для другого станка калибровка всегда ноль, а нагрузка записывается
                else {
                    linear_rabota.push(Array(1).fill(roundDiagram[0]));
                    linear_pause.push(Array(1).fill(roundDiagram[1]));
                    linear_off.push(Array(1).fill(roundDiagram[2]));
                    linear_avar.push(Array(1).fill(roundDiagram[3]));
                    linear_nagruzka.push(Array(1).fill(roundDiagram[4]));
                    linear_kalibrovka.push(0);
                    //Вычисление коэффициента конкретного станка
                    koef.push((roundDiagram[0] + roundDiagram[1] + roundDiagram[2] + roundDiagram[3] + roundDiagram[4]) / 100);
                }

                // Затем цикл, для заполнения таблицы. Index - станок, i - столбец.
                // Так, как первые три станка не в массиве +4
                roundDiagram.forEach()
                $.each(roundDiagram, function (i) {
                    // Условие для APEC
                    if (index === 1) {
                        // Если столбец - нагрузка
                        if (i === 4) {
                            // То, вместо столбца нагрузка записать значение в следующий столбец - Ручной режим(i + 2)
                            table[index + 1].cells[i + 2].innerHTML = Math.round(roundDiagram[i] / koef[index] * 10) / 10 + "%";
                        }
                        else {
                            // Иначе записывать в таблицу без изменений(i + 1)
                            table[index + 1].cells[i + 1].innerHTML = Math.round(roundDiagram[i] / koef[index] * 10) / 10 + "%";
                        }
                    }
                    else {
                        // Иначе, если станок не APEC, записывать в таблицу без изменений(i + 1)
                        table[index + 1].cells[i + 1].innerHTML = Math.round(roundDiagram[i] / koef[index] * 10) / 10 + "%";
                    }
                }); // Конец цикла записи в таблицу

            } // Конец условия, если roundDiagram не пустой
        } // Конец условия, если Diagram[index] не пустой
    }); // Конец функции $.map(Diagram)




}
FormTable()

// Запись в таблицу станков, которые не записываются в массив Diagram
table = document.getElementById('myTable').rows; // Обращение к таблице по ID

// Коэффициент для вычисления записей в таблице
var koef = []





