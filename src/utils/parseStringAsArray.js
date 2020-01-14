// Tratando as tecnologias informadas pelo usuário no body que foram informadas como string, para converter em array
//1º separando aonde houver virgula usando o método split
//2º percorrendo o array usando o método map e eliminando os espações em branco usando o método trim retornando um array

module.exports = function parseStringAsArry(arrayAsString){
    return arrayAsString.split(',').map(tech => tech.trim());
};
