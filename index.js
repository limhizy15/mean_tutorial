//index.js

var express = require('express')
var app = express()

app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));

// app.get('/', function(req, res){
//     res.send("Hello World!");
// });

app.get('/hello', function(req, res){
    // 첫번째 매개변수 : ejs 이름 두번째 : 사용될 object
    res.render('hello', {name: req.query.nameQuery})
});

app.get('/hello/:nameParam', function(req, res){
    res.render('hello', {name: req.params.nameParam})
});

var port = 3000;
app.listen(port, function(){
    console.log('server on! http://localhost:'+port);
});