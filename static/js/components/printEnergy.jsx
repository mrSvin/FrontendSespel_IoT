function PrintEnergy(data) {

    useEffect(() => {

        // let data = {"vrs2":[14.01,16.42,13.51,14.12,0.0,0.0,0.0,0.0,14.72,0.0,15.92,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.97,1.07,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0],
        //     "vrs1":[0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.02,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0]}

        let keys = Object.keys(data)

        let table = document.getElementById('printEnergy')

        for(let i=0; i<keys.length; i++){
            table.querySelector('thead').querySelector('tr').appendChild(document.createElement('th')).textContent = keys[i]

            let sum = 0;
            for(let j=0; j<data[keys[i]].length; j++){
                table.querySelector('tbody').querySelectorAll('tr')[j].appendChild(document.createElement('td')).textContent = data[keys[i]][j]
                sum += data[keys[i]][j]
            }
            table.querySelector('tbody').querySelectorAll('tr')[data[keys[i]].length].appendChild(document.createElement('td')).textContent = sum
        }

    }, [])

    return (
        <div>
            <table id='printEnergy' className='tablePrintEnergy'>
                <thead>
                    <tr>
                        <th>Дни</th>
                    </tr>
                </thead>
                <tbody>
                <tr>
                    <td>1</td>
                </tr>
                <tr>
                    <td>2</td>
                </tr>
                <tr>
                    <td>3</td>
                </tr>
                <tr>
                    <td>4</td>
                </tr>
                <tr>
                    <td>5</td>
                </tr>
                <tr>
                    <td>6</td>
                </tr>
                <tr>
                    <td>7</td>
                </tr>
                <tr>
                    <td>8</td>
                </tr>
                <tr>
                    <td>9</td>
                </tr>
                <tr>
                    <td>10</td>
                </tr>
                <tr>
                    <td>11</td>
                </tr>
                <tr>
                    <td>12</td>
                </tr>
                <tr>
                    <td>13</td>
                </tr>
                <tr>
                    <td>14</td>
                </tr>
                <tr>
                    <td>15</td>
                </tr>
                <tr>
                    <td>16</td>
                </tr>
                <tr>
                    <td>17</td>
                </tr>
                <tr>
                    <td>18</td>
                </tr>
                <tr>
                    <td>19</td>
                </tr>
                <tr>
                    <td>20</td>
                </tr>
                <tr>
                    <td>21</td>
                </tr>
                <tr>
                    <td>22</td>
                </tr>
                <tr>
                    <td>23</td>
                </tr>
                <tr>
                    <td>24</td>
                </tr>
                <tr>
                    <td>25</td>
                </tr>
                <tr>
                    <td>26</td>
                </tr>
                <tr>
                    <td>27</td>
                </tr>
                <tr>
                    <td>28</td>
                </tr>
                <tr>
                    <td>29</td>
                </tr>
                <tr>
                    <td>30</td>
                </tr>
                <tr>
                    <td>31</td>
                </tr>
                <tr>
                    <td>Итого</td>
                </tr>
                </tbody>
            </table>
         </div>
    )
}