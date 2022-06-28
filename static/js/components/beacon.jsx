function BeaconIcon() {
    return (
        <div className="pointBeacon">
            <table className="tableIcon">
                <tbody>
                <tr>
                    <td>Буклов А.В</td>
                    <td>1234</td>
                    <td>Инженер программист</td>
                </tr>
                </tbody>
            </table>
        </div>
    )
}

function MapBeacon() {
    return (
        <div className="divMap">
            <img src="../images/beaconOffice.png"/>
            <BeaconIcon/>
        </div>
    )
}

function TableBeacon() {
    return (
        <div className="divTable ">
            <div className="beaconMenuButton">
                <span className="beaconMenuButtonInside"></span>
                <span className="beaconMenuButtonInside"></span>
                <span className="beaconMenuButtonInside"></span>
            </div>
            <div className="searchField">
                <input type="text" placeholder="Поиск сотрудника..."/>
            </div>

            <table className="tableBeacon">
                <thead>
                    <tr>
                        <th>№</th>
                        <th>ФИО</th>
                        <th>Таб.номер</th>
                        <th>Должность</th>
                        <th>Статус</th>
                    </tr>
                </thead>
                <tbody>
                <tr>
                    <td>1</td>
                    <td>Буклов А.В</td>
                    <td>1234</td>
                    <td>Инженер программист</td>
                    <td><span className="statusActive"></span></td>
                </tr>
                <tr>
                    <td>2</td>
                    <td>Васильев А.В</td>
                    <td>1432</td>
                    <td>Начальник КБ5</td>
                    <td><span className="statusNoActive"></span></td>
                </tr>
                </tbody>
            </table>
        </div>
    )
}

function Beacon() {
    let [top, setTop] = useState(659);
    let [left, setLeft] = useState(-331);

    useEffect(() => {

        for (var i = 0; i < 1; i += 1) {
            (function (i) {
                setInterval(function () {

                    let beacon = fetchRequestBeacon()
                    let promiseBeacon = Promise.resolve(beacon);
                    promiseBeacon.then(value => {
                        // console.log(value.location)
                        if (value.location == 109) {
                            setTop(645)
                            setLeft(-318)
                        }
                        if (value.location == 128) {
                            setTop(30)
                            setLeft(-358)
                        }
                        if (value.location == 144) {
                            setTop(400)
                            setLeft(1200)
                        }
                    })


                }, 2000)
            })(i);
        }

    }, []);

    function fetchRequestBeacon() {
        return fetch(`http://192.168.3.41:8085/api/beaconData`, {method: 'GET'})
            .then((response) => response.json())
            .then((data) => {
                return data[0]
            })
    }


    // let divStyle = {
    //     transform: `translate(${left}px, ${top}px)`
    // }


    return (
        <div>
            <Header/>
            <div className="beaconPage">
                <MapBeacon/>
                <TableBeacon/>
            </div>
        </div>
    )
}
