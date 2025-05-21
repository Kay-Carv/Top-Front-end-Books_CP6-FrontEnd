document.addEventListener('DOMContentLoaded', function () {
  const booksEndpoint = 'https://raw.githubusercontent.com/prof-lucassilva/api-books/main/livros.json';
  const bookList = document.getElementById('book-list');

  if (!bookList) {
    console.error('Elemento #book-list não encontrado.');
    return;
  }

  fetch(booksEndpoint)
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    })
    .then(books => {
      books.forEach((book, index) => { // 'index' para o delay da animação
        const bookElement = document.createElement('div');

        // Aplicando as classes Tailwind diretamente ao elemento principal do card
        bookElement.className = 'bg-white rounded-xl shadow-lg overflow-hidden flex flex-col transform hover:scale-105 hover:shadow-2xl transition-all duration-300 ease-out animacao-fadeInUp';
        
        bookElement.style.animationDelay = `${index * 0.2 + 0.5}s`; // Um delay para cada card fazer sua animação individualmente

        // Criando estrutura de card HTML com a classe Tailwind e os dados do livro
        bookElement.innerHTML = `
          <img src="${book.imagem}" alt="Capa do livro ${book.titulo}" class="w-full h-64 object-cover">
          <div class="p-5 flex flex-col flex-grow">
            <h3 class="text-lg font-semibold text-sky-700 mb-1">${book.titulo}</h3>
            <p class="text-sm text-slate-500 mb-2">Por: ${book.autor}</p>
            <p class="text-xs text-slate-400 mb-1">Gênero: ${book.genero} - ${book.paginas} páginas</p>
            <p class="text-sm text-slate-600 leading-relaxed mb-3 flex-grow">${book.resumo}</p>
            <a href="#" target="_blank" rel="noopener noreferrer" class="mt-auto self-start bg-sky-500 text-white py-2 px-4 rounded-md text-sm font-medium hover:bg-sky-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-400 transition-all duration-200 transform hover:-translate-y-0.5 active:translate-y-0">
              Detalhes
            </a>
          </div>
        `;
        bookList.appendChild(bookElement);
      });
    })

    // Tratamento de erro com cathc
    .catch(error => {
      console.error('Erro ao carregar os livros:', error);
      bookList.innerHTML = '<p class="text-center text-red-500">Não foi possível carregar os livros. Tente novamente mais tarde.</p>';
    });
});