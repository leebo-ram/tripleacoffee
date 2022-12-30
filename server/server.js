const express = require('express');
const app = express();
const path = require('path');
const PORT = 3000; // 포트번호
const db = require('./db.js');
const mysql = require('mysql');
const bodyParser = require('body-parser');

app.use(express.static('../public'));
app.use(bodyParser.json());


app.get('/', function(req, res) {
    console.log(path.resolve())
    res.sendFile(path.join(path.resolve(), '../public/index.html'));
})

// 파일 업로드 multer라이브러리

const multer = require('multer');
let realfilename = '';

const upload =  multer({
    storage: multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, '../uploads/');
        },
        filename: function (req, file, cb) {
            realfilename = new Date().valueOf() + path.extname(file.originalname);
            cb(null, realfilename);
        }
    }),
});

// 메뉴추가
app.post('/addmenu', upload.single('m_img'), (req, res) => {
    console.log(req.body)
    const m_name = req.body.m_name;
    const m_price = req.body.m_price;
    const m_recipe = req.body.m_recipe;
    const m_img = realfilename;
    const m_options = req.body.m_options;
    const m_category = req.body.m_category;

    db.query("insert into tb_menu(m_name, m_price, m_recipe, m_img, m_options, m_category) values(?, ?, ?, ?, ?, ?)",[m_name, m_price, m_recipe, m_img, m_options, m_category],
    function(err, rows, fields) {
        if(err){
            console.log("메뉴등록 실패");
            console.log(err);
        }else{
            console.log("메뉴등록 성공");
        }
    })
})

// 메뉴 삭제
app.post('/delmenu', function(req, res) {
    console.log(req.body.m_idx);
    db.query("delete from tb_menu where m_idx=?", [req.body.m_idx], function(err, rows, fields) {
        
        if(err) {
            console.log('메뉴삭제 실패');
            console.log(err);
        }else {
            console.log('메뉴삭제 성공');
            res.send('1')
        }
    })
})


// 메뉴 호출
app.get('/callmenu', function(req, res) {
    console.log('11')
    db.query("select * from tb_menu",
    function(err, rows, fields) {
        if(err){
            console.log("메뉴호출 실패");
            console.log(err);
        }else{
            console.log("메뉴호출 성공");
            console.log(rows);
            res.send(rows);
        }
    })
})

// 메뉴 옵션 출력(음료별)
app.post('/calloptions', function(req, res) {
    const mo_name = req.body.m_options.split(';');
    let sql = `select * from tb_menuoptions where mo_idx=${mo_name[0]}`;
    if(mo_name.length > 0) {
        for(let i=1; i<mo_name.length; i++) {
            sql += ` or mo_idx=${mo_name[i]}`;
        }
    }

    db.query(sql, function(err, rows, fields) {
        if(err) {
            console.log('메뉴 출력 실패');
            console.log(err);
        }else {
            console.log('메뉴출력 성공');
            res.send(rows);
        }
    })
})

// 회원정보 확인(가입여부, 도장갯수 등)
app.post('/checkmobile', function(req, res) {
    console.log(req.body);
    const mem_mobile = req.body.mem_mobile;
    
    db.query("select * from tb_member where mem_mobile=?",[mem_mobile],
    function(err, rows, fields) {
        if(err){
            console.log("회원정보 확인 실패");
            console.log(err);
        }else{
            console.log("회원정보 확인 성공");
            res.send(rows);
        }
    })
})

// 매출로그 출력
app.get('/saleslog', function(req, res) {
    db.query("select * from tb_saleslog",
    function(err, rows, fields) {
        if(err){
            console.log("매출로그 출력 실패");
            console.log(err);
        }else{
            console.log("매출로그 출력 성공");
            res.send(rows);
        }
    })
})

// 매출로그 입력
app.post('/newsaleslog', function(req, res) {
    const sl_orderidx = new Date().valueOf();
    const sl_name = req.body.sl_name.split(';');
    const sl_amount = req.body.sl_amount.split(';');
    const sl_totalprice = req.body.sl_totalprice.split(';');

    let sqls = "";

    for(let i=0; i<sl_name.length; i++) {
        sqls += mysql.format('insert into tb_saleslog set sl_orderidx=?, sl_name=?, sl_amount=?, sl_totalprice=?;',[sl_orderidx, sl_name[i],sl_amount[i],sl_totalprice[i]]);
    }
    console.log(sqls)
    
    db.query(sqls, function(err, rows) {
        if(err) {
            console.log("매출로그 입력 실패");
            console.log(err);
        }else {
            console.log("매출로그 입력 성공");
            res.send(rows)
        }
    })
})

app.listen(PORT, () => console.log(`${PORT}번 포트 대기`));