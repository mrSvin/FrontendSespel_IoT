function EnergyGas() {

    return (
        <div>

            <Header/>

            <div className="menuButtons">

                <Link to="/energyWater" className="container-home">
                    <div className="menuNoSelect">ВОДОСНАБЖЕНИЕ</div>
                </Link>

                <Link to="/energyGas" className="container-home">
                    <div className="menuSelect">ГАЗ</div>
                </Link>

                <Link to="/energyElectro" className="container-home">
                    <div className="menuNoSelect">ЭЛЕКТРОЭНЕРГИЯ</div>
                </Link>

            </div>

            <div>
                <h1>Раздел пока в разработке....</h1>
            </div>

        </div>
    )
}