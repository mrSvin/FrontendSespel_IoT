var colors = ['#5c7ed0'];

console.log("Im open x3")

const timezone = new Date().getTimezoneOffset()

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

Highcharts.chart('container_days1', {
    chart: {
        type: 'column'
    },
    colors:colors,
    title: {
        text: 'Расход воды по дням'
    },
    xAxis: {
        title: {
            text: 'Дни месяца',
            align: 'high'
        },
        labels: {
            style: {
                fontSize: '18px',
            }
        },
        categories: ['1','2','3','4','5','6','7','8','9','10','11','12','13','14','15','16','17','18','19','20','21','22','23','24','25','26','27','28','29','30','31']
    },
    credits: {
        enabled: false
    },
    yAxis: {
        min: 0,
        title: {
            text: 'кубов'
        }
    },
    tooltip: {
        valueSuffix: ' кубов'
        // pointFormat: '<span style="color:{series.color}">{series.name}</span>: {point.percentage:.1f}<br/>',
        // shared: true
    },
    plotOptions: {
        column: {
            dataLabels: {
                enabled: false
            }
        }
    },
    legend: {
        enabled:false
    },
    
    series: [{
        name: 'Расход',
        data: [vrs1[0], vrs1[1], vrs1[2],vrs1[3],vrs1[4],vrs1[5],vrs1[6],vrs1[7],vrs1[8],vrs1[9],vrs1[10],vrs1[11],
            vrs1[12],vrs1[13],vrs1[14],vrs1[15],vrs1[16],vrs1[17],vrs1[18],vrs1[19],vrs1[20],vrs1[21],vrs1[22],vrs1[23],
            vrs1[24],vrs1[25],vrs1[26],vrs1[27],vrs1[28],vrs1[29],vrs1[30]]
    }]
});
