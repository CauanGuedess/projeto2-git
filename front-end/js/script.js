$(document).ready(function () {
  $('#formulario').submit(function (e) {
    e.preventDefault(); // Evita recarregar a página

    const nome = $('#nome').val();
    const email = $('#email').val();
    const mensagem = $('#mensagem').val();

    if (nome && email && mensagem) {
      // Enviar os dados para o servidor
      $.ajax({
        url: 'http://localhost:3000/submit',
        method: 'POST',
        contentType: 'application/json',
        data: JSON.stringify({ nome, email, mensagem }),
        success: function (response) {
          alert(response.message);
          $('#formulario')[0].reset(); // Limpa o formulário
        },
        error: function (xhr) {
          alert(`Erro: ${xhr.responseJSON.error}`);
        }
      });
    } else {
      alert('Por favor, preencha todos os campos.');
    }
  });

  
    // Adiciona imagens na galeria dinamicamente
    const imagens = [
      'https://placehold.co/150x150/orange/white',
      'https://placehold.co/150x150/red/white',
      'https://placehold.co/150x150/purple/white',
      'https://placehold.co/150x150/green/white'
    ];
  
    imagens.forEach((img, index) => {
      $('#galeria').append(`
        <div class="col-md-3">
          <div class="card">
            <img src="${img}" class="card-img-top" alt="Imagem ${index + 1}">
            <div class="card-body">
              <p class="card-text">Imagem ${index + 1}</p>
            </div>
          </div>
        </div>
      `);
    });
  });
  