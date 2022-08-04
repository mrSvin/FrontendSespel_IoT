function RezkaSmena() {

    let complexName = ["Навигатор #1", "Навигатор #2", "Навигатор #3", "TruLaser", "Комета #1", "Комета #2", "Комета #3"]
    let complexImg = ["../images/navigator.png", "../images/navigator.png", "../images/navigator.png", "../images/trulaser.png", "../images/kometa.png", "../images/kometa.png", "../images/kometa.png"]
    let namesToFetch = ['navigator_1', 'navigator_2_golova_2', 'navigator_3', 'trulaser', 'kometa_1', 'kometa_2', 'kometa_3']

    let buttonsVrs1 = [-110, 900, 'url(../images/navigator.png) no-repeat', "../images/sbor_ceh.png", 60, "unset"]
    let buttonsVrs2 = [-100, 540, 'url(../images/navigator.png) no-repeat', "../images/sbor_ceh.png", 60, "unset"]
    let buttonsVrs3 = [-200, 220, 'url(../images/navigator.png) no-repeat', "../images/sbor_ceh.png", 50, "unset"]
    let buttonsVrs4 = [-420, 740, 'url(../images/trulaser.png) no-repeat', "../images/sbor_ceh.png", 60, "unset"]
    let buttonsVrs5 = [-382, 190, 'url(../images/kometa.png) no-repeat', "../images/ceh_5.png", 60, "unset"]
    let buttonsVrs6 = [-300, 948, 'url(../images/kometa.png) no-repeat', "../images/sbor_ceh.png", 50, "unset"]
    let buttonsVrs7 = [-340, 870, 'url(../images/kometa.png) no-repeat', "../images/sbor_ceh.png", 50, "unset"]

    let [date, setDate] = useState(0);

    // let bufferData = bufferDataArrays(13)

    useEffect(() => {
        let dateInput = dayNow()
        setDate(dateInput)

        let stankiRequest = Promise.all(namesToFetch.map((item,i)=>{
            return [fetchRequest(dateInput, item), fetchRequest(dayYesterday(dateInput), item)]
        }));

        updateLoadSmenaData(stankiRequest, dateInput, complexName)

    }, [])

    // Функция для изменения даты в календаре
    function newDate(dateInput) {
        setDate(dateInput)

        let stankiRequest = Promise.all(namesToFetch.map((item,i)=>{
            return [fetchRequest(dateInput, item), fetchRequest(dayYesterday(dateInput), item)]
        }));

        updateLoadSmenaData(stankiRequest, dateInput, complexName)
    }

    // Функия обработки массива обещаний для смен
    function updateLoadSmenaData(promiseVariable, day1, complexName) {
        promiseVariable
            .then(result => {
                console.log('Внутри функции')

                // получение предыдуего дня
                let day2 = dayYesterday(day1)
                let trigger = result.length
                // переменные для отрисовки общих диаграм
                let totalArray = [Array(trigger).fill(0),Array(trigger).fill(0),]
                let kolOpArray = [Array(trigger).fill(0),Array(trigger).fill(0),]

                // пробег по всем обещаниям с отрисовкой диаграмм для каждого станка
                result.map((smena, i) => {
                    smena[0].then(value => {
                        smena[1].then(value1 => {
                            smenaBuildHighcharts(value, value1, day1, day2, i, complexName, totalArray,kolOpArray, trigger)
                        })
                    })
                })
            })
            .catch(err => {
                console.error(err);
            });
    }

    // Функция рисования сменных графиков, аргументов конечно очень много, но все крайне необходимы
    function smenaBuildHighcharts(value, value1, day1, day2, idContainer, complexName, total, kolOp, trigger) {

        // получение данных для обеих смен
        let complex1Smena = convertDaysToSmena(value, value1, day1)

        // сохранение данных для общих диаграмм и количества операций
        total[0][idContainer] = complex1Smena[0][6].slice()
        total[1][idContainer] = complex1Smena[1][6].slice()
        kolOp[0][idContainer] = kolOperations(complex1Smena[0][0]).slice()
        kolOp[1][idContainer] = kolOperations(complex1Smena[1][0]).slice()

        //индексация для имен контейнеров: 1, 3, 5...
        idContainer = (idContainer * 2) + 1

        // если это последний цикл то рисуются общие диаграммы
        if(idContainer == (trigger*2)-1){

            // переменные для переформирования данных 2-х смен
            let work = [[],[],]
            let pause = [[],[],]
            let off = [[],[],]
            let avar = [[],[],]
            let nagruzka = [[],[],]
            let shortOp = [[],[],]
            let longOp = [[],[],]

            // переформирования данных
            total[0].forEach(e => {
                work[0].push(e[0])
                pause[0].push(e[1])
                off[0].push(e[2])
                avar[0].push(e[3])
                nagruzka[0].push(e[4])
            })
            total[1].forEach(e => {
                work[1].push(e[0])
                pause[1].push(e[1])
                off[1].push(e[2])
                avar[1].push(e[3])
                nagruzka[1].push(e[4])
            })
            kolOp[0].forEach(e => {
                shortOp[0].push(e[0])
                longOp[0].push(e[1])
            })
            kolOp[1].forEach(e => {
                shortOp[1].push(e[0])
                longOp[1].push(e[1])
            })

            // вторая смена, всегда за предыдущий день, date всегда 12 часов
            highChartTotal(complexName, work[0], pause[0], off[0], avar[0], nagruzka[0], 'Нагрузка', 12)
            highChartCountOperations(complexName, shortOp[0], longOp[0])

            // первая смена в date передается текущая дата с календаря
            highChartTotal(complexName, work[1], pause[1], off[1], avar[1], nagruzka[1], 'Нагрузка', day1, '2')
            highChartCountOperations(complexName, shortOp[1], longOp[1], '2')
        }

        // парсинг данных и отрисовка графиков первой смены текущего станка
        let convertDataRuchnoi = parseLinearSutki(complex1Smena[0][4], 0, day1)
        let convertDataWork = parseLinearSutki(complex1Smena[0][0], 1, day1, complex1Smena[0][5])
        let convertDataPause = parseLinearSutki(complex1Smena[0][1], 2, day1)
        let convertDataOff = parseLinearSutki(complex1Smena[0][2], 3, day1)
        let convertDataAvar = parseLinearSutki(complex1Smena[0][3], 4, day1)
        highChartSutkiLine(convertDataWork, convertDataPause, convertDataOff, convertDataAvar, convertDataRuchnoi, 'Нагрузка', idContainer)
        highChartRound(complex1Smena[0][6][0], complex1Smena[0][6][1], complex1Smena[0][6][2], complex1Smena[0][6][3], complex1Smena[0][6][4], 'Нагрузка', idContainer)

        // парсинг данных и отрисовка графиков второй смены текущего станка
        let convertDataRuchnoi2 = parseLinearSutki(complex1Smena[1][4], 0, day2)
        let convertDataWork2 = parseLinearSutki(complex1Smena[1][0], 1, day2, complex1Smena[1][5])
        let convertDataPause2 = parseLinearSutki(complex1Smena[1][1], 2, day2)
        let convertDataOff2 = parseLinearSutki(complex1Smena[1][2], 3, day2)
        let convertDataAvar2 = parseLinearSutki(complex1Smena[1][3], 4, day2)
        highChartSutkiLine(convertDataWork2, convertDataPause2, convertDataOff2, convertDataAvar2, convertDataRuchnoi2, 'Нагрузка', idContainer + 1)
        highChartRound(complex1Smena[1][6][0], complex1Smena[1][6][1], complex1Smena[1][6][2], complex1Smena[1][6][3], complex1Smena[1][6][4], 'Нагрузка', idContainer + 1)
    }

    return (
        <div>

            <MenuStanki menuSelected="rezka"/>

            <div className="buttons-otchet">

                <Link to="/stanki/rezka">
                    <div className="menuNoSelect">СУТОЧНЫЙ ОТЧЕТ</div>
                </Link>

                <Link to="/stanki/rezkaMonth">
                    <div className="menuNoSelect">МЕСЯЧНЫЙ ОТЧЕТ</div>
                </Link>

                <Link to="/stanki/rezkaSmena">
                    <div className="menuSelect">СМЕННЫЙ ОТЧЕТ</div>
                </Link>

            </div>

            <DayCalendar newDate={newDate} date={date}/>

            <div className='complexAllInfo'>
                <div className='totalRound' id="containerTotal"></div>
                <div className='countOperations' id='containerOperations'></div>
            </div>

            <div className='complexAllInfo'>
                <div className='totalRound' id="containerTotal2"></div>
                <div className='countOperations' id='containerOperations2'></div>
            </div>

            <ComplexSmenaAllIngo complexName={complexName[0]} complexImg={complexImg[0]}
                                 complexMesto={buttonsVrs1} programs={complexName[0]+'smena'}
                                 size={"sborCeh"} idContainer={1} laser={complexName[0]}/>

            <ComplexSmenaAllIngo complexName={complexName[1]} complexImg={complexImg[1]}
                                 complexMesto={buttonsVrs2} programs={complexName[1]+'smena'}
                                 size={"sborCeh"} idContainer={3} laser={complexName[1]}/>

            <ComplexSmenaAllIngo complexName={complexName[2]} complexImg={complexImg[2]}
                                 complexMesto={buttonsVrs3} programs={complexName[2]+'smena'}
                                 size={"sborCeh"} idContainer={5} laser={complexName[2]}/>

            <ComplexSmenaAllIngo complexName={complexName[3]} complexImg={complexImg[3]}
                                 complexMesto={buttonsVrs4} programs={complexName[3]+'smena'}
                                 size={"sborCeh"} idContainer={7} laser={complexName[3]}/>

            <ComplexSmenaAllIngo complexName={complexName[4]} complexImg={complexImg[4]}
                                 complexMesto={buttonsVrs5}
                                 size={"ceh5"} idContainer={9} laser={complexName[4]}/>

            <ComplexSmenaAllIngo complexName={complexName[5]} complexImg={complexImg[5]}
                                 complexMesto={buttonsVrs6}
                                 size={"sborCeh"} idContainer={11} laser={complexName[5]}/>

            <ComplexSmenaAllIngo complexName={complexName[6]} complexImg={complexImg[6]}
                                 complexMesto={buttonsVrs7}
                                 size={"sborCeh"} idContainer={13} laser={complexName[6]}/>

        </div>
    )

}