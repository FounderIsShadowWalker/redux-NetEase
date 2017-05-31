var Encrypt = require('./crypto.js');
var http = require('http');
var crypto = require('crypto');
var path = require('path');
var querystring=require("querystring");
var express = require('express');

var app = new express();
app.use(express.static(path.join(__dirname, '../img')))

function createWebAPIRequest(host, path, method, data, cookie, callback, errorcallback) {
    var music_req = '';
    var cryptoreq = Encrypt(data);
    var http_client = http.request({
        hostname: host,
        method: method,
        path: path,
        headers: {
            'Accept': '*/*',
            'Accept-Language': 'zh-CN,zh;q=0.8,gl;q=0.6,zh-TW;q=0.4',
            'Connection': 'keep-alive',
            'Content-Type': 'application/x-www-form-urlencoded',
            'Referer': 'http://music.163.com',
            'Host': 'music.163.com',
            'Cookie': 'appver=1.5.0.75771;',
            'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_9_2) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/33.0.1750.152 Safari/537.36',

        },
    }, function(res) {
        res.on('error', function(err) {
            errorcallback(err);
        });
        res.setEncoding('utf8');
        if (res.statusCode != 200) {
            console.log(res.statusCode);
            createWebAPIRequest(host, path, method, data, cookie, callback);
            return;
        } else {
            console.log("200");
            res.on('data', function (chunk) {
                music_req += chunk;
            });
            res.on('end', function() {
                if (music_req == '') {
                    console.log('empty');
                    createWebAPIRequest(host, path, method, data, cookie, callback);
                    return;
                }
                if (res.headers['set-cookie']) {
                    callback(music_req, res.headers['set-cookie']);
                } else {
                    callback(music_req);
                }
            })
        }
    });
    http_client.write('params=' + cryptoreq.params + '&encSecKey=' + cryptoreq.encSecKey);
    http_client.end();
}


function createRequest(path, method, data, callback) {
    var ne_req = '';
    var http_client = http.request({
        hostname: 'music.163.com',
        method: method,
        path: path,
        headers:{
            'Accept': '*/*',
            'Accept-Language': 'zh-CN,zh;q=0.8,gl;q=0.6,zh-TW;q=0.4',
            'Connection': 'keep-alive',
            'Content-Type': 'application/x-www-form-urlencoded',
            'Referer': 'http://music.163.com',
            'Host': 'music.163.com',
            'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_9_2) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/33.0.1750.152 Safari/537.36',
        },
    }, function(res) {
        res.setEncoding('utf8');
        res.on('data', function (chunk) {
            ne_req += chunk;
        });
        res.on('end', function() {
            callback(ne_req);
        })
    });

    if (method == 'POST') {
        http_client.write(data);
    }
    http_client.end();
}

app.get('/indexBanner', function (request, response) {
    var postData = querystring.stringify({
        "params": "0BD8BB39A78692F1744DEFF63EBC30F7889FA0D28FD18C56783C7BF3AADA4C516E269DCEF72717031B0D0797563D21D74A80931032E90A0DBF772B7B86DAB7B29C47227066BA6859EF81B2BDC94960501592EFDBED2FA4BB612DD34C3BE69C1CB997189A2D14BE23FACD2D81694F87D755097A4F93102FA38D9F1BEC9D758AE83C8A3FB28D0F0988D6D05408AC30C71B0F479C8A9AD7013EED947F5845864082B8F33870C6072EE08318D61C721CDBA09D78BE7335701A6C8B7D671983677CBFD9C460E3EAF290DFA9580214D746CD65E65CDD854A20F13A0CCA8C855507ED8FE54583BD5D55014AD6F46EB0250F61D9AD9A9F926C5E1B3979139277DBCDF27E7EB4BFC0C4996CD069835883475527C7D296034459225E90FC0FD45F259EDAD7767695C5FC054100B1600807C5577FA1888306CC90ED2B8CBD81EE5386F014F447E1054DDFC2111D5FBE730A90D986F4267E6BA157E3256F2924B9A2DD0B1F4C001E848DC9F85F05DE82FCCA50763549329EF9DF1BC9746B9CFB7308D72159C5A5DC242B76960F7E62827FD52B8F4BCF7A667EBDAD93E5D34CB68D92ECBCD7FEE9265DD359457ED508F38B088041E5BBFDB949F891FA490B48B24C2C754762F31DC4C0F0C8E3930D08A628D82D10C6CADDEA0BBDF8D9FF405C9FE9B2E5622BD99757F50109BF2BBE0B6804606EB5EF23E3D772D023013244905739680AC5801E039D02D768DDB47BE085BE698DFA91C29B13F34AFEC3DA8E69251F8EB21D1A1191E20A6BBC8695A6DE0944C24AF88F4F44B38B6B168EBDBC15BE5A9994029FB4B6A27106D6C6223DBCC49EC284E67DBB"
    });

    createRequest('/eapi/batch', 'POST', postData, function (res) {
        response.setHeader('Content-Type', 'application/json');
        response.send(res);
    })
})

app.get('/comment', function (request, response) {
    var rid = parseInt(request.query.id) || 186016;
    const cookie = 'appver=1.5.0.75771;';
    const data = {
        "offset": 0,
        "rid": rid,
        "limit": 20,
        "csrf_token": ""
    }


    createWebAPIRequest(
        'music.163.com',
        `/weapi/v1/resource/comments/R_SO_4_${rid}/?csrf_token=`,
        'POST',
        data,
        cookie,
        function(music_req) {
            response.setHeader("Content-Type", "application/json");
            response.send(music_req);
        },
        function(err) {
            response.status(502).send('fetch error');
        }
    );

})

//http://music.163.com/api/song/enhance/download/url?br=320000&id=28445467
app.get('/music/url', function(request, response) {
    var id = parseInt(request.query.id);
    var data = {
        "ids": [id],
        "br": 320000,
        "csrf_token": ""
    };
    console.log(data);
    var cookie = request.get('Cookie') ? request.get('Cookie') : '';

    createWebAPIRequest(
        'music.163.com',
        '/weapi/song/enhance/player/url',
        'POST',
        data,
        cookie,
        function(music_req) {
            response.setHeader("Content-Type", "application/json");
            response.send(music_req);
        },
        function(err) {
            response.status(502).send('fetch error');
        }
    )
});
//http://115.28.238.97 :3000/search?keywords=%E6%9C%9B%E7%A9%BF&type=1&limit=1
// type:  歌曲1 专辑10 歌手100 歌单1000 用户1002 mv1004 歌词 1006 主播电台 1009
app.get('/search', function(request, response) {
    var keywords = request.query.keywords;
    var type = request.query.type || 1;
    var limit = request.query.limit || 100;
    var offset = request.query.offset || 0;
    var data = 's=' + keywords + '&limit=' + limit + '&type=' + type + '&offset=' + offset;
    createRequest('/api/search/pc/', 'POST', data, function(res) {
        response.setHeader("Content-Type", "application/json");
        response.send(res);
    });
});
//http://115.28.238.97 :3000/login/cellphone?phone=13870824643&password=fang7693979
app.get('/login/cellphone', function(request, response) {
    var phone = request.query.phone;
    var cookie = request.get('Cookie') ? request.get('Cookie') : '';
    var md5sum = crypto.createHash('md5');
    md5sum.update(request.query.password);
    var data = {
        'phone': phone,
        'password': md5sum.digest('hex'),
        'rememberLogin': 'true'
    };

    createWebAPIRequest(
        'music.163.com',
        '/weapi/login/cellphone',
        'POST',
        data,
        cookie,
        function(music_req, cookie) {
            console.log(music_req);
            response.set({
                'Set-Cookie': cookie,
            });
            response.send(music_req);
        },
        function(err) {
            console.log('login error', err);
            response.status(502).send('fetch error');
        }
    )
});
//http://115.28.238.97 :3000/login?email=1528021521@qq.com&password=fang7693979
app.get('/login', function(request, response) {
    var email = request.query.email;
    var cookie = request.get('Cookie') ? request.get('Cookie') : '';
    var md5sum = crypto.createHash('md5');
    md5sum.update(request.query.password);
    console.log(email, request.query.password);
    var data = {
        'username': email,
        'password': md5sum.digest('hex'),
        'rememberLogin': 'true'
    };

    console.log(data);

    createWebAPIRequest(
        'music.163.com',
        '/weapi/login',
        'POST',
        data,
        cookie,
        function(music_req, cookie) {
            console.log(music_req);
            response.set({
                'Set-Cookie': cookie,
            });
            response.send(music_req);
        },
        function(err) {
            response.status(502).send('fetch error');
        }
    )
});
//http://115.28.238.97 :3000/recommend/songs   //每日推荐
app.get('/recommend/songs', function(request, response) {
    var cookie = request.get('Cookie') ? request.get('Cookie') : '';
    var data = {
        "offset": 0,
        "total": true,
        "limit": 1,
        "csrf_token": ""
    };

    console.log(data);

    createWebAPIRequest(
        'music.163.com',
        '/weapi/v1/discovery/recommend/songs',
        'POST',
        data,
        cookie,
        function(music_req) {
            console.log(music_req);
            response.send(music_req);
        },
        function(err) {
            response.status(502).send('fetch error');
        }
    )
});

// 获取每日推荐歌单
app.get('/recommend/resource', function(request, response) {
    var cookie = request.get('Cookie') ? request.get('Cookie') : '';
    var data = {
        "csrf_token": ""
    };

    console.log(data);

    createWebAPIRequest(
        'music.163.com',
        '/weapi/v1/discovery/recommend/resource',
        'POST',
        data,
        cookie,
        function(music_req) {
            console.log(music_req);
            response.send(music_req);
        },
        function(err) {
            response.status(502).send('fetch error');
        }
    )
});



//http://115.28.238.97 :3000/lyric?id=588980
app.get('/lyric', function(request, response) {
    var id = request.query.id;
    createRequest('/api/song/lyric?os=osx&id=' + id + '&lv=-1&kv=-1&tv=-1', 'GET', null, function(res) {
        response.setHeader("Content-Type", "application/json");
        response.send(res);
    });
});
//http://115.28.238.97 :3000/user/playlist?uid=91972124
app.get('/user/playlist', function(request, response) {
    var cookie = request.get('Cookie') ? request.get('Cookie') : '';
    var data = {
        "offset": 0,
        "uid": request.query.uid,
        "limit": 1000,
        "csrf_token": ""
    };

    console.log(data);

    createWebAPIRequest(
        'music.163.com',
        '/weapi/user/playlist',
        'POST',
        data,
        cookie,
        function(music_req) {
            response.setHeader("Content-Type", "application/json");
            response.send(music_req);
        },
        function(err) {
            response.status(502).send('fetch error');
        }
    )
});
//某一张专辑
//http://115.28.238.97 :3000/playlist/detail?id=173934373
app.get('/playlist/detail', function(request, response) {
    var cookie = request.get('Cookie') ? request.get('Cookie') : '';
    var detail, imgurl;
    var data = {
        "id": request.query.id,
        "offset": 0,
        "total": true,
        "limit": 1000,
        "n": 1000,
        "csrf_token": ""
    };

    console.log(data);

    createWebAPIRequest(
        'music.163.com',
        '/weapi/v3/playlist/detail',
        'POST',
        data,
        cookie,
        function(music_req) {
            response.setHeader("Content-Type", "application/json");
            // console.log(music_req);
            detail = music_req;
            // response.send(music_req);
            mergeRes();
        },
        function(err) {
            response.status(502).send('fetch error');
        }
    )

    // FIXME:i dont know the api to get coverimgurl
    //so i get it by parsing html
    var http_client = http.get({
        hostname: 'music.163.com',
        path: '/playlist?id=' + request.query.id,
        headers: {
            'Referer': 'http://music.163.com',
        },
    }, function(res) {
        res.setEncoding('utf8');
        var html = '';
        res.on('data', function (chunk) {
            html += chunk;
        });
        res.on('end', function() {
            var regImgCover = /\<img src=\"(.*)\" class="j-img"/ig;
            imgurl = regImgCover.exec(html)[1];
            mergeRes();

        })
    });

    var mergeRes = function() {
        if (imgurl != undefined && detail != undefined) {
            detail = JSON.parse(detail);
            detail.playlist.picUrl = imgurl;
            response.send(detail);
        }
    };

});

//评论

//op: add/del  pid:歌单   tracks: 歌曲id
app.get('/playlist/tracks', function(request, response) {
    var op = request.query.op
    var pid = request.query.pid;
    var tracks = request.query.tracks;
    var cookie = request.get('Cookie') ? request.get('Cookie') : '';
    console.log('COOKIESS', cookie);
    var data = {
        "op": op,
        "pid": pid,
        "tracks": tracks,
        "trackIds": JSON.stringify([tracks]),
        "csrf_token": "",
    };

    console.log(data);

    createWebAPIRequest(
        'music.163.com',
        '/weapi/playlist/manipulate/tracks',
        'POST',
        data,
        cookie,
        function(music_req) {
            console.log(music_req);
            response.send(music_req);
        },
        function(err) {
            response.status(502).send('fetch error');
        }
    )
});

app.get('/eapi/batch', function (request, response) {
    var cookie = request.get('Cookie') ? request.get('Cookie') : '';
    // createRequest('/api/song/lyric?os=osx&id=' + id + '&lv=-1&kv=-1&tv=-1', 'GET', null, function(res) {
    //     response.setHeader("Content-Type", "application/json");
    //     response.send(res);
    // });
    createRequest('/eapi/batch', 'GET', null, function (res) {
         response.setHeader('Content-Type', 'application/json');
         response.send(res);
    })

})

app.get('/log/web', function(request, response) {
    var cookie = request.get('Cookie') ? request.get('Cookie') : '';
    var data = {
        "action": request.query.action,
        "json": request.query.json,
        "csrf_token": "",
    };

    console.log(data);

    createWebAPIRequest(
        'music.163.com',
        '/weapi/log/web',
        'POST',
        data,
        cookie,
        function(music_req) {
            console.log(music_req);
            response.send(music_req);
        },
        function(err) {
            response.status(502).send('fetch error');
        }
    )
});

process.on('SIGHUP', function() {
    console.log('server: bye bye');
    process.exit();
});

module.exports = app;
