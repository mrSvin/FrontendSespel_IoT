// function IndividualPageInfo() {
//
//     //  [0]     [1]         [2]          [3]         [4]         [5]          [6]
//     // Name, serviceName, alarmName, programsName, laserName,  reportName, currentName
//
    let complexName = {

        'Мех.уч.2.пл': [
        ],
        'Резка': [
        ],
        'Мех.уч.1.пл': [
        ],

        'Роботы': [
        ],

        'Спец. Комплексы': [

        ],

        'Склады': [
        ],

        'Литейка': [
        ],

    }

    let complexImg = [
          , "",
        "",
    ]

    let buttonsVrs = [



        [-390, 175, 'url(../images/faccin.png) no-repeat', "../images/sbor_ceh.png", 60, "unset"],
        [-410, 360, 'url(../images/faccin.png) no-repeat', "../images/sbor_ceh.png", 60, "unset"],
    ]

    let size = [
        "", "", "", "", '', "ceh1",
        'sborCeh', 'sborCeh',
    ]
//
//
//     // Новая структура
//
// //
// // placeKeys.forEach((e) => {
// //     console.log(e)
// //     Object.keys(places[e]).forEach(i => {
// //         console.log(' ',i)
// //         Object.keys(places[e][i]).forEach(j=>{
// //             console.log('   ',j, places[e][i][j])
// //         })
// //     })
// // })
//
//     // let values = stankiKeys.map((name, i)=>{
//     //     return i
//     // })
//
//     // Массив номеров всех станков
//     // let values = getValues(placeLength, places)
//
//     // if (localStorage['selectedObjects'] == undefined) {
//     //     localStorage['selectedObjects'] = new Array(complexRequest.length).fill(false)
//     // }
//     //
//     // if (localStorage['selectedCategory'] == undefined) {
//     //     localStorage['selectedCategory'] = new Array(places.length).fill(false)
//     // }
//
//     // Состояния чекбоксов станков
//     // let [selectedCategory, setSelectedCategory] = useState(
//     //     (localStorage['selectedCategory'] == undefined) ? new Array(placeKeys.length).fill(true) : window.localStorage['selectedCategory'].split(',').map(e => {
//     //         return (e == 'true')
//     //     })
//     // );
//     //
//     // // Состояния чекбоксов станков
//     // let [selectedObjects, setSelectedObjects] = useState(
//     //     (localStorage['selectedObjects'] == undefined) ? new Array(values.length).fill(true) : window.localStorage['selectedObjects'].split(',').map(e => {
//     //         return (e == 'true')
//     //     })
//     // );
//
//     // let [valuesState, setValuesState] = useState(selectedObjects.map((item, index) => {
//     //     return true === item ? values[index] : null;
//     // }).filter(e => e != null))
//     //
//     // let [valuesStateWait, setValuesStateWait] = useState(selectedObjects.map((item, index) => {
//     //     return true === item ? values[index] : null;
//     // }).filter(e => e != null))
//
// }

function IndividualPage() {

    let places = ['ОТК', 'Мех.уч.2 пл.', 'Резка', 'Мех.уч.1 пл.', 'Роботы', 'Спец. комплексы', 'Склады', 'Литьё', 'Гибка', 'Все']

    const [page, setPage] = useState((localStorage['page'] == undefined)? 0 : +localStorage['page'])

    const placesObject = getAllStankiData()

    let placeKeys = []

    if(page == 9) {
        placeKeys = Object.keys(placesObject).map(e => {
            return e
        })
    }
    else placeKeys.push(places[page])


    let stankiObject = {}
    let stankiKeys = []
    if(page == 9) {
        Object.keys(placesObject).forEach(e => {
            Object.keys(placesObject[e].stanki).forEach(i => {
                stankiObject[i] = placesObject[e].stanki[i]
                stankiKeys.push(i)
            })
        })
    } else {
        placeKeys.forEach(e => {
            Object.keys(placesObject[e].stanki).map(i => {
                stankiObject[i] = placesObject[e].stanki[i]
                stankiKeys.push(i)
            })
        })
    }

    if (page == 9) {
        if (localStorage['places'] == undefined) {
            localStorage['places'] = Object.keys(placesObject).map(e => {
                return [e, false]
            })
        }

        if (localStorage['stanki'] == undefined) {
            localStorage['stanki'] = Object.keys(stankiObject).map(e => {
                return [e, false]
            })
        }
    }

    // Состояние даты
    let [date, setDate] = useState(0);

    // Состояние переменной мульти Диаграммы
    let [stateLineHC, setStateLineHC] = useState("multiLine");

    const [valuesCategories, setValuesCategories] = useState(
        (localStorage['places'] !== undefined && page == 9) ? getObjectFromLocal(localStorage['places']) :
            getCategoriesState(placeKeys, placesObject)
    )

    const [valuesStanki, setValuesStanki] = useState(
        (localStorage['stanki'] !== undefined && page == 9) ? getObjectFromLocal(localStorage['stanki']) :
            getStankiState(placeKeys, placesObject)
    )

    let forWait = []

    Object.keys(valuesStanki).forEach(e => {
        if (valuesStanki[e]) {
            forWait.push(e)
        }
    })

    const [valuesStankiWait, setValuesStankiWait] = useState(forWait)

    useEffect(() => {
        let dateInput = dayNow()
        setDate(dateInput)

        let stankiState = {}

        Object.keys(valuesStanki).forEach(e => {
            if (valuesStanki[e]) {
                stankiState[e] = stankiObject[e]
            }
        })

        let stankiKeysState = Object.keys(stankiState).map(e => {
            return e
        })

        let fetchNames = stankiKeysState.map(name => {
            return stankiState[name].complexRequest
        })

        let complexNames = stankiKeysState.map(name => {
            return stankiState[name].buttonNames
        })

        let stankiRequest = Promise.all(fetchNames.map((item) => {
            return fetchRequest(dateInput, item)
        }));

        updateLoadDataIndividual(stankiRequest, dateInput, complexNames, fetchNames, stateLineHC)

    }, [])

    function newDate(dateInput) {
        setDate(dateInput)

        let stankiState = {}

        Object.keys(valuesStanki).forEach(e => {
            if (valuesStanki[e]) {
                stankiState[e] = stankiObject[e]
            }
        })

        // setValuesStankiWait(Object.keys(stankiState))

        let stankiKeysState = Object.keys(stankiState).map(e => {
            return e
        })

        let fetchNames = stankiKeysState.map(name => {
            return stankiState[name].complexRequest
        })

        let complexNames = stankiKeysState.map(name => {
            return stankiState[name].buttonNames
        })

        let stankiRequest = Promise.all(fetchNames.map((item) => {
            return fetchRequest(dateInput, item)
        }));

        updateLoadDataIndividual(stankiRequest, dateInput, complexNames, fetchNames, stateLineHC)

    }

    return (
        <div>

            <MenuStankiIndividual menuSelected={page} setPage={setPage} setValuesStanki={setValuesStanki}
                                  setValuesStankiWait={setValuesStankiWait} setValuesCategories = {setValuesCategories}
                                  placesObject={placesObject} date={date} stateLineHC={stateLineHC}/>

            <div className="buttons-otchet">

                <Link to={`/stanki/individualPage/${places[page]}`}>
                    <div className="menuSelect">СУТОЧНЫЙ ОТЧЕТ</div>
                </Link>

                <Link to="/stanki/individualPageMonth">
                    <div className="menuNoSelect">МЕСЯЧНЫЙ ОТЧЕТ</div>
                </Link>

                <Link to="/stanki/individualPageSmena">
                    <div className="menuNoSelect">СМЕННЫЙ ОТЧЕТ</div>
                </Link>

            </div>

            <div>
                <div className="energyCalendarContainer">
                    <DayCalendar newDate={newDate} date={date}/>
                    <ListDevicesCategoryIndividual date={date} newDate={newDate} placesObject={placesObject} placeKeys={placeKeys}
                                         valuesStanki={valuesStanki} setValuesStanki={setValuesStanki} setValuesStankiWait={setValuesStankiWait}
                                         valuesCategories={valuesCategories} setValuesCategories={setValuesCategories}
                                         page={page} stankiObject={stankiObject}/>

                </div>
                <ComplexTotalSutkiInfo/>

                <SwitchLineHCIndividual date={date} stateLineHC={stateLineHC} setStateLineHC={setStateLineHC}
                                        stankiObject={stankiObject} valuesStanki={valuesStanki}
                                        setValuesStankiWait={setValuesStankiWait}
                />

                {valuesStankiWait.map((e, i) => {
                    let stanok = stankiObject[e]
                    if (Object.keys(stanok).length !== 0) {
                        return <ComplexSutkiAllInfo key={i} complexName={stanok.buttonNames.name}
                                                    complexImg={stanok.complexImg}
                                                    complexMesto={stanok.buttonsVrs} size={stanok.size}
                                                    idContainer={i + 1}
                                                    service={stanok.buttonNames.serviceName}
                                                    alarm={stanok.buttonNames.alarm}
                                                    programs={stanok.buttonNames.programsName}
                                                    laser={stanok.buttonNames.laser}
                                                    report={stanok.buttonNames.report}
                                                    current={stanok.buttonNames.current}/>
                    } else return null

                })}
            </div>

        </div>
    )
}
