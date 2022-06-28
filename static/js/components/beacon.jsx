function PointBeacon() {
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


    let divStyle = {
        transform: `translate(${left}px, ${top}px)`
    }

    function dropList(listClassName) {
        document.addEventListener('click', function (e) { // событие клика по веб-документу
            let div = document.getElementsByClassName(listClassName)[0]; // тут указываем указание класса

            // Клик по точке
            if (e.target == div && div.querySelector('ul').classList.length > 1) {
                div.querySelector('ul').classList.remove('visible')
            }

            //Если по содержимому списка
            else if(e.target !== div) {

                // Состояние клика, если true, то список скроется
                let clickState = true;

                // Проверяем не был ли клик в одном из полей списка
                for (let i = 0; i < div.querySelectorAll('a').length; i++) {
                    if (div.querySelectorAll('a')[i] !== e.target) {
                    }// изменение состояние, означает, ято список при клике не исчезнет
                    else clickState = false;
                }
                clickState ? div.querySelector('ul').classList.remove('visible') : null
                return
                // Иначе сделать список видимым
            } else div.querySelector('ul').classList.add('visible')

        });
    }

    dropList('pointBeacon');

    return (
        <div className="pointBeacon" style={divStyle}>
            <ul className="beaconList">
                <li><a href="#">Чел1</a></li>
                <li><a href="#">Чел2</a></li>
                <li><a href="#">Чел3</a></li>
            </ul>
        </div>
        )
}

function DivMap() {
    return (
        <div className="divMap">
            <img
                src="https://sun9-64.userapi.com/impf/iptmjsWQr9JrTI20JbltbW7oFptzABRqWiacHQ/o93yMeNF_Jk.jpg?size=399x732&amp;quality=96&amp;sign=d36fcd3df2efc9b7893eaf1acbec6097&amp;type=album"/>
            <PointBeacon/>
        </div>
    )
}

function SearchField() {
    function findPerson(div, text) {
        let personList = []
        for (let i = 1; i < div.length; i++) {
            for (let j = 1; j < div[i].querySelectorAll('td').length; j++) {
                if (div[i].querySelectorAll('td')[j].innerHTML.includes(text) && text !== '') {
                    console.log("Найдено совпадение в номере", div[i].querySelectorAll('td')[0].innerHTML, 'Поле -', text)
                    personList.push(i)
                }
            }
        }
        paintSearch(div, personList)
    }

    return (
        <div className="searchField">
            <input type="text" placeholder="Поиск сотрудника"/>
        </div>
    )
}

function TableBeacon() {
    function getNamePaint(div, index) {
        console.log(div[index].querySelectorAll('td')[1].innerHTML)
        for (let j = 1; j < div.length; j++) {
            div[j].classList.remove('selectedTr');
        }
        div[index].classList.add('selectedTr')
    }

    function paintSearch(div, array) {
        if (array.length == 0 || div.length == 0) {
            for (let j = 1; j < div.length; j++) {
                div[j].classList.remove('selectedTr')
            }
            return
        }
        for (let j = 1; j < div.length; j++) {
            div[j].classList.remove('selectedTr')
        }
        for (let i = 0; i < array.length; i++)
            div[array[i]].classList.add('selectedTr');
    }

    return (
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
    )
}

function DivTable() {
    return (
        <div className="divTable ">
            <SearchField/>
            <TableBeacon/>
        </div>
    )
}

function Beacon() {
    let divTable = document.getElementsByClassName('divTable')[0].querySelectorAll('tr')
    for (let i = 1; i < divTable.length; i++) {
        divTable[i].addEventListener('click', () => {
            getNamePaint(divTable, i)
        })
    }

    let search = document.querySelector('.searchField');
    let inputSearch = search.querySelector('input')

    inputSearch.addEventListener('change', function () {
            // можете делать все что угодно со значением текстового поля
            console.log(this.value);
            findPerson(divTable, this.value)
        }
    )

    return (
        <div className="beaconPage">
            <DivMap/>
            <DivTable/>
        </div>
    )
}

// function Beacon() {
//
//     let [top, setTop] = useState(100);
//     let [left, setLeft] = useState(200);
//
//     useEffect(() => {
//
//         for (var i = 0; i < 1; i += 1) {
//             (function (i) {
//                 setInterval(function () {
//
//                     let beacon = fetchRequestBeacon()
//                     let promiseBeacon = Promise.resolve(beacon);
//                     promiseBeacon.then(value => {
//                         // console.log(value.location)
//                         if (value.location == 109) {
//                             setTop(100)
//                             setLeft(400)
//                         }
//                         if (value.location == 128) {
//                             setTop(700)
//                             setLeft(400)
//                         }
//                         if (value.location == 144) {
//                             setTop(330)
//                             setLeft(-218)
//                         }
//                     })
//
//
//                 }, 2000)
//             })(i);
//         }
//
//     }, []);
//
//     function fetchRequestBeacon() {
//         return fetch(`http://192.168.3.41:8085/api/beaconData`, {method: 'GET'})
//             .then((response) => response.json())
//             .then((data) => {
//                 return data[0]
//             })
//     }
//
//
//     let divStyle = {
//         transform: `translate(${left}px, ${top}px)`
//     }
//
//
//     return (
//         <div>
//
//             <Header/>
//
//             <button className="iconBeacon"
//                     style={divStyle}
//             >test
//             </button>
//
//         </div>
//     )
// }