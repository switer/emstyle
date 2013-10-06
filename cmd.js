var child = require('child_process'),
    comment = require('./comment'),
    // cmd = 'node_modules/phantomjs/bin/phantomjs get.js';
    cmd = 'phantomjs ' + __dirname + '/get.js';


console.log(comment.single('hello world'));
console.log(comment.block('hello world'));
console.log(comment.title('hello world'));
console.log(comment.banner('hello world'));
console.log('\n----------------------------------\n');
console.log('hello world'.single());
console.log('hello world'.block());
console.log('hello world'.title());
console.log('hello world'.banner());
// var spawn = require('child_process').spawn,
//     ls    = spawn('phantomjs', [__dirname + '/get.js']);

// ls.stdout.on('data', function (data) {
//   console.log('stdout: ' + data);
// });
// ls.stderr.on('data', function (data) {
//   console.log('stderr: ' + data);
// });
// ls.on('close', function (code) {
//   console.log('child process exited with code ' + code);
// });
// ls.on('error', function (code) {
//   console.log('child process exited with code ' + code);
// });