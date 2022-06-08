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
} = React


const App = () => (
    <BrowserRouter>
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
                <EnergyWater/>
            </Route>

            <Route path="/energyElectro">
                <EnergyElectro/>
            </Route>

            <Route path="/energyGas">
                <EnergyGas/>
            </Route>

            <Route path="/">
                <Home/>
            </Route>

        </Switch>

    </BrowserRouter>
);

ReactDOM.render(<App/>, document.getElementById('main-app'));