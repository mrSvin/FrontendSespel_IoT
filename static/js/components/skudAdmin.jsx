function SkudAdmin() {

    function fetchRequestScudInfoWorkers() {
        return fetch(`/api/scud/infoWorkers`, {method: 'GET'})
            .then((response) => response.json())
            .then((data) => {
                return data
            })
    }

    useEffect(() => {
        let promise = fetchRequestScudInfoWorkers()
        promise.then(data=>{
            console.log('Данные', data)
        })
    },[])

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
                    <tr>
                        <td>1234</td>
                        <td>Первая смена</td>
                        <td>8 ч.</td>
                        <td>60 мин.</td>
                        <td><div className='tdChange'></div></td>
                        <td><div className='tdDelete'></div></td>
                    </tr>
                    <tr>
                        <td>1234</td>
                        <td>Первая смена</td>
                        <td>8 ч.</td>
                        <td>60 мин.</td>
                        <td><div className='tdChange'></div></td>
                        <td><div className='tdDelete'></div></td>
                    </tr>
                    <tr>
                        <td>1234</td>
                        <td>Первая смена</td>
                        <td>8 ч.</td>
                        <td>60 мин.</td>
                        <td><div className='tdChange'></div></td>
                        <td><div className='tdDelete'></div></td>
                    </tr>
                    <tr>
                        <td>1234</td>
                        <td>Первая смена</td>
                        <td>8 ч.</td>
                        <td>60 мин.</td>
                        <td><div className='tdChange'></div></td>
                        <td><div className='tdDelete'></div></td>
                    </tr>
                    <tr>
                        <td>1234</td>
                        <td>Первая смена</td>
                        <td>8 ч.</td>
                        <td>60 мин.</td>
                        <td><div className='tdChange'></div></td>
                        <td><div className='tdDelete'></div></td>
                    </tr>
                </tbody>
            </table>
            <div className='addButton addButtonSkud'><span>+</span></div>
        </div>
    )
}

function SkudAdminForm() {

    let action = ['hide','add','change']
    const [typeForm, setTypeForm] = useState('hide')

    return(
        <form className={typeForm == 'hide'? 'formUserHideSkud' :'formUserSkud'}>
            <label htmlFor="">Табельный</label>
            <input className={typeForm == 'change'? 'formUserHideSkud': null}/>
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
            <button type="submit">{typeForm == 'add'? 'Добавить' : 'Изменить'}</button>
        </form>
    )
}

