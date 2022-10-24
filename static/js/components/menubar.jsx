function Winnum() {

    return (
        <div>

            <iframe
                className="iframeInput"
                src="http://winnum-serv/Winnum/views/navigation/home/list.jsp"
            >
            </iframe>

        </div>
    )

}

function Owencloud() {

    return (
        <div>

            <iframe
                className="iframeInput"
                src="https://web.owencloud.ru/device/index/201636"
            >
            </iframe>

        </div>
    )

}

function Intra() {

    return (
        <div>

            <iframe
                className="iframeInput"
                src="http://89.151.134.234:46088/"
            >
            </iframe>

        </div>
    )

}

function Wialon() {

    return (
        <div>

            <iframe
                className="iframeInput"
                src="https://hosting.wialon.com/"
            >
            </iframe>

        </div>
    )

}

function Teamcenter() {

    return (
        <div>

            <iframe
                className="iframeInput"
                src="http://tcsespel.sespel.corp:7001/awc/"
            >
            </iframe>

        </div>
    )

}


function Menubar() {

    return (
        <div className="main-container-home">

            <Link to="/stanki/ОТК" className="container-home">
                <div className="icon-container">
                    <p>Суточные и месячные отчеты работы оборудования</p>
                    <div className="stanki"></div>
                </div>
                <h2 className="buttonName">Станки</h2>
            </Link>

            <Link to="/energyWater" className="container-home">
                <div className="icon-container">
                    <p>Показатели расхода газа, воды, электроэнергии</p>
                    <div className="energy"></div>
                </div>
                <h2 className="buttonName">Энергоресурсы</h2>
            </Link>

            <Link to="/beacon" className="container-home">
                <div className="icon-container">
                    <p>Отслеживание объектов</p>
                    <div className="beacon"></div>
                </div>
                <h2 className="buttonName">Beacon</h2>
            </Link>

            <a href="/menubar/sklad" className="container-home">
                <div className="icon-container">
                    <p>Учет комплектующих склада Мех. цеха II площадки</p>
                    <div className="envelope"></div>
                </div>
                <h2 className="buttonName">Склад</h2>
            </a>

            <Link to="/winnum" className="container-home">
                <div className="icon-container">
                    <p>Интегрированная платформа мониторинга оборудования</p>
                    <div className="winnum"></div>
                </div>
                <h2 className="buttonName">Winnum</h2>
            </Link>


            <Link to="/owencloud" className="container-home">
                <div className="icon-container">
                    <p>Облачная платформа мониторинга оборудования</p>
                    <div className="owencloud"></div>
                </div>
                <h2 className="buttonName">Owencloud</h2>
            </Link>

            <Link to="/intra" className="container-home">
                <div className="icon-container">
                    <p>SCADA система Intrahouse для диспетчеризации</p>
                    <div className="intra"></div>
                </div>
                <h2 className="buttonName">Умный дом</h2>
            </Link>

            <Link to="/wialon" className="container-home">
                <div className="icon-container">
                    <p>Облачная платформа мониторинга производимых ППЦ</p>
                    <div className="wialon"></div>
                </div>
                <h2 className="buttonName">Wialon</h2>
            </Link>

            <Link to="/teamcenter" className="container-home">
                <div className="icon-container">
                    <p>Платформа для работы с конструкторской документацией</p>
                    <div className="teamcenter"></div>
                </div>
                <h2 className="buttonName">Teamcenter</h2>
            </Link>

            <Link to="/skud/2ploshadka" className="container-home">
                <div className="icon-container">
                    <p>Система контроля и управления доступом</p>
                    <div className="intra"></div>
                </div>
                <h2 className="buttonName">СКУД</h2>
            </Link>

        </div>
    )

}