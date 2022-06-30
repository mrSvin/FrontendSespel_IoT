function Meh2Month() {

    let complexName = ["УФ5220", "СТП Сеспель", "NTX1000 #2", "SK50", "APEC", "DMU50 #3", "DMU50 #4", "CTX310 #2", "CTX510 #2", "CTX510 #3", "CTX310 #3", "CTX510 #4", "CTX510 #5",
        "DMC1035 #2", "DMU50 #5", "DMU50 #6", "DMU50 #7", "AR55"]
    let complexImg = ["../images/UVF_5220.png", "../images/progress.png", "../images/ntx1000.png", "../images/sk50.png", "../images/apec.png", "../images/dmg_dmu50.png",
        "../images/dmg_dmu50.png", "../images/dmg_dmu50.png", "../images/dmg_ctx310.png", "../images/dmg_ctx510.png", "../images/dmg_ctx510.png", "../images/dmg_ctx310.png",
        "../images/dmg_ctx510.png", "../images/dmg_ctx510.png", "../images/dmg_dmc1035.png", "../images/dmg_dmu50.png", "../images/dmg_dmu50.png", "../images/dmg_dmu50.png"]

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
    let buttonsVrs13 = [-1000, 308, 'url("../images/nasos.png") 0% 0% / 60px no-repeat', "../images/2_ploshadka_outside.png", 60, "unset"]
    let buttonsVrs14 = [-1000, 308, 'url("../images/nasos.png") 0% 0% / 60px no-repeat', "../images/2_ploshadka_outside.png", 60, "unset"]
    let buttonsVrs15 = [-1000, 308, 'url("../images/nasos.png") 0% 0% / 60px no-repeat', "../images/2_ploshadka_outside.png", 60, "unset"]
    let buttonsVrs16 = [-1000, 308, 'url("../images/nasos.png") 0% 0% / 60px no-repeat', "../images/2_ploshadka_outside.png", 60, "unset"]
    let buttonsVrs17 = [-1000, 308, 'url("../images/nasos.png") 0% 0% / 60px no-repeat', "../images/2_ploshadka_outside.png", 60, "unset"]
    let buttonsVrs18 = [-1000, 308, 'url("../images/nasos.png") 0% 0% / 60px no-repeat', "../images/2_ploshadka_outside.png", 60, "unset"]

    let [dateMonth, setDateMonth] = useState(0);
    let [stateButtonUpdate, setStateButtonUpdate] = useState([false, "buttonUpdateMonth"])
    let timeout = null;

    useEffect(() => {
        let yearNow = new Date().getFullYear()
        let monthNow = new Date().getMonth() + 1
        if (monthNow < 10) {
            monthNow = '0' + monthNow
        }

        let roundKim = fetchHighCharts('uvf5220', `${yearNow}-${monthNow}`, 1)
        let roundNK600 = fetchHighCharts('progress', `${yearNow}-${monthNow}`, 2)
        let roundStp13m = fetchHighCharts('ntx1000_2', `${yearNow}-${monthNow}`, 3)
        let roundComplex4 = fetchHighCharts('sk50', `${yearNow}-${monthNow}`, 4)
        let roundComplex5 = fetchHighCharts('apec', `${yearNow}-${monthNow}`, 5)
        let roundComplex6 = fetchHighCharts('dmg_dmu50_3', `${yearNow}-${monthNow}`, 6)
        let roundComplex7 = fetchHighCharts('dmg_dmu50_4', `${yearNow}-${monthNow}`, 7)
        let roundComplex8 = fetchHighCharts('dmg_dmu50_1', `${yearNow}-${monthNow}`, 8)
        let roundComplex9 = fetchHighCharts('dmg_ctx310_2', `${yearNow}-${monthNow}`, 9)
        let roundComplex10 = fetchHighCharts('dmg_dmc1035', `${yearNow}-${monthNow}`, 10)
        let roundComplex11 = fetchHighCharts('dmg_ctx510_3', `${yearNow}-${monthNow}`, 11)
        let roundComplex12 = fetchHighCharts('dmg_ctx510_4', `${yearNow}-${monthNow}`, 12)
        let roundComplex13 = fetchHighCharts('dmg_ctx510_5', `${yearNow}-${monthNow}`, 12)
        let roundComplex14 = fetchHighCharts('dmg_dmc1035_2', `${yearNow}-${monthNow}`, 12)
        let roundComplex15 = fetchHighCharts('dmg_dmu50_5', `${yearNow}-${monthNow}`, 12)
        let roundComplex16 = fetchHighCharts('dmg_dmu50_6', `${yearNow}-${monthNow}`, 12)
        let roundComplex17 = fetchHighCharts('dmg_dmu50_7', `${yearNow}-${monthNow}`, 12)
        let roundComplex18 = fetchHighCharts('ar55', `${yearNow}-${monthNow}`, 12)

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

                                                                                let workComplex13Array = averageMonthdata(value12.work.map(Number))
                                                                                let pauseComplex13Array = averageMonthdata(value12.pause.map(Number))
                                                                                let offComplex13Array = averageMonthdata(value12.off.map(Number))
                                                                                let avarComplex13Array = averageMonthdata(value12.avar.map(Number))
                                                                                let nagruzkaComplex13Array = averageMonthdata(value12.nagruzka.map(Number))

                                                                                let workComplex14Array = averageMonthdata(value13.work.map(Number))
                                                                                let pauseComplex14Array = averageMonthdata(value13.pause.map(Number))
                                                                                let offComplex14Array = averageMonthdata(value13.off.map(Number))
                                                                                let avarComplex14Array = averageMonthdata(value13.avar.map(Number))
                                                                                let nagruzkaComplex14Array = averageMonthdata(value13.nagruzka.map(Number))

                                                                                let workComplex15Array = averageMonthdata(value14.work.map(Number))
                                                                                let pauseComplex15Array = averageMonthdata(value14.pause.map(Number))
                                                                                let offComplex15Array = averageMonthdata(value14.off.map(Number))
                                                                                let avarComplex15Array = averageMonthdata(value14.avar.map(Number))
                                                                                let nagruzkaComplex15Array = averageMonthdata(value14.nagruzka.map(Number))

                                                                                let workComplex16Array = averageMonthdata(value15.work.map(Number))
                                                                                let pauseComplex16Array = averageMonthdata(value15.pause.map(Number))
                                                                                let offComplex16Array = averageMonthdata(value15.off.map(Number))
                                                                                let avarComplex16Array = averageMonthdata(value15.avar.map(Number))
                                                                                let nagruzkaComplex16Array = averageMonthdata(value15.nagruzka.map(Number))

                                                                                let workComplex17Array = averageMonthdata(value16.work.map(Number))
                                                                                let pauseComplex17Array = averageMonthdata(value16.pause.map(Number))
                                                                                let offComplex17Array = averageMonthdata(value16.off.map(Number))
                                                                                let avarComplex17Array = averageMonthdata(value16.avar.map(Number))
                                                                                let nagruzkaComplex17Array = averageMonthdata(value16.nagruzka.map(Number))

                                                                                let workComplex18Array = averageMonthdata(value17.work.map(Number))
                                                                                let pauseComplex18Array = averageMonthdata(value17.pause.map(Number))
                                                                                let offComplex18Array = averageMonthdata(value17.off.map(Number))
                                                                                let avarComplex18Array = averageMonthdata(value17.avar.map(Number))
                                                                                let nagruzkaComplex18Array = averageMonthdata(value17.nagruzka.map(Number))


                                                                                highChartTotal(complexName, [workKimArray, workNK600Array, workStp13mArray, workComplex4Array, workComplex5Array, workComplex6Array, workComplex7Array, workComplex8Array, workComplex9Array, workComplex10Array, workComplex11Array, workComplex12Array, workComplex13Array, workComplex14Array, workComplex15Array, workComplex16Array, workComplex16Array, workComplex18Array],
                                                                                    [pauseKimArray, pauseNK600Array, pauseStp13mArray, pauseComplex4Array, pauseComplex5Array, pauseComplex6Array, pauseComplex7Array, pauseComplex8Array, pauseComplex9Array, pauseComplex10Array, pauseComplex11Array, pauseComplex12Array, pauseComplex13Array, pauseComplex14Array, pauseComplex15Array, pauseComplex16Array, pauseComplex17Array, pauseComplex18Array],
                                                                                    [offKimArray, offNK600Array, offStp13mArray, offComplex4Array, offComplex5Array, offComplex6Array, offComplex7Array, offComplex8Array, offComplex9Array, offComplex10Array, offComplex11Array, offComplex12Array, offComplex13Array, offComplex14Array, offComplex15Array, offComplex16Array, offComplex17Array, offComplex18Array],
                                                                                    [avarKimArray, avarNK600Array, avarStp13mArray, avarComplex4Array, avarComplex5Array, avarComplex6Array, avarComplex7Array, avarComplex8Array, avarComplex9Array, avarComplex10Array, avarComplex11Array, avarComplex12Array, avarComplex13Array, avarComplex14Array, avarComplex15Array, avarComplex16Array, avarComplex17Array, avarComplex18Array],
                                                                                    [nagruzkaKimArray, nagruzkaNK600Array, nagruzkaStp13mArray, nagruzkaComplex4Array, nagruzkaComplex5Array, nagruzkaComplex6Array, nagruzkaComplex7Array, nagruzkaComplex8Array, nagruzkaComplex9Array, nagruzkaComplex10Array, nagruzkaComplex11Array, nagruzkaComplex12Array, nagruzkaComplex13Array, nagruzkaComplex14Array, nagruzkaComplex15Array, nagruzkaComplex16Array, nagruzkaComplex17Array, nagruzkaComplex18Array], 'ручной')

                                                                                highChartTotalRound(averageMonthdata([workKimArray, workNK600Array, workStp13mArray, workComplex4Array, workComplex5Array, workComplex6Array, workComplex7Array, workComplex8Array, workComplex9Array, workComplex10Array, workComplex11Array, workComplex12Array, workComplex13Array, workComplex14Array, workComplex15Array, workComplex16Array, workComplex17Array, workComplex18Array]),
                                                                                    averageMonthdata([pauseKimArray, pauseNK600Array, pauseStp13mArray, pauseComplex4Array, pauseComplex5Array, pauseComplex6Array, pauseComplex7Array, pauseComplex8Array, pauseComplex9Array, pauseComplex10Array, pauseComplex11Array, pauseComplex12Array, pauseComplex13Array, pauseComplex14Array, pauseComplex15Array, pauseComplex16Array, pauseComplex17Array, pauseComplex18Array]),
                                                                                    averageMonthdata([offKimArray, offNK600Array, offStp13mArray, offComplex4Array, offComplex5Array, offComplex6Array, offComplex7Array, offComplex8Array, offComplex9Array, offComplex10Array, offComplex11Array, offComplex12Array, offComplex13Array, offComplex14Array, offComplex15Array, offComplex16Array, offComplex17Array, offComplex18Array]),
                                                                                    averageMonthdata([avarKimArray, avarNK600Array, avarStp13mArray, avarComplex4Array, avarComplex5Array, avarComplex6Array, avarComplex7Array, avarComplex8Array, avarComplex9Array, avarComplex10Array, avarComplex11Array, avarComplex12Array, avarComplex13Array, avarComplex14Array, avarComplex15Array, avarComplex16Array, avarComplex17Array, avarComplex18Array]),
                                                                                    averageMonthdata([nagruzkaKimArray, nagruzkaNK600Array, nagruzkaStp13mArray, nagruzkaStp13mArray, nagruzkaComplex4Array, nagruzkaComplex5Array, nagruzkaComplex6Array, nagruzkaComplex7Array, nagruzkaComplex8Array, nagruzkaComplex9Array, nagruzkaComplex10Array, nagruzkaComplex11Array, nagruzkaComplex12Array, nagruzkaComplex13Array, nagruzkaComplex14Array, nagruzkaComplex15Array, nagruzkaComplex16Array, nagruzkaComplex17Array, nagruzkaComplex18Array]), 'Ручной')

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

    }, [])

    function newDate(input) {
        useEffect(() => {
            setDateMonth(input)
        })
    }

    function disabledButton() {
        setStateButtonUpdate([false, "buttonUpdateMonth"])
        clearInterval(timeout)
    }

    function updateData() {
        if (dateMonth != "0") {
            console.log(dateMonth)

            let roundKim = fetchHighCharts('uvf5220', dateMonth, 1)
            let roundNK600 = fetchHighCharts('progress', dateMonth, 2)
            let roundStp13m = fetchHighCharts('ntx1000_2', dateMonth, 3)
            let roundComplex4 = fetchHighCharts('sk50', dateMonth, 4)
            let roundComplex5 = fetchHighCharts('apec', dateMonth, 5)
            let roundComplex6 = fetchHighCharts('dmg_dmu50_3', dateMonth, 6)
            let roundComplex7 = fetchHighCharts('dmg_dmu50_4', dateMonth, 7)
            let roundComplex8 = fetchHighCharts('dmg_dmu50_1', dateMonth, 8)
            let roundComplex9 = fetchHighCharts('dmg_ctx310_2', dateMonth, 9)
            let roundComplex10 = fetchHighCharts('dmg_dmc1035', dateMonth, 10)
            let roundComplex11 = fetchHighCharts('dmg_ctx510_3', dateMonth, 11)
            let roundComplex12 = fetchHighCharts('dmg_ctx510_4', dateMonth, 12)
            let roundComplex13 = fetchHighCharts('dmg_ctx510_5', dateMonth, 12)
            let roundComplex14 = fetchHighCharts('dmg_dmc1035_2', dateMonth, 12)
            let roundComplex15 = fetchHighCharts('dmg_dmu50_5', dateMonth, 12)
            let roundComplex16 = fetchHighCharts('dmg_dmu50_6', dateMonth, 12)
            let roundComplex17 = fetchHighCharts('dmg_dmu50_7', dateMonth, 12)
            let roundComplex18 = fetchHighCharts('ar55', dateMonth, 12)

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

                                                                                    let workComplex13Array = averageMonthdata(value12.work.map(Number))
                                                                                    let pauseComplex13Array = averageMonthdata(value12.pause.map(Number))
                                                                                    let offComplex13Array = averageMonthdata(value12.off.map(Number))
                                                                                    let avarComplex13Array = averageMonthdata(value12.avar.map(Number))
                                                                                    let nagruzkaComplex13Array = averageMonthdata(value12.nagruzka.map(Number))

                                                                                    let workComplex14Array = averageMonthdata(value13.work.map(Number))
                                                                                    let pauseComplex14Array = averageMonthdata(value13.pause.map(Number))
                                                                                    let offComplex14Array = averageMonthdata(value13.off.map(Number))
                                                                                    let avarComplex14Array = averageMonthdata(value13.avar.map(Number))
                                                                                    let nagruzkaComplex14Array = averageMonthdata(value13.nagruzka.map(Number))

                                                                                    let workComplex15Array = averageMonthdata(value14.work.map(Number))
                                                                                    let pauseComplex15Array = averageMonthdata(value14.pause.map(Number))
                                                                                    let offComplex15Array = averageMonthdata(value14.off.map(Number))
                                                                                    let avarComplex15Array = averageMonthdata(value14.avar.map(Number))
                                                                                    let nagruzkaComplex15Array = averageMonthdata(value14.nagruzka.map(Number))

                                                                                    let workComplex16Array = averageMonthdata(value15.work.map(Number))
                                                                                    let pauseComplex16Array = averageMonthdata(value15.pause.map(Number))
                                                                                    let offComplex16Array = averageMonthdata(value15.off.map(Number))
                                                                                    let avarComplex16Array = averageMonthdata(value15.avar.map(Number))
                                                                                    let nagruzkaComplex16Array = averageMonthdata(value15.nagruzka.map(Number))

                                                                                    let workComplex17Array = averageMonthdata(value16.work.map(Number))
                                                                                    let pauseComplex17Array = averageMonthdata(value16.pause.map(Number))
                                                                                    let offComplex17Array = averageMonthdata(value16.off.map(Number))
                                                                                    let avarComplex17Array = averageMonthdata(value16.avar.map(Number))
                                                                                    let nagruzkaComplex17Array = averageMonthdata(value16.nagruzka.map(Number))

                                                                                    let workComplex18Array = averageMonthdata(value17.work.map(Number))
                                                                                    let pauseComplex18Array = averageMonthdata(value17.pause.map(Number))
                                                                                    let offComplex18Array = averageMonthdata(value17.off.map(Number))
                                                                                    let avarComplex18Array = averageMonthdata(value17.avar.map(Number))
                                                                                    let nagruzkaComplex18Array = averageMonthdata(value17.nagruzka.map(Number))


                                                                                    highChartTotal(complexName, [workKimArray, workNK600Array, workStp13mArray, workComplex4Array, workComplex5Array, workComplex6Array, workComplex7Array, workComplex8Array, workComplex9Array, workComplex10Array, workComplex11Array, workComplex12Array, workComplex13Array, workComplex14Array, workComplex15Array, workComplex16Array, workComplex16Array, workComplex18Array],
                                                                                        [pauseKimArray, pauseNK600Array, pauseStp13mArray, pauseComplex4Array, pauseComplex5Array, pauseComplex6Array, pauseComplex7Array, pauseComplex8Array, pauseComplex9Array, pauseComplex10Array, pauseComplex11Array, pauseComplex12Array, pauseComplex13Array, pauseComplex14Array, pauseComplex15Array, pauseComplex16Array, pauseComplex17Array, pauseComplex18Array],
                                                                                        [offKimArray, offNK600Array, offStp13mArray, offComplex4Array, offComplex5Array, offComplex6Array, offComplex7Array, offComplex8Array, offComplex9Array, offComplex10Array, offComplex11Array, offComplex12Array, offComplex13Array, offComplex14Array, offComplex15Array, offComplex16Array, offComplex17Array, offComplex18Array],
                                                                                        [avarKimArray, avarNK600Array, avarStp13mArray, avarComplex4Array, avarComplex5Array, avarComplex6Array, avarComplex7Array, avarComplex8Array, avarComplex9Array, avarComplex10Array, avarComplex11Array, avarComplex12Array, avarComplex13Array, avarComplex14Array, avarComplex15Array, avarComplex16Array, avarComplex17Array, avarComplex18Array],
                                                                                        [nagruzkaKimArray, nagruzkaNK600Array, nagruzkaStp13mArray, nagruzkaComplex4Array, nagruzkaComplex5Array, nagruzkaComplex6Array, nagruzkaComplex7Array, nagruzkaComplex8Array, nagruzkaComplex9Array, nagruzkaComplex10Array, nagruzkaComplex11Array, nagruzkaComplex12Array, nagruzkaComplex13Array, nagruzkaComplex14Array, nagruzkaComplex15Array, nagruzkaComplex16Array, nagruzkaComplex17Array, nagruzkaComplex18Array], 'ручной')

                                                                                    highChartTotalRound(averageMonthdata([workKimArray, workNK600Array, workStp13mArray, workComplex4Array, workComplex5Array, workComplex6Array, workComplex7Array, workComplex8Array, workComplex9Array, workComplex10Array, workComplex11Array, workComplex12Array, workComplex13Array, workComplex14Array, workComplex15Array, workComplex16Array, workComplex17Array, workComplex18Array]),
                                                                                        averageMonthdata([pauseKimArray, pauseNK600Array, pauseStp13mArray, pauseComplex4Array, pauseComplex5Array, pauseComplex6Array, pauseComplex7Array, pauseComplex8Array, pauseComplex9Array, pauseComplex10Array, pauseComplex11Array, pauseComplex12Array, pauseComplex13Array, pauseComplex14Array, pauseComplex15Array, pauseComplex16Array, pauseComplex17Array, pauseComplex18Array]),
                                                                                        averageMonthdata([offKimArray, offNK600Array, offStp13mArray, offComplex4Array, offComplex5Array, offComplex6Array, offComplex7Array, offComplex8Array, offComplex9Array, offComplex10Array, offComplex11Array, offComplex12Array, offComplex13Array, offComplex14Array, offComplex15Array, offComplex16Array, offComplex17Array, offComplex18Array]),
                                                                                        averageMonthdata([avarKimArray, avarNK600Array, avarStp13mArray, avarComplex4Array, avarComplex5Array, avarComplex6Array, avarComplex7Array, avarComplex8Array, avarComplex9Array, avarComplex10Array, avarComplex11Array, avarComplex12Array, avarComplex13Array, avarComplex14Array, avarComplex15Array, avarComplex16Array, avarComplex17Array, avarComplex18Array]),
                                                                                        averageMonthdata([nagruzkaKimArray, nagruzkaNK600Array, nagruzkaStp13mArray, nagruzkaStp13mArray, nagruzkaComplex4Array, nagruzkaComplex5Array, nagruzkaComplex6Array, nagruzkaComplex7Array, nagruzkaComplex8Array, nagruzkaComplex9Array, nagruzkaComplex10Array, nagruzkaComplex11Array, nagruzkaComplex12Array, nagruzkaComplex13Array, nagruzkaComplex14Array, nagruzkaComplex15Array, nagruzkaComplex16Array, nagruzkaComplex17Array, nagruzkaComplex18Array]), 'Ручной')

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

        setStateButtonUpdate([true, "buttonUpdateMonth load"])
        timeout = setTimeout(disabledButton, 1000)

    }

    function fetchHighCharts(complexName, dateInput, idContainer) {
        return fetch(`../api/monthData/${complexName}_month_date:${dateInput}`, {method: 'GET'})
            .then((response) => response.json())
            .then((data) => {
                highChartMonthLine(data.work, data.pause, data.off, data.avar, data.nagruzka, idContainer)
                highChartMonthRound(averageMonthdata(data.work), averageMonthdata(data.pause), averageMonthdata(data.off),
                    averageMonthdata(data.avar), averageMonthdata(data.nagruzka), 'Ручной', idContainer)
                return data
            })
    }


    function averageMonthdata(inputArray) {
        if (inputArray == undefined) {
            return 0
        } else {
            let sum = inputArray.reduce((a, b) => a + b, 0);
            return (sum / inputArray.length) || 0;
        }


    }

    function highChartMonthLine(arrayWork, arrayPass, arrayFail, arrayAvar, arrayNagruzka, idContainer) {
        Highcharts.setOptions({
            lang: {
                loading: 'Загрузка...',
                months: ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'],
                weekdays: ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'],
                shortMonths: ['Янв', 'Фев', 'Март', 'Апр', 'Май', 'Июнь', 'Июль', 'Авг', 'Сент', 'Окт', 'Нояб', 'Дек'],
                exportButtonTitle: "Экспорт",
                printButtonTitle: "Печать",
                rangeSelectorFrom: "С",
                rangeSelectorTo: "По",
                rangeSelectorZoom: "Период",
                downloadPNG: 'Скачать PNG',
                downloadJPEG: 'Скачать JPEG',
                downloadPDF: 'Скачать PDF',
                downloadSVG: 'Скачать SVG',
                printChart: 'Напечатать график',
                viewFullscreen: 'На весь экран'
            },
            plotOptions: {
                xrange: {
                    grouping: false
                }
            },
            global: {
                timezoneOffset: new Date().getTimezoneOffset()
            }
        });

        Highcharts.chart(`containerLine${idContainer}`, {
            chart: {
                type: 'column'
            },
            title: {
                text: 'Загрузка оборудования по дням',
                style: {
                    color: '#FFF'
                }
            },
            xAxis: {
                title: {
                    text: 'Дни месяца',
                    style: {
                        color: '#FFF'
                    },
                    align: 'high'
                },
                labels: {
                    style: {
                        color: '#FFF'
                    }
                },
                categories: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30', '31']
            },
            credits: {
                enabled: false
            },
            yAxis: {
                min: 0,
                title: {
                    text: '%',
                    style: {
                        color: '#FFF'
                    }
                },
                labels: {
                    style: {
                        color: '#FFF'
                    },
                }
            },
            tooltip: {
                pointFormat: '<span style="color:{series.color}">{series.name}</span>: {point.percentage:.1f}%<br/>',
                shared: true
            },
            plotOptions: {
                column: {
                    stacking: 'percent'
                }
            },

            series: [{
                name: 'Авария',
                color: '#e81e1d',
                data: arrayAvar
            }, {
                name: 'Выключен',
                color: '#000000',
                data: arrayFail
            }, {
                name: 'Ожидание',
                color: '#ffea32',
                data: arrayPass
            }, {
                name: 'Ручной',
                color: '#5c7ed0',
                data: arrayNagruzka
            }, {
                name: 'Работа',
                color: '#38e817',
                data: arrayWork
            }],
            legend: {
                itemStyle: {
                    color: '#FFF'
                }
            }
        });
    }

    function highChartMonthRound(work, pass, off, avar, nagruzka, nagruzkaName = 'Нагрузка', idContainer) {
        Highcharts.chart(`containerRound${idContainer}`, {
            chart: {
                plotBackgroundColor: null,
                plotBorderWidth: null,
                plotShadow: false,
                type: 'pie'
            },

            title: {
                text: 'Загрузка оборудования',
                style: {
                    color: '#FFF'
                }
            },
            tooltip: {
                pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
            },

            accessibility: {
                point: {
                    valueSuffix: '%'
                }
            },
            plotOptions: {
                pie: {
                    allowPointSelect: true,
                    cursor: 'pointer',
                    dataLabels: {
                        enabled: false
                    },
                    showInLegend: true
                }
            },
            colors: ['#38e817', '#ffea32', '#000000', '#e81e1d', '#5c7ed0'],
            credits: {
                enabled: false
            },
            legend: {
                itemStyle: {
                    color: '#FFF'
                }
            },
            series: [{
                type: 'pie',
                name: 'Показатель',
                data: [['Работа', work], ['Включен', pass], ['Выключен', off], ['В аварии', avar], [nagruzkaName, nagruzka]]
            }]
        });
    }

    function highChartTotal(generalDiagramNames, work, pause, off, avar, nagruzka) {

        Highcharts.chart('containerTotal', {
            chart: {
                type: 'column'
            },
            title: {
                text: 'Общая загрузка оборудования',
                style: {
                    color: '#FFF'
                }
            },
            xAxis: {
                labels: {
                    style: {
                        fontSize: '18px',
                        color: '#FFF'
                    }
                },
                categories: generalDiagramNames,
            },
            credits: {
                enabled: false
            },
            yAxis: {
                min: 0,
                title: {
                    text: '%'
                },
                labels: {
                    style: {
                        color: '#FFF'
                    },
                }
            },
            tooltip: {
                pointFormat: '<span style="color:{series.color}">{series.name}</span>: {point.percentage:.1f}%<br/>',
                shared: true
            },
            plotOptions: {
                column: {
                    stacking: 'percent'
                }
            },
            legend: {
                itemStyle: {
                    color: '#FFF'
                }
            },
            series: [{
                name: 'Авария',
                data: avar,
                color: '#e81e1d'
            }, {
                name: 'Выключен',
                data: off,
                color: '#000000'
            }, {
                name: 'Ручной',
                data: nagruzka,
                color: '#5c7ed0'
            }, {
                name: 'Ожидание',
                color: '#ffea32',
                data: pause
            }, {
                name: 'Работа',
                color: '#38e817',
                data: work,

            },]
        });

    }

    function highChartTotalRound(work, pass, off, avar, nagruzka, nagruzkaName = 'Нагрузка') {
        Highcharts.chart(`containerRoundTotal`, {
            chart: {
                plotBackgroundColor: null,
                plotBorderWidth: null,
                plotShadow: false,
                type: 'pie'
            },

            title: {
                text: 'Суммарная загрузка оборудования',
                style: {
                    color: '#FFF'
                }
            },
            tooltip: {
                pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
            },

            accessibility: {
                point: {
                    valueSuffix: '%'
                }
            },
            plotOptions: {
                pie: {
                    allowPointSelect: true,
                    cursor: 'pointer',
                    dataLabels: {
                        enabled: false
                    },
                    showInLegend: true
                }
            },
            colors: ['#38e817', '#ffea32', '#000000', '#e81e1d', '#5c7ed0'],
            credits: {
                enabled: false
            },
            legend: {
                itemStyle: {
                    color: '#FFF'
                }
            },
            series: [{
                type: 'pie',
                name: 'Показатель',
                data: [['Работа', work], ['Включен', pass], ['Выключен', off], ['В аварии', avar], [nagruzkaName, nagruzka]]
            }]
        });
    }


    return (
        <div>

            <Header/>

            <MenuStanki menuSelected="meh2"/>

            <div className="buttons-otchet">

                <Link to="/stanki/meh2">
                    <div className="menuNoSelect">СУТОЧНЫЙ ОТЧЕТ</div>
                </Link>

                <Link to="/stanki/meh2Month">
                    <div className="menuSelect">МЕСЯЧНЫЙ ОТЧЕТ</div>
                </Link>

            </div>

            <MonthCalendar newDate={newDate} updateData={updateData} stateButtonUpdate={stateButtonUpdate}/>

            <div className='complexAllInfo'>
                <div className='totalRound' id="containerTotal"></div>
                <div className="totalRound" id="containerRoundTotal"></div>
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

            <div className='complexAllInfo'>
                <ComplexInfo complexName={complexName[12]} complexImg={complexImg[12]} complexMesto={buttonsVrs13}/>
                <div className="lineSukiHighChart" id="containerLine13"></div>
                <div className="roundSukiHighChart" id="containerRound13"></div>
            </div>

            <div className='complexAllInfo'>
                <ComplexInfo complexName={complexName[13]} complexImg={complexImg[13]} complexMesto={buttonsVrs14}/>
                <div className="lineSukiHighChart" id="containerLine14"></div>
                <div className="roundSukiHighChart" id="containerRound14"></div>
            </div>

            <div className='complexAllInfo'>
                <ComplexInfo complexName={complexName[14]} complexImg={complexImg[14]} complexMesto={buttonsVrs15}/>
                <div className="lineSukiHighChart" id="containerLine15"></div>
                <div className="roundSukiHighChart" id="containerRound15"></div>
            </div>

            <div className='complexAllInfo'>
                <ComplexInfo complexName={complexName[15]} complexImg={complexImg[15]} complexMesto={buttonsVrs16}/>
                <div className="lineSukiHighChart" id="containerLine16"></div>
                <div className="roundSukiHighChart" id="containerRound16"></div>
            </div>

            <div className='complexAllInfo'>
                <ComplexInfo complexName={complexName[16]} complexImg={complexImg[16]} complexMesto={buttonsVrs17}/>
                <div className="lineSukiHighChart" id="containerLine17"></div>
                <div className="roundSukiHighChart" id="containerRound17"></div>
            </div>

            <div className='complexAllInfo'>
                <ComplexInfo complexName={complexName[17]} complexImg={complexImg[17]} complexMesto={buttonsVrs18}/>
                <div className="lineSukiHighChart" id="containerLine18"></div>
                <div className="roundSukiHighChart" id="containerRound18"></div>
            </div>

        </div>
    )
}