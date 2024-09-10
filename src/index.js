export function contaPalavras(texto) {
    const paragrafos = extraiParagrafos(texto)
    const contagem = paragrafos.flatMap((paragrafo)=>{
        if(!paragrafo)return [];//caso o paragrafo esteja vazio não retorna nada
        return verificaPalavrasDuplicadas(paragrafo);
    })
    return contagem;  
}

function extraiParagrafos(texto) {
    return texto.toLowerCase().split('\n'); //pega o texto e separa em paragrafos usando o \n
}

//flat pega o array e extrai ele Ex:
//[1, 2, [3,4]]
//[1, 2, 3, 4]
//flatMap une a função do flat com o a função do map 

function limpaPalavras(palavra) {
    return palavra.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, '');//expressão regular ou regexp
}

function verificaPalavrasDuplicadas(texto) {
    const listaPalavras = texto.split(' ');//parametro do split é o separador então para cada palavra se separa com um espaço
    const resultado = {};
    // objeto[propriedade] = valor; forma de adicionar valor no objeto
    listaPalavras.forEach(palavra => {
        if(palavra.length >= 3){//para cada palavra caso ela seja maior ou igual a 3 vai limpar a palavra
            const palavraLimpa = limpaPalavras(palavra);
            resultado[palavraLimpa] = (resultado[palavraLimpa] || 0) + 1; //adicionar a palavra no objeto e junto o contador
        }
    });
    return resultado;
    
}


