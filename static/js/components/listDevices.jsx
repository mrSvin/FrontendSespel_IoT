function ListDevicesCategory({
                                 date, values, setValuesState, complexName, newDate, selectedCategory,
                                 setSelectedCategory, selectedObjects, setSelectedObjects
                             }) {

    function changeMainList(mainList, selectedObjects) {
        let index = 0
        for (let i = 0; i < mainList.length; i++) {
            for (let j = 0; j < mainList[i][1]; j++) {
                selectedObjects[index] = mainList[i][0]
                index++
            }
        }
    }

    const [isActive, setActive] = useState(false);

    const [listChanged, setListChanged] = useState(false)

    const toggleClass = () => {
        setActive(!isActive);
        if (listChanged) {
            newDate(date)
            setListChanged(false)
        }
    };

    const innerRef = useOuterClick(ev => {
        if (isActive) {
            setActive(!isActive);
            if (listChanged) {
                newDate(date)
                setListChanged(false)
            }

        }
    });

    const handleOnChangeCategory = (position) => {
        const updatedCheckedState = selectedCategory.map((item, index) => {
            return index === position ? !item : item;
        });

        window.localStorage['selectedCategory'] = updatedCheckedState
        setSelectedCategory(updatedCheckedState)

        let mainList = complexName.map((e, i) => {
            return [updatedCheckedState[i], e.length - 1]
        })

        changeMainList(mainList, selectedObjects)

        const activeValues = []
        selectedObjects.forEach(
            (currentState, index) => {
                if (currentState) {
                    activeValues.push(index);
                }
            }
        );

        window.localStorage['selectedObjects'] = selectedObjects
        setValuesState(activeValues);
    };
    const handleOnChange = (position) => {
        const updatedCheckedState = selectedObjects.map((item, index) => {
            return index === position ? !item : item;
        });

        // console.log('Внутри update', updatedCheckedState)

        window.localStorage['selectedObjects'] = updatedCheckedState
        setSelectedObjects(updatedCheckedState)

        const activeValues = []
        updatedCheckedState.forEach(
            (currentState, index) => {
                if (currentState) {
                    activeValues.push(values[index]);
                }
            }
        );

        setValuesState(activeValues);

    };

    let keyIndex = 0

    return (
        <div
            ref={innerRef}
            className='selectDevice'>
            <span onClick={toggleClass}>Выбор оборудования</span>
            <div className="listComplex">
                <span>▼</span>
                <div
                    className={isActive ? 'containerStanokList' : 'containerStanokList containerStanokListHidden'}>
                    <ul className='toppings-list'
                        className={isActive ? 'toppings-list toppings-list-visible' : 'toppings-list'}>

                        {complexName.map((razdel, index) => {
                            let copy = razdel.slice(1)

                            let paddingNow = {
                                paddingBottom: 30 * copy.length + 6
                            };

                            return (
                                <li key={index}>
                                    <div className="toppings-list-item">
                                        <div className="left-section">
                                            <input
                                                type="checkbox"
                                                id={`custom-checkbox-category-${index}`}
                                                name={razdel[0]}
                                                value={index}
                                                checked={selectedCategory[index]}
                                                onChange={() => {
                                                    handleOnChangeCategory(index)
                                                    setListChanged(true)
                                                }
                                                }
                                            />
                                            <label style={paddingNow}
                                                   htmlFor={`custom-checkbox-category-${index}`}></label><span
                                            className='spanList spanListCategory'>{razdel[0]}</span>
                                        </div>
                                    </div>
                                    <ul>
                                        {copy.map((stanok, i) => {
                                            let saveIndex = keyIndex++
                                            return (
                                                <li key={saveIndex} className='individualLi'>
                                                    <div className="toppings-list-item">
                                                        <div className="left-section">
                                                            <input
                                                                type="checkbox"
                                                                id={`custom-checkbox-${saveIndex}`}
                                                                name={stanok[0]}
                                                                value={`${saveIndex}`}
                                                                checked={selectedObjects[saveIndex]}
                                                                onChange={() => {
                                                                    handleOnChange(saveIndex)
                                                                    setListChanged(true)
                                                                }}
                                                            />
                                                            <label
                                                                htmlFor={`custom-checkbox-${saveIndex}`}></label><span
                                                            className='spanList'>{stanok[0]}</span>
                                                        </div>
                                                    </div>
                                                </li>
                                            )
                                        })}
                                    </ul>
                                </li>
                            );

                        })}
                    </ul>
                </div>
            </div>
        </div>
    )
}

function ListDevices({
                         date, values, setValuesState,
                         complexName, complexRequest, newDate
                     }) {

    const [isActive, setActive] = useState(false);

    // Состояния чекбоксов станков
    let [selectedObjects, setSelectedObjects] = useState(
        new Array(complexRequest.length).fill(true)
    );

    const [listChanged, setListChanged] = useState(false)

    const toggleClass = () => {
        setActive(!isActive);
        if (listChanged) {
            newDate(date)
            setListChanged(false)
        }
    };

    const innerRef = useOuterClick(ev => {
        if (isActive) {
            setActive(!isActive);
            if (listChanged) {
                newDate(date)
                setListChanged(false)
            }
        }
    });

    const handleOnChange = (position) => {
        const updatedCheckedState = selectedObjects.map((item, index) => {
            return index === position ? !item : item;
        });

        setSelectedObjects(updatedCheckedState)

        const activeValues = []
        updatedCheckedState.forEach(
            (currentState, index) => {
                if (currentState) {
                    activeValues.push(values[index]);
                }
            }
        );
        setValuesState(activeValues);

    };


    return (
        <div
            ref={innerRef}
            className='selectDevice'>
            <span onClick={toggleClass}>Выбор оборудования</span>
            <div className="listComplex">
                <span>▼</span>
                <div
                    className={isActive ? 'containerStanokList' : 'containerStanokList containerStanokListHidden'}>
                    <ul className='toppings-list'
                        className={isActive ? 'toppings-list toppings-list-visible' : 'toppings-list'}>
                        {complexName.map((name, index) => {
                            return (
                                <li key={index}>
                                    <div className="toppings-list-item">
                                        <div className="left-section">
                                            <input
                                                type="checkbox"
                                                id={`custom-checkbox-${index}`}
                                                name={name[0]}
                                                value={index}
                                                checked={selectedObjects[index]}
                                                onChange={() => {
                                                    handleOnChange(index)
                                                    setListChanged(true)
                                                }}
                                            />
                                            <label htmlFor={`custom-checkbox-${index}`}></label><span
                                            className='spanList'>{name[0]}</span>
                                        </div>
                                    </div>
                                </li>
                            );
                        })}
                    </ul>
                </div>
            </div>
        </div>
    )
}

function ListDevicesCategoryIndividual({
                                           updateList, setUpdateList, placesObject, placeKeys,
                                           valuesStanki, setValuesStanki, setValuesStankiWait, valuesCategories,
                                           setValuesCategories, page, stankiObject
                                       }) {

    const [isActive, setActive] = useState(false);

    const [listChanged, setListChanged] = useState(false)

    const toggleClass = () => {
        setActive(!isActive);
        if (listChanged) {
            let stankiState = {}
            Object.keys(valuesStanki).forEach(e => {
                if (valuesStanki[e]) {
                    stankiState[e] = stankiObject[e]
                }
            })
            setValuesStankiWait(Object.keys(stankiState))
            setListChanged(false)
            setUpdateList(!updateList)
        }
    };

    const innerRef = useOuterClick(ev => {
        if (isActive) {
            setActive(!isActive);
            if (listChanged) {
                let stankiState = {}
                Object.keys(valuesStanki).forEach(e => {
                    if (valuesStanki[e]) {
                        stankiState[e] = stankiObject[e]
                    }
                })
                setValuesStankiWait(Object.keys(stankiState))
                setListChanged(false)
                setUpdateList(!updateList)
            }

        }
    });

    function handleOnChangeCategory(e, page) {
        const {name, checked} = e.target;
        setValuesCategories(prevState => ({
            ...prevState,
            [name]: checked
        }));
        setListChanged(true)


        let localPlaces = null
        let localStanki = null

        if (page == 9) {
            localPlaces = getObjectFromLocal(localStorage['places'])
            localStanki = getObjectFromLocal(localStorage['stanki'])
            localPlaces[name] = checked
            localStorage['places'] = Object.keys(localPlaces).map(e => {
                return [e, localPlaces[e]]
            })
        }


        Object.keys(placesObject[name].stanki).forEach(e => {
            if (page == 9) {
                localStanki[e] = checked
            }
            setValuesStanki(prevState => ({
                ...prevState,
                [e]: checked
            }));
        })
        if (page == 9) {
            localStorage['stanki'] = Object.keys(localStanki).map(e => {
                return [e, localStanki[e]]
            })
        }
    };

    function handleOnChangeStanok(e, page) {
        const {name, checked} = e.target;
        setValuesStanki(prevState => ({
            ...prevState,
            [name]: checked
        }));

        if (page == 9) {
            let localStanki = getObjectFromLocal(localStorage['stanki'])
            localStanki[name] = checked

            localStorage['stanki'] = Object.keys(localStanki).map(e => {
                return [e, localStanki[e]]
            })
        }
        setListChanged(true)
    };

    return (
        <div
            ref={innerRef}
            className='selectDevice'>
            <span onClick={toggleClass}>Выбор оборудования</span>
            <div className="listComplex">
                <span>▼</span>
                <div
                    className={isActive ? 'containerStanokList' : 'containerStanokList containerStanokListHidden'}>
                    <ul className='toppings-list'
                        className={isActive ? 'toppings-list toppings-list-visible' : 'toppings-list'}>

                        {placeKeys.map((placeName, index) => {
                            let stankiKeys = Object.keys(placesObject[placeName].stanki)
                            let stankiObjects = placesObject[placeName].stanki

                            let paddingNow = {
                                paddingBottom: 30 * stankiKeys.length + 6
                            };

                            return (
                                <li key={index}>
                                    <div className="toppings-list-item">
                                        <div className="left-section">
                                            <input
                                                type="checkbox"
                                                id={`custom-checkbox-category-${index}`}
                                                name={placeName}
                                                value={index}
                                                checked={valuesCategories[placeName]}
                                                onChange={(e) => {
                                                    handleOnChangeCategory(e, page)
                                                }}
                                            />
                                            <label style={paddingNow}
                                                   htmlFor={`custom-checkbox-category-${index}`}></label>
                                            <span className='spanList spanListCategory'>{placeName}</span>
                                        </div>
                                    </div>
                                    <ul>
                                        <InsideListIndividual stankiKeys={stankiKeys} stankiObjects={stankiObjects}
                                                              handleOnChangeStanok={handleOnChangeStanok}
                                                              valuesStanki={valuesStanki} page={page}/>
                                    </ul>
                                </li>
                            );

                        })}
                    </ul>
                </div>
            </div>
        </div>
    )
}

function InsideListIndividual({
                                  stankiKeys, stankiObjects, handleOnChangeStanok,
                                  valuesStanki, page
                              }) {

    return (
        stankiKeys.map((stanok, i) => {
            let stanokIndex = `${stanok} ${i}`
            let stanokName = stankiObjects[stanok].buttonNames.name

            return (
                <li key={stanokIndex} className='individualLi'>
                    <div className="toppings-list-item">
                        <div className="left-section">
                            <input
                                type="checkbox"
                                id={`custom-checkbox-${stanokIndex}`}
                                name={stankiObjects[stanok].complexRequest}
                                value={`${stanokIndex}`}
                                checked={valuesStanki[stanok]}
                                onChange={(e) => {
                                    handleOnChangeStanok(e, page)
                                }}
                            />
                            <label
                                htmlFor={`custom-checkbox-${stanokIndex}`}></label><span
                            className='spanList'>{stanokName}</span>
                        </div>
                    </div>
                </li>
            )
        })
    )
}

