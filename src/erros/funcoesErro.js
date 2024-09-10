export default function trataErros(erro){//export default para exportar a função
    if(erro.code === 'ENOENT'){
        throw new Error('Arquivo não encontrado');
    }else{
        return 'Erro na aplicação'
    }
}


//module.exports = trataErros; //modelu.exports exporta as funções desse arquivo para outro