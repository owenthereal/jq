var jq = require('../out/jq.js')


function jqQuery() {
    var args = arguments

    return new Promise(function (resolve, reject) {
        jq().then((jq) => {
            resolve(jq.json.apply(jq, args))
        }).catch((e) => {
            reject(e)
        })
    })
}

jqQuery(
    { a: 'a letter', b: 'other letter', '%': null },
    'catch'
)
    .then(result => {
        console.log(result)
    }).catch((e) => {
        console.log("error")
        console.log(e)
    })

jqQuery(
    { message: 'This is an emoji test 🙏' },
    '.message'
)
    .then(result => {
        console.log(result)
    }).catch((e) => {
        console.log("error")
        console.log(e)
    })

// jq().then((jq) => {
//     console.log(jq)
//     console.log(jq.json(
//         { a: 'a letter', b: 'other letter', '%': null },
//         '[.a, .["%"]] | {res: .}'
//     ))
//     jqQuery(
//         { a: 'a letter', b: 'other letter', '%': null },
//         '[.a, .["%"]] | {res: .}'
//     )
//         .then(res => {
//             console.log(res)
//         })
// })
