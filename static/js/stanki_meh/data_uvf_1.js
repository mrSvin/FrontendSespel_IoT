
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
    global: {
    timezoneOffset: timezone
}
});

    var colors = ['#38e817', '#ffea32', '#000000', '#e81e1d','#207210'];

    Highcharts.chart('container_work', {
    chart: {
    plotBackgroundColor: null,
    plotBorderWidth: null,
    plotShadow: false,
    borderColor: 'gray',
    type: 'xrange'
},
    title: {
    text: 'Работа оборудования'
},
    colors:colors,


    xAxis: {
    type: 'datetime'
},
    yAxis: {
    title: {
    text: ''
},
    categories: ['Работа', 'Ожидание', 'Выключен', 'В аварии', 'Нагрузка'],
    reversed: true
},
    credits: {
    enabled: false
},

    series: [
{
    name: 'Работа',
    borderColor: 'gray',
    pointWidth: 30,
    colorByPoint: false,
    color: '#38e817',
    tooltip: {
    pointFormat: '<b>Программа: {point.programname}</b>'
},

    data: [
        {
            x: (new Date(uvf_1_1_array_rabota[0])).getTime(),
            x2: (new Date(uvf_1_1_array_rabota[1])).getTime(),
            y: 0,
            programname: uvf_1_1_array_programname[0]
        },
        {
            x: (new Date(uvf_1_1_array_rabota[2])).getTime(),
            x2: (new Date(uvf_1_1_array_rabota[3])).getTime(),
            y: 0,
            programname: uvf_1_1_array_programname[1]
        },
        {
            x: (new Date(uvf_1_1_array_rabota[4])).getTime(),
            x2: (new Date(uvf_1_1_array_rabota[5])).getTime(),
            y: 0,
            programname: uvf_1_1_array_programname[2]
        },
        {
            x: (new Date(uvf_1_1_array_rabota[6])).getTime(),
            x2: (new Date(uvf_1_1_array_rabota[7])).getTime(),
            y: 0,
            programname: uvf_1_1_array_programname[3]
        },
        {
            x: (new Date(uvf_1_1_array_rabota[8])).getTime(),
            x2: (new Date(uvf_1_1_array_rabota[9])).getTime(),
            y: 0,
            programname: uvf_1_1_array_programname[4]
        },
        {
            x: (new Date(uvf_1_1_array_rabota[10])).getTime(),
            x2: (new Date(uvf_1_1_array_rabota[11])).getTime(),
            y: 0,
            programname: uvf_1_1_array_programname[5]
        },
        {
            x: (new Date(uvf_1_1_array_rabota[12])).getTime(),
            x2: (new Date(uvf_1_1_array_rabota[13])).getTime(),
            y: 0,
            programname: uvf_1_1_array_programname[6]
        },
        {
            x: (new Date(uvf_1_1_array_rabota[14])).getTime(),
            x2: (new Date(uvf_1_1_array_rabota[15])).getTime(),
            y: 0,
            programname: uvf_1_1_array_programname[7]
        },
        {
            x: (new Date(uvf_1_1_array_rabota[16])).getTime(),
            x2: (new Date(uvf_1_1_array_rabota[17])).getTime(),
            y: 0,
            programname: uvf_1_1_array_programname[8]
        },
        {
            x: (new Date(uvf_1_1_array_rabota[18])).getTime(),
            x2: (new Date(uvf_1_1_array_rabota[19])).getTime(),
            y: 0,
            programname: uvf_1_1_array_programname[9]
        },
        {
            x: (new Date(uvf_1_1_array_rabota[20])).getTime(),
            x2: (new Date(uvf_1_1_array_rabota[21])).getTime(),
            y: 0,
            programname: uvf_1_1_array_programname[10]
        },
        {
            x: (new Date(uvf_1_1_array_rabota[22])).getTime(),
            x2: (new Date(uvf_1_1_array_rabota[23])).getTime(),
            y: 0,
            programname: uvf_1_1_array_programname[11]
        },
        {
            x: (new Date(uvf_1_1_array_rabota[24])).getTime(),
            x2: (new Date(uvf_1_1_array_rabota[25])).getTime(),
            y: 0,
            programname: uvf_1_1_array_programname[12]
        },
        {
            x: (new Date(uvf_1_1_array_rabota[26])).getTime(),
            x2: (new Date(uvf_1_1_array_rabota[27])).getTime(),
            y: 0,
            programname: uvf_1_1_array_programname[13]
        },
        {
            x: (new Date(uvf_1_1_array_rabota[28])).getTime(),
            x2: (new Date(uvf_1_1_array_rabota[29])).getTime(),
            y: 0,
            programname: uvf_1_1_array_programname[14]
        },
        {
            x: (new Date(uvf_1_1_array_rabota[30])).getTime(),
            x2: (new Date(uvf_1_1_array_rabota[31])).getTime(),
            y: 0,
            programname: uvf_1_1_array_programname[15]
        },
        {
            x: (new Date(uvf_1_1_array_rabota[32])).getTime(),
            x2: (new Date(uvf_1_1_array_rabota[33])).getTime(),
            y: 0,
            programname: uvf_1_1_array_programname[16]
        },
        {
            x: (new Date(uvf_1_1_array_rabota[34])).getTime(),
            x2: (new Date(uvf_1_1_array_rabota[35])).getTime(),
            y: 0,
            programname: uvf_1_1_array_programname[17]
        },
        {
            x: (new Date(uvf_1_1_array_rabota[36])).getTime(),
            x2: (new Date(uvf_1_1_array_rabota[37])).getTime(),
            y: 0,
            programname: uvf_1_1_array_programname[18]
        },
        {
            x: (new Date(uvf_1_1_array_rabota[38])).getTime(),
            x2: (new Date(uvf_1_1_array_rabota[39])).getTime(),
            y: 0,
            programname: uvf_1_1_array_programname[19]
        },
        {
            x: (new Date(uvf_1_1_array_rabota[40])).getTime(),
            x2: (new Date(uvf_1_1_array_rabota[41])).getTime(),
            y: 0,
            programname: uvf_1_1_array_programname[20]
        },
        {
            x: (new Date(uvf_1_1_array_rabota[42])).getTime(),
            x2: (new Date(uvf_1_1_array_rabota[43])).getTime(),
            y: 0,
            programname: uvf_1_1_array_programname[21]
        },
        {
            x: (new Date(uvf_1_1_array_rabota[44])).getTime(),
            x2: (new Date(uvf_1_1_array_rabota[45])).getTime(),
            y: 0,
            programname: uvf_1_1_array_programname[22]
        },
        {
            x: (new Date(uvf_1_1_array_rabota[46])).getTime(),
            x2: (new Date(uvf_1_1_array_rabota[47])).getTime(),
            y: 0,
            programname: uvf_1_1_array_programname[23]
        },
        {
            x: (new Date(uvf_1_1_array_rabota[48])).getTime(),
            x2: (new Date(uvf_1_1_array_rabota[49])).getTime(),
            y: 0,
            programname: uvf_1_1_array_programname[24]
        },
        {
            x: (new Date(uvf_1_1_array_rabota[50])).getTime(),
            x2: (new Date(uvf_1_1_array_rabota[51])).getTime(),
            y: 0,
            programname: uvf_1_1_array_programname[25]
        },
        {
            x: (new Date(uvf_1_1_array_rabota[52])).getTime(),
            x2: (new Date(uvf_1_1_array_rabota[53])).getTime(),
            y: 0,
            programname: uvf_1_1_array_programname[26]
        },
        {
            x: (new Date(uvf_1_1_array_rabota[54])).getTime(),
            x2: (new Date(uvf_1_1_array_rabota[55])).getTime(),
            y: 0,
            programname: uvf_1_1_array_programname[27]
        },
        {
            x: (new Date(uvf_1_1_array_rabota[56])).getTime(),
            x2: (new Date(uvf_1_1_array_rabota[57])).getTime(),
            y: 0,
            programname: uvf_1_1_array_programname[28]
        },
        {
            x: (new Date(uvf_1_1_array_rabota[58])).getTime(),
            x2: (new Date(uvf_1_1_array_rabota[59])).getTime(),
            y: 0,
            programname: uvf_1_1_array_programname[29]
        },
        {
            x: (new Date(uvf_1_1_array_rabota[60])).getTime(),
            x2: (new Date(uvf_1_1_array_rabota[61])).getTime(),
            y: 0,
            programname: uvf_1_1_array_programname[30]
        },
        {
            x: (new Date(uvf_1_1_array_rabota[62])).getTime(),
            x2: (new Date(uvf_1_1_array_rabota[63])).getTime(),
            y: 0,
            programname: uvf_1_1_array_programname[31]
        },
        {
            x: (new Date(uvf_1_1_array_rabota[64])).getTime(),
            x2: (new Date(uvf_1_1_array_rabota[65])).getTime(),
            y: 0,
            programname: uvf_1_1_array_programname[32]
        },
        {
            x: (new Date(uvf_1_1_array_rabota[66])).getTime(),
            x2: (new Date(uvf_1_1_array_rabota[67])).getTime(),
            y: 0,
            programname: uvf_1_1_array_programname[33]
        },
        {
            x: (new Date(uvf_1_1_array_rabota[68])).getTime(),
            x2: (new Date(uvf_1_1_array_rabota[69])).getTime(),
            y: 0,
            programname: uvf_1_1_array_programname[34]
        },
        {
            x: (new Date(uvf_1_1_array_rabota[70])).getTime(),
            x2: (new Date(uvf_1_1_array_rabota[71])).getTime(),
            y: 0,
            programname: uvf_1_1_array_programname[35]
        },
        {
            x: (new Date(uvf_1_1_array_rabota[72])).getTime(),
            x2: (new Date(uvf_1_1_array_rabota[73])).getTime(),
            y: 0,
            programname: uvf_1_1_array_programname[36]
        },
        {
            x: (new Date(uvf_1_1_array_rabota[74])).getTime(),
            x2: (new Date(uvf_1_1_array_rabota[75])).getTime(),
            y: 0,
            programname: uvf_1_1_array_programname[37]
        },
        {
            x: (new Date(uvf_1_1_array_rabota[76])).getTime(),
            x2: (new Date(uvf_1_1_array_rabota[77])).getTime(),
            y: 0,
            programname: uvf_1_1_array_programname[38]
        },
        {
            x: (new Date(uvf_1_1_array_rabota[78])).getTime(),
            x2: (new Date(uvf_1_1_array_rabota[79])).getTime(),
            y: 0,
            programname: uvf_1_1_array_programname[39]
        },
        {
            x: (new Date(uvf_1_1_array_rabota[80])).getTime(),
            x2: (new Date(uvf_1_1_array_rabota[81])).getTime(),
            y: 0,
            programname: uvf_1_1_array_programname[40]
        },
        {
            x: (new Date(uvf_1_1_array_rabota[82])).getTime(),
            x2: (new Date(uvf_1_1_array_rabota[83])).getTime(),
            y: 0,
            programname: uvf_1_1_array_programname[41]
        },
        {
            x: (new Date(uvf_1_1_array_rabota[84])).getTime(),
            x2: (new Date(uvf_1_1_array_rabota[85])).getTime(),
            y: 0,
            programname: uvf_1_1_array_programname[42]
        },
        {
            x: (new Date(uvf_1_1_array_rabota[86])).getTime(),
            x2: (new Date(uvf_1_1_array_rabota[87])).getTime(),
            y: 0,
            programname: uvf_1_1_array_programname[43]
        },
        {
            x: (new Date(uvf_1_1_array_rabota[88])).getTime(),
            x2: (new Date(uvf_1_1_array_rabota[89])).getTime(),
            y: 0,
            programname: uvf_1_1_array_programname[44]
        },
        {
            x: (new Date(uvf_1_1_array_rabota[90])).getTime(),
            x2: (new Date(uvf_1_1_array_rabota[91])).getTime(),
            y: 0,
            programname: uvf_1_1_array_programname[45]
        },
        {
            x: (new Date(uvf_1_1_array_rabota[92])).getTime(),
            x2: (new Date(uvf_1_1_array_rabota[93])).getTime(),
            y: 0,
            programname: uvf_1_1_array_programname[46]
        },
        {
            x: (new Date(uvf_1_1_array_rabota[94])).getTime(),
            x2: (new Date(uvf_1_1_array_rabota[95])).getTime(),
            y: 0,
            programname: uvf_1_1_array_programname[47]
        },
        {
            x: (new Date(uvf_1_1_array_rabota[96])).getTime(),
            x2: (new Date(uvf_1_1_array_rabota[97])).getTime(),
            y: 0,
            programname: uvf_1_1_array_programname[48]
        },
    ],
},

        {
            name: 'Ожидание',
            pointWidth: 30,
            borderColor: 'gray',
            colorByPoint: false,
            color: '#ffea32',
            tooltip: {
                pointFormat: ''
            },
            data: [
                {
                    x: (new Date(uvf_1_1_array_pause[0])).getTime(),
                    x2: (new Date(uvf_1_1_array_pause[1])).getTime(),
                    y: 1
                },
                {
                    x: (new Date(uvf_1_1_array_pause[2])).getTime(),
                    x2: (new Date(uvf_1_1_array_pause[3])).getTime(),
                    y: 1
                },
                {
                    x: (new Date(uvf_1_1_array_pause[4])).getTime(),
                    x2: (new Date(uvf_1_1_array_pause[5])).getTime(),
                    y: 1
                },
                {
                    x: (new Date(uvf_1_1_array_pause[6])).getTime(),
                    x2: (new Date(uvf_1_1_array_pause[7])).getTime(),
                    y: 1
                },
                {
                    x: (new Date(uvf_1_1_array_pause[8])).getTime(),
                    x2: (new Date(uvf_1_1_array_pause[9])).getTime(),
                    y: 1
                },
                {
                    x: (new Date(uvf_1_1_array_pause[10])).getTime(),
                    x2: (new Date(uvf_1_1_array_pause[11])).getTime(),
                    y: 1
                },
                {
                    x: (new Date(uvf_1_1_array_pause[12])).getTime(),
                    x2: (new Date(uvf_1_1_array_pause[13])).getTime(),
                    y: 1
                },
                {
                    x: (new Date(uvf_1_1_array_pause[14])).getTime(),
                    x2: (new Date(uvf_1_1_array_pause[15])).getTime(),
                    y: 1
                },
                {
                    x: (new Date(uvf_1_1_array_pause[16])).getTime(),
                    x2: (new Date(uvf_1_1_array_pause[17])).getTime(),
                    y: 1
                },
                {
                    x: (new Date(uvf_1_1_array_pause[18])).getTime(),
                    x2: (new Date(uvf_1_1_array_pause[19])).getTime(),
                    y: 1
                },
                {
                    x: (new Date(uvf_1_1_array_pause[20])).getTime(),
                    x2: (new Date(uvf_1_1_array_pause[21])).getTime(),
                    y: 1
                },
                {
                    x: (new Date(uvf_1_1_array_pause[22])).getTime(),
                    x2: (new Date(uvf_1_1_array_pause[23])).getTime(),
                    y: 1
                },
                {
                    x: (new Date(uvf_1_1_array_pause[24])).getTime(),
                    x2: (new Date(uvf_1_1_array_pause[25])).getTime(),
                    y: 1
                },
                {
                    x: (new Date(uvf_1_1_array_pause[26])).getTime(),
                    x2: (new Date(uvf_1_1_array_pause[27])).getTime(),
                    y: 1
                },
                {
                    x: (new Date(uvf_1_1_array_pause[28])).getTime(),
                    x2: (new Date(uvf_1_1_array_pause[29])).getTime(),
                    y: 1
                },
                {
                    x: (new Date(uvf_1_1_array_pause[30])).getTime(),
                    x2: (new Date(uvf_1_1_array_pause[31])).getTime(),
                    y: 1
                },
                {
                    x: (new Date(uvf_1_1_array_pause[32])).getTime(),
                    x2: (new Date(uvf_1_1_array_pause[33])).getTime(),
                    y: 1
                },
                {
                    x: (new Date(uvf_1_1_array_pause[34])).getTime(),
                    x2: (new Date(uvf_1_1_array_pause[35])).getTime(),
                    y: 1
                },
                {
                    x: (new Date(uvf_1_1_array_pause[36])).getTime(),
                    x2: (new Date(uvf_1_1_array_pause[37])).getTime(),
                    y: 1
                },
                {
                    x: (new Date(uvf_1_1_array_pause[38])).getTime(),
                    x2: (new Date(uvf_1_1_array_pause[39])).getTime(),
                    y: 1
                },
                {
                    x: (new Date(uvf_1_1_array_pause[40])).getTime(),
                    x2: (new Date(uvf_1_1_array_pause[41])).getTime(),
                    y: 1
                },
                {
                    x: (new Date(uvf_1_1_array_pause[42])).getTime(),
                    x2: (new Date(uvf_1_1_array_pause[43])).getTime(),
                    y: 1
                },
                {
                    x: (new Date(uvf_1_1_array_pause[44])).getTime(),
                    x2: (new Date(uvf_1_1_array_pause[45])).getTime(),
                    y: 1
                },
                {
                    x: (new Date(uvf_1_1_array_pause[46])).getTime(),
                    x2: (new Date(uvf_1_1_array_pause[47])).getTime(),
                    y: 1
                },
                {
                    x: (new Date(uvf_1_1_array_pause[48])).getTime(),
                    x2: (new Date(uvf_1_1_array_pause[49])).getTime(),
                    y: 1
                },
                {
                    x: (new Date(uvf_1_1_array_pause[50])).getTime(),
                    x2: (new Date(uvf_1_1_array_pause[51])).getTime(),
                    y: 1
                },
                {
                    x: (new Date(uvf_1_1_array_pause[52])).getTime(),
                    x2: (new Date(uvf_1_1_array_pause[53])).getTime(),
                    y: 1
                },
                {
                    x: (new Date(uvf_1_1_array_pause[54])).getTime(),
                    x2: (new Date(uvf_1_1_array_pause[55])).getTime(),
                    y: 1
                },
                {
                    x: (new Date(uvf_1_1_array_pause[56])).getTime(),
                    x2: (new Date(uvf_1_1_array_pause[57])).getTime(),
                    y: 1
                },
                {
                    x: (new Date(uvf_1_1_array_pause[58])).getTime(),
                    x2: (new Date(uvf_1_1_array_pause[59])).getTime(),
                    y: 1
                },
                {
                    x: (new Date(uvf_1_1_array_pause[60])).getTime(),
                    x2: (new Date(uvf_1_1_array_pause[61])).getTime(),
                    y: 1
                },
                {
                    x: (new Date(uvf_1_1_array_pause[62])).getTime(),
                    x2: (new Date(uvf_1_1_array_pause[63])).getTime(),
                    y: 1
                },
                {
                    x: (new Date(uvf_1_1_array_pause[64])).getTime(),
                    x2: (new Date(uvf_1_1_array_pause[65])).getTime(),
                    y: 1
                },
                {
                    x: (new Date(uvf_1_1_array_pause[66])).getTime(),
                    x2: (new Date(uvf_1_1_array_pause[67])).getTime(),
                    y: 1
                },
                {
                    x: (new Date(uvf_1_1_array_pause[68])).getTime(),
                    x2: (new Date(uvf_1_1_array_pause[69])).getTime(),
                    y: 1
                },
                {
                    x: (new Date(uvf_1_1_array_pause[70])).getTime(),
                    x2: (new Date(uvf_1_1_array_pause[71])).getTime(),
                    y: 1
                },
                {
                    x: (new Date(uvf_1_1_array_pause[72])).getTime(),
                    x2: (new Date(uvf_1_1_array_pause[73])).getTime(),
                    y: 1
                },
                {
                    x: (new Date(uvf_1_1_array_pause[74])).getTime(),
                    x2: (new Date(uvf_1_1_array_pause[75])).getTime(),
                    y: 1
                },
                {
                    x: (new Date(uvf_1_1_array_pause[76])).getTime(),
                    x2: (new Date(uvf_1_1_array_pause[77])).getTime(),
                    y: 1
                },
                {
                    x: (new Date(uvf_1_1_array_pause[78])).getTime(),
                    x2: (new Date(uvf_1_1_array_pause[79])).getTime(),
                    y: 1
                },
                {
                    x: (new Date(uvf_1_1_array_pause[80])).getTime(),
                    x2: (new Date(uvf_1_1_array_pause[81])).getTime(),
                    y: 1
                },
                {
                    x: (new Date(uvf_1_1_array_pause[82])).getTime(),
                    x2: (new Date(uvf_1_1_array_pause[83])).getTime(),
                    y: 1
                },
                {
                    x: (new Date(uvf_1_1_array_pause[84])).getTime(),
                    x2: (new Date(uvf_1_1_array_pause[85])).getTime(),
                    y: 1
                },
                {
                    x: (new Date(uvf_1_1_array_pause[86])).getTime(),
                    x2: (new Date(uvf_1_1_array_pause[87])).getTime(),
                    y: 1
                },
                {
                    x: (new Date(uvf_1_1_array_pause[88])).getTime(),
                    x2: (new Date(uvf_1_1_array_pause[89])).getTime(),
                    y: 1
                },
                {
                    x: (new Date(uvf_1_1_array_pause[90])).getTime(),
                    x2: (new Date(uvf_1_1_array_pause[91])).getTime(),
                    y: 1
                },
                {
                    x: (new Date(uvf_1_1_array_pause[92])).getTime(),
                    x2: (new Date(uvf_1_1_array_pause[93])).getTime(),
                    y: 1
                },
                {
                    x: (new Date(uvf_1_1_array_pause[94])).getTime(),
                    x2: (new Date(uvf_1_1_array_pause[95])).getTime(),
                    y: 1
                },
                {
                    x: (new Date(uvf_1_1_array_pause[96])).getTime(),
                    x2: (new Date(uvf_1_1_array_pause[97])).getTime(),
                    y: 1
                },
            ],
            dataLabels: {
                enabled: true
            }
        },
        {
            name: 'Выключен',
            pointWidth: 20,
            colorByPoint: false,
            color: '#000000',
            data: [
                {x: (new Date(uvf_1_1_array_off[0])).getTime(), x2: (new Date(uvf_1_1_array_off[1])).getTime(), y: 2},
                {x: (new Date(uvf_1_1_array_off[2])).getTime(), x2: (new Date(uvf_1_1_array_off[3])).getTime(), y: 2},
                {x: (new Date(uvf_1_1_array_off[4])).getTime(), x2: (new Date(uvf_1_1_array_off[5])).getTime(), y: 2},
                {x: (new Date(uvf_1_1_array_off[6])).getTime(), x2: (new Date(uvf_1_1_array_off[7])).getTime(), y: 2},
                {x: (new Date(uvf_1_1_array_off[8])).getTime(), x2: (new Date(uvf_1_1_array_off[9])).getTime(), y: 2},
                {
                    x: (new Date(uvf_1_1_array_off[10])).getTime(),
                    x2: (new Date(uvf_1_1_array_off[11])).getTime(),
                    y: 2
                },
                {
                    x: (new Date(uvf_1_1_array_off[12])).getTime(),
                    x2: (new Date(uvf_1_1_array_off[13])).getTime(),
                    y: 2
                },
                {
                    x: (new Date(uvf_1_1_array_off[14])).getTime(),
                    x2: (new Date(uvf_1_1_array_off[15])).getTime(),
                    y: 2
                },
                {
                    x: (new Date(uvf_1_1_array_off[16])).getTime(),
                    x2: (new Date(uvf_1_1_array_off[17])).getTime(),
                    y: 2
                },
                {
                    x: (new Date(uvf_1_1_array_off[18])).getTime(),
                    x2: (new Date(uvf_1_1_array_off[19])).getTime(),
                    y: 2
                },
                {
                    x: (new Date(uvf_1_1_array_off[20])).getTime(),
                    x2: (new Date(uvf_1_1_array_off[21])).getTime(),
                    y: 2
                },
                {
                    x: (new Date(uvf_1_1_array_off[22])).getTime(),
                    x2: (new Date(uvf_1_1_array_off[23])).getTime(),
                    y: 2
                },
                {
                    x: (new Date(uvf_1_1_array_off[24])).getTime(),
                    x2: (new Date(uvf_1_1_array_off[25])).getTime(),
                    y: 2
                },
                {
                    x: (new Date(uvf_1_1_array_off[26])).getTime(),
                    x2: (new Date(uvf_1_1_array_off[27])).getTime(),
                    y: 2
                },
                {
                    x: (new Date(uvf_1_1_array_off[28])).getTime(),
                    x2: (new Date(uvf_1_1_array_off[29])).getTime(),
                    y: 2
                },
                {
                    x: (new Date(uvf_1_1_array_off[30])).getTime(),
                    x2: (new Date(uvf_1_1_array_off[31])).getTime(),
                    y: 2
                },
                {
                    x: (new Date(uvf_1_1_array_off[32])).getTime(),
                    x2: (new Date(uvf_1_1_array_off[33])).getTime(),
                    y: 2
                },
                {
                    x: (new Date(uvf_1_1_array_off[34])).getTime(),
                    x2: (new Date(uvf_1_1_array_off[35])).getTime(),
                    y: 2
                },
                {
                    x: (new Date(uvf_1_1_array_off[36])).getTime(),
                    x2: (new Date(uvf_1_1_array_off[37])).getTime(),
                    y: 2
                },
                {
                    x: (new Date(uvf_1_1_array_off[38])).getTime(),
                    x2: (new Date(uvf_1_1_array_off[39])).getTime(),
                    y: 2
                },
            ],
            dataLabels: {
                enabled: true,
            }
        },
        {
            name: 'В аварии',
            pointWidth: 20,
            colorByPoint: false,
            color: '#e81e1d',
            data: [
                {
                    x: (new Date(uvf_1_1_array_avar[0])).getTime(),
                    x2: (new Date(uvf_1_1_array_avar[1])).getTime(),
                    y: 3
                },
                {
                    x: (new Date(uvf_1_1_array_avar[2])).getTime(),
                    x2: (new Date(uvf_1_1_array_avar[3])).getTime(),
                    y: 3
                },
                {
                    x: (new Date(uvf_1_1_array_avar[4])).getTime(),
                    x2: (new Date(uvf_1_1_array_avar[5])).getTime(),
                    y: 3
                },
                {
                    x: (new Date(uvf_1_1_array_avar[6])).getTime(),
                    x2: (new Date(uvf_1_1_array_avar[7])).getTime(),
                    y: 3
                },
                {
                    x: (new Date(uvf_1_1_array_avar[8])).getTime(),
                    x2: (new Date(uvf_1_1_array_avar[9])).getTime(),
                    y: 3
                },
                {
                    x: (new Date(uvf_1_1_array_avar[10])).getTime(),
                    x2: (new Date(uvf_1_1_array_avar[11])).getTime(),
                    y: 3
                },
                {
                    x: (new Date(uvf_1_1_array_avar[12])).getTime(),
                    x2: (new Date(uvf_1_1_array_avar[13])).getTime(),
                    y: 3
                },
                {
                    x: (new Date(uvf_1_1_array_avar[14])).getTime(),
                    x2: (new Date(uvf_1_1_array_avar[15])).getTime(),
                    y: 3
                },
                {
                    x: (new Date(uvf_1_1_array_avar[16])).getTime(),
                    x2: (new Date(uvf_1_1_array_avar[17])).getTime(),
                    y: 3
                },
                {
                    x: (new Date(uvf_1_1_array_avar[18])).getTime(),
                    x2: (new Date(uvf_1_1_array_avar[19])).getTime(),
                    y: 3
                },
                {
                    x: (new Date(uvf_1_1_array_avar[20])).getTime(),
                    x2: (new Date(uvf_1_1_array_avar[21])).getTime(),
                    y: 3
                },
                {
                    x: (new Date(uvf_1_1_array_avar[22])).getTime(),
                    x2: (new Date(uvf_1_1_array_avar[23])).getTime(),
                    y: 3
                },
                {
                    x: (new Date(uvf_1_1_array_avar[24])).getTime(),
                    x2: (new Date(uvf_1_1_array_avar[25])).getTime(),
                    y: 3
                },
                {
                    x: (new Date(uvf_1_1_array_avar[26])).getTime(),
                    x2: (new Date(uvf_1_1_array_avar[27])).getTime(),
                    y: 3
                },
                {
                    x: (new Date(uvf_1_1_array_avar[28])).getTime(),
                    x2: (new Date(uvf_1_1_array_avar[29])).getTime(),
                    y: 3
                },
                {
                    x: (new Date(uvf_1_1_array_avar[30])).getTime(),
                    x2: (new Date(uvf_1_1_array_avar[31])).getTime(),
                    y: 3
                },
                {
                    x: (new Date(uvf_1_1_array_avar[32])).getTime(),
                    x2: (new Date(uvf_1_1_array_avar[33])).getTime(),
                    y: 3
                },
                {
                    x: (new Date(uvf_1_1_array_avar[34])).getTime(),
                    x2: (new Date(uvf_1_1_array_avar[35])).getTime(),
                    y: 3
                },
                {
                    x: (new Date(uvf_1_1_array_avar[36])).getTime(),
                    x2: (new Date(uvf_1_1_array_avar[37])).getTime(),
                    y: 3
                },
                {
                    x: (new Date(uvf_1_1_array_avar[38])).getTime(),
                    x2: (new Date(uvf_1_1_array_avar[39])).getTime(),
                    y: 3
                },
                {
                    x: (new Date(uvf_1_1_array_avar[40])).getTime(),
                    x2: (new Date(uvf_1_1_array_avar[41])).getTime(),
                    y: 3
                },
                {
                    x: (new Date(uvf_1_1_array_avar[42])).getTime(),
                    x2: (new Date(uvf_1_1_array_avar[43])).getTime(),
                    y: 3
                },
                {
                    x: (new Date(uvf_1_1_array_avar[44])).getTime(),
                    x2: (new Date(uvf_1_1_array_avar[45])).getTime(),
                    y: 3
                },
                {
                    x: (new Date(uvf_1_1_array_avar[46])).getTime(),
                    x2: (new Date(uvf_1_1_array_avar[47])).getTime(),
                    y: 3
                },
                {
                    x: (new Date(uvf_1_1_array_avar[48])).getTime(),
                    x2: (new Date(uvf_1_1_array_avar[49])).getTime(),
                    y: 3
                },
                {
                    x: (new Date(uvf_1_1_array_avar[50])).getTime(),
                    x2: (new Date(uvf_1_1_array_avar[51])).getTime(),
                    y: 3
                },
                {
                    x: (new Date(uvf_1_1_array_avar[52])).getTime(),
                    x2: (new Date(uvf_1_1_array_avar[53])).getTime(),
                    y: 3
                },
                {
                    x: (new Date(uvf_1_1_array_avar[54])).getTime(),
                    x2: (new Date(uvf_1_1_array_avar[55])).getTime(),
                    y: 3
                },
                {
                    x: (new Date(uvf_1_1_array_avar[56])).getTime(),
                    x2: (new Date(uvf_1_1_array_avar[57])).getTime(),
                    y: 3
                },
                {
                    x: (new Date(uvf_1_1_array_avar[58])).getTime(),
                    x2: (new Date(uvf_1_1_array_avar[59])).getTime(),
                    y: 3
                },
                {
                    x: (new Date(uvf_1_1_array_avar[60])).getTime(),
                    x2: (new Date(uvf_1_1_array_avar[61])).getTime(),
                    y: 3
                },
                {
                    x: (new Date(uvf_1_1_array_avar[62])).getTime(),
                    x2: (new Date(uvf_1_1_array_avar[63])).getTime(),
                    y: 3
                },
                {
                    x: (new Date(uvf_1_1_array_avar[64])).getTime(),
                    x2: (new Date(uvf_1_1_array_avar[65])).getTime(),
                    y: 3
                },
                {
                    x: (new Date(uvf_1_1_array_avar[66])).getTime(),
                    x2: (new Date(uvf_1_1_array_avar[67])).getTime(),
                    y: 3
                },
                {
                    x: (new Date(uvf_1_1_array_avar[68])).getTime(),
                    x2: (new Date(uvf_1_1_array_avar[69])).getTime(),
                    y: 3
                },
                {
                    x: (new Date(uvf_1_1_array_avar[70])).getTime(),
                    x2: (new Date(uvf_1_1_array_avar[71])).getTime(),
                    y: 3
                },
                {
                    x: (new Date(uvf_1_1_array_avar[72])).getTime(),
                    x2: (new Date(uvf_1_1_array_avar[73])).getTime(),
                    y: 3
                },
                {
                    x: (new Date(uvf_1_1_array_avar[74])).getTime(),
                    x2: (new Date(uvf_1_1_array_avar[75])).getTime(),
                    y: 3
                },
                {
                    x: (new Date(uvf_1_1_array_avar[76])).getTime(),
                    x2: (new Date(uvf_1_1_array_avar[77])).getTime(),
                    y: 3
                },
                {
                    x: (new Date(uvf_1_1_array_avar[78])).getTime(),
                    x2: (new Date(uvf_1_1_array_avar[79])).getTime(),
                    y: 3
                },
                {
                    x: (new Date(uvf_1_1_array_avar[80])).getTime(),
                    x2: (new Date(uvf_1_1_array_avar[81])).getTime(),
                    y: 3
                },
                {
                    x: (new Date(uvf_1_1_array_avar[82])).getTime(),
                    x2: (new Date(uvf_1_1_array_avar[83])).getTime(),
                    y: 3
                },
                {
                    x: (new Date(uvf_1_1_array_avar[84])).getTime(),
                    x2: (new Date(uvf_1_1_array_avar[85])).getTime(),
                    y: 3
                },
                {
                    x: (new Date(uvf_1_1_array_avar[86])).getTime(),
                    x2: (new Date(uvf_1_1_array_avar[87])).getTime(),
                    y: 3
                },
                {
                    x: (new Date(uvf_1_1_array_avar[88])).getTime(),
                    x2: (new Date(uvf_1_1_array_avar[89])).getTime(),
                    y: 3
                },
                {
                    x: (new Date(uvf_1_1_array_avar[90])).getTime(),
                    x2: (new Date(uvf_1_1_array_avar[91])).getTime(),
                    y: 3
                },
                {
                    x: (new Date(uvf_1_1_array_avar[92])).getTime(),
                    x2: (new Date(uvf_1_1_array_avar[93])).getTime(),
                    y: 3
                },
                {
                    x: (new Date(uvf_1_1_array_avar[94])).getTime(),
                    x2: (new Date(uvf_1_1_array_avar[95])).getTime(),
                    y: 3
                },
                {
                    x: (new Date(uvf_1_1_array_avar[96])).getTime(),
                    x2: (new Date(uvf_1_1_array_avar[97])).getTime(),
                    y: 3
                },
            ],

            dataLabels: {
                enabled: true
            }
        },

        {
            name: 'Нагрузка',
            pointWidth: 20,
            colorByPoint: false,
            color: '#24621d',
            data: [
                {
                    x: (new Date(uvf_1_1_array_nagruzka[0])).getTime(),
                    x2: (new Date(uvf_1_1_array_nagruzka[1])).getTime(),
                    y: 4
                },
                {
                    x: (new Date(uvf_1_1_array_nagruzka[2])).getTime(),
                    x2: (new Date(uvf_1_1_array_nagruzka[3])).getTime(),
                    y: 4
                },
                {
                    x: (new Date(uvf_1_1_array_nagruzka[4])).getTime(),
                    x2: (new Date(uvf_1_1_array_nagruzka[5])).getTime(),
                    y: 4
                },
                {
                    x: (new Date(uvf_1_1_array_nagruzka[6])).getTime(),
                    x2: (new Date(uvf_1_1_array_nagruzka[7])).getTime(),
                    y: 4
                },
                {
                    x: (new Date(uvf_1_1_array_nagruzka[8])).getTime(),
                    x2: (new Date(uvf_1_1_array_nagruzka[9])).getTime(),
                    y: 4
                },
                {
                    x: (new Date(uvf_1_1_array_nagruzka[10])).getTime(),
                    x2: (new Date(uvf_1_1_array_nagruzka[11])).getTime(),
                    y: 4
                },
                {
                    x: (new Date(uvf_1_1_array_nagruzka[12])).getTime(),
                    x2: (new Date(uvf_1_1_array_nagruzka[13])).getTime(),
                    y: 4
                },
                {
                    x: (new Date(uvf_1_1_array_nagruzka[14])).getTime(),
                    x2: (new Date(uvf_1_1_array_nagruzka[15])).getTime(),
                    y: 4
                },
                {
                    x: (new Date(uvf_1_1_array_nagruzka[16])).getTime(),
                    x2: (new Date(uvf_1_1_array_nagruzka[17])).getTime(),
                    y: 4
                },
                {
                    x: (new Date(uvf_1_1_array_nagruzka[18])).getTime(),
                    x2: (new Date(uvf_1_1_array_nagruzka[19])).getTime(),
                    y: 4
                },
                {
                    x: (new Date(uvf_1_1_array_nagruzka[20])).getTime(),
                    x2: (new Date(uvf_1_1_array_nagruzka[21])).getTime(),
                    y: 4
                },
                {
                    x: (new Date(uvf_1_1_array_nagruzka[22])).getTime(),
                    x2: (new Date(uvf_1_1_array_nagruzka[23])).getTime(),
                    y: 4
                },
                {
                    x: (new Date(uvf_1_1_array_nagruzka[24])).getTime(),
                    x2: (new Date(uvf_1_1_array_nagruzka[25])).getTime(),
                    y: 4
                },
                {
                    x: (new Date(uvf_1_1_array_nagruzka[26])).getTime(),
                    x2: (new Date(uvf_1_1_array_nagruzka[27])).getTime(),
                    y: 4
                },
                {
                    x: (new Date(uvf_1_1_array_nagruzka[28])).getTime(),
                    x2: (new Date(uvf_1_1_array_nagruzka[29])).getTime(),
                    y: 4
                },
                {
                    x: (new Date(uvf_1_1_array_nagruzka[30])).getTime(),
                    x2: (new Date(uvf_1_1_array_nagruzka[31])).getTime(),
                    y: 4
                },
                {
                    x: (new Date(uvf_1_1_array_nagruzka[32])).getTime(),
                    x2: (new Date(uvf_1_1_array_nagruzka[33])).getTime(),
                    y: 4
                },
                {
                    x: (new Date(uvf_1_1_array_nagruzka[34])).getTime(),
                    x2: (new Date(uvf_1_1_array_nagruzka[35])).getTime(),
                    y: 4
                },
                {
                    x: (new Date(uvf_1_1_array_nagruzka[36])).getTime(),
                    x2: (new Date(uvf_1_1_array_nagruzka[37])).getTime(),
                    y: 4
                },
                {
                    x: (new Date(uvf_1_1_array_nagruzka[38])).getTime(),
                    x2: (new Date(uvf_1_1_array_nagruzka[39])).getTime(),
                    y: 4
                },
                {
                    x: (new Date(uvf_1_1_array_nagruzka[40])).getTime(),
                    x2: (new Date(uvf_1_1_array_nagruzka[41])).getTime(),
                    y: 4
                },
                {
                    x: (new Date(uvf_1_1_array_nagruzka[42])).getTime(),
                    x2: (new Date(uvf_1_1_array_nagruzka[43])).getTime(),
                    y: 4
                },
                {
                    x: (new Date(uvf_1_1_array_nagruzka[44])).getTime(),
                    x2: (new Date(uvf_1_1_array_nagruzka[45])).getTime(),
                    y: 4
                },
                {
                    x: (new Date(uvf_1_1_array_nagruzka[46])).getTime(),
                    x2: (new Date(uvf_1_1_array_nagruzka[47])).getTime(),
                    y: 4
                },
                {
                    x: (new Date(uvf_1_1_array_nagruzka[48])).getTime(),
                    x2: (new Date(uvf_1_1_array_nagruzka[49])).getTime(),
                    y: 4
                },
                {
                    x: (new Date(uvf_1_1_array_nagruzka[50])).getTime(),
                    x2: (new Date(uvf_1_1_array_nagruzka[51])).getTime(),
                    y: 4
                },
                {
                    x: (new Date(uvf_1_1_array_nagruzka[52])).getTime(),
                    x2: (new Date(uvf_1_1_array_nagruzka[53])).getTime(),
                    y: 4
                },
                {
                    x: (new Date(uvf_1_1_array_nagruzka[54])).getTime(),
                    x2: (new Date(uvf_1_1_array_nagruzka[55])).getTime(),
                    y: 4
                },
                {
                    x: (new Date(uvf_1_1_array_nagruzka[56])).getTime(),
                    x2: (new Date(uvf_1_1_array_nagruzka[57])).getTime(),
                    y: 4
                },
                {
                    x: (new Date(uvf_1_1_array_nagruzka[58])).getTime(),
                    x2: (new Date(uvf_1_1_array_nagruzka[59])).getTime(),
                    y: 4
                },
                {
                    x: (new Date(uvf_1_1_array_nagruzka[60])).getTime(),
                    x2: (new Date(uvf_1_1_array_nagruzka[61])).getTime(),
                    y: 4
                },
                {
                    x: (new Date(uvf_1_1_array_nagruzka[62])).getTime(),
                    x2: (new Date(uvf_1_1_array_nagruzka[63])).getTime(),
                    y: 4
                },
                {
                    x: (new Date(uvf_1_1_array_nagruzka[64])).getTime(),
                    x2: (new Date(uvf_1_1_array_nagruzka[65])).getTime(),
                    y: 4
                },
                {
                    x: (new Date(uvf_1_1_array_nagruzka[66])).getTime(),
                    x2: (new Date(uvf_1_1_array_nagruzka[67])).getTime(),
                    y: 4
                },
                {
                    x: (new Date(uvf_1_1_array_nagruzka[68])).getTime(),
                    x2: (new Date(uvf_1_1_array_nagruzka[69])).getTime(),
                    y: 4
                },
                {
                    x: (new Date(uvf_1_1_array_nagruzka[70])).getTime(),
                    x2: (new Date(uvf_1_1_array_nagruzka[71])).getTime(),
                    y: 4
                },
                {
                    x: (new Date(uvf_1_1_array_nagruzka[72])).getTime(),
                    x2: (new Date(uvf_1_1_array_nagruzka[73])).getTime(),
                    y: 4
                },
                {
                    x: (new Date(uvf_1_1_array_nagruzka[74])).getTime(),
                    x2: (new Date(uvf_1_1_array_nagruzka[75])).getTime(),
                    y: 4
                },
                {
                    x: (new Date(uvf_1_1_array_nagruzka[76])).getTime(),
                    x2: (new Date(uvf_1_1_array_nagruzka[77])).getTime(),
                    y: 4
                },
                {
                    x: (new Date(uvf_1_1_array_nagruzka[78])).getTime(),
                    x2: (new Date(uvf_1_1_array_nagruzka[79])).getTime(),
                    y: 4
                },
                {
                    x: (new Date(uvf_1_1_array_nagruzka[80])).getTime(),
                    x2: (new Date(uvf_1_1_array_nagruzka[81])).getTime(),
                    y: 4
                },
                {
                    x: (new Date(uvf_1_1_array_nagruzka[82])).getTime(),
                    x2: (new Date(uvf_1_1_array_nagruzka[83])).getTime(),
                    y: 4
                },
                {
                    x: (new Date(uvf_1_1_array_nagruzka[84])).getTime(),
                    x2: (new Date(uvf_1_1_array_nagruzka[85])).getTime(),
                    y: 4
                },
                {
                    x: (new Date(uvf_1_1_array_nagruzka[86])).getTime(),
                    x2: (new Date(uvf_1_1_array_nagruzka[87])).getTime(),
                    y: 4
                },
                {
                    x: (new Date(uvf_1_1_array_nagruzka[88])).getTime(),
                    x2: (new Date(uvf_1_1_array_nagruzka[89])).getTime(),
                    y: 4
                },
                {
                    x: (new Date(uvf_1_1_array_nagruzka[90])).getTime(),
                    x2: (new Date(uvf_1_1_array_nagruzka[91])).getTime(),
                    y: 4
                },
                {
                    x: (new Date(uvf_1_1_array_nagruzka[92])).getTime(),
                    x2: (new Date(uvf_1_1_array_nagruzka[93])).getTime(),
                    y: 4
                },
                {
                    x: (new Date(uvf_1_1_array_nagruzka[94])).getTime(),
                    x2: (new Date(uvf_1_1_array_nagruzka[95])).getTime(),
                    y: 4
                },
                {
                    x: (new Date(uvf_1_1_array_nagruzka[96])).getTime(),
                    x2: (new Date(uvf_1_1_array_nagruzka[97])).getTime(),
                    y: 4
                },
            ],
            dataLabels: {
                enabled: true
            }
        },

    ]


    });

    var colors = ['#38e817', '#ffea32', '#000000', '#e81e1d','#207210'];
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
            data : [ [ 'По программе', uvf_1_1_work ], [ 'Включен', uvf_1_1_pass ], [ 'Выключен', uvf_1_1_fail ],  [ 'В аварии', uvf_1_1_avar],  [ 'Нагрузка', uvf_1_1_nagruzka],   ]
        }]
    });
