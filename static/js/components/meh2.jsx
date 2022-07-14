function Meh2Info() {

    let complexName = ["УФ5220", "СТП Сеспель", "NTX1000 #2", "SK50", "APEC", "DMU50 #3", "DMU50 #4", "CTX310 #2", "CTX510 #2", "CTX510 #3", "CTX310 #3", "CTX510 #4", "CTX510 #5",
        "DMC1035 #2", "DMU50 #5", "DMU50 #6", "DMU50 #7", "AR55"]
    let complexImg = ["../images/UVF_5220.png", "../images/progress.png", "../images/ntx1000.png", "../images/sk50.png", "../images/apec.png", "../images/dmg_dmu50.png",
        "../images/dmg_dmu50.png", "../images/dmg_dmu50.png", "../images/dmg_ctx310.png", "../images/dmg_ctx510.png", "../images/dmg_ctx510.png", "../images/dmg_ctx310.png",
        "../images/dmg_ctx510.png", "../images/dmg_ctx510.png", "../images/dmg_dmc1035.png", "../images/dmg_dmu50.png", "../images/dmg_dmu50.png", "../images/ar55.png"]

    let buttonsVrs1 =  [-115, 875, 'url(../images/UVF_5220.png) no-repeat', "../images/ii_ploshadka.png", 40, "unset"]
    let buttonsVrs2 = [-105, 494, 'url(../images/progress.png) no-repeat', "../images/ii_ploshadka.png", 40, "unset"]
    let buttonsVrs3 = [-100, 295, 'url(../images/ntx1000.png) no-repeat', "../images/ii_ploshadka.png", 25, "unset"]
    let buttonsVrs4 = [-100, 597, 'url(../images/sk50.png) no-repeat', "../images/ii_ploshadka.png", 40, "unset"]
    let buttonsVrs5 = [-106, 780, 'url(../images/apec.png) no-repeat', "../images/ii_ploshadka.png", 40, "unset"]
    let buttonsVrs6 = [-65, 295, 'url(../images/dmg_dmu50.png) no-repeat', "../images/ii_ploshadka.png", 25, "unset"]
    let buttonsVrs7 = [-65, 270, 'url(../images/dmg_dmu50.png) no-repeat', "../images/ii_ploshadka.png", 25, "unset"]
    let buttonsVrs8 = [-65, 270, 'url(../images/dmg_ctx310.png) no-repeat', "../images/ii_ploshadka.png", 25, "unset"]
    let buttonsVrs9 = [-101, 106, 'url(../images/dmg_ctx510.png) no-repeat', "../images/ii_ploshadka.png", 25, "unset"]
    let buttonsVrs10 = [-101, 85, 'url(../images/dmg_ctx510.png) no-repeat', "../images/ii_ploshadka.png", 25, "unset"]
    let buttonsVrs11 = [-105, 210, 'url(../images/dmg_ctx310.png) no-repeat', "../images/ii_ploshadka.png", 25, "unset"]
    let buttonsVrs12 = [-105, 235, 'url(../images/dmg_ctx510.png) no-repeat', "../images/ii_ploshadka.png", 25, "unset"]
    let buttonsVrs13 = [-65, 210, 'url(../images/dmg_ctx510.png) no-repeat', "../images/ii_ploshadka.png", 25, "unset"]
    let buttonsVrs14 = [-103, 171, 'url(../images/dmg_dmc1035.png) no-repeat', "../images/ii_ploshadka.png", 25, "unset"]
    let buttonsVrs15 = [-65, 171, 'url(../images/dmg_dmu50.png) no-repeat', "../images/ii_ploshadka.png", 25, "unset"]
    let buttonsVrs16 = [-65, 141, 'url(../images/dmg_dmu50.png) no-repeat', "../images/ii_ploshadka.png", 25, "unset"]
    let buttonsVrs17 = [-102, 143, 'url(../images/dmg_dmu50.png) no-repeat', "../images/ii_ploshadka.png", 25, "unset"]
    let buttonsVrs18 = [-98, 268, 'url(../images/ar50.png) no-repeat', "../images/ii_ploshadka.png", 25, "unset"]

    let bufferData = bufferDataArrays(18)

    let [date, setDate] = useState(0);

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

        let roundKim = fetchRequestBuildHC(dateInput, bufferData[0], 'uvf5220', 1)
        let roundNK600 = fetchRequestBuildHC(dateInput, bufferData[1], 'progress',2)
        let roundStp13m = fetchRequestBuildHC(dateInput, bufferData[2], 'ntx1000_2', 3)
        let roundRtc12c = fetchRequestBuildHC(dateInput, bufferData[3], 'sk50', 4)
        let roundP250 = fetchRequestBuildHC(dateInput, bufferData[4], 'apec',5)
        let roundKrot = fetchRequestBuildHC(dateInput, bufferData[5], 'dmg_dmu50_3', 6)
        let roundPrans = fetchRequestBuildHC(dateInput, bufferData[6], 'dmg_dmu50_4', 7)
        let roundComplex8 = fetchRequestBuildHC(dateInput, bufferData[7], 'dmg_ctx310_2', 8)
        let roundComplex9 = fetchRequestBuildHC(dateInput, bufferData[8], 'dmg_ctx510_2', 9)
        let roundComplex10 = fetchRequestBuildHC(dateInput, bufferData[9], 'dmg_ctx510_3', 10)
        let roundComplex11 = fetchRequestBuildHC(dateInput, bufferData[10], 'dmg_ctx310_3', 11)
        let roundComplex12 = fetchRequestBuildHC(dateInput, bufferData[11], 'dmg_ctx510_4', 12)
        let roundComplex13 = fetchRequestBuildHC(dateInput, bufferData[12], 'dmg_ctx510_5', 13)
        let roundComplex14 = fetchRequestBuildHC(dateInput, bufferData[13], 'dmg_dmc1035_2', 14)
        let roundComplex15 = fetchRequestBuildHC(dateInput, bufferData[14], 'dmg_dmu50_5', 15)
        let roundComplex16 = fetchRequestBuildHC(dateInput, bufferData[15], 'dmg_dmu50_6', 16)
        let roundComplex17 = fetchRequestBuildHC(dateInput, bufferData[16], 'dmg_dmu50_7', 17)
        let roundComplex18 = fetchRequestBuildHC(dateInput, bufferData[17], 'ar55', 18)

        let promiseDataKim = Promise.resolve(roundKim);
        let promiseDataNK600 = Promise.resolve(roundNK600);
        let promiseDataStp13m = Promise.resolve(roundStp13m);
        let promiseComplex4 = Promise.resolve(roundRtc12c);
        let promiseComplex5 = Promise.resolve(roundP250);
        let promiseComplex6 = Promise.resolve(roundKrot);
        let promiseComplex7 = Promise.resolve(roundPrans);
        let promiseComplex8 = Promise.resolve(roundComplex8);
        let promiseComplex9 = Promise.resolve(roundComplex9);
        let promiseComplex10 = Promise.resolve(roundComplex10);
        let promiseComplex11 = Promise.resolve(roundComplex11);
        let promiseComplex12 = Promise.resolve(roundComplex12);
        let promiseComplex13 = Promise.resolve(roundComplex13);
        let promiseComplex14 = Promise.resolve(roundComplex14);
        let promiseComplex15 = Promise.resolve(roundComplex15);
        let promiseComplex16 = Promise.resolve(roundComplex16);
        let promiseComplex17 = Promise.resolve(roundComplex17);
        let promiseComplex18 = Promise.resolve(roundComplex18);

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
                                                        promiseComplex13.then(value12 => {
                                                            promiseComplex14.then(value13 => {
                                                                promiseComplex15.then(value14 => {
                                                                    promiseComplex16.then(value15 => {
                                                                        promiseComplex17.then(value16 => {
                                                                            promiseComplex18.then(value17 => {

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
                                                                                let intComplex13 = value12.roundArray.map(Number)
                                                                                let intComplex14 = value13.roundArray.map(Number)
                                                                                let intComplex15 = value14.roundArray.map(Number)
                                                                                let intComplex16 = value15.roundArray.map(Number)
                                                                                let intComplex17 = value16.roundArray.map(Number)
                                                                                let intComplex18 = value17.roundArray.map(Number)

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
                                                                                if (value12.roundArray.length == 0) {
                                                                                    intComplex13 = [0, 0, 0, 0, 0, 0]
                                                                                }
                                                                                if (value13.roundArray.length == 0) {
                                                                                    intComplex14 = [0, 0, 0, 0, 0, 0]
                                                                                }
                                                                                if (value14.roundArray.length == 0) {
                                                                                    intComplex15 = [0, 0, 0, 0, 0, 0]
                                                                                }
                                                                                if (value15.roundArray.length == 0) {
                                                                                    intComplex16 = [0, 0, 0, 0, 0, 0]
                                                                                }
                                                                                if (value16.roundArray.length == 0) {
                                                                                    intComplex17 = [0, 0, 0, 0, 0, 0]
                                                                                }
                                                                                if (value17.roundArray.length == 0) {
                                                                                    intComplex18 = [0, 0, 0, 0, 0, 0]
                                                                                }

                                                                                highChartTotal(complexName, [intKimArray[0], intNK600Array[0], intStp13mArray[0], intComplex4[0], intComplex5[0], intComplex6[0], intComplex7[0], intComplex8[0], intComplex9[0], intComplex10[0], intComplex11[0], intComplex12[0], intComplex13[0], intComplex14[0], intComplex15[0], intComplex16[0], intComplex17[0], intComplex18[0] ],
                                                                                    [intKimArray[1], intNK600Array[1], intStp13mArray[1], intComplex4[1], intComplex5[1], intComplex6[1], intComplex7[1], intComplex8[1], intComplex9[1], intComplex10[1], intComplex11[1], intComplex12[1], intComplex13[1], intComplex14[1], intComplex15[1], intComplex16[1], intComplex17[1], intComplex18[1] ],
                                                                                    [intKimArray[2], intNK600Array[2], intStp13mArray[2], intComplex4[2], intComplex5[2], intComplex6[2], intComplex7[2], intComplex8[2], intComplex9[2], intComplex10[2], intComplex11[2], intComplex12[2], intComplex13[2], intComplex14[2], intComplex15[2], intComplex16[2], intComplex17[2], intComplex18[2] ],
                                                                                    [intKimArray[3], intNK600Array[3], intStp13mArray[3], intComplex4[3], intComplex5[3], intComplex6[3], intComplex7[3], intComplex8[3], intComplex9[3], intComplex10[3], intComplex11[3], intComplex12[3], intComplex13[3], intComplex14[3], intComplex15[3], intComplex16[3], intComplex17[3], intComplex18[3] ],
                                                                                    [intKimArray[4], intNK600Array[4], intStp13mArray[4], intComplex4[4], intComplex5[4], intComplex6[4], intComplex7[4], intComplex8[4], intComplex9[4], intComplex10[4], intComplex11[4], intComplex12[4], intComplex13[4], intComplex14[4], intComplex15[4], intComplex16[4], intComplex17[4], intComplex18[4] ],
                                                                                    'Нагрузка')

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
                                                                                let kolComplex13 = kolOperations(value12.workArray)
                                                                                let kolComplex14 = kolOperations(value13.workArray)
                                                                                let kolComplex15 = kolOperations(value14.workArray)
                                                                                let kolComplex16 = kolOperations(value15.workArray)
                                                                                let kolComplex17 = kolOperations(value16.workArray)
                                                                                let kolComplex18 = kolOperations(value17.workArray)

                                                                                highChartCountOperations(complexName, [kolKim[0], kolNK600[0], kolStp13m[0], kolComplex4[0], kolComplex5[0], kolComplex6[0], kolComplex7[0], kolComplex8[0], kolComplex9[0], kolComplex10[0], kolComplex11[0], kolComplex12[0], kolComplex13[0], kolComplex14[0], kolComplex15[0], kolComplex16[0], kolComplex17[0], kolComplex18[0]],
                                                                                    [kolKim[1], kolNK600[1], kolStp13m[1], kolComplex4[1], kolComplex5[1], kolComplex6[1], kolComplex7[1], kolComplex8[1], kolComplex9[1], kolComplex10[1], kolComplex11[1], kolComplex12[1], kolComplex13[1], kolComplex14[1], kolComplex15[1], kolComplex16[1], kolComplex17[1], kolComplex18[1]])

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

            <ComplexSutkiAllInfo complexName={complexName[0]} complexImg={complexImg[0]} complexMesto={buttonsVrs1} size={"2ploshadka"} idContainer = {1}/>
            <ComplexSutkiAllInfo complexName={complexName[1]} complexImg={complexImg[1]} complexMesto={buttonsVrs2} size={"2ploshadka"} idContainer = {2}/>
            <ComplexSutkiAllInfo complexName={complexName[2]} complexImg={complexImg[2]} complexMesto={buttonsVrs3} size={"2ploshadka"} idContainer = {3}/>
            <ComplexSutkiAllInfo complexName={complexName[3]} complexImg={complexImg[3]} complexMesto={buttonsVrs4} size={"2ploshadka"} idContainer = {4}/>
            <ComplexSutkiAllInfo complexName={complexName[4]} complexImg={complexImg[4]} complexMesto={buttonsVrs5} size={"2ploshadka"} idContainer = {5}/>
            <ComplexSutkiAllInfo complexName={complexName[5]} complexImg={complexImg[5]} complexMesto={buttonsVrs6} size={"2ploshadka"} idContainer = {6}/>
            <ComplexSutkiAllInfo complexName={complexName[6]} complexImg={complexImg[6]} complexMesto={buttonsVrs7} size={"2ploshadka"} idContainer = {7}/>
            <ComplexSutkiAllInfo complexName={complexName[7]} complexImg={complexImg[7]} complexMesto={buttonsVrs8} size={"2ploshadka"} idContainer = {8} alarm={complexName[7]}/>
            <ComplexSutkiAllInfo complexName={complexName[8]} complexImg={complexImg[8]} complexMesto={buttonsVrs9} size={"2ploshadka"} idContainer = {9}/>
            <ComplexSutkiAllInfo complexName={complexName[9]} complexImg={complexImg[9]} complexMesto={buttonsVrs10} size={"2ploshadka"} idContainer = {10}/>
            <ComplexSutkiAllInfo complexName={complexName[10]} complexImg={complexImg[10]} complexMesto={buttonsVrs11} size={"2ploshadka"} idContainer = {11}/>
            <ComplexSutkiAllInfo complexName={complexName[11]} complexImg={complexImg[11]} complexMesto={buttonsVrs12} size={"2ploshadka"} idContainer = {12}/>
            <ComplexSutkiAllInfo complexName={complexName[12]} complexImg={complexImg[12]} complexMesto={buttonsVrs13} size={"2ploshadka"} idContainer = {13}/>
            <ComplexSutkiAllInfo complexName={complexName[13]} complexImg={complexImg[13]} complexMesto={buttonsVrs14} size={"2ploshadka"} idContainer = {14}/>
            <ComplexSutkiAllInfo complexName={complexName[14]} complexImg={complexImg[14]} complexMesto={buttonsVrs15} size={"2ploshadka"} idContainer = {15}/>
            <ComplexSutkiAllInfo complexName={complexName[15]} complexImg={complexImg[15]} complexMesto={buttonsVrs16} size={"2ploshadka"} idContainer = {16}/>
            <ComplexSutkiAllInfo complexName={complexName[16]} complexImg={complexImg[16]} complexMesto={buttonsVrs17} size={"2ploshadka"} idContainer = {17}/>
            <ComplexSutkiAllInfo complexName={complexName[17]} complexImg={complexImg[17]} complexMesto={buttonsVrs18} size={"2ploshadka"} idContainer = {18}/>

        </div>
    )

}

function Meh2() {

    return (
        <div>

            <MenuStanki menuSelected="meh2"/>

            <MenuOtchet select="sutki" page='meh2'/>

            <Meh2Info/>

        </div>
    )
}