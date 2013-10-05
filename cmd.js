var child = require('child_process'),
    // cmd = 'node_modules/phantomjs/bin/phantomjs get.js';
    cmd = 'phantomjs ' + __dirname + '/get.js';
console.log(cmd);
// process.chdir('node_modules/phantomjs/bin/');
// child.exec(cmd, function (error, stdout, stderr) {
//     console.log(error);
//     console.log(stdout);
//     console.log(stderr);
// });


var spawn = require('child_process').spawn,
    ls    = spawn('phantomjs', [__dirname + '/get.js']);

ls.stdout.on('data', function (data) {
  console.log('stdout: ' + data);
});
ls.stderr.on('data', function (data) {
  console.log('stderr: ' + data);
});
ls.on('close', function (code) {
  console.log('child process exited with code ' + code);
});
ls.on('error', function (code) {
  console.log('child process exited with code ' + code);
});