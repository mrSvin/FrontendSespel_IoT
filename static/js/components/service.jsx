function Service() {

    let [formAddService, setFormAddService] = useState(false);

    let [nameComplex, setNameComplex] = useState("null");

    let [dataService, setDataService] = useState([]);

    useEffect(() => {

        let nameToFetch = parseNameUrl(document.location.pathname);
        setNameComplex(nameToFetch)

        let complex1day1 = fetchRequestServiceInfo(nameToFetch)
        let promiseDataComplex1 = Promise.resolve(complex1day1);

        promiseDataComplex1.then(value => {
            // console.log(value)
            let dataTable = [];
            value.forEach(e => dataTable.push(e))
            setDataService(dataTable)

            let allServiceArray = []
            value.forEach(element => allServiceArray.push(element.time_service) )
            highChartServiceHistory(allServiceArray)
            highChartServiceNow(allServiceArray,31536000000)
        })



    }, [])

    return (
        <div>

            <div className='serviceContainer'>
                <h1>Тех. обслуживания станка {nameComplex}</h1>
                <img className="serviceImg" src='../images/navigator.png'/>
                <div className="oneLineGraph" id="timeToLastService"></div>
                <div className="oneLineGraph" id="allService"></div>
                <button className='buttonTehno' id='startTehno'
                        onClick={() => {
                            setFormAddService(true)
                        }}
                >
                    <span>Провести тех.обслуживание</span>
                </button>
                <table className="tableService">
                    <thead>
                    <tr>
                        <th>Ответственный за обслуживание</th>
                        <th>Время проведения</th>
                        <th>Период между предыдущим сервисом</th>
                        <th>Проведенные работы</th>
                    </tr>
                    </thead>
                    <TableServiceData dataService={dataService}/>
                </table>
            </div>

            {formAddService==true ?
                <FormAddService setFormAddService={setFormAddService} nameComplex={nameComplex} dataService={dataService} setDataService={setDataService}/>
                : null}

        </div>
    )

}

function FormAddService(setFormAddService) {

    const [infoWorks, setInfoWorks] = useState('');

    const [periodService, setPeriodService] = useState('7884000');


    function makeTehWork(complexName, userName, infoWorks, periodService) {
        let myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        let raw = JSON.stringify({
            "complexName": complexName,
            "userName": userName,
            "infoWorks": infoWorks,
            "periodSrvice": periodService
        });

        let requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };


        fetch("http://192.168.3.41:8086/api/addService", requestOptions)
            .then(response => response.text())
            .then(result => {
                console.log('Запрос прошел', result)
                if (result === 'ok') {
                    let newDataTable = setFormAddService.dataService;
                    newDataTable.push({info_works: infoWorks, user_name:"pyatachok", time_service:new Date().toDateString(), period_service:periodService})
                    console.log(newDataTable)
                    setFormAddService.setDataService(newDataTable)
                    setFormAddService.setFormAddService(false)
                }
            })
            .catch(error => console.log('Ошибка, недостаточно прав', error));

    }

    return (
        <form className="formService" method="post" action="" id="form_teh">
                    <span id="formClose"
                          onClick={() => {
                              setFormAddService.setFormAddService(false)
                          }}
                    >ₓ</span>
            <div className="formFill">
                <h2 className="formServiceName">Проведение тех. обслуживания</h2>
                <div className='divWorksPass'>
                    <h3>Проведенные работы</h3>
                    <textarea id="story" name="story" placeholder="Введите список проведенных работ.."
                              value={infoWorks} onChange={e => {
                        setInfoWorks(e.target.value)
                    }}
                    />
                </div>
                <div className="divPeriod">
                    <h3>Период до следующего тех. обслуживания</h3>
                    <select id="listPeriods" name="addPeriod"
                            value={periodService} onChange={e => {
                        console.log(e.target.value)
                        setPeriodService(e.target.value)
                    }}>
                        <option label="3 месяца" value="7884000"></option>
                        <option label="6 месяцев" value="15768000"></option>
                        <option label="1 год" value="31536000"></option>
                    </select>
                </div>
                <input id="submit" type="button" value="Подтвердить"
                       onClick={() => {
                           makeTehWork(setFormAddService.nameComplex, "pyatachok", infoWorks, periodService)
                       }}
                />
            </div>

            <div id="overlay_add"
            ></div>
        </form>
    )
}

function TableServiceData({dataService}) {
    // console.log(data)
    return (
        <tbody>
        {dataService.map((val, key) => {
            return (
                <tr key={key}>
                    <td>{val.user_name}</td>
                    <td>{val.time_service}</td>
                    <td>{val.period_service}</td>
                    <td>{val.info_works}</td>
                </tr>
            )
        })}
        </tbody>
    )
}