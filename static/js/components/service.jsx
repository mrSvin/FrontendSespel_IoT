function Service() {

    let [formAddService, setFormAddService] = useState(false);

    let [nameComplex, setNameComplex] = useState("null");

    const [infoWorks, setInfoWorks] = useState(''); // '' is the initial state value

    useEffect(() => {

        // Получения имени станка из адресной строки
        let form_path = document.location.pathname;
        form_path.lastIndexOf("/")
        let searchIndex= form_path.lastIndexOf("/")+1;

        // имя станка для запроса
        let nameToFetch = form_path.substr(searchIndex, form_path.length)

        // Имя заголовка страницы
        let h1 = null

        // Вставка пробела при необходимости
        if(!isNaN(nameToFetch[nameToFetch.length-1])){
            h1 = nameToFetch.slice(0, nameToFetch.length-1) + ' ' + nameToFetch.slice(nameToFetch.length-1)
        }
        else  h1 = nameToFetch

        // Заголовок с именем станка на странице
        setNameComplex(h1)
        setInfoWorks('Какое-то слово')

        console.log(nameComplex)

        let allServiceArray = ['2020-06-12 13:52:03', '2021-01-05 18:00:09', '2021-12-17 12:33:18']

        highChartServiceHistory(allServiceArray)
        highChartServiceNow(allServiceArray,31536000000)
    }, [])




    return (
        <div>

            <div className='serviceContainer'>
                <h1>Тех. обслуживания станка {nameComplex}</h1>
                <img className="serviceImg" src='../images/navigator.png'/>
                <div className="oneLineGraph" id="timeToLastService"></div>
                <div className="oneLineGraph" id="allService"></div>
                <button className='buttonTehno' id='startTehno'
                        onClick={() => {
                            setFormAddService(true)
                        }}
                >
                    <span>Провести тех.обслуживание</span>
                </button>
                <table className="tableService">
                    <thead>
                    <tr>
                        <th>Ответственный за обслуживание</th>
                        <th>Время проведения</th>
                        <th>Период между предыдущим сервисом</th>
                        <th>Проведенные работы</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <td>Иванов И.И.</td>
                        <td>2020-06-12 13:52:03</td>
                        <td>0</td>
                        <td>Текст (от лат. textus — ткань; сплетение, сочетание) — зафиксированная на каком-либо материальном носителе человеческая мысль; в общем плане связная и полная последовательность символов.

                            Существуют две основные трактовки понятия «текст»: имманентная (расширенная, философски нагруженная) и репрезентативная (более частная). Имманентный подход подразумевает отношение к тексту как к автономной реальности, нацеленность на выявление его внутренней структуры. Репрезентативный — рассмотрение текста как особой формы представления информации о внешней тексту действительности.

                            В лингвистике термин «текст» используется в широком значении, включая и образцы устной речи. Восприятие текста изучается в рамках лингвистики текста и психолингвистики. Так, например, И. Р. Гальперин определяет текст следующим образом: «Это письменное сообщение, объективированное в виде письменного документа, состоящее из ряда высказываний, объединённых разными типами лексической, грамматической и логической связи, имеющее определённый моральный характер, прагматическую установку и соответственно литературно обработанное»[1].</td>
                    </tr>
                    <tr>
                        <td>Сумкин К.И.</td>
                        <td>2021-01-05 18:00:09</td>
                        <td>207 дней 4 ч. 8 мин. 6 с.</td>
                        <td>Замена слеек на корпусе,смазка деталей</td>
                    </tr>
                    <tr>
                        <td>Федоров Г.И.</td>
                        <td>2021-12-17 12:33:18</td>
                        <td>345 дней 18 ч.33 мин.9.с</td>
                        <td>Замена аккумулятора, переустановка ПО</td>
                    </tr>
                    </tbody>
                </table>
            </div>
            {formAddService==true ?
                <form className="formService" method="post" action="" id="form_teh">
                    <span id="formClose"
                          onClick={() => {
                              setFormAddService(false)
                          }}
                    >ₓ</span>
                    <div className="formFill">
                        <h2 className="formServiceName">Проведение тех. обслуживания</h2>
                        <div className='divWorksPass'>
                            <h3>Проведенные работы</h3>
                            <textarea id="story" name="story" placeholder="Введите список проведенных работ.."
                                      value={infoWorks} onChange={e => {
                                console.log(e.target.value)
                                setInfoWorks(e.target.value)
                                      }}
                            />
                        </div>
                        <div className="divPeriod">
                            <h3>Период до следующего тех. обслуживания</h3>
                            <select id="listPeriods" name="addPeriod">
                                <option label="3 месяца" value="7884000"></option>
                                <option label="6 месяцев" value="15768000"></option>
                                <option label="1 год" value="31536000"></option>
                            </select>
                        </div>
                        <input id="submit" type="button" value="Подтвердить"
                               onClick={() => {
                                   console.log('Проверка')
                               }}
                        />
                    </div>

                    <div id="overlay_add"
                    ></div>
                </form>
                : null}



        </div>
    )

}