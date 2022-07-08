function msToTimeDays(duration) {
    let seconds = parseInt((duration / 1000) % 60),
        minutes = parseInt((duration / (1000 * 60)) % 60),
        hours = parseInt((duration / (1000 * 60 * 60)) % 24),
        days = parseInt((duration / (1000 * 60 * 60 * 24 )))

    return days + " дней " + hours + " ч. " + minutes + " мин. " + seconds + ' с.';
}

function pars(arrayParse, y, difference=null) {

    var index_pars = 0; // Индекс по одному из циклов
    var arraySave = [] // Массив, который будет заполняться

    // Если имя программы не передано в функцию, то массив формируется без нее
    if (difference == null){
        if(arrayParse.length == 1){
            arraySave.push({
                x:(new Date(arrayParse[0])).getTime(),
                x2:((new Date(arrayParse[0])).getTime()+86400000),
                y:y
            })
        }
        else if(arrayParse.length % 2 == 0){
            for(let i = 0; i<arrayParse.length-1; i++){
                arraySave.push({
                    x:(new Date(arrayParse[i])).getTime(),
                    x2:(new Date(arrayParse[i+1])).getTime(),
                    y:y
                })
            }
        }
        else {
            for(let i = 0; i<arrayParse.length-1; i++){
                if(i == arrayParse.length-1)
                {
                    arraySave.push({
                        x:(new Date(arrayParse[i])).getTime(),
                        x2:(new Date(arrayParse[i])).getTime(),
                        y:y
                    })
                }
                else {
                    arraySave.push({
                        x: (new Date(arrayParse[i])).getTime(),
                        x2: (new Date(arrayParse[i + 1])).getTime(),
                        y: y
                    })
                }
            }
        }
    }
    // Иначе в массив парсится переданный массив с именем программы
    else {
        while(index_pars < arrayParse.length)
        {   // Парсинг
            arraySave.push({
                x:(new Date(arrayParse[index_pars*2])).getTime(),
                x2:(new Date(arrayParse[index_pars * 2 + 1])).getTime(),
                y:y,
                partialFill: difference})
            index_pars += 1;
        }
    }
    // Функция возвращает массив коллекциями, содержащими 2 или 3 объекта.
    return arraySave
}

function convertDaysToSmena(day1, day2) {
    let smena1
    let smena2
    return [smena1, smena2]
}
