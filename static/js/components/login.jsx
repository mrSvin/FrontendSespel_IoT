function Login() {

    let [login, setLogin] = useState("")
    let [password, setPassword] = useState("")
    let [rememberMe, setRememberMe] = useState(false)
    let [passwordEye, setpasswordEye] = useState(false)

    const [errorMsg, setErrorMsg] = useState('');
    const toggleClass = () => {
        setpasswordEye(!passwordEye);
    };

    function authorization() {

        if (login.length >= 3 && password.length >= 3) {
            let response = fetch('/login?' + "username=" + login + "&password=" +
                password + "&remember-me=" + rememberMe, {
                method: 'POST',
            })
            response.then(response => {
                if (response.ok) {
                    let badLogin = window.location.protocol + '//' + window.location.host + "/login?error";
                    if (response.url != badLogin) {
                        location.href = "/"
                    } else {
                        setErrorMsg('Логин или пароль введены не верно')
                    }
                }
            })
        } else {
            setErrorMsg('Логин или пароль слишком короткие')
        }
    }

    return (
        <>
            <div className="loginTheme"></div>
            <div className={'loginMenu'}>
                <img className="loginLogo"
                     src={'../images/logo_white.svg'}/>
                <div className="box login">
                    <div>
                        <h2>Авторизация</h2>
                        <input
                            type="text"
                            className="inputBtn"
                            tabIndex="1"
                            placeholder="Username"
                            onChange={event => setLogin(event.target.value)}

                        />
                        <div className='passwordLogin'>
                            <input
                                type={passwordEye ? 'text' : 'password'}
                                className="inputBtn"
                                tabIndex="1"
                                placeholder="Password"
                                onChange={event => setPassword(event.target.value)}

                            />
                            <img src={passwordEye ? '../images/view.svg' : '../images/no-view.svg'}
                                 className="passwordEye"
                                 onClick={() => toggleClass()}
                            />
                        </div>
                        <input
                            id="abc"
                            className="inputBtn"
                            name="remember"
                            type="checkbox"
                            onClick={event => setRememberMe(event.target.checked)}
                        />
                        <label
                            htmlFor="abc"
                            className="label-block checkbox">
                            Запомнить меня
                        </label>
                        {errorMsg.length > 0 ?
                            <p
                                id="errorMsg"
                                className="error-msg"> {errorMsg}
                            </p>
                            : null
                        }

                        <div
                            id="login-btn"
                            className="btn btn-login"
                            onClick={authorization}
                        >
                            Войти
                        </div>


                    </div>
                </div>
            </div>
        </>

    )
}
