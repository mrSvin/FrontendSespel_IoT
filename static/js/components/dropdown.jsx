function LogoutButton({setDropdown}) {
    const history = useHistory();

    function handleClick() {
        fetch('/logout', {
            method: 'GET',
        })
        history.push("/login?logout");
        setDropdown("none")
    }

    return (
        <button
            className="buttonLogout"
            type="submit"
            onClick={handleClick}
        >Выход
        </button>
    );
}

function useOutsideAlerter(ref,dropDown, setDropdown) {
    useEffect(() => {
        /**
         * Alert if clicked on outside of element
         */
        function handleClickOutside(event) {
            if (ref.current && !ref.current.contains(event.target)) {
                setDropdown("none")
            }
        }
        // Bind the event listener
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            // Unbind the event listener on clean up
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [ref]);
}

function Dropdown({dataProfile,setDataProfile}) {

    const [dropDown, setDropdown] = useState("none");

    function changeDropdown() {
        dropDown == "none" ? setDropdown("block") : setDropdown("none")
    }

    async function changePhoto() {

        var input = document.querySelector('input[type="file"]')

        var data = new FormData()
        data.append('image', input.files[0])

        let response = await fetch('/api/addImage', {
            method: 'POST',
            body: data
        })
        if (response.ok) {
            getBase64(input.files[0])
            setDropdown("none")
        }

    }

    function getBase64(file) {
        var reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = function () {
            handleOnChangeCategory(reader.result)
        };
        reader.onerror = function (error) {
            console.log('Error: ', error);
        };
    }

    function handleOnChangeCategory(imageProfile) {
        console.log(imageProfile.slice(22))
        console.log(imageProfile)
        setDataProfile(prevState => ({
            ...prevState,
            imageUser: imageProfile.slice(22)
        }));

    }

    //Закрытие dropdown на клик вне поля
    const wrapperRef = useRef(null);
    useOutsideAlerter(wrapperRef, dropDown, setDropdown);



    return (
        <div
            ref={wrapperRef}
            className="dropdown">
            <input
                className="avatar"
                type="image"
                src={`data:image/jpeg;base64,${dataProfile.imageUser}`}
                alt="Avatar"
                onClick={changeDropdown}
            >
            </input>
            <div
                className="dropdown-content"
                style={{display: dropDown}}
            >
                <div
                    className="profile-pic"
                >
                    <label
                        className="-label"
                        htmlFor="file"
                    >
                        <span className="glyphicon glyphicon-camera"></span>
                        <span>Поменять изображение</span>
                    </label>
                    <input
                        className="inputImage"
                        id="file"
                        type="file"
                        onChange={changePhoto}
                    />
                    <img
                        className="outputImage"
                        src={`data:image/jpeg;base64,${dataProfile.imageUser}`}
                        id="output"
                        width="200"
                    />
                </div>

                <p
                    className="userName"
                >
                    {dataProfile.userName}
                </p>

                <p
                    className="userEmail"
                >
                    {dataProfile.userMail}
                </p>

                <p className="userRoleStatic">Права доступа:</p>
                <p
                    className="userRole"
                >
                    {(() => {
                        if (dataProfile.userRole == "ROLE_ADMIN") {
                            return (
                                "Администратор"
                            )
                        } else if (dataProfile.userRole == "ROLE_SERVICE") {
                            return (
                                "Сервис"
                            )
                        } else {
                            return (
                                "Пользователь"
                            )
                        }
                    })()}
                </p>
                {dataProfile.userRole == "ROLE_ADMIN" ?
                    <button className="buttonAdmin" onClick={() => window.location.href = '/adminpanel/userscontrol'}>Администрирование</button> :
                    null}
                <LogoutButton setDropdown = {setDropdown}/>

            </div>
        </div>
    )
}