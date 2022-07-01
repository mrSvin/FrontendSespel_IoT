function Service(stanokName = 'Навигатор 1', complexImg = '../images/navigator.png') {

        function msToTimeDays(duration) {
        let seconds = parseInt((duration / 1000) % 60),
        minutes = parseInt((duration / (1000 * 60)) % 60),
        hours = parseInt((duration / (1000 * 60 * 60)) % 24),
        days = parseInt((duration / (1000 * 60 * 60 * 24 )))

        return days + " дней " + hours + " ч. " + minutes + " мин. " + seconds + ' с.';
    }

        function pars(arrayParse, y, difference=null)
        {

            var index_pars = 0; // Индекс по одному из циклов
            var arraySave = [] // Массив, который будет заполняться

            // Если имя программы не передано в функцию, то массив формируется без нее
            if (difference == null){
            if(arrayParse.length == 1){
            arraySave.push({
            x:(new Date(arrayParse[0])).getTime(),
            x2:((new Date(arrayParse[0])).getTime()+86400000),
            y:y
        })
        }
            else if(arrayParse.length % 2 == 0){
            for(let i = 0; i<arrayParse.length-1; i++){
            arraySave.push({
            x:(new Date(arrayParse[i])).getTime(),
            x2:(new Date(arrayParse[i+1])).getTime(),
            y:y
        })
        }
        }
            else {
            for(let i = 0; i<arrayParse.length-1; i++){
            if(i == arrayParse.length-1)
        {
            arraySave.push({
            x:(new Date(arrayParse[i])).getTime(),
            x2:(new Date(arrayParse[i])).getTime(),
            y:y
        })
        }
            else {
            arraySave.push({
            x: (new Date(arrayParse[i])).getTime(),
            x2: (new Date(arrayParse[i + 1])).getTime(),
            y: y
        })
        }
        }
        }
        }
            // Иначе в массив парсится переданный массив с именем программы
            else {
            while(index_pars < arrayParse.length)
        {   // Парсинг
            arraySave.push({
            x:(new Date(arrayParse[index_pars*2])).getTime(),
            x2:(new Date(arrayParse[index_pars * 2 + 1])).getTime(),
            y:y,
            partialFill: difference})
            index_pars += 1;
        }
        }
            // Функция возвращает массив коллекциями, содержащими 2 или 3 объекта.
            return arraySave
        }

        function DrawHigcharts(ArrayTeh, timeNext=31536000000) {

        let timeToday = new Date(new Date().toString().split('GMT')[0] + ' UTC').toISOString();
        // Преобразоавние времение в формат '2022-03-21 10:00:35'
        timeToday = timeToday.slice(0, 10) + " " + timeToday.slice(11, 19);

        // Дата последнего обслуживания
        let lastServiceTime = new Date(ArrayTeh[ArrayTeh.length-1])

        // Крайняя дата следующего обслуживания
        let nextServiceTime = new Date(lastServiceTime.getTime() + timeNext)

        // Время последнего обслуживания в формате ISO
        let lastServiceIso = new Date(new Date(lastServiceTime).toString().split('GMT')[0] + ' UTC').toISOString();
        // Время следующего запланированного обслуживания в формате ISO
        let nextServiceIso = new Date(new Date(nextServiceTime).toString().split('GMT')[0] + ' UTC').toISOString();

        lastServiceIso = lastServiceIso.slice(0, 10) + " " + lastServiceIso.slice(11, 19);
        nextServiceIso = nextServiceIso.slice(0, 10) + " " + nextServiceIso.slice(11, 19);

        // Копирования массива со всеми тех. обслуживаниями
        let arrayTeh = ArrayTeh.slice()

        // Массив со временем последнего обслуживания и запланированным временем.
        let timePastArray = [lastServiceIso, nextServiceIso]

        // Переменная отображающаяся на графики планируемого обслуживания.
        let percent = +((new Date(timeToday).getTime() - new Date(lastServiceIso).getTime())/timeNext).toFixed(2)

        //Массив со всеми тех. обслуживаниями.
        arrayTeh = pars(arrayTeh, 0)
        timePastArray = pars(timePastArray, 0, percent)

        Highcharts.setOptions({
        lang: {
        loading: 'Загрузка...',
        months: ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'],
        weekdays: ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'],
        shortMonths: ['Янв', 'Фев', 'Март', 'Апр', 'Май', 'Июнь', 'Июль', 'Авг', 'Сент', 'Окт', 'Нояб', 'Дек'],
        exportButtonTitle: "Экспорт",
        printButtonTitle: "Печать",
        rangeSelectorFrom: "С",
        rangeSelectorTo: "По",
        rangeSelectorZoom: "Период",
        downloadPNG: 'Скачать PNG',
        downloadJPEG: 'Скачать JPEG',
        downloadPDF: 'Скачать PDF',
        downloadSVG: 'Скачать SVG',
        printChart: 'Напечатать график',
        viewFullscreen: 'На весь экран'
    },
        plotOptions: {
        xrange: {
        grouping: false
    }
    },
        global: {
        timezoneOffset: timezone
    }
    });

        Highcharts.chart('allService', {
        chart: {
        plotBackgroundColor: null,
        plotBorderWidth: null,
        plotShadow: false,
        plotBorderColor: 'gray',
        type: 'xrange'
    },
        title: {
        text: 'Проведенные тех. обсуживания'
    },

        xAxis: {
        type: 'datetime'
    },
        yAxis: {
        title: {
        text: ''
    },
        categories: ['Время'],
        reversed: true
    },
        credits: {
        enabled: false
    },
        legend: {
        enabled: false
    },

        series: [
    {
        name: 'Обслуживания',
        borderColor: 'gray',
        pointWidth: 30,
        colorByPoint: false,
        color: '#d8e523',
        tooltip: {
        pointFormatter: function () {
        let timer = msToTimeDays(this.x2 - this.x)
        let per = this.partialFill
        return '<b>Времени между обслуживанием:</b> ' + timer;
    },
    },
        data: arrayTeh,
    },
        ],

    });

        Highcharts.chart('timeToLastService', {
        chart: {
        plotBackgroundColor: null,
        plotBorderWidth: null,
        plotShadow: false,
        plotBorderColor: 'gray',
        type: 'xrange'
    },
        title: {
        text: 'Времени  до следующего тех. обслуживания'
    },

        xAxis: {
        type: 'datetime',
    },
        yAxis: {
        title: {
        text: ''
    },
        categories: ['Время'],
        reversed: true
    },
        credits: {
        enabled: false
    },
        legend: {
        enabled: false
    },

        series: [
    {
        name: 'Прошло времени',
        borderColor: 'gray',
        pointWidth: 30,
        colorByPoint: false,
        color: '#3c61da',
        tooltip: {
        pointFormatter: function () {
        let timer = msToTimeDays(this.x2 - this.x)

        let TodayTime = (new Date(timeToday)).getTime()

        let pastTime = msToTimeDays(TodayTime - this.x)
        //let per = this.partialFill

        let leftTime = msToTimeDays(this.x2 - TodayTime)

        return '<b>Прошло:</b> ' + pastTime + '<br>' +
        '<b>Осталось:</b> ' + leftTime;
    },
        pointFormat: '<b>Прошло времени: {timer}</b>'
    },
        data: timePastArray,
        dataLabels: {
        enabled: true
    }
    },
        ]
    });

    }

        function MakeTeh(ArrayTeh, timeNext=31536000000){
        let timeToday = new Date(new Date().toString().split('GMT')[0] + ' UTC').toISOString();
        // Преобразоавние времение в формат '2022-03-21 10:00:35'
        timeToday = timeToday.slice(0, 10) + " " + timeToday.slice(11, 19);

        ArrayTeh.push(timeToday)
        DrawHigcharts(allServiceArray, ONE_YEAR_MS)
    }

        // Переменная в 1 год в мс.
        const ONE_YEAR_MS = 31536000000
        const timezone = new Date().getTimezoneOffset()

        // массив со всеми обслуживаниями
        // массив со всеми обслуживаниями
        let allServiceArray = ['2020-06-12 13:52:03', '2021-01-05 18:00:09', '2021-12-17 12:33:18']

        // DrawHigcharts(allServiceArray, ONE_YEAR_MS)


    return (
        <div>
            <Header/>
            <div className='serviceContainer'>
                <h1>Тех. обслуживания станка {stanokName}</h1>
                <img className="serviceImg" src={complexImg}/>
                <div className="oneLineGraph" id="allService"></div>
                <div className="oneLineGraph" id="timeToLastService"></div>
                <table className="serviceTable">
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
                        <td>Установка осей на гранулы станка</td>
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
                <button className='buttonTehno' id='startTehno'>
                    <span>Провести тех.обслуживание</span>
                </button>
            </div>
        </div>
    )
}