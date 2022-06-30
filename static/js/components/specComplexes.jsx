function SpecComplexesInfo() {

    let complexName = ["Пресс ЧПУ для ступиц", "ЭПП", "СТП13М"]
    let complexImg = ["../images/press.png", "../images/epp.png", "../images/stp13m.png"]

    let buttonsVrs1 = [-80, 608, 'url("../images/nasos.png") 0% 0% / 60px no-repeat', "../images/1_ploshadka_outside.png", 60, "unset"]
    let buttonsVrs2 = [-1000, 308, 'url("../images/nasos.png") 0% 0% / 60px no-repeat', "../images/2_ploshadka_outside.png", 60, "unset"]
    let buttonsVrs3 = [-1000, 308, 'url("../images/nasos.png") 0% 0% / 60px no-repeat', "../images/2_ploshadka_outside.png", 60, "unset"]

    let [kimData, setKimData] = useState({
        workArray: [],
        pauseArray: [],
        offArray: [],
        avarArray: [],
        ruchnoyArray: [],
        roundArray: []
    });

    let [nk600Data, setNk600Data] = useState({
        workArray: [],
        pauseArray: [],
        offArray: [],
        avarArray: [],
        ruchnoyArray: [],
        roundArray: []
    });

    let [stp13m, setStp13m] = useState({
        workArray: [],
        pauseArray: [],
        offArray: [],
        avarArray: [],
        ruchnoyArray: [],
        roundArray: []
    });


    let [date, setDate] = useState(0);

    useEffect(() => {
        let dateNow = new Date()
        let dayNow = dateNow.getDate()
        let monthNow = dateNow.getMonth() + 1
        let yearNow = dateNow.getFullYear()
        if (dayNow < 10) {
            dayNow = "0" + dayNow
        }
        if (monthNow < 10) {
            monthNow = "0" + monthNow
        }
        setDate(`${yearNow}-${monthNow}-${dayNow}`)


        let roundKim = fetchRequest(`${yearNow}-${monthNow}-${dayNow}`, kimData, 'press', 1)
        let roundNK600 = fetchRequest(`${yearNow}-${monthNow}-${dayNow}`, nk600Data, 'epp', 2)
        let roundStp13m = fetchRequest(`${yearNow}-${monthNow}-${dayNow}`, stp13m, 'stp13m', 3)


        let promiseDataKim = Promise.resolve(roundKim);
        let promiseDataNK600 = Promise.resolve(roundNK600);
        let promiseDataStp13m = Promise.resolve(roundStp13m);
        //Общая загрузка
        promiseDataKim.then(value => {
            promiseDataNK600.then(value1 => {
                promiseDataStp13m.then(value2 => {

                    let intKimArray = value.roundArray.map(Number)
                    let intNK600Array = value1.roundArray.map(Number)
                    let intStp13mArray = value2.roundArray.map(Number)

                    if (value.roundArray.length == 0) {
                        intKimArray = [0, 0, 0, 0, 0, 0]
                    }
                    if (value1.roundArray.length == 0) {
                        intNK600Array = [0, 0, 0, 0, 0, 0]
                    }
                    if (value2.roundArray.length == 0) {
                        intStp13mArray = [0, 0, 0, 0, 0, 0]
                    }

                    highChartTotal(complexName, [intKimArray[0], intNK600Array[0], intStp13mArray[0]], [intKimArray[1], intNK600Array[1], intStp13mArray[1]],
                        [intKimArray[2], intNK600Array[2], intStp13mArray[2]], [intKimArray[3], intNK600Array[3], intStp13mArray[3]],
                        [intKimArray[4], intNK600Array[4], intStp13mArray[4]], 'ручной')


                    //Количество операций
                    let kolKim = kolOperations(value.workArray)
                    let kolNK600 = kolOperations(value1.workArray)
                    let kolStp13m = kolOperations(value2.workArray)
                    highChartCountOperations(complexName, [kolKim[0], kolNK600[0], kolStp13m[0]], [kolKim[1], kolNK600[1], kolStp13m[1]])


                })

            })
        })


    }, [])

    function newDate(dateInput) {
        setDate(dateInput)
        console.log(dateInput)

        let roundKim = fetchRequest(`${dateInput}`, kimData, 'press', 1)
        let roundNK600 = fetchRequest(`${dateInput}`, nk600Data, 'epp', 2)
        let roundStp13m = fetchRequest(`${dateInput}`, stp13m, 'stp13m', 3)

        let promiseDataKim = Promise.resolve(roundKim);
        let promiseDataNK600 = Promise.resolve(roundNK600);
        let promiseDataStp13m = Promise.resolve(roundStp13m);
        //Общая загрузка
        promiseDataKim.then(value => {
            promiseDataNK600.then(value1 => {
                promiseDataStp13m.then(value2 => {

                    let intKimArray = value.roundArray.map(Number)
                    let intNK600Array = value1.roundArray.map(Number)
                    let intStp13mArray = value2.roundArray.map(Number)

                    if (value.roundArray.length == 0) {
                        intKimArray = [0, 0, 0, 0, 0, 0]
                    }
                    if (value1.roundArray.length == 0) {
                        intNK600Array = [0, 0, 0, 0, 0, 0]
                    }
                    if (value2.roundArray.length == 0) {
                        intStp13mArray = [0, 0, 0, 0, 0, 0]
                    }

                    highChartTotal(complexName, [intKimArray[0], intNK600Array[0], intStp13mArray[0]], [intKimArray[1], intNK600Array[1], intStp13mArray[1]],
                        [intKimArray[2], intNK600Array[2], intStp13mArray[2]], [intKimArray[3], intNK600Array[3], intStp13mArray[3]],
                        [intKimArray[4], intNK600Array[4], intStp13mArray[4]], 'ручной')

                    //Количество операций
                    let kolKim = kolOperations(value.workArray)
                    let kolNK600 = kolOperations(value1.workArray)
                    let kolStp13m = kolOperations(value2.workArray)
                    highChartCountOperations(complexName, [kolKim[0], kolNK600[0], kolStp13m[0]], [kolKim[1], kolNK600[1], kolStp13m[1]])

                })

            })
        })

    }

    function fetchRequest(dateCalendar, complexObject, complexName, idContainer) {
        return fetch(`/api/complexData/${complexName}_days_date:${dateCalendar}`, {method: 'GET'})
            .then((response) => response.json())
            .then((data) => {
                complexObject.workArray = data.work
                complexObject.pauseArray = data.pause
                complexObject.offArray = data.off
                complexObject.avarArray = data.avar
                complexObject.ruchnoyArray = data.nagruzka
                complexObject.roundArray = data.roundData

                setKimData({...complexObject});
                let convertDataWork = pars(complexObject.workArray, 0, dateCalendar)
                let convertDataPause = pars(complexObject.pauseArray, 1, dateCalendar)
                let convertDataOff = pars(complexObject.offArray, 2, dateCalendar)
                let convertDataAvar = pars(complexObject.avarArray, 3, dateCalendar)
                let convertDataRuchnoi = pars(complexObject.ruchnoyArray, 4, dateCalendar)
                highChartSutkiLine(convertDataWork, convertDataPause, convertDataOff, convertDataAvar, convertDataRuchnoi, idContainer)

                let workRound = parseInt(complexObject.roundArray[0]);
                let passRound = parseInt(complexObject.roundArray[1]);
                let offRound = parseInt(complexObject.roundArray[2]);
                let avarRound = parseInt(complexObject.roundArray[3]);
                let nagruzkaRound = parseInt(complexObject.roundArray[4]);
                highChartSutkiRound(workRound, passRound, offRound, avarRound, nagruzkaRound, 'Нагрузка', idContainer)

                return complexObject
            })
    }

    function pars(arrayParse, y, date, arrayName = null) {

        arrayParse = addLastTime(arrayParse, date)

        var index_pars = 0; // Индекс по одному из циклов
        var arraySave = [] // Массив, который будет заполняться

        // Определение длины цикла. Длина парсящего массива делить на 2 - 2. 300 = 148
        var lengh = arrayParse.length
        if (lengh <= 1) {
            return
        }

        if (lengh >= 4) {
            if (lengh % 2 == 1) lengh -= 1
            lengh = (lengh - lengh % 2) / 2
        } else lengh = 1

        // Если имя программы не передано в функцию, то массив формируется без нее
        if (arrayName == null) {
            while (index_pars < lengh) {   // Парсинг
                arraySave.push({
                    x: (new Date(arrayParse[index_pars * 2])).getTime(),
                    x2: (new Date(arrayParse[index_pars * 2 + 1])).getTime(),
                    y: y
                })
                index_pars += 1;
            }
        }
        // Иначе в массив парсится переданный массив с именем программы
        else {
            while (index_pars < lengh) {   // Парсинг
                arraySave.push({
                    x: (new Date(arrayParse[index_pars * 2])).getTime(),
                    x2: (new Date(arrayParse[index_pars * 2 + 1])).getTime(),
                    y: y,
                    programname: arrayName[index_pars]
                })
                index_pars += 1;
            }
        }
        // Функция возвращает массив коллекциями, содержащими 2 или 3 объекта.
        arraySave = addLastTime(arraySave, date)

        return arraySave
    }

    function addLastTime(stanok, calendarDate) {

        let time = new Date(new Date().toString().split('GMT')[0] + ' UTC').toISOString();
        time = time.slice(0, 10) + " " + time.slice(11, 19);

        if (stanok.length % 2 == 1) {
            if (calendarDate == time.slice(0, 10)) {   // То добавить во вторую смену текущее время
                stanok.push(calendarDate + " " + time.slice(11, 19))
            } else {
                stanok.push(calendarDate + ' 23:59:59')
            }
        }

        return stanok
    }

    // Функция вычисляет количества операций, аргумент массив работы
    function kolOperations(arrayWork) {

        let index_pars = 0; // Индекс по одному из циклов
        let array_kol_op = [0, 0];

        // Определение длины цикла. Длина парсящего массива делить на 2 - 2. 300 = 148
        let lengh = arrayWork.length
        if (lengh <= 1) {
            return [0, 0]
        }

        if (lengh >= 4) {
            if (lengh % 2 == 1) lengh -= 1
            lengh = (lengh - lengh % 2) / 2
        } else lengh = 1

        while (index_pars < lengh) {   // Условие обычной операции
            if (new Date(arrayWork[index_pars * 2]).getTime() !== (new Date(arrayWork[index_pars * 2 + 1])).getTime()) {
                array_kol_op[0] += 1;
            }

            // Условие обычной больше 180 секунд(3 минуты)
            if ((new Date(arrayWork[index_pars * 2 + 1])).getTime() - (new Date(arrayWork[index_pars * 2])).getTime() > 180000) {
                array_kol_op[1] += 1;
            }

            index_pars += 1;
        }
        return [array_kol_op[0], array_kol_op[1]];
    }

    return (
        <div>

            <DayCalendar newDate={newDate} date={date}/>

            <div className='complexAllInfo'>
                <div className='totalRound' id="containerTotal"></div>

                <div className='countOperations' id='containerOperations'></div>

            </div>

            <div className='complexAllInfo' id={'containerTotal'}>
                <ComplexInfo complexName={complexName[0]} complexImg={complexImg[0]} complexMesto={buttonsVrs1}/>
                <div className="lineSukiHighChart" id="containerLine1"></div>
                <div className="roundSukiHighChart" id="containerRound1"></div>
            </div>

            <div className='complexAllInfo'>
                <ComplexInfo complexName={complexName[1]} complexImg={complexImg[1]} complexMesto={buttonsVrs2}/>
                <div className="lineSukiHighChart" id="containerLine2"></div>
                <div className="roundSukiHighChart" id="containerRound2"></div>
            </div>

            <div className='complexAllInfo'>
                <ComplexInfo complexName={complexName[2]} complexImg={complexImg[2]} complexMesto={buttonsVrs3}/>
                <div className="lineSukiHighChart" id="containerLine3"></div>
                <div className="roundSukiHighChart" id="containerRound3"></div>
            </div>

        </div>
    )

}

function SpecComplexes() {

    return (
        <div>

            <Header/>

            <MenuStanki menuSelected="specComplexes"/>

            <div className="buttons-otchet">

                <Link to="/stanki/specComplexes">
                    <div className="menuSelect">СУТОЧНЫЙ ОТЧЕТ</div>
                </Link>

                <Link to="/stanki/specComplexesMonth">
                    <div className="menuNoSelect">МЕСЯЧНЫЙ ОТЧЕТ</div>
                </Link>

            </div>

            <SpecComplexesInfo/>

        </div>
    )
}