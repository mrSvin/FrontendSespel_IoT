// function getPlaceLength(complexName) {
//     let complexNameIndex = 0
//     let placeLength = {}
//
//     Object.keys(complexName).forEach((e, i) => {
//         placeLength[e] = [complexNameIndex, complexNameIndex + complexName[e].length - 1]
//         complexNameIndex += complexName[e].length
//     })
//
//     return placeLength
//
// }
//
// function getValues(placeLength, places) {
//     //let keys = Object.keys(placeLength)
//     let values = []
//     places.forEach(e => {
//         for (let i = placeLength[e][0]; i <= placeLength[e][1]; i++) {
//             values.push(i)
//         }
//
//     })
//     return values
// }
//

function IndividualPageInfo() {

    //  [0]     [1]         [2]          [3]         [4]         [5]          [6]
    // Name, serviceName, alarmName, programsName, laserName,  reportName, currentName

    let complexName = {
        'OTK': [
            ["CRYSTA-Apex S9168", "CRYSTA-Apex S9168", null, "CRYSTA-Apex S9168"],
            ["НК600", "НК600"],
        ],

        'Мех.уч.2.пл': [
            ["УФ5220", "УФ5220"],
            ["СТП Сеспель", 'СТП Сеспель'],
            ["NTX1000 2", "NTX1000 2"],
            ["SK50", 'SK50'],
            ["APEC", "APEC"],
            ["DMU50 3", "DMU50 3"],
            ["DMU50 4", "DMU50 4"],
            ["CTX310 2", 'CTX310 2', 'CTX310 2'],
            ["CTX510 2", "CTX510 2"],
            ["CTX510 3", "CTX510 3"],
            ["CTX310 3", "CTX310 3"],
            ["CTX510 4", 'CTX510 4'],
            ["CTX510 5", "CTX510 5"],
            ["DMC1035 2", "DMC1035 2"],
            ["DMU50 5", "DMU50 5"],
            ["DMU50 6", "DMU50 6"],
            ["DMU50 7", "DMU50 7"],
            ["AR55", "AR55"],
        ],
        'Резка': [
            ["Навигатор 1", "Навигатор 1", null, "Навигатор 1", "Навигатор 1"],
            ["Навигатор 2", 'Навигатор 2', null, "Навигатор 2", "Навигатор 2"],
            ["Навигатор 3", "Навигатор 3", null, "Навигатор 3", "Навигатор 3"],
            ["TruLaser", 'TruLaser'],
            ["Комета 1", "Комета 1"],
            ["Комета 2", "Комета 2"],
            ["Комета 3", "Комета 3"],
        ],
        'Мех.уч.1.пл': [
            ["УВФ-1 1", "УВФ-1 1"
            ],
            ["УВФ-1 2", "УВФ-1 2"
            ],
            ["NTX1000", "NTX1000", "NTX1000"],
            ["NLX3000", "NLX3000", "NLX3000"],
            ["GAMMA2000", "GAMMA2000", "GAMMA2000"],
            ["CTX650", "CTX650", "CTX650"],
            ["DMF260", "DMF260", "DMF260"],
            ["DMU50 1", "DMU50 1", "DMU50 1"],
            ["DMU50 2", "DMU50 2", "DMU50 2"],
            ["DMC1035", "DMC1035", "DMC1035"],
            ["CTX310 1", "CTX310 1", "CTX310 1"],
            ["CTX510 1", "CTX510 1", "CTX510 1"],
        ],

        'Роботы': [
            ["МАКС 1", "МАКС 1", null, "МАКС 1"
            ],
            ["МАКС 2", 'МАКС 2', null, 'МАКС 2'],
            ["М710", "М710", null, "М710"],
            ["РТК12C", 'РТК12C', null, 'РТК12C'],
            ["P250", "P250", null, "P250"],
            ["КРОТ", 'КРОТ', null, 'КРОТ'],
            ["ПРАНС", "ПРАНС", null, "ПРАНС"],
        ],

        'Спец. Комплексы': [
            ["Пресс ЧПУ для ступиц", "Пресс ЧПУ для ступиц"],
            ["ЭПП", "ЭПП"],
            ["СТП13М", "СТП13М"],
            ['Стенд для ресурсных испытаний', 'Стенд для ресурсных испытаний', null, null, null, 'Стенд', 'Стенд'],
        ],

        'Склады': [
            ["Склад Мех. цеха", "Склад Мех. цеха"],
        ],

        'Литейка': [
            ["Печь Индукционная", "Печь Индукционная"],
        ],

        'Гибка': [
            ["FACCIN 4", "FACCIN 4"],
            ["FACCIN 10", "FACCIN 10"],
        ],
    }
    // let placeLength = getPlaceLength(complexName)

    // let [page, setPage] = useState([3, 0])

    // let places = page.map(e => {
    //     return Object.keys(complexName)[e]
    // })

    // let places = Object.keys(complexName)
    // let buttonNames = []
    //
    // Object.keys(complexName).forEach(e => {
    //     complexName[e].forEach(i => {
    //         buttonNames.push(i)
    //     })
    // })

    let complexImg = [
        "../images/crystal_apex.png", "../images/nk600.png", "../images/UVF_5220.png",
        "../images/progress.png", "../images/ntx1000.png", "../images/sk50.png",
        "../images/apec.png", "../images/dmg_dmu50.png", "../images/dmg_dmu50.png",
        "../images/dmg_ctx310.png", "../images/dmg_ctx510.png", "../images/dmg_ctx510.png",
        "../images/dmg_ctx310.png", "../images/dmg_ctx510.png", "../images/dmg_ctx510.png",
        "../images/dmg_dmc1035.png", "../images/dmg_dmu50.png", "../images/dmg_dmu50.png",
        "../images/dmg_dmu50.png", "../images/ar55.png", "../images/navigator.png",
        "../images/navigator.png", "../images/navigator.png", "../images/trulaser.png",
        "../images/kometa.png", "../images/kometa.png", "../images/kometa.png",
        "../images/uvf_1_2.png", "../images/uvf_1_2.png", "../images/ntx1000.png",
        "../images/NLX3000.png", "../images/gamma2000.png", "../images/dmg_ctx650.png",
        "../images/dmg_dmf260.png", "../images/dmg_dmu50.png", "../images/dmg_dmu50.png",
        "../images/dmg_dmc1035.png", "../images/dmg_ctx310.png", "../images/dmg_ctx510.png",
        "../images/robot.png", "../images/robot.png", "../images/robot.png", "../images/robot.png",
        "../images/robot_p250.png", "../images/robot.png", "../images/robot.png", "../images/press.png",
        "../images/epp.png", "../images/stp13m.png", "../images/stendResource.png", "../images/sklad.png",
        "../images/pech.png", "../images/faccin.png", "../images/faccin_2.png",
    ]

    let complexRequest = [
        'kim', 'nk600', 'uvf5220', 'progress', 'ntx1000_2', 'sk50', 'apec',
        'dmg_dmu50_3', 'dmg_dmu50_4', 'dmg_ctx310_2', 'dmg_ctx510_2', 'dmg_ctx510_3',
        'dmg_ctx310_3', 'dmg_ctx510_4', 'dmg_ctx510_5', 'dmg_dmc1035_2', 'dmg_dmu50_5',
        'dmg_dmu50_6', 'dmg_dmu50_7', 'ar55', 'navigator_1', 'navigator_2_golova_2',
        'navigator_3', 'trulaser', 'kometa_1', 'kometa_2', 'kometa_3', 'uvf_1', 'uvf_2',
        'ntx1000', 'nlx3000', 'dmg_gamma2000', 'dmg_ctx650', 'dmg_dmf260', 'dmg_dmu50_1',
        'dmg_dmu50_2', 'dmg_dmc1035', 'dmg_ctx310_1', 'dmg_ctx510_1', 'maks_1', 'maks_2', 'm710',
        'rtk12c', 'p250', 'krot', 'prans', 'press', 'epp', 'stp13m', 'stend_resources', 'sclad_meh',
        'pech_nerg', 'faccin_1', 'faccin_2',
    ]

    let buttonsVrs = [
        [-145, 680, 'url(../images/crystal_apex.png) no-repeat', "../images/meh_ceh.png", 40, "unset"],
        [-463, 1183, 'url(../images/nk600.png) no-repeat', "../images/ceh2.png", 40, "100%"],
        [-115, 875, 'url(../images/UVF_5220.png) no-repeat', "../images/ii_ploshadka.png", 40, "unset"],
        [-105, 494, 'url(../images/progress.png) no-repeat', "../images/ii_ploshadka.png", 40, "unset"],
        [-100, 295, 'url(../images/ntx1000.png) no-repeat', "../images/ii_ploshadka.png", 25, "unset"],
        [-100, 597, 'url(../images/sk50.png) no-repeat', "../images/ii_ploshadka.png", 40, "unset"],
        [-106, 780, 'url(../images/apec.png) no-repeat', "../images/ii_ploshadka.png", 40, "unset"],
        [-65, 295, 'url(../images/dmg_dmu50.png) no-repeat', "../images/ii_ploshadka.png", 25, "unset"],
        [-65, 270, 'url(../images/dmg_dmu50.png) no-repeat', "../images/ii_ploshadka.png", 25, "unset"],
        [-65, 270, 'url(../images/dmg_ctx310.png) no-repeat', "../images/ii_ploshadka.png", 25, "unset"],
        [-101, 106, 'url(../images/dmg_ctx510.png) no-repeat', "../images/ii_ploshadka.png", 25, "unset"],
        [-101, 85, 'url(../images/dmg_ctx510.png) no-repeat', "../images/ii_ploshadka.png", 25, "unset"],
        [-105, 210, 'url(../images/dmg_ctx310.png) no-repeat', "../images/ii_ploshadka.png", 25, "unset"],
        [-105, 235, 'url(../images/dmg_ctx510.png) no-repeat', "../images/ii_ploshadka.png", 25, "unset"],
        [-65, 210, 'url(../images/dmg_ctx510.png) no-repeat', "../images/ii_ploshadka.png", 25, "unset"],
        [-103, 171, 'url(../images/dmg_dmc1035.png) no-repeat', "../images/ii_ploshadka.png", 25, "unset"],
        [-65, 171, 'url(../images/dmg_dmu50.png) no-repeat', "../images/ii_ploshadka.png", 25, "unset"],
        [-65, 141, 'url(../images/dmg_dmu50.png) no-repeat', "../images/ii_ploshadka.png", 25, "unset"],
        [-102, 143, 'url(../images/dmg_dmu50.png) no-repeat', "../images/ii_ploshadka.png", 25, "unset"],
        [-98, 268, 'url(../images/ar50.png) no-repeat', "../images/ii_ploshadka.png", 25, "unset"],
        [-110, 900, 'url(../images/navigator.png) no-repeat', "../images/sbor_ceh.png", 60, "unset"],
        [-100, 540, 'url(../images/navigator.png) no-repeat', "../images/sbor_ceh.png", 60, "unset"],
        [-200, 220, 'url(../images/navigator.png) no-repeat', "../images/sbor_ceh.png", 50, "unset"],
        [-420, 740, 'url(../images/trulaser.png) no-repeat', "../images/sbor_ceh.png", 60, "unset"],
        [-382, 190, 'url(../images/kometa.png) no-repeat', "../images/ceh_5.png", 60, "unset"],
        [-300, 948, 'url(../images/kometa.png) no-repeat', "../images/sbor_ceh.png", 50, "unset"],
        [-340, 870, 'url(../images/kometa.png) no-repeat', "../images/sbor_ceh.png", 50, "unset"],
        [-340, 280, 'url(../images/uvf_1_2.png) no-repeat', "../images/meh_ceh.png", 40, "unset"],
        [-180, 280, 'url(../images/uvf_1_2.png) no-repeat', "../images/meh_ceh.png", 40, "unset"],
        [-670, 490, 'url(../images/ntx1000.png) no-repeat', "../images/meh_ceh.png", 40, "unset"],
        [-590, 310, 'url(../images/NLX3000.png) no-repeat', "../images/meh_ceh.png", 40, "unset"],
        [-840, 520, 'url(../images/gamma2000.png) no-repeat', "../images/meh_ceh.png", 60, "unset"],
        [-500, 310, 'url(../images/dmg_ctx650.png) no-repeat', "../images/meh_ceh.png", 40, "unset"],
        [-780, 200, 'url(../images/dmg_dmf260.png) no-repeat', "../images/meh_ceh.png", 40, "unset"],
        [-500, 115, 'url(../images/dmg_dmu50.png) no-repeat', "../images/meh_ceh.png", 40, "unset"],
        [-410, 115, 'url(../images/dmg_dmu50.png) no-repeat', "../images/meh_ceh.png", 40, "unset"],
        [-590, 115, 'url(../images/dmg_dmc1035.png) no-repeat', "../images/meh_ceh.png", 40, "unset"],
        [-590, 470, 'url(../images/dmg_ctx310.png) no-repeat', "../images/meh_ceh.png", 40, "unset"],
        [-490, 470, 'url(../images/dmg_ctx510.png) no-repeat', "../images/meh_ceh.png", 40, "unset"],
        [-255, 620, 'url(../images/robot.png) no-repeat', "../images/ceh_6.png", 40, "unset"],
        [-450, 210, 'url(../images/robot.png) no-repeat', "../images/ceh_6.png", 40, "unset"],
        [-920, 800, 'url(../images/robot.png) no-repeat', "../images/sbor_ceh.png", 40, "unset"],
        [-750, 800, 'url(../images/robot.png) no-repeat', "../images/sbor_ceh.png", 60, "unset"],
        [-820, 270, 'url(../images/robot_p250.png) no-repeat', "../images/ceh_5.png", 60, "unset"],
        [-920, 890, 'url(../images/robot.png) no-repeat', "../images/sbor_ceh.png", 40, "unset"],
        [-655, 820, 'url(../images/robot.png) no-repeat', "../images/ceh_6.png", 40, "unset"],
        [-480, 765, 'url(../images/press.png) no-repeat', "../images/ii_ploshadka.png", 40, "unset"],
        [-825, 220, 'url(../images/epp.png) no-repeat', "../images/ceh_6.png", 40, "unset"],
        [-310, 550, 'url(../images/stp13m.png) no-repeat', "../images/sbor_ceh.png", 60, "unset"],
        [-310, 550, 'url(../images/stp13m.png) no-repeat', "../images/sbor_ceh.png", 60, "unset"],
        [-485, 680, 'url(../images/sklad.png) no-repeat', "../images/meh_ceh.png", 40, "unset"],
        [-125, 180, 'url(../images/pech.png) no-repeat', "../images/ceh_1.png", 70, "100%"],
        [-390, 175, 'url(../images/faccin.png) no-repeat', "../images/sbor_ceh.png", 60, "unset"],
        [-410, 360, 'url(../images/faccin.png) no-repeat', "../images/sbor_ceh.png", 60, "unset"],
    ]

    let size = [
        "meh1", "ceh1", '2ploshadka', '2ploshadka', '2ploshadka',
        '2ploshadka', '2ploshadka', '2ploshadka', '2ploshadka',
        '2ploshadka', '2ploshadka', '2ploshadka', '2ploshadka',
        '2ploshadka', '2ploshadka', '2ploshadka', '2ploshadka',
        '2ploshadka', '2ploshadka', '2ploshadka', "sborCeh",
        "sborCeh", "sborCeh", "sborCeh", "ceh5", "sborCeh",
        "sborCeh", 'meh1', 'meh1', 'meh1', 'meh1', 'meh1',
        'meh1', 'meh1', 'meh1', 'meh1', 'meh1', 'meh1', 'meh1',
        'ceh6', 'ceh6', 'sborCeh', 'sborCeh', 'ceh5', 'sborCeh', 'ceh6',
        "2ploshadka", "ceh6", "sborCeh", "sborCeh", 'meh1', "ceh1",
        'sborCeh', 'sborCeh',
    ]


    // Новая структура

    let kim = {
        buttonNames: {
            name: "CRYSTA-Apex S9168",
            serviceName: "CRYSTA-Apex S9168",
            programsName: "CRYSTA-Apex S9168",
        },
        complexImg: "../images/crystal_apex.png",
        complexRequest: 'kim',
        buttonsVrs: [-145, 680, 'url(../images/crystal_apex.png) no-repeat', "../images/meh_ceh.png", 40, "unset"],
        size: "meh1",
        state: true,
    }

    let nk600 = {
        buttonNames: {
            name: "НК600",
            serviceName: "НК600",
        },
        complexImg: "../images/nk600.png",
        complexRequest: 'nk600',
        buttonsVrs: [-463, 1183, 'url(../images/nk600.png) no-repeat', "../images/ceh2.png", 40, "100%"],
        size: "ceh1",
        state: true,
    }

    let faccin_1 = {
        buttonNames: {
            name: "FACCIN 4",
            serviceName: "FACCIN 4",
        },
        complexImg: "../images/faccin.png",
        complexRequest: 'faccin_1',
        buttonsVrs: [-390, 175, 'url(../images/faccin.png) no-repeat', "../images/sbor_ceh.png", 60, "unset"],
        size: 'sborCeh',
        state: true,
    }

    let faccin_2 = {
        buttonNames: {
            name: "FACCIN 10",
            serviceName: "FACCIN 10",
        },
        complexImg: "../images/faccin_2.png",
        complexRequest: 'faccin_2',
        buttonsVrs: [-410, 360, 'url(../images/faccin.png) no-repeat', "../images/sbor_ceh.png", 60, "unset"],
        size: 'sborCeh',
        state: true,
    }

    let placesObject = {
        'OTK': {
            stanki: {kim, nk600},
            placeState: true,
        },
        'Гибка': {
            stanki: {faccin_1, faccin_2},
            placeState: true,
        },
    }

    // Новая структура


    let placeKeys = Object.keys(placesObject).map(e => {
        return e
    })

    let stankiObject = {}
    let stankiKeys = []

    Object.keys(placesObject).forEach(e => {
        Object.keys(placesObject[e].stanki).map(i => {
            console.log(placesObject[e].stanki[i], i)
            stankiObject[i] = placesObject[e].stanki[i]
            stankiKeys.push(i)
        })
    })

    // Состояние даты
    let [date, setDate] = useState(0);

    // Состояние переменной мульти Диаграммы
    let [stateLineHC, setStateLineHC] = useState("multiLine");

//
// placeKeys.forEach((e) => {
//     console.log(e)
//     Object.keys(places[e]).forEach(i => {
//         console.log(' ',i)
//         Object.keys(places[e][i]).forEach(j=>{
//             console.log('   ',j, places[e][i][j])
//         })
//     })
// })

    // let values = stankiKeys.map((name, i)=>{
    //     return i
    // })

    // Массив номеров всех станков
    // let values = getValues(placeLength, places)




    // if (localStorage['selectedObjects'] == undefined) {
    //     localStorage['selectedObjects'] = new Array(complexRequest.length).fill(false)
    // }
    //
    // if (localStorage['selectedCategory'] == undefined) {
    //     localStorage['selectedCategory'] = new Array(places.length).fill(false)
    // }

    // Состояния чекбоксов станков
    // let [selectedCategory, setSelectedCategory] = useState(
    //     (localStorage['selectedCategory'] == undefined) ? new Array(placeKeys.length).fill(true) : window.localStorage['selectedCategory'].split(',').map(e => {
    //         return (e == 'true')
    //     })
    // );
    //
    // // Состояния чекбоксов станков
    // let [selectedObjects, setSelectedObjects] = useState(
    //     (localStorage['selectedObjects'] == undefined) ? new Array(values.length).fill(true) : window.localStorage['selectedObjects'].split(',').map(e => {
    //         return (e == 'true')
    //     })
    // );

    // let [valuesState, setValuesState] = useState(selectedObjects.map((item, index) => {
    //     return true === item ? values[index] : null;
    // }).filter(e => e != null))
    //
    // let [valuesStateWait, setValuesStateWait] = useState(selectedObjects.map((item, index) => {
    //     return true === item ? values[index] : null;
    // }).filter(e => e != null))


    useEffect(() => {
        let dateInput = dayNow()
        setDate(dateInput)

        let fetchNames = stankiKeys.map(name => {
            return stankiObject[name].complexRequest
        })

        let complexNames = stankiKeys.map(name => {
            return stankiObject[name].buttonNames
        })

        let stankiRequest = Promise.all(fetchNames.map((item) => {
            return fetchRequest(dateInput, item)
        }));

        updateLoadDataIndividual(stankiRequest, dateInput, complexNames, fetchNames, stateLineHC)

    }, [])

    function newDate(dateInput) {
        setDate(dateInput)
        // setValuesStateWait(valuesState)

        let fetchNames = stankiKeys.map(name => {
            return stankiObject[name].complexRequest
        })

        let complexNames = stankiKeys.map(name => {
            return stankiObject[name].buttonNames
        })

        let stankiRequest = Promise.all(fetchNames.map((item) => {
            return fetchRequest(dateInput, item)
        }));

        updateLoadDataIndividual(stankiRequest, dateInput, complexNames, fetchNames, stateLineHC)

    }


    return (
        <div>
            <div className="energyCalendarContainer">
                <DayCalendar newDate={newDate} date={date}/>
                <ListDevicesCategory date={date} newDate={newDate} placesObject={placesObject} placeKeys={placeKeys}/>

            </div>
            <ComplexTotalSutkiInfo/>

            <SwitchLineHCIndividual date={date} stateLineHC={stateLineHC} setStateLineHC={setStateLineHC}
                                    stankiObject={stankiObject} stankiKeys={stankiKeys}
            />

            {stankiKeys.map((e, i) => {
                let stanok = stankiObject[e]
                return <ComplexSutkiAllInfo key={i} complexName={stanok.buttonNames.name} complexImg={stanok.complexImg}
                                            complexMesto={stanok.buttonsVrs} size={stanok.size} idContainer={i + 1}
                                            service={stanok.buttonNames.serviceName} alarm={stanok.buttonNames.alarm}
                                            programs={stanok.buttonNames.programsName} laser={stanok.buttonNames.laser}
                                            report={stanok.buttonNames.report} current={stanok.buttonNames.current}/>
            })}
        </div>
    )

}

function IndividualPage() {

    return (
        <div>

            <MenuStanki menuSelected=""/>

            <div className="buttons-otchet">

                <Link to="/stanki/individualPage">
                    <div className="menuSelect">СУТОЧНЫЙ ОТЧЕТ</div>
                </Link>

                <Link to="/stanki/individualPageMonth">
                    <div className="menuNoSelect">МЕСЯЧНЫЙ ОТЧЕТ</div>
                </Link>

                <Link to="/stanki/individualPageSmena">
                    <div className="menuNoSelect">СМЕННЫЙ ОТЧЕТ</div>
                </Link>

            </div>

            <IndividualPageInfo/>

        </div>
    )
}

function ListDevicesCategory({date, newDate, placesObject, placeKeys}) {

    // function changeMainList(mainList, selectedObjects) {
    //     let index = 0
    //     for (let i = 0; i < mainList.length; i++) {
    //         for (let j = 0; j < mainList[i][1]; j++) {
    //             selectedObjects[index] = mainList[i][0]
    //             index++
    //         }
    //     }
    // }

    const [isActive, setActive] = useState(false);

    const [listChanged, setListChanged] = useState(false)

    const toggleClass = () => {
        setActive(!isActive);
        if (listChanged) {
            newDate(date)
            setListChanged(false)
        }
    };

    const innerRef = useOuterClick(ev => {
        if (isActive) {
            setActive(!isActive);
            if (listChanged) {
                newDate(date)
                setListChanged(false)
            }

        }
    });

    const [valuesCategories, setValuesCategories] = useState(getCategoriesState(placeKeys, placesObject))

    const [valuesStanki, setValuesStanki]  = useState(getStankiState(placeKeys, placesObject))

    function handleOnChangeCategory(e) {
    const {name, checked} = e.target;
        setValuesCategories(prevState => ({
            ...prevState,
            [name]: checked
        }));
        setListChanged(true)



        // console.log('Проверка доступа к данным', name, placesObject, placeKeys)
        let obj = {}
        Object.keys(placesObject[name]).forEach(e=>{
            obj[e] = false
        })
        console.log(obj)
    };

    const handleOnChangeStanok = e => {
        const {name, checked} = e.target;
        setValuesStanki(prevState => ({
            ...prevState,
            [name]: checked
        }));

        setListChanged(true)
    };

    // const handleOnChange = (position) => {
    //     const updatedCheckedState = selectedObjects.map((item, index) => {
    //         return index === position ? !item : item;
    //     });
    //
    //     // console.log('Внутри update', updatedCheckedState)
    //
    //     window.localStorage['selectedObjects'] = updatedCheckedState
    //     setSelectedObjects(updatedCheckedState)
    //
    //     const activeValues = []
    //     updatedCheckedState.forEach(
    //         (currentState, index) => {
    //             if (currentState) {
    //                 activeValues.push(values[index]);
    //             }
    //         }
    //     );
    //
    //     setValuesState(activeValues);
    //
    // };

    return (
        <div
            ref={innerRef}
            className='menuSelect selectDevice'>
            <span onClick={toggleClass}>Выбор оборудования</span>
            <div className="listComplex">
                <span>▼</span>
                <div
                    className={isActive ? 'containerStanokList' : 'containerStanokList containerStanokListHidden'}>
                    <ul className='toppings-list'
                        className={isActive ? 'toppings-list toppings-list-visible' : 'toppings-list'}>

                        {placeKeys.map((placeName, index) => {
                            let stankiKeys = Object.keys(placesObject[placeName].stanki)
                            let stankiObjects = placesObject[placeName].stanki

                            let paddingNow = {
                                paddingBottom: 30 * stankiKeys.length + 6
                            };

                            return (
                                <li key={index}>
                                    <div className="toppings-list-item">
                                        <div className="left-section">
                                            <input
                                                type="checkbox"
                                                id={`custom-checkbox-category-${index}`}
                                                name={placeName}
                                                value={index}
                                                checked={valuesCategories[placeName]}
                                                onChange={(e)=>{
                                                    handleOnChangeCategory(e)
                                                }}
                                            />
                                            <label style={paddingNow}
                                                   htmlFor={`custom-checkbox-category-${index}`}></label>
                                            <span className='spanList spanListCategory'>{placeName}</span>
                                        </div>
                                    </div>
                                    <ul>
                                        <InsideList stankiKeys={stankiKeys} stankiObjects={stankiObjects}
                                                    valuesStanki={valuesStanki} handleOnChangeStanok={handleOnChangeStanok}/>
                                    </ul>
                                </li>
                            );

                        })}
                    </ul>
                </div>
            </div>
        </div>
    )
}

function InsideList({stankiKeys, stankiObjects, valuesStanki, handleOnChangeStanok}) {

    return(
        stankiKeys.map((stanok, i) => {
            let stanokIndex = `${stanok} ${i}`
            let stanokName = stankiObjects[stanok].buttonNames.name

            return (
                <li key={stanokIndex} className='individualLi'>
                    <div className="toppings-list-item">
                        <div className="left-section">
                            <input
                                type="checkbox"
                                id={`custom-checkbox-${stanokIndex}`}
                                name={stankiObjects[stanok].complexRequest}
                                value={`${stanokIndex}`}
                                checked={valuesStanki[stanok]}
                                onChange={handleOnChangeStanok}
                            />
                            <label
                                htmlFor={`custom-checkbox-${stanokIndex}`}></label><span
                            className='spanList'>{stanokName}</span>
                        </div>
                    </div>
                </li>
            )
        })
    )
}

// function ListDevicesCategory({
//                                  date, values, setValuesState, complexName, places, newDate, selectedCategory,
//                                  setSelectedCategory, selectedObjects, setSelectedObjects
//                              }) {
//
//     function changeMainList(mainList, selectedObjects) {
//         let index = 0
//         for (let i = 0; i < mainList.length; i++) {
//             for (let j = 0; j < mainList[i][1]; j++) {
//                 selectedObjects[index] = mainList[i][0]
//                 index++
//             }
//         }
//     }
//
//     const [isActive, setActive] = useState(false);
//
//     const [listChanged, setListChanged] = useState(false)
//
//     const toggleClass = () => {
//         setActive(!isActive);
//         if (listChanged) {
//             newDate(date)
//             setListChanged(false)
//         }
//     };
//
//     const innerRef = useOuterClick(ev => {
//         if (isActive) {
//             setActive(!isActive);
//             if (listChanged) {
//                 newDate(date)
//                 setListChanged(false)
//             }
//
//         }
//     });
//
//     const handleOnChangeCategory = (position) => {
//         const updatedCheckedState = selectedCategory.map((item, index) => {
//             return index === position ? !item : item;
//         });
//
//         window.localStorage['selectedCategory'] = updatedCheckedState
//         setSelectedCategory(updatedCheckedState)
//
//         let mainList = Object.keys(complexName).map((e, i) => {
//             return [updatedCheckedState[i], complexName[e].length]
//         })
//
//         changeMainList(mainList, selectedObjects)
//
//         const activeValues = []
//         selectedObjects.forEach(
//             (currentState, index) => {
//                 if (currentState) {
//                     activeValues.push(index);
//                 }
//             }
//         );
//
//         window.localStorage['selectedObjects'] = selectedObjects
//         setValuesState(activeValues);
//     };
//     const handleOnChange = (position) => {
//         const updatedCheckedState = selectedObjects.map((item, index) => {
//             return index === position ? !item : item;
//         });
//
//         // console.log('Внутри update', updatedCheckedState)
//
//         window.localStorage['selectedObjects'] = updatedCheckedState
//         setSelectedObjects(updatedCheckedState)
//
//         const activeValues = []
//         updatedCheckedState.forEach(
//             (currentState, index) => {
//                 if (currentState) {
//                     activeValues.push(values[index]);
//                 }
//             }
//         );
//
//         setValuesState(activeValues);
//
//     };
//
//     let keyIndex = 0
//
//     return (
//         <div
//             ref={innerRef}
//             className='menuSelect selectDevice'>
//             <span onClick={toggleClass}>Выбор оборудования</span>
//             <div className="listComplex">
//                 <span>▼</span>
//                 <div
//                     className={isActive ? 'containerStanokList' : 'containerStanokList containerStanokListHidden'}>
//                     <ul className='toppings-list'
//                         className={isActive ? 'toppings-list toppings-list-visible' : 'toppings-list'}>
//
//                         {places.map((razdel, index) => {
//
//                             let allComplex = Object.keys(complexName)
//                             let trueIndex = allComplex.findIndex((e) => {
//                                 return e == razdel
//                             })
//
//                             let paddingNow = {
//                                 paddingBottom: 30 * complexName[razdel].length + 6
//                             };
//
//                             return (
//                                 <li key={trueIndex}>
//                                     <div className="toppings-list-item">
//                                         <div className="left-section">
//                                             <input
//                                                 type="checkbox"
//                                                 id={`custom-checkbox-category-${index}`}
//                                                 name={razdel}
//                                                 value={trueIndex}
//                                                 checked={selectedCategory[index]}
//                                                 onChange={() => {
//                                                     handleOnChangeCategory(index)
//                                                     setListChanged(true)
//                                                 }
//                                                 }
//                                             />
//                                             <label style={paddingNow}
//                                                    htmlFor={`custom-checkbox-category-${index}`}></label><span
//                                             className='spanList spanListCategory'>{razdel}</span>
//                                         </div>
//                                     </div>
//                                     <ul>
//                                         {complexName[razdel].map((stanok, i) => {
//                                             let saveIndex = keyIndex++
//                                             return (
//                                                 <li key={saveIndex} className='individualLi'>
//                                                     <div className="toppings-list-item">
//                                                         <div className="left-section">
//                                                             <input
//                                                                 type="checkbox"
//                                                                 id={`custom-checkbox-${saveIndex}`}
//                                                                 name={stanok[0]}
//                                                                 value={`${saveIndex}`}
//                                                                 checked={selectedObjects[saveIndex]}
//                                                                 onChange={() => {
//                                                                     handleOnChange(saveIndex)
//                                                                     setListChanged(true)
//                                                                 }}
//                                                             />
//                                                             <label
//                                                                 htmlFor={`custom-checkbox-${saveIndex}`}></label><span
//                                                             className='spanList'>{stanok[0]}</span>
//                                                         </div>
//                                                     </div>
//                                                 </li>
//                                             )
//                                         })}
//                                     </ul>
//                                 </li>
//                             );
//
//                         })}
//                     </ul>
//                 </div>
//             </div>
//         </div>
//     )
// }


// Обработка данных из запроса для отрисовки графиков
function updateLoadDataIndividual(promiseVariable, day1, complexName, fetchNames, typeLine = "multiLine") {
    promiseVariable
        .then(result => {
            let data = result.map(e => {
                return [e.work.slice(), e.pause.slice(), e.off.slice(), e.avar.slice(), e.nagruzka.slice(), e.programName.slice(), e.roundData.slice()]
            })

            let arrayLine;
            if (typeLine == 'multiLine') {
                arrayLine = [0, 1, 2, 3, 4]
            } else {
                arrayLine = [0, 0, 0, 0, 0]
            }

            let totalArray = []
            let kolOpArray = []

            let parserDataArray = data.map(value => {
                let convertDataWork = parseLinearSutki(value[0], arrayLine[1], day1, value[5])
                let convertDataPause = parseLinearSutki(value[1], arrayLine[2], day1)
                let convertDataOff = parseLinearSutki(value[2], arrayLine[3], day1)
                let convertDataAvar = parseLinearSutki(value[3], arrayLine[4], day1)
                let convertDataRuchnoi = parseLinearSutki(value[4], arrayLine[0], day1)
                let roundArray = value[6].map(Number)

                totalArray.push(roundArray.slice())
                kolOpArray.push(kolOperations(value[0]).slice())

                return [convertDataWork, convertDataPause, convertDataOff, convertDataAvar, convertDataRuchnoi, roundArray]
            })

            let nagruzkaName = fetchNames.map(e => {
                return exceptionManualNagruzka(e)
            })

            let names = complexName.map(e => {
                return e.name
            })

            let programNames = complexName.map(e => {
                return e.programsName
            })


            highChartTotalKolOp(totalArray, kolOpArray, names, day1, nagruzkaName)

            parserDataArray.forEach((e, i) => {
                // Первая смена
                highChartSutkiLine(e[0], e[1], e[2], e[3], e[4], nagruzkaName[i], i + 1)
                if (programNames[i] !== null && programNames[i] !== undefined) highChartProgram(getTimeProgramNameGraph(data[i], 'sutki', day1), i + 1)
                highChartRound(e[5][0], e[5][1], e[5][2], e[5][3], e[5][4], nagruzkaName[i], i + 1)

            })
        })
        .catch(err => {
            console.error(err);
        });
}

// Изменение состояние линейных графиков из 5-ти строк в одну
function changeTypeLineIndividual(date, stateLineHC, setStateLineHC, stankiObject, stankiKeys) {

    let fetchNames = stankiKeys.map(name => {
        return stankiObject[name].complexRequest
    })

    let complexNames = stankiKeys.map(name => {
        return stankiObject[name].buttonNames
    })

    let stankiRequest = Promise.all(fetchNames.map((item) => {
        return fetchRequest(date, item)
    }));

    if (stateLineHC == 'line') {
        setStateLineHC('multiLine')
        updateLoadDataIndividual(stankiRequest, date, complexNames, fetchNames, 'multiLine')
    } else {
        setStateLineHC('line')
        updateLoadDataIndividual(stankiRequest, date, complexNames, fetchNames, 'line')
    }


}


function SwitchLineHCIndividual({date, stateLineHC, setStateLineHC, stankiObject, stankiKeys}) {
    return (
        <div className="energyCalendarContainer">
            <label className="switch">
                <input type="checkbox" onChange={() => {
                    changeTypeLineIndividual(date, stateLineHC, setStateLineHC, stankiObject, stankiKeys)
                }}/>
                <span className="slider round"></span>
            </label>
        </div>
    )
}

function getStankiState(placeKeys, placesObject) {
    let stankiForState = {}

    placeKeys.forEach(e=>{
        Object.keys(placesObject[e].stanki).forEach(i=>{
            stankiForState[i] = placesObject[e].stanki[i].state
        })
    })
    return stankiForState
}

function getCategoriesState(placeKeys, placesObject) {
    let placeForState = {}
    placeKeys.forEach(e=>{
        placeForState[e] = placesObject[e].placeState
        return placeForState
    })
    return placeForState
}

