function ScudMonth() {

    let [date, setDate] = useState(dayNow());
    // let [smenaState, setSmenaState] = useState('8и')
    let [usersWithSmena, setUsersWithSmena] = useState('line')


    useEffect(() => {
        console.log('Тестовая запись')
    }, []);

    function newDate(dateInput) {
        setDate(dateInput)
    }

    return (
        <div>
            <div className="buttons-otchet marginToSmenaMenu">

                <Link to={`/scud/1ploshadka`}>
                    <div className={'menuNoSelect'}>Первая площадка</div>
                </Link>

                <Link to={`/scud/1ploshadka`}>
                    <div className={'menuNoSelect'}>Вторая площадка</div>
                </Link>

                <Link to={`/scud/1ploshadka`}>
                    <div className={'menuNoSelect'}>Офис</div>
                </Link>

                <Link to={`/scudMonth`}>
                    <div className={`menuSelect`}>Месячные отчеты</div>
                </Link>

            </div>
            <div className="energyCalendarContainer">
                <DayCalendar newDate={newDate} date={date}/>
                <div className='hideIndividualAll'>
                    <SwitchLineHCIndividual stateLineHC={usersWithSmena} setStateLineHC={setUsersWithSmena}
                                            text={'Привязка по смене'}/>
                </div>
            </div>
            <p className='switchButtonMessage'>{usersWithSmena == 'line' ? 'Отображение сотрудников по выбранного графику' : 'Все сотрудники'}</p>
        </div>
    );
}


