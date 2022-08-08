// Функия обработки массива обещаний для смен
function updateLoadSmenaData(promiseVariable, day1, complexName) {
    promiseVariable
        .then(result => {
            let data = result.map(e=>{
                return [[e.work.slice(), e.pause.slice(), e.off.slice(), e.avar.slice(), e.nagruzka.slice(), e.programName.slice()],
                    [e.work2.slice(), e.pause2.slice(), e.off2.slice(), e.avar2.slice(), e.nagruzka2.slice(),  e.programName2.slice()]]
            })

            let smenaArrays = data.map(e=>{
                return convertDaysToSmena(e[0], e[1], day1)
            })

            let totalArray = []
            let kolOpArray = []

            let day2 = dayYesterday(day1)

            let parserDataArray =  smenaArrays.map(smena=>{

                let convertDataWork = parseLinearSutki(smena[0][0], 1, day1, smena[0][5])
                let convertDataPause = parseLinearSutki(smena[0][1], 2, day1)
                let convertDataOff = parseLinearSutki(smena[0][2], 3, day1)
                let convertDataAvar = parseLinearSutki(smena[0][3], 4, day1)
                let convertDataRuchnoi = parseLinearSutki(smena[0][4], 0, day1)

                let convertDataWork2 = parseLinearSutki(smena[1][0], 1, day2, smena[1][5])
                let convertDataPause2 = parseLinearSutki(smena[1][1], 2, day2)
                let convertDataOff2 = parseLinearSutki(smena[1][2], 3, day2)
                let convertDataAvar2 = parseLinearSutki(smena[1][3], 4, day2)
                let convertDataRuchnoi2 = parseLinearSutki(smena[1][4], 0, day2)


                let roundArray = smena[0][6]
                let roundArray2 = smena[1][6]

                totalArray.push(smena[0][6].slice())
                totalArray.push(smena[1][6].slice())
                kolOpArray.push(kolOperations(smena[0][0]).slice())
                kolOpArray.push(kolOperations(smena[1][0]).slice())

                return [[convertDataWork, convertDataPause, convertDataOff, convertDataAvar, convertDataRuchnoi, roundArray],
                    [convertDataWork2, convertDataPause2, convertDataOff2, convertDataAvar2, convertDataRuchnoi2, roundArray2]]

            })

            highChartSmenaTotalKolOp(totalArray, kolOpArray, complexName, day1)

            // console.log('Проверка, два массивая с данными',parserDataArray)

            parserDataArray.forEach((e, i)=>{
                let idContainer = (i * 2) + 1

                // Первая смена
                highChartSutkiLine(e[0][0], e[0][1], e[0][2], e[0][3], e[0][4], exceptionManualNagruzka(complexRequest[i]), idContainer)
                highChartRound(e[0][5][0], e[0][5][1], e[0][5][2], e[0][5][3], e[0][5][4], exceptionManualNagruzka(complexRequest[i]), idContainer)

                // Первая вторая
                highChartSutkiLine(e[1][0], e[1][1], e[1][2], e[1][3], e[1][4], exceptionManualNagruzka(complexRequest[i]), idContainer + 1)
                highChartRound(e[1][5][0], e[1][5][1], e[1][5][2], e[1][5][3], e[1][5][4], exceptionManualNagruzka(complexRequest[i]), idContainer + 1)

            })
        })
        .catch(err => {
            console.error(err);
        });
}

function highChartSmenaTotalKolOp(total, kolOp, complexName, day1){

    // переменные для переформирования данных 2-х смен
    let work = [[],[],]
    let pause = [[],[],]
    let off = [[],[],]
    let avar = [[],[],]
    let nagruzka = [[],[],]

    let shortOp = [[],[],]
    let longOp = [[],[],]

    // переформирования данных
    total.forEach((e,i) => {
        if(!Array.isArray(e) || e.includes(undefined)){
            work[i%2].push(0)
            pause[i%2].push(0)
            off[i%2].push(0)
            avar[i%2].push(0)
            nagruzka[i%2].push(0)
        }
        else{
            work[i%2].push(e[0])
            pause[i%2].push(e[1])
            off[i%2].push(e[2])
            avar[i%2].push(e[3])
            nagruzka[i%2].push(e[4])
        }
    })

    kolOp.forEach((e,i) => {
        if(!Array.isArray(e) || e.includes(undefined)){
            shortOp[i%2].push(0)
            longOp[i%2].push(0)
        }
        else{
            shortOp[i%2].push(e[0])
            longOp[i%2].push(e[1])
        }
    })

    // вторая смена, всегда за предыдущий день, date всегда 12 часов
    highChartTotal(complexName, work[0], pause[0], off[0], avar[0], nagruzka[0], 'Нагрузка', 12)
    highChartCountOperations(complexName, shortOp[0], longOp[0])

    // первая смена в date передается текущая дата с календаря
    highChartTotal(complexName, work[1], pause[1], off[1], avar[1], nagruzka[1], 'Нагрузка', day1, '2')
    highChartCountOperations(complexName, shortOp[1], longOp[1], '2')
}

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

        let stankiRequest = Promise.all(namesToFetch.map((item)=>{
            return fetchRequestSmena(dateInput, item)
        }));

        updateLoadSmenaData(stankiRequest, dateInput, complexName)

    }, [])

    // Функция для изменения даты в календаре
    function newDate(dateInput) {
        setDate(dateInput)

        let stankiRequest = Promise.all(namesToFetch.map((item)=>{
            return fetchRequestSmena(dateInput, item)
        }));

        updateLoadSmenaData(stankiRequest, dateInput, complexName)
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
