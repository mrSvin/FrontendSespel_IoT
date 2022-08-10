function Meh1Info() {

    let complexName = ["УВФ-1 1", "УВФ-1 2", "NTX1000", "NLX3000", "GAMMA2000", "CTX650", "DMF260", "DMU50 1", "DMU50 2", "DMC1035", "CTX310 1", "CTX510 1"]
    let complexImg = ["../images/uvf_1_2.png", "../images/uvf_1_2.png", "../images/ntx1000.png", "../images/NLX3000.png", "../images/gamma2000.png", "../images/dmg_ctx650.png",
        "../images/dmg_dmf260.png", "../images/dmg_dmu50.png", "../images/dmg_dmu50.png", "../images/dmg_dmc1035.png", "../images/dmg_ctx310.png", "../images/dmg_ctx510.png"]

    let complexRequest = ['uvf_1', 'uvf_2', 'ntx1000', 'nlx3000', 'dmg_gamma2000', 'dmg_ctx650', 'dmg_dmf260', 'dmg_dmu50_1', 'dmg_dmu50_2', 'dmg_dmc1035', 'dmg_ctx310_1',
        'dmg_ctx510_1']

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

    let bufferData = bufferDataArrays(11)

    let [date, setDate] = useState(0);

    let [stateLineHC, setStateLineHC] = useState("line");

    useEffect(() => {

        setDate(dayNow())

        updateLoadData(dayNow())

    }, [])

    function newDate(dateInput) {
        setDate(dateInput)
        console.log(dateInput)

        updateLoadData(dateInput)

    }

    function updateLoadData(dateInput) {

        let roundComplex =switchLineSutki(stateLineHC,complexRequest,dateInput,bufferData)

        let promiseDataKim = Promise.resolve(roundComplex[0]);
        let promiseDataNK600 = Promise.resolve(roundComplex[1]);
        let promiseDataStp13m = Promise.resolve(roundComplex[2]);
        let promiseComplex4 = Promise.resolve(roundComplex[3]);
        let promiseComplex5 = Promise.resolve(roundComplex[4]);
        let promiseComplex6 = Promise.resolve(roundComplex[5]);
        let promiseComplex7 = Promise.resolve(roundComplex[6]);
        let promiseComplex8 = Promise.resolve(roundComplex[7]);
        let promiseComplex9 = Promise.resolve(roundComplex[8]);
        let promiseComplex10 = Promise.resolve(roundComplex[9]);
        let promiseComplex11 = Promise.resolve(roundComplex[10]);
        let promiseComplex12 = Promise.resolve(roundComplex[11]);

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

                                                        let intKimArray = value.roundArray.map(Number)
                                                        let intNK600Array = value1.roundArray.map(Number)
                                                        let intStp13mArray = value2.roundArray.map(Number)
                                                        let intComplex4 = value3.roundArray.map(Number)
                                                        let intComplex5 = value4.roundArray.map(Number)
                                                        let intComplex6 = value5.roundArray.map(Number)
                                                        let intComplex7 = value6.roundArray.map(Number)
                                                        let intComplex8 = value7.roundArray.map(Number)
                                                        let intComplex9 = value8.roundArray.map(Number)
                                                        let intComplex10 = value9.roundArray.map(Number)
                                                        let intComplex11 = value10.roundArray.map(Number)
                                                        let intComplex12 = value11.roundArray.map(Number)

                                                        if (value.roundArray.length == 0) {
                                                            intKimArray = [0, 0, 0, 0, 0, 0]
                                                        }
                                                        if (value1.roundArray.length == 0) {
                                                            intNK600Array = [0, 0, 0, 0, 0, 0]
                                                        }
                                                        if (value2.roundArray.length == 0) {
                                                            intStp13mArray = [0, 0, 0, 0, 0, 0]
                                                        }
                                                        if (value3.roundArray.length == 0) {
                                                            intComplex4 = [0, 0, 0, 0, 0, 0]
                                                        }
                                                        if (value4.roundArray.length == 0) {
                                                            intComplex5 = [0, 0, 0, 0, 0, 0]
                                                        }
                                                        if (value5.roundArray.length == 0) {
                                                            intComplex6 = [0, 0, 0, 0, 0, 0]
                                                        }
                                                        if (value6.roundArray.length == 0) {
                                                            intComplex7 = [0, 0, 0, 0, 0, 0]
                                                        }
                                                        if (value7.roundArray.length == 0) {
                                                            intComplex8 = [0, 0, 0, 0, 0, 0]
                                                        }
                                                        if (value8.roundArray.length == 0) {
                                                            intComplex9 = [0, 0, 0, 0, 0, 0]
                                                        }
                                                        if (value9.roundArray.length == 0) {
                                                            intComplex10 = [0, 0, 0, 0, 0, 0]
                                                        }
                                                        if (value10.roundArray.length == 0) {
                                                            intComplex11 = [0, 0, 0, 0, 0, 0]
                                                        }
                                                        if (value11.roundArray.length == 0) {
                                                            intComplex12 = [0, 0, 0, 0, 0, 0]
                                                        }

                                                        highChartTotal(complexName, [intKimArray[0], intNK600Array[0], intStp13mArray[0], intComplex4[0], intComplex5[0], intComplex6[0], intComplex7[0], intComplex8[0], intComplex9[0], intComplex10[0], intComplex11[0], intComplex12[0]],
                                                            [intKimArray[1], intNK600Array[1], intStp13mArray[1], intComplex4[1], intComplex5[1], intComplex6[1], intComplex7[1], intComplex8[1], intComplex9[1], intComplex10[1], intComplex11[1], intComplex12[1]],
                                                            [intKimArray[2], intNK600Array[2], intStp13mArray[2], intComplex4[2], intComplex5[2], intComplex6[2], intComplex7[2], intComplex8[2], intComplex9[2], intComplex10[2], intComplex11[2], intComplex12[2]],
                                                            [intKimArray[3], intNK600Array[3], intStp13mArray[3], intComplex4[3], intComplex5[3], intComplex6[3], intComplex7[3], intComplex8[3], intComplex9[3], intComplex10[3], intComplex11[3], intComplex12[3]],
                                                            [intKimArray[4], intNK600Array[4], intStp13mArray[4], intComplex4[4], intComplex5[4], intComplex6[4], intComplex7[4], intComplex8[4], intComplex9[4], intComplex10[4], intComplex11[4], intComplex12[4]],
                                                            'Нагрузка', dateInput)

                                                        //Количество операций
                                                        let kolKim = kolOperations(value.workArray)
                                                        let kolNK600 = kolOperations(value1.workArray)
                                                        let kolStp13m = kolOperations(value2.workArray)
                                                        let kolComplex4 = kolOperations(value3.workArray)
                                                        let kolComplex5 = kolOperations(value4.workArray)
                                                        let kolComplex6 = kolOperations(value5.workArray)
                                                        let kolComplex7 = kolOperations(value6.workArray)
                                                        let kolComplex8 = kolOperations(value7.workArray)
                                                        let kolComplex9 = kolOperations(value8.workArray)
                                                        let kolComplex10 = kolOperations(value9.workArray)
                                                        let kolComplex11 = kolOperations(value10.workArray)
                                                        let kolComplex12 = kolOperations(value11.workArray)

                                                        highChartCountOperations(complexName, [kolKim[0], kolNK600[0], kolStp13m[0], kolComplex4[0], kolComplex5[0], kolComplex6[0], kolComplex7[0], kolComplex8[0], kolComplex9[0], kolComplex10[0], kolComplex11[0], kolComplex12[0]],
                                                            [kolKim[1], kolNK600[1], kolStp13m[1], kolComplex4[1], kolComplex5[1], kolComplex6[1], kolComplex7[1], kolComplex8[1], kolComplex9[1], kolComplex10[1], kolComplex11[1], kolComplex12[1] ])

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

            <DayCalendar newDate={newDate} date={date}/>

            <ComplexTotalSutkiInfo/>

            <SwitchLineHC date={date} stateLineHC={stateLineHC} setStateLineHC={setStateLineHC} bufferData={bufferData} complexRequest={complexRequest}/>

            <ComplexSutkiAllInfo complexName={complexName[0]} complexImg={complexImg[0]} complexMesto={buttonsVrs1} size={"meh1"} idContainer = {1} service={complexName[0]}/>
            <ComplexSutkiAllInfo complexName={complexName[1]} complexImg={complexImg[1]} complexMesto={buttonsVrs2} size={"meh1"} idContainer = {2} service={complexName[1]}/>
            <ComplexSutkiAllInfo complexName={complexName[2]} complexImg={complexImg[2]} complexMesto={buttonsVrs3} size={"meh1"} idContainer = {3} alarm={complexName[2]} service={complexName[2]}/>
            <ComplexSutkiAllInfo complexName={complexName[3]} complexImg={complexImg[3]} complexMesto={buttonsVrs4} size={"meh1"} idContainer = {4} alarm={complexName[3]} service={complexName[3]}/>
            <ComplexSutkiAllInfo complexName={complexName[4]} complexImg={complexImg[4]} complexMesto={buttonsVrs5} size={"meh1"} idContainer = {5} alarm={complexName[4]} service={complexName[4]}/>
            <ComplexSutkiAllInfo complexName={complexName[5]} complexImg={complexImg[5]} complexMesto={buttonsVrs6} size={"meh1"} idContainer = {6} alarm={complexName[5]} service={complexName[5]}/>
            <ComplexSutkiAllInfo complexName={complexName[6]} complexImg={complexImg[6]} complexMesto={buttonsVrs7} size={"meh1"} idContainer = {7} alarm={complexName[6]} service={complexName[6]}/>
            <ComplexSutkiAllInfo complexName={complexName[7]} complexImg={complexImg[7]} complexMesto={buttonsVrs8} size={"meh1"} idContainer = {8} alarm={complexName[7]} service={complexName[7]}/>
            <ComplexSutkiAllInfo complexName={complexName[8]} complexImg={complexImg[8]} complexMesto={buttonsVrs9} size={"meh1"} idContainer = {9} alarm={complexName[8]} service={complexName[8]}/>
            <ComplexSutkiAllInfo complexName={complexName[9]} complexImg={complexImg[9]} complexMesto={buttonsVrs10} size={"meh1"} idContainer = {10} alarm={complexName[9]} service={complexName[9]}/>
            <ComplexSutkiAllInfo complexName={complexName[10]} complexImg={complexImg[10]} complexMesto={buttonsVrs11} size={"meh1"} idContainer = {11} alarm={complexName[10]} service={complexName[10]}/>
            <ComplexSutkiAllInfo complexName={complexName[11]} complexImg={complexImg[11]} complexMesto={buttonsVrs12} size={"meh1"} idContainer = {12} alarm={complexName[11]} service={complexName[11]}/>

        </div>
    )

}

function Meh1() {

    return (
        <div>

            <MenuStanki menuSelected="meh1"/>

            <div className="buttons-otchet">

                <Link to="/stanki/meh1">
                    <div className="menuSelect">СУТОЧНЫЙ ОТЧЕТ</div>
                </Link>

                <Link to="/stanki/meh1Month">
                    <div className="menuNoSelect">МЕСЯЧНЫЙ ОТЧЕТ</div>
                </Link>

                <Link to="/stanki/meh1Smena">
                    <div className="menuNoSelect">СМЕННЫЙ ОТЧЕТ</div>
                </Link>

            </div>

            <Meh1Info/>

        </div>
    )
}