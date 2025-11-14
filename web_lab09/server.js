const http = require("http");
const fs = require('fs');

const myServer = http.createServer((req, res) => {
    console.log("Req: " + req.url);
    if(req.url === '/hello'){
        res.statusCode = 200;
        res.setHeader("Content-Type", "text/plain");
        res.write("Hello Form Server: "+ Date.now());
        res.end();
        console.log("Hello Form Server: " + Date.now()); 
        
    }else if(req.url === '/signin'){
        fs.readFile ('./sign-in.html',function(err,data){
            res.statusCode = 200;
            res.setHeader("Content-Type", "text/html");
            res.write(data);
            res.end();
        });
    }else {
        fs.readFile ('./error.html',function(err,data){
            res.statusCode = 404;
            res.setHeader("Content-Type", "text/html");
            res.write(data);
            res.end();
        });
    }
    
});

myServer.listen(8081, () => {
    console.log("Listening on the port 8081");
});
