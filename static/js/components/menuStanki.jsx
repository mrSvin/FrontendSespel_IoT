function MenuOtchet(select) {

    let menuSelect

    let pageSutki = `/stanki/${select.page}`
    let pageMonth = `/stanki/${select.page}Month`

    if (select.select == 'sutki') {
        menuSelect = ["menuSelect", "menuNoSelect"]
    } else {
        menuSelect = ["menuNoSelect", "menuSelect"]
    }


    return (
        <div className="buttons-otchet">

            <Link to={pageSutki}>
                <div className={menuSelect[0]}>СУТОЧНЫЙ ОТЧЕТ</div>
            </Link>

            <Link to={pageMonth}>
                <div className={menuSelect[1]}>МЕСЯЧНЫЙ ОТЧЕТ</div>
            </Link>

        </div>
    )
}

function MenuEnergy(select) {

    let menuSelect = ["menuNoSelect", "menuNoSelect", "menuNoSelect"]

    if (select.select == "water") {
        menuSelect[0] = "menuSelect"
    }
    if (select.select == "gas") {
        menuSelect[1] = "menuSelect"
    }
    if (select.select == "electro") {
        menuSelect[2] = "menuSelect"
    }

    return (
        <div className="menuButtons">

            <Link to="/energyWater" className="container-home">
                <div className={menuSelect[0]}>ВОДОСНАБЖЕНИЕ</div>
            </Link>

            <Link to="/energyGas" className="container-home">
                <div className={menuSelect[1]}>ГАЗ</div>
            </Link>

            <Link to="/energyElectro" className="container-home">
                <div className={menuSelect[2]}>ЭЛЕКТРОЭНЕРГИЯ</div>
            </Link>

        </div>
    )

}

function MenuStankiIndividual({razdel, menuSelected = 9}) {

    let menuSelect = ["menuNoSelect", "menuNoSelect", "menuNoSelect", "menuNoSelect", "menuNoSelect", "menuNoSelect", "menuNoSelect", "menuNoSelect", "menuNoSelect", "menuNoSelect"]
    menuSelect[menuSelected] = "menuSelect"

    let places = ['ОТК', 'Мех.уч.2 пл.', 'Резка', 'Мех.уч.1 пл.', 'Роботы', 'Спец. комплексы', 'Склады', 'Литьё', 'Гибка', 'Все']

    return (
        <div className="menuButtons">
            {places.map((e, i) => {
                return <Link key={i} to={`/${razdel}/${places[i]}`}>
                    <div key={i} className={(i == 9) ? `${menuSelect[i]} hideIndividualAll` : menuSelect[i]}
                         onClick={(e) => {
                         }}>{e}
                    </div>
                </Link>
            })}
        </div>
    )
}
