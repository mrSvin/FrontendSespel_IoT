function MenuStanki(menuSelected) {

    let menuSelect = ["menuNoSelect", "menuNoSelect", "menuNoSelect", "menuNoSelect", "menuNoSelect", "menuNoSelect", "menuNoSelect", "menuNoSelect", "menuNoSelect"]

    if (menuSelected.menuSelected == "otk") {
        menuSelect[0] = "menuSelect"
    }
    if (menuSelected.menuSelected == "meh2") {
        menuSelect[1] = "menuSelect"
    }
    if (menuSelected.menuSelected == "rezka") {
        menuSelect[2] = "menuSelect"
    }
    if (menuSelected.menuSelected == "meh1") {
        menuSelect[3] = "menuSelect"
    }
    if (menuSelected.menuSelected == "robots") {
        menuSelect[4] = "menuSelect"
    }
    if (menuSelected.menuSelected == "specComplexes") {
        menuSelect[5] = "menuSelect"
    }
    if (menuSelected.menuSelected == "sclads") {
        menuSelect[6] = "menuSelect"
    }
    if (menuSelected.menuSelected == "liteyka") {
        menuSelect[7] = "menuSelect"
    }
    if (menuSelected.menuSelected == "gibka") {
        menuSelect[8] = "menuSelect"
    }

    return (
        <div className="menuButtons">

            <Link to="/stanki/otk">
                <div className={menuSelect[0]}>ОТК</div>
            </Link>

            <Link to="/stanki/meh2">
                <div className={menuSelect[1]}>Мех.уч.2 пл.</div>
            </Link>

            <Link to="/stanki/rezka">
                <div className={menuSelect[2]}>Резка</div>
            </Link>

            <Link to="/stanki/meh1">
                <div className={menuSelect[3]}>Мех.уч.1 пл.</div>
            </Link>

            <Link to="/stanki/robots">
                <div className={menuSelect[4]}>Роботы</div>
            </Link>

            <Link to="/stanki/specComplexes">
                <div className={menuSelect[5]}>Спец. комплексы</div>
            </Link>

            <Link to="/stanki/sclads">
                <div className={menuSelect[6]}>Склады</div>
            </Link>

            <Link to="/stanki/liteyka">
                <div className={menuSelect[7]}>Литьё</div>
            </Link>

            <Link to="/stanki/gibka" className="menu-stanki">
                <div className={menuSelect[8]}>Гибка</div>
            </Link>

        </div>
    )
}

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
