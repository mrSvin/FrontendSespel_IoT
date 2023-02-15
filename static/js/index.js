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

    let [scudMonthMemory, setScudMonthMemory] = useState(null)

    useEffect(hideLoader, []);

    const iframeRoutes = [
        { path: "/winnum", source: "winnum" },
        { path: "/owencloud", source: "owencloud" },
        { path: "/intra", source: "intra" },
        { path: "/wialon", source: "wialon" },
        { path: "/teamcenter", source: "teamcenter" },
    ];

    const componentRoutes = [
        { path: "/login", component: Login },
        { path: "/energyWater", component: EnergyWater },
        { path: "/energyElectro", component: EnergyElectro },
        { path: "/energyGas", component: EnergyGas },
        { path: "/printEnergy", component: PrintEnergy },
        { path: "/stanki", component: Stanki },
        { path: "/stankiMonth", component: StankiMonth },
        { path: "/stankiSmena", component: StankiSmena },
        { path: "/service", component: Service },
        { path: "/report", component: Report },
        { path: "/currentParams", component: CurrentParams },
        { path: "/beacon", component: Beacon },
        { path: "/scud", component: Scud },
        { path: "bot/scudBot", component: ScudBot },
        { path: "userscontrol", component: UsersControl },
        { path: "/", component: Home },
    ];


    return (
        <BrowserRouter>
            <Header/>
            <div className="headerPadding">
                <Switch>


                    {iframeRoutes.map((route) => (
                        <Route key={route.path} path={route.path}>
                            <IframeLink source={route.source} />
                        </Route>
                    ))}

                    {componentRoutes.map((route) => (
                        <Route key={route.path} path={route.path}>
                            <route.component />
                        </Route>
                    ))}

                    <Route path="/scudMonth">
                        <ScudMonth scudMonthMemory={scudMonthMemory} setScudMonthMemory={setScudMonthMemory}/>
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
