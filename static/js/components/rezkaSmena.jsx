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
