function Report() {

    let dataReport = [{1:'Инфа1',2:'Инфа2',3:'Инфа3',4:'Инфа4'},{1:'Инфа5', 2:'Инфа6', 3:'Инфа7', 4:'Инфа8'}]

    useEffect(() => {
        console.log('Ну привет')
        })


    return(
    <div>
        <h2>Отчеты о ресурсных испытаниях</h2>
        <table className="tableService">
        <thead>
        <tr>
            <th>Ответственный за обслуживание</th>
            <th>Время проведения</th>
            <th>Период между предыдущим сервисом</th>
            <th>Проведенные работы</th>
        </tr>
        </thead>
        <tbody>
        {dataReport.map((val) => {
            return (
                <tr>
                    <td>{val[1]}</td>
                    <td>{val[2]}</td>
                    <td>{val[3]}</td>
                    <td>{val[4]}</td>
                </tr>
            )
        })}
        </tbody>
    </table>
    </div>
    )
}