document.getElementById('processButton').addEventListener('click', function() {
    const valueInput = prompt("Por favor, insira o valor (ex: 1080:9eFwkYi0HD:yvxqsb4d3mN):");
    if (valueInput) {
        processInput(document.getElementById('jsonInput').value, valueInput);
    }
});

document.getElementById('loadFileButton').addEventListener('click', function() {
    const fileInput = document.getElementById('fileInput');
    const file = fileInput.files[0];

    if (file) {
        const reader = new FileReader();
        reader.onload = function(event) {
            const valueInput = prompt("Por favor, insira o valor (ex: 1080:9eFwkYi0HD:yvxqsb4d3mN):");
            if (valueInput) {
                processInput(event.target.result, valueInput);
            }
        };
        reader.readAsText(file);
    } else {
        document.getElementById('resultOutput').textContent = 'Por favor, selecione um arquivo.';
    }
});

document.getElementById('copyButton').addEventListener('click', function() {
    const resultOutput = document.getElementById('resultOutput');
    const range = document.createRange();
    range.selectNode(resultOutput);
    window.getSelection().removeAllRanges(); // Limpa a seleção anterior
    window.getSelection().addRange(range); // Seleciona o texto do resultOutput
    document.execCommand('copy'); // Copia o texto selecionado
    window.getSelection().removeAllRanges(); // Limpa a seleção novamente

    alert('Resultados copiados para a área de transferência!'); // Mensagem de confirmação
});

function processInput(input, value) {
    try {
        // Converte o texto JSON em objeto
        let jsonArray = JSON.parse(input);

        // Filtra o array para remover a cidade "Dallas"
        jsonArray = jsonArray.filter(item => item.city !== "Dallas");

        // Extrai apenas os valores de hostname e formata
        const result = jsonArray.map(item => `${item.hostname}:${value}`).join('\n');

        // Exibe os resultados
        document.getElementById('resultOutput').textContent = result;
    } catch (error) {
        document.getElementById('resultOutput').textContent = 'Erro ao processar JSON: ' + error.message;
    }
}
