function MapBeacon() {
    return (
        <div className="divMap">
            <img
                src="https://sun9-64.userapi.com/impf/iptmjsWQr9JrTI20JbltbW7oFptzABRqWiacHQ/o93yMeNF_Jk.jpg?size=399x732&amp;quality=96&amp;sign=d36fcd3df2efc9b7893eaf1acbec6097&amp;type=album"/>
            <div className="pointBeacon">
                <ul className="beaconList">
                    <li><a href="#">Чел1</a></li>
                    <li><a href="#">Чел2</a></li>
                    <li><a href="#">Чел3</a></li>
                </ul>
            </div>
        </div>
    )
}

function TableBeacon() {
    return (
        <div className="divTable ">
            <div className="searchField">
                <input type="text" placeholder="Поиск сотрудника..."/>
            </div>

            <table className="tableBeacon">
                <thead>
                <th>№</th>
                <th>ФИО</th>
                <th>Табельный номер</th>
                <th>Должность</th>
                </thead>
                <tbody>
                <tr>
                    <td>1</td>
                    <td>Буклов А.В</td>
                    <td>1234</td>
                    <td>Инженер программист</td>
                </tr>
                <tr>
                    <td>2</td>
                    <td>Васильев А.В</td>
                    <td>1432</td>
                    <td>Начальник КБ5</td>
                </tr>
                </tbody>
            </table>
        </div>
    )
}

function Beacon() {
    let [top, setTop] = useState(645);
    let [left, setLeft] = useState(-318);

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

            <MapBeacon/>
            <TableBeacon/>

        </div>
    )
}
