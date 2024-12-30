
//assingment 1 : creating own cli
const fs = require('fs');
const { Command } = require('commander');
const program = new Command();


program
 .name('counter')
 .description('A simple counter cli')
 .version('1.0.0');

program.command('CountWords')
.description('Count the number of words in a file')
.argument('<file>' , 'file to count words')
.action((file) => {
    fs.readFile(file, 'utf-8', (err, data) => {
        if(err){
            console.log(err);
        }else{
            const words = data.split(' ').length;
            console.log(`The file has ${words} words`);
        }
    });
});

program.command('CountLines')
.description('Count the number of words in a file')
.argument('<file>' , 'file to count words')
.action((file) => {
    fs.readFile(file, 'utf-8', (err, data) => {
        if(err){
            console.log(err);
        }else{
            let lines = 0;
            for(let i=0; i<data.length; i++){
                if(data[i] == '\n'){
                    lines++;
                }
            }
            console.log(`The file has ${lines}  lines`);
        }
    });
});

program.parse();