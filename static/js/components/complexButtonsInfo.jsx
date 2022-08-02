function ComplexSutkiAllInfo({complexName, complexImg, complexMesto, size, idContainer, alarm, programs, laser, service}) {
    let idLine = `containerLine${idContainer}`
    let idRound = `containerRound${idContainer}`
    return (
        <div className='complexAllInfo'>
            <ComplexInfo complexName={complexName} complexImg={complexImg} complexMesto={complexMesto} size={size} alarm={alarm} programs={programs} laser={laser} service={service}/>
            <div className="lineSukiHighChart" id={idLine}></div>
            <div className="roundSukiHighChart" id={idRound}></div>
        </div>
    )
}

function ComplexInfo({complexName, complexImg, complexMesto, size, alarm, programs, laser, service}) {
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

            <ComplexButtons complexMesto={complexMesto} size={size} alarm={alarm} programs={programs} laser={laser} service={service}/>

        </div>
    )
}

function ComplexSmenaAllIngo({complexName, complexImg, complexMesto, size, idContainer, alarm, programs, laser, service}) {
    let idLine = `containerLine${idContainer}`
    let idRound = `containerRound${idContainer}`

    let idLine2 = `containerLine${idContainer+1}`
    let idRound2 = `containerRound${idContainer+1}`
    return (
        <div className='complexAllInfo' id={'containerTotal'}>
            <ComplexInfo complexName={complexName} complexImg={complexImg} complexMesto={complexMesto}
                         size={size} programs={programs} laser={laser} alarm={alarm} service={service}/>
            <div className='twoDayDiv'>
                <h1 className="timeInfoSmena">Работа II смены 19:00 - 07:00</h1>
                <div className='oneDay'>
                    <div className="lineSukiHighChart" id={idLine}></div>
                    <div className="roundSukiHighChart" id={idRound}></div>
                </div>
                <h1 className="timeInfoSmena">Работа I смены 07:00 - 19:00</h1>
                <div className='oneDay'>
                    <div className="lineSukiHighChart" id={idLine2}></div>
                    <div className="roundSukiHighChart" id={idRound2}></div>
                </div>
            </div>
        </div>
    )
}

function ComplexButtons({complexMesto, size, alarm = null, programs = null, laser = null, service = null}) {

    let hight = null
    let width = null

    let linkService = `/service/${service}`

    switch (size) {
        case '1ploshadkaOutside': {
            hight = 1030
            width = 1030
            break;
        }
        case '2ploshadkaOutside': {
            hight = 1030
            width = 1030
            break;
        }
        case '2ploshadka': {
            hight = 690
            width = 1510
            break;
        }
        case 'meh1': {
            hight = 920
            width = 920
            break;
        }
        case 'ceh6': {
            hight = 910
            width = 1010
            break;
        }
        case 'sborCeh': {
            hight = 1320
            width = 1200
            break;
        }
        case 'ceh5': {
            hight = 895
            width = 1020
            break;
        }
        case 'ceh1': {
            hight = 660
            width = 1920
            break;
        }
        case 'ceh2': {
            hight = 616
            width = 1272
            break;
        }
        default: {
            hight = 1030
            width = 1030
        }
    }

    let mesto = (parameter) => (event) => {

        window.localStorage['mestoParams'] = parameter
        window.open("../mesto/mestoNew", '', 'scrollbars=1,height=' + Math.min(hight, screen.availHeight) +
            ',width=' + Math.min(width, screen.availWidth))
    }

    function personal() {

        window.open("../personal/personal_vrs", '', 'scrollbars=1,height=' + Math.min(700, screen.availHeight) +
            ',width=' + Math.min(1200, screen.availWidth))
    }

    let error = (complexName) => (event) => {
        let href;
        switch (complexName) {
            case "CTX310 #2":
                href = "../stanki/alarm/3"
                break
            case 'NTX1000':
                href = "../stanki/alarm/16"
                break
            case 'NLX3000':
                href = "../stanki/alarm/15"
                break
            case 'GAMMA2000':
                href = "../stanki/alarm/1"
                break
            case 'CTX650':
                href = "../stanki/alarm/10"
                break
            case 'DMF260':
                href = "../stanki/alarm/12"
                break
            case 'DMU50 #1':
                href = "../stanki/alarm/13"
                break
            case 'DMU50 #2':
                href = "../stanki/alarm/14"
                break
            case 'DMC1035':
                href = "../stanki/alarm/11"
                break
            case 'CTX310 #1':
                href = "../stanki/alarm/2"
                break
            case 'CTX510 #1':
                href = "../stanki/alarm/5"
                break
            default:
                href = "../stanki/alarm/1"
        }

        window.open(href, '', 'scrollbars=1,height='+Math.min(1000, screen.availHeight)+',width='+Math.min(1600, screen.availWidth))
    }

    let program = (complexName) => (event) => {
        let href;
        switch (complexName) {
            case "Навигатор #1":
                href = "../stanki/programTime/navigator_1"
                break
            case 'Навигатор #2':
                href = "../stanki/programTime/navigator_2_golova_2"
                break
            case 'Навигатор #3':
                href = "../stanki/programTime/navigator_3"
                break
            case "Навигатор #1smena":
                href = "../stanki/programTimeSmena/navigator_1"
                break
            case 'Навигатор #2smena':
                href = "../stanki/programTimeSmena/navigator_2_golova_2"
                break
            case 'Навигатор #3smena':
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
            default:
                href = "../stanki/programTime/navigator_1"
        }

        window.open(href, '', 'scrollbars=1,height='+Math.min(1000, screen.availHeight)+',width='+Math.min(1600, screen.availWidth))
    }

    let laserButton = (complexName) => (event) => {
        let href;
        switch (complexName) {
            case "Навигатор #1":
                href = "../stanki/navigatorPower/navigator_1"
                break
            case 'Навигатор #2':
                href = "../stanki/navigatorPower/navigator_2_2"
                break
            case 'Навигатор #3':
                href = "../stanki/navigatorPower/navigator_3"
                break

            default:
                href = "../stanki/navigator_1"
        }

        window.open(href, '', 'scrollbars=1,height='+Math.min(1000, screen.availHeight)+',width='+Math.min(1600, screen.availWidth))
    }

    return (

        <div className='parentIcons'>

            <a className="icon_mesto"
               onClick={mesto(complexMesto)}>
                <div className="label_mesto">Место</div>
            </a>

            <a className="icon_personal"
               onClick={personal}>
                <div className="label_personal">Персонал</div>
            </a>

            {alarm != null ?
                <a className="icon_error"
                   onClick={error(alarm)}>
                    <div className="label_error">Ошибки</div>
                </a> :
                <div></div>
            }

            {programs != null ?
                <a className="icon_program"
                   onClick={program(programs)}>
                    <div className="label_program">Программы</div>
                </a> :
                <div></div>
            }

            {laser != null ?
                <a className="icon_laser"
                   onClick={laserButton(laser)}>
                    <div className="label_laser">Излучение</div>
                </a> :
                <div></div>
            }
            {service != null ?
                <Link to={linkService} className="icon_service">
                    <div className="label_service">Сервис</div>
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

function SwitchLineHC({date,stateLineHC, setStateLineHC,bufferData,complexRequest}) {
    return (
        <div className="energyCalendarContainer">
            <label className="switch">
                <input type="checkbox" onChange={() => {
                    changeTypeLine(date,stateLineHC, setStateLineHC,bufferData,complexRequest)
                }}/>
                <span className="slider round"></span>
            </label>
        </div>
    )

}