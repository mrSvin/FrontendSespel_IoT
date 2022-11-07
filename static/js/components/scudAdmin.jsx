function ScudAdmin() {

    function fetchRequestScudInfoWorkers() {
        return fetch(`/api/scud/infoWorkers`, {method: 'GET'})
            .then((response) => response.json())
            .then((data) => {
                return data[0]
            })
    }

    function fetchRequestScudAddWorkers() {
        return fetch(`/api/scud/infoWorkers`, {method: 'GET'})
            .then((response) => response.json())
            .then((data) => {
                return data[0]
            })
    }

    function convertScudAnswerToTable(data) {
        if (data[0] == 'many request') {
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
            let convertedUsers = data.map(user => {
                let object = {}
                object.tabel = user.tabel
                object.type_smena = dataType.type_smena[user.type_smena]
                object.long_smena = dataType.long_smena[user.long_smena]
                object.long_lunch = dataType.long_lunch[user.long_lunch]
                object.long_smenaBool = dataType.long_smenaBool

                object.long_smenaBool[user.long_smena] = true

                return object
            })
            console.log('Новое решение? ',convertedUsers)
            return convertedUsers
        }
    }

    let action = ['hide', 'add', 'change']

    const [error, setError] = useState(0)
    const [tableBody, setTableBody] = useState(null)
    const [user, setUser] = useState(
        {
            tabel: '',
            type_smena: 'Первая смена',
            long_smena: '',
            long_lunch: '',
            long_smenaBool: {
                '8 ч.': false,
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

    useEffect(() => {
        let promise = fetchRequestScudInfoWorkers()
        promise.then(data => {
            let convertedData = convertScudAnswerToTable(data)
            convertedData ? null : setError(1)
            setTableBody(convertedData)
            console.log(convertedData)
        })
    }, [])

    return (
        <div>
            <ScudAdminForm typeForm={typeForm} setTypeForm={setTypeForm} user={user} handleOnChange={handleOnChange}/>
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
                    tableBody.map((user, i) => {
                        return (
                            <tr key={i}>
                                <td>{user.tabel}</td>
                                <td>{user.type_smena}</td>
                                <td>{user.long_smena}</td>
                                <td>{user.long_lunch}</td>
                                <td>
                                    <div className='tdChange' onClick={() => {
                                        setUser(user)
                                        setTypeForm('change')
                                    }}></div>
                                </td>
                                <td>
                                    <div className='tdDelete'></div>
                                </td>
                            </tr>
                        )
                    })
                }
                </tbody>
            </table>
            <div className='addButton addButtonScud' onClick={() => {
                setTypeForm('add')
            }}><span>+</span></div>
        </div>
    )
}

function ScudAdminForm({typeForm, setTypeForm, user, handleOnChange}) {

    return (
        <form className={typeForm == 'hide' ? 'formUserHideScud' : 'formUserScud'}>
            <label htmlFor="">Табельный{typeForm == 'change' ? user.tabel : null}</label>
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
                        <input id='8hours' type="radio" name="long_smena" value="8 часов" checked={user.long_smenaBool['8 ч.']}
                               onChange={(e) => {
                                   handleOnChange(e, 'long_smena')
                               }}/>
                        8 часов
                    </label>
                    <label htmlFor="7.2hours">
                        <input id='7.2hours' type="radio" name="long_smena" value="7.2 часа" checked={user.long_smenaBool['7.2 ч.']}
                               onChange={(e) => {
                                   handleOnChange(e, 'long_smena')
                               }}/>
                        7.2 часа
                    </label>
                </div>
                <div>
                    <label htmlFor="12hours">
                        <input id='12hours' type="radio" name="long_smena" value="12 часов" checked={user.long_smenaBool['12 ч.']}
                               onChange={(e) => {
                                   handleOnChange(e, 'long_smena')
                               }}/>
                        12 часов
                    </label>
                    <label htmlFor="24hours">
                        <input id='24hours' type="radio" name="long_smena" value="24 часа" checked={user.long_smenaBool['24 ч.']}
                               onChange={(e) => {
                                   handleOnChange(e, 'long_smena')
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
            <button type="button">{typeForm == 'add' ? 'Добавить' : 'Изменить'}</button>
        </form>
    )
}

