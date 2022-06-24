function Beacon() {

    let [top, setTop] = useState(100);
    let [left, setLeft] = useState(200);

    useEffect(() => {

        for (var i = 0; i < 1; i += 1) {
            (function (i) {
                setInterval(function () {

                    let beacon = fetchRequestBeacon()
                    let promiseBeacon = Promise.resolve(beacon);
                    promiseBeacon.then(value => {
                        // console.log(value.location)
                        if (value.location==109) {
                            setTop(100)
                            setLeft(400)
                        }
                        if (value.location==128) {
                            setTop(700)
                            setLeft(400)
                        }
                        if (value.location==144) {
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


    let divStyle = {
        transform: `translate(${left}px, ${top}px)`
    }


    return (
        <div>

            <Header/>

            <button className="iconBeacon"
                style={divStyle}
            >test
            </button>

        </div>
    )
}