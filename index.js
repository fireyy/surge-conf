var request = require('superagent'),
    fs = require('fs'),
    config = require('./config');

if (!config.username || !config.password) {
    console.error("username or password not found...");
    process.exit(1);
}

var REX_STR = new RegExp("&lt;(.*?)&gt; Host: (.*?) Port: (\\d+)", "g"),
    CONFIG_STR = "$1 = https,$2,$3,"+config.username+","+config.password+",cipher=TLS_RSA_WITH_AES_128_GCM_SHA256",
    PROXY = [],
    PROXY_GROUP = {},
    PROXY_GROUP_ARR = [],
    FLAGS = {
      "US": "🇺🇸",
      "GB": "🇬🇧",
      "HK": "🇭🇰",
      "JP": "🇯🇵",
      "KR": "🇰🇷",
      "SG": "🇸🇬",
      "TW": "🇨🇳"
    };

request
  .get('https://ealoop.gfw.io:3443/surgeconfman.php?s')
  .auth(config.username, config.password)
  .end(function(err, res){
    if(err) throw err;

    var test = res.text.match(REX_STR), ct;
    test.forEach(function(string){
      t = string.replace(REX_STR, CONFIG_STR);
      ct = t.substr(0,2);
      t = (FLAGS[ct] ? FLAGS[ct] : "") + t;
      if(!PROXY_GROUP[ct]){
        PROXY_GROUP[ct] = [];
      }
      PROXY_GROUP[ct].push(t.split(" = ")[0]);
      PROXY.push(t);
    })

    for (var z in PROXY_GROUP) {
      PROXY_GROUP_ARR.push(z + " = " + "select, " + PROXY_GROUP[z].join(", "));
    }

    fs.readFile('conf/soffchen.conf', 'utf8', function (err1,data) {
      if(err1) throw err1;
      data = data.replace("##Proxy##", PROXY.join('\n'));
      data = data.replace("##Proxy Group##", PROXY_GROUP_ARR.join('\n'));
      fs.writeFile("surge.conf", data, function(err2){
          if(err2) throw err2;
      })
    });
  });
