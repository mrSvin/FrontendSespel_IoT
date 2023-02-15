function ComplexSutkiAllInfo({
                                 complexName, complexImg, complexMesto,
                                 size, idContainer = null, service,
                                 alarm, programs, laser, report, current, typeLine='multiLine'
                             }) {
    let idLine = `containerLine${idContainer}`
    let idRound = `containerRound${idContainer}`
    let idProgram = null;

    programs != undefined ? idProgram = `containerProgram${idContainer}` : null

    return (
        <div className='complexAllInfo'>
            <ComplexInfo complexName={complexName} complexImg={complexImg} complexMesto={complexMesto}
                         size={size} alarm={alarm} programs={programs} laser={laser} service={service}
                         report={report} current={current}/>
            <div className='highChartsLineRound'>
                <div className="lineComplex">
                    <div className={`lineSukiHighChart ${typeLine == "multiLine"? null : 'lineSwitchShort'}`} id={idLine}></div>
                    {idProgram != null ?
                        <div className="lineProgramHighChart" id={idProgram}></div>
                        : null
                    }
                </div>
                <div className="roundSukiHighChart" id={idRound}></div>
            </div>
        </div>
    )
}

function ComplexInfo({
                         complexName, complexImg, complexMesto, size, alarm,
                         programs, laser, service, report, current
                     }) {
    return (
        <div className="parent_image">

            <div className="blockImage">
                <img
                    className="stanok_img"
                    src={complexImg}/>
            </div>

            <figcaption className="comlexInfo">
                {complexName}
            </figcaption>

            <ComplexButtons complexMesto={complexMesto} size={size} alarm={alarm}
                            programs={programs} laser={laser} service={service} report={report} current={current}/>

        </div>
    )
}

function ComplexSmenaAllIngo({
                                 complexName, complexImg, complexMesto, size, idContainer,
                                 alarm, programs, laser, service, report, current
                             }) {
    let idLine = `containerLine${idContainer}`
    let idRound = `containerRound${idContainer}`

    let idLine2 = `containerLine${idContainer + 1}`
    let idRound2 = `containerRound${idContainer + 1}`

    let idProgram = null;
    let idProgram2 = null;

    if (programs !== 'undefinedsmena') {
        idProgram = `containerProgram${idContainer}`
        idProgram2 = `containerProgram${idContainer + 1}`
    } else programs = undefined

    return (
        <div className='complexAllInfo' id={'containerTotal'}>
            <ComplexInfo complexName={complexName} complexImg={complexImg} complexMesto={complexMesto}
                         size={size} programs={programs} laser={laser} alarm={alarm} service={service}
                         report={report} current={current}/>
            <div className='twoDayDiv'>
                <h1 className="timeInfoSmena">Работа II смены 19:00 - 07:00</h1>
                <div className='oneDay'>
                    <div className='highChartsLineSmena'>
                        <div className='lineComplex'>
                            <div className="lineSukiHighChart" id={idLine}></div>
                            {idProgram != null ?
                                <div className="lineProgramHighChart" id={idProgram}></div>
                                : null
                            }
                        </div>
                        <div className="roundSukiHighChart" id={idRound}></div>
                    </div>
                </div>
                <h1 className="timeInfoSmena">Работа I смены 07:00 - 19:00</h1>
                <div className='oneDay'>
                    <div className='highChartsLineSmena'>
                        <div className='lineComplex'>
                            <div className="lineSukiHighChart" id={idLine2}></div>
                            {idProgram2 != null ?
                                <div className="lineProgramHighChart" id={idProgram2}></div>
                                : null
                            }
                        </div>
                        <div className="roundSukiHighChart" id={idRound2}></div>
                    </div>
                </div>
            </div>
        </div>
    )
}

function ComplexButtons({
                            complexMesto, size, alarm = null, programs = null,
                            laser = null, service = null, report = null,
                            current = null
                        }) {


    let linkService = `/service/${service}`
    let linkReport = `/report/${report}`
    let linkCurrent = `/currentParams/${current}`

    const sizeProperties = {
        '1ploshadkaOutside': { height: 1030, width: 1030 },
        '2ploshadkaOutside': { height: 1030, width: 1030 },
        '2ploshadka': { height: 690, width: 1510 },
        'meh1': { height: 920, width: 920 },
        'ceh6': { height: 910, width: 1010 },
        'sborCeh': { height: 1320, width: 1200 },
        'ceh5': { height: 895, width: 1020 },
        'ceh1': { height: 660, width: 1920 },
        'ceh2': { height: 616, width: 1272 },
        'undefined': {height:1030, width: 1030},
    };

    const { height, width } = sizeProperties[size]

    let mesto = (parameter) => (event) => {

        window.localStorage['mestoParams'] = parameter
        window.open("../mesto/mestoNew", '', 'scrollbars=1,height=' + Math.min(height, screen.availHeight) +
            ',width=' + Math.min(width, screen.availWidth))
    }

    function personal() {

        window.open("../personal/personal_vrs", '', 'scrollbars=1,height=' + Math.min(700, screen.availHeight) +
            ',width=' + Math.min(1200, screen.availWidth))
    }

    let error = (complexName) => (event) => {
        const complexToAlarm = {
            'CTX310 2': '3',
            'NTX1000': '16',
            'NLX3000': '15',
            'GAMMA2000': '1',
            'CTX650': '10',
            'DMF260': '12',
            'DMU50 1': '13',
            'DMU50 2': '14',
            'DMC1035': '11',
            'CTX310 1': '2',
            'CTX510 1': '5'
        };

        let href = complexToAlarm[complexName]
        href = `../stanki/alarm/${href}`

        window.open(href, '', 'scrollbars=1,height=' + Math.min(1000, screen.availHeight) + ',width=' + Math.min(1600, screen.availWidth))
    }

    let program = (complexName) => (event) => {
        let href;
        switch (complexName) {
            case 'APEC':
                href = "../stanki/programTime/apec"
                break
            case 'APECsmena':
                href = "../stanki/programTimeSmena/apec"
                break
            case "Навигатор 1":
                href = "../stanki/programTime/navigator_1"
                break
            case 'Навигатор 2':
                href = "../stanki/programTime/navigator_2_golova_2"
                break
            case 'Навигатор 3':
                href = "../stanki/programTime/navigator_3"
                break
            case "Навигатор 1smena":
                href = "../stanki/programTimeSmena/navigator_1"
                break
            case 'Навигатор 2smena':
                href = "../stanki/programTimeSmena/navigator_2_golova_2"
                break
            case 'Навигатор 3smena':
                href = "../stanki/programTimeSmena/navigator_3"
                break
            case 'TruLaser':
                href = "../stanki/programTime/trulaser"
                break
            case 'TruLasersmena':
                href = "../stanki/programTimeSmena/trulaser"
                break
            case 'CRYSTA-Apex S9168':
                href = "../stanki/programTime/kim"
                break
            case 'CRYSTA-Apex S9168smena':
                href = "../stanki/programTimeSmena/kim"
                break
            case 'МАКС 1':
                href = "../stanki/programTime/maks_1"
                break
            case 'МАКС 1smena':
                href = "../stanki/programTimeSmena/maks_1"
                break
            case 'МАКС 2':
                href = "../stanki/programTime/maks_2"
                break
            case 'МАКС 2smena':
                href = "../stanki/programTimeSmena/maks_2"
                break
            case 'М710':
                href = "../stanki/programTime/m710"
                break
            case 'М710smena':
                href = "../stanki/programTimeSmena/m710"
                break
            case 'РТК12C':
                href = "../stanki/programTime/rtk12c"
                break
            case 'РТК12Csmena':
                href = "../stanki/programTimeSmena/rtk12c"
                break
            case 'P250':
                href = "../stanki/programTime/p250"
                break
            case 'P250smena':
                href = "../stanki/programTimeSmena/p250"
                break
            case 'КРОТ':
                href = "../stanki/programTime/krot"
                break
            case 'КРОТsmena':
                href = "../stanki/programTimeSmena/krot"
                break
            case 'ПРАНС':
                href = "../stanki/programTime/prans"
                break
            case 'ПРАНСsmena':
                href = "../stanki/programTimeSmena/prans"
                break
            default:
                href = "../stanki/programTime/navigator_1"
        }

        window.open(href, '', 'scrollbars=1,height=' + Math.min(1000, screen.availHeight) + ',width=' + Math.min(1600, screen.availWidth))
    }

    let laserButton = (complexName) => (event) => {
        let href;
        switch (complexName) {
            case "Навигатор 1":
                href = "../stanki/navigatorPower/navigator_1"
                break
            case 'Навигатор 2':
                href = "../stanki/navigatorPower/navigator_2_2"
                break
            case 'Навигатор 3':
                href = "../stanki/navigatorPower/navigator_3"
                break

            default:
                href = "../stanki/navigator_1"
        }

        window.open(href, '', 'scrollbars=1,height=' + Math.min(1000, screen.availHeight) + ',width=' + Math.min(1600, screen.availWidth))
    }

    return (

        <div className='parentIcons'>

            <a className="icon_mesto"
               onClick={mesto(complexMesto)}>
                <div className="label">Место</div>
            </a>

            <a className="icon_personal"
               onClick={personal}>
                <div className="label">Персонал</div>
            </a>

            {alarm != null ?
                <a className="icon_error"
                   onClick={error(alarm)}>
                    <div className="label">Ошибки</div>
                </a> :
                <div></div>
            }

            {programs != null ?
                <a className="icon_program"
                   onClick={program(programs)}>
                    <div className="label">Программы</div>
                </a> :
                <div></div>
            }

            {laser != null ?
                <a className="icon_laser"
                   onClick={laserButton(laser)}>
                    <div className="label">Излучение</div>
                </a> :
                <div></div>
            }
            {service != null ?
                <Link to={linkService} className="icon_service">
                    <div className="label">Сервис</div>
                </Link> :
                <div></div>
            }

            {report != null ?
                <Link to={linkReport} className="icon_report">
                    <div className="label">Отчеты</div>
                </Link> :
                <div></div>
            }

            {current != null ?
                <Link to={linkCurrent} className="iconJob">
                    <div className="label">Сигналы</div>
                </Link> :
                <div></div>
            }

        </div>

    )
}

function ComplexTotalSutkiInfo() {
    return (
        <div className='complexAllInfo'>
            <div className='totalRound' id="containerTotal"></div>
            <div className='countOperations' id='containerOperations'></div>
        </div>
    )
}

function ComplexTotalMonthInfo() {
    return (
        <div className='complexAllInfo'>
            <div className='totalRound' id="containerTotal"></div>
            <div className="totalRound" id="containerRoundTotal"></div>
        </div>
    )
}

function SwitchLineHCIndividual({stateLineHC, setStateLineHC, text = 'Переключить тип диаграмм '}) {

    const [disable, setDisable] = useState(false)

    function Activate() {
        setDisable(false)
    }

    return (
        <div className="energyCalendarContainer">
            <div className="switchBlock">
                <p>{text}</p>
                <label className="switch">
                    <input type="checkbox" disabled={disable} checked={stateLineHC == 'multiLine'? false : true} onChange={() => {
                        setDisable(true)
                        if (stateLineHC == 'line') {
                            setStateLineHC('multiLine')
                        } else {
                            setStateLineHC('line')
                        }
                        setTimeout(Activate, 800)
                    }}/>
                    <span className="slider round"></span>
                </label>
            </div>
        </div>
    )
}
