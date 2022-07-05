function makeRequestArray(Name) {
    let time = (new Date(new Date().toString().split('GMT')[0] + ' UTC').toISOString()).slice(0, 10);
    let url = `/api/complexData/${Name}_days_date:${time}`

    return fetch(url, {
        method: 'GET'
    })
        .then(response => response.json())
        .then(response => [response.work, response.pause, response.off, response.avar, response.nagruzka, response.programName, response.roundData])
}

function rewriteData(promiseVariable) {
    promiseVariable
        .then(result => {
            console.log(result)
            Diagram = result;
        })
        .then(
            result => {
                console.log('Все данные выведены');
            }
        )
        .catch(err => {
            console.error(err);
        });
}

function makeRequestObject(Name) {
    let time = (new Date(new Date().toString().split('GMT')[0] + ' UTC').toISOString()).slice(0, 10);
    let url = `/api/complexData/${Name}_days_date:${time}`

    return fetch(url, {
        method: 'GET'
    })
        .then(response => response.json())
        .then((result) =>
        {
            let object = {}
            object[Name] = {'work':null, 'off':null, 'avar':null, 'nagruzka':null, 'progamName':null, 'roundData':null}
            object[Name]['work'] = result.work
            object[Name]['pause'] = result.pause
            object[Name]['off'] = result.off
            object[Name]['avar'] = result.avar
            object[Name]['nagruzka'] = result.nagruzka
            object[Name]['programName'] = result.programName
            object[Name]['roundData'] = result.roundData
            return object
        })
}

function rewriteDataObject(promiseVariable) {
    promiseVariable
        .then(result => {
            console.log(result[0]['navigator_1'])
            let objectKeys = result.map(item => Object.keys(item)[0])
            objectKeys.forEach(item=> Diagram[item]=null)
            objectKeys.forEach((item, i)=> Diagram[item]=result[i][item])
            console.log(Diagram)
        })
        .then(
            result => {
                console.log('Все данные выведены');
            }
        )
        .catch(err => {
            console.error(err);
        });
}

// function ArrayToObject(Names) {
//     let back = {}
//     Names.forEach((item)=>{
//         let field = item;
//         let value = []
//         back[field] = value
//     })
//     return back
// }

// let object = ArrayToObject(Names)

let Names = ['navigator_1', 'navigator_2_golova_2', 'navigator_3']


// let stanki = Promise.all(Names.map(item=>{
//     return makeRequestArray(item)
// }));
//
// let Diagram = []
// rewriteData(stanki)

let stanki = Promise.all(Names.map(item=>{
    return makeRequestObject(item)
}));

let Diagram = {}
rewriteDataObject(stanki)

