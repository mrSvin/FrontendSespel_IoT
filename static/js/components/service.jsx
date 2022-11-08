function Service() {

    let [formAddService, setFormAddService] = useState(false);

    let [nameComplex, setNameComplex] = useState("null");

    let [imgComplex, setImgComplex] = useState('../images/navigator.png');

    let [dataService, setDataService] = useState([]);

    useEffect(() => {

        let objectImg = {
            'apec': 'apec.png', 'ar55': 'ar55.png', 'crysta-apex': 'crystal_apex.png',
            '?***?': 'dmf.png', 'ctx310': 'dmg_ctx310.png', 'ctx510': 'dmg_ctx510.png',
            'ctx650': 'dmg_ctx650.png', 'dmc1035': 'dmg_dmc1035.png', 'dmf260': 'dmg_dmf260.png',
            'dmu50': 'dmg_dmu50.png', 'эпп': 'epp.png', 'faccin 4': 'faccin.png',
            'faccin 10': 'faccin_2.png', 'trubend':'trubend.png', 'gamma2000': 'gamma2000.png', 'комета': 'kometa.png',
            'навигатор': 'navigator.png', 'нк600': 'nk600.png', 'nlx3000': 'NLX3000.png',
            'ntx1000': 'ntx1000.png', 'печь': 'pech.png', 'литейная': 'liteyka.png', 'пресс': 'press.png',
            'стп': 'progress.png', 'макс': 'robot.png', 'м710': 'robot.png',
            'ртк12c': 'robot.png', 'крот': 'robot.png', 'пранс': 'robot.png',
            'p250': 'robot_p250.png', 'sk50': 'sk50.png', 'склад': 'sklad.png',
            'стп13м': 'stp13m.png', 'trulaser': 'trulaser.png',
            'увф-1': 'uvf_1_2.png', 'уф5220': 'UVF_5220.png', 'врс1': 'nasos.png',
            'врс2': 'nasos_vrs2.png', 'котельная': 'gazStation.png', 'ктп400': 'electroStation.png',
            'ктп630': 'electroStation.png', 'ктп2500': 'electroStation.png', 'ктп400': 'electroStation.png',
            'cтенд': 'stendResource.png'
        }

        let exceptions = ['faccin']

        let nameToFetch = parseNameUrl(document.location.pathname);
        setNameComplex(nameToFetch)

        let keys = Object.keys(objectImg)

        let img = '../images/navigator.png'

        keys.forEach(e => {
            let inUrl = nameToFetch
            inUrl = (inUrl.split(' ')[0]).toLowerCase();
            if (e.includes(inUrl) && !exceptions.includes(inUrl)) {
                img = objectImg[inUrl];
                img = `../images/${img}`
            } else if (exceptions.includes(inUrl)) {
                img = objectImg[nameToFetch.toLowerCase()];
                img = `../images/${img}`
            }
        })

        setImgComplex(img)

        let complex1day1 = fetchRequestServiceInfo(nameToFetch)
        let promiseDataComplex1 = Promise.resolve(complex1day1);

        promiseDataComplex1.then(value => {
            if (value.length == 0) return 0

            let ArrayPeriod = value.map(e => {
                e.time_service = convertTimeToISO(e.time_service)
                return e.time_service
            })

            ArrayPeriod = getArrayPeriodsBetween(ArrayPeriod)

            let dataTable = [];
            value.forEach((e, i) => {
                e.timeNext = e.period_service
                e.period_service = ArrayPeriod[i]
                dataTable.push(e)
            })

            setDataService(dataTable)


            let lastPeriod = value[0].timeNext
            let allServiceArray = [] //'2022-07-22 07:08:41', '2022-07-22 07:12:41', '2022-07-22 07:17:40', '2022-07-22 07:21:51', '2022-07-22 08:33:03', '2022-07-22 09:36:36', '2022-07-22 09:57:11', '2022-07-22 09:58:52']
            value.forEach(element => allServiceArray.push(element.time_service))

            let info = value.map(e => {
                return [e.user_name, e.info_works]
            })

            highChartServiceHistory(allServiceArray.reverse(), info.reverse())
            highChartServiceNow(allServiceArray.reverse(), lastPeriod)
        })


    }, [])

    return (
        <div>

            <div className='serviceContainer'>
                <h1>Тех. обслуживания станка {nameComplex}</h1>
                <div className='blockImage'>
                    <img className="serviceImg " src={imgComplex}/>
                </div>
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

            {formAddService == true ?
                <FormAddService setFormAddService={setFormAddService} nameComplex={nameComplex}
                                dataService={dataService} setDataService={setDataService}/>
                : null}

        </div>
    )

}

function FormAddService(setFormAddService) {

    let [infoWorks, setInfoWorks] = useState('');

    let [periodService, setPeriodService] = useState('7884000');

    let [errorService, setErrorService] = useState("")

    function makeTehWork(complexName, infoWorks, periodService) {


        fetch('/api/userInfo', {
            method: 'POST'
        })
            .then((response) => response.json())
            .then((data) => {
                fetchRequestAddService(data.userName, data.userRole, complexName, infoWorks, periodService, setFormAddService, errorService, setErrorService)
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
                    <textarea maxLength="499" id="story" name="story" placeholder="Введите список проведенных работ.."
                              value={infoWorks} onChange={e => {
                        setInfoWorks(e.target.value)
                    }}
                    />
                </div>
                <div className="divPeriod">
                    <h3>Период до следующего тех. обслуживания</h3>
                    <select id="listPeriods" name="addPeriod"
                            value={periodService} onChange={e => {
                        setPeriodService(e.target.value)
                    }}>
                        <option label="3 месяца" value="7884000"></option>
                        <option label="6 месяцев" value="15768000"></option>
                        <option label="1 год" value="31536000"></option>
                    </select>
                </div>
                <p className="error-msg">{errorService}</p>
                <button id="submit" type="button"
                        onClick={() => {
                            makeTehWork(setFormAddService.nameComplex, infoWorks, periodService)
                        }}
                >Подтвердить
                </button>
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
                    <td>{val.period_service.replace('—', '')}</td>
                    <td>{val.info_works}</td>
                </tr>
            )
        })}
        </tbody>
    )
}