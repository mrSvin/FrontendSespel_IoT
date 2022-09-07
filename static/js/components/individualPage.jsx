function IndividualPageInfo() {

    //  [0]     [1]         [2]          [3]         [4]         [5]          [6]
    // Name, serviceName, alarmName, programsName, laserName,  reportName, currentName
    let complexName = [
        ["CRYSTA-Apex S9168", "CRYSTA-Apex S9168", null, "CRYSTA-Apex S9168"],
        ["НК600", "НК600"],
        ["УФ5220","УФ5220"],
        ["СТП Сеспель", 'СТП Сеспель'],
        ["NTX1000 2", "NTX1000 2"],
        ["SK50",  'SK50'],
        ["APEC", "APEC"],
        ["DMU50 3", "DMU50 3"],
        ["DMU50 4", "DMU50 4"],
        ["CTX310 2",  'CTX310 2', 'CTX310 2'],
        ["CTX510 2", "CTX510 2"],
        ["CTX510 3", "CTX510 3"],
        ["CTX310 3", "CTX310 3"],
        ["CTX510 4",  'CTX510 4'],
        ["CTX510 5", "CTX510 5"],
        ["DMC1035 2", "DMC1035 2"],
        ["DMU50 5", "DMU50 5"],
        ["DMU50 6", "DMU50 6"],
        ["DMU50 7", "DMU50 7"],
        ["AR55", "AR55"],
        ["Навигатор 1","Навигатор 1",  null,"Навигатор 1", "Навигатор 1"],
        ["Навигатор 2", 'Навигатор 2', null, "Навигатор 2", "Навигатор 2"],
        ["Навигатор 3", "Навигатор 3", null, "Навигатор 3", "Навигатор 3"],
        ["TruLaser",  'TruLaser'],
        ["Комета 1", "Комета 1"],
        ["Комета 2", "Комета 2"],
        ["Комета 3", "Комета 3"],
        ["УВФ-1 1","УВФ-1 1"],
        ["УВФ-1 2","УВФ-1 2"],
        ["NTX1000","NTX1000","NTX1000"],
        ["NLX3000","NLX3000","NLX3000"],
        ["GAMMA2000","GAMMA2000","GAMMA2000"],
        ["CTX650","CTX650","CTX650"],
        ["DMF260","DMF260","DMF260"],
        ["DMU50 1","DMU50 1","DMU50 1"],
        ["DMU50 2","DMU50 2","DMU50 2"],
        ["DMC1035","DMC1035","DMC1035"],
        ["CTX310 1","CTX310 1","CTX310 1"],
        ["CTX510 1","CTX510 1","CTX510 1"],
        ["МАКС 1", "МАКС 1"],
        ["МАКС 2", 'МАКС 2'],
        ["М710", "М710"],
        ["РТК12C", 'РТК12C'],
        ["P250", "P250"],
        ["КРОТ", 'КРОТ'],
        ["ПРАНС", "ПРАНС"],
        ["Пресс ЧПУ для ступиц","Пресс ЧПУ для ступиц"],
        ["ЭПП","ЭПП"],
        ["СТП13М","СТП13М"],
        ['Стенд для ресурсных испытаний','Стенд для ресурсных испытаний', null, null, null, 'Стенд','Стенд'],
        ["Склад Мех. цеха","Склад Мех. цеха"],
        ["Печь Индукционная", "Печь Индукционная"],
        ["FACCIN 4","FACCIN 4"],
        ["FACCIN 10","FACCIN 10"],
    ]

    let complexImg = [
        "../images/crystal_apex.png", "../images/nk600.png", "../images/UVF_5220.png",
        "../images/progress.png", "../images/ntx1000.png", "../images/sk50.png",
        "../images/apec.png", "../images/dmg_dmu50.png","../images/dmg_dmu50.png",
        "../images/dmg_ctx310.png", "../images/dmg_ctx510.png", "../images/dmg_ctx510.png",
        "../images/dmg_ctx310.png","../images/dmg_ctx510.png", "../images/dmg_ctx510.png",
        "../images/dmg_dmc1035.png", "../images/dmg_dmu50.png", "../images/dmg_dmu50.png",
        "../images/dmg_dmu50.png", "../images/ar55.png", "../images/navigator.png",
        "../images/navigator.png", "../images/navigator.png", "../images/trulaser.png",
        "../images/kometa.png", "../images/kometa.png", "../images/kometa.png",
        "../images/uvf_1_2.png", "../images/uvf_1_2.png", "../images/ntx1000.png",
        "../images/NLX3000.png", "../images/gamma2000.png", "../images/dmg_ctx650.png",
        "../images/dmg_dmf260.png", "../images/dmg_dmu50.png", "../images/dmg_dmu50.png",
        "../images/dmg_dmc1035.png", "../images/dmg_ctx310.png", "../images/dmg_ctx510.png",
        "../images/robot.png", "../images/robot.png", "../images/robot.png", "../images/robot.png",
        "../images/robot_p250.png", "../images/robot.png", "../images/robot.png","../images/press.png",
        "../images/epp.png", "../images/stp13m.png", "../images/stendResource.png", "../images/sklad.png",
        "../images/pech.png", "../images/faccin.png", "../images/faccin_2.png",
    ]

    let complexRequest = [
        'kim', 'nk600','uvf5220', 'progress', 'ntx1000_2', 'sk50', 'apec',
        'dmg_dmu50_3', 'dmg_dmu50_4', 'dmg_ctx310_2', 'dmg_ctx510_2', 'dmg_ctx510_3',
        'dmg_ctx310_3','dmg_ctx510_4', 'dmg_ctx510_5', 'dmg_dmc1035_2','dmg_dmu50_5',
        'dmg_dmu50_6', 'dmg_dmu50_7', 'ar55', 'navigator_1', 'navigator_2_golova_2',
        'navigator_3', 'trulaser', 'kometa_1', 'kometa_2', 'kometa_3', 'uvf_1', 'uvf_2',
        'ntx1000', 'nlx3000', 'dmg_gamma2000', 'dmg_ctx650', 'dmg_dmf260', 'dmg_dmu50_1',
        'dmg_dmu50_2', 'dmg_dmc1035', 'dmg_ctx310_1','dmg_ctx510_1','maks_1', 'maks_2', 'm710',
        'rtk12c', 'p250', 'krot', 'prans', 'press', 'epp', 'stp13m', 'trulaser', 'sclad_meh',
        'pech_nerg', 'faccin_1','faccin_2',
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

    // Массив номеров всех станков
    let values = complexRequest.map((e, i) => i)

    // Состояние даты
    let [date, setDate] = useState(0);

    // Состояние переменной мульти Диаграммы
    let [stateLineHC, setStateLineHC] = useState("multiLine");

    // Состояния чекбоксов станков
    let [selectedObjects, setSelectedObjects] = useState(
        new Array(complexRequest.length).fill(false)
    );

    let [valuesState, setValuesState] = useState(values)

    let [valuesStateWait, setValuesStateWait] = useState(values)

    if(localStorage['valuesState'] != null) {
        setValuesState(parseInt(window.localStorage['valuesState'])); // Если она уже локально задана сохраняем
    }
    else window.localStorage['valuesState'] = values

    const [isActive, setActive] = useState(false);

    const toggleClass = () => {
        setActive(!isActive);
        if (isActive) newDate(date)
    };

    const handleOnChange = (position) => {
        const updatedCheckedState = selectedObjects.map((item, index) => {
            return index === position ? !item : item;
        });

        setSelectedObjects(updatedCheckedState)

        const activeValues = []
        updatedCheckedState.forEach(
            (currentState, index) => {
                if (currentState) {
                    activeValues.push(values[index]);
                }
            }
        );

        window.localStorage['valuesState'] = activeValues
        setValuesState(activeValues);

    };

    useEffect(() => {
        let dateInput = dayNow()
        setDate(dateInput)

        let fetchNames = valuesState.map(i => {
            return complexRequest[i]
        })

        let complexNames = valuesState.map(i => {
            return complexName[i]
        })

        let stankiRequest = Promise.all(fetchNames.map((item) => {
            return fetchRequest(dateInput, item)
        }));

        updateLoadData(stankiRequest, dateInput, complexNames, fetchNames, stateLineHC)

    }, [])

    function newDate(dateInput) {
        setDate(dateInput)
        setValuesStateWait(valuesState)

        let fetchNames = valuesState.map(i => {
            return complexRequest[i]
        })

        let complexNames = valuesState.map(i => {
            return complexName[i]
        })

        let stankiRequest = Promise.all(fetchNames.map((item) => {
            return fetchRequest(dateInput, item)
        }));
        updateLoadData(stankiRequest, dateInput, complexNames, fetchNames, stateLineHC)

    }


    return (
        <div>
            <div className="energyCalendarContainer">
                <DayCalendar newDate={newDate} date={date}/>
                <div className='menuSelect selectDevice'>
                    <span onClick={toggleClass}>Выбор оборудования</span>
                    <div className="listComplex">
                        <span>▼</span>
                        <ul className='toppings-list'
                            className={isActive ? 'toppings-list toppings-list-visible' : 'toppings-list'}>
                            {complexName.map((name, index) => {
                                return (
                                    <li key={index}>
                                        <div className="toppings-list-item">
                                            <div className="left-section">
                                                <input
                                                    type="checkbox"
                                                    id={`custom-checkbox-${index}`}
                                                    name={name[0]}
                                                    value={index}
                                                    checked={selectedObjects[index]}
                                                    onChange={() => handleOnChange(index)}
                                                />
                                                <label htmlFor={`custom-checkbox-${index}`}></label><span
                                                className='spanList'>{name[0]}</span>
                                            </div>
                                        </div>
                                    </li>
                                );
                            })}
                        </ul>

                    </div>
                </div>
            </div>
            <ComplexTotalSutkiInfo/>

            <SwitchLineHC date={date} stateLineHC={stateLineHC} setStateLineHC={setStateLineHC}
                          complexName={complexName} complexRequest={complexRequest} valuesState={valuesStateWait}/>

            {valuesStateWait.map((e, i) => {
                return <ComplexSutkiAllInfo key={i} complexName={complexName[e][0]} complexImg={complexImg[e]}
                                            complexMesto={buttonsVrs[e]} size={size[e]} idContainer={i + 1}
                                            service={complexName[e][1]} alarm={complexName[e][2]}
                                            programs={complexName[e][3]} laser={complexName[e][4]}
                                            report={complexName[e][5]} current={complexName[e][6]}/>
            })}
        </div>
    )

}

function IndividualPage() {

    return (
        <div>

            <MenuStanki menuSelected="otk"/>

            <div className="buttons-otchet">

                <Link to="/stanki/otk">
                    <div className="menuSelect">СУТОЧНЫЙ ОТЧЕТ</div>
                </Link>

                <Link to="/stanki/otkMonth">
                    <div className="menuNoSelect">МЕСЯЧНЫЙ ОТЧЕТ</div>
                </Link>

                <Link to="/stanki/otkSmena">
                    <div className="menuNoSelect">СМЕННЫЙ ОТЧЕТ</div>
                </Link>

            </div>

            <IndividualPageInfo/>

        </div>
    )
}