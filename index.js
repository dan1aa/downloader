const exOne = /[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)?/gi;
const exTwo = '/download';
const regex = new RegExp("^" + exTwo + exOne + "$", 'i');
const http = require('http')
const download = require('file-download')

const fileUrl = 'https://freesoft.ru/storage/images/news/1/6/555/555_text.png';



let server = http.createServer((req, res) => {
    if(req.method === 'GET' && req.url.match(regex)) {
        var options = {
            directory: "./",
            filename: "test.png"
        }
        
        download(fileUrl, options, function(err){
            if (err) throw err
            console.log("success")
        }) 
        res.end()
    }
})

server.listen(3000, () => {
    console.log('server on 3000');
})
