class NegociacaoController {
  constructor() {
    // realizando o bind, $ mantém document como seu contexto this
    const $ = document.querySelector.bind(document);

    this._inputData = $("#data");
    this._inputQuantidade = $("#quantidade");
    this._inputValor = $("#valor");

    const self = this;

    this._negociacoes = ProxyFactory.create(
      new Negociacoes(),
      ["adiciona", "esvazia"],
      model => this._negociacoesView.update(model)
    );

    this._negociacoesView = new NegociacoesView("#negociacoes");
    this._negociacoesView.update(this._negociacoes);

    this._mensagem = ProxyFactory.create(
      new Mensagem(),
      ['texto'],
      model => this._mensagemView.update(model)
    );

    this._mensagemView = new MensagemView("#mensagemView");
    this._mensagemView.update(this._mensagem);
  }

  _limpaFormulario() {
    this._inputData.value = "";
    this._inputQuantidade.value = 1;
    this._inputValor.value = 0.0;
    this._inputData.focus();
  }

  _criaNegociacao() {
    return new Negociacao(
      DateConverter.paraData(this._inputData.value),
      parseInt(this._inputQuantidade.value),
      parseFloat(this._inputValor.value)
    );
  }

  adiciona(evt) {
    evt.preventDefault();

    this._negociacoes.adiciona(this._criaNegociacao());
    this._mensagem.texto = "Negociação adicionada com sucesso";
    this._limpaFormulario();
  }

  apaga() {
    this._negociacoes.esvazia();
    this._mensagem.texto = "Negociações apagadas com sucesso";
  }
}
