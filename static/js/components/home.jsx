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

function Home() {

    const menuItems = [
        { name: 'Станки', link: '/stanki/ОТК', iconClass: 'stanki', description: 'Суточные и месячные отчеты работы оборудования' },
        { name: 'Энергоресурсы', link: '/energyWater', iconClass: 'energy', description: 'Показатели расхода газа, воды, электроэнергии' },
        // { name: 'Beacon', link: '/beacon', iconClass: 'beacon', description: 'Отслеживание объектов' },
        { name: 'Сетевое окружение', link: '/network', iconClass: 'network', description: 'Сетевое окружение' },
        { name: 'Контроль персонала', link: '/scud/2ploshadka', iconClass: 'scud', description: 'Отслеживание работы сотрудников в зонах предприятия' },
        { name: 'Owencloud', link: '/owencloud', iconClass: 'owencloud', description: 'Облачная платформа мониторинга оборудования' },
        { name: 'Умный дом', link: '/intra', iconClass: 'intra', description: 'SCADA система Intrahouse для диспетчеризации' },
        { name: 'Wialon', link: '/wialon', iconClass: 'wialon', description: 'Облачная платформа мониторинга производимых ППЦ' },
    ];

    const [showAlertConfirm, setShowAlertConfirm] = useState(false)
    const [alertConfirmParams, setAlertConfirmParams] = useState({
        tittle: 'Внимание',
        message: 'Данная данная ссылка открывается только с локального домена',
        function: null,
    })

    const teamCenter = { name: 'Teamcenter', link: '/teamcenter', iconClass: 'teamcenter', description: 'Платформа для работы с конструкторской документацией' }

    return (
        <div className="homeBody">
            <AlertConfirm showAlertConfirm={showAlertConfirm} setShowAlertConfirm={setShowAlertConfirm}
                          alertConfirmParams={alertConfirmParams}/>
            <div className="main-container-home">
                {menuItems.map(({name, link, iconClass, description}) => (
                    <Link key={name} to={link} className="container-home">
                        <div className="icon-container">
                            <p>{description}</p>
                            <div className={`${iconClass}`}/>
                        </div>
                        <h2 className="buttonName">{name}</h2>
                    </Link>
                ))}

                <Link key={teamCenter.name} to={teamCenter.link} className="container-home" onClick={(e) =>{
                    let url = window.location.href
                    let cancelUrl = 'http://iot.sespel.com/'
                    if(url.includes(cancelUrl)){
                        console.log(e.href)
                        console.log('Запрет на переадресацию')
                        setShowAlertConfirm(true)
                        e.preventDefault();
                    }
                    if(window.confirm('Временное сообщение, просто нужно временное условие чтобы запретить переход')) e.preventDefault();
                }}>
                    <div className="icon-container">
                        <p>{teamCenter.description}</p>
                        <div className={`${teamCenter.iconClass}`}/>
                    </div>
                    <h2 className="buttonName">{teamCenter.name}</h2>
                </Link>

            </div>
        </div>
    )


}