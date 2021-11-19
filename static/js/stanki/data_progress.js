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

<!-- линейная диагрмма загрузки оборудования-->
var colors = ['#38e817', '#ffea32', '#000000', '#e81e1d'];
Highcharts.chart('container_work2', {
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
    colors: colors,


    xAxis: {
        type: 'datetime'
    },
    yAxis: {
        title: {
            text: ''
        },
        categories: ['Работа', 'Ожидание', 'Выключен', 'В аварии'],
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

            data:   [
                {x:  (new Date(progress_array_rabota[0])).getTime(), x2: (new Date(progress_array_rabota[1])).getTime(),  y: 0, programname: progress_array_programname[0]},
                {x:  (new Date(progress_array_rabota[2])).getTime(), x2: (new Date(progress_array_rabota[3])).getTime(),  y: 0, programname: progress_array_programname[1]},
                {x:  (new Date(progress_array_rabota[4])).getTime(), x2: (new Date(progress_array_rabota[5])).getTime(),  y: 0, programname: progress_array_programname[2]},
                {x:  (new Date(progress_array_rabota[6])).getTime(), x2: (new Date(progress_array_rabota[7])).getTime(),  y: 0, programname: progress_array_programname[3]},
                {x:  (new Date(progress_array_rabota[8])).getTime(), x2: (new Date(progress_array_rabota[9])).getTime(),  y: 0, programname: progress_array_programname[4]},
                {x:  (new Date(progress_array_rabota[10])).getTime(), x2: (new Date(progress_array_rabota[11])).getTime(),  y: 0, programname: progress_array_programname[5]},
                {x:  (new Date(progress_array_rabota[12])).getTime(), x2: (new Date(progress_array_rabota[13])).getTime(),  y: 0, programname: progress_array_programname[6]},
                {x:  (new Date(progress_array_rabota[14])).getTime(), x2: (new Date(progress_array_rabota[15])).getTime(),  y: 0, programname: progress_array_programname[7]},
                {x:  (new Date(progress_array_rabota[16])).getTime(), x2: (new Date(progress_array_rabota[17])).getTime(),  y: 0, programname: progress_array_programname[8]},
                {x:  (new Date(progress_array_rabota[18])).getTime(), x2: (new Date(progress_array_rabota[19])).getTime(),  y: 0, programname: progress_array_programname[9]},
                {x:  (new Date(progress_array_rabota[20])).getTime(), x2: (new Date(progress_array_rabota[21])).getTime(),  y: 0, programname: progress_array_programname[10]},
                {x:  (new Date(progress_array_rabota[22])).getTime(), x2: (new Date(progress_array_rabota[23])).getTime(),  y: 0, programname: progress_array_programname[11]},
                {x:  (new Date(progress_array_rabota[24])).getTime(), x2: (new Date(progress_array_rabota[25])).getTime(),  y: 0, programname: progress_array_programname[12]},
                {x:  (new Date(progress_array_rabota[26])).getTime(), x2: (new Date(progress_array_rabota[27])).getTime(),  y: 0, programname: progress_array_programname[13]},
                {x:  (new Date(progress_array_rabota[28])).getTime(), x2: (new Date(progress_array_rabota[29])).getTime(),  y: 0, programname: progress_array_programname[14]},
                {x:  (new Date(progress_array_rabota[30])).getTime(), x2: (new Date(progress_array_rabota[31])).getTime(),  y: 0, programname: progress_array_programname[15]},
                {x:  (new Date(progress_array_rabota[32])).getTime(), x2: (new Date(progress_array_rabota[33])).getTime(),  y: 0, programname: progress_array_programname[16]},
                {x:  (new Date(progress_array_rabota[34])).getTime(), x2: (new Date(progress_array_rabota[35])).getTime(),  y: 0, programname: progress_array_programname[17]},
                {x:  (new Date(progress_array_rabota[36])).getTime(), x2: (new Date(progress_array_rabota[37])).getTime(),  y: 0, programname: progress_array_programname[18]},
                {x:  (new Date(progress_array_rabota[38])).getTime(), x2: (new Date(progress_array_rabota[39])).getTime(),  y: 0, programname: progress_array_programname[19]},
                {x:  (new Date(progress_array_rabota[40])).getTime(), x2: (new Date(progress_array_rabota[41])).getTime(),  y: 0, programname: progress_array_programname[20]},
                {x:  (new Date(progress_array_rabota[42])).getTime(), x2: (new Date(progress_array_rabota[43])).getTime(),  y: 0, programname: progress_array_programname[21]},
                {x:  (new Date(progress_array_rabota[44])).getTime(), x2: (new Date(progress_array_rabota[45])).getTime(),  y: 0, programname: progress_array_programname[22]},
                {x:  (new Date(progress_array_rabota[46])).getTime(), x2: (new Date(progress_array_rabota[47])).getTime(),  y: 0, programname: progress_array_programname[23]},
                {x:  (new Date(progress_array_rabota[48])).getTime(), x2: (new Date(progress_array_rabota[49])).getTime(),  y: 0, programname: progress_array_programname[24]},
                {x:  (new Date(progress_array_rabota[50])).getTime(), x2: (new Date(progress_array_rabota[51])).getTime(),  y: 0, programname: progress_array_programname[25]},
                {x:  (new Date(progress_array_rabota[52])).getTime(), x2: (new Date(progress_array_rabota[53])).getTime(),  y: 0, programname: progress_array_programname[26]},
                {x:  (new Date(progress_array_rabota[54])).getTime(), x2: (new Date(progress_array_rabota[55])).getTime(),  y: 0, programname: progress_array_programname[27]},
                {x:  (new Date(progress_array_rabota[56])).getTime(), x2: (new Date(progress_array_rabota[57])).getTime(),  y: 0, programname: progress_array_programname[28]},
                {x:  (new Date(progress_array_rabota[58])).getTime(), x2: (new Date(progress_array_rabota[59])).getTime(),  y: 0, programname: progress_array_programname[29]},
                {x:  (new Date(progress_array_rabota[60])).getTime(), x2: (new Date(progress_array_rabota[61])).getTime(),  y: 0, programname: progress_array_programname[30]},
                {x:  (new Date(progress_array_rabota[62])).getTime(), x2: (new Date(progress_array_rabota[63])).getTime(),  y: 0, programname: progress_array_programname[31]},
                {x:  (new Date(progress_array_rabota[64])).getTime(), x2: (new Date(progress_array_rabota[65])).getTime(),  y: 0, programname: progress_array_programname[32]},
                {x:  (new Date(progress_array_rabota[66])).getTime(), x2: (new Date(progress_array_rabota[67])).getTime(),  y: 0, programname: progress_array_programname[33]},
                {x:  (new Date(progress_array_rabota[68])).getTime(), x2: (new Date(progress_array_rabota[69])).getTime(),  y: 0, programname: progress_array_programname[34]},
                {x:  (new Date(progress_array_rabota[70])).getTime(), x2: (new Date(progress_array_rabota[71])).getTime(),  y: 0, programname: progress_array_programname[35]},
                {x:  (new Date(progress_array_rabota[72])).getTime(), x2: (new Date(progress_array_rabota[73])).getTime(),  y: 0, programname: progress_array_programname[36]},
                {x:  (new Date(progress_array_rabota[74])).getTime(), x2: (new Date(progress_array_rabota[75])).getTime(),  y: 0, programname: progress_array_programname[37]},
                {x:  (new Date(progress_array_rabota[76])).getTime(), x2: (new Date(progress_array_rabota[77])).getTime(),  y: 0, programname: progress_array_programname[38]},
                {x:  (new Date(progress_array_rabota[78])).getTime(), x2: (new Date(progress_array_rabota[79])).getTime(),  y: 0, programname: progress_array_programname[39]},
                {x:  (new Date(progress_array_rabota[80])).getTime(), x2: (new Date(progress_array_rabota[81])).getTime(),  y: 0, programname: progress_array_programname[40]},
                {x:  (new Date(progress_array_rabota[82])).getTime(), x2: (new Date(progress_array_rabota[83])).getTime(),  y: 0, programname: progress_array_programname[41]},
                {x:  (new Date(progress_array_rabota[84])).getTime(), x2: (new Date(progress_array_rabota[85])).getTime(),  y: 0, programname: progress_array_programname[42]},
                {x:  (new Date(progress_array_rabota[86])).getTime(), x2: (new Date(progress_array_rabota[87])).getTime(),  y: 0, programname: progress_array_programname[43]},
                {x:  (new Date(progress_array_rabota[88])).getTime(), x2: (new Date(progress_array_rabota[89])).getTime(),  y: 0, programname: progress_array_programname[44]},
                {x:  (new Date(progress_array_rabota[90])).getTime(), x2: (new Date(progress_array_rabota[91])).getTime(),  y: 0, programname: progress_array_programname[45]},
                {x:  (new Date(progress_array_rabota[92])).getTime(), x2: (new Date(progress_array_rabota[93])).getTime(),  y: 0, programname: progress_array_programname[46]},
                {x:  (new Date(progress_array_rabota[94])).getTime(), x2: (new Date(progress_array_rabota[95])).getTime(),  y: 0, programname: progress_array_programname[47]},
                {x:  (new Date(progress_array_rabota[96])).getTime(), x2: (new Date(progress_array_rabota[97])).getTime(),  y: 0, programname: progress_array_programname[48]},
                {x:  (new Date(progress_array_rabota[98])).getTime(), x2: (new Date(progress_array_rabota[99])).getTime(),  y: 0, programname: progress_array_programname[49]},
                {x:  (new Date(progress_array_rabota[100])).getTime(), x2: (new Date(progress_array_rabota[101])).getTime(),  y: 0, programname: progress_array_programname[50]},
                {x:  (new Date(progress_array_rabota[102])).getTime(), x2: (new Date(progress_array_rabota[103])).getTime(),  y: 0, programname: progress_array_programname[51]},
                {x:  (new Date(progress_array_rabota[104])).getTime(), x2: (new Date(progress_array_rabota[105])).getTime(),  y: 0, programname: progress_array_programname[52]},
                {x:  (new Date(progress_array_rabota[106])).getTime(), x2: (new Date(progress_array_rabota[107])).getTime(),  y: 0, programname: progress_array_programname[53]},
                {x:  (new Date(progress_array_rabota[108])).getTime(), x2: (new Date(progress_array_rabota[109])).getTime(),  y: 0, programname: progress_array_programname[54]},
                {x:  (new Date(progress_array_rabota[110])).getTime(), x2: (new Date(progress_array_rabota[111])).getTime(),  y: 0, programname: progress_array_programname[55]},
                {x:  (new Date(progress_array_rabota[112])).getTime(), x2: (new Date(progress_array_rabota[113])).getTime(),  y: 0, programname: progress_array_programname[56]},
                {x:  (new Date(progress_array_rabota[114])).getTime(), x2: (new Date(progress_array_rabota[115])).getTime(),  y: 0, programname: progress_array_programname[57]},
                {x:  (new Date(progress_array_rabota[116])).getTime(), x2: (new Date(progress_array_rabota[117])).getTime(),  y: 0, programname: progress_array_programname[58]},
                {x:  (new Date(progress_array_rabota[118])).getTime(), x2: (new Date(progress_array_rabota[119])).getTime(),  y: 0, programname: progress_array_programname[59]},
                {x:  (new Date(progress_array_rabota[120])).getTime(), x2: (new Date(progress_array_rabota[121])).getTime(),  y: 0, programname: progress_array_programname[60]},
                {x:  (new Date(progress_array_rabota[122])).getTime(), x2: (new Date(progress_array_rabota[123])).getTime(),  y: 0, programname: progress_array_programname[61]},
                {x:  (new Date(progress_array_rabota[124])).getTime(), x2: (new Date(progress_array_rabota[125])).getTime(),  y: 0, programname: progress_array_programname[62]},
                {x:  (new Date(progress_array_rabota[126])).getTime(), x2: (new Date(progress_array_rabota[127])).getTime(),  y: 0, programname: progress_array_programname[63]},
                {x:  (new Date(progress_array_rabota[128])).getTime(), x2: (new Date(progress_array_rabota[129])).getTime(),  y: 0, programname: progress_array_programname[64]},
                {x:  (new Date(progress_array_rabota[130])).getTime(), x2: (new Date(progress_array_rabota[131])).getTime(),  y: 0, programname: progress_array_programname[65]},
                {x:  (new Date(progress_array_rabota[132])).getTime(), x2: (new Date(progress_array_rabota[133])).getTime(),  y: 0, programname: progress_array_programname[66]},
                {x:  (new Date(progress_array_rabota[134])).getTime(), x2: (new Date(progress_array_rabota[135])).getTime(),  y: 0, programname: progress_array_programname[67]},
                {x:  (new Date(progress_array_rabota[136])).getTime(), x2: (new Date(progress_array_rabota[137])).getTime(),  y: 0, programname: progress_array_programname[68]},
                {x:  (new Date(progress_array_rabota[138])).getTime(), x2: (new Date(progress_array_rabota[139])).getTime(),  y: 0, programname: progress_array_programname[69]},
                {x:  (new Date(progress_array_rabota[140])).getTime(), x2: (new Date(progress_array_rabota[141])).getTime(),  y: 0, programname: progress_array_programname[70]},
                {x:  (new Date(progress_array_rabota[142])).getTime(), x2: (new Date(progress_array_rabota[143])).getTime(),  y: 0, programname: progress_array_programname[71]},
                {x:  (new Date(progress_array_rabota[144])).getTime(), x2: (new Date(progress_array_rabota[145])).getTime(),  y: 0, programname: progress_array_programname[72]},
                {x:  (new Date(progress_array_rabota[146])).getTime(), x2: (new Date(progress_array_rabota[147])).getTime(),  y: 0, programname: progress_array_programname[73]},
                {x:  (new Date(progress_array_rabota[148])).getTime(), x2: (new Date(progress_array_rabota[149])).getTime(),  y: 0, programname: progress_array_programname[74]},
                {x:  (new Date(progress_array_rabota[150])).getTime(), x2: (new Date(progress_array_rabota[151])).getTime(),  y: 0, programname: progress_array_programname[75]},
                {x:  (new Date(progress_array_rabota[152])).getTime(), x2: (new Date(progress_array_rabota[153])).getTime(),  y: 0, programname: progress_array_programname[76]},
                {x:  (new Date(progress_array_rabota[154])).getTime(), x2: (new Date(progress_array_rabota[155])).getTime(),  y: 0, programname: progress_array_programname[77]},
                {x:  (new Date(progress_array_rabota[156])).getTime(), x2: (new Date(progress_array_rabota[157])).getTime(),  y: 0, programname: progress_array_programname[78]},
                {x:  (new Date(progress_array_rabota[158])).getTime(), x2: (new Date(progress_array_rabota[159])).getTime(),  y: 0, programname: progress_array_programname[79]},
                {x:  (new Date(progress_array_rabota[160])).getTime(), x2: (new Date(progress_array_rabota[161])).getTime(),  y: 0, programname: progress_array_programname[80]},
                {x:  (new Date(progress_array_rabota[162])).getTime(), x2: (new Date(progress_array_rabota[163])).getTime(),  y: 0, programname: progress_array_programname[81]},
                {x:  (new Date(progress_array_rabota[164])).getTime(), x2: (new Date(progress_array_rabota[165])).getTime(),  y: 0, programname: progress_array_programname[82]},
                {x:  (new Date(progress_array_rabota[166])).getTime(), x2: (new Date(progress_array_rabota[167])).getTime(),  y: 0, programname: progress_array_programname[83]},
                {x:  (new Date(progress_array_rabota[168])).getTime(), x2: (new Date(progress_array_rabota[169])).getTime(),  y: 0, programname: progress_array_programname[84]},
                {x:  (new Date(progress_array_rabota[170])).getTime(), x2: (new Date(progress_array_rabota[171])).getTime(),  y: 0, programname: progress_array_programname[85]},
                {x:  (new Date(progress_array_rabota[172])).getTime(), x2: (new Date(progress_array_rabota[173])).getTime(),  y: 0, programname: progress_array_programname[86]},
                {x:  (new Date(progress_array_rabota[174])).getTime(), x2: (new Date(progress_array_rabota[175])).getTime(),  y: 0, programname: progress_array_programname[87]},
                {x:  (new Date(progress_array_rabota[176])).getTime(), x2: (new Date(progress_array_rabota[177])).getTime(),  y: 0, programname: progress_array_programname[88]},
                {x:  (new Date(progress_array_rabota[178])).getTime(), x2: (new Date(progress_array_rabota[179])).getTime(),  y: 0, programname: progress_array_programname[89]},
                {x:  (new Date(progress_array_rabota[180])).getTime(), x2: (new Date(progress_array_rabota[181])).getTime(),  y: 0, programname: progress_array_programname[90]},
                {x:  (new Date(progress_array_rabota[182])).getTime(), x2: (new Date(progress_array_rabota[183])).getTime(),  y: 0, programname: progress_array_programname[91]},
                {x:  (new Date(progress_array_rabota[184])).getTime(), x2: (new Date(progress_array_rabota[185])).getTime(),  y: 0, programname: progress_array_programname[92]},
                {x:  (new Date(progress_array_rabota[186])).getTime(), x2: (new Date(progress_array_rabota[187])).getTime(),  y: 0, programname: progress_array_programname[93]},
                {x:  (new Date(progress_array_rabota[188])).getTime(), x2: (new Date(progress_array_rabota[189])).getTime(),  y: 0, programname: progress_array_programname[94]},
                {x:  (new Date(progress_array_rabota[190])).getTime(), x2: (new Date(progress_array_rabota[191])).getTime(),  y: 0, programname: progress_array_programname[95]},
                {x:  (new Date(progress_array_rabota[192])).getTime(), x2: (new Date(progress_array_rabota[193])).getTime(),  y: 0, programname: progress_array_programname[96]},
                {x:  (new Date(progress_array_rabota[194])).getTime(), x2: (new Date(progress_array_rabota[195])).getTime(),  y: 0, programname: progress_array_programname[97]},
                {x:  (new Date(progress_array_rabota[196])).getTime(), x2: (new Date(progress_array_rabota[197])).getTime(),  y: 0, programname: progress_array_programname[98]},
                {x:  (new Date(progress_array_rabota[198])).getTime(), x2: (new Date(progress_array_rabota[199])).getTime(),  y: 0, programname: progress_array_programname[99]},
                {x:  (new Date(progress_array_rabota[200])).getTime(), x2: (new Date(progress_array_rabota[201])).getTime(),  y: 0, programname: progress_array_programname[100]},
                {x:  (new Date(progress_array_rabota[202])).getTime(), x2: (new Date(progress_array_rabota[203])).getTime(),  y: 0, programname: progress_array_programname[101]},
                {x:  (new Date(progress_array_rabota[204])).getTime(), x2: (new Date(progress_array_rabota[205])).getTime(),  y: 0, programname: progress_array_programname[102]},
                {x:  (new Date(progress_array_rabota[206])).getTime(), x2: (new Date(progress_array_rabota[207])).getTime(),  y: 0, programname: progress_array_programname[103]},
                {x:  (new Date(progress_array_rabota[208])).getTime(), x2: (new Date(progress_array_rabota[209])).getTime(),  y: 0, programname: progress_array_programname[104]},
                {x:  (new Date(progress_array_rabota[210])).getTime(), x2: (new Date(progress_array_rabota[211])).getTime(),  y: 0, programname: progress_array_programname[105]},
                {x:  (new Date(progress_array_rabota[212])).getTime(), x2: (new Date(progress_array_rabota[213])).getTime(),  y: 0, programname: progress_array_programname[106]},
                {x:  (new Date(progress_array_rabota[214])).getTime(), x2: (new Date(progress_array_rabota[215])).getTime(),  y: 0, programname: progress_array_programname[107]},
                {x:  (new Date(progress_array_rabota[216])).getTime(), x2: (new Date(progress_array_rabota[217])).getTime(),  y: 0, programname: progress_array_programname[108]},
                {x:  (new Date(progress_array_rabota[218])).getTime(), x2: (new Date(progress_array_rabota[219])).getTime(),  y: 0, programname: progress_array_programname[109]},
                {x:  (new Date(progress_array_rabota[220])).getTime(), x2: (new Date(progress_array_rabota[221])).getTime(),  y: 0, programname: progress_array_programname[110]},
                {x:  (new Date(progress_array_rabota[222])).getTime(), x2: (new Date(progress_array_rabota[223])).getTime(),  y: 0, programname: progress_array_programname[111]},
                {x:  (new Date(progress_array_rabota[224])).getTime(), x2: (new Date(progress_array_rabota[225])).getTime(),  y: 0, programname: progress_array_programname[112]},
                {x:  (new Date(progress_array_rabota[226])).getTime(), x2: (new Date(progress_array_rabota[227])).getTime(),  y: 0, programname: progress_array_programname[113]},
                {x:  (new Date(progress_array_rabota[228])).getTime(), x2: (new Date(progress_array_rabota[229])).getTime(),  y: 0, programname: progress_array_programname[114]},
                {x:  (new Date(progress_array_rabota[230])).getTime(), x2: (new Date(progress_array_rabota[231])).getTime(),  y: 0, programname: progress_array_programname[115]},
                {x:  (new Date(progress_array_rabota[232])).getTime(), x2: (new Date(progress_array_rabota[233])).getTime(),  y: 0, programname: progress_array_programname[116]},
                {x:  (new Date(progress_array_rabota[234])).getTime(), x2: (new Date(progress_array_rabota[235])).getTime(),  y: 0, programname: progress_array_programname[117]},
                {x:  (new Date(progress_array_rabota[236])).getTime(), x2: (new Date(progress_array_rabota[237])).getTime(),  y: 0, programname: progress_array_programname[118]},
                {x:  (new Date(progress_array_rabota[238])).getTime(), x2: (new Date(progress_array_rabota[239])).getTime(),  y: 0, programname: progress_array_programname[119]},
                {x:  (new Date(progress_array_rabota[240])).getTime(), x2: (new Date(progress_array_rabota[241])).getTime(),  y: 0, programname: progress_array_programname[120]},
                {x:  (new Date(progress_array_rabota[242])).getTime(), x2: (new Date(progress_array_rabota[243])).getTime(),  y: 0, programname: progress_array_programname[121]},
                {x:  (new Date(progress_array_rabota[244])).getTime(), x2: (new Date(progress_array_rabota[245])).getTime(),  y: 0, programname: progress_array_programname[122]},
                {x:  (new Date(progress_array_rabota[246])).getTime(), x2: (new Date(progress_array_rabota[247])).getTime(),  y: 0, programname: progress_array_programname[123]},
                {x:  (new Date(progress_array_rabota[248])).getTime(), x2: (new Date(progress_array_rabota[249])).getTime(),  y: 0, programname: progress_array_programname[124]},
                {x:  (new Date(progress_array_rabota[250])).getTime(), x2: (new Date(progress_array_rabota[251])).getTime(),  y: 0, programname: progress_array_programname[125]},
                {x:  (new Date(progress_array_rabota[252])).getTime(), x2: (new Date(progress_array_rabota[253])).getTime(),  y: 0, programname: progress_array_programname[126]},
                {x:  (new Date(progress_array_rabota[254])).getTime(), x2: (new Date(progress_array_rabota[255])).getTime(),  y: 0, programname: progress_array_programname[127]},
                {x:  (new Date(progress_array_rabota[256])).getTime(), x2: (new Date(progress_array_rabota[257])).getTime(),  y: 0, programname: progress_array_programname[128]},
                {x:  (new Date(progress_array_rabota[258])).getTime(), x2: (new Date(progress_array_rabota[259])).getTime(),  y: 0, programname: progress_array_programname[129]},
                {x:  (new Date(progress_array_rabota[260])).getTime(), x2: (new Date(progress_array_rabota[261])).getTime(),  y: 0, programname: progress_array_programname[130]},
                {x:  (new Date(progress_array_rabota[262])).getTime(), x2: (new Date(progress_array_rabota[263])).getTime(),  y: 0, programname: progress_array_programname[131]},
                {x:  (new Date(progress_array_rabota[264])).getTime(), x2: (new Date(progress_array_rabota[265])).getTime(),  y: 0, programname: progress_array_programname[132]},
                {x:  (new Date(progress_array_rabota[266])).getTime(), x2: (new Date(progress_array_rabota[267])).getTime(),  y: 0, programname: progress_array_programname[133]},
                {x:  (new Date(progress_array_rabota[268])).getTime(), x2: (new Date(progress_array_rabota[269])).getTime(),  y: 0, programname: progress_array_programname[134]},
                {x:  (new Date(progress_array_rabota[270])).getTime(), x2: (new Date(progress_array_rabota[271])).getTime(),  y: 0, programname: progress_array_programname[135]},
                {x:  (new Date(progress_array_rabota[272])).getTime(), x2: (new Date(progress_array_rabota[273])).getTime(),  y: 0, programname: progress_array_programname[136]},
                {x:  (new Date(progress_array_rabota[274])).getTime(), x2: (new Date(progress_array_rabota[275])).getTime(),  y: 0, programname: progress_array_programname[137]},
                {x:  (new Date(progress_array_rabota[276])).getTime(), x2: (new Date(progress_array_rabota[277])).getTime(),  y: 0, programname: progress_array_programname[138]},
                {x:  (new Date(progress_array_rabota[278])).getTime(), x2: (new Date(progress_array_rabota[279])).getTime(),  y: 0, programname: progress_array_programname[139]},
                {x:  (new Date(progress_array_rabota[280])).getTime(), x2: (new Date(progress_array_rabota[281])).getTime(),  y: 0, programname: progress_array_programname[140]},
                {x:  (new Date(progress_array_rabota[282])).getTime(), x2: (new Date(progress_array_rabota[283])).getTime(),  y: 0, programname: progress_array_programname[141]},
                {x:  (new Date(progress_array_rabota[284])).getTime(), x2: (new Date(progress_array_rabota[285])).getTime(),  y: 0, programname: progress_array_programname[142]},
                {x:  (new Date(progress_array_rabota[286])).getTime(), x2: (new Date(progress_array_rabota[287])).getTime(),  y: 0, programname: progress_array_programname[143]},
                {x:  (new Date(progress_array_rabota[288])).getTime(), x2: (new Date(progress_array_rabota[289])).getTime(),  y: 0, programname: progress_array_programname[144]},
                {x:  (new Date(progress_array_rabota[290])).getTime(), x2: (new Date(progress_array_rabota[291])).getTime(),  y: 0, programname: progress_array_programname[145]},
                {x:  (new Date(progress_array_rabota[292])).getTime(), x2: (new Date(progress_array_rabota[293])).getTime(),  y: 0, programname: progress_array_programname[146]},
                {x:  (new Date(progress_array_rabota[294])).getTime(), x2: (new Date(progress_array_rabota[295])).getTime(),  y: 0, programname: progress_array_programname[147]},
                {x:  (new Date(progress_array_rabota[296])).getTime(), x2: (new Date(progress_array_rabota[297])).getTime(),  y: 0, programname: progress_array_programname[148]},

            ],
        },

        {
            name: 'Ожидание',
            borderColor: 'gray',
            pointWidth: 30,
            colorByPoint: false,
            color: '#ffea32',
            tooltip: {
                pointFormat: ''
            },
            data:   [
                {x:  (new Date(progress_array_pause[0])).getTime(), x2: (new Date(progress_array_pause[1])).getTime(), y: 1},
                {x:  (new Date(progress_array_pause[2])).getTime(), x2: (new Date(progress_array_pause[3])).getTime(), y: 1},
                {x:  (new Date(progress_array_pause[4])).getTime(), x2: (new Date(progress_array_pause[5])).getTime(), y: 1},
                {x:  (new Date(progress_array_pause[6])).getTime(), x2: (new Date(progress_array_pause[7])).getTime(), y: 1},
                {x:  (new Date(progress_array_pause[8])).getTime(), x2: (new Date(progress_array_pause[9])).getTime(), y: 1},
                {x:  (new Date(progress_array_pause[10])).getTime(), x2: (new Date(progress_array_pause[11])).getTime(), y: 1},
                {x:  (new Date(progress_array_pause[12])).getTime(), x2: (new Date(progress_array_pause[13])).getTime(), y: 1},
                {x:  (new Date(progress_array_pause[14])).getTime(), x2: (new Date(progress_array_pause[15])).getTime(), y: 1},
                {x:  (new Date(progress_array_pause[16])).getTime(), x2: (new Date(progress_array_pause[17])).getTime(), y: 1},
                {x:  (new Date(progress_array_pause[18])).getTime(), x2: (new Date(progress_array_pause[19])).getTime(), y: 1},
                {x:  (new Date(progress_array_pause[20])).getTime(), x2: (new Date(progress_array_pause[21])).getTime(), y: 1},
                {x:  (new Date(progress_array_pause[22])).getTime(), x2: (new Date(progress_array_pause[23])).getTime(), y: 1},
                {x:  (new Date(progress_array_pause[24])).getTime(), x2: (new Date(progress_array_pause[25])).getTime(), y: 1},
                {x:  (new Date(progress_array_pause[26])).getTime(), x2: (new Date(progress_array_pause[27])).getTime(), y: 1},
                {x:  (new Date(progress_array_pause[28])).getTime(), x2: (new Date(progress_array_pause[29])).getTime(), y: 1},
                {x:  (new Date(progress_array_pause[30])).getTime(), x2: (new Date(progress_array_pause[31])).getTime(), y: 1},
                {x:  (new Date(progress_array_pause[32])).getTime(), x2: (new Date(progress_array_pause[33])).getTime(), y: 1},
                {x:  (new Date(progress_array_pause[34])).getTime(), x2: (new Date(progress_array_pause[35])).getTime(), y: 1},
                {x:  (new Date(progress_array_pause[36])).getTime(), x2: (new Date(progress_array_pause[37])).getTime(), y: 1},
                {x:  (new Date(progress_array_pause[38])).getTime(), x2: (new Date(progress_array_pause[39])).getTime(), y: 1},
                {x:  (new Date(progress_array_pause[40])).getTime(), x2: (new Date(progress_array_pause[41])).getTime(), y: 1},
                {x:  (new Date(progress_array_pause[42])).getTime(), x2: (new Date(progress_array_pause[43])).getTime(), y: 1},
                {x:  (new Date(progress_array_pause[44])).getTime(), x2: (new Date(progress_array_pause[45])).getTime(), y: 1},
                {x:  (new Date(progress_array_pause[46])).getTime(), x2: (new Date(progress_array_pause[47])).getTime(), y: 1},
                {x:  (new Date(progress_array_pause[48])).getTime(), x2: (new Date(progress_array_pause[49])).getTime(), y: 1},
                {x:  (new Date(progress_array_pause[50])).getTime(), x2: (new Date(progress_array_pause[51])).getTime(), y: 1},
                {x:  (new Date(progress_array_pause[52])).getTime(), x2: (new Date(progress_array_pause[53])).getTime(), y: 1},
                {x:  (new Date(progress_array_pause[54])).getTime(), x2: (new Date(progress_array_pause[55])).getTime(), y: 1},
                {x:  (new Date(progress_array_pause[56])).getTime(), x2: (new Date(progress_array_pause[57])).getTime(), y: 1},
                {x:  (new Date(progress_array_pause[58])).getTime(), x2: (new Date(progress_array_pause[59])).getTime(), y: 1},
                {x:  (new Date(progress_array_pause[60])).getTime(), x2: (new Date(progress_array_pause[61])).getTime(), y: 1},
                {x:  (new Date(progress_array_pause[62])).getTime(), x2: (new Date(progress_array_pause[63])).getTime(), y: 1},
                {x:  (new Date(progress_array_pause[64])).getTime(), x2: (new Date(progress_array_pause[65])).getTime(), y: 1},
                {x:  (new Date(progress_array_pause[66])).getTime(), x2: (new Date(progress_array_pause[67])).getTime(), y: 1},
                {x:  (new Date(progress_array_pause[68])).getTime(), x2: (new Date(progress_array_pause[69])).getTime(), y: 1},
                {x:  (new Date(progress_array_pause[70])).getTime(), x2: (new Date(progress_array_pause[71])).getTime(), y: 1},
                {x:  (new Date(progress_array_pause[72])).getTime(), x2: (new Date(progress_array_pause[73])).getTime(), y: 1},
                {x:  (new Date(progress_array_pause[74])).getTime(), x2: (new Date(progress_array_pause[75])).getTime(), y: 1},
                {x:  (new Date(progress_array_pause[76])).getTime(), x2: (new Date(progress_array_pause[77])).getTime(), y: 1},
                {x:  (new Date(progress_array_pause[78])).getTime(), x2: (new Date(progress_array_pause[79])).getTime(), y: 1},
                {x:  (new Date(progress_array_pause[80])).getTime(), x2: (new Date(progress_array_pause[81])).getTime(), y: 1},
                {x:  (new Date(progress_array_pause[82])).getTime(), x2: (new Date(progress_array_pause[83])).getTime(), y: 1},
                {x:  (new Date(progress_array_pause[84])).getTime(), x2: (new Date(progress_array_pause[85])).getTime(), y: 1},
                {x:  (new Date(progress_array_pause[86])).getTime(), x2: (new Date(progress_array_pause[87])).getTime(), y: 1},
                {x:  (new Date(progress_array_pause[88])).getTime(), x2: (new Date(progress_array_pause[89])).getTime(), y: 1},
                {x:  (new Date(progress_array_pause[90])).getTime(), x2: (new Date(progress_array_pause[91])).getTime(), y: 1},
                {x:  (new Date(progress_array_pause[92])).getTime(), x2: (new Date(progress_array_pause[93])).getTime(), y: 1},
                {x:  (new Date(progress_array_pause[94])).getTime(), x2: (new Date(progress_array_pause[95])).getTime(), y: 1},
                {x:  (new Date(progress_array_pause[96])).getTime(), x2: (new Date(progress_array_pause[97])).getTime(), y: 1},
                {x:  (new Date(progress_array_pause[98])).getTime(), x2: (new Date(progress_array_pause[99])).getTime(), y: 1},
                {x:  (new Date(progress_array_pause[100])).getTime(), x2: (new Date(progress_array_pause[101])).getTime(), y: 1},
                {x:  (new Date(progress_array_pause[102])).getTime(), x2: (new Date(progress_array_pause[103])).getTime(), y: 1},
                {x:  (new Date(progress_array_pause[104])).getTime(), x2: (new Date(progress_array_pause[105])).getTime(), y: 1},
                {x:  (new Date(progress_array_pause[106])).getTime(), x2: (new Date(progress_array_pause[107])).getTime(), y: 1},
                {x:  (new Date(progress_array_pause[108])).getTime(), x2: (new Date(progress_array_pause[109])).getTime(), y: 1},
                {x:  (new Date(progress_array_pause[110])).getTime(), x2: (new Date(progress_array_pause[111])).getTime(), y: 1},
                {x:  (new Date(progress_array_pause[112])).getTime(), x2: (new Date(progress_array_pause[113])).getTime(), y: 1},
                {x:  (new Date(progress_array_pause[114])).getTime(), x2: (new Date(progress_array_pause[115])).getTime(), y: 1},
                {x:  (new Date(progress_array_pause[116])).getTime(), x2: (new Date(progress_array_pause[117])).getTime(), y: 1},
                {x:  (new Date(progress_array_pause[118])).getTime(), x2: (new Date(progress_array_pause[119])).getTime(), y: 1},
                {x:  (new Date(progress_array_pause[120])).getTime(), x2: (new Date(progress_array_pause[121])).getTime(), y: 1},
                {x:  (new Date(progress_array_pause[122])).getTime(), x2: (new Date(progress_array_pause[123])).getTime(), y: 1},
                {x:  (new Date(progress_array_pause[124])).getTime(), x2: (new Date(progress_array_pause[125])).getTime(), y: 1},
                {x:  (new Date(progress_array_pause[126])).getTime(), x2: (new Date(progress_array_pause[127])).getTime(), y: 1},
                {x:  (new Date(progress_array_pause[128])).getTime(), x2: (new Date(progress_array_pause[129])).getTime(), y: 1},
                {x:  (new Date(progress_array_pause[130])).getTime(), x2: (new Date(progress_array_pause[131])).getTime(), y: 1},
                {x:  (new Date(progress_array_pause[132])).getTime(), x2: (new Date(progress_array_pause[133])).getTime(), y: 1},
                {x:  (new Date(progress_array_pause[134])).getTime(), x2: (new Date(progress_array_pause[135])).getTime(), y: 1},
                {x:  (new Date(progress_array_pause[136])).getTime(), x2: (new Date(progress_array_pause[137])).getTime(), y: 1},
                {x:  (new Date(progress_array_pause[138])).getTime(), x2: (new Date(progress_array_pause[139])).getTime(), y: 1},
                {x:  (new Date(progress_array_pause[140])).getTime(), x2: (new Date(progress_array_pause[141])).getTime(), y: 1},
                {x:  (new Date(progress_array_pause[142])).getTime(), x2: (new Date(progress_array_pause[143])).getTime(), y: 1},
                {x:  (new Date(progress_array_pause[144])).getTime(), x2: (new Date(progress_array_pause[145])).getTime(), y: 1},
                {x:  (new Date(progress_array_pause[146])).getTime(), x2: (new Date(progress_array_pause[147])).getTime(), y: 1},
                {x:  (new Date(progress_array_pause[148])).getTime(), x2: (new Date(progress_array_pause[149])).getTime(), y: 1},
                {x:  (new Date(progress_array_pause[150])).getTime(), x2: (new Date(progress_array_pause[151])).getTime(), y: 1},
                {x:  (new Date(progress_array_pause[152])).getTime(), x2: (new Date(progress_array_pause[153])).getTime(), y: 1},
                {x:  (new Date(progress_array_pause[154])).getTime(), x2: (new Date(progress_array_pause[155])).getTime(), y: 1},
                {x:  (new Date(progress_array_pause[156])).getTime(), x2: (new Date(progress_array_pause[157])).getTime(), y: 1},
                {x:  (new Date(progress_array_pause[158])).getTime(), x2: (new Date(progress_array_pause[159])).getTime(), y: 1},
                {x:  (new Date(progress_array_pause[160])).getTime(), x2: (new Date(progress_array_pause[161])).getTime(), y: 1},
                {x:  (new Date(progress_array_pause[162])).getTime(), x2: (new Date(progress_array_pause[163])).getTime(), y: 1},
                {x:  (new Date(progress_array_pause[164])).getTime(), x2: (new Date(progress_array_pause[165])).getTime(), y: 1},
                {x:  (new Date(progress_array_pause[166])).getTime(), x2: (new Date(progress_array_pause[167])).getTime(), y: 1},
                {x:  (new Date(progress_array_pause[168])).getTime(), x2: (new Date(progress_array_pause[169])).getTime(), y: 1},
                {x:  (new Date(progress_array_pause[170])).getTime(), x2: (new Date(progress_array_pause[171])).getTime(), y: 1},
                {x:  (new Date(progress_array_pause[172])).getTime(), x2: (new Date(progress_array_pause[173])).getTime(), y: 1},
                {x:  (new Date(progress_array_pause[174])).getTime(), x2: (new Date(progress_array_pause[175])).getTime(), y: 1},
                {x:  (new Date(progress_array_pause[176])).getTime(), x2: (new Date(progress_array_pause[177])).getTime(), y: 1},
                {x:  (new Date(progress_array_pause[178])).getTime(), x2: (new Date(progress_array_pause[179])).getTime(), y: 1},
                {x:  (new Date(progress_array_pause[180])).getTime(), x2: (new Date(progress_array_pause[181])).getTime(), y: 1},
                {x:  (new Date(progress_array_pause[182])).getTime(), x2: (new Date(progress_array_pause[183])).getTime(), y: 1},
                {x:  (new Date(progress_array_pause[184])).getTime(), x2: (new Date(progress_array_pause[185])).getTime(), y: 1},
                {x:  (new Date(progress_array_pause[186])).getTime(), x2: (new Date(progress_array_pause[187])).getTime(), y: 1},
                {x:  (new Date(progress_array_pause[188])).getTime(), x2: (new Date(progress_array_pause[189])).getTime(), y: 1},
                {x:  (new Date(progress_array_pause[190])).getTime(), x2: (new Date(progress_array_pause[191])).getTime(), y: 1},
                {x:  (new Date(progress_array_pause[192])).getTime(), x2: (new Date(progress_array_pause[193])).getTime(), y: 1},
                {x:  (new Date(progress_array_pause[194])).getTime(), x2: (new Date(progress_array_pause[195])).getTime(), y: 1},
                {x:  (new Date(progress_array_pause[196])).getTime(), x2: (new Date(progress_array_pause[197])).getTime(), y: 1},
                {x:  (new Date(progress_array_pause[198])).getTime(), x2: (new Date(progress_array_pause[199])).getTime(), y: 1},
                {x:  (new Date(progress_array_pause[200])).getTime(), x2: (new Date(progress_array_pause[201])).getTime(), y: 1},
                {x:  (new Date(progress_array_pause[202])).getTime(), x2: (new Date(progress_array_pause[203])).getTime(), y: 1},
                {x:  (new Date(progress_array_pause[204])).getTime(), x2: (new Date(progress_array_pause[205])).getTime(), y: 1},
                {x:  (new Date(progress_array_pause[206])).getTime(), x2: (new Date(progress_array_pause[207])).getTime(), y: 1},
                {x:  (new Date(progress_array_pause[208])).getTime(), x2: (new Date(progress_array_pause[209])).getTime(), y: 1},
                {x:  (new Date(progress_array_pause[210])).getTime(), x2: (new Date(progress_array_pause[211])).getTime(), y: 1},
                {x:  (new Date(progress_array_pause[212])).getTime(), x2: (new Date(progress_array_pause[213])).getTime(), y: 1},
                {x:  (new Date(progress_array_pause[214])).getTime(), x2: (new Date(progress_array_pause[215])).getTime(), y: 1},
                {x:  (new Date(progress_array_pause[216])).getTime(), x2: (new Date(progress_array_pause[217])).getTime(), y: 1},
                {x:  (new Date(progress_array_pause[218])).getTime(), x2: (new Date(progress_array_pause[219])).getTime(), y: 1},
                {x:  (new Date(progress_array_pause[220])).getTime(), x2: (new Date(progress_array_pause[221])).getTime(), y: 1},
                {x:  (new Date(progress_array_pause[222])).getTime(), x2: (new Date(progress_array_pause[223])).getTime(), y: 1},
                {x:  (new Date(progress_array_pause[224])).getTime(), x2: (new Date(progress_array_pause[225])).getTime(), y: 1},
                {x:  (new Date(progress_array_pause[226])).getTime(), x2: (new Date(progress_array_pause[227])).getTime(), y: 1},
            ],
            dataLabels: {
                enabled: true
            }
        },
        {
            name: 'Выключен',
            borderColor: 'gray',
            pointWidth: 30,
            colorByPoint: false,
            color: '#000000',
            data: [
                {x: (new Date(progress_array_off[0])).getTime(), x2: (new Date(progress_array_off[1])).getTime(), y: 2},
                {x: (new Date(progress_array_off[2])).getTime(), x2: (new Date(progress_array_off[3])).getTime(), y: 2},
                {x: (new Date(progress_array_off[4])).getTime(), x2: (new Date(progress_array_off[5])).getTime(), y: 2},
                {x: (new Date(progress_array_off[6])).getTime(), x2: (new Date(progress_array_off[7])).getTime(), y: 2},
                {x: (new Date(progress_array_off[8])).getTime(), x2: (new Date(progress_array_off[9])).getTime(), y: 2},
                {x: (new Date(progress_array_off[10])).getTime(), x2: (new Date(progress_array_off[11])).getTime(), y: 2},
                {x: (new Date(progress_array_off[12])).getTime(), x2: (new Date(progress_array_off[13])).getTime(), y: 2},
                {x: (new Date(progress_array_off[14])).getTime(), x2: (new Date(progress_array_off[15])).getTime(), y: 2},
                {
                    x: (new Date(progress_array_off[16])).getTime(),
                    x2: (new Date(progress_array_off[17])).getTime(),
                    y: 2
                },
                {
                    x: (new Date(progress_array_off[18])).getTime(),
                    x2: (new Date(progress_array_off[19])).getTime(),
                    y: 2
                },
                {
                    x: (new Date(progress_array_off[20])).getTime(),
                    x2: (new Date(progress_array_off[21])).getTime(),
                    y: 2
                },
                {
                    x: (new Date(progress_array_off[22])).getTime(),
                    x2: (new Date(progress_array_off[23])).getTime(),
                    y: 2
                },
                {
                    x: (new Date(progress_array_off[24])).getTime(),
                    x2: (new Date(progress_array_off[25])).getTime(),
                    y: 2
                },
                {
                    x: (new Date(progress_array_off[26])).getTime(),
                    x2: (new Date(progress_array_off[27])).getTime(),
                    y: 2
                },
                {
                    x: (new Date(progress_array_off[28])).getTime(),
                    x2: (new Date(progress_array_off[29])).getTime(),
                    y: 2
                },
                {
                    x: (new Date(progress_array_off[30])).getTime(),
                    x2: (new Date(progress_array_off[31])).getTime(),
                    y: 2
                },
                {
                    x: (new Date(progress_array_off[32])).getTime(),
                    x2: (new Date(progress_array_off[33])).getTime(),
                    y: 2
                },
                {
                    x: (new Date(progress_array_off[34])).getTime(),
                    x2: (new Date(progress_array_off[35])).getTime(),
                    y: 2
                },
                {
                    x: (new Date(progress_array_off[36])).getTime(),
                    x2: (new Date(progress_array_off[37])).getTime(),
                    y: 2
                },
                {
                    x: (new Date(progress_array_off[38])).getTime(),
                    x2: (new Date(progress_array_off[39])).getTime(),
                    y: 2
                },
            ],
            dataLabels: {
                enabled: true,
            }
        },
        {
            name: 'В аварии',
            borderColor: 'gray',
            pointWidth: 30,
            colorByPoint: false,
            color: '#e81e1d',
            data: [
                {x:  (new Date(progress_array_avar[0])).getTime(), x2: (new Date(progress_array_avar[1])).getTime(), y: 3},
                {x:  (new Date(progress_array_avar[2])).getTime(), x2: (new Date(progress_array_avar[3])).getTime(), y: 3},
                {x:  (new Date(progress_array_avar[4])).getTime(), x2: (new Date(progress_array_avar[5])).getTime(), y: 3},
                {x:  (new Date(progress_array_avar[6])).getTime(), x2: (new Date(progress_array_avar[7])).getTime(), y: 3},
                {x:  (new Date(progress_array_avar[8])).getTime(), x2: (new Date(progress_array_avar[9])).getTime(), y: 3},
                {x:  (new Date(progress_array_avar[10])).getTime(), x2: (new Date(progress_array_avar[11])).getTime(), y: 3},
                {x:  (new Date(progress_array_avar[12])).getTime(), x2: (new Date(progress_array_avar[13])).getTime(), y: 3},
                {x:  (new Date(progress_array_avar[14])).getTime(), x2: (new Date(progress_array_avar[15])).getTime(), y: 3},
                {x:  (new Date(progress_array_avar[16])).getTime(), x2: (new Date(progress_array_avar[17])).getTime(), y: 3},
                {x:  (new Date(progress_array_avar[18])).getTime(), x2: (new Date(progress_array_avar[19])).getTime(), y: 3},
                {x:  (new Date(progress_array_avar[20])).getTime(), x2: (new Date(progress_array_avar[21])).getTime(), y: 3},
                {x:  (new Date(progress_array_avar[22])).getTime(), x2: (new Date(progress_array_avar[23])).getTime(), y: 3},
                {x:  (new Date(progress_array_avar[24])).getTime(), x2: (new Date(progress_array_avar[25])).getTime(), y: 3},
                {x:  (new Date(progress_array_avar[26])).getTime(), x2: (new Date(progress_array_avar[27])).getTime(), y: 3},
                {x:  (new Date(progress_array_avar[28])).getTime(), x2: (new Date(progress_array_avar[29])).getTime(), y: 3},
                {x:  (new Date(progress_array_avar[30])).getTime(), x2: (new Date(progress_array_avar[31])).getTime(), y: 3},
                {x:  (new Date(progress_array_avar[32])).getTime(), x2: (new Date(progress_array_avar[33])).getTime(), y: 3},
                {x:  (new Date(progress_array_avar[34])).getTime(), x2: (new Date(progress_array_avar[35])).getTime(), y: 3},
                {x:  (new Date(progress_array_avar[36])).getTime(), x2: (new Date(progress_array_avar[37])).getTime(), y: 3},
                {x:  (new Date(progress_array_avar[38])).getTime(), x2: (new Date(progress_array_avar[39])).getTime(), y: 3},
                {x:  (new Date(progress_array_avar[40])).getTime(), x2: (new Date(progress_array_avar[41])).getTime(), y: 3},
                {x:  (new Date(progress_array_avar[42])).getTime(), x2: (new Date(progress_array_avar[43])).getTime(), y: 3},
                {x:  (new Date(progress_array_avar[44])).getTime(), x2: (new Date(progress_array_avar[45])).getTime(), y: 3},
                {x:  (new Date(progress_array_avar[46])).getTime(), x2: (new Date(progress_array_avar[47])).getTime(), y: 3},
                {x:  (new Date(progress_array_avar[48])).getTime(), x2: (new Date(progress_array_avar[49])).getTime(), y: 3},
            ],
            dataLabels: {
                enabled: true
            }
        },

    ]


});

<!-- круговая диагрмма загрузки оборудования-->
var colors = ['#38e817', '#ffea32', '#000000', '#e81e1d', '#207210'];
Highcharts.chart('container2', {
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
    colors: colors,
    credits: {
        enabled: false
    },
    series: [{
        type: 'pie',
        name: 'Показатель',
        data: [['По программе', progress_work], ['Включен', progress_pass],
            ['Выключен', progress_fail], ['В аварии', progress_avar], ['Под нагрузкой', progress_nagruzka]]
    }]
});