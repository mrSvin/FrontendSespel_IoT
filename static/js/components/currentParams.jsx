function CurrentParams() {
    let nameToFetch = parseNameUrl(document.location.pathname);
    let imgComplex = ["../images/stendResource.png"]

    let [dataReportState, setDataReportState] = useState([])

    function fetchRequestCurrent() {
        fetch('http://192.168.3.41:8087/api/stendLastData', {method: 'GET'})
            .then((response) => response.json())
            .then((data) => {
                console.log('Haha?',data)
                let fix = data.actNum == '1'? '4977.06.008-5001': 'C435064S-5.0301'
                let dataReport = [data.requestWriteDB, data.prodNum, data.actNum, data.resultR, fix, data.authorId, data.workMode, data.maxDeformation, data.ostDeformation, data.actForce1R, data.actForce2R, data.needForce, data.lastRequest]
                setDataReportState([Object.keys(data),dataReport])
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

function TableReportBodyCurrent({dataReportState}) {
    console.log('Logs', dataReportState)
    return (
        <tbody>
        {dataReportState[0].map((val,i) => {
            return (
                <tr key={i}>
                    <td>{val[i]}</td>
                    <td>{dataReportState[1][i]}</td>
                </tr>
            )
        })}
        </tbody>
    )
}
