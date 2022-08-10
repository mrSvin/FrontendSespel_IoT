// Функия обработки массива обещаний для смен
function updateLoadSmenaData(promiseVariable, day1, complexName, complexRequest) {
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

function Meh1Smena() {


    let complexName = ["УВФ-1 1", "УВФ-1 2", "NTX1000", "NLX3000", "GAMMA2000", "CTX650", "DMF260", "DMU50 1", "DMU50 2", "DMC1035", "CTX310 1", "CTX510 1"]
    let complexImg = ["../images/uvf_1_2.png", "../images/uvf_1_2.png", "../images/ntx1000.png", "../images/NLX3000.png", "../images/gamma2000.png", "../images/dmg_ctx650.png",
        "../images/dmg_dmf260.png", "../images/dmg_dmu50.png", "../images/dmg_dmu50.png", "../images/dmg_dmc1035.png", "../images/dmg_ctx310.png", "../images/dmg_ctx510.png"]

    let namesToFetch = ['uvf_1', 'uvf_2', 'ntx1000', 'nlx3000', 'dmg_gamma2000', 'dmg_ctx650', 'dmg_dmf260', 'dmg_dmu50_1', 'dmg_dmu50_2', 'dmg_dmc1035', 'dmg_ctx310_1',
        'dmg_ctx510_1']


    let buttonsVrs1 = [-340, 280, 'url(../images/uvf_1_2.png) no-repeat', "../images/meh_ceh.png", 40, "unset"]
    let buttonsVrs2 =  [-180, 280, 'url(../images/uvf_1_2.png) no-repeat', "../images/meh_ceh.png", 40, "unset"]
    let buttonsVrs3 = [-670, 490, 'url(../images/ntx1000.png) no-repeat', "../images/meh_ceh.png", 40, "unset"]
    let buttonsVrs4 = [-590, 310, 'url(../images/NLX3000.png) no-repeat', "../images/meh_ceh.png", 40, "unset"]
    let buttonsVrs5 = [-840, 520, 'url(../images/gamma2000.png) no-repeat', "../images/meh_ceh.png", 60, "unset"]
    let buttonsVrs6 = [-500, 310, 'url(../images/dmg_ctx650.png) no-repeat', "../images/meh_ceh.png", 40, "unset"]
    let buttonsVrs7 = [-780, 200, 'url(../images/dmg_dmf260.png) no-repeat', "../images/meh_ceh.png", 40, "unset"]
    let buttonsVrs8 = [-500, 115, 'url(../images/dmg_dmu50.png) no-repeat', "../images/meh_ceh.png", 40, "unset"]
    let buttonsVrs9 = [-410, 115, 'url(../images/dmg_dmu50.png) no-repeat', "../images/meh_ceh.png", 40, "unset"]
    let buttonsVrs10 = [-590, 115, 'url(../images/dmg_dmc1035.png) no-repeat', "../images/meh_ceh.png", 40, "unset"]
    let buttonsVrs11 = [-590, 470, 'url(../images/dmg_ctx310.png) no-repeat', "../images/meh_ceh.png", 40, "unset"]
    let buttonsVrs12 = [-490, 470, 'url(../images/dmg_ctx510.png) no-repeat', "../images/meh_ceh.png", 40, "unset"]
    let [date, setDate] = useState(0);

    // let bufferData = bufferDataArrays(13)

    useEffect(() => {
        let dateInput = dayNow()
        setDate(dateInput)

        let stankiRequest = Promise.all(namesToFetch.map((item)=>{
            return fetchRequestSmena(dateInput, item)
        }));

        updateLoadSmenaData(stankiRequest, dateInput, complexName, namesToFetch)

    }, [])

    // Функция для изменения даты в календаре
    function newDate(dateInput) {
        setDate(dateInput)

        let stankiRequest = Promise.all(namesToFetch.map((item)=>{
            return fetchRequestSmena(dateInput, item)
        }));

        updateLoadSmenaData(stankiRequest, dateInput, complexName, namesToFetch)
    }

    return (
        <div>

            <MenuStanki menuSelected="meh1"/>

            <div className="buttons-otchet">

                <Link to="/stanki/meh1">
                    <div className="menuNoSelect">СУТОЧНЫЙ ОТЧЕТ</div>
                </Link>

                <Link to="/stanki/meh1Month">
                    <div className="menuNoSelect">МЕСЯЧНЫЙ ОТЧЕТ</div>
                </Link>

                <Link to="/stanki/meh1Smena">
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
                                 complexMesto={buttonsVrs1} 
                                 size={"meh1"} idContainer={1} service={complexName[0]}/>

            <ComplexSmenaAllIngo complexName={complexName[1]} complexImg={complexImg[1]}
                                 complexMesto={buttonsVrs2} 
                                 size={"meh1"} idContainer={3} service={complexName[1]}/>

            <ComplexSmenaAllIngo complexName={complexName[2]} complexImg={complexImg[2]}
                                 complexMesto={buttonsVrs3} alarm={complexName[2]}
                                 size={"meh1"} idContainer={5} service={complexName[2]}/>

            <ComplexSmenaAllIngo complexName={complexName[3]} complexImg={complexImg[3]}
                                 complexMesto={buttonsVrs4} alarm={complexName[3]}
                                 size={"meh1"} idContainer={7} service={complexName[3]}/>

            <ComplexSmenaAllIngo complexName={complexName[4]} complexImg={complexImg[4]}
                                 complexMesto={buttonsVrs5} alarm={complexName[4]}
                                 size={"meh1"} idContainer={9} service={complexName[4]}/>

            <ComplexSmenaAllIngo complexName={complexName[5]} complexImg={complexImg[5]}
                                 complexMesto={buttonsVrs6} alarm={complexName[5]}
                                 size={"meh1"} idContainer={11} service={complexName[5]}/>

            <ComplexSmenaAllIngo complexName={complexName[6]} complexImg={complexImg[6]}
                                 complexMesto={buttonsVrs7} alarm={complexName[6]}
                                 size={"meh1"} idContainer={13} service={complexName[6]}/>
   
            <ComplexSmenaAllIngo complexName={complexName[7]} complexImg={complexImg[7]}
                                 complexMesto={buttonsVrs8} alarm={complexName[7]}
                                 size={"meh1"} idContainer={15} service={complexName[7]}/>

                                 
            <ComplexSmenaAllIngo complexName={complexName[8]} complexImg={complexImg[8]}
                                 complexMesto={buttonsVrs9} alarm={complexName[8]}
                                 size={"meh1"} idContainer={17} service={complexName[8]}/>

                                 
            <ComplexSmenaAllIngo complexName={complexName[9]} complexImg={complexImg[9]}
                                 complexMesto={buttonsVrs10} alarm={complexName[9]}
                                 size={"meh1"} idContainer={19} service={complexName[9]}/>
                                 
            <ComplexSmenaAllIngo complexName={complexName[10]} complexImg={complexImg[10]}
                                 complexMesto={buttonsVrs11} alarm={complexName[10]}
                                 size={"meh1"} idContainer={21} service={complexName[10]}/>
                                 
            <ComplexSmenaAllIngo complexName={complexName[11]} complexImg={complexImg[11]}
                                 complexMesto={buttonsVrs12} alarm={complexName[11]}
                                 size={"meh1"} idContainer={23} service={complexName[11]}/>

        </div>
    )

}
