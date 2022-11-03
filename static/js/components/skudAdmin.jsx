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

    const [error, setError] = useState(0)
    const [tableBody, setTableBody] = useState(null)

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
            <SkudAdminForm/>
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
                    tableBody.map(user => {
                        return (
                            <tr>
                                <td>{user.tabel}</td>
                                <td>{user.type_smena}</td>
                                <td>{user.long_smena}</td>
                                <td>{user.long_lunch}</td>
                                <td>
                                    <div className='tdChange'></div>
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
            <div className='addButton addButtonSkud'><span>+</span></div>
        </div>
    )
}

function SkudAdminForm() {

    let action = ['hide', 'add', 'change']
    const [typeForm, setTypeForm] = useState('hide')

    return (
        <form className={typeForm == 'hide' ? 'formUserHideSkud' : 'formUserSkud'}>
            <label htmlFor="">Табельный</label>
            <input className={typeForm == 'change' ? 'formUserHideSkud' : null}/>
            <label>Тип смены</label>
            <select id="smena" name="smena">
                <option value="1">Первая смена</option>
                <option value="2">Вторая смена</option>
                <option value="3">Третья смена</option>
                <option value="А">Администрация</option>
            </select>
            <label>Длительность смены</label>
            <div className="smenaTimeSkud">
                <div>
                    <label htmlFor="8hours">
                        <input id='8hours' type="radio" name="longSmena" value="8"/>
                        8 часов
                    </label>
                    <label htmlFor="7.2hours">
                        <input id='7.2hours' type="radio" name="longSmena" value="7.2"/>
                        7.2 часа
                    </label>
                </div>
                <div>
                    <label htmlFor="12hours">
                        <input id='12hours' type="radio" name="longSmena" value="12"/>
                        12 часов
                    </label>
                    <label htmlFor="24hours">
                        <input id='24hours' type="radio" name="longSmena" value="24"/>
                        24 часа
                    </label>
                </div>
            </div>

            <label htmlFor="">Длительность обеда</label>
            <select id="lunch" name="lunch">
                <option value="1">30 минут</option>
                <option value="2">60 минут</option>
                <option value="3">90 минут</option>
            </select>
            <button type="submit">{typeForm == 'add' ? 'Добавить' : 'Изменить'}</button>
        </form>
    )
}

