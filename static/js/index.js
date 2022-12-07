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

    useEffect(hideLoader, []);

    return (
        <BrowserRouter>
            <Header/>
            <div className="headerPadding">
                <Switch>
                    <Route path="/login">
                        <Login/>
                    </Route>

                    <Route path="/winnum">
                        <Winnum/>
                    </Route>

                    <Route path="/owencloud">
                        <Owencloud/>
                    </Route>

                    <Route path="/intra">
                        <Intra/>
                    </Route>

                    <Route path="/wialon">
                        <Wialon/>
                    </Route>

                    <Route path="/teamcenter">
                        <Teamcenter/>
                    </Route>

                    <Route path="/energyWater">
                        <Suspense fallback={<div>Loading...</div>}>
                            <EnergyWater/>
                        </Suspense>
                    </Route>

                    <Route path="/energyElectro">
                        <EnergyElectro/>
                    </Route>

                    <Route path="/energyGas">
                        <EnergyGas/>
                    </Route>

                    <Route path="/printEnergy">
                        <PrintEnergy/>
                    </Route>

                    <Route path="/stanki">
                        <Stanki/>
                    </Route>

                    <Route path="/stankiMonth">
                        <StankiMonth/>
                    </Route>

                    <Route path="/stankiSmena">
                        <StankiSmena/>
                    </Route>

                    <Route path="/service">
                        <Service/>
                    </Route>

                    <Route path="/report">
                        <Report/>
                    </Route>

                    <Route path="/currentParams">
                        <CurrentParams/>
                    </Route>

                    <Route path="/beacon">
                        <Beacon/>
                    </Route>

                    <Route path="/scud">
                        <Scud/>
                    </Route>

                    <Route path="/bot/scudBot">
                        <ScudBot/>
                    </Route>

                    <Route path="/userscontrol">
                        <UsersControl/>
                    </Route>

                    <Route exact path="/">
                        <Home/>
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
