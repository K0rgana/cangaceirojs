class Negociacoes{
    constructor(){
        this._negociacoes = [];
        Object.freeze(this);
    }

    get volumeTotal(){
        return this._negociacoes
                .reduce((total, negociacao) => 
                    total + negociacao.volume, 0);
    }

    adiciona(negociacao){
        this._negociacoes.push(negociacao);
    }

    esvazia(){
        this._negociacoes.length = 0;
    }

    paraArray(){
        // retorna uma nova referência criada com os itens de this._negociacoes
        return [].concat(this._negociacoes);
    }
}