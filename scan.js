const fs = require('fs')
const path = require('path')


    const patternArray = []
    for(let i=2; i<process.argv.length; i++){
        if(process.argv[i]){
            patternArray.push(process.argv[i])
        }
    }
console.log(patternArray)

findCss = (filePath) =>{
    fs.readdir(filePath,(err,files)=>{
        if(err){
            console.log(err);
        }
        else{
            files.forEach((el)=>{
                if(fs.statSync(path.join(filePath,el)).isDirectory()){
                    findCss(path.join(filePath,el))
                }
                else{
                    fs.readFile(path.join(filePath,el),(err2,file)=>{
                        if(err2){
                            console.log(err2)
                        }
                        else{
                            const strFile = file.toString()
                            if(patternArray.every((pattern)=>strFile.indexOf(pattern)!==-1)){
                                console.log('here')
                                var lineArray = strFile.split('\n');
                                
                                for(let i=0; i<lineArray.length; i++){
                                    patternArray.forEach((pattern)=>{
                                        if(lineArray[i].indexOf(pattern) !== -1){
                                            process.stdout.write('File: ' +el + ', ' +' keyword: '+ pattern + ', ' + ', line number: '+ i + '\n')
                                        }
                                    })
                                }
                            }
                        }
                        
                    })
                }
            })
        }
    })
}

findCss(process.cwd())