function EnergyElectro() {

    return (
        <div>

            <Header/>

            <div className="menuButtons">

                <Link to="/energyWater" className="container-home">
                    <div className="menuNoSelect">ВОДОСНАБЖЕНИЕ</div>
                </Link>

                <Link to="/energyGas" className="container-home">
                    <div className="menuNoSelect">ГАЗ</div>
                </Link>

                <Link to="/energyElectro" className="container-home">
                    <div className="menuSelect">ЭЛЕКТРОЭНЕРГИЯ</div>
                </Link>

            </div>

            <div>
                <h1>Раздел в разработке....</h1>
            </div>

        </div>
    )
}