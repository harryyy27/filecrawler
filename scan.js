const fs = require('fs')
const path = require('path')


    const patternArray = []
    for(let i=2; i<process.argv.length; i++){
        if(process.argv[i]){
            patternArray.push(process.argv[i])
        }
    }


findCss = (filePath) =>{
    fs.readdir(filePath,(err,files)=>{
        if(err){
            console.log(err);
        }
        else{
            files.forEach((el)=>{
                const fileSplit = el.split('.')
                if(fileSplit.length===1){
                    findCss(path.join(filePath,el))
                }
                else{
                    fs.readFile(path.join(filePath,el),(err2,file)=>{
                        if(err2){
                            console.log(err2)
                        }
                        else{
                            const lineArray = file.toString().split('\n');
                            for(let i=0; i<lineArray.length; i++){
                                patternArray.forEach((pattern)=>{
                                    
                                    if(lineArray[i].indexOf(pattern)!==-1){
                                        process.stdout.write('keyword: '+ pattern + ' file: ' +el + ', line number: '+ i + '\n')
                                        
                                    }
                                })
                            }
                        }
                    })
                }
            })
        }
    })
}

findCss(process.cwd())