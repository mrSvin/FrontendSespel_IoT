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

    const [formID, setformID] = useState('');
    const [formTabel, setformTabel] = useState('');

    const [usersData, setUsersData] = useState([])

    const toggleClass = () => {
        if (isActive) {
            setFormAdd(!isActive);
        }
        setActive(!isActive);
    };

    const toggleForm = () => {
        setFormAdd(!formAdd);
    };

    const innerRef = useOuterClick(ev => {
        if (isActive && !formAdd) {
            setActive(!isActive);
        }
    });

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
                return [i.authorId, i.tabel]
            })
            setUsersData(idTableArray)
        })


    }, [])

    return (
        <div ref={innerRef} className={!isActive ? 'usersMenuResource hiddenUsersMenu' : 'usersMenuResource'}>
            <button className='usersMenuResourceButton'
                    onClick={() => {
                        toggleClass()
                    }}>Пользователи
            </button>
            <div className='divFormTable' style={{display: 'flex', position: 'relative', width: '100%'}}>

                <form className={!formAdd ? 'formAddUser formAddUserHide' : 'formAddUser'}>
                    <label htmlFor="">ID оператора</label>
                    <input onChange={e => {
                        setformID(e.target.value.replace(/[^0-9.]/g, ""))
                    }} name='idAuthor' type="text" placeholder='ID оператора' maxLength="9" value={formID}/>
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
                                    return (String(e[0]) == formID)? true: false
                                })

                                if (check.includes(true)) {
                                    alert('Такой пользователь уже зарегистрирован')
                                } else {
                                    if(userRole=='ROLE_ADMIN'){
                                        console.log('Создается пользователь', formID, formTabel)
                                        setFormAdd(false)
                                        let newUser = usersData
                                        newUser.push([formID, formTabel])
                                        setUsersData(newUser)
                                        fetchAddReSourceUser(formID, formTabel, userRole)
                                    }
                                    else alert('Недостаточно прав для добавления пользователя')
                                }


                            }} type="button">Добавить
                    </button>
                </form>


                <table className={!isActive ? 'tableResource hiddenTable' : 'tableResource'}>
                    <thead>
                    <tr>
                        <th>№</th>
                        <th>ID оператора</th>
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
                            <td onClick={() => {
                                if(userRole=='ROLE_ADMIN'){
                                    if (confirm(`Вы уверены, что хотите удалить пользователя ${usersData[i][0]} ${usersData[i][1]}`)) {
                                        console.log(`Удалить ${i} пользователя`)
                                        let deleteUser = usersData
                                        deleteUser.splice(i, 1)
                                        setUsersData(deleteUser)
                                        toggleClass()
                                        fetchDeleteReSourceUser(usersData[i][0], usersData[i][1], userRole)
                                    } else {
                                        console.log('Ничего');
                                    }
                                }
                                else alert('Недостаточно прав для добавления пользователя')
                            }}>{'—'}</td>
                        </tr>)
                    })}

                    </tbody>
                </table>
            </div>
            <div className={!isActive ? 'hiddenAddButton addButton' : 'addButton'}
                 onClick={() => {
                     toggleForm()
                 }}>
                <span>+</span>
            </div>
        </div>
    )
}

function fetchGetReSourceUsers() {
    let serverDomain = window.location.hostname
    let serverPort = window.location.port
    let url = `http://${serverDomain}:${serverPort}/api/operatorInfo`

    return fetch(url, {method: 'POST'})
        .then((response) => response.json())
        .then((data) => {
            return data
        })
}

function fetchAddReSourceUser(authorId, tabel, userRole='user') {
    if (userRole == "ROLE_ADMIN") {

        let serverDomain = window.location.hostname
        let serverPort = window.location.port
        let url = `http://${serverDomain}:${serverPort}/api/addOperator/authorId:${authorId}_tabel:${tabel}`

        fetch(url, {method: 'POST'})
            .then(response => response.text())
            .then(result => {
                if (result === 'ok') {
                    console.log('Новый пользователь добавлен')
                }
            })
            .catch(error => console.log('Ошибка при отправке запроса', error));
    }
    else alert('Недостаточно прав')
}

function fetchDeleteReSourceUser(authorId, tabel, userRole='user') {
    if (userRole == "ROLE_ADMIN") {

        let serverDomain = window.location.hostname
        let serverPort = window.location.port
        let url = `http://${serverDomain}:${serverPort}/api/deleteOperator/authorId:${authorId}_tabel:${tabel}`

        fetch(url, {method: 'POST'})
            .then(response => response.text())
            .then(result => {
                if (result === 'ok') {
                    console.log('Пользователь удален')
                }
            })
            .catch(error => console.log('Ошибка при отправке запроса', error));
    }
    else alert('Недостаточно прав')
}

