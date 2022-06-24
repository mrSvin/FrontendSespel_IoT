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

const MonthCalendar = ({newDate, updateData, stateButtonUpdate}) => {

    const months = ["Январь", "Февраль", "Март", "Апрель", "Май", "Июнь", "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"];
    const monthsNumber = ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"];
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

    function changeBackground(month) {
        for (var i = 0; i < months.length; i++) {
            document.getElementById(months[i]).style.backgroundColor = 'white'
        }
        document.getElementById(month).style.backgroundColor = 'red'
    }

    function changeMonth(e, param) {
        if (param == "янв") {
            setMonth("Январь")
            setMonthNumber("01")
            changeBackground("Январь")
            setDropdown("none")

        }
        if (param == "фев") {
            setMonth("Февраль")
            setMonthNumber("02")
            changeBackground("Февраль")
            setDropdown("none")
        }
        if (param == "мар") {
            setMonth("Март")
            setMonthNumber("03")
            changeBackground("Март")
            setDropdown("none")
        }
        if (param == "апр") {
            setMonth("Апрель")
            setMonthNumber("04")
            changeBackground("Апрель")
            setDropdown("none")
        }
        if (param == "май") {
            setMonth("Май")
            setMonthNumber("05")
            changeBackground("Май")
            setDropdown("none")
        }
        if (param == "июн") {
            setMonth("Июнь")
            setMonthNumber("06")
            changeBackground("Июнь")
            setDropdown("none")
        }
        if (param == "июл") {
            setMonth("Июль")
            setMonthNumber("07")
            changeBackground("Июль")
            setDropdown("none")
        }
        if (param == "авг") {
            setMonth("Август")
            setMonthNumber("08")
            changeBackground("Август")
            setDropdown("none")
        }
        if (param == "сен") {
            setMonth("Сентябрь")
            setMonthNumber("09")
            changeBackground("Сентябрь")
            setDropdown("none")
        }
        if (param == "окт") {
            setMonth("Октябрь")
            setMonthNumber("10")
            changeBackground("Октябрь")
            setDropdown("none")
        }
        if (param == "ноя") {
            setMonth("Ноябрь")
            setMonthNumber("11")
            changeBackground("Ноябрь")
            setDropdown("none")
        }
        if (param == "дек") {
            setMonth("Декабрь")
            setMonthNumber("12")
            changeBackground("Декабрь")
            setDropdown("none")
        }

    }

    function changeDropdown() {
        dropDown == "none" ? setDropdown("block") : setDropdown("none")
        changeBackground(month)
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
                            <tbody onClick={newDate(`${year}-${monthNumber}`)}>
                            <tr>
                                <td
                                    className="tdMonth"
                                    id='Январь'
                                    onClick={(e) => {
                                        changeMonth(e, "янв")
                                    }}
                                >Янв
                                </td>
                                <td
                                    className="tdMonth"
                                    id='Февраль'
                                    onClick={(e) => {
                                        changeMonth(e, "фев")
                                    }}
                                >Фев
                                </td>
                                <td className="tdMonth"
                                    id='Март'
                                    onClick={(e) => {
                                        changeMonth(e, "мар")
                                    }}
                                >Мар
                                </td>
                                <td className="tdMonth"
                                    id='Апрель'
                                    onClick={(e) => {
                                        changeMonth(e, "апр")
                                    }}
                                >Апр
                                </td>
                            </tr>
                            <tr>
                                <td className="tdMonth"
                                    id='Май'
                                    onClick={(e) => {
                                        changeMonth(e, "май")
                                    }}
                                >Май
                                </td>
                                <td className="tdMonth"
                                    id='Июнь'
                                    onClick={(e) => {
                                        changeMonth(e, "июн")
                                    }}
                                >Июн
                                </td>
                                <td className="tdMonth"
                                    id='Июль'
                                    onClick={(e) => {
                                        changeMonth(e, "июл")
                                    }}
                                >Июл
                                </td>
                                <td className="tdMonth"
                                    id='Август'
                                    onClick={(e) => {
                                        changeMonth(e, "авг")
                                    }}
                                >Авг
                                </td>
                            </tr>
                            <tr>
                                <td className="tdMonth"
                                    id='Сентябрь'
                                    onClick={(e) => {
                                        changeMonth(e, "сен")
                                    }}
                                >Сен
                                </td>
                                <td className="tdMonth"
                                    id='Октябрь'
                                    onClick={(e) => {
                                        changeMonth(e, "окт")
                                    }}
                                >Окт
                                </td>
                                <td className="tdMonth"
                                    id='Ноябрь'
                                    onClick={(e) => {
                                        changeMonth(e, "ноя")
                                    }}
                                >Ноя
                                </td>
                                <td className="tdMonth"
                                    id='Декабрь'
                                    onClick={(e) => {
                                        changeMonth(e, "дек")
                                    }}
                                >Дек
                                </td>
                            </tr>
                            </tbody>
                        </table>
                    </div>

                </div>

            </div>

            <UpdateData updateData={updateData} stateButtonUpdate ={stateButtonUpdate}/>

        </div>


    )
}