function pars(arrayParse, y, arrayName=null)
{
    var index = 0; // Индекс по одному из циклов
    var arraySave = [] // Массив, который будет заполняться

    // Определение длины цикла. Длина парсящего массива делить на 2 - 2. 300 = 148
    lengh = (arrayParse.length)/2-2

    // Если имя программы не передано в функцию, то массив формируется без нее
    if (arrayName == null){
        while(index <= lengh)
        {   // Парсинг
            arraySave.push({x:new Date(arrayParse[index*2]), x2:new Date(arrayParse[index * 2 + 1]), y:y})
            index += 1;
        }
    }
    // Иначе в массив парсится переданный массив с именем программы
    else {
        while(index <= lengh)
        {   // Парсинг
            arraySave.push({x:new Date(arrayParse[index*2]), x2:new Date(arrayParse[index * 2 + 1]), y:y, programname:arrayName[index]})
            index += 1;
        }
    }
    // Функция возвращает массив коллекциями, содержащими 2 или 3 объекта.
    return arraySave
}