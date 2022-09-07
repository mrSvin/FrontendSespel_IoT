function Report() {
    let nameToFetch = parseNameUrl(document.location.pathname);
    let imgComplex = ["../images/stendResource.png"]

    let complexRequest = 'stendLastData'

    let [dataReportState, setDataReportState] = useState([])

    useEffect(() => {
        fetchRequestReport(complexRequest, setDataReportState)
        },[])

    return(
    <div className='serviceContainer'>
        <h1>Отчеты о ресурсных испытаниях {nameToFetch + 'а'}</h1>
        <div className='blockImage'>
            <img className="serviceImg " src={imgComplex}/>
        </div>
        <table className="tableReport" id='tableReport'>
        <thead>
        <tr>
            <th>Номер акта</th>
            <th>Номер чертежа изделия</th>
            <th>Номер изделия</th>
            <th>Требуемая сила воздействия, т</th>
            <th>Фактическая приложенная сила (датчик 1), т</th>
            {/*<th>Фактическая приложенная сила (датчик 2), т</th>*/}
            <th>Максимальная деформация, мкм</th>
            <th>Остаточная деформация, мкм</th>
            <th>Годность</th>
            <th>Автор испытания</th>
            <th>Дата/время</th>
        </tr>
        </thead>
            <TableReportBody dataReportState={dataReportState}/>
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

function TableReportBody({dataReportState}) {
    return (
    <tbody>
    {dataReportState.map((val,i) => {
        return (
            <tr key={i}>
                <td>{val[0]}</td>
                <td>{val[1]}</td>
                <td>{val[2]}</td>
                <td>{val[3]}</td>
                <td>{val[4]}</td>
                <td>{val[5]}</td>
                <td>{val[6]}</td>
                <td>{val[7]}</td>
                <td>{val[8]}</td>
                <td>{val[9]}</td>
            </tr>
        )
    })}
    </tbody>
    )
}