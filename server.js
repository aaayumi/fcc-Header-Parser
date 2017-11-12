'use strict';

const express = require('express');
const app = express();
app.enable('trust proxy');

app.use('/public', express.static(process.cwd() + '/public'));

app.get('/', (req,res) => {
	res.sendFile(__dirname + '/views/index.html');
})

app.get('/api', (req,res) => {
 
 // get browser language option
 var userLang = req.headers["accept-language"]; 
 var lang = [];
 lang.push(userLang[0]);
 lang.push(userLang[1]);
 var langOption = lang.join("")

 console.log( lang.join(""))


 //get ip address 
 var ip = req.headers['x-forwarded-for'] || 
     req.connection.remoteAddress || 
     req.socket.remoteAddress ||
     (req.connection.socket ? req.connection.socket.remoteAddress : null);
 
// get operation system 

var os = require('os');
var cpu = os.cpus();
var cpuModel = cpu[0].model;
console.log(cpuModel)
var platform = os.platform() 
var version = os.release()
var newVersion = parseInt(version)
console.log(newVersion)
console.log(platform)

var software =[];
if(platform =="darwin") {
	software.push("Macintosh")
	    if(newVersion == 17){
		    software.push("macOS 10.13")
	    } else if (newVersion == 16){
		    software.push("macOS 10.12")
	    } else if (newVersion == 15){
            software.push("OS X 10.11")
	    } else if (newVersion == 14){
            software.push("OS X 10.10")
	    } else if (newVersion == 13){
            software.push("OS X 10.9")
	    } else if (newVersion == 12){
            software.push("OS X 10.8")
	    }
} else if (platform == "linux") {
	software.push("Linux");
} else if(platform =="win32") {
	software.push("Windows");
} 
 
 // check cpu 
 if(cpuModel.indexOf('Intel' > 0)){
 	software.push('Intel');
 } else if (cpuModel.indexOf('AMD' > 0)){
 	software.push('AMD');
 }

// swam software[1] and software[2] 
function swap(input, index_A, index_B){
  var temp = input[index_A];
  input[index_A] = input[index_B];
  input[index_B] = temp;
}

swap(software, 1, 2);

var softwareElement = software.join(" ");

res.send( {"ipaddress": ip,"language": langOption,"software":softwareElement });


})
app.listen(3000, () => {
	console.log('Listening on port 3000');
});

module.exports = app;