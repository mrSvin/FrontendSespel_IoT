var colors = ['#e81e1d','#000000', '#ffea32','#207210','#38e817'];

Highcharts.chart('container_days_prans', {
    chart: {
        type: 'column'
    },
    colors:colors,
    title: {
        text: 'Загрузка оборудования по дням'
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
            text: '%'
        }
    },
    tooltip: {
        pointFormat: '<span style="color:{series.color}">{series.name}</span>: {point.percentage:.1f}%<br/>',
        shared: true
    },
    plotOptions: {
        column: {
            stacking: 'percent'
        }
    },
    series: [{
        name: 'Авария',
        data: [prans_avar_day[0], prans_avar_day[1], prans_avar_day[2],prans_avar_day[3],prans_avar_day[4],prans_avar_day[5],prans_avar_day[6],prans_avar_day[7],prans_avar_day[8],prans_avar_day[9],prans_avar_day[10],prans_avar_day[11],
            prans_avar_day[12],prans_avar_day[13],prans_avar_day[14],prans_avar_day[15],prans_avar_day[16],prans_avar_day[17],prans_avar_day[18],prans_avar_day[19],prans_avar_day[20],prans_avar_day[21],prans_avar_day[22],prans_avar_day[23],
            prans_avar_day[24],prans_avar_day[25],prans_avar_day[26],prans_avar_day[27],prans_avar_day[28],prans_avar_day[29],prans_avar_day[30]]
    }, {
        name: 'Выключен',
        data: [prans_off_day[0], prans_off_day[1], prans_off_day[2],prans_off_day[3],prans_off_day[4],prans_off_day[5],prans_off_day[6],prans_off_day[7],prans_off_day[8],prans_off_day[9],prans_off_day[10],prans_off_day[11],
            prans_off_day[12],prans_off_day[13],prans_off_day[14],prans_off_day[15],prans_off_day[16],prans_off_day[17],prans_off_day[18],prans_off_day[19],prans_off_day[20],prans_off_day[21],prans_off_day[22],prans_off_day[23],
            prans_off_day[24],prans_off_day[25],prans_off_day[26],prans_off_day[27],prans_off_day[28],prans_off_day[29],prans_off_day[30]]
    }, {
        name: 'Ожидание',
        data: [prans_pause_day[0], prans_pause_day[1], prans_pause_day[2],prans_pause_day[3],prans_pause_day[4],prans_pause_day[5],prans_pause_day[6],prans_pause_day[7],prans_pause_day[8],prans_pause_day[9],prans_pause_day[10],prans_pause_day[11],
            prans_pause_day[12],prans_pause_day[13],prans_pause_day[14],prans_pause_day[15],prans_pause_day[16],prans_pause_day[17],prans_pause_day[18],prans_pause_day[19],prans_pause_day[20],prans_pause_day[21],prans_pause_day[22],prans_pause_day[23],
            prans_pause_day[24],prans_pause_day[25],prans_pause_day[26],prans_pause_day[27],prans_pause_day[28],prans_pause_day[29],prans_pause_day[30]]
    }, {
        name: 'Обработка',
        data: [prans_nagruzka_day[0], prans_nagruzka_day[1], prans_nagruzka_day[2],prans_nagruzka_day[3],prans_nagruzka_day[4],prans_nagruzka_day[5],prans_nagruzka_day[6],prans_nagruzka_day[7],prans_nagruzka_day[8],prans_nagruzka_day[9],prans_nagruzka_day[10],prans_nagruzka_day[11],
            prans_nagruzka_day[12],prans_nagruzka_day[13],prans_nagruzka_day[14],prans_nagruzka_day[15],prans_nagruzka_day[16],prans_nagruzka_day[17],prans_nagruzka_day[18],prans_nagruzka_day[19],prans_nagruzka_day[20],prans_nagruzka_day[21],prans_nagruzka_day[22],prans_nagruzka_day[23],
            prans_nagruzka_day[24],prans_nagruzka_day[25],prans_nagruzka_day[26],prans_nagruzka_day[27],prans_nagruzka_day[28],prans_nagruzka_day[29],prans_nagruzka_day[30]]
    }, {
        name: 'Работа',
        data: [prans_rabota_day[0], prans_rabota_day[1], prans_rabota_day[2],prans_rabota_day[3],prans_rabota_day[4],prans_rabota_day[5],prans_rabota_day[6],prans_rabota_day[7],prans_rabota_day[8],prans_rabota_day[9],prans_rabota_day[10],prans_rabota_day[11],
            prans_rabota_day[12],prans_rabota_day[13],prans_rabota_day[14],prans_rabota_day[15],prans_rabota_day[16],prans_rabota_day[17],prans_rabota_day[18],prans_rabota_day[19],prans_rabota_day[20],prans_rabota_day[21],prans_rabota_day[22],prans_rabota_day[23],
            prans_rabota_day[24],prans_rabota_day[25],prans_rabota_day[26],prans_rabota_day[27],prans_rabota_day[28],prans_rabota_day[29],prans_rabota_day[30]]
    }]
});

var colors = ['#38e817', '#ffea32', '#000000', '#e81e1d','#207210'];

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
    global: {
        timezoneOffset: new Date().getTimezoneOffset()
    }
});

Highcharts.chart('container_prans', {
    chart: {
        plotBackgroundColor: null,
        plotBorderWidth: null,
        plotShadow: false,
        type: 'pie'
    },

    title: {
        text: 'Загрузка оборудования'
    },
    tooltip: {
        pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
    },

    accessibility: {
        point: {
            valueSuffix: '%'
        }
    },
    plotOptions: {
        pie: {
            allowPointSelect: true,
            cursor: 'pointer',
            dataLabels: {
                enabled: false
            },
            showInLegend: true
        }
    },
    colors:colors,
    credits: {
        enabled: false
    },
    series : [ {
        type : 'pie',
        name : 'Показатель',
        data : [[ 'Работа', prans_work ], [ 'Включен', prans_pass ], [ 'Выключен', prans_fail],  [ 'В аварии', prans_avar ], [ 'Обработка', prans_nagruzka ] ]
    }]
});