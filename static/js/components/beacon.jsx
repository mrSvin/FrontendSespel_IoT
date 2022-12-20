function BeaconIcon(location) {

    let divStyle;

    if (location.location == 109) {
        console.log(location.location)
        divStyle = {
            transform: `translate(${-200}px, ${380}px)`
        }
    } else if (location.location == 128) {
        console.log(location.location)
        divStyle = {
            transform: `translate(${-400}px, ${700}px)`
        }

    } else if (location.location == 144) {
        console.log(location.location)
        divStyle = {
            transform: `translate(${-400}px, ${80}px)`
        }

    }

    return (
        <div className="pointBeacon" style={divStyle}>
            <div className="menuIcon">
                <span>Буклов А.В</span>
                <span>Таб.№ 1234</span>
                <span>Инженер-программист</span>
            </div>
            <div className="pulse"></div>
        </div>
    )
}

function MapBeacon(location) {

    return (
        <div className="divMap">
            <img src="../images/beaconOffice.png"/>
            <BeaconIcon location={location.location}/>
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
                    <th>Табель</th>
                    <th>Должность</th>
                    <th>Статус</th>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <td>1</td>
                    <td>Буклов А.В</td>
                    <td>1234</td>
                    <td>Инженер-программист</td>
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
    let [location, setLocation] = useState(109);

    let ipList = ['18', '24', '27']

    function fetchCheckDevice(ip) {
        return fetch(`http://192.168.103.${ip}:8083/api/beaconInfo`, {method: 'GET'})
            .then((response) => response.json())
            .then((data) => {
                console.log(data)
                return data[0]
            })
    }



    useEffect(() => {

        let beaconConnect = Promise.all(ipList.map((item) => {
            return fetchCheckDevice(item)
        }));
        beaconConnect.then(data=>{
            console.log(data)
        })


        // let intervalKill = setInterval(function () {

            // if (window.location.pathname !== '/beacon') {
            //     clearInterval(intervalKill)
            // }

            // let beacon = fetchRequestBeacon()
            // let promiseBeacon = Promise.resolve(beacon);
            // promiseBeacon.then(value => {
            //     // console.log(value.location)
            //     if (value.location == 109) {
            //         setLocation(109)
            //     }
            //     if (value.location == 128) {
            //         setLocation(128)
            //     }
            //     if (value.location == 144) {
            //         setLocation(144)
            //     }
            //     console.log("update...")
            // })
        // }, 2000)

    }, []);

    function fetchRequestBeacon() {
        return fetch(`http://192.168.103.24:8083/api/beaconInfo`, {method: 'GET'})
            .then((response) => response.json())
            .then((data) => {
                console.log(data)
                return data[0]
            })
    }

    function fetchRequestBeacon() {
        return fetch(`http://192.168.3.41:8085/api/beaconData`, {method: 'GET'})
            .then((response) => response.json())
            .then((data) => {
                console.log(data)
                return data[0]
            })
    }



    return (
        <div>
            <div className="beaconPage">
                <MapBeacon location={location}/>
                <TableBeacon/>
            </div>
        </div>
    )
}
