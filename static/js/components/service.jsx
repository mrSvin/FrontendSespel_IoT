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

            let ArrayPeriod = value.map(e=> {
                e.time_service = convertTimeToISO(e.time_service)
                return e.time_service
            })

            let lastPeriod = value.map(e=> {
                return e.period_service
            })

            lastPeriod = lastPeriod[0];

            ArrayPeriod = getArrayPeriodsBetween(ArrayPeriod)

            let dataTable = [];
            value.forEach((e,i) => {
                e.period_service = ArrayPeriod[i]
                dataTable.push(e)
            })

            setDataService(dataTable)

            let allServiceArray = ['2022-07-22 07:08:41', '2022-07-22 07:12:41', '2022-07-22 07:17:40', '2022-07-22 07:21:51', '2022-07-22 08:33:03', '2022-07-22 09:36:36', '2022-07-22 09:57:11', '2022-07-22 09:58:52']
                //value.forEach(element => allServiceArray.push(element.time_service) )

            let info = value.map(e=> {
                return [e.user_name, e.info_works]
            })

           // let info = [['Алексей','Длинная работа, много текста' +
           // 'много текста много текста много текста много текста много текста' +
           // 'много текста много текста много текста' +
           // 'много текста много текста много текста'],['Василий','Эффективная работа мало текста'],
           //     ['1','Эффективная работа мало текста'],['2','Эффективная работа мало текста'],
           //     ['3','Эффективная работа мало текста'],['4','Эффективная работа мало текста'],
           //     ['5','Эффективная работа мало текста'],['6','Эффективная работа мало текста']
           // ]

            highChartServiceHistory(allServiceArray.reverse(), info.reverse())
            highChartServiceNow(allServiceArray.reverse(),lastPeriod)
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


    function makeTehWork(complexName, infoWorks, periodService) {


        fetch('/api/userInfo', {
            method: 'POST'
        })
            .then((response) => response.json())
            .then((data) => {
                console.log(data)
                fetchRequestAddService(data.userName, data.userRole,complexName, infoWorks, periodService,setFormAddService)
            })


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
                    <textarea maxlength="499" id="story" name="story" placeholder="Введите список проведенных работ.."
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
                           makeTehWork(setFormAddService.nameComplex, infoWorks, periodService)
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