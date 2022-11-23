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
                '7': '7.2 ч.',
                '12': '12 ч.',
                '24': '24 ч.',
            },
            long_lunch: {
                '30': '30 минут',
                '60': '60 минут',
                '90': '90 минут',
            }
        }
        let convertedUsers = userData.map(user => {
            let object = {}
            let smenaBool = {
                '8 ч.': false,
                '7.2 ч.': false,
                '12 ч.': false,
                '24 ч.': false,
            }

            object.tabel = user.tabel
            object.type_smena = dataType.type_smena[user.type_smena]
            object.long_smena = dataType.long_smena[user.long_smena]
            object.long_lunch = dataType.long_lunch[user.long_lunch]

            object.long_smenaBool = smenaBool
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
            '7.2 ч.': '7',
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

function classToTypeForm(typeForm) {

    if (typeForm == 'hide') return 'formHideUsersControl'

    if (typeForm == 'add') return 'formUsersControl tableBorderAdd'

    if (typeForm == 'change') return 'formUsersControl tableBorderChange'

}

function UsersControl() {


    const [typeForm, setTypeForm] = useState('hide')
    const [clickedDeleteButton, setClickedDeleteButton] = useState(true)
    const [errorMessage, setErrorMessage] = useState(['', ''])
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
        // updateTable()
    }, [])

    return (
        <div>
            <AdminFormUpdateAdd typeForm={typeForm} user={user} handleOnChange={handleOnChange}
                                handleOnChangeBool={handleOnChangeBool} updateTable={updateTable}
                                errorMessage={errorMessage} setErrorMessage={setErrorMessage}/>
            <table className={`tableUsersControl`}>
                <thead>
                <tr>
                    <th>ID</th>
                    <th>Логин</th>
                    <th>Права доступа</th>
                    <th>Электронная почта</th>
                    <th>Фото</th>
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
                                <td><div>Фото</div></td>
                                <td>
                                    <div className='tdChange' onClick={() => {
                                        setUser(userTable)
                                        setErrorMessage(['', ''])
                                        if (user.tabel == userTable.tabel && typeForm == 'change') {
                                            setTypeForm('hide')
                                        } else setTypeForm('change')
                                    }}></div>
                                </td>
                                <td>
                                    <div className={`tdDelete ${clickedDeleteButton ? '' : 'noActiveButton'}`}
                                         onClick={() => {
                                             let deletePromise = fetchRequestScudDeleteWorkers(userTable.tabel)
                                             deletePromise.then(() => {
                                                 updateTable()
                                                 setClickedDeleteButton(false)
                                                 setTimeout(() => {
                                                     setClickedDeleteButton(true)
                                                 }, 1000)
                                             })
                                         }}></div>
                                </td>
                            </tr>
                        )
                    })
                }
                </tbody>
            </table>
            <div className='addButton addButtonUsersControl' onClick={() => {
                if (typeForm == 'add') {
                    setTypeForm('hide')
                    setErrorMessage(['', ''])
                } else setTypeForm('add')
            }}><span>+</span></div>
        </div>
    )
}

function AdminFormUpdateAdd({
                                typeForm, user, handleOnChange,
                                handleOnChangeBool, updateTable,
                                errorMessage, setErrorMessage
                            }) {

    return (
        <form className={classToTypeForm(typeForm)}>
            <label htmlFor="">Логин {typeForm == 'change' ? user.tabel : null}</label>
            <input className={typeForm == 'change' ? 'formHideUsersControl' : null}
                   value={user.tabel}
                   onChange={(e) => {
                       handleOnChange(e, 'tabel')
                   }}/>
            <label htmlFor="">Пароль {typeForm == 'change' ? user.tabel : null}</label>
            <input className={typeForm == 'change' ? 'formHideUsersControl' : null}
                   value={user.tabel}
                   onChange={(e) => {
                       handleOnChange(e, 'tabel')
                   }}/>
            <label htmlFor="">Почта {typeForm == 'change' ? user.tabel : null}</label>
            <input className={typeForm == 'change' ? 'formHideUsersControl' : null}
                   value={user.tabel}
                   onChange={(e) => {
                       handleOnChange(e, 'tabel')
                   }}/>
            <label htmlFor="">Адрес фото {typeForm == 'change' ? user.tabel : null}</label>
            <input className={typeForm == 'change' ? 'formHideUsersControl' : null}
                   value={user.tabel}
                   onChange={(e) => {
                       handleOnChange(e, 'tabel')
                   }}/>
            <label>Права доступа</label>
            <div className='typeSmenaWrapper'>
                <select id="smena" name="smena" value={user.type_smena}
                        onChange={(e) => {
                            handleOnChange(e, 'type_smena')
                        }}>
                    <option value="ROLE_USER">Пользователь</option>
                    <option value="ROLE_ADMIN">Админ</option>
                    <option value="ROLE_SERVICE">Сервисное обслуживание</option>
                </select>
            </div>

            <button type="button"
                    onClick={() => {
                        if (user.type_smena == '' || user.tabel == '' || user.long_smena == '' || user.long_lunch == '') {
                            setErrorMessage(['Заполните поле табеля', 'redMessage'])
                            return null
                        }
                        if (typeForm == 'add') {
                            let addPromise = fetchRequestScudAddWorkers(convertScudToFetch(user))
                            addPromise.then((data) => {
                                if (data == 'ok') {
                                    updateTable()
                                    setErrorMessage(['Пользователь добавлен', 'greenMessage'])
                                } else setErrorMessage(['Не удалось добавить пользователя', 'redMessage'])
                            })
                        } else if (typeForm == 'change') {
                            let changePromise = fetchRequestScudUpdateWorkers(convertScudToFetch(user))
                            changePromise.then((data) => {
                                if (data == 'ok') {
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

