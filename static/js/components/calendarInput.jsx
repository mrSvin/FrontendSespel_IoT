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

    function changeBackground(month) {
        for (var i = 0; i < months.length; i++) {
            document.getElementById(months[i]).style.backgroundColor = 'white'
        }
        document.getElementById(month).style.backgroundColor = 'red'
    }

    function changeMonth(e, param) {

        for (var i = 0; i < months.length; i++) {
            if (param == params[i]) {
                setMonth(months[i])
                setMonthNumber(monthsNumber[i])
                changeBackground(months[i])
                setDropdown("none")
            }
        }

    }

    function changeDropdown() {
        dropDown == "none" ? setDropdown("block") : setDropdown("none")
        changeBackground(month)
    }

    function ComponentCalendarMonth({month, param}) {
        return (
            <td
                className="tdMonth"
                id={month}
                onClick={(e) => {
                    changeMonth(e, param)
                }}
            >{param}
            </td>
        )
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

                                <ComponentCalendarMonth month={months[0]} param={params[0]}/>
                                <ComponentCalendarMonth month={months[1]} param={params[1]}/>
                                <ComponentCalendarMonth month={months[2]} param={params[2]}/>
                                <ComponentCalendarMonth month={months[3]} param={params[3]}/>

                            </tr>

                            <tr>

                                <ComponentCalendarMonth month={months[4]} param={params[4]}/>
                                <ComponentCalendarMonth month={months[5]} param={params[5]}/>
                                <ComponentCalendarMonth month={months[6]} param={params[6]}/>
                                <ComponentCalendarMonth month={months[7]} param={params[7]}/>

                            </tr>
                            <tr>

                                <ComponentCalendarMonth month={months[8]} param={params[8]}/>
                                <ComponentCalendarMonth month={months[9]} param={params[9]}/>
                                <ComponentCalendarMonth month={months[10]} param={params[10]}/>
                                <ComponentCalendarMonth month={months[11]} param={params[11]}/>

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

