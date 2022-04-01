var string = ['dmg_dmu50_1', 'dmg_dmu50_2', 'dmg_dmu50_3', 'dmg_dmu50_4', 'dmg_dmu50_5']







const stanok = 'dmg_dmu50_1'

var time = new Date(new Date().toString().split('GMT')[0] + ' UTC').toISOString();
// Преобразоавние времение в формат '2022-03-21 10:00:35'
var time_date = time.slice(0, 10)

var time_start = time_date + " " + "00:00:00";
var time_end = time_date + " " + "23:59:59";

var tag = 1



function getRequest(stanok, timeStart, timeEnd, tag=1) {

    var adress = 'http://192.168.3.41:8080/api/complex/' + stanok + '&beginTime:' + time_start + '&endTime:' + time_end + '&statusTag:' + tag


    var status
    var time
    var programName


    var dataArray = $.get(adress, function(data){
        status = data.status
        time = data.time
        programName = data.time

        huy = [status, time, programName]
        console.log(huy)
        return huy


    });

    console.log(dataArray)

    return dataArray

        // for(let i = 1; 100 > i-1; i++)
        // {
        //     if (request.status[i] == request.status[i-1])
        //     {
        //         console.log("Плохо", i-1)
        //         continue
        //     }
        //     else {
        //         arrayStatus.push(request.status[i-1])
        //     }
        // }

}

var appa = getRequest(stanok, time_start, time_end, tag)

var arrayStatus = appa.responseJSON.status
var arrayTime = appa.responseJSON.time





