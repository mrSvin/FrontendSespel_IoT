function PrintEnergy() {

    useEffect(() => {

        let objectImg = {
            'apec':'apec.png', 'ar55':'ar55.png', 'crysta-apex':'crystal_apex.png',
            '?***?':'dmf.png', 'ctx310':'dmg_ctx310.png', 'ctx510':'dmg_ctx510.png',
            'ctx650':'dmg_ctx650.png', 'dmc1035':'dmg_dmc1035.png', 'dmf260':'dmg_dmf260.png',
            'dmu50':'dmg_dmu50.png', 'эпп':'epp.png', 'faccin 4':'faccin.png',
            'faccin 10':'faccin_2.png', 'gamma2000':'gamma2000.png', 'комета':'kometa.png',
            'навигатор':'navigator.png', 'нк600':'nk600.png', 'nlx3000':'NLX3000.png',
            'ntx1000':'ntx1000.png', 'печь':'pech.png', 'пресс':'press.png',
            'стп':'progress.png', 'макс':'robot.png', 'м710':'robot.png',
            'ртк12c':'robot.png', 'крот':'robot.png', 'пранс':'robot.png',
            'p250':'robot_p250.png', 'sk50':'sk50.png', 'склад':'sklad.png',
            'стп13м':'stp13m.png', 'trulaser':'trulaser.png',
            'увф-1':'uvf_1_2.png', 'уф5220':'UVF_5220.png', 'врс1':'nasos.png',
            'врс2':'nasos_vrs2.png', 'котельная': 'gazStation.png','ктп400':'electroStation.png',
            'ктп630':'electroStation.png','ктп2500':'electroStation.png','ктп400':'electroStation.png',
        }
        let nameToFetch = parseNameUrl(document.location.pathname);

    }, [])

    return (
        <div>
            <h1>Версия для печати</h1>
         </div>
    )
}