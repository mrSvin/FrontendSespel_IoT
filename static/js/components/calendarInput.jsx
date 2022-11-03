function DayCalendar(dateInput) {

    return (
        <div className="energyCalendarContainer">

            <h1 className="infoChange">Выберете число:</h1>

            <input
                className="inputCalendarDay"
                type="date"
                value={dateInput.date}
                onChange={e => dateInput.newDate(e.target.value)}
            />

        </div>
    )

}

const MonthCalendar = ({newDate, dateMonth}) => {

    const months = ["Январь", "Февраль", "Март", "Апрель", "Май", "Июнь", "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"];
    const monthsNumber = ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"];
    const params = ["Янв", "Фев", "Мар", "Апр", "Май", "Июн", "Июл", "Авг", "Сен", "Окт", "Ноя", "Дек"];

    let [month, setMonth] = useState(months[new Date().getMonth()]);
    let [year, setYear] = useState(new Date().getFullYear());
    let [monthNumber, setMonthNumber] = useState(monthsNumber[new Date().getMonth()]);
    const [dropDown, setDropdown] = useState("none");

    function changeYear(e, param) {
        if (param == "-") {
            year--
            setYear(year)
        } else {
            year++
            setYear(year)
        }
    }


    function changeMonth(e, param) {
        for (var i = 0; i < months.length; i++) {
            if (param == params[i]) {
                setMonth(months[i])
                setMonthNumber(monthsNumber[i])
                setDropdown("none")
                newDate(`${year}-${monthsNumber[i]}`)
            }
        }

    }

    function changeDropdown() {
        dropDown == "none" ? setDropdown("block") : setDropdown("none")
    }

    //Закрытие dropdown на клик вне поля
    const wrapperRef = useRef(null);
    useOutsideAlerter(wrapperRef, dropDown, setDropdown);

    return (
        <div className="energyCalendarContainer">

            <h1 className="infoChange">Выберете месяц:</h1>

            <div className="calendarMonthForm">
                <input
                    className="inputCalendarMonth"
                    type='text'
                    ref={wrapperRef}
                    onClick={changeDropdown}
                    value={`${month} ${year}`}
                    onChange={e => e.target.value}
                />

                <div
                    className="master-container"
                    style={{display: dropDown}}
                    ref={wrapperRef}
                >
                    <div className="year">
                        <div>
                            <a className="prev"
                               onClick={(e) => {
                                   changeYear(e, "-")
                               }}
                            > « </a>
                            <b id="year">{year}</b>
                            <a className="forw"
                               onClick={(e) => {
                                   changeYear(e, "+")
                               }}
                            > » </a>
                        </div>
                        <div id="month">{month}</div>
                    </div>

                    <div className="months">
                        <table className="calendarMonth">
                            <tbody>
                            <tr>
                                <td
                                    className={month == months[0] ? "tdMonthRed" : "tdMonth"}
                                    onClick={(e) => {
                                        changeMonth(e, "Янв")
                                    }}
                                >Янв
                                </td>
                                <td
                                    className={month == months[1] ? "tdMonthRed" : "tdMonth"}
                                    onClick={(e) => {
                                        changeMonth(e, "Фев")
                                    }}
                                >Фев
                                </td>
                                <td
                                    className={month == months[2] ? "tdMonthRed" : "tdMonth"}
                                    onClick={(e) => {
                                        changeMonth(e, "Мар")
                                    }}
                                >Мар
                                </td>
                                <td
                                    className={month == months[3] ? "tdMonthRed" : "tdMonth"}
                                    onClick={(e) => {
                                        changeMonth(e, "Апр")
                                    }}
                                >Апр
                                </td>
                            </tr>
                            <tr>
                                <td
                                    className={month == months[4] ? "tdMonthRed" : "tdMonth"}
                                    onClick={(e) => {
                                        changeMonth(e, "Май")
                                    }}
                                >Май
                                </td>
                                <td
                                    className={month == months[5] ? "tdMonthRed" : "tdMonth"}
                                    onClick={(e) => {
                                        changeMonth(e, "Июн")
                                    }}
                                >Июн
                                </td>
                                <td
                                    className={month == months[6] ? "tdMonthRed" : "tdMonth"}
                                    onClick={(e) => {
                                        changeMonth(e, "Июл")
                                    }}
                                >Июл
                                </td>
                                <td
                                    className={month == months[7] ? "tdMonthRed" : "tdMonth"}
                                    onClick={(e) => {
                                        changeMonth(e, "Авг")
                                    }}
                                >Авг
                                </td>
                            </tr>
                            <tr>
                                <td
                                    className={month == months[8] ? "tdMonthRed" : "tdMonth"}
                                    onClick={(e) => {
                                        changeMonth(e, "Сен")
                                    }}
                                >Сен
                                </td>
                                <td
                                    className={month == months[9] ? "tdMonthRed" : "tdMonth"}
                                    onClick={(e) => {
                                        changeMonth(e, "Окт")
                                    }}
                                >Окт
                                </td>
                                <td
                                    className={month == months[10] ? "tdMonthRed" : "tdMonth"}
                                    onClick={(e) => {
                                        changeMonth(e, "Ноя")
                                    }}
                                >Ноя
                                </td>
                                <td
                                    className={month == months[11] ? "tdMonthRed" : "tdMonth"}
                                    onClick={(e) => {
                                        changeMonth(e, "Дек")
                                    }}
                                >Дек
                                </td>
                            </tr>
                            </tbody>
                        </table>
                    </div>

                </div>

            </div>

        </div>


    )
}