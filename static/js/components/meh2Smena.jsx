// Функия обработки массива обещаний для смен
// function updateLoadSmenaData(promiseVariable, day1, complexName, complexRequest) {
//     promiseVariable
//         .then(result => {
//             let data = result.map(e=>{
//                 return [[e.work.slice(), e.pause.slice(), e.off.slice(), e.avar.slice(), e.nagruzka.slice(), e.programName.slice()],
//                     [e.work2.slice(), e.pause2.slice(), e.off2.slice(), e.avar2.slice(), e.nagruzka2.slice(),  e.programName2.slice()]]
//             })
//
//             let smenaArrays = data.map(e=>{
//                 return convertDaysToSmena(e[0], e[1], day1)
//             })
//
//             let totalArray = []
//             let kolOpArray = []
//
//             let day2 = dayYesterday(day1)
//
//             let parserDataArray =  smenaArrays.map(smena=>{
//
//                 let convertDataWork = parseLinearSutki(smena[0][0], 1, day1, smena[0][5])
//                 let convertDataPause = parseLinearSutki(smena[0][1], 2, day1)
//                 let convertDataOff = parseLinearSutki(smena[0][2], 3, day1)
//                 let convertDataAvar = parseLinearSutki(smena[0][3], 4, day1)
//                 let convertDataRuchnoi = parseLinearSutki(smena[0][4], 0, day1)
//
//                 let convertDataWork2 = parseLinearSutki(smena[1][0], 1, day2, smena[1][5])
//                 let convertDataPause2 = parseLinearSutki(smena[1][1], 2, day2)
//                 let convertDataOff2 = parseLinearSutki(smena[1][2], 3, day2)
//                 let convertDataAvar2 = parseLinearSutki(smena[1][3], 4, day2)
//                 let convertDataRuchnoi2 = parseLinearSutki(smena[1][4], 0, day2)
//
//
//                 let roundArray = smena[0][6]
//                 let roundArray2 = smena[1][6]
//
//                 totalArray.push(smena[0][6].slice())
//                 totalArray.push(smena[1][6].slice())
//                 kolOpArray.push(kolOperations(smena[0][0]).slice())
//                 kolOpArray.push(kolOperations(smena[1][0]).slice())
//
//                 return [[convertDataWork, convertDataPause, convertDataOff, convertDataAvar, convertDataRuchnoi, roundArray],
//                     [convertDataWork2, convertDataPause2, convertDataOff2, convertDataAvar2, convertDataRuchnoi2, roundArray2]]
//
//             })
//
//             highChartSmenaTotalKolOp(totalArray, kolOpArray, complexName, day1)
//
//             // console.log('Проверка, два массивая с данными',parserDataArray)
//
//             parserDataArray.forEach((e, i)=>{
//                 let idContainer = (i * 2) + 1
//
//                 // Первая смена
//                 highChartSutkiLine(e[0][0], e[0][1], e[0][2], e[0][3], e[0][4], exceptionManualNagruzka(complexRequest[i]), idContainer)
//                 highChartRound(e[0][5][0], e[0][5][1], e[0][5][2], e[0][5][3], e[0][5][4], exceptionManualNagruzka(complexRequest[i]), idContainer)
//
//                 // Первая вторая
//                 highChartSutkiLine(e[1][0], e[1][1], e[1][2], e[1][3], e[1][4], exceptionManualNagruzka(complexRequest[i]), idContainer + 1)
//                 highChartRound(e[1][5][0], e[1][5][1], e[1][5][2], e[1][5][3], e[1][5][4], exceptionManualNagruzka(complexRequest[i]), idContainer + 1)
//
//             })
//         })
//         .catch(err => {
//             console.error(err);
//         });
// }

// function highChartSmenaTotalKolOp(total, kolOp, complexName, day1){
//
//     // переменные для переформирования данных 2-х смен
//     let work = [[],[],]
//     let pause = [[],[],]
//     let off = [[],[],]
//     let avar = [[],[],]
//     let nagruzka = [[],[],]
//
//     let shortOp = [[],[],]
//     let longOp = [[],[],]
//
//     // переформирования данных
//     total.forEach((e,i) => {
//         if(!Array.isArray(e) || e.includes(undefined)){
//             work[i%2].push(0)
//             pause[i%2].push(0)
//             off[i%2].push(0)
//             avar[i%2].push(0)
//             nagruzka[i%2].push(0)
//         }
//         else{
//             work[i%2].push(e[0])
//             pause[i%2].push(e[1])
//             off[i%2].push(e[2])
//             avar[i%2].push(e[3])
//             nagruzka[i%2].push(e[4])
//         }
//     })
//
//     kolOp.forEach((e,i) => {
//         if(!Array.isArray(e) || e.includes(undefined)){
//             shortOp[i%2].push(0)
//             longOp[i%2].push(0)
//         }
//         else{
//             shortOp[i%2].push(e[0])
//             longOp[i%2].push(e[1])
//         }
//     })
//
//     // вторая смена, всегда за предыдущий день, date всегда 12 часов
//     highChartTotal(complexName, work[0], pause[0], off[0], avar[0], nagruzka[0], 'Нагрузка', 12)
//     highChartCountOperations(complexName, shortOp[0], longOp[0])
//
//     // первая смена в date передается текущая дата с календаря
//     highChartTotal(complexName, work[1], pause[1], off[1], avar[1], nagruzka[1], 'Нагрузка', day1, '2')
//     highChartCountOperations(complexName, shortOp[1], longOp[1], '2')
// }

function Meh2Smena() {

    let complexName = ["УФ5220", "СТП Сеспель", "NTX1000 2", "SK50", "APEC", "DMU50 3", "DMU50 4", "CTX310 2", "CTX510 2", "CTX510 3", "CTX310 3", "CTX510 4", "CTX510 5",
        "DMC1035 2", "DMU50 5", "DMU50 6", "DMU50 7", "AR55"]
    let complexImg = ["../images/UVF_5220.png", "../images/progress.png", "../images/ntx1000.png", "../images/sk50.png", "../images/apec.png", "../images/dmg_dmu50.png",
        "../images/dmg_dmu50.png", "../images/dmg_ctx310.png", "../images/dmg_ctx510.png", "../images/dmg_ctx510.png", "../images/dmg_ctx310.png",
        "../images/dmg_ctx510.png", "../images/dmg_ctx510.png", "../images/dmg_dmc1035.png", "../images/dmg_dmu50.png", "../images/dmg_dmu50.png","../images/dmg_dmu50.png", "../images/ar55.png"]
    let namesToFetch = ['uvf5220', 'progress', 'ntx1000_2', 'sk50', 'apec', 'dmg_dmu50_3', 'dmg_dmu50_4', 'dmg_ctx310_2', 'dmg_ctx510_2', 'dmg_ctx510_3', 'dmg_ctx310_3',
        'dmg_ctx510_4', 'dmg_ctx510_5', 'dmg_dmc1035_2', 'dmg_dmu50_5', 'dmg_dmu50_6', 'dmg_dmu50_7', 'ar55']

    let buttonsVrs1 =  [-115, 875, 'url(../images/UVF_5220.png) no-repeat', "../images/ii_ploshadka.png", 40, "unset"]
    let buttonsVrs2 = [-105, 494, 'url(../images/progress.png) no-repeat', "../images/ii_ploshadka.png", 40, "unset"]
    let buttonsVrs3 = [-100, 295, 'url(../images/ntx1000.png) no-repeat', "../images/ii_ploshadka.png", 25, "unset"]
    let buttonsVrs4 = [-100, 597, 'url(../images/sk50.png) no-repeat', "../images/ii_ploshadka.png", 40, "unset"]
    let buttonsVrs5 = [-106, 780, 'url(../images/apec.png) no-repeat', "../images/ii_ploshadka.png", 40, "unset"]
    let buttonsVrs6 = [-65, 295, 'url(../images/dmg_dmu50.png) no-repeat', "../images/ii_ploshadka.png", 25, "unset"]
    let buttonsVrs7 = [-65, 270, 'url(../images/dmg_dmu50.png) no-repeat', "../images/ii_ploshadka.png", 25, "unset"]
    let buttonsVrs8 = [-65, 270, 'url(../images/dmg_ctx310.png) no-repeat', "../images/ii_ploshadka.png", 25, "unset"]
    let buttonsVrs9 = [-101, 106, 'url(../images/dmg_ctx510.png) no-repeat', "../images/ii_ploshadka.png", 25, "unset"]
    let buttonsVrs10 = [-101, 85, 'url(../images/dmg_ctx510.png) no-repeat', "../images/ii_ploshadka.png", 25, "unset"]
    let buttonsVrs11 = [-105, 210, 'url(../images/dmg_ctx310.png) no-repeat', "../images/ii_ploshadka.png", 25, "unset"]
    let buttonsVrs12 = [-105, 235, 'url(../images/dmg_ctx510.png) no-repeat', "../images/ii_ploshadka.png", 25, "unset"]
    let buttonsVrs13 = [-65, 210, 'url(../images/dmg_ctx510.png) no-repeat', "../images/ii_ploshadka.png", 25, "unset"]
    let buttonsVrs14 = [-103, 171, 'url(../images/dmg_dmc1035.png) no-repeat', "../images/ii_ploshadka.png", 25, "unset"]
    let buttonsVrs15 = [-65, 171, 'url(../images/dmg_dmu50.png) no-repeat', "../images/ii_ploshadka.png", 25, "unset"]
    let buttonsVrs16 = [-65, 141, 'url(../images/dmg_dmu50.png) no-repeat', "../images/ii_ploshadka.png", 25, "unset"]
    let buttonsVrs17 = [-102, 143, 'url(../images/dmg_dmu50.png) no-repeat', "../images/ii_ploshadka.png", 25, "unset"]
    let buttonsVrs18 = [-98, 268, 'url(../images/ar50.png) no-repeat', "../images/ii_ploshadka.png", 25, "unset"]

    let [date, setDate] = useState(0);

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

            <MenuStanki menuSelected="meh2"/>

            <div className="buttons-otchet">

                <Link to="/stanki/meh2">
                    <div className="menuNoSelect">СУТОЧНЫЙ ОТЧЕТ</div>
                </Link>

                <Link to="/stanki/meh2Month">
                    <div className="menuNoSelect">МЕСЯЧНЫЙ ОТЧЕТ</div>
                </Link>

                <Link to="/stanki/meh2Smena">
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
                                 size={"2ploshadka"} idContainer={1} service={complexName[0]}/>

            <ComplexSmenaAllIngo complexName={complexName[1]} complexImg={complexImg[1]}
                                 complexMesto={buttonsVrs2} 
                                 size={"2ploshadka"} idContainer={3} service={complexName[1]}/>

            <ComplexSmenaAllIngo complexName={complexName[2]} complexImg={complexImg[2]}
                                 complexMesto={buttonsVrs3}
                                 size={"2ploshadka"} idContainer={5} service={complexName[2]}/>

            <ComplexSmenaAllIngo complexName={complexName[3]} complexImg={complexImg[3]}
                                 complexMesto={buttonsVrs4}
                                 size={"2ploshadka"} idContainer={7} service={complexName[3]}/>

            <ComplexSmenaAllIngo complexName={complexName[4]} complexImg={complexImg[4]}
                                 complexMesto={buttonsVrs5}
                                 size={"2ploshadka"} idContainer={9} service={complexName[4]}/>

            <ComplexSmenaAllIngo complexName={complexName[5]} complexImg={complexImg[5]}
                                 complexMesto={buttonsVrs6}
                                 size={"2ploshadka"} idContainer={11} service={complexName[5]}/>

            <ComplexSmenaAllIngo complexName={complexName[6]} complexImg={complexImg[6]}
                                 complexMesto={buttonsVrs7}
                                 size={"2ploshadka"} idContainer={13} service={complexName[6]}/>
   
            <ComplexSmenaAllIngo complexName={complexName[7]} complexImg={complexImg[7]}
                                 complexMesto={buttonsVrs8} alarm = {complexName[7]}
                                 size={"2ploshadka"} idContainer={15} service={complexName[7]}/>
                                 
            <ComplexSmenaAllIngo complexName={complexName[8]} complexImg={complexImg[8]}
                                 complexMesto={buttonsVrs9}
                                 size={"2ploshadka"} idContainer={17} service={complexName[8]}/>
                                 
            <ComplexSmenaAllIngo complexName={complexName[9]} complexImg={complexImg[9]}
                                 complexMesto={buttonsVrs10}
                                 size={"2ploshadka"} idContainer={19} service={complexName[9]}/>
                                 
            <ComplexSmenaAllIngo complexName={complexName[10]} complexImg={complexImg[10]}
                                 complexMesto={buttonsVrs11}
                                 size={"2ploshadka"} idContainer={21} service={complexName[10]}/>
                                 
            <ComplexSmenaAllIngo complexName={complexName[11]} complexImg={complexImg[11]}
                                 complexMesto={buttonsVrs12}
                                 size={"2ploshadka"} idContainer={23} service={complexName[11]}/>

            <ComplexSmenaAllIngo complexName={complexName[12]} complexImg={complexImg[12]}
                                complexMesto={buttonsVrs13}
                                size={"2ploshadka"} idContainer={25} service={complexName[12]}/>

            <ComplexSmenaAllIngo complexName={complexName[13]} complexImg={complexImg[13]}
                                 complexMesto={buttonsVrs14}
                                 size={"2ploshadka"} idContainer={27} service={complexName[13]}/>
       
            <ComplexSmenaAllIngo complexName={complexName[14]} complexImg={complexImg[14]}
                                 complexMesto={buttonsVrs15}
                                 size={"2ploshadka"} idContainer={29} service={complexName[14]}/>
                
            <ComplexSmenaAllIngo complexName={complexName[15]} complexImg={complexImg[15]}
                                 complexMesto={buttonsVrs16}
                                 size={"2ploshadka"} idContainer={31} service={complexName[15]}/>
                                 
            <ComplexSmenaAllIngo complexName={complexName[16]} complexImg={complexImg[16]}
                                 complexMesto={buttonsVrs17}
                                 size={"2ploshadka"} idContainer={33} service={complexName[16]}/>
                                 
            <ComplexSmenaAllIngo complexName={complexName[17]} complexImg={complexImg[17]}
                                 complexMesto={buttonsVrs18}
                                 size={"2ploshadka"} idContainer={35} service={complexName[17]}/>

        </div>
    )

}
