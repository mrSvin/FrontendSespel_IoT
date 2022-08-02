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
    Suspense,
    lazy
} = React

const loader = document.querySelector('.loader');

const showLoader = () => loader.classList.remove('loader--hide');
const hideLoader = () => loader.classList.add('loader--hide');

function App({ hideLoader }) {

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

                    <Route path="/stanki/otk">
                        <Otk/>
                    </Route>

                    <Route path="/stanki/otkMonth">
                        <OtkMonth/>
                    </Route>

                    <Route path="/stanki/liteyka">
                        <Liteyka/>
                    </Route>

                    <Route path="/stanki/liteykaMonth">
                        <LiteykaMonth/>
                    </Route>

                    <Route path="/stanki/gibka">
                        <Gibka/>
                    </Route>

                    <Route path="/stanki/gibkaMonth">
                        <GibkaMonth/>
                    </Route>

                    <Route path="/stanki/sclads">
                        <Sclads/>
                    </Route>

                    <Route path="/stanki/scladsMonth">
                        <ScladsMonth/>
                    </Route>

                    <Route path="/stanki/specComplexes">
                        <SpecComplexes/>
                    </Route>

                    <Route path="/stanki/specComplexesMonth">
                        <SpecComplexesMonth/>
                    </Route>

                    <Route path="/stanki/robots">
                        <Robots/>
                    </Route>

                    <Route path="/stanki/robotsMonth">
                        <RobotsMonth/>
                    </Route>

                    <Route path="/stanki/meh1">
                        <Meh1/>
                    </Route>

                    <Route path="/stanki/meh1Month">
                        <Meh1Month/>
                    </Route>

                    <Route path="/stanki/rezka">
                        <Rezka/>
                    </Route>

                    <Route path="/stanki/rezkaMonth">
                        <RezkaMonth/>
                    </Route>

                    <Route path="/stanki/rezkaSmena">
                        <RezkaSmena/>
                    </Route>

                    <Route path="/stanki/meh2">
                        <Meh2/>
                    </Route>

                    <Route path="/stanki/meh2Month">
                        <Meh2Month/>
                    </Route>

                    <Route path="/service">
                        <Service/>
                    </Route>

                    <Route path="/beacon">
                        <Beacon/>
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
// ReactDOM.render(<App/>, document.getElementById('main-app'));

