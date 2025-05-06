#!/usr/bin/env node
const {readdir,mkdir,stat,readFile,writeFile} = require("fs/promises")
const {resolve,dirname} = require("path")
async function init(){
    let name = process.argv[2];
    let template = resolve(__dirname,"template");
    let target = resolve(process.cwd(),process.argv[2]);
    let templateDir = await readdir(template,{"recursive": true});
    let resolvedTemplateDir = templateDir.map(p=>resolve(template,p));
    let directories = [...new Set(templateDir.map(dirname).filter(p=>p!="."))].map(p=>resolve(target,p));
    for (let directory of directories)mkdir(directory,{"recursive":true});
    for (let templateFile of templateDir){
        let templatePath = resolve(template,templateFile);
        let targetPath = resolve(target,templateFile);
        if ((await stat(templatePath)).isFile()){
            if (templateFile == "package.json"){
                let data = JSON.parse(await readFile(templatePath,{"encoding": "utf8"}));
                data.name = name;
                writeFile(await targetPath,JSON.stringify(data,undefined,"\t"),{"encoding":"utf8"})
            }else{
                writeFile(await targetPath,await readFile(templatePath))
            }
        }
    }
    console.log(`Done. Now run:\n cd ${name}\n npm install\n`)
}
init().catch((e)=>{
    console.error(e)
})