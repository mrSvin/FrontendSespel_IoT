function TableReportBodyCurrent({dataReportState}) {
    console.log('Logs', dataReportState)
    if (dataReportState.length == 0) {
        return <tbody></tbody>
    } else {
        return (
            <tbody>
            {dataReportState[0].map((val, i) => {
                return (
                    <tr key={i}>
                        <td>{val}</td>
                        <td>{dataReportState[1][i]}</td>
                    </tr>
                )
            })}
            </tbody>
        )
    }
}

function CurrentParams() {
    let nameToFetch = parseNameUrl(document.location.pathname);
    let imgComplex = ["../images/stendResource.png"]
    let complexRequest = 'stendLastData'

    let [dataReportState, setDataReportState] = useState([])

    useEffect(() => {
        fetchRequestCurrent(complexRequest, setDataReportState)
    }, [])

    return (
        <div className='serviceContainer'>
            <h1>Текущее состояние {nameToFetch + 'а'}</h1>
            <div className='blockImage'>
                <img className="serviceImg " src={imgComplex}/>
            </div>
            <table className="tableReport" id='tableReport'>
                <thead>
                <tr>
                    <th>Имя параметра</th>
                    <th>Значение</th>
                </tr>
                </thead>
                <TableReportBodyCurrent dataReportState={dataReportState}/>
            </table>
            <img className="excelIcon" id="button-excel"
                 src="../../images/excel_icon.svg"
                 onClick={() => {
                     TableToExcel.convert(document.getElementById('tableReport'), {
                         name: `Отчет_${timeNow().slice(2).replaceAll(':', '')}.xlsx`,
                         sheet: {
                             name: "Sheet 1"
                         }
                     });
                 }}
            />
        </div>
    )
}

function Signals() {

    let nameToFetch = parseNameUrl(document.location.pathname);

    let signalsMap = {
        navigator1: {name:'Навигатор 1', img:'../images/navigator.png'},
        navigator2: {name:'Навигатор 2', img:'../images/navigator.png'},
        navigator3: {name:'Навигатор 3', img:'../images/navigator.png'},
        maks1: {name:'МАКС 1', img:'../images/robot.png'},
        maks2: {name:'МАКС 2', img:'../images/robot.png'},
        m710: {name:'М710', img:'../images/robot.png'},
        rtk12c: {name:'РТК12C', img:'../images/robot.png'},
        p250: {name:'P250', img:'../images/robot_p250.png'},
        krot: {name:'М710 2', img:'../images/robot.png'},
        prans: {name:'ПРАНС', img:'../images/robot.png'},
    }


    let [dataSignals, setdataSignals] = useState(null)
    let [lastTime, setLastTime] = useState(null)

    useEffect(() => {
        let promiseSignal = fetchRequestSignals(nameToFetch)
        promiseSignal.then(data=>{
            setLastTime(new Date().getTime() - data['receiving time'])
            delete data['receiving time']
            setdataSignals(data)
        })
    }, [])

    return (
        <div className='serviceContainer'>
            <h1>Текущее состояние {signalsMap[nameToFetch].name}</h1>
            <div className='blockImage'>
                <img className="serviceImg " src={signalsMap[nameToFetch].img}/>
            </div>
            {(lastTime == null || isNaN(lastTime))? null :
                <h2>Время получения данных {lastTime >= 90000? `${msToTime(lastTime)} назад`: 'текущее'}</h2>
            }
            <table className="tableReport" id='tableSignal'>
                <thead>
                <tr>
                    <th>Имя параметра</th>
                    <th>Значение</th>
                </tr>
                </thead>
                <tbody>
                {dataSignals == null? null : Object.keys(dataSignals).map(keyName => {
                    return (
                        <tr key={keyName}>
                            <td>{keyName}</td>
                            <td>{dataSignals[keyName]}</td>
                        </tr>
                    )
                })}
                </tbody>
            </table>
            <img className="excelIcon" id="button-excel"
                 src="../../images/excel_icon.svg"
                 onClick={() => {
                     TableToExcel.convert(document.getElementById('tableSignal'), {
                         name: `Отчет_${timeNow().slice(2).replaceAll(':', '')}.xlsx`,
                         sheet: {
                             name: "Sheet 1"
                         }
                     });
                 }}
            />
        </div>
    )
}

