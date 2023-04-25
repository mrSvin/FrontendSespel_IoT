const {
    BrowserRouter,
    Switch,
    Route,
    Link,
    useHistory,
} = ReactRouterDOM

const {
    useState,
    useEffect,
    useRef,
    useReducer,
    Suspense,
    lazy
} = React


const loader = document.querySelector('.loader');

const showLoader = () => loader.classList.remove('loader--hide');
const hideLoader = () => loader.classList.add('loader--hide');

interceptNetworkRequests({
    onFetchResponse: reloadPageIfLogin,
});



function App({hideLoader}) {

    let [token, setToken] = useState(null)
    let [scudMonthMemory, setScudMonthMemory] = useState(null)

    useEffect(()=>{
        hideLoader()
    }, [token]);



    const iframeRoutes = [
        {path: "/winnum", source: "http://winnum-serv/Winnum/views/navigation/home/list.jsp"},
        {path: "/owencloud", source: "https://web.owencloud.ru/device/index/201636"},
        {path: "/intra", source: "http://89.151.134.234:46088/"},
        {path: "/wialon", source: "https://hosting.wialon.com/"},
        {path: "/teamcenter", source: "http://tcsespel.sespel.corp:7001/awc/"},
        {path: "/configPpc", source: "http://192.168.3.163:3001/"},
        {path: "/mapService", source: `http://192.168.2.78:3000/${token}`},
    ]

    const componentRoutes = [
        {path: "/login", component: Login},
        {path: "/energyWater", component: EnergyWater},
        {path: "/energyElectro", component: EnergyElectro},
        {path: "/energyGas", component: EnergyGas},
        {path: "/printEnergy", component: PrintEnergy},
        {path: "/stanki", component: Stanki},
        {path: "/stankiMonth", component: StankiMonth},
        {path: "/stankiSmena", component: StankiSmena},
        {path: "/service", component: Service},
        {path: "/report", component: Report},
        {path: "/currentParams", component: CurrentParams},
        {path: "/signals", component: Signals},
        // {path: "/beacon", component: Beacon},
        {path: "/network", component: Network},
        {path: "/scud", component: Scud},
        {path: "/bot/scudBot", component: ScudBot},
        {path: "/userscontrol", component: UsersControl},
    ];


    return (
        <BrowserRouter>
            <Header/>
            <div className="headerPadding">
                <Switch>

                    <Route path="/scudMonth">
                        <ScudMonth scudMonthMemory={scudMonthMemory} setScudMonthMemory={setScudMonthMemory}/>
                    </Route>

                    {iframeRoutes.map((route) => {
                        return (
                            <Route key={route.path} path={route.path}>
                                <IframeLink source={route.source}/>
                            </Route>
                        )
                    })}

                    {componentRoutes.map((route) => {
                        return (
                            <Route key={route.path} path={route.path}>
                                <route.component/>
                            </Route>
                        )
                    })}

                    <Route path="/">
                        <Home token={token} setToken={setToken}/>
                    </Route>

                </Switch>

            </div>
        </BrowserRouter>
    )

}


setTimeout(() =>

        ReactDOM.render(
            <App
                hideLoader={hideLoader}
                showLoader={showLoader}
            />,
            document.getElementById('main-app')
        )
    , 1);
