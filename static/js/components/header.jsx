function Header({dataProfile, setDataProfile}) {

    useEffect(() => {
        if(!window.location.href.includes('login') && dataProfile.userName === null) {
            let userData = fetchUserData()
            userData.then(data => {
                if (data === 'error') {
                    console.log('Отсутвует авторизация')
                } else setDataProfile(data)
            })
        }

    }, [dataProfile, setDataProfile])


    return (
        <div>

            <div className="headerBody" id="headerCss">
                <Link to="/">
                    <img alt={'no-image'}
                        className="icon-logo"
                        src="../images/logo_white.svg"
                    />
                </Link>

                <div className="userInfo">
                    <div className="div_login_mail">
                        <p className="nameInfo">{dataProfile.userName}</p>
                        <p className="mailInfo">{dataProfile.userMail}</p>
                    </div>

                    <Dropdown dataProfile={dataProfile} setDataProfile={setDataProfile}/>

                </div>


            </div>

        </div>
    )
}