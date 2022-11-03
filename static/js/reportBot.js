// Функция формирования таблицы с именами станков
function FormTable(tableID = 'myTable', names = [], ruch = 5) {
    for (let i = document.getElementById(tableID).getElementsByTagName('tr').length - 1; i; i--) {
        document.getElementById(tableID).deleteRow(i);
    }

    let programTimeTable = document.getElementById('myTable')
    let categories = names

    // Переменная для кратной записи
    let tableRow = null

    // индекс последней строки
    let lastRow = null

    // индекс последней ячейки
    let lastCell = null

    let thead = programTimeTable.querySelector('thead')

    // переменная для краткой записи к телу таблицы
    let tbody = programTimeTable.querySelector('tbody')

    if (ruch == 6) {
        if (programTimeTable.querySelectorAll('th').length < 7) {
            thead.querySelector('tr').appendChild(document.createElement('th')).textContent = 'Ручной'
        }

    } else if (programTimeTable.querySelectorAll('th').length == 7) {
        programTimeTable.rows[0].deleteCell(-1);
    }

    categories.forEach((elem, index) => {

        // добавляем новую строку
        tbody.appendChild(document.createElement('tr'));

        // Получаем все строки в теле
        tableRow = tbody.querySelectorAll('tr')

        // считываем длины строк и ячеек
        lastRow = tbody.rows.length - 1
        lastCell = tableRow[lastRow].cells.length - 1

        console.log(tableRow[lastRow])

        tableRow[lastRow].appendChild(document.createElement('td'))

        tableRow[lastRow].querySelectorAll('td')[0].textContent = elem


        for (let i = 1; i <= ruch; i++) {
            // добавляем в последнюю строку новую ячейку
            tableRow[lastRow].appendChild(document.createElement('td'))

            // обновляем индекс последней ячейки
            lastCell = tableRow[lastRow].cells.length - 1

            // записываем в последюю ячейку первый элемент  массива
            // tableRow[lastRow].querySelectorAll('td')[lastCell].textContent = elem[i]
        }

    })
    // Пробегаемся по всем элементам массива
}

// fetch запрос объекта в форме объектов
function makeRequest(Name, date) {
    //let DateCalendar = (new Date(new Date().toString().split('GMT')[0] + ' UTC').toISOString()).slice(0, 10);
    let url = `/api/complexData/${Name}_days_date:${date}`

    return fetch(url, {
        method: 'GET'
    })
        .then(response => response.json())
        // Получение массива с полями
        .then((elem) => {
                return elem
            }
        )
}

// Функция рисования диаграммы
function highChartReportBot(names, colors, seria) {
    Highcharts.chart('container_sum_zagruzka', {
        chart: {
            type: 'column'
        },
        colors: colors,
        title: {
            text: 'Общая загрузка оборудования'
        },
        xAxis: {
            labels: {
                style: {
                    fontSize: '18px',
                }
            },
            categories: names,
        },
        credits: {
            enabled: false
        },
        yAxis: {
            min: 0,
            title: {
                text: '%'
            }
        },
        tooltip: {
            pointFormat: '<span style="color:{series.color}">{series.name}</span>: {point.percentage:.1f}%<br/>',
            shared: true
        },
        plotOptions: {
            column: {
                stacking: 'percent'
            }
        },
        series: seria
    });
}

// Функция сборки данных для таблицы и диаграммы
function buildReportBot(stankiDataArray, names, exception = null) {
    let linear_rabota = []
    let linear_pause = []
    let linear_off = []
    let linear_avar = []
    let linear_nagruzka = []
    let linear_kalibrovka = []

    let koef = []

    let colorsLine = ['#e81e1d', '#000000', '#ffea32', '#207210', '#38e817'];

    let exceptionTrigger = false

    let seria = [{name: 'Авария', data: linear_avar},
        {name: 'Выключен', data: linear_off},
        {name: 'Ожидание', data: linear_pause},
        {name: 'Под нагрузкой', data: linear_nagruzka},
        {name: 'Работа', data: linear_rabota},]

    let totalArray = [linear_rabota, linear_pause, linear_off, linear_avar,
        linear_nagruzka, linear_kalibrovka, koef]

    let table = document.getElementById('myTable').rows; // Обращение к таблице по ID

    // Если true, значит было передано исключение
    let exceptionGoted = (exception !== null)
    if (exceptionGoted) {
        for (let el of exception) {
            if (el.includes('ruchnoi')) {
                exceptionGoted = 'ruchnoi'
                colorsLine.splice(3, 0, '#5c7ed0')
                seria.splice(3, 0, {name: 'Калибровка', data: linear_kalibrovka})
                break
            }
        }
    }

    // Формирование таблицы
    FormTable('myTable', names, colorsLine.length)

    // Заполение данных для таблицы и графиков
    stankiDataArray.forEach((stanok, index) => {
        // если длина круговой диаграммы равна нулю
        // то запрос не прошел удачно
        if (stanok.roundData.length == 0) {
            console.log('Неудачный запрос', index)
            // в общие массивы записываем по одному нулю
            totalArray.forEach(item => item.push(0))
        }
        // Если запрос прошел, то продолжаем работу
        else {
            // режим с исключением
            if (exceptionGoted == 'ruchnoi') {

                for (let el of exception) {
                    if (index == el[0]) {
                        linear_rabota.push(parseInt(stanok.roundData[0]))
                        linear_pause.push(parseInt(stanok.roundData[1]))
                        linear_off.push(parseInt(stanok.roundData[2]))
                        linear_avar.push(parseInt(stanok.roundData[3]))
                        linear_nagruzka.push(0)
                        linear_kalibrovka.push(parseInt(stanok.roundData[4]))
                        exceptionTrigger = true
                        break;
                    }
                    exceptionTrigger = false
                }

                if (exceptionTrigger == false) {
                    // Работа без нагрузки пока закомменчено
                    stanok.roundData[0] = stanok.roundData[0] - stanok.roundData[4];
                    if (stanok.roundData[0] < 0) stanok.roundData[0] = 0

                    linear_rabota.push(parseInt(stanok.roundData[0]))
                    linear_pause.push(parseInt(stanok.roundData[1]))
                    linear_off.push(parseInt(stanok.roundData[2]))
                    linear_avar.push(parseInt(stanok.roundData[3]))
                    linear_nagruzka.push(parseInt(stanok.roundData[4]))
                    linear_kalibrovka.push(0)
                }
            }
            // обычный режим
            else {
                stanok.roundData[0] = stanok.roundData[0] - stanok.roundData[4]
                if (stanok.roundData[0] < 0) stanok.roundData[0] = 0

                linear_rabota.push(parseInt(stanok.roundData[0]))
                linear_pause.push(parseInt(stanok.roundData[1]))
                linear_off.push(parseInt(stanok.roundData[2]))
                linear_avar.push(parseInt(stanok.roundData[3]))
                linear_nagruzka.push(parseInt(stanok.roundData[4]))
            }
            koef.push((parseInt(stanok.roundData[0]) + parseInt(stanok.roundData[1]) + parseInt(stanok.roundData[2]) + parseInt(stanok.roundData[3]) + parseInt(stanok.roundData[4])) / 100);
            stanok.roundData.forEach((item, i) => {

                // Из-за того что круговом массиве теперь 6 переменных
                if (i === 5) return
                if (exceptionGoted == 'ruchnoi' && exceptionTrigger) {
                    // Если столбец - нагрузка
                    if (i === 4) {
                        // То, вместо столбца нагрузка записать значение в следующий столбец - Ручной режим(i + 2)
                        table[index + 1].cells[i + 1].innerHTML = "0%";
                        table[index + 1].cells[i + 2].innerHTML = Math.round(stanok.roundData[i] / koef[index] * 10) / 10 + "%";
                    } else {
                        // Иначе записывать в таблицу без изменений(i + 1)
                        table[index + 1].cells[i + 1].innerHTML = Math.round(stanok.roundData[i] / koef[index] * 10) / 10 + "%";
                        table[index + 1].cells[6].innerHTML = "0%";
                    }
                } else {
                    // Иначе, если станок не APEC, записывать в таблицу без изменений(i + 1)
                    table[index + 1].cells[i + 1].innerHTML = Math.round(stanok.roundData[i] / koef[index] * 10) / 10 + "%";
                    if (exceptionGoted == 'ruchnoi') {
                        table[index + 1].cells[6].innerHTML = "0%";
                    }
                }
            })
        }
        exceptionTrigger = false
    })

    // Рисование графиков
    highChartReportBot(names, colorsLine, seria)
}

// Функция принимающее обещание, как только оно выполнется
// запустится остальная логика, отсюда вызывается функция buildReportBot
function rewriteData(promiseVariable, saver, names, exc = []) {
    promiseVariable
        .then(result => {
            //data = result;
            result.forEach((item, i) => {
                saver[i] = item
            })
            buildReportBot(saver, names, exc)
        })
        .catch(err => {
            console.error(err);
        });
}

