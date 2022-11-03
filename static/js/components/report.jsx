function Report() {
    let nameToFetch = parseNameUrl(document.location.pathname);
    let imgComplex = ["../images/stendResource.png"]
    let complexRequest = 'modbusData'

    // let bata = [[53276, 1234], [265754, 1432]]

    let [dataReportState, setDataReportState] = useState([])

    useEffect(() => {
        fetchRequestReport(complexRequest, setDataReportState)
    }, [])

    return (
        <div className='serviceContainer'>
            <h1>Отчеты о ресурсных испытаниях {nameToFetch + 'а'}</h1>
            <UsersMenuResource/>
            <div className='blockImage'>
                <img className="serviceImg " src={imgComplex}/>
            </div>
            <table className="tableReport" id='tableReport'>
                <thead>
                <tr>
                    <th>Номер акта</th>
                    <th>Номер чертежа изделия</th>
                    <th>Номер изделия</th>
                    <th>Требуемая сила воздействия, т</th>
                    <th>Фактическая приложенная сила (датчик 1), т</th>
                    <th>Фактическая приложенная сила (датчик 2), т</th>
                    <th>Максимальная деформация, мкм</th>
                    <th>Остаточная деформация, мкм</th>
                    <th>Годность</th>
                    <th>Автор испытания</th>
                    <th>Дата/время</th>
                </tr>
                </thead>
                <TableReportBody dataReportState={dataReportState}/>
            </table>
            <img className="excelIcon" id="button-excel"
                 src="../../images/excel_icon.png"
                 onClick={() => {
                     TableToExcel.convert(document.getElementById('tableReport'), {
                         name: `Отчет_${timeNow().slice(2).replaceAll(':', '')}.xlsx`,
                         sheet: {
                             name: "Sheet 1"
                         }
                     });
                 }}
            />
        </div>
    )
}

function TableReportBody({dataReportState}) {
    return (
        <tbody>
        {dataReportState.map((val, i) => {
            return (
                <tr key={i}>
                    <td>{val[0]}</td>
                    <td>{val[1]}</td>
                    <td>{val[2]}</td>
                    <td>{val[3]}</td>
                    <td>{val[4]}</td>
                    <td>{val[5]}</td>
                    <td>{val[6]}</td>
                    <td>{val[7]}</td>
                    <td>{val[8]}</td>
                    <td>{val[9]}</td>
                    <td>{val[10]}</td>
                </tr>
            )
        })}
        </tbody>
    )
}

function UsersMenuResource() {

    const [userRole, setUserRole] = useState('user')
    const [isActive, setActive] = useState(false);
    const [formAdd, setFormAdd] = useState(false);

    const [message, setMessage] = useState('');

    const [formID, setformID] = useState('');
    const [formTabel, setformTabel] = useState('');
    const [formFIO, setFormFIO] = useState('');

    const [usersData, setUsersData] = useState([])

    const toggleClass = () => {
        if (isActive) {
            setFormAdd(false)
        }
        setActive(!isActive);

    };

    const toggleForm = () => {
        setFormAdd(!formAdd);
    };

    function displayMessage(message) {
        switch (message) {
            case 'Пользователь успешно удален':
                return <p className={!isActive ? 'hideMessage' : 'redMessage'}>{message}</p>
            case 'Пользователь успешно добавлен':
                return <p className={!isActive ? 'hideMessage' : 'greenMessage'}>{message}</p>
            default :
                return null
        }
    }

    useEffect(() => {
        fetch('/api/userInfo', {
            method: 'POST'
        })
            .then((response) => response.json())
            .then((data) => {
                setUserRole(data.userRole)
            })

        let data = fetchGetReSourceUsers()
        let dataResolve = Promise.resolve(data);
        dataResolve.then(e => {
            let idTableArray = e.operators.map(i => {
                return [i.authorId, i.operator_name, i.tabel]
            })
            setUsersData(idTableArray)
        })


    }, [])

    return (
        <div>
            <button className='usersMenuResourceButton'
                    onClick={() => {
                        toggleClass()
                    }}>Управление доступом для фиксации отчетов
                <span className={!isActive ? 'usersMenuResourceButtonSpanRotate' : null}>▲</span>
            </button>
            <div className={!isActive ? 'usersMenuResource hiddenUsersMenu' : 'usersMenuResource'}>
                <div className='divFormTable' style={{display: 'flex', position: 'relative', width: '100%'}}>
                    <form className={!formAdd ? 'formAddUser formAddUserHide' : 'formAddUser'}>
                        <label htmlFor="">ID оператора</label>
                        <input onChange={e => {
                            setformID(e.target.value.replace(/[^0-9.]/g, ""))
                        }} name='idAuthor' type="text" placeholder='ID оператора' maxLength="9" value={formID}/>
                        <label htmlFor="">ФИО</label>
                        <input onChange={e => {
                            setFormFIO(e.target.value.replace(/[^a-zA-Z-а-яА-Я .]+/g, ""))
                        }} name='FIO' type="text" placeholder='ФИО' maxLength="18" value={formFIO}/>
                        <label htmlFor="">Табель</label>
                        <input onChange={e => {
                            setformTabel(e.target.value.replace(/[^0-9.]/g, ""))
                        }} name='tabel' type="text" placeholder='Табель' maxLength="9" value={formTabel}/>
                        <button type="submit"
                                onClick={() => {

                                    if (formID == '') {
                                        alert('Заполните ID оператора')
                                        return
                                    }

                                    if (formTabel == '') {
                                        alert('Заполните Табель')
                                        return
                                    }

                                    let check = usersData.map(e => {
                                        return (String(e[0]) == formID) ? true : false
                                    })

                                    if (check.includes(true)) {
                                        alert('Такой пользователь уже зарегистрирован')
                                    } else {
                                        if (userRole == 'ROLE_ADMIN') {
                                            setFormAdd(false)
                                            let newUser = usersData
                                            newUser.push([formID, formFIO, formTabel])
                                            setUsersData(newUser)
                                            fetchAddReSourceUser(formID, formFIO, formTabel, userRole)
                                            setMessage('Пользователь успешно добавлен')
                                        } else {
                                            setMessage('Недостаточно прав')
                                            alert('Недостаточно прав для добавления пользователя')
                                        }
                                    }


                                }} type="button">Добавить
                        </button>
                    </form>


                    <table className={!isActive ? 'tableResource hiddenTable' : 'tableResource'}>
                        <thead>
                        <tr>
                            <th>№</th>
                            <th>ID оператора</th>
                            <th>ФИО</th>
                            <th>Табель</th>
                            <th>Удалить</th>
                        </tr>
                        </thead>
                        <tbody className={!isActive ? 'hiddenTableBody' : ''}>
                        {usersData.map((e, i) => {
                            return (<tr key={i}>
                                <td>{i}</td>
                                <td>{e[0]}</td>
                                <td>{e[1]}</td>
                                <td>{e[2]}</td>
                                <td onClick={() => {
                                    if (userRole == 'ROLE_ADMIN') {
                                        if (confirm(`Вы уверены, что хотите удалить пользователя ${usersData[i][0]} ${usersData[i][1]}`)) {
                                            fetchDeleteReSourceUser(usersData[i][0], userRole)
                                            let deleteUser = usersData.slice()
                                            deleteUser.splice(i, 1)
                                            console.log('Массив неудаленных пользователей', i, deleteUser)
                                            setMessage('Пользователь успешно удален')
                                            setUsersData(deleteUser)
                                            setActive(true)
                                        } else {
                                        }
                                    } else {
                                        alert('Недостаточно прав для удаления пользователя')
                                        setMessage('Недостаточно прав')
                                    }
                                }}>{'—'}</td>
                            </tr>)
                        })}

                        </tbody>
                    </table>
                </div>
                {displayMessage(message)}
                <div className={!isActive ? 'hiddenAddButton addButton' : 'addButton'}
                     onClick={() => {
                         toggleForm()
                     }}>
                    <span>+</span>
                </div>
            </div>
        </div>
    )
}


