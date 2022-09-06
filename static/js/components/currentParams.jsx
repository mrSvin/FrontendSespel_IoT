function TableReportBodyCurrent({dataReportState}) {
    console.log('Logs', dataReportState)
    if(dataReportState.length == 0){
        return <tbody></tbody>
    }
    else{
        return (
            <tbody>
            {dataReportState[0].map((val,i) => {
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

    let [dataReportState, setDataReportState] = useState([])

    function fetchRequestCurrent() {
        fetch('http://192.168.3.41:8087/api/stendLastData', {method: 'GET'})
            .then((response) => response.json())
            .then((data) => {
                console.log('Haha?',data)
                let Name = data.actNum == '1'? '4977.06.008-5001': 'C435064S-5.0301'
                let date = data.lastRequest.slice(0,10) + ' ' + data.lastRequest.slice(11,19)
                let dataReport = [data.requestWriteDB, data.prodNum, data.actNum, data.resultR, Name, data.authorId, data.workMode, data.maxDeformation, data.ostDeformation, data.actForce1R, data.actForce2R, data.needForce, date]
                setDataReportState([
                    [
                    'Регистр состояния записи на сервер','Номер изделия', 'Номер акта', 'Результат',
                    'Номер чертежа', 'ID автора', 'Состояние работы', 'Максимальная деформация',
                    'Остаточная диформация','Фактическая сила (датчик 1), Т', 'Фактическая сила (датчик 2), Т',
                    'Требуемая сила (датчик 2), Т', 'Последнее время получения данных с оборудования'
                    ],
                    dataReport])
            })
    }

    useEffect(() => {
        fetchRequestCurrent()
    },[])

    return(
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
                 src="../../images/excel_icon.png"
                 onClick={() => {
                     TableToExcel.convert(document.getElementById('tableReport'), {
                         name: `Отчет_${timeNow().slice(2).replaceAll(':','')}.xlsx`,
                         sheet: {
                             name: "Sheet 1"
                         }
                     });
                 }}
            />
        </div>
    )
}

