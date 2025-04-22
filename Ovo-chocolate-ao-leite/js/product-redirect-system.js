// Script para gerenciar os cliques e redirecionamentos nos produtos
document.addEventListener('DOMContentLoaded', function() {
    // Selecionar todos os produtos clicáveis (adicione a classe 'produto-item' aos seus produtos)
    const produtosItens = document.querySelectorAll('.produto-item');
    
    produtosItens.forEach(produto => {
        produto.addEventListener('click', function(e) {
            // Impedir comportamento padrão caso seja um link
            if (e.target.tagName === 'A') {
                e.preventDefault();
            }
            
            // Obter o ID do produto atual
            const produtoId = this.getAttribute('data-produto-id');
            
            // Verificar se temos um ID válido
            if (produtoId) {
                // Redirecionar para a página do produto com o ID correto
                window.location.href = `https://mercatlivre.com/produto?id=${produtoId}`;
            }
        });
    });
});

// Se você precisa também processar URLs na página do produto:
document.addEventListener('DOMContentLoaded', function() {
    // Verificar se estamos na página de produto
    if (window.location.pathname.includes('/produto')) {
        // Obter o ID do produto da URL
        const urlParams = new URLSearchParams(window.location.search);
        const produtoId = urlParams.get('id');
        
        if (produtoId) {
            // Função para carregar os detalhes do produto correto
            carregarDetalheProduto(produtoId);
        }
    }
});

// Função para carregar os detalhes do produto com base no ID
function carregarDetalheProduto(id) {
    // Aqui você pode implementar a lógica para mostrar o produto correto
    // Por exemplo:
    
    // 1. Se você está carregando de um JSON ou API
    fetch(`/api/produtos/${id}`)
        .then(response => response.json())
        .then(produto => {
            // Atualizar os elementos da página com os dados do produto
            document.getElementById('nome-produto').textContent = produto.nome;
            document.getElementById('descricao-produto').textContent = produto.descricao;
            document.getElementById('preco-produto').textContent = `R$ ${produto.preco.toFixed(2)}`;
            document.getElementById('imagem-produto').src = produto.imagem;
            // e assim por diante...
        })
        .catch(erro => {
            console.error('Erro ao carregar produto:', erro);
            // Redirecionar para página de erro ou listagem de produtos
            // window.location.href = '/produtos';
        });
    
    /* 
    // 2. Ou se você prefere uma abordagem mais simples com um objeto JavaScript
    const meusProdutos = {
        '32': { nome: 'Produto 32', preco: 99.90, descricao: 'Descrição do produto 32', imagem: 'produto32.jpg' },
        '33': { nome: 'Produto 33', preco: 129.90, descricao: 'Descrição do produto 33', imagem: 'produto33.jpg' },
        // Adicione mais produtos conforme necessário
    };
    
    if (meusProdutos[id]) {
        const produto = meusProdutos[id];
        document.getElementById('nome-produto').textContent = produto.nome;
        document.getElementById('preco-produto').textContent = `R$ ${produto.preco.toFixed(2)}`;
        // Continue atualizando os outros elementos...
    } else {
        // Produto não encontrado
        alert('Produto não encontrado');
        window.location.href = '/produtos'; // Redirecionar para a listagem
    }
    */
}
