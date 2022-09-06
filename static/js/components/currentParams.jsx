function TableReportBodyCurrent({dataReportState}) {
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

function CurrentParams() {
    let nameToFetch = parseNameUrl(document.location.pathname);
    let imgComplex = ["../images/stendResource.png"]

    let [dataReportState, setDataReportState] = useState([])

    function fetchRequestCurrent(dataReport) {
        fetch('http://192.168.3.41:8087/api/stendLastData', {method: 'GET'})
            .then((response) => response.json())
            .then((data) => {
                let dataReport = data.map(e=>{
                    let fix = e.drawNum == '1'? '4977.06.008-5001': 'C435064S-5.0301'
                    return [
                        Object.keys(e),
                        [e.requestWriteDB, e.prodNum, e.actNum, e.resultR, fix, e.authorId, e.workMode, e.maxDeformation, e.ostDeformation, e.actForce1R, e.actForce2R, e.needForce, e.lastRequest]
                    ]
                })
                setDataReportState(dataReport)
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
