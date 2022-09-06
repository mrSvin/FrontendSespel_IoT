function CurrentParams() {
    let nameToFetch = parseNameUrl(document.location.pathname);
    let imgComplex = ["../images/stendResource.png"]

    let [dataReportState, setDataReportState] = useState([])

    function fetchRequestCurrent(dataReport) {
        fetch('http://192.168.3.41:8087/api/stendLastData', {method: 'GET'})
            .then((response) => response.json())
            .then((data) => {
                let dataReport = data.map(e=>{
                    let fix = e.numberDrawing == '1'? '4977.06.008-5001': 'C435064S-5.0301'
                    return [e.numberAct, fix, e.numberProduct, e.requiredForce, e.actualForce, e.maxDeformation, e.ostDeformation, e.valid, e.author, e.dateTime]
                })
                setDataReportState(dataReport)
            })
    }

    useEffect(() => {
        fetchRequestCurrent()
    },[])

    function changeData(){
        let dataReport = [
            {'number':2,'numChertIz':'495123525001','numIz':121350,
                'needForce':353333, 'factForce1':22, 'factForce2':3531, 'maxDeform':93.5,
                'leftDeform':12.1, 'godnost':'Годен', 'author':'Буклов А.В.', 'date':'10.08.2022'},
            {'number':3,'numChertIz':'C435064S-5.0301','numIz':41,
                'needForce':24, 'factForce1':11.3, 'factForce2':33.2, 'maxDeform':100.0,
                'leftDeform':0.9, 'godnost':'Не годен', 'author':'Буклов А.В.', 'date':'11.08.2022'}
        ]
        fetchRequestReport(dataReport)
    }


    return(
        <div className='serviceContainer'>
            <h1>Текущее состояние {nameToFetch + 'а'}</h1>
            <div className='blockImage'>
                <img className="serviceImg " src={imgComplex}/>
            </div>
            {/*<button*/}
            {/*    onClick={() => {*/}
            {/*        changeData()*/}
            {/*    }}*/}
            {/*>*/}
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

// function TableReportBody({dataReportState}) {
//
//     return (
//         <tbody>
//         {dataReportState.map((val,i) => {
//             return (
//                 <tr key={i}>
//                     <td>{val.number}</td>
//                     <td>{val.numChertIz}</td>
//                     <td>{val.numIz}</td>
//                     <td>{val.needForce}</td>
//                     <td>{val.factForce1}</td>
//                     <td>{val.factForce2}</td>
//                     <td>{val.maxDeform}</td>
//                     <td>{val.leftDeform}</td>
//                     <td>{val.godnost}</td>
//                     <td>{val.author}</td>
//                     <td>{val.date}</td>
//                 </tr>
//             )
//         })}
//         </tbody>
//     )
// }