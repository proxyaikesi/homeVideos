const express = require('express')
const bodyParser = require("body-parser");
const mongoose = require('mongoose')
const fs = require('fs')
const uploadhome = require('./routers/uploadhome')
const uploader = require("express-fileupload");
const db = require('./db.js')
const puppeteer = require('puppeteer');

const http = require('http')
const request = require('request')
const https = require('https')






const MAX_TRY_TIME = 30; // 未抓取到视频重试次数
const RETRY_INTERVAL = 1000; // 未抓取到视频重试间隔 ms
const { extname, resolve } = require("path");
const { existsSync, appendFileSync, writeFileSync } = require("fs");
mongoose.connect('mongodb://localhost:27017/video', {
    useNewUrlParser: true
})
const app = express()

mongoose.connection.on('connected', (error) => {
    console.log('mongodb连接成功');
})
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(uploader({
    createParentPath: true,
    defParamCharset: "utf8" // 添加utf8编码
}));
// app.use('/',express.static('upload_temp'))
app.use('/', express.static('upload'))

// console.log('expressexpress',express.static(''));

app.all('*', function (req, res, next) {

    res.header("Access-Control-Allow-Origin", req.headers.origin);
    res.header('Access-Control-Allow-Credentials', true); // 告诉客户端可以在HTTP请求中带上Cookie
    res.header("Access-Control-Allow-Headers", "Origin, No-Cache, X-Requested-With, If-Modified-Since, Pragma, " +
        "Last-Modified, Cache-Control, Expires, Content-Type, Content-Language, Cache-Control, X-E4M-With,X_FILENAME");
    res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
    res.header("Content-Type", "application/json;charset=utf-8");
    // res.header("Access-Control-Allow-Origin", "*");
    next();
})
app.post('/register', require('./routers/register')) // 注册
app.post('/login', require('./routers/login'))  // 登录
app.post('/videoInfo', require('./routers/videoInfo')) // 视频信息上传
app.post('/uploadhome', require('./routers/uploadhome')) // 视频上传
app.post('/deleteInfo', require('./routers/deleteInfo')) // // 删除视频
app.post('/videoManage', require('./routers/videoManage')) // 查找公开视频

app.post('/unpublished', require('./routers/Unpublished')) // 查找未公开视频
app.post('/deleteVideoInfo', require('./routers/deleteVideoInfo')) // 删除视频信息表
app.get('/getVideo', require('./routers/getVideo')) // 删除视频信息表


// const superagent = require('superagent');
// const { promises } = require('dns');




// const { TikTokScraper } = require('tiktok-scraper');

// // Username of someone who has posted videos
// let tiktokUsername = "koung402";

// // Create a scraper instance
// let scraper = new TikTokScraper();

// // Get the session value
// let session = scraper.getSession();

// // Set the session value
// scraper.setSession(session);

// // Scrape videos from the username
// scraper.user(tiktokUsername, { 
//     // Number of posts to scrape
//     number: 50,
//     // Download video files without the watermark
//     noWaterMark: true,
//     // Save video files to a ZIP archive
//     zip: true,
//     // File name for the ZIP archive
//     fileName: "videos.zip"
// }).then(data => {
//     // Do something with the data
//     console.log(data);
// }).catch(err => {
//     // Handle error
//     console.error(err);
// });



















// const options = {

//     // hostname:'xy49x70x1x123xy.mcdn.bilivideo.cn:8082',

//     // path: 'https://xy58x218x65x50xy.mcdn.bilivideo.cn:4483/upgcxcode/76/31/1241633176/1241633176-1-30077.m4s?e=ig8euxZM2rNcNbdlhoNvNC8BqJIzNbfqXBvEqxTEto8BTrNvN0GvT90W5JZMkX_YN0MvXg8gNEV4NC8xNEV4N03eN0B5tZlqNxTEto8BTrNvNeZVuJ10Kj_g2UB02J0mN0B5tZlqNCNEto8BTrNvNC7MTX502C8f2jmMQJ6mqF2fka1mqx6gqj0eN0B599M=&uipk=5&nbs=1&deadline=1693981658&gen=playurlv2&os=mcdn&oi=1857169965&trid=00000b57ae85cc5145efad0df1e77d65348fu&mid=398449558&platform=pc&upsig=c31f0294b1512224792a9bea57e6b55c&uparams=e,uipk,nbs,deadline,gen,os,oi,trid,mid,platform&mcdnid=14002148&bvc=vod&nettype=0&orderid=0,3&buvid=F3857D3D-B03C-D275-C90D-D8984C7DB6F919851infoc&build=0&f=u_0_0&agrr=0&bw=105781&logo=A0002000',
//     path:'https://xy49x70x1x123xy.mcdn.bilivideo.cn:8082/v1/resource/1241633176-1-30280.m4s?agrr=0&build=0&buvid=F3857D3D-B03C-D275-C90D-D8984C7DB6F919851infoc&bvc=vod&bw=11475&deadline=1693981658&e=ig8euxZM2rNcNbdlhoNvNC8BqJIzNbfqXBvEqxTEto8BTrNvN0GvT90W5JZMkX_YN0MvXg8gNEV4NC8xNEV4N03eN0B5tZlqNxTEto8BTrNvNeZVuJ10Kj_g2UB02J0mN0B5tZlqNCNEto8BTrNvNC7MTX502C8f2jmMQJ6mqF2fka1mqx6gqj0eN0B599M%3D&f=u_0_0&gen=playurlv2&logo=A0002000&mcdnid=14002148&mid=398449558&nbs=1&nettype=0&oi=1857169965&orderid=0%2C3&os=mcdn&platform=pc&sign=46cbc0&traceid=trXLRvaGpwqhWm_0_e_N&uipk=5&uparams=e%2Cuipk%2Cnbs%2Cdeadline%2Cgen%2Cos%2Coi%2Ctrid%2Cmid%2Cplatform&upsig=0facccd87f802338407630bd9b6eb878',
//     // method: 'GET',
//     // path:'https://example.com/large/file.ext',
//     rejectUnauthorized: false,
//     // headers: {
//     //     'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/116.0.0.0 Safari/537.36',
//     //     'Referer': 'https://www.bilibili.com'
//     // },

//     // agent: false,
// };





// const req = superagent
// .get('')
// .set('User-Agent','Mozilla/5.0(WindowsNT10.0;Win64;x64)AppleWebKit/537.36(KHTML,likeGecko)Chrome/116.0.0.0Safari/537.36')
// .set('Referer','https://www.bilibili.com/')
// .set('cookie','YOUR COOKIEYOUR COOKIE')
// .set('Accept','*/*')
// .set('Accept-Encoding','identity')
// .set('Accept-Language','zh-CN,zh;q=0.9')
// .set('Cache-Control','no-cache')
// .set('Connection','keep-alive')
// .set('Host','xy114x234x191x219xy.mcdn.bilivideo.cn:8082')
// .set('Origin','https://www.bilibili.com')
// .set('Pragma','no-cache')
// .set('Range','bytes=1964621-2019206')
// .set('Referer','https://www.bilibili.com/video/BV158411X7ZZ/?spm_id_from=333.1007.tianma.3-4-')
// .set('Sec-Ch-Ua','"Chromium";v="116", "Not)A;Brand";v="24", "Google Chrome";v="116"')
// .set('Sec-Ch-Ua-Mobile','?0')
// .set('Sec-Ch-Ua-Platform','"Windows"')
// .set('Sec-Fetch-Dest','empty')
// .set('Sec-Fetch-Mode','cors')
// .set('Sec-Fetch-Site','cross-site')
// .set('User-Agent','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/116.0.0.0 Safari/537.36')
// // .end((res)=>{
// //     console.log(res);
// // })
// console.log(req);
// req.pipe(fs.createWriteStream('./222.m4s'))


// console.log(req);

// .get('https://v16-webapp-prime.tiktok.com/video/tos/alisg/tos-alisg-pve-0037/oQJwf523RM9cCsLEgFUDpDARAr8fOobSEACnfD/?a=1988&ch=0&cr=3&dr=0&lr=unwatermarked&cd=0%7C0%7C0%7C3&cv=1&br=3998&bt=1999&bti=ODszNWYuMDE6&cs=0&ds=3&ft=_RwJrB9eq8ZmoUlvic_vjuEELAhLrus&mime_type=video_mp4&qs=0&rc=ZjQ6Zzc0ZDczOTk1aWlpaEBpamc1Z2g6Zmt4bTMzODgzNEBgYS5jNmFiNS4xNC0tYV5eYSNnajE2cjRfc2RgLS1kLzFzcw%3D%3D&btag=e00088000&expire=1694096506&l=2023090708212594030538265532028BB2&ply_type=2&policy=2&signature=0b93ac708cfc713682a9ac3f01dfd97a&tk=tt_chain_token')
// .set('authority','v16-webapp-prime.tiktok.com')
// .set('method','GET')
// .set('path','/video/tos/alisg/tos-alisg-pve-0037/oQJwf523RM9cCsLEgFUDpDARAr8fOobSEACnfD/?a=1988&ch=0&cr=3&dr=0&lr=unwatermarked&cd=0%7C0%7C0%7C3&cv=1&br=3998&bt=1999&bti=ODszNWYuMDE6&cs=0&ds=3&ft=_RwJrB9eq8ZmoUlvic_vjuEELAhLrus&mime_type=video_mp4&qs=0&rc=ZjQ6Zzc0ZDczOTk1aWlpaEBpamc1Z2g6Zmt4bTMzODgzNEBgYS5jNmFiNS4xNC0tYV5eYSNnajE2cjRfc2RgLS1kLzFzcw%3D%3D&btag=e00088000&expire=1694096506&l=2023090708212594030538265532028BB2&ply_type=2&policy=2&signature=0b93ac708cfc713682a9ac3f01dfd97a&tk=tt_chain_token')
// .set('scheme','https')
// .set('Accept','*/*')
// .set('Accept-Encoding','identity;q=1, *;q=0')
// .set('Accept-Language','en')
// .set('Cache-Control','no-cache')
// .set('Pragma','no-cache')
// .set('Range','bytes=0-')
// .set('Sec-Ch-Ua','"Chromium";v="116", "Not)A;Brand";v="24", "Google Chrome";v="116"')
// .set('Sec-Ch-Ua-Mobile','?0')
// .set('Sec-Ch-Ua-Platform','"Windows"')
// .set('Sec-Fetch-Dest','video')
// .set('Sec-Fetch-Mode','cors')
// .set('Sec-Fetch-Site','same-site')
// .set('Cookie','tt_chain_token=mSJkZxQXX0nV70oe4gjDUA==; passport_csrf_token=f0dea9d6223ef6cfc4bd74998d954d3d; passport_csrf_token_default=f0dea9d6223ef6cfc4bd74998d954d3d; passport_auth_status=58f419525d2833ef24f85c4dbcde7da8%2C; passport_auth_status_ss=58f419525d2833ef24f85c4dbcde7da8%2C; d_ticket=afedadd103dd70e5d9cbb38cf9accd8e57078; multi_sids=7199676325379130374%3A2354b8cc2126bccfa664ffda94ef03c9; cmpl_token=AgQQAPOYF-RO0rPUjd94MZ0__rU2E4acP4fZYM0kkw; sid_guard=2354b8cc2126bccfa664ffda94ef03c9%7C1693722664%7C15552000%7CFri%2C+01-Mar-2024+06%3A31%3A04+GMT; uid_tt=d4fe0b8b9f4bc4beb852f11147d520ed6e3b188743e786aede9e9d0ea0d3a246; uid_tt_ss=d4fe0b8b9f4bc4beb852f11147d520ed6e3b188743e786aede9e9d0ea0d3a246; sid_tt=2354b8cc2126bccfa664ffda94ef03c9; sessionid=2354b8cc2126bccfa664ffda94ef03c9; sessionid_ss=2354b8cc2126bccfa664ffda94ef03c9; sid_ucp_v1=1.0.0-KDdkN2JkOWI4ZGExYzI0MzQ5MGQ2NmJkNzljMGRhMzJkY2MzNTQ1MGQKIAiGiI2Aj--Y9WMQqNDQpwYYswsgDDCWx6mfBjgBQOsHEAMaCHVzZWFzdDJhIiAyMzU0YjhjYzIxMjZiY2NmYTY2NGZmZGE5NGVmMDNjOQ; ssid_ucp_v1=1.0.0-KDdkN2JkOWI4ZGExYzI0MzQ5MGQ2NmJkNzljMGRhMzJkY2MzNTQ1MGQKIAiGiI2Aj--Y9WMQqNDQpwYYswsgDDCWx6mfBjgBQOsHEAMaCHVzZWFzdDJhIiAyMzU0YjhjYzIxMjZiY2NmYTY2NGZmZGE5NGVmMDNjOQ; store-idc=useast2a; store-country-code=gb; store-country-code-src=uid; tt-target-idc=useast2a; tt-target-idc-sign=BfcfFQe5UwAc4EXaqZkl3PMGATDrn5Il_BtsSfyS_6vUobQnAqFnkHrZnFuNA7qF42_tPDQEUYZwtXsh-62QQZQxdo5PbcHrGmqogOKMbdWSQUxJCY7jflZ7AniumFD82Lq5OxVVO-2xmrAq1Z4SNAGc7MHCnhyWTzXeMkSEqgUrsfWpRhdHeXRnhaAWfrwZ_StA3AqpDx_ZmRgZHEB7ZWS77044bw7ENNv8Uyj6bcXDlgRr1imT0UDOirpm84bxAiM-U9ckU3Kw74uoa0OylHHYONEOqK8FzFJJ7fOOIYkk3DHV8h6NQ-Wp5mMOpKRelnw0CfDBbep82zDKNu4azqCamjSJHiMktsaQPkij483-NjilnwegRnrX5TT10BiQ1vgwsk5t0DLGBkc_lXlgpBTnmCWfLL4HjPCBOoRFzICx_PPqTY8CsE5J8AQBq_bHPVa87mijUMdU8kYIL5w6F9ECjC-ZrDhLjbhuthRwutSIL05MrPYB_-HzFWWl9wlx; tt_csrf_token=v3I9Kewz-TzHYoHIj4WGp5WMpYDXWUMl5GtM; ttwid=1%7C9SN6h7CkavLKyaLMWJXV6ZUL40V9E4tUqRXcre3qxc8%7C1694081251%7C1f82f83e402ec666e3b0118863c809f0e9a9c6c14e96e72dbe1d629c42f0eef7; odin_tt=c14980f06fb5948075fbcf21575edfe7f2ae5e491faefd0f46c27c20105cf56d2cefcbc49003d5cf395209b20d623003f579c40d210fde94ffae0bba8789b597d7831162b07409f824ee8e6323bf0d07; msToken=XT9P4I8WOcGmFBafTNKcZ9_WAXU-ikRVbyMypxTAGMzWTe4ZJ5iBXP36ZwvpreMcmAhJ5PUGX5yNyiooPm5IUnZ5Ow13uBpsuvAq-w7OZMcB4uvdOIHVstVTdfHBJkz-eprqrHrhePkp_3Cdeg==')


// const req = superagent
// .get('https://v39-as.tiktokcdn.com/295800e48d01874be6182cd68e47bc4a/64f9c9c7/video/tos/useast2a/tos-useast2a-ve-0068c001-euttp/oonEkDQnQWIB33O8bIkRDgAiQkfep3Iw52Ju4P/?a=1180&ch=0&cr=13&dr=0&lr=all&cd=0%7C0%7C0%7C&cv=1&br=4462&bt=2231&bti=OHYpOTY0Zik7OzlmOm01MzE6ZC4xMDo%3D&cs=0&ds=6&ft=ARfugB8vq8Zmo_hUic_vjwm6echLrus&mime_type=video_mp4&qs=0&rc=OGVkPGdkOzY4aDxoOjpnNkBpM2VobTs6ZndzbTMzZjczM0BgYzUzM2NhNjAxLzAzMmJeYSMxYm9ocjRnb2NgLS1kMWNzcw%3D%3D&l=202309070701432D3E71073DE0530B5787&btag=e00088000')
// .set('Referer','https://www.tiktok.com/')
// .set('User-Agent','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/116.0.0.0 Safari/537.36')
// .then((res)=>{
//     console.log(res);
// })

// console.log(req);

// req.pipe(fs.createWriteStream('./6666666666666666666.mp4'))














// const req = superagent
//     .get('https://s8.fsvod1.com/20230606/C9ckgaRg/1500kb/hls/index.m3u8')
//     .set('Referer', 'http://www.nnlfj.com/')
//     .set('Origin', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/116.0.0.0 Safari/537.36')


// req.pipe(fs.createWriteStream('./wahhh.txt'))


// fs.readFile('./wahhh.txt', (err, data) => {
//     if (err) throw err;
//     let dataall = data.toString()
//     // 定义原始数据
//     var prefix = "https://s8.fsvod1.com";
//     // 定义正则表达式，匹配以/20230606开头的字符串
//     var pattern = /\/20230606\S+/g;
//     // 使用String.prototype.match()方法，找出所有符合正则表达式的字符串，并存入一个数组
//     var matches = dataall.match(pattern);
//     // 使用Array.prototype.map()方法，给每个字符串加上前缀，并存入一个新数组
//     var requests = matches.map(function (match) {
//         return prefix + match;
//     });
//     let num = 812
//     async function executeRequests(requests) {
//         // 如果请求数组为空，直接返回
//         if (requests.length === 0) return;
//         // // 取出第一个请求，并执行它
//         num++
//         let reqList = requests.shift();
//         // console.log(num,reqList);

//         let res = await new Promise(resolve => {
//             request.get(reqList, (error, response, body) => {

//             }).pipe(fs.createWriteStream(`all${num}.ts`))
//             console.log('上传完成');
//             resolve()
//         })
//         await new Promise((resolve) => {
//             setTimeout(() => {
//                 console.log('延迟完了');
//                 resolve()
//             }, 5000);

//         })
//         setTimeout(() => {
//             console.log('111111111111111111111111', num);
//             executeRequests(requests);
//         }, 3000);


//     }

//     // 调用函数，开始执行请求
//     executeRequests(requests);
// });
// function fan() {
//     setTimeout(() => {
//         console.log('5m秒过后');
//     }, 5000);
// }



// 定义要写入的数据
// let data = '';

// // // 用for循环生成数据
// for (let i = 1; i <= 1036; i++) {
//     // 每次循环，拼接一个hell加上数字，再加上换行符

//         data += `file 'all${i}.ts' \n`;


// }

// // // 创建一个txt文件，并写入数据
// fs.writeFile('files.txt', data, (err) => {
//     // 如果出错，打印错误信息
//     if (err) {
//         console.error(err);
//     }
//     // 如果成功，打印成功信息
//     else {
//         console.log('文件创建成s功');
//     }
// });




// 解密ts加密视频 start

// const crypto = require('crypto');
// // 读取key密钥文件内容
// // const keyContent = fs.readFileSync('./key.bin', 'hex');
// const keyContent = fs.readFileSync('./key.txt', 'utf-8');
// console.log(keyContent);
// // 创建一个解密器对象，使用AES-128-CBC算法和key密钥
// const decipher = crypto.createDecipheriv('aes-128-cbc', Buffer.from(keyContent, 'utf-8'), Buffer.alloc(16, 0));
// // 读取ts文件内容
// const tsContent = fs.readFileSync('./333.ts');
// // 使用解密器对象对ts文件内容进行解密
// let decryptedContent = decipher.update(tsContent);
// // 调用final方法结束解密
// decryptedContent = Buffer.concat([decryptedContent, decipher.final()]);
// // 写入到新的文件中，命名为video_decrypted.ts
// fs.writeFileSync('video_decrypted.ts', decryptedContent);

// 解密ts加密视频 end




















// const getListFile = '';
// function getList() {

//     // fs.readFile('./load.txt', (err, data) => {
//     //     if (err) throw err;
//     //     let dataall = data.toString()
//     //     var regex = /(http.*?\.ts)/g;
//     //     var output = dataall.match(regex);
//     //     console.log('response', output);
//     //     for (var i = 0; i <= output.length; i++) {
//     //         request.get(output[i], (error, response, body) => {
//     //             console.log('output[i]', output[i]);

//     //         }).pipe(fs.createWriteStream(`all${i}`));
//     //     }
//     // });
//     request.get('https://c2.monidai.com/ppvod/84F2C04B47661FF7C828F9180EC2D430.m3u8', (error, response, body) => {

//         var regex = /(http.*?\.ts)/g;
//         var output = body.match(regex);
//         for (var i = 0; i <= output.length - 1; i++) {
//             // console.log('output[i]', output[i]);
//             request.get(output[i], (error, response, body) => {
//                 // if (error) throw error;

//             }).pipe(fs.createWriteStream(`./allts${i}.ts`));
//         }

//     })


// }

// // getList()


// // 引入 request 模块
// const request = require("request");
// // 假设 urls 是一个包含 https 请求的 url 的数组
// // 假设 dir 是一个保存图片的目录
// // 引入 fs 模块
// const fs = require("fs");

// // 遍历 urls 数组，对每个 url 调用 request.get 函数
// urls.forEach((url) => {
//     // 从 url 中获取图片的文件名
//     let filename = url.split("/").pop();
//     // 创建一个写入流，指定保存路径和文件名
//     let file = fs.createWriteStream(dir + "/" + filename);
//     // 发送 https 请求，并将响应数据写入文件
//     request.get(url).pipe(file);
//     // 文件写入完成后，打印日志
//     file.on("finish", () => {
//         console.log("Downloaded " + filename);
//         // 关闭文件流
//         file.close();
//     });
// });


// // 假设 urls 是一个包含 https 请求的 url 的数组
// // 假设 dir 是一个保存图片的目录
// // 引入 https 和 fs 模块
// const https = require("https");
// const fs = require("fs");

// // 定义一个函数，用来发送 https 请求并下载图片
// function downloadImage(url, dir) {
//     // 从 url 中获取图片的文件名
//     let filename = url.split("/").pop();
//     // 创建一个写入流，指定保存路径和文件名
//     let file = fs.createWriteStream(dir + "/" + filename);
//     // 发送 https 请求
//     https.get(url, (res) => {
//         // 将响应数据写入文件
//         res.pipe(file);
//         // 文件写入完成后，打印日志
//         file.on("finish", () => {
//             console.log("Downloaded " + filename);
//             // 关闭文件流
//             file.close();
//         });
//     });
// }

// // 遍历 urls 数组，对每个 url 调用 downloadImage 函数
// urls.forEach((url) => {
//     downloadImage(url, dir);
// });




//************************************************************
// 合并ts视频

// const { exec } = require('child_process')
// // 执行cmd命令
// exec('ffmpeg.exe -i 222.m4s -i 111.m4s -c copy 合并视频.mp4', (err, stdout, stderr) => {
//   if (err) {
//     throw err
//   }
//   console.log('视频已合并。')
// })


//************************************************************






//************************************************************

// request.get 获取的二进制丢失 
// let url = 'https://s8.fsvod1.com/20230606/C9ckgaRg/index.m3u8'
// var agent = new https.Agent({
//     path: url,
//     rejectUnauthorized: false
// });
// var options = {
//     url: url,
//     headers: {
//         'User-Agent':'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/116.0.0.0 Safari/537.36',
//         'Referer': 'https://www.bilibili.com/video/BV1J94y1x7DA/?spm_id_from=333.1007.tianma.4-1-11.click&vd_source=23d179354212f8e68cb27d1a629fae29',
//     },
//     agent: agent
// };
// const request1 = request.get(options, function (error, response, body) {
//     if (error) {
//         console.log(error);
//     } else {
//         // 将响应数据转换为一个Buffer对象
//         const buffer = Buffer.from(body, 'binary');
//         console.log(response);
//         fs.writeFile('list.m4s', buffer, (err) => {
//             // 检查是否有错误
//             if (err) {
//                 // 处理错误
//                 console.error(err);
//             } else {
//                 // 写入成功
//                 console.log('File saved successfully');
//             }
//         });
//     }
// })


//************************************************************











































app.listen(3000)
console.log('server is running 3000');

// node 爬虫
// fn()
function fn() {
    (async () => {
        const browser = await puppeteer.launch({
            headless: false, // 是否无头浏览
        });
        const page = await browser.newPage();

        // await page.goto('https://www.douyin.com/user/self?modal_id=7269349780550110518&showTab=like');
        await page.goto('https://v.douyin.com/ieYE9K26/');

        await page.waitForSelector('xg-video-container > video > source:nth-child(1)')

        await page.$$eval(
            "xg-video-container > video > source:nth-child(1)",
            (links) => links.map((x => x.src))
        ).then((element) => {
            console.log('sxcvxcfxxcv', element);
        })

    })()
}
