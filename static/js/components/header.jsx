function Header() {
    const [dataProfile, setDataProfile] = useState([]);

    useEffect(() => {

        fetch('/api/userInfo', {
            method: 'POST'
        })
            .then((response) => response.json())
            .then((data) => {
                setDataProfile(data)
            })

    }, [])


    return (
        <div>

            <div className="headerBody" id="headerCss">
                <Link to="/">
                    <img
                        className="icon-logo"
                        src="../images/logo_white.png"
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