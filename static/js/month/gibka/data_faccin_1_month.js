var colors = ['#e81e1d','#000000', '#ffea32','#207210','#38e817'];

Highcharts.chart('container_days1', {
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
        data: [faccin_1_avar_day[0], faccin_1_avar_day[1], faccin_1_avar_day[2],faccin_1_avar_day[3],faccin_1_avar_day[4],faccin_1_avar_day[5],faccin_1_avar_day[6],faccin_1_avar_day[7],faccin_1_avar_day[8],faccin_1_avar_day[9],faccin_1_avar_day[10],faccin_1_avar_day[11],
            faccin_1_avar_day[12],faccin_1_avar_day[13],faccin_1_avar_day[14],faccin_1_avar_day[15],faccin_1_avar_day[16],faccin_1_avar_day[17],faccin_1_avar_day[18],faccin_1_avar_day[19],faccin_1_avar_day[20],faccin_1_avar_day[21],faccin_1_avar_day[22],faccin_1_avar_day[23],
            faccin_1_avar_day[24],faccin_1_avar_day[25],faccin_1_avar_day[26],faccin_1_avar_day[27],faccin_1_avar_day[28],faccin_1_avar_day[29],faccin_1_avar_day[30]]
    }, {
        name: 'Выключен',
        data: [faccin_1_off_day[0], faccin_1_off_day[1], faccin_1_off_day[2],faccin_1_off_day[3],faccin_1_off_day[4],faccin_1_off_day[5],faccin_1_off_day[6],faccin_1_off_day[7],faccin_1_off_day[8],faccin_1_off_day[9],faccin_1_off_day[10],faccin_1_off_day[11],
            faccin_1_off_day[12],faccin_1_off_day[13],faccin_1_off_day[14],faccin_1_off_day[15],faccin_1_off_day[16],faccin_1_off_day[17],faccin_1_off_day[18],faccin_1_off_day[19],faccin_1_off_day[20],faccin_1_off_day[21],faccin_1_off_day[22],faccin_1_off_day[23],
            faccin_1_off_day[24],faccin_1_off_day[25],faccin_1_off_day[26],faccin_1_off_day[27],faccin_1_off_day[28],faccin_1_off_day[29],faccin_1_off_day[30]]
    }, {
        name: 'Ожидание',
        data: [faccin_1_pause_day[0], faccin_1_pause_day[1], faccin_1_pause_day[2],faccin_1_pause_day[3],faccin_1_pause_day[4],faccin_1_pause_day[5],faccin_1_pause_day[6],faccin_1_pause_day[7],faccin_1_pause_day[8],faccin_1_pause_day[9],faccin_1_pause_day[10],faccin_1_pause_day[11],
            faccin_1_pause_day[12],faccin_1_pause_day[13],faccin_1_pause_day[14],faccin_1_pause_day[15],faccin_1_pause_day[16],faccin_1_pause_day[17],faccin_1_pause_day[18],faccin_1_pause_day[19],faccin_1_pause_day[20],faccin_1_pause_day[21],faccin_1_pause_day[22],faccin_1_pause_day[23],
            faccin_1_pause_day[24],faccin_1_pause_day[25],faccin_1_pause_day[26],faccin_1_pause_day[27],faccin_1_pause_day[28],faccin_1_pause_day[29],faccin_1_pause_day[30]]
    }, {
        name: 'Нагрузка',
        data: [faccin_1_nagruzka_day[0], faccin_1_nagruzka_day[1], faccin_1_nagruzka_day[2],faccin_1_nagruzka_day[3],faccin_1_nagruzka_day[4],faccin_1_nagruzka_day[5],faccin_1_nagruzka_day[6],faccin_1_nagruzka_day[7],faccin_1_nagruzka_day[8],faccin_1_nagruzka_day[9],faccin_1_nagruzka_day[10],faccin_1_nagruzka_day[11],
            faccin_1_nagruzka_day[12],faccin_1_nagruzka_day[13],faccin_1_nagruzka_day[14],faccin_1_nagruzka_day[15],faccin_1_nagruzka_day[16],faccin_1_nagruzka_day[17],faccin_1_nagruzka_day[18],faccin_1_nagruzka_day[19],faccin_1_nagruzka_day[20],faccin_1_nagruzka_day[21],faccin_1_nagruzka_day[22],faccin_1_nagruzka_day[23],
            faccin_1_nagruzka_day[24],faccin_1_nagruzka_day[25],faccin_1_nagruzka_day[26],faccin_1_nagruzka_day[27],faccin_1_nagruzka_day[28],faccin_1_nagruzka_day[29],faccin_1_nagruzka_day[30]]
    }, {
        name: 'Работа',
        data: [faccin_1_rabota_day[0], faccin_1_rabota_day[1], faccin_1_rabota_day[2],faccin_1_rabota_day[3],faccin_1_rabota_day[4],faccin_1_rabota_day[5],faccin_1_rabota_day[6],faccin_1_rabota_day[7],faccin_1_rabota_day[8],faccin_1_rabota_day[9],faccin_1_rabota_day[10],faccin_1_rabota_day[11],
            faccin_1_rabota_day[12],faccin_1_rabota_day[13],faccin_1_rabota_day[14],faccin_1_rabota_day[15],faccin_1_rabota_day[16],faccin_1_rabota_day[17],faccin_1_rabota_day[18],faccin_1_rabota_day[19],faccin_1_rabota_day[20],faccin_1_rabota_day[21],faccin_1_rabota_day[22],faccin_1_rabota_day[23],
            faccin_1_rabota_day[24],faccin_1_rabota_day[25],faccin_1_rabota_day[26],faccin_1_rabota_day[27],faccin_1_rabota_day[28],faccin_1_rabota_day[29],faccin_1_rabota_day[30]]
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

Highcharts.chart('container', {
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
        data : [[ 'Работа', faccin_1_work ], [ 'Включен', faccin_1_pass ], [ 'Выключен', faccin_1_fail],  [ 'В аварии', faccin_1_avar ], [ 'Нагрузка', faccin_1_nagruzka ] ]
    }]
});