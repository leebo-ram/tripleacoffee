const secret_key = require("./sens.js");

const axios = require('axios');
const Cache = require('memory-cache');
const CryptoJS = require('crypto-js');

const date = Date.now().toString();
const uri = secret_key.TAC_serviceId;
const secretKey = secret_key.TAC_secretKey;
const accessKey = secret_key.TAC_accessKey;
const method = 'POST';
const space = " ";
const newLine = "\n";
const url = `https://sens.apigw.ntruss.com/sms/v2/services/${uri}/messages`;
const url2 = `/sms/v2/services/${uri}/messages`;

const hmac = CryptoJS.algo.HMAC.create(CryptoJS.algo.SHA256, secretKey);

hmac.update(method);
hmac.update(space);
hmac.update(url2);
hmac.update(newLine);
hmac.update(date);
hmac.update(newLine);
hmac.update(accessKey);

const hash = hmac.finalize();
const signature = hash.toString(CryptoJS.enc.Base64);

exports.send = async function (req, response) {
    const phoneNumber = req.body.phoneNumber;

    Cache.del(phoneNumber);

    //인증번호 생성
    let verifyCode = "";
    for (let i = 0; i < 4; i++) {
        verifyCode += parseInt(Math.random() * 10);
    }


    Cache.put(phoneNumber, verifyCode.toString());
    console.log(verifyCode.toString())


    axios({
        method: method,
        withCredentials: true,
        json: true,
        url: url,
        headers: {
            'Content-Type': 'application/json',
            'x-ncp-iam-access-key': accessKey,
            'x-ncp-apigw-timestamp': date,
            'x-ncp-apigw-signature-v2': signature,
        },
        data: {
            type: 'SMS',
            contentType: 'COMM',
            countryCode: '82',
            from: '01082207959',
            content: `[TripleaCoffee] 인증번호 [${verifyCode}]를 입력해주세요.`,
            messages: [
                {
                    to: `${phoneNumber}`,
                },
            ],
        },
    })
        .then(function (res) {
            console.log(res.data)
            if (res.data.statusCode == '202') { response.send(true) }
            else { response.send(false) }
            //return res.data;
            //res.send(res.data);
        })
        .catch((err) => {
            if (err.response == undefined) {
                console.log(err)
                response.send(false);
                //return res.data;
                //res.send("실패")
            }
            else {
                console.log(err)
                response.send(false);
                //return res.data;
                //res.send("실패")
            }
        });
    //response.send(true)
};

