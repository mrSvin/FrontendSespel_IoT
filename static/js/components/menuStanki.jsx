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
