function Report() {
    let dataReport = [
        {'number':0,'numChertIz':'4977.06.008-5001','numIz':10,
            'needForce':3.333, 'factForce1':3.2, 'factForce2':3.1, 'maxDeform':99.5,
            'leftDeform':0.1, 'godnost':'Годен', 'author':'Иванов И.И.', 'date':'10.10.2021'},
        {'number':1,'numChertIz':'C50L25RS-5.0001','numIz':11,
            'needForce':4.444, 'factForce1':4.3, 'factForce2':4.2, 'maxDeform':100.0,
            'leftDeform':0.2, 'godnost':'Не годен', 'author':'Иванов И.И.', 'date':'11.10.2021'}
        ]

    let [stendName, setStendName] = useState('неизвестно')

    let [dataReportState, setDataReportState] = useState([])

    useEffect(() => {
        let nameToFetch = parseNameUrl(document.location.pathname);
        setStendName(nameToFetch)
        setDataReportState(dataReport)
        })

    // function changeData(){
    //     let dataReport = [
    //         {'number':2,'numChertIz':'495123525001','numIz':121350,
    //             'needForce':353333, 'factForce1':22, 'factForce2':3531, 'maxDeform':93.5,
    //             'leftDeform':12.1, 'godnost':'Годен', 'author':'Буклов А.В.', 'date':'10.08.2022'},
    //         {'number':3,'numChertIz':'C435064S-5.0301','numIz':41,
    //             'needForce':24, 'factForce1':11.3, 'factForce2':33.2, 'maxDeform':100.0,
    //             'leftDeform':0.9, 'godnost':'Не годен', 'author':'Буклов А.В.', 'date':'11.08.2022'}
    //     ]
    //     setDataReportState(dataReport)
    // }


    return(
    <div className='serviceContainer'>
        <h1>Отчеты о ресурсных испытаниях {stendName}</h1>
        {/*<button onClick={changeData()}>*/}
        {/*    Обновить данные*/}
        {/*</button>*/}
        <table className="tableReport" id='tableReport'>
        <thead>
        <tr>
            <th>Номер акта</th>
            <th>Номер чертежа изделия</th>
            <th>Номер изделия</th>
            <th>Требуемая сила воздействия, т</th>
            <th>Фактическая приложенная сила (датчик 1), т</th>
            <th>Фактическая приложенная сила (датчик 2), т</th>
            <th>Максимальная деформация, мкм</th>
            <th>Остаточная деформация, мкм</th>
            <th>Годность</th>
            <th>Автор испытания</th>
            <th>Дата/время</th>
        </tr>
        </thead>
            <TableReportBody dataReportState={dataReportState}/>
    </table>
    </div>
    )
}

function TableReportBody({dataReportState}) {
    console.log('Логика для длины...')
    return (
    <tbody>
    {dataReportState.map((val,i) => {
        return (
            <tr key={i}>
                <td>{val.number}</td>
                <td>{val.numChertIz}</td>
                <td>{val.numIz}</td>
                <td>{val.needForce}</td>
                <td>{val.factForce1}</td>
                <td>{val.factForce2}</td>
                <td>{val.maxDeform}</td>
                <td>{val.leftDeform}</td>
                <td>{val.godnost}</td>
                <td>{val.author}</td>
                <td>{val.date}</td>
            </tr>
        )
    })}
    </tbody>
    )
}