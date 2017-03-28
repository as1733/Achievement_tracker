/**
 * Created by as1733 on 27-03-2017.
 */
var findres=-2;//will have rejection codes on -1 if wrong username 0 for wrong password 1 for correct combination;
var webSocketServer = require('ws').Server;
var express=require('express');
var path = require('path');
var cookieParser = require('cookie-parser')
var server=new webSocketServer({port:9060});
var bodyParser = require('body-parser');
var app=express();
{var rootLoginTable;
var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
var url = 'mongodb://192.168.118.20:27017/target';
MongoClient.connect(url, function(err, db) {
    assert.equal(null, err);
   rootLoginTable= db.collection('login');

});
}


app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');
app.use(cookieParser("aditya@13isscr"))
app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
    extended: true
}));

{
    app.use(express.static(('public')));
    console.log(__dirname);
    app.get('/', function (req, res) {
        res.cookie('username',"newUser");
        res.sendFile(path.join(__dirname + '/index.html'));
    });


    app.post('/signup', function (req, res) {
        var params=req.body;
        console.log(req.body);
        res.cookie('username',"done");
        console.log('cookie created successfully');
        signup(params);
        var entry={username:params.username,name:params.name_us,password:params.pass_us}
        rootLoginTable.insert(entry,function(err,result){

            console.log(result);
                if(err){
                    res.cookie("enteredindatabase","false");
                    res.sendFile(path.join(__dirname + '/index.html'));
                }
                else{
                    res.cookie("enteredindatabase","true");
                    res.cookie("username",params.username);

                    res.render(path.join(__dirname + '/filldetails.html'),{branch:params.username});

                };

        });
        ;
    });

    app.post('/login', function (req, res) {
        var params=req.body;
        console.log(params);//params has { name_us: '', username: '', pass_us: '', conf_pass_us: '' }


        (rootLoginTable.findOne({username:params.username})).then(
            function(d){

            console.log(d);
            var x =checker(d,params,res);
            },
            function(e){console.log("Error in Query Execution for login");});

        ;





    });

    app.listen(3043, "192.168.118.20");
}


function checker(dd,param,ress){console.log("data is here ready to check");
if(dd.password===param.pass_us){
    findres=1;

ress.send("registered User");
}else if(dd.password!=param.pass_us) {
    findres = 0;
    ress.send("Incorrect password from User");

}else if(dd==null)
{findres=-1;console.log("Username not present");

    ress.send("Username not Found");
}

console.log("Logind code"+findres);
return findres;


};
function signup(){};

function findinDB (db,collection,field,value,result){
    var url;


}


{

    server.on("connection",function(link){
    link.on('message',function(data){
        console.log("GOTTTTTTTTT");
       var params= JSON.parse(data);
    if(params.action==="prepopulate")
    {rootLoginTable.findOne({username:params.username}),(function(err,d){
        console.log("GOTTTTTTTTT"+params);
            link.send(JSON.stringify({username:d.username,name:d.name,action:"prepopulate"}));
                console.log(JSON.stringify({username:data.username,name:data.name,action:"prepopulate"}));
    }

    );


    }
    });

});

}