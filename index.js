//index.js

var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser')
var app = express();

//db setting (아래 부분은 몇몇 글로벌 설정)
mongoose.set('useNewUrlParser', true);  
mongoose.set('useFindAndModify', false); 
mongoose.set('useCreateIndex', true); 
mongoose.set('useUnifiedTopology', true);
// process.env : 환경변수를 가지고 있는 객체 => db에 연결
mongoose.connect(process.env.MONGO_DB);
var db = mongoose.connection; //db객체를 가져와 변수에 넣어준다.

db.once('open', function(){
    console.log('DB connected');
});

db.on('error', function(err){
    console.log('DB ERROR : ', err);
});

//Other settings
app.set('view engine', 'ejs'); //express의 view engine에 ejs를 set
app.use(express.static(__dirname + '/public')); // 서버에 요청이 올 때마다 무조건 콜백함수가 실행됨
app.use(express.urlencoded({ extended: true }));
app.use(express.json()); // route의 콜백함수의 req.body에서 form데이터를 사용할 수 있다.

//DB schema (어떤 형식으로 정보를 저장할지)
var contactSchema = mongoose.Schema({
    name: {type: String, require: true, unique: true},
    email: {type: String},
    phone: {type: String}
});
// db의 model을 생성 (1: 콜렉션의 이름, 2: 생성된 객체)
// db에 있는 'contact'라는 콜렉션을 Contact변수에 연결
var Contact = mongoose.model('contact', contactSchema);

//Routes
//home
app.get('/', function(req, res){
    res.redirect('/contacts');
});

//contacts - index
app.get('/contacts', function(req, res){
    Contact.find({}, function(err, contacts){
        if(err) return res.json(err);
        // views 폴더 안의 contacts/index.ejs를 렌더링
        res.render('contacts/index', {contacts:contacts});
    });
});

// contacts - new
app.get('/contacts/new', function(req, res){
    res.render('contacts/new');
});

// contacts - create
app.post('/contacts', function(req, res){
    // 모델.create : DB에 data를 생성하는 함수
    Contact.create(req.body, function(err, contact){
        if(err) return res.json(err);
        res.redirect('/contacts'); // 다시 인덱스 페이지로
    });
});

var port = 3000;
app.listen(port, function(){ // 포트에 node.js 서버를 연결
    console.log('server on! http://localhost:'+port);
});