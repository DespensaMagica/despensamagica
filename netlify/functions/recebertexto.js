// netlify/functions/recebertexto.js

exports.handler = async (event, context) => { // Nota: o teu usava 'export async function handler', o Netlify Functions também aceita 'exports.handler'
    // 1. Verificar se a requisição é um método POST
    // Esta função foi feita para receber dados, o que tipicamente acontece via POST
    if (event.httpMethod !== 'POST') {
        return {
            statusCode: 405, // Method Not Allowed (Método Não Permitido)
            headers: { "Content-Type": "application/json" }, // Boas práticas: indicar que a resposta é JSON
            body: JSON.stringify({ message: 'Only POST requests are allowed for this endpoint.' }),
        };
    }

    // 2. Verificar se o corpo da requisição (event.body) existe
    if (!event.body) {
        return {
            statusCode: 400, // Bad Request (Requisição Inválida)
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ message: 'Request body is missing. Please send a JSON payload.' }),
        };
    }

    let dadosRecebidos;
    try {
        // Tenta fazer o parse do JSON do corpo da requisição
        dadosRecebidos = JSON.parse(event.body);
    } catch (parseError) {
        // Se houver um erro ao fazer JSON.parse (por exemplo, o body não é um JSON válido)
        return {
            statusCode: 400, // Bad Request
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                message: 'Invalid JSON in request body.',
                errorDetails: parseError.message // Inclui a mensagem de erro do parse para ajudar a depurar
            }),
        };
    }

    // A partir daqui, 'dadosRecebidos' é um objeto JavaScript
    // e podes aceder às suas propriedades, como textoReconhecido
    // Verificamos se a propriedade esperada existe
    if (!dadosRecebidos || typeof dadosRecebidos.textoReconhecido === 'undefined') {
        return {
            statusCode: 400,
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ message: 'Missing "textoReconhecido" in JSON payload.' }),
        };
    }

    console.log("Texto recebido:", dadosRecebidos.textoReconhecido);

    // Se tudo correu bem, envia uma resposta de sucesso
    return {
        statusCode: 200,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            mensagem: "Texto recebido com sucesso!",
            texto: dadosRecebidos.textoReconhecido
        }),
    };
};
