//cli = comand line interface
//const fs = require('fs'); //file system usada para ler arquivos
//const trataErros = require('./erros/funcoesErro');//importação do arquivo de erros

import fs from 'fs'; //para usar dessa forma é necessário alterar o package.json(npm ini -y) inserindo o type: module
import trataErros from './erros/funcoesErro.js';
import { contaPalavras } from './index.js';
import { log } from 'console';

const caminhoArquivo = process.argv; //monta um array com alguns caminhos, ao executar esse arquivo no terminar passar o caminho do arquivo txt
const link = caminhoArquivo[2]
const endereco = caminhoArquivo[3]

fs.readFile(link, 'utf-8', (erro, texto) =>{//readfile é uma callback function e passa 2 parâmetros, o caminho e o erro, como é txt deve ser passado o encoding
    try{
        if(erro) throw erro //caso o parâmetro erro for truthy joga o erro para ser tratado no catch e já interrompe a execução
        const resultado = contaPalavras(texto);
        criaESalvaArquivo(resultado, endereco)
    }catch(erro){
        trataErros(erro);     
    }
})

//async function criaESalvaArquivo(listaPalavras, endereco) {//transforma a função em assincrona
//    const arquivoNovo = `${endereco}/resultado.txt`
//    const textoPalavras = JSON.stringify(listaPalavras);
//    try{
//        await fs.promises.writeFile(arquivoNovo, textoPalavras);
//        console.log('Arquivo criado');        
//    } catch(erro){
//            throw erro;
//    }
//}


function criaESalvaArquivo(listaPalavras, endereco) {
    const arquivoNovo = `${endereco}/resultado.txt`
    const textoPalavras = JSON.stringify(listaPalavras);
    //objeto promise é a eventual conclusão ou a falha de uma operação assincrona, retorna um objeto promise
    fs.promises.writeFile(arquivoNovo, textoPalavras)
    .then(()=>{//then é a função responsavel por concluir com sucesso ou erro
        console.log('Arquivo criado');
        
    }).catch((erro) =>{
        throw erro
    }).finally(() => console.log('Operação finalizada'))
     
}