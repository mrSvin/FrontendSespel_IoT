function SkudAdmin() {

    function fetchRequestScudInfoWorkers() {
        return fetch(`/api/scud/infoWorkers`, {method: 'GET'})
            .then((response) => response.json())
            .then((data) => {
                console.log(data[0])
                return data[0]
            })
    }

    function convertSkudAnswerToTable(data) {
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
                }
            }
            let convertedUsers = data.map(user => {
                let object = {}
                object.tabel = user.tabel
                object.type_smena = dataType.type_smena[user.type_smena]
                object.long_smena = dataType.long_smena[user.long_smena]
                object.long_lunch = dataType.long_lunch[user.long_lunch]
                return object
            })
            return convertedUsers
        }
    }

    let action = ['hide', 'add', 'change']

    const [error, setError] = useState(0)
    const [tableBody, setTableBody] = useState(null)
    const [user, setUser] = useState(null)
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
            let convertedData = convertSkudAnswerToTable(data)
            convertedData ? null : setError(1)
            setTableBody(convertedData)
            console.log(convertedData)
        })
    }, [])

    return (
        <div>
            <SkudAdminForm typeForm={typeForm} setTypeForm={setTypeForm} handleOnChange={handleOnChange}/>
            <table className='tableSkudUsers'>
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
            <div className='addButton addButtonSkud' onClick={() => {
                setTypeForm('add')
            }}><span>+</span></div>
        </div>
    )
}

function SkudAdminForm({typeForm, setTypeForm, user, handleOnChange}) {

    return (
        <form className={typeForm == 'hide' ? 'formUserHideSkud' : 'formUserSkud'}>
            <label htmlFor="">Табельный</label>
            <input className={typeForm == 'change' ? 'formUserHideSkud' : null}
                   onChange={(e) => {
                       handleOnChange(e, 'tabel')
                   }}/>
            <label>Тип смены</label>
            <select id="smena" name="smena"
                    onChange={(e) => {
                        handleOnChange(e, 'tabel')
                    }}>
                <option value="Первая смена">Первая смена</option>
                <option value="Вторая смена">Вторая смена</option>
                <option value="Третья смена">Третья смена</option>
                <option value="Администрация">Администрация</option>
            </select>
            <label>Длительность смены</label>
            <div className="smenaTimeSkud">
                <div>
                    <label htmlFor="8hours">
                        <input id='8hours' type="radio" name="long_smena" value="8 часов"
                               onChange={(e) => {
                                   handleOnChange(e, 'long_smena')
                               }}/>
                        8 часов
                    </label>
                    <label htmlFor="7.2hours">
                        <input id='7.2hours' type="radio" name="long_smena" value="7.2 часа"
                               onChange={(e) => {
                                   handleOnChange(e, 'long_smena')
                               }}/>
                        7.2 часа
                    </label>
                </div>
                <div>
                    <label htmlFor="12hours">
                        <input id='12hours' type="radio" name="long_smena" value="12 часов"
                               onChange={(e) => {
                                   handleOnChange(e, 'long_smena')
                               }}/>
                        12 часов
                    </label>
                    <label htmlFor="24hours">
                        <input id='24hours' type="radio" name="long_smena" value="24 часа"
                               onChange={(e) => {
                                   handleOnChange(e, 'long_smena')
                               }}/>
                        24 часа
                    </label>
                </div>
            </div>

            <label htmlFor="">Длительность обеда</label>
            <select id="lunch" name="lunch" onChange={(e) => {
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

