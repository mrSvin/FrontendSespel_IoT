function params() {
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
}

function setData(container, array) {
    Highcharts.chart(container, {
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
            data: array
        }]
    });
}

function startSetData(arrayObject)
{
    params();
    $.map(arrayObject, function (arrayObject) {
        var containerName = arrayObject.nameContainer;
        var dataArray = arrayObject.arrayData;
        setData(containerName, dataArray);
    });

}





