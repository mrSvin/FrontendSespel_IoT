function Meh1Month() {

    let complexName = ["УВФ-1 #1", "УВФ-1 #2", "NTX1000 #2", "NLX3000", "GAMMA2000", "CTX650", "DMF260", "DMU50 #1", "DMU50 #2", "DMC1035", "CTX310 #1", "CTX510 #1"]
    let complexImg = ["../images/uvf_1_2.png", "../images/uvf_1_2.png", "../images/ntx1000.png", "../images/NLX3000.png", "../images/gamma2000.png", "../images/dmg_ctx650.png",
        "../images/dmg_dmf260.png", "../images/dmg_dmu50.png", "../images/dmg_dmu50.png", "../images/dmg_dmc1035.png", "../images/dmg_ctx310.png", "../images/dmg_ctx510.png"]

    let buttonsVrs1 = [-340, 280, 'url(../images/uvf_1_2.png) no-repeat', "../images/meh_ceh.png", 40, "unset"]
    let buttonsVrs2 =  [-180, 280, 'url(../images/uvf_1_2.png) no-repeat', "../images/meh_ceh.png", 40, "unset"]
    let buttonsVrs3 = [-670, 490, 'url(../images/ntx1000.png) no-repeat', "../images/meh_ceh.png", 40, "unset"]
    let buttonsVrs4 = [-590, 310, 'url(../images/NLX3000.png) no-repeat', "../images/meh_ceh.png", 40, "unset"]
    let buttonsVrs5 = [-840, 520, 'url(../images/gamma2000.png) no-repeat', "../images/meh_ceh.png", 60, "unset"]
    let buttonsVrs6 = [-500, 310, 'url(../images/dmg_ctx650.png) no-repeat', "../images/meh_ceh.png", 40, "unset"]
    let buttonsVrs7 = [-780, 200, 'url(../images/dmg_dmf260.png) no-repeat', "../images/meh_ceh.png", 40, "unset"]
    let buttonsVrs8 = [-500, 115, 'url(../images/dmg_dmu50.png) no-repeat', "../images/meh_ceh.png", 40, "unset"]
    let buttonsVrs9 = [-410, 115, 'url(../images/dmg_dmu50.png) no-repeat', "../images/meh_ceh.png", 40, "unset"]
    let buttonsVrs10 = [-590, 115, 'url(../images/dmg_dmc1035.png) no-repeat', "../images/meh_ceh.png", 40, "unset"]
    let buttonsVrs11 = [-590, 470, 'url(../images/dmg_ctx310.png) no-repeat', "../images/meh_ceh.png", 40, "unset"]
    let buttonsVrs12 = [-490, 470, 'url(../images/dmg_ctx510.png) no-repeat', "../images/meh_ceh.png", 40, "unset"]

    let [dateMonth, setDateMonth] = useState(0);

    useEffect(() => {

        updateLoadDataMonth( monthNow())

    }, [])

    function newDate(dateInput) {
        console.log(dateInput)
        setDateMonth(dateInput)
        updateLoadDataMonth(dateInput)
    }

    function updateLoadDataMonth(dateInput) {

        let roundKim = fetchMonthHighCharts('uvf_1', dateInput, 1)
        let roundNK600 = fetchMonthHighCharts('uvf_2', dateInput, 2)
        let roundStp13m = fetchMonthHighCharts('ntx1000', dateInput, 3)
        let roundComplex4 = fetchMonthHighCharts('nlx3000', dateInput, 4)
        let roundComplex5 = fetchMonthHighCharts('dmg_gamma2000', dateInput, 5)
        let roundComplex6 = fetchMonthHighCharts('dmg_ctx650', dateInput, 6)
        let roundComplex7 = fetchMonthHighCharts('dmg_dmf260', dateInput, 7)
        let roundComplex8 = fetchMonthHighCharts('dmg_dmu50_1', dateInput, 8)
        let roundComplex9 = fetchMonthHighCharts('dmg_dmu50_2', dateInput, 9)
        let roundComplex10 = fetchMonthHighCharts('dmg_dmc1035', dateInput, 10)
        let roundComplex11 = fetchMonthHighCharts('dmg_ctx310_1', dateInput, 11)
        let roundComplex12 = fetchMonthHighCharts('dmg_ctx510_1', dateInput, 12)

        let promiseDataKim = Promise.resolve(roundKim);
        let promiseDataNK600 = Promise.resolve(roundNK600);
        let promiseDataStp13m = Promise.resolve(roundStp13m);
        let promiseComplex4 = Promise.resolve(roundComplex4);
        let promiseComplex5 = Promise.resolve(roundComplex5);
        let promiseComplex6 = Promise.resolve(roundComplex6);
        let promiseComplex7 = Promise.resolve(roundComplex7);
        let promiseComplex8 = Promise.resolve(roundComplex8);
        let promiseComplex9 = Promise.resolve(roundComplex9);
        let promiseComplex10 = Promise.resolve(roundComplex10);
        let promiseComplex11 = Promise.resolve(roundComplex11);
        let promiseComplex12 = Promise.resolve(roundComplex12);

        //Общая загрузка
        promiseDataKim.then(value => {
            promiseDataNK600.then(value1 => {
                promiseDataStp13m.then(value2 => {
                    promiseComplex4.then(value3 => {
                        promiseComplex5.then(value4 => {
                            promiseComplex6.then(value5 => {
                                promiseComplex7.then(value6 => {
                                    promiseComplex8.then(value7 => {
                                        promiseComplex9.then(value8 => {
                                            promiseComplex10.then(value9 => {
                                                promiseComplex11.then(value10 => {
                                                    promiseComplex12.then(value11 => {

                                                        let workKimArray = averageMonthdata(value.work.map(Number))
                                                        let pauseKimArray = averageMonthdata(value.pause.map(Number))
                                                        let offKimArray = averageMonthdata(value.off.map(Number))
                                                        let avarKimArray = averageMonthdata(value.avar.map(Number))
                                                        let nagruzkaKimArray = averageMonthdata(value.nagruzka.map(Number))

                                                        let workNK600Array = averageMonthdata(value1.work.map(Number))
                                                        let pauseNK600Array = averageMonthdata(value1.pause.map(Number))
                                                        let offNK600Array = averageMonthdata(value1.off.map(Number))
                                                        let avarNK600Array = averageMonthdata(value1.avar.map(Number))
                                                        let nagruzkaNK600Array = averageMonthdata(value1.nagruzka.map(Number))

                                                        let workStp13mArray = averageMonthdata(value2.work.map(Number))
                                                        let pauseStp13mArray = averageMonthdata(value2.pause.map(Number))
                                                        let offStp13mArray = averageMonthdata(value2.off.map(Number))
                                                        let avarStp13mArray = averageMonthdata(value2.avar.map(Number))
                                                        let nagruzkaStp13mArray = averageMonthdata(value2.nagruzka.map(Number))

                                                        let workComplex4Array = averageMonthdata(value3.work.map(Number))
                                                        let pauseComplex4Array = averageMonthdata(value3.pause.map(Number))
                                                        let offComplex4Array = averageMonthdata(value3.off.map(Number))
                                                        let avarComplex4Array = averageMonthdata(value3.avar.map(Number))
                                                        let nagruzkaComplex4Array = averageMonthdata(value3.nagruzka.map(Number))

                                                        let workComplex5Array = averageMonthdata(value4.work.map(Number))
                                                        let pauseComplex5Array = averageMonthdata(value4.pause.map(Number))
                                                        let offComplex5Array = averageMonthdata(value4.off.map(Number))
                                                        let avarComplex5Array = averageMonthdata(value4.avar.map(Number))
                                                        let nagruzkaComplex5Array = averageMonthdata(value4.nagruzka.map(Number))

                                                        let workComplex6Array = averageMonthdata(value5.work.map(Number))
                                                        let pauseComplex6Array = averageMonthdata(value5.pause.map(Number))
                                                        let offComplex6Array = averageMonthdata(value5.off.map(Number))
                                                        let avarComplex6Array = averageMonthdata(value5.avar.map(Number))
                                                        let nagruzkaComplex6Array = averageMonthdata(value5.nagruzka.map(Number))

                                                        let workComplex7Array = averageMonthdata(value6.work.map(Number))
                                                        let pauseComplex7Array = averageMonthdata(value6.pause.map(Number))
                                                        let offComplex7Array = averageMonthdata(value6.off.map(Number))
                                                        let avarComplex7Array = averageMonthdata(value6.avar.map(Number))
                                                        let nagruzkaComplex7Array = averageMonthdata(value6.nagruzka.map(Number))

                                                        let workComplex8Array = averageMonthdata(value7.work.map(Number))
                                                        let pauseComplex8Array = averageMonthdata(value7.pause.map(Number))
                                                        let offComplex8Array = averageMonthdata(value7.off.map(Number))
                                                        let avarComplex8Array = averageMonthdata(value7.avar.map(Number))
                                                        let nagruzkaComplex8Array = averageMonthdata(value7.nagruzka.map(Number))

                                                        let workComplex9Array = averageMonthdata(value8.work.map(Number))
                                                        let pauseComplex9Array = averageMonthdata(value8.pause.map(Number))
                                                        let offComplex9Array = averageMonthdata(value8.off.map(Number))
                                                        let avarComplex9Array = averageMonthdata(value8.avar.map(Number))
                                                        let nagruzkaComplex9Array = averageMonthdata(value8.nagruzka.map(Number))

                                                        let workComplex10Array = averageMonthdata(value9.work.map(Number))
                                                        let pauseComplex10Array = averageMonthdata(value9.pause.map(Number))
                                                        let offComplex10Array = averageMonthdata(value9.off.map(Number))
                                                        let avarComplex10Array = averageMonthdata(value9.avar.map(Number))
                                                        let nagruzkaComplex10Array = averageMonthdata(value9.nagruzka.map(Number))

                                                        let workComplex11Array = averageMonthdata(value10.work.map(Number))
                                                        let pauseComplex11Array = averageMonthdata(value10.pause.map(Number))
                                                        let offComplex11Array = averageMonthdata(value10.off.map(Number))
                                                        let avarComplex11Array = averageMonthdata(value10.avar.map(Number))
                                                        let nagruzkaComplex11Array = averageMonthdata(value10.nagruzka.map(Number))

                                                        let workComplex12Array = averageMonthdata(value11.work.map(Number))
                                                        let pauseComplex12Array = averageMonthdata(value11.pause.map(Number))
                                                        let offComplex12Array = averageMonthdata(value11.off.map(Number))
                                                        let avarComplex12Array = averageMonthdata(value11.avar.map(Number))
                                                        let nagruzkaComplex12Array = averageMonthdata(value11.nagruzka.map(Number))


                                                        highChartTotal(complexName, [workKimArray, workNK600Array, workStp13mArray, workComplex4Array, workComplex5Array, workComplex6Array, workComplex7Array, workComplex8Array, workComplex9Array, workComplex10Array, workComplex11Array, workComplex12Array],
                                                            [pauseKimArray, pauseNK600Array, pauseStp13mArray, pauseComplex4Array, pauseComplex5Array, pauseComplex6Array, pauseComplex7Array, pauseComplex8Array, pauseComplex9Array, pauseComplex10Array, pauseComplex11Array, pauseComplex12Array],
                                                            [offKimArray, offNK600Array, offStp13mArray, offComplex4Array, offComplex5Array, offComplex6Array, offComplex7Array, offComplex8Array, offComplex9Array, offComplex10Array, offComplex11Array, offComplex12Array],
                                                            [avarKimArray, avarNK600Array, avarStp13mArray, avarComplex4Array, avarComplex5Array, avarComplex6Array, avarComplex7Array, avarComplex8Array, avarComplex9Array, avarComplex10Array, avarComplex11Array, avarComplex12Array],
                                                            [nagruzkaKimArray, nagruzkaNK600Array, nagruzkaStp13mArray, nagruzkaComplex4Array, nagruzkaComplex5Array, nagruzkaComplex6Array, nagruzkaComplex7Array, nagruzkaComplex8Array, nagruzkaComplex9Array, nagruzkaComplex10Array, nagruzkaComplex11Array, nagruzkaComplex12Array],
                                                            'Нагрузка', dateInput)

                                                        highChartRound(averageMonthdata([workKimArray, workNK600Array, workStp13mArray, workComplex4Array, workComplex5Array, workComplex6Array, workComplex7Array, workComplex8Array, workComplex9Array, workComplex10Array, workComplex11Array, workComplex12Array]),
                                                            averageMonthdata([pauseKimArray, pauseNK600Array, pauseStp13mArray, pauseComplex4Array, pauseComplex5Array, pauseComplex6Array, pauseComplex7Array, pauseComplex8Array, pauseComplex9Array, pauseComplex10Array, pauseComplex11Array, pauseComplex12Array]),
                                                            averageMonthdata([offKimArray, offNK600Array, offStp13mArray, offComplex4Array, offComplex5Array, offComplex6Array, offComplex7Array, offComplex8Array, offComplex9Array, offComplex10Array, offComplex11Array, offComplex12Array]),
                                                            averageMonthdata([avarKimArray, avarNK600Array, avarStp13mArray, avarComplex4Array, avarComplex5Array, avarComplex6Array, avarComplex7Array, avarComplex8Array, avarComplex9Array, avarComplex10Array, avarComplex11Array, avarComplex12Array]),
                                                            averageMonthdata([nagruzkaKimArray, nagruzkaNK600Array, nagruzkaStp13mArray, nagruzkaStp13mArray, nagruzkaComplex4Array, nagruzkaComplex5Array, nagruzkaComplex6Array, nagruzkaComplex7Array, nagruzkaComplex8Array, nagruzkaComplex9Array, nagruzkaComplex10Array, nagruzkaComplex11Array, nagruzkaComplex12Array]),
                                                            'Нагрузка','Total')

                                                    })
                                                })
                                            })
                                        })
                                    })
                                })
                            })
                        })
                    })
                })
            })
        })

    }

    return (
        <div>

            <MenuStanki menuSelected="meh1"/>

            <MenuOtchet select="month" page='meh1'/>

            <MonthCalendar newDate={newDate} dateMonth={dateMonth}/>

            <ComplexTotalMonthInfo/>

            <ComplexSutkiAllInfo complexName={complexName[0]} complexImg={complexImg[0]} complexMesto={buttonsVrs1} size={"meh1"} idContainer = {1} service={"УВФ-1 1"}/>
            <ComplexSutkiAllInfo complexName={complexName[1]} complexImg={complexImg[1]} complexMesto={buttonsVrs2} size={"meh1"} idContainer = {2} service={"УВФ-1 2"}/>
            <ComplexSutkiAllInfo complexName={complexName[2]} complexImg={complexImg[2]} complexMesto={buttonsVrs3} size={"meh1"} idContainer = {3} alarm={complexName[2]} service={"NTX1000"}/>
            <ComplexSutkiAllInfo complexName={complexName[3]} complexImg={complexImg[3]} complexMesto={buttonsVrs4} size={"meh1"} idContainer = {4} alarm={complexName[3]} service={"NLX3000"}/>
            <ComplexSutkiAllInfo complexName={complexName[4]} complexImg={complexImg[4]} complexMesto={buttonsVrs5} size={"meh1"} idContainer = {5} alarm={complexName[4]} service={"GAMMA2000"}/>
            <ComplexSutkiAllInfo complexName={complexName[5]} complexImg={complexImg[5]} complexMesto={buttonsVrs6} size={"meh1"} idContainer = {6} alarm={complexName[5]} service={"CTX650"}/>
            <ComplexSutkiAllInfo complexName={complexName[6]} complexImg={complexImg[6]} complexMesto={buttonsVrs7} size={"meh1"} idContainer = {7} alarm={complexName[6]} service={"DMF260"}/>
            <ComplexSutkiAllInfo complexName={complexName[7]} complexImg={complexImg[7]} complexMesto={buttonsVrs8} size={"meh1"} idContainer = {8} alarm={complexName[7]} service={"DMU50 1"}/>
            <ComplexSutkiAllInfo complexName={complexName[8]} complexImg={complexImg[8]} complexMesto={buttonsVrs9} size={"meh1"} idContainer = {9} alarm={complexName[8]} service={"DMU50 2"}/>
            <ComplexSutkiAllInfo complexName={complexName[9]} complexImg={complexImg[9]} complexMesto={buttonsVrs10} size={"meh1"} idContainer = {10} alarm={complexName[9]} service={"DMC1035"}/>
            <ComplexSutkiAllInfo complexName={complexName[10]} complexImg={complexImg[10]} complexMesto={buttonsVrs11} size={"meh1"} idContainer = {11} alarm={complexName[10]} service={"CTX310 1"}/>
            <ComplexSutkiAllInfo complexName={complexName[11]} complexImg={complexImg[11]} complexMesto={buttonsVrs12} size={"meh1"} idContainer = {12} alarm={complexName[11]} service={"CTX510 1"}/>

        </div>
    )
}