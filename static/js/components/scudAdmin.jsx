function fetchRequestScudInfoWorkers() {
    return fetch(`/api/scud/infoWorkers`, {method: 'GET'})
        .then((response) => response.json())
        .then((data) => {
            return data[0]
        })
}

function fetchRequestScudAddWorkers(userData) {
    let myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    let raw = JSON.stringify(userData)

    let requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
    };


    return fetch(`/api/scud/addWorker`, requestOptions)
        .then(response => response.text())
        .then((result) => {
            return result
        })
        .catch(error => console.log('Ошибка при отправке запроса', error));
}

function fetchRequestScudUpdateWorkers(userData) {
    let myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    let raw = JSON.stringify(userData)

    let requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
    };


    return fetch(`/api/scud/updateWorker`, requestOptions)
        .then(response => response.text())
        .then((result) => {
            return result
        })
        .catch(error => console.log('Ошибка при отправке запроса', error));
}

function fetchRequestScudDeleteWorkers(tabel) {

    return fetch(`/api/scud/deleteWorker/tabel:${tabel}`, {method: 'POST'})
        .then(response => response.text())
        .then((result) => {
            if (result == 'ok') console.log('Пользователь удален')
            else console.log('Такой пользователя нет')
        })
        .catch(error => console.log('Ошибка при отправке запроса', error));
}


function convertScudAnswerToTable(userData) {
    if (userData[0] == 'many request') {
        return null
    } else {
        let dataType = {
            type_smena: {
                '1': 'Первая смена',
                '2': 'Вторая смена',
                '3': 'Третья смена',
                'А': 'Администрация'
            },
            long_smena: {
                '8': '8 ч.',
                '7.2': '7.2 ч.',
                '12': '12 ч.',
                '24': '24 ч.',
            },
            long_lunch: {
                '30': '30 минут',
                '60': '60 минут',
                '90': '90 минут',
            },
            long_smenaBool: {
                '8 ч.': false,
                '7.2 ч.': false,
                '12 ч.': false,
                '24 ч.': false,
            },
        }
        let convertedUsers = userData.map(user => {
            let object = {}
            object.tabel = user.tabel
            object.type_smena = dataType.type_smena[user.type_smena]
            object.long_smena = dataType.long_smena[user.long_smena]
            object.long_lunch = dataType.long_lunch[user.long_lunch]
            object.long_smenaBool = dataType.long_smenaBool

            object.long_smenaBool[object.long_smena] = true

            return object
        })
        return convertedUsers
    }
}

function convertScudToFetch(userData) {
    let dataType = {
        type_smena: {
            'Первая смена': '1',
            'Вторая смена': '2',
            'Третья смена': '3',
            'Администрация': 'А',
        },
        long_smena: {
            '8 ч.': '8',
            '7.2 ч.': '7.2',
            '12 ч.': '12',
            '24 ч.': '24',
        },
        long_lunch: {
            '30 минут': '30',
            '60 минут': '60',
            '90 минут': '90',
        },
    }

    let convertedData = {
        longLunch: dataType.long_lunch[userData.long_lunch],
        longSmena: dataType.long_smena[userData.long_smena],
        tabel: userData.tabel,
        typeSmena: dataType.type_smena[userData.type_smena],
    }
    return convertedData
}

function ScudAdmin() {

    const [errorMessage, setErrorMessage] = useState(null)
    const [tableBody, setTableBody] = useState(null)
    const [user, setUser] = useState(
        {
            tabel: '',
            type_smena: 'Первая смена',
            long_smena: '8 ч.',
            long_lunch: '60 минут',
            long_smenaBool: {
                '8 ч.': true,
                '7.2 ч.': false,
                '12 ч.': false,
                '24 ч.': false,
            },
        })


    const [typeForm, setTypeForm] = useState('hide')

    function handleOnChange(e, key) {
        const {value} = e.target;
        setUser(prevState => ({
            ...prevState,
            [key]: value
        }));
    };

    function handleOnChangeBool(e) {
        const {value} = e.target;

        let long_smenaBool = {
            '8 ч.': false,
            '7.2 ч.': false,
            '12 ч.': false,
            '24 ч.': false,
        }

        long_smenaBool[value] = true


        setUser(prevState => ({
            ...prevState,
            long_smenaBool
        }));
    };

    function updateTable() {
        let promise = fetchRequestScudInfoWorkers()
        promise.then(data => {
            let convertedData = convertScudAnswerToTable(data)
            convertedData ? null : setErrorMessage(['Не удалось загрузить базу пользователей', 'redMessage'])
            setTableBody(convertedData)
        })
    }

    useEffect(() => {
        updateTable()
    }, [])

    return (
        <div>
            <ScudAdminForm typeForm={typeForm} user={user} handleOnChange={handleOnChange}
                           handleOnChangeBool={handleOnChangeBool} updateTable={updateTable}
                           errorMessage={errorMessage} setErrorMessage={setErrorMessage}/>
            <table className='tableScudUsers'>
                <thead>
                <tr>
                    <th>Табельный</th>
                    <th>Тип смены</th>
                    <th>Длительность смены</th>
                    <th>Длительность обеда</th>
                    <th></th>
                    <th></th>
                </tr>
                </thead>
                <tbody>
                {tableBody == null ? null :
                    tableBody.map((userTable, i) => {
                        return (
                            <tr key={i}>
                                <td>{userTable.tabel}</td>
                                <td>{userTable.type_smena}</td>
                                <td>{userTable.long_smena}</td>
                                <td>{userTable.long_lunch}</td>
                                <td>
                                    <div className='tdChange' onClick={() => {
                                        setUser(userTable)
                                        if (user.tabel == userTable.tabel && typeForm == 'change') {
                                            setTypeForm('hide')
                                            setErrorMessage(['', ''])
                                        } else setTypeForm('change')
                                    }}></div>
                                </td>
                                <td>
                                    <div className='tdDelete' onClick={() => {
                                        let deletePromise = fetchRequestScudDeleteWorkers(userTable.tabel)
                                        deletePromise.then(() => {
                                            updateTable()
                                        })
                                    }}></div>
                                </td>
                            </tr>
                        )
                    })
                }
                </tbody>
            </table>
            <div className='addButton addButtonScud' onClick={() => {
                if (typeForm == 'add') {
                    setTypeForm('hide')
                    setErrorMessage(['', ''])
                } else setTypeForm('add')
            }}><span>+</span></div>
        </div>
    )
}

function ScudAdminForm({
                           typeForm, user, handleOnChange,
                           handleOnChangeBool, updateTable,
                           errorMessage, setErrorMessage
                       }) {

    return (
        <form className={typeForm == 'hide' ? 'formUserHideScud' : 'formUserScud'}>
            <label htmlFor="">Табельный {typeForm == 'change' ? user.tabel : null}</label>
            <input className={typeForm == 'change' ? 'formUserHideScud' : null}
                   value={user.tabel}
                   onChange={(e) => {
                       handleOnChange(e, 'tabel')
                   }}/>
            <label>Тип смены</label>
            <select id="smena" name="smena" value={user.type_smena}
                    onChange={(e) => {
                        handleOnChange(e, 'type_smena')
                    }}>
                <option value="Первая смена">Первая смена</option>
                <option value="Вторая смена">Вторая смена</option>
                <option value="Третья смена">Третья смена</option>
                <option value="Администрация">Администрация</option>
            </select>
            <label>Длительность смены</label>
            <div className="smenaTimeScud">
                <div>
                    <label htmlFor="8hours">
                        <input id='8hours' type="radio" name="long_smena" value='8 ч.'
                               checked={user.long_smenaBool['8 ч.']}
                               onChange={(e) => {
                                   handleOnChange(e, 'long_smena')
                                   handleOnChangeBool(e)
                               }}/>
                        8 часов
                    </label>
                    <label htmlFor="7.2hours">
                        <input id='7.2hours' type="radio" name="long_smena" value='7.2 ч.'
                               checked={user.long_smenaBool['7.2 ч.']}
                               onChange={(e) => {
                                   handleOnChange(e, 'long_smena')
                                   handleOnChangeBool(e)
                               }}/>
                        7.2 часа
                    </label>
                </div>
                <div>
                    <label htmlFor="12hours">
                        <input id='12hours' type="radio" name="long_smena" value='12 ч.'
                               checked={user.long_smenaBool['12 ч.']}
                               onChange={(e) => {
                                   handleOnChange(e, 'long_smena')
                                   handleOnChangeBool(e)
                               }}/>
                        12 часов
                    </label>
                    <label htmlFor="24hours">
                        <input id='24hours' type="radio" name="long_smena" value='24 ч.'
                               checked={user.long_smenaBool['24 ч.']}
                               onChange={(e) => {
                                   handleOnChange(e, 'long_smena')
                                   handleOnChangeBool(e)
                               }}/>
                        24 часа
                    </label>
                </div>
            </div>

            <label htmlFor="">Длительность обеда</label>
            <select id="lunch" name="lunch" value={user.long_lunch} onChange={(e) => {
                handleOnChange(e, 'long_lunch')
            }}>
                <option value="30 минут">30 минут</option>
                <option value="60 минут">60 минут</option>
                <option value="90 минут">90 минут</option>
            </select>
            <button type="button"
                    onClick={() => {
                        if (user.type_smena == '' || user.tabel == '' || user.long_smena == '' || user.long_lunch == '') {
                            setErrorMessage(['Заполните поле табеля', 'redMessage'])
                            return null
                        }
                        if (typeForm == 'add') {
                            let addPromise = fetchRequestScudAddWorkers(convertScudToFetch(user))
                            addPromise.then((data) => {
                                if(data == 'ok'){
                                    updateTable()
                                    setErrorMessage(['Пользователь добавлен', 'greenMessage'])
                                } else setErrorMessage(['Не удалось добавить пользователя', 'redMessage'])
                            })
                        } else if (typeForm == 'change') {
                            let changePromise = fetchRequestScudUpdateWorkers(convertScudToFetch(user))
                            changePromise.then((data) => {
                                if(data == 'ok'){
                                    updateTable()
                                    setErrorMessage(['Пользователь изменен', 'greenMessage'])
                                } else setErrorMessage(['Не удалось изменить пользователя', 'redMessage'])
                            })
                        }
                    }}>{typeForm == 'add' ? 'Добавить' : 'Изменить'}
            </button>
            <p className={`errorMessage ${errorMessage[1]}`}>{errorMessage[0]}</p>
        </form>
    )
}

