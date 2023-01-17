const express = require('express');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server)
const path = require('path');
const PORT = 3000; // 포트번호
const db = require('./db.js');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const sens = require("./sensController.js");
const Cache = require('memory-cache');

app.use(express.static('../public'));
app.use(express.static('../public/recipe'));
app.use(bodyParser.json());


app.get('/', function(req, res) {
    console.log(path.resolve())
    res.sendFile(path.join(path.resolve(), '../public/index.html'));
})

app.get('/recipedevice', function(req, res) {
    console.log(path.resolve())
    res.sendFile(path.join(path.resolve(), '../public/recipe/recipe.html'));
})

// 파일 업로드 multer라이브러리

const multer = require('multer');
let realfilename = '';

const upload =  multer({
    storage: multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, '../public/uploads/');
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
    const m_img = realfilename;
    const m_options = req.body.m_options;
    const m_category = req.body.m_category;
    const m_type = req.body.m_type;

    db.query("insert into tb_menu(m_name, m_price, m_img, m_options, m_category, m_type) values(?, ?, ?, ?, ?, ?)",[m_name, m_price, m_img, m_options, m_category, m_type],
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

    db.query("select * from tb_menu",
    function(err, rows, fields) {
        if(err){
            console.log("메뉴호출 실패");
            console.log(err);
        }else{
            console.log("메뉴호출 성공");
            res.send(rows);
        }
    })
})

// 메뉴 옵션 출력(음료별)
app.post('/calloptions', function(req, res) {
    console.log(req.body)
    if(req.body.m_options != '') {
        const mo_name = req.body.m_options.split(';');
        let sql = `select * from tb_menuoptions where mo_idx=${mo_name[0]}`;
        if(mo_name.length > 0) {
            for(let i=1; i<mo_name.length; i++) {
                sql += ` or mo_idx=${mo_name[i]}`;
            }
        }
    
        db.query(sql, function(err, rows, fields) {
            if(err) {
                console.log('옵션 호출 실패');
                console.log(err);
            }else {
                console.log('옵션 호출 성공');
                res.send(rows);
            }
        })
    }else {
        res.send('')
    }

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
            if(rows.length > 0) {
                res.send(rows);
            }else {
                db.query("insert into tb_member(mem_mobile) values(?)",[mem_mobile], function(err2, row2, fields2) {
                    if(err2) {
                        console.log(err2);
                    }else {
                        console.log(row2);
                        res.send(row2)
                    }
                })
            }
            
        }
    })
})

// 스탬프 사용 및 적립
app.post('/savestamp', function(req, res) {
    const mem_mobile = req.body.mem_mobile;
    const mem_stamp = req.body.mem_stamp;

    db.query("update tb_member set mem_stamp=? where mem_mobile=?",[mem_stamp, mem_mobile],
    function(err, rows, fields) {
        if(err) {
            console.log("스탬프 적립, 사용 실패");
            console.log(err)
            res.send(rows);
        }else {
            console.log('스탬스 적립, 사용 성공');
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
    console.log(req.body)
    const order_arr = req.body.sl_order.split('&');
    for(let i=0; i<order_arr.length; i++) {
        order_arr[i] = JSON.parse(order_arr[i]);
    }
    const sl_orderidx = req.body.sl_date;

    let sqls = "";

    for(let i=0; i<order_arr.length; i++) {
        sqls += mysql.format('insert into tb_saleslog set sl_orderidx=?, sl_name=?, sl_midx=?, sl_amount=?, sl_totalprice=?;',[sl_orderidx, order_arr[i].m_name, order_arr[i].m_idx, order_arr[i].m_quantity, order_arr[i].m_price]);
    }
    console.log(sqls)
    
    db.query(sqls, function(err, rows) {
        if(err) {
            console.log("매출로그 입력 실패");
            res.send(false)
            console.log(err);
        }else {
            console.log("매출로그 입력 성공");
            res.send(true)
        }
    })
    //res.send(true)
})

// SMS 발송
app.post('/smsCertification', sens.send);

// SMS 검증
app.post('/verifysms', function(req, res) {
        console.log(req.body)
        const phoneNumber = req.body.phoneNumber;
        const verifyCode = req.body.verifyCode;
    
        const CacheData = Cache.get(phoneNumber);
    
        if (!CacheData) {
            console.log('tlfvo')
            res.send(false);
        } else if (CacheData !== verifyCode) {
            console.log('tlfvo')

            res.send(false);
        } else {
            Cache.del(phoneNumber);
            console.log('성공')

            res.send(true);
        }

})

// 레시피 디바이스 코드는 여기부터
const recipe = io.of('/recipe').on('connection', function(socket) {
    socket.on('recipe transfer', function(data) {
        console.log('message from client: ', data);

        const name = socket.name = data.name;
        const room = socket.room = data.room;

        socket.join(room);

        recipe.to(room).emit('recipe transfer', data.msg);
    });
});

app.get('/callRecipe', function(req,res) {
    const m_name = req.query.m_name;
    db.query('select * from tb_recipe where r_name=?',[m_name], function(err,rows,fields) {
        if(err) {
            console.log(err);
            res.send(false);
        }else {
            res.send(rows)
        }
    })


})


server.listen(PORT, () => console.log(`${PORT}번 포트 대기`));