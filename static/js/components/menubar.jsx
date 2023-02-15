function IframeLink({source}) {

    let linksMap = {
        'winnum': "http://winnum-serv/Winnum/views/navigation/home/list.jsp",
        'owencloud': "https://web.owencloud.ru/device/index/201636",
        'intra': "http://89.151.134.234:46088/",
        'wialon': "https://hosting.wialon.com/",
        'teamcenter': "http://tcsespel.sespel.corp:7001/awc/",
    }

    return (
        <div>
            <iframe
                className="iframeInput"
                src={linksMap[source]}
            >
            </iframe>
        </div>
    )

}

function Menubar() {
    const menuItems = [
        { name: 'Станки', link: '/stanki/ОТК', iconClass: 'stanki', description: 'Суточные и месячные отчеты работы оборудования' },
        { name: 'Энергоресурсы', link: '/energyWater', iconClass: 'energy', description: 'Показатели расхода газа, воды, электроэнергии' },
        { name: 'Beacon', link: '/beacon', iconClass: 'beacon', description: 'Отслеживание объектов' },
        { name: 'Контроль персонала', link: '/scud/2ploshadka', iconClass: 'scud', description: 'Отслеживание работы сотрудников в зонах предприятия' },
        { name: 'Owencloud', link: '/owencloud', iconClass: 'owencloud', description: 'Облачная платформа мониторинга оборудования' },
        { name: 'Умный дом', link: '/intra', iconClass: 'intra', description: 'SCADA система Intrahouse для диспетчеризации' },
        { name: 'Wialon', link: '/wialon', iconClass: 'wialon', description: 'Облачная платформа мониторинга производимых ППЦ' },
        { name: 'Teamcenter', link: '/teamcenter', iconClass: 'teamcenter', description: 'Платформа для работы с конструкторской документацией' },
    ];

    return (
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
        </div>
    );
}
