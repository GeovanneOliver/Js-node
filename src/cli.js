//cli = comand line interface
//const fs = require('fs'); //file system usada para ler arquivos
//const trataErros = require('./erros/funcoesErro');//importação do arquivo de erros

import fs from 'fs'; //para usar dessa forma é necessário alterar o package.json(npm ini -y) inserindo o type: module
import path from 'path';
import trataErros from './erros/funcoesErro.js';
import { contaPalavras } from './index.js';
import { montaSaidaArquivo } from './helpers.js';
import { Command } from 'commander';
import chalk from 'chalk';
import { log } from 'console';

const program = new Command();

program
    .version('0.0.1')
    .option('-t, --texto <string>', 'caminho do texto a ser processado')
    .option('-d, --destino <string>', 'Caminho da pasta onde salvar o resultado')
    .action((options) => {
        const { texto, destino } = options;

        if (!texto || !destino){
            console.error(chalk.red('erro: Inserir origem e destino'));
            program.help();
            return;
        }

        const caminhoTexto = path.resolve(texto);
        const caminhoDestino = path.resolve(destino);

        try{
            processaArquivo(caminhoTexto, caminhoDestino);
            console.log(chalk.green('Texto processado com sucesso'));         
        }catch(erro){
            console.log('Ocorreu um erro no processamento', erro);
            
        }
    })

    program.parse();

//const caminhoArquivo = process.argv; monta um array com alguns caminhos, ao executar esse arquivo no terminar passar o caminho do arquivo txt
//const link = caminhoArquivo[2]
//const endereco = caminhoArquivo[3]

function processaArquivo(texto, destino){
    fs.readFile(texto, 'utf-8', (erro, texto) =>{//readfile é uma callback function e passa 2 parâmetros, o caminho e o erro, como é txt deve ser passado o encoding
        try{
            if(erro) throw erro //caso o parâmetro erro for truthy joga o erro para ser tratado no catch e já interrompe a execução
            const resultado = contaPalavras(texto);
            criaESalvaArquivo(resultado, destino)
        }catch(erro){
            trataErros(erro);     
        }
    })
}


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
    const textoPalavras = montaSaidaArquivo(listaPalavras) //JSON.stringify(listaPalavras);
    //objeto promise é a eventual conclusão ou a falha de uma operação assincrona, retorna um objeto promise
    fs.promises.writeFile(arquivoNovo, textoPalavras)
    .then(()=>{//then é a função responsavel por concluir com sucesso ou erro
        console.log('Arquivo criado');
        
    }).catch((erro) =>{
        throw erro
    }).finally(() => console.log('Operação finalizada'))
     
}