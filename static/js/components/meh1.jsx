function Meh1Info() {

    let complexName = ["УВФ-1 #1", "УВФ-1 #2", "NTX1000", "NLX3000", "GAMMA2000", "CTX650", "DMF260", "DMU50 #1", "DMU50 #2", "DMC1035", "CTX310 #1", "CTX510 #1"]
    let complexImg = ["../images/uvf_1_2.png", "../images/uvf_1_2.png", "../images/ntx1000.png", "../images/NLX3000.png", "../images/gamma2000.png", "../images/dmg_ctx650.png",
        "../images/dmg_dmf260.png", "../images/dmg_dmu50.png", "../images/dmg_dmu50.png", "../images/dmg_dmc1035.png", "../images/dmg_ctx310.png", "../images/dmg_ctx510.png"]

    let buttonsVrs1 = [-80, 608, 'url("../images/nasos.png") 0% 0% / 60px no-repeat', "../images/1_ploshadka_outside.png", 60, "unset"]
    let buttonsVrs2 = [-1000, 308, 'url("../images/nasos.png") 0% 0% / 60px no-repeat', "../images/2_ploshadka_outside.png", 60, "unset"]
    let buttonsVrs3 = [-1000, 308, 'url("../images/nasos.png") 0% 0% / 60px no-repeat', "../images/2_ploshadka_outside.png", 60, "unset"]
    let buttonsVrs4 = [-1000, 308, 'url("../images/nasos.png") 0% 0% / 60px no-repeat', "../images/2_ploshadka_outside.png", 60, "unset"]
    let buttonsVrs5 = [-1000, 308, 'url("../images/nasos.png") 0% 0% / 60px no-repeat', "../images/2_ploshadka_outside.png", 60, "unset"]
    let buttonsVrs6 = [-1000, 308, 'url("../images/nasos.png") 0% 0% / 60px no-repeat', "../images/2_ploshadka_outside.png", 60, "unset"]
    let buttonsVrs7 = [-1000, 308, 'url("../images/nasos.png") 0% 0% / 60px no-repeat', "../images/2_ploshadka_outside.png", 60, "unset"]
    let buttonsVrs8 = [-1000, 308, 'url("../images/nasos.png") 0% 0% / 60px no-repeat', "../images/2_ploshadka_outside.png", 60, "unset"]
    let buttonsVrs9 = [-1000, 308, 'url("../images/nasos.png") 0% 0% / 60px no-repeat', "../images/2_ploshadka_outside.png", 60, "unset"]
    let buttonsVrs10 = [-1000, 308, 'url("../images/nasos.png") 0% 0% / 60px no-repeat', "../images/2_ploshadka_outside.png", 60, "unset"]
    let buttonsVrs11 = [-1000, 308, 'url("../images/nasos.png") 0% 0% / 60px no-repeat', "../images/2_ploshadka_outside.png", 60, "unset"]
    let buttonsVrs12 = [-1000, 308, 'url("../images/nasos.png") 0% 0% / 60px no-repeat', "../images/2_ploshadka_outside.png", 60, "unset"]

    let [kimData, setKimData] = useState({
        workArray: [],
        pauseArray: [],
        offArray: [],
        avarArray: [],
        ruchnoyArray: [],
        roundArray: []
    });

    let [nk600Data, setNk600Data] = useState({
        workArray: [],
        pauseArray: [],
        offArray: [],
        avarArray: [],
        ruchnoyArray: [],
        roundArray: []
    });

    let [stp13m, setStp13m] = useState({
        workArray: [],
        pauseArray: [],
        offArray: [],
        avarArray: [],
        ruchnoyArray: [],
        roundArray: []
    });

    let [rtk12c, setRtk12c] = useState({
        workArray: [],
        pauseArray: [],
        offArray: [],
        avarArray: [],
        ruchnoyArray: [],
        roundArray: []
    });

    let [p250, setP250] = useState({
        workArray: [],
        pauseArray: [],
        offArray: [],
        avarArray: [],
        ruchnoyArray: [],
        roundArray: []
    });

    let [krot, setKrot] = useState({
        workArray: [],
        pauseArray: [],
        offArray: [],
        avarArray: [],
        ruchnoyArray: [],
        roundArray: []
    });

    let [prans, setPrans] = useState({
        workArray: [],
        pauseArray: [],
        offArray: [],
        avarArray: [],
        ruchnoyArray: [],
        roundArray: []
    });

    let [complex8, setComplex8] = useState({
        workArray: [],
        pauseArray: [],
        offArray: [],
        avarArray: [],
        ruchnoyArray: [],
        roundArray: []
    });

    let [complex9, setComplex9] = useState({
        workArray: [],
        pauseArray: [],
        offArray: [],
        avarArray: [],
        ruchnoyArray: [],
        roundArray: []
    });

    let [complex10, setComplex10] = useState({
        workArray: [],
        pauseArray: [],
        offArray: [],
        avarArray: [],
        ruchnoyArray: [],
        roundArray: []
    });

    let [complex11, setComplex11] = useState({
        workArray: [],
        pauseArray: [],
        offArray: [],
        avarArray: [],
        ruchnoyArray: [],
        roundArray: []
    });

    let [complex12, setComplex12] = useState({
        workArray: [],
        pauseArray: [],
        offArray: [],
        avarArray: [],
        ruchnoyArray: [],
        roundArray: []
    });


    let [date, setDate] = useState(0);

    useEffect(() => {
        let dateNow = new Date()
        let dayNow = dateNow.getDate()
        let monthNow = dateNow.getMonth() + 1
        let yearNow = dateNow.getFullYear()
        if (dayNow < 10) {
            dayNow = "0" + dayNow
        }
        if (monthNow < 10) {
            monthNow = "0" + monthNow
        }
        setDate(`${yearNow}-${monthNow}-${dayNow}`)


        let roundKim = fetchRequest(`${yearNow}-${monthNow}-${dayNow}`, kimData, 'uvf_1', 1)
        let roundNK600 = fetchRequest(`${yearNow}-${monthNow}-${dayNow}`, nk600Data, 'uvf_2', 2)
        let roundStp13m = fetchRequest(`${yearNow}-${monthNow}-${dayNow}`, stp13m, 'ntx1000', 3)
        let roundRtc12c = fetchRequest(`${yearNow}-${monthNow}-${dayNow}`, rtk12c, 'nlx3000', 4)
        let roundP250 = fetchRequest(`${yearNow}-${monthNow}-${dayNow}`, p250, 'dmg_gamma2000', 5)
        let roundKrot = fetchRequest(`${yearNow}-${monthNow}-${dayNow}`, krot, 'dmg_ctx650', 6)
        let roundPrans = fetchRequest(`${yearNow}-${monthNow}-${dayNow}`, prans, 'dmg_dmf260', 7)
        let roundComplex8 = fetchRequest(`${yearNow}-${monthNow}-${dayNow}`, complex8, 'dmg_dmu50_1', 8)
        let roundComplex9 = fetchRequest(`${yearNow}-${monthNow}-${dayNow}`, complex9, 'dmg_dmu50_2', 9)
        let roundComplex10 = fetchRequest(`${yearNow}-${monthNow}-${dayNow}`, complex10, 'dmg_dmc1035', 10)
        let roundComplex11 = fetchRequest(`${yearNow}-${monthNow}-${dayNow}`, complex11, 'dmg_ctx310_1', 11)
        let roundComplex12 = fetchRequest(`${yearNow}-${monthNow}-${dayNow}`, complex12, 'dmg_ctx510_1', 12)


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
                                                            'ручной')

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

    }, [])

    function newDate(dateInput) {
        setDate(dateInput)
        console.log(dateInput)

        let roundKim = fetchRequest(`${dateInput}`, kimData, 'uvf_1', 1)
        let roundNK600 = fetchRequest(`${dateInput}`, nk600Data, 'uvf_2', 2)
        let roundStp13m = fetchRequest(`${dateInput}`, stp13m, 'ntx1000', 3)
        let roundRtc12c = fetchRequest(`${dateInput}`, rtk12c, 'nlx3000', 4)
        let roundP250 = fetchRequest(`${dateInput}`, p250, 'dmg_gamma2000', 5)
        let roundKrot = fetchRequest(`${dateInput}`, krot, 'dmg_ctx650', 6)
        let roundPrans = fetchRequest(`${dateInput}`, prans, 'dmg_dmf260', 7)
        let roundComplex8 = fetchRequest(`${dateInput}`, complex8, 'dmg_dmu50_1', 8)
        let roundComplex9 = fetchRequest(`${dateInput}`, complex9, 'dmg_dmu50_2', 9)
        let roundComplex10 = fetchRequest(`${dateInput}`, complex10, 'dmg_dmc1035', 10)
        let roundComplex11 = fetchRequest(`${dateInput}`, complex11, 'dmg_ctx310_1', 11)
        let roundComplex12 = fetchRequest(`${dateInput}`, complex12, 'dmg_ctx510_1', 12)


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
                                                            'ручной')

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

    function fetchRequest(dateCalendar, complexObject, complexName, idContainer) {
        return fetch(`/api/complexData/${complexName}_days_date:${dateCalendar}`, {method: 'GET'})
            .then((response) => response.json())
            .then((data) => {
                complexObject.workArray = data.work
                complexObject.pauseArray = data.pause
                complexObject.offArray = data.off
                complexObject.avarArray = data.avar
                complexObject.ruchnoyArray = data.nagruzka
                complexObject.roundArray = data.roundData

                setKimData({...complexObject});
                let convertDataWork = pars(complexObject.workArray, 0, dateCalendar)
                let convertDataPause = pars(complexObject.pauseArray, 1, dateCalendar)
                let convertDataOff = pars(complexObject.offArray, 2, dateCalendar)
                let convertDataAvar = pars(complexObject.avarArray, 3, dateCalendar)
                let convertDataRuchnoi = pars(complexObject.ruchnoyArray, 4, dateCalendar)
                highChartSutkiLine(convertDataWork, convertDataPause, convertDataOff, convertDataAvar, convertDataRuchnoi, idContainer)

                let workRound = parseInt(complexObject.roundArray[0]);
                let passRound = parseInt(complexObject.roundArray[1]);
                let offRound = parseInt(complexObject.roundArray[2]);
                let avarRound = parseInt(complexObject.roundArray[3]);
                let nagruzkaRound = parseInt(complexObject.roundArray[4]);
                highChartSutkiRound(workRound, passRound, offRound, avarRound, nagruzkaRound, 'Нагрузка', idContainer)

                return complexObject
            })
    }

    function pars(arrayParse, y, date, arrayName = null) {

        arrayParse = addLastTime(arrayParse, date)

        var index_pars = 0; // Индекс по одному из циклов
        var arraySave = [] // Массив, который будет заполняться

        // Определение длины цикла. Длина парсящего массива делить на 2 - 2. 300 = 148
        var lengh = arrayParse.length
        if (lengh <= 1) {
            return
        }

        if (lengh >= 4) {
            if (lengh % 2 == 1) lengh -= 1
            lengh = (lengh - lengh % 2) / 2
        } else lengh = 1

        // Если имя программы не передано в функцию, то массив формируется без нее
        if (arrayName == null) {
            while (index_pars < lengh) {   // Парсинг
                arraySave.push({
                    x: (new Date(arrayParse[index_pars * 2])).getTime(),
                    x2: (new Date(arrayParse[index_pars * 2 + 1])).getTime(),
                    y: y
                })
                index_pars += 1;
            }
        }
        // Иначе в массив парсится переданный массив с именем программы
        else {
            while (index_pars < lengh) {   // Парсинг
                arraySave.push({
                    x: (new Date(arrayParse[index_pars * 2])).getTime(),
                    x2: (new Date(arrayParse[index_pars * 2 + 1])).getTime(),
                    y: y,
                    programname: arrayName[index_pars]
                })
                index_pars += 1;
            }
        }
        // Функция возвращает массив коллекциями, содержащими 2 или 3 объекта.
        arraySave = addLastTime(arraySave, date)

        return arraySave
    }

    function addLastTime(stanok, calendarDate) {

        let time = new Date(new Date().toString().split('GMT')[0] + ' UTC').toISOString();
        time = time.slice(0, 10) + " " + time.slice(11, 19);

        if (stanok.length % 2 == 1) {
            if (calendarDate == time.slice(0, 10)) {   // То добавить во вторую смену текущее время
                stanok.push(calendarDate + " " + time.slice(11, 19))
            } else {
                stanok.push(calendarDate + ' 23:59:59')
            }
        }

        return stanok
    }

    // Функция вычисляет количества операций, аргумент массив работы
    function kolOperations(arrayWork) {

        let index_pars = 0; // Индекс по одному из циклов
        let array_kol_op = [0, 0];

        // Определение длины цикла. Длина парсящего массива делить на 2 - 2. 300 = 148
        let lengh = arrayWork.length
        if (lengh <= 1) {
            return [0, 0]
        }

        if (lengh >= 4) {
            if (lengh % 2 == 1) lengh -= 1
            lengh = (lengh - lengh % 2) / 2
        } else lengh = 1

        while (index_pars < lengh) {   // Условие обычной операции
            if (new Date(arrayWork[index_pars * 2]).getTime() !== (new Date(arrayWork[index_pars * 2 + 1])).getTime()) {
                array_kol_op[0] += 1;
            }

            // Условие обычной больше 180 секунд(3 минуты)
            if ((new Date(arrayWork[index_pars * 2 + 1])).getTime() - (new Date(arrayWork[index_pars * 2])).getTime() > 180000) {
                array_kol_op[1] += 1;
            }

            index_pars += 1;
        }
        return [array_kol_op[0], array_kol_op[1]];
    }

    return (
        <div>

            <DayCalendar newDate={newDate} date={date}/>

            <div className='complexAllInfo'>
                <div className='totalRound' id="containerTotal"></div>

                <div className='countOperations' id='containerOperations'></div>

            </div>

            <div className='complexAllInfo' id={'containerTotal'}>
                <ComplexInfo complexName={complexName[0]} complexImg={complexImg[0]} complexMesto={buttonsVrs1}/>
                <div className="lineSukiHighChart" id="containerLine1"></div>
                <div className="roundSukiHighChart" id="containerRound1"></div>
            </div>

            <div className='complexAllInfo'>
                <ComplexInfo complexName={complexName[1]} complexImg={complexImg[1]} complexMesto={buttonsVrs2}/>
                <div className="lineSukiHighChart" id="containerLine2"></div>
                <div className="roundSukiHighChart" id="containerRound2"></div>
            </div>

            <div className='complexAllInfo'>
                <ComplexInfo complexName={complexName[2]} complexImg={complexImg[2]} complexMesto={buttonsVrs3}/>
                <div className="lineSukiHighChart" id="containerLine3"></div>
                <div className="roundSukiHighChart" id="containerRound3"></div>
            </div>

            <div className='complexAllInfo'>
                <ComplexInfo complexName={complexName[3]} complexImg={complexImg[3]} complexMesto={buttonsVrs4}/>
                <div className="lineSukiHighChart" id="containerLine4"></div>
                <div className="roundSukiHighChart" id="containerRound4"></div>
            </div>

            <div className='complexAllInfo'>
                <ComplexInfo complexName={complexName[4]} complexImg={complexImg[4]} complexMesto={buttonsVrs5}/>
                <div className="lineSukiHighChart" id="containerLine5"></div>
                <div className="roundSukiHighChart" id="containerRound5"></div>
            </div>

            <div className='complexAllInfo'>
                <ComplexInfo complexName={complexName[5]} complexImg={complexImg[5]} complexMesto={buttonsVrs6}/>
                <div className="lineSukiHighChart" id="containerLine6"></div>
                <div className="roundSukiHighChart" id="containerRound6"></div>
            </div>

            <div className='complexAllInfo'>
                <ComplexInfo complexName={complexName[6]} complexImg={complexImg[6]} complexMesto={buttonsVrs7}/>
                <div className="lineSukiHighChart" id="containerLine7"></div>
                <div className="roundSukiHighChart" id="containerRound7"></div>
            </div>

            <div className='complexAllInfo'>
                <ComplexInfo complexName={complexName[7]} complexImg={complexImg[7]} complexMesto={buttonsVrs8}/>
                <div className="lineSukiHighChart" id="containerLine8"></div>
                <div className="roundSukiHighChart" id="containerRound8"></div>
            </div>

            <div className='complexAllInfo'>
                <ComplexInfo complexName={complexName[8]} complexImg={complexImg[8]} complexMesto={buttonsVrs9}/>
                <div className="lineSukiHighChart" id="containerLine9"></div>
                <div className="roundSukiHighChart" id="containerRound9"></div>
            </div>

            <div className='complexAllInfo'>
                <ComplexInfo complexName={complexName[9]} complexImg={complexImg[9]} complexMesto={buttonsVrs10}/>
                <div className="lineSukiHighChart" id="containerLine10"></div>
                <div className="roundSukiHighChart" id="containerRound10"></div>
            </div>

            <div className='complexAllInfo'>
                <ComplexInfo complexName={complexName[10]} complexImg={complexImg[10]} complexMesto={buttonsVrs11}/>
                <div className="lineSukiHighChart" id="containerLine11"></div>
                <div className="roundSukiHighChart" id="containerRound11"></div>
            </div>

            <div className='complexAllInfo'>
                <ComplexInfo complexName={complexName[11]} complexImg={complexImg[11]} complexMesto={buttonsVrs12}/>
                <div className="lineSukiHighChart" id="containerLine12"></div>
                <div className="roundSukiHighChart" id="containerRound12"></div>
            </div>

        </div>
    )

}

function Meh1() {

    return (
        <div>

            <Header/>

            <MenuStanki menuSelected="meh1"/>

            <div className="buttons-otchet">

                <Link to="/stanki/meh1">
                    <div className="menuSelect">СУТОЧНЫЙ ОТЧЕТ</div>
                </Link>

                <Link to="/stanki/meh1Month">
                    <div className="menuNoSelect">МЕСЯЧНЫЙ ОТЧЕТ</div>
                </Link>

            </div>

            <Meh1Info/>

        </div>
    )
}