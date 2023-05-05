function Login({params}) {

    let [login, setLogin] = useState("")
    let [password, setPassword] = useState("")
    let [rememberMe, setRememberMe] = useState(false)
    let [passwordEye, setpasswordEye] = useState(false)
    let [authorized, setAuthorized] = useState(false)
    let [errorMsg, setErrorMsg] = useState('');
    let loginBtn = useRef()

    const toggleClass = () => {
        setpasswordEye(!passwordEye);
    };

    function authorization(e) {
        e.preventDefault();
        if (login.length >= 3 && password.length >= 3) {
            let response = fetch('/login?' + "username=" + login + "&password=" +
                password + "&remember-me=" + rememberMe, {
                method: 'POST',
            })
            response.then(response => {
                if (response.ok) {
                    let badLogin = window.location.protocol + '//' + window.location.host + "/login?error";
                    if (response.url !== badLogin) {
                        let tokenPromise = fetchRequestGetToken(rememberMe?'Remember':'')
                        let userData = fetchUserData()
                        tokenPromise.then(data => {
                            let differenceTime = new Date().getTime() - decodeJwt(data).payload.time
                            differenceTime = (-3000 <= differenceTime && differenceTime <= 3000)? 0 : differenceTime
                            localStorage['token'] = data
                            localStorage['differenceTime'] = differenceTime
                            params.setToken(data)
                            params.setDifferenceTime(differenceTime)


                            setAuthorized(true)
                        })
                        userData.then(data => {
                            if(data === 'error'){
                                console.log('Отсутвует авторизация')
                            } else params.setDataProfile(data)
                        })

                    } else {
                        setErrorMsg('Логин или пароль введены не верно')
                    }
                }
            })
        } else {
            setErrorMsg('Логин или пароль слишком короткие')
        }
    }

    useEffect(()=>{
        if(authorized) loginBtn.current.click()
    }, [authorized])

    return (
        <>
            <div className="loginTheme"></div>
            <div className={'loginMenu'}>
                <img className="loginLogo"
                     alt={'no-image'}
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
                                 alt={'no-image'}
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

                        <Link
                            to={'/'}
                            id="login-btn"
                            className="btn btn-login"
                            onClick={authorized? null:authorization} ref={loginBtn}
                        >
                            Войти
                        </Link>


                    </div>
                </div>
            </div>
        </>

    )
}
