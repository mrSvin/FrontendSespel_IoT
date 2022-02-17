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
            text: 'мл'
        }
    },
    tooltip: {
        pointFormat: '<span style="color:{series.color}">{series.name}</span>: {point.percentage:.1f}%<br/>',
        shared: true
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
        data: [vrs2[0], vrs2[1], vrs2[2],vrs2[3],vrs2[4],vrs2[5],vrs2[6],vrs2[7],vrs2[8],vrs2[9],vrs2[10],vrs2[11],
            vrs2[12],vrs2[13],vrs2[14],vrs2[15],vrs2[16],vrs2[17],vrs2[18],vrs2[19],vrs2[20],vrs2[21],vrs2[22],vrs2[23],
            vrs2[24],vrs2[25],vrs2[26],vrs2[27],vrs2[28],vrs2[29],vrs2[30]]
    }]
});
