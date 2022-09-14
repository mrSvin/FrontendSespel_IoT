function Report() {
    let nameToFetch = parseNameUrl(document.location.pathname);
    let imgComplex = ["../images/stendResource.png"]
    let complexRequest = 'modbusData'

    let bata = [[53276, 1234], [265754, 1432]]

    let [dataReportState, setDataReportState] = useState([])

    useEffect(() => {
        fetchRequestReport(complexRequest, setDataReportState)
        },[])

    return(
    <div className='serviceContainer'>
        <h1>Отчеты о ресурсных испытаниях {nameToFetch + 'а'}</h1>
        <UsersMenuResource data={bata}/>
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
                     name: `Отчет_${timeNow().slice(2).replaceAll(':','')}.xlsx`,
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
    {dataReportState.map((val,i) => {
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

function UsersMenuResource(data) {

    data = (data.data == undefined) ? ['', ''] : data.data

    const [isActive, setActive] = useState(false);
    const [formAdd, setFormAdd] = useState(false);

    const [formID, setformID] = useState('');
    const [formTabel, setformTabel] = useState('');

    const [usersData, setUsersData] = useState(data)

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

    return (
        <div ref={innerRef} className={!isActive ? 'usersMenuResource hiddenUsersMenu' : 'usersMenuResource'}>
            <button
                onClick={() => {
                    toggleClass()
                }}>Кнопка
            </button>
            <div style={{display: 'flex', position: 'relative', width: '100%'}}>

                <form className={!formAdd ? 'formAddUser formAddUserHide' : 'formAddUser'}>
                    <label htmlFor="">ID оператора</label>
                    <input onChange={e => {
                        setformID(e.target.value.replace(/[a-z]/gmi, ""))
                    }} name='idAuthor' type="text" placeholder='ID оператора' maxLength="10" value={formID}/>
                    <label htmlFor="">Табель</label>
                    <input onChange={e => {
                        setformTabel(e.target.value.replace(/[a-z]/gmi, ""))
                    }} name='tabel' type="text" placeholder='Табель' maxLength="10" value={formTabel}/>
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
                                    return String(e[0]).includes(formID)
                                })

                                if (check.includes(true)) {
                                    alert('Такой пользователь уже зарегистрирован')
                                } else {
                                    console.log('Создается пользователь', formID, formTabel)
                                    setFormAdd(false)
                                    let newUser = usersData
                                    newUser.push([formID, formTabel])
                                    setUsersData(newUser)
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
                                console.log(`Удалить ${i} пользователя`)
                                let deleteUser = usersData
                                deleteUser.splice(i,1)
                                setUsersData(deleteUser)
                                toggleClass()
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