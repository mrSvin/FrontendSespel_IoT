function Network() {

    const [typeForm, setTypeForm] = useState('hide')
    const [clickedDeleteButton, setClickedDeleteButton] = useState(true)
    const [errorMessage, setErrorMessage] = useState(['', ''])
    const [tableBody, setTableBody] = useState(null)
    const [machine, setMachine] = useState(
        {
            name: '',
            ip: '192.168.',
            photo: '../images/switchIcon.jpg',
            ping: 'false',
            lastPolling: null,
            workers: '',
            location: '',
            description: ''
        })
    const [tabelList, setTabelList] = useState(null)
    const [closeInterval, setCloseInterval] = useState(0)
    let interval

    const [showAlertConfirm, setShowAlertConfirm] = useState(false)
    const [alertConfirmParams, setAlertConfirmParams] = useState({
        tittle: 'Подтверждение',
        message: 'Вы уверены, что хотите...',
        function: null,
        arguments: null,
    })

    function deleteDevice(agree, device='') {
        if (agree) {
            console.log('Подтверждаю')
            let deletePromise = fetchRequestDeleteNetworkDevice(device)
            deletePromise.then((answer) => {
                if (answer == 'ok') {
                    setClickedDeleteButton(false)
                    setTimeout(() => {
                        setClickedDeleteButton(true)
                        setCloseInterval(0)
                    }, 1000)
                    // window.location.reload()
                } else {
                    setCloseInterval(1)
                    setShowAlertConfirm(true)
                    setAlertConfirmParams({
                        tittle: 'Ошибка',
                        message: 'Недостаточно прав для удаления',
                        function: null,
                        arguments: null,
                    })
                }
            })

        } else {
            console.log('Отмена')
            setCloseInterval(1)
        }
    }

    function handleOnChange(e, key) {
        const {value} = e.target;
        setMachine(prevState => ({
            ...prevState,
            [key]: value
        }));
    };

    function handleOnChangeIP(e) {
        const {value} = e.target;
        setMachine(prevState => ({
            ...prevState,
            ['ip']: getCorrectIP(value)
        }));
    };

    function handleOnChangeImage(file) {
        let reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = function () {
            setMachine(prevState => ({
                ...prevState,
                ['photo']: reader.result.substr(reader.result.indexOf(',') + 1)
            }));
        };


    };

    function updateTable() {

        if(closeInterval == 3){
            return
        }

        let countInterval = 0
        interval = setInterval(() => {
            let url = window.location.href
            url.includes('network') ? null : clearInterval(interval)

            if (closeInterval == 0 && countInterval == 0) {
                let promiseDeviceData = fetchRequestGetNetworkDevices()
                promiseDeviceData.then(data => {
                    let dataArray = Object.keys(data).map(e => {
                        return data[e]
                    })

                    let tabels = dataArray.map(e => (e.workers).split(','))
                    tabels = tabels[0].concat(...tabels.slice(1)).filter(f => (!isNaN(+f)));
                    tabels = tabels.map(e => (e.replace(' ', '')))

                    let promisePhotoList = fetchRequestListPhoto(tabels.join())
                    promisePhotoList.then(photos => {
                        setTabelList(photos.photo)
                    })

                    setTableBody(dataArray)
                    setCloseInterval(1)
                })
            } else if (tableBody !== null && countInterval < 10) {
                const newState = tableBody.map((obj) => {
                    return {...obj, lastPolling: new Date(obj.lastPolling).getTime() + 1000};
                });
                setTableBody(newState);
            } else if (countInterval == 10 && tableBody !== null) {
                let promiseDeviceData = fetchRequestPingList()
                promiseDeviceData.then(data => {
                    let dataArray = Object.keys(data).map(e => {
                        return data[e]
                    })

                    const newState = tableBody.map((obj, i) => {
                        if (obj.name == dataArray[i].name) {
                            return {...obj, lastPolling: dataArray[i].lastPool, ping: dataArray[i].ping};
                        }
                        return obj;
                    });
                    setTableBody(newState);
                    setCloseInterval(closeInterval == 1? 2 : 1)
                })
            }
            countInterval++
        }, 1000)

    }

    useEffect(() => {
        updateTable()

        return () => {
            clearInterval(interval)
        }

    }, [closeInterval])

    return (
        <div className={'networkWrap'}>
            <AlertConfirm showAlertConfirm={showAlertConfirm} setShowAlertConfirm={setShowAlertConfirm}
                          alertConfirmParams={alertConfirmParams}/>
            <NetworkButtonAdd typeForm={typeForm} setTypeForm={setTypeForm}
                              setErrorMessage={setErrorMessage} setCloseInterval={setCloseInterval}/>
            <table className={`networkTable scudMonthMainTable`}>
                <thead>
                <tr>
                    <th>№</th>
                    <th>Изображение</th>
                    <th>Наименование</th>
                    <th>IP адрес</th>
                    <th>Сотрудники</th>
                    <th>Расположение</th>
                    <th>Описание</th>
                    <th>Последний опрос</th>
                    <th>Связь</th>
                </tr>
                </thead>
                <tbody>
                {tableBody == null ? null :
                    tableBody.map((deviceTable, i) => {
                        return (
                            <tr key={i}>
                                <td>{i + 1}</td>
                                <td>
                                    <div className={'networkImageBlock'}>
                                        <img
                                            src={`data:image/jpeg;base64,${deviceTable.photo}`}
                                            alt=""
                                        />
                                    </div>
                                </td>
                                <td>{deviceTable.name}</td>
                                <td>{deviceTable.ip}</td>
                                <td>
                                    <ImageList imageList={deviceTable.workers} tabelList={tabelList}/>
                                </td>
                                <td>{deviceTable.location}</td>
                                <td>{deviceTable.description}</td>
                                <td>{lastConnectTime(deviceTable.lastPolling)}</td>
                                <td>
                                    <span
                                        className={`${deviceTable.ping == 'true' ? 'statusActive' : 'statusNoActive'} sizeStatusActive`}></span>
                                </td>
                                <td className={'changeAddTd'}>
                                    <div className='tdChange' onClick={() => {
                                        setMachine(deviceTable)
                                        setErrorMessage(['', ''])
                                        if (machine.name == deviceTable.name && typeForm == 'change') {
                                            setCloseInterval(1)
                                            setTypeForm('hide')
                                            setErrorMessage('', '')
                                        } else {
                                            setCloseInterval(3)
                                            setTypeForm('change')
                                            setErrorMessage(['', ''])
                                        }
                                    }}></div>
                                    <div className={`tdDelete ${clickedDeleteButton ? '' : 'noActiveButton'}`}
                                         onClick={() => {
                                             setCloseInterval(3)
                                             setAlertConfirmParams({
                                                 tittle: 'Подтверждение',
                                                 message: `Вы уверены, что хотите удалить оборудование ${deviceTable.name}`,
                                                 function: deleteDevice,
                                                 arguments: deviceTable.name,
                                             })
                                             setShowAlertConfirm(true)
                                         }}></div>
                                </td>
                            </tr>
                        )
                    })
                }
                </tbody>
            </table>

            <NetworkFormUpdateAdd typeForm={typeForm} machine={machine} handleOnChange={handleOnChange}
                                  handleOnChangeIP={handleOnChangeIP} handleOnChangeImage={handleOnChangeImage}
                                  errorMessage={errorMessage} setErrorMessage={setErrorMessage}
                                  setCloseInterval={setCloseInterval} updateTable={updateTable}/>
            <div className={typeForm == 'hide' ? null : 'darkSpace'}
                 onClick={() => {
                     setCloseInterval(1)
                     setTypeForm('hide')
                     setErrorMessage(['', ''])
                 }}></div>
        </div>
    )
}

function NetworkFormUpdateAdd({
                                  typeForm, machine, handleOnChange, handleOnChangeIP,
                                  handleOnChangeImage, errorMessage, setErrorMessage,
                                  setCloseInterval
                              }) {
    return (
        <form className={`networkFormAdd ${classToTypeForm(typeForm)}`}>
            <p className='formAdminName'>{typeForm == 'change' ? 'Редактирование оборудования' : 'Добавление оборудования'}</p>

            <label>Наименование {typeForm == 'change' ? machine.name : null}</label>
            <input className={`adminInput ${typeForm == 'change' ? 'formHideUsersControl' : null}`}
                   value={machine.name}
                   type={'text'}
                   placeholder={'Наименование оборудования'}
                   onChange={(e) => {
                       handleOnChange(e, 'name')
                   }}/>
            <label>IP адрес {}</label>
            <input className={`adminInput`}
                   value={machine.ip}
                   type={'text'}
                   placeholder={'192.168.1.1'}
                   onChange={(e) => {
                       handleOnChangeIP(e)
                   }}/>

            <label>Сотрудники</label>
            <input className={`adminInput`}
                   value={machine.workers}
                   type={'text'}
                   placeholder={'1234, 4321...'}
                   onChange={(e) => {
                       handleOnChange(e, 'workers')
                   }}/>

            <label>Расположение</label>
            <input className={`adminInput`}
                   value={machine.location}
                   type={'text'}
                   placeholder={'2 площадка'}
                   onChange={(e) => {
                       handleOnChange(e, 'location')
                   }}/>

            <label>Описание</label>
            <textarea className={`adminInput`}
                      value={machine.description}
                      type={'text'}
                      maxLength={500}
                      placeholder={'Описание оборудования'}
                      onChange={(e) => {
                          handleOnChange(e, 'description')
                      }}/>

            <div className="profile-pic">
                <label className="-label" htmlFor="userAvatar">
                    <span className='adminPhotoMessage'>Поменять изображение</span>
                </label>
                <input
                    className="inputImage"
                    id="userAvatar"
                    type="file"
                    onChange={() => {
                        let input = document.getElementById('userAvatar')
                        handleOnChangeImage(input.files[0])
                    }}
                />
                <img
                    className="outputImage imageBackground"
                    src={machine.photo.includes('switchIcon')? '../images/switchIcon.jpg': `data:image/jpeg;base64,${machine.photo}`}
                    width="200"
                />
            </div>

            <button className={'formAddChangeButton'} type="button"
                    onClick={() => {
                        setCloseInterval(3)
                        if (machine.name == '' || machine.ip == '' || machine.workers == '' || machine.location == '' || machine.description == '') {
                            setErrorMessage(['Заполните все поля', 'redMessage'])
                            return null
                        }
                        if (!checkIP(machine.ip)) {
                            setErrorMessage(['Введите корректный IP', 'redMessage'])
                            return null
                        }
                        if (typeForm == 'add') {
                            let addPromise = fetchRequestAddNetworkDevice(machine)
                            addPromise.then((data) => {
                                if (data == 'ok') {
                                    setCloseInterval(0)
                                    setErrorMessage(['Оборудование добавлено', 'greenMessage'])
                                } else setErrorMessage(['Не удалось добавить оборудование', 'redMessage'])
                            })
                        } else if (typeForm == 'change') {
                            let changePromise = fetchRequestChangeNetworkDevice(machine)
                            changePromise.then((data) => {
                                if (data == 'ok') {
                                    setCloseInterval(0)
                                    setErrorMessage(['Оборудование изменено', 'greenMessage'])
                                } else setErrorMessage(['Не удалось изменить оборудование', 'redMessage'])
                            })
                        }
                    }}>{typeForm == 'add' ? 'Добавить' : 'Изменить'}
            </button>
            <p className={`errorMessage ${errorMessage[1]}`}>{errorMessage[0]}</p>
        </form>
    )
}


function ImageList({imageList = "1234", tabelList}) {

    function returnPhoto(tabel) {
        return tabelList[tabel] ? `data:image/jpeg;base64,${tabelList[tabel]}` : "../images/humanIcon.jpg"
    }

    "../images/humanIcon.jpg"

    useEffect(() => {
    }, [tabelList])

    return (
        <div className={'imageListWrapper'}>
            {
                imageList.split(',').map((tabel, i) => (
                    <div key={i}>
                        <label>
                            <span>{tabel}</span>
                        </label>
                        <img key={i}
                             src={tabelList == null ? "../images/humanIcon.jpg" : returnPhoto(tabel)}
                        />
                    </div>
                ))
            }
        </div>
    )
}

function NetworkButtonAdd({typeForm, setTypeForm, setErrorMessage, setCloseInterval}) {

    return (
        <div className='networkAddButton' onClick={() => {
            if (typeForm == 'add') {
                setCloseInterval(1)
                setTypeForm('hide')
                setErrorMessage(['', ''])
            } else {
                setCloseInterval(3)
                setTypeForm('add')
            }
        }}>
            <span>Добавить оборудование</span>
        </div>
    )
}