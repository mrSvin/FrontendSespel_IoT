function IframeLink({source}) {

    return (
        <div>
            <iframe
                className="iframeInput"
                src={source}
            >
            </iframe>
        </div>
    )

}

function Home({token, setToken}) {

    console.log('Открылась страница home', token)

    function teamCenterLink(e){
        let url = window.location.href
        let cancelUrl = 'http://iot.sespel.com/'
        if(url.includes(cancelUrl)){
            setShowAlertConfirm(true)
            e.preventDefault();
        }
    }

    function getToken(e){
        if(token == null){
            let promise = fetchRequestGetToken()
            promise.then(data =>{
                console.log('Устанавливаю токен')
                setToken(data)
            })
        } else {
            console.log('Текущий токен', token)
        }
    }


    const menuItems = [
        { name: 'Станки', link: '/stanki/ОТК', iconClass: 'stanki', description: 'Суточные и месячные отчеты работы оборудования' },
        { name: 'Энергоресурсы', link: '/energyWater', iconClass: 'energy', description: 'Показатели расхода газа, воды, электроэнергии' },
        // { name: 'Beacon', link: '/beacon', iconClass: 'beacon', description: 'Отслеживание объектов' },
        { name: 'Сетевое окружение', link: '/network', iconClass: 'network', description: 'Сетевое окружение' },
        { name: 'Контроль персонала', link: '/scud/2ploshadka', iconClass: 'scud', description: 'Отслеживание работы сотрудников в зонах предприятия' },
        { name: 'Owencloud', link: '/owencloud', iconClass: 'owencloud', description: 'Облачная платформа мониторинга оборудования' },
        { name: 'Умный дом', link: '/intra', iconClass: 'intra', description: 'SCADA система Intrahouse для диспетчеризации' },
        { name: 'Wialon', link: '/wialon', iconClass: 'wialon', description: 'Облачная платформа мониторинга производимых ППЦ' },
        { name: 'Teamcenter', link: '/teamcenter', iconClass: 'teamcenter', description: 'Платформа для работы с конструкторской документацией', onClick: teamCenterLink},
        { name: 'Конфигуратор ППЦ', link: '/configPpc', iconClass: 'confPpc', description: 'Трёхмерный конфигуратор ППЦ' },
        { name: '3D карта предприятия', link: '/mapService', iconClass: 'beacon', description: '3D модель цехов с отображением связи со станками', onClick: getToken},
    ];



    const [showAlertConfirm, setShowAlertConfirm] = useState(false)
    const [alertConfirmParams, setAlertConfirmParams] = useState({
        tittle: 'Ошибка',
        message: 'Данная ссылка открывается только с локального домена!',
        function: null,
    })

    return (
        <div className="homeBody">
            <AlertConfirm showAlertConfirm={showAlertConfirm} setShowAlertConfirm={setShowAlertConfirm}
                          alertConfirmParams={alertConfirmParams}/>
            <div className="main-container-home">
                {menuItems.map(({name, link, iconClass, description, onClick}) => (
                    <Link key={name} to={link} className="container-home" onClick={(e) =>{
                        if(onClick !== undefined) onClick(e)
                    }}>
                        <div className="icon-container">
                            <p>{description}</p>
                            <div className={`${iconClass}`}/>
                        </div>
                        <h2 className="buttonName">{name}</h2>
                    </Link>
                ))}
            </div>
        </div>
    )


}