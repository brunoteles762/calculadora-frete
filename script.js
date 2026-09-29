function verificarFrete() {
    const inputValor = document.getElementById('valorCompra');
    const divResultado = document.getElementById('resultado');

    const valorCompra = parseFloat(inputValor.value);

    // Validação de entrada vazia ou inválida
    if (isNaN(valorCompra) || valorCompra <= 0) {
        exibirMensagem(divResultado, "Por favor, informe um valor de compra válido.", "erro");
        return;
    }

    // Regra de negócio: Frete grátis a partir de R$ 200,00
    const valorMinimoFreteGratis = 200;
    let mensagemStatus = '';
    let tipoMensagem = '';
    let valorFaltante = 0;

    if (valorCompra >= valorMinimoFreteGratis) {
        mensagemStatus = "Parabéns! Você ganhou **FRETE GRÁTIS** para esta compra.";
        tipoMensagem = "sucesso";
    } else {
        valorFaltante = valorMinimoFreteGratis - valorCompra;
        mensagemStatus = `Você não atingiu o valor mínimo. Adicione mais R$ ${valorFaltante.toFixed(2).replace('.', ',')} em produtos para ganhar **FRETE GRÁTIS**.`;
        tipoMensagem = "alerta";
    }

    // Estruturação em Objeto (cumprindo Requisito 9)
    const pedido = {
        valorTotal: valorCompra.toFixed(2),
        temFreteGratis: valorCompra >= valorMinimoFreteGratis,
        faltamQuanto: valorFaltante.toFixed(2)
    };

    const mensagemHtml = `
        <h2>Valor da Compra: R$ ${pedido.valorTotal.replace('.', ',')}</h2>
        <p>${mensagemStatus}</p>
    `;

    exibirMensagem(divResultado, mensagemHtml, tipoMensagem);
}

function exibirMensagem(elemento, conteudo, tipo) {
    elemento.classList.remove('escondido', 'erro', 'sucesso', 'alerta');
    elemento.innerHTML = conteudo;

    if (tipo) {
        elemento.classList.add(tipo);
    }
}