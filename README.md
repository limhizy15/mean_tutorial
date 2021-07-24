https://www.a-mean-blog.com/ko/blog/MEAN-Stack/_/MEAN-Stack-%EC%86%8C%EA%B0%9C

위 블로그 강좌를 보고 따라해보는 중입니다 🌸
나중에 다시보기 쉽게 정리 중

[개발환경 구축](#개발환경)  
[Hello World!]
- HTTP Methods
- Express 서버
- Static, Dynamic Site
- EJS
주소록 만들기
- Mongo DB 설치 및 환경변수 
- CRUD와 7 Standard Actions
- 기능 - Index, New, Create
- 기능 - Show, Edit, Update, Destroy
- 

## 개발환경
#### npm
- Node Package Manager - node.js의 라이브러리 (https://www.npmjs.com)
- command line에서 package들을 npm으로 다운받을 수 있다.

`$npm init` package.json 파일 생성 (의존성 목록 기록)

`$npm install --save [package]` node_modules에 패키지 다운로드

`$npm install` 의존성 리스트에 있는 패키지를 모두 설치한다.

<br/>

#### 우분투에 node.js 설치 [링크](https://itstory.tk/entry/Ubuntu-1604-nodejs-%EC%99%80-npm-%EC%84%A4%EC%B9%98)
NVM을 이용한 설치방법
```shell
sudo apt-get update
sudo apt-get install build-essential libssl-dev

curl -sL https://raw.githubusercontent.com/creationix/nvm/v0.31.0/install.sh -o install_nvm.sh 
bash install_nvm.sh 
source ~/.profile

nvm ls-remote //버전확인

nvm install 6.0.0
nvm use 6.0.0 // 버전 변경 가능
node -v
nvm ls
```
=> (7.23) v16.5.0

#### python + node 활용시 가상 환경 구축 [링크](https://niceman.tistory.com/201)
```shell
# 가상환경 진입 후
$ pip3 install nodeenv
$ nodeenv --version
$ nodeenv -p  # 꽤 오래 걸리지만 인내심을 가질 것.
$ npm -v #체크
```

## Hello World!
#### HTTP Methods
- HTTP는 클라이언트와 서버 간 네트워크 통신을 위한 프로토콜 중 하나이다.
- GET, POST, PUT, PATCH, DELETE 메소드가 자주 쓰인다.

`GET` : 서버에게 데이터를 요청한다. 클라이언트로 전달!

`POST` : 서버에게 데이터를 보내고 DB 혹은 서버에 저장해달라고 요청한다.

`PUT` or `PATCH` : 서버에게 데이터 업데이트(수정)를 요청할 때 사용한다.

`DELETE` : DB or 서버에 존재하는 데이터의 삭제를 요청한다.

<br/>

#### Express로 서버 실행하기
Express는 node.js로 서버를 만드는 프레임워크이다.

express 설치
```shell
$ npm install --save express
$ npm install --save ejs express mongoose
```

```javascript
//index.js

var express = require('express'); 
var app = express();

app.get('/', function(req, res){
    res.send("Hello World!");
});

```

`require(' ')` modules에 설치된 모듈을 불러온다.
`app.get` 서버에 get 요청이 있을 때
`app.listen` 서버가 실행될 때 

```javascript
app.get('/', function(req, res){
    res.send("blah");
});
```

`req` request에 관련된 값들과 함수들이 저장되어 있는 객체
- console.log(req)를 통해 해당 객체의 내부를 확인할 수 있다.
`res` response에 관련된 값들과 함수들이 저장되어 있는 객체

서버 실행

`$ node index.js`

<br/>

#### Static, Dynamic
주로 동적사이트에서 일부만 정적인 페이지로 구성하는 경우가 많다.

#### EJS로 Dynamic Website 만들기
EJS = Embedded JavaScript
- Express에서 동적인 웹을 만들기 위해 template으로 사용되는 파일 (.ejs)

`$ npm install --save ejs`

함수는 ejs를 /views 폴더에서 찾는다.
ejs는 HTML에 js가 더해진 형태를 갖고 있다. js 코드는 `<% %>`안에 삽입되어야 한다.


<br/>

## 주소록 만들기
#### 환경변수
~/.bash_profile을 열어서
`export KEY="VALUE"` 형태로 넣으면 환경변수 추가 가능 => 터미널 재실행
export MONGO_DB="STRINGS~~"

#### 크롬브라우저로 node app을 디버깅하는 법
node --inspect index.js
chrome://inspect
콘솔창?이 뜬다 breakpoint 두면서 디버깅

`nodemon` : 서버 코드 변경시 자동으로 서버 재시작

<br/>

#### mongo DB 연결
mongoose 패키지 설치

```javascript
# --
mongoose.connect(process.env.MONGO_DB); //.bash_profile에 있는 환경변수를 불러올 수 있다.
let db = mongoose.connection; // db객체를 가져온다.
```

<br/>

#### CRUD와 7 Standard Actions
**CRUD** = Create, Read, Update, Delete
**7 Standard Actions**
생성
- New - form을 사용자에게 보여주고
- Create - 전달받은 데이터를 생성하는 과정

[수정]
- Edit - edit form을 사용자에게 보여주고
- Update - 전달받은 데이터로 현재 데이터를 수정

[조회]
- Index - 목록을 조회
- Show - 하나씩 상세히 보여줌

[삭제]
- Destroy

<br/>

#### 주소록 Index, New, Create
form에 정보를 받고 이를 서버에 전달 (new)
서버가 이 정보를 DB에 생성 (create)
생성된 정보의 목록을 보여줌 (index)

`npm install --save body-parser`

** 트러블..
app.use(bodyParser.json()); => bodyParser가 더 이상 사용되지 않습니다.
=> 원인 : express 최신 버전에는 내장되어 있다.
=> 해결방법
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

[모를 때마다 읽기](https://www.a-mean-blog.com/ko/blog/Node-JS-%EC%B2%AB%EA%B1%B8%EC%9D%8C/%EC%A3%BC%EC%86%8C%EB%A1%9D-%EB%A7%8C%EB%93%A4%EA%B8%B0/%EC%A3%BC%EC%86%8C%EB%A1%9D-Index-New-Create)

views/partials/ 폴더에 중복되는 부분의 코드를 빼놓았다.

** 트러블..
res.redirect('/contacts')가 안된다. 리다이렉트가 안돼~
왜? 다른 데서는 되는데 처음 페이지 ('/')에서 안된다.
