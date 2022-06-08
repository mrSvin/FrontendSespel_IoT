function LogoutButton() {
    const history = useHistory();

    function handleClick() {
        fetch('/logout', {
            method: 'GET',
        })
        history.push("/login?logout");
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

function Dropdown(props) {

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
            props.dataProfile.imageUser = `${props.dataProfile.imageUser}?${new Date().getTime()}`
            setDropdown("none")
        }

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
                src={props.dataProfile.imageUser}
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
                        src={props.dataProfile.imageUser}
                        id="output"
                        width="200"
                    />
                </div>

                <p
                    className="userName"
                >
                    {props.dataProfile.userName}
                </p>

                <p
                    className="userEmail"
                >
                    {props.dataProfile.userMail}
                </p>

                <p className="userRoleStatic">Права доступа:</p>
                <p
                    className="userRole"
                >
                    {props.dataProfile.userRole == "ROLE_ADMIN"? "Администратор" : "Пользователь"}
                </p>

                <LogoutButton/>

            </div>
        </div>
    )
}