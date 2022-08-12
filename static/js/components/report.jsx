function Report() {

    let dataReport = [
        {'number':0,'numChertIz':'4977.06.008-5001','numIz':10,
            'needForce':3.333, 'factForce1':3.2, 'factForce2':3.1, 'maxDeform':99.5,
            'leftDeform':0.1, 'godnost':'Годен', 'author':'Иванов И.И.', 'date':'10.10.2021'},
        {'number':1,'numChertIz':'C50L25RS-5.0001','numIz':11,
            'needForce':4.444, 'factForce1':4.3, 'factForce2':4.2, 'maxDeform':100.0,
            'leftDeform':0.2, 'godnost':'Не годен', 'author':'Иванов И.И.', 'date':'11.10.2021'}
        ]

    useEffect(() => {
        console.log('Ну привет')
        })


    return(
    <div>
        <h2>Отчеты о ресурсных испытаниях</h2>
        <table className="tableService">
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
        <tbody>
        {dataReport.map((val,i) => {
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
    </table>
    </div>
    )
}