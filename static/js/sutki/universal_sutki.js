function pars(arrayParse, lengh, y, arrayName=null)
{
    var index = 0; // Индекс по одному из циклов
    var arraySave = [] // Массив, который будет заполняться

    // Определение длины цикла. Длина парсящего массива делить на 2 - 2. 300 = 148
    // lengh = (arrayParse.length)/2-2

    // Если имя программы не передано в функцию, то массив формируется без нее
    if (arrayName == null){
        while(index <= lengh)
        {   // Парсинг
            arraySave.push({x:(new Date(arrayParse[index*2])).getTime(), x2:(new Date(arrayParse[index * 2 + 1])).getTime(), y:y})
            index += 1;
        }
    }
    // Иначе в массив парсится переданный массив с именем программы
    else {
        while(index <= lengh)
        {   // Парсинг
            arraySave.push({x:(new Date(arrayParse[index*2])).getTime(), x2:(new Date(arrayParse[index * 2 + 1])).getTime(), y:y, programname:arrayName[index]})
            index += 1;
        }
    }
    // Функция возвращает массив коллекциями, содержащими 2 или 3 объекта.
    return arraySave
}

// Получение текущего времяни в формате toISO
var time = new Date(new Date().toString().split('GMT')[0] + ' UTC').toISOString();
// Преобразоавние времение в формат '2022-03-21 10:00:35'
time = time.slice(0, 10) + " " + time.slice(11, 19);
// Время, которое будет переписано в массивах 'текущая дата 23:59:59'
time_miss = time.slice(0, 10) + " " + "23:59:59";

function timeReplace(dataArray) {
    // индекс ограничение, чтобы не обрабатывать 5-ый массив с именем программы
    var index = 0;
    // выполнять если текущие время не равно 23:59:59
    if (time != time_miss) {
        // пробег по массивам до массива с именем программы
        while (index < 5) {
            $.each(dataArray[index], function (i) {
                // если в массиве время равно текущей дате 23:59:59
                if (dataArray[index][i] == time_miss) {
                    // то записать в него значение предыдущего индекса
                    dataArray[index][i-1] = time
                }
            });
            // после оконачния цикла each перейти к следующему массиву
            index += 1;
        }
    }
}
