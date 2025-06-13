export async function handler(event) {
  const body = JSON.parse(event.body);

  console.log("Texto recebido:", body.textoReconhecido);

  return {
    statusCode: 200,
    body: JSON.stringify({
      mensagem: "Texto recebido com sucesso!",
      texto: body.textoReconhecido
    })
  };
}
