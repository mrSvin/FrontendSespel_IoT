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
                 src="../../images/excel_icon.png"
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

