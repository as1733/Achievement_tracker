/**
 * Created by as1733 on 28-03-2017.
 */
function getCookie(name) {
    var value = "; " + document.cookie;
    var parts = value.split("; " + name + "=");
    if (parts.length == 2) return parts.pop().split(";").shift();
}
var ws = new WebSocket("ws://192.168.118.20:9060");
ws.onopen=function (){
alert();
    if (prepopulate) {
        ws.send(JSON.stringify({username: getCookie("username"), action: "prepopulate"}));
        ;
    }
}



var datax;
var prepopulate=getCookie("enteredindatabase");

ws.onmessage=
        function(d){console.log(d);
        datax=d;
        data=JSON.parse(d.data);
            if(data.action==='prepopulate')
                     {alert();
                    document.getElementById('name').value=data.name;
                         document.getElementById('name').setEnabled=false;

                     }

            }

;