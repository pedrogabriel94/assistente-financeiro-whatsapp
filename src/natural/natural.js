var natural = require('natural');
const classifier = new natural.BayesClassifier();
var arrayTreinamento = require('./../db_fake/treinamento.json');

function treinar(){
    arrayTreinamento.dados.forEach(element => {
        classifier.addDocument(element.mensagem, element.tipo);
    });

    classifier.train();
}

function classificar(mensagem){
    
    const result = classifier.classify(mensagem);

    const valor = mensagem.match(/\d+(\,\d+)?/g); 

    return {
        tipo: result,
        valor: valor
    };
}

treinar();



module.exports = {
    classificar
};

