function RezkaSmena() {

    let complexName = ["Навигатор #1", "Навигатор #2", "Навигатор #3", "TruLaser", "Комета #1", "Комета #2", "Комета #3"]
    let complexImg = ["../images/navigator.png", "../images/navigator.png", "../images/navigator.png", "../images/trulaser.png", "../images/kometa.png", "../images/kometa.png", "../images/kometa.png"]

    let buttonsVrs1 = [-110, 900, 'url(../images/navigator.png) no-repeat', "../images/sbor_ceh.png", 60, "unset"]
    let buttonsVrs2 = [-100, 540, 'url(../images/navigator.png) no-repeat', "../images/sbor_ceh.png", 60, "unset"]
    let buttonsVrs3 = [-200, 220, 'url(../images/navigator.png) no-repeat', "../images/sbor_ceh.png", 50, "unset"]
    let buttonsVrs4 = [-420, 740, 'url(../images/trulaser.png) no-repeat', "../images/sbor_ceh.png", 60, "unset"]
    let buttonsVrs5 = [-382, 190, 'url(../images/kometa.png) no-repeat', "../images/ceh_5.png", 60, "unset"]
    let buttonsVrs6 = [-300, 948, 'url(../images/kometa.png) no-repeat', "../images/sbor_ceh.png", 50, "unset"]
    let buttonsVrs7 = [-340, 870, 'url(../images/kometa.png) no-repeat', "../images/sbor_ceh.png", 50, "unset"]

    let [date, setDate] = useState(0);

    let complex1DateNow = {
        workArray: [],
        pauseArray: [],
        offArray: [],
        avarArray: [],
        ruchnoyArray: [],
        roundArray: []
    };
    let complex1DateYesterday = {
        workArray: [],
        pauseArray: [],
        offArray: [],
        avarArray: [],
        ruchnoyArray: [],
        roundArray: []
    };

    useEffect(() => {

        let dateNow = new Date()
        let dayNow = dateNow.getDate()
        let dayYesterday = dateNow.getDate() - 1
        let monthNow = dateNow.getMonth() + 1
        let yearNow = dateNow.getFullYear()
        if (dayNow < 10) {
            dayNow = "0" + dayNow
            dayYesterday = "0" + dayYesterday
        }
        if (monthNow < 10) {
            monthNow = "0" + monthNow
        }
        setDate(`${yearNow}-${monthNow}-${dayNow}`)
        let date1 = `${yearNow}-${monthNow}-${dayNow}`
        let date2 = `${yearNow}-${monthNow}-${dayYesterday}`

        let complex1day1 = fetchRequest(date1, complex1DateNow, 'navigator_1')
        let complex1day2 = fetchRequest(date2, complex1DateYesterday, 'navigator_1')

        let promiseDataComplex1 = Promise.resolve(complex1day1);
        let promiseDataComplex2 = Promise.resolve(complex1day2);
        promiseDataComplex1.then(value => {
            promiseDataComplex2.then(value1 => {
                let day1Complex1 = value
                let day2Complex1 = value1
                let complex1Smena = convertDaysToSmena(day1Complex1, day2Complex1)

                let convertDataWork = parseLinearSutki(complex1Smena[0][0], 0, date1, complex1Smena[0][5])
                let convertDataPause = parseLinearSutki(complex1Smena[0][1], 1, date1)
                let convertDataOff = parseLinearSutki(complex1Smena[0][2], 2, date1)
                let convertDataAvar = parseLinearSutki(complex1Smena[0][3], 3, date1)
                let convertDataRuchnoi = parseLinearSutki(complex1Smena[0][4], 4, date1)
                highChartSutkiLine(convertDataWork, convertDataPause, convertDataOff, convertDataAvar, convertDataRuchnoi, 'Нагрузка', 1)
                highChartRound(complex1Smena[0][6][0], complex1Smena[0][6][1], complex1Smena[0][6][2], complex1Smena[0][6][3], complex1Smena[0][6][4], 'Нагрузка', 1)

                let convertDataWork2 = parseLinearSutki(complex1Smena[1][0], 0, date1, complex1Smena[1][5])
                let convertDataPause2 = parseLinearSutki(complex1Smena[1][1], 1, date1)
                let convertDataOff2 = parseLinearSutki(complex1Smena[1][2], 2, date1)
                let convertDataAvar2 = parseLinearSutki(complex1Smena[1][3], 3, date1)
                let convertDataRuchnoi2 = parseLinearSutki(complex1Smena[1][4], 4, date1)
                highChartSutkiLine(convertDataWork2, convertDataPause2, convertDataOff2, convertDataAvar2, convertDataRuchnoi2, 'Нагрузка', 2)
                highChartRound(complex1Smena[1][6][0], complex1Smena[1][6][1], complex1Smena[1][6][2], complex1Smena[1][6][3], complex1Smena[1][6][4], 'Нагрузка', 2)

            })

        })

    }, [])

    function newDate(dateInput) {
        setDate(dateInput)
        console.log(dateInput)

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

            <div className='complexAllInfo' id={'containerTotal'}>
                <ComplexInfo complexName={complexName[0]} complexImg={complexImg[0]} complexMesto={buttonsVrs1}
                             size={"sborCeh"} programs={complexName[0]} laser={complexName[0]}/>
                <div className='twoDayDiv'>
                    <div className='oneDay'>
                        <div className="lineSukiHighChart" id="containerLine1"></div>
                        <div className="roundSukiHighChart" id="containerRound1"></div>
                    </div>
                    <div className='oneDay'>
                        <div className="lineSukiHighChart" id="containerLine2"></div>
                        <div className="roundSukiHighChart" id="containerRound2"></div>
                    </div>
                </div>
            </div>


            <div className='complexAllInfo'>
                <ComplexInfo complexName={complexName[1]} complexImg={complexImg[1]} complexMesto={buttonsVrs2}
                             size={"sborCeh"} programs={complexName[1]} laser={complexName[1]}/>
                <div className="lineSukiHighChart" id="containerLine2"></div>
                <div className="roundSukiHighChart" id="containerRound2"></div>
            </div>

            <div className='complexAllInfo'>
                <ComplexInfo complexName={complexName[2]} complexImg={complexImg[2]} complexMesto={buttonsVrs3}
                             size={"sborCeh"} programs={complexName[2]} laser={complexName[2]}/>
                <div className="lineSukiHighChart" id="containerLine3"></div>
                <div className="roundSukiHighChart" id="containerRound3"></div>
            </div>

            <div className='complexAllInfo'>
                <ComplexInfo complexName={complexName[3]} complexImg={complexImg[3]} complexMesto={buttonsVrs4}
                             size={"sborCeh"} programs={complexName[3]}/>
                <div className="lineSukiHighChart" id="containerLine4"></div>
                <div className="roundSukiHighChart" id="containerRound4"></div>
            </div>

            <div className='complexAllInfo'>
                <ComplexInfo complexName={complexName[4]} complexImg={complexImg[4]} complexMesto={buttonsVrs5}
                             size={"ceh5"}/>
                <div className="lineSukiHighChart" id="containerLine5"></div>
                <div className="roundSukiHighChart" id="containerRound5"></div>
            </div>

            <div className='complexAllInfo'>
                <ComplexInfo complexName={complexName[5]} complexImg={complexImg[5]} complexMesto={buttonsVrs6}
                             size={"sborCeh"}/>
                <div className="lineSukiHighChart" id="containerLine6"></div>
                <div className="roundSukiHighChart" id="containerRound6"></div>
            </div>

            <div className='complexAllInfo'>
                <ComplexInfo complexName={complexName[6]} complexImg={complexImg[6]} complexMesto={buttonsVrs7}
                             size={"sborCeh"}/>
                <div className="lineSukiHighChart" id="containerLine7"></div>
                <div className="roundSukiHighChart" id="containerRound7"></div>
            </div>

        </div>
    )

}