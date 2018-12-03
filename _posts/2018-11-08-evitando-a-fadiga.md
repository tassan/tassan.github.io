# Evitando a fadiga

As vezes você se depara com uma situação como esta:

>"Funcionalidade [X] não está funcionando.
Favor verificar e me retornar
Att."

No meu caso, X = A legenda de um DataGridView (aka tabela no windows form) não estava funcionando. A principio o problema parecia simples:

Uma tabela com dados *pivotada*, exibindo colunas que representam fornecedores, linhas para cada produto e os seus valores:

| Produto  | Quantidade | Fornecedor A | Fornecedor B| Fornecedor C |
|--|--|--|--|--|
|Produto A| 10 | R$ 50 | R$ 70 | R$ 45 |
|Produto B| 5 | R$ 6 | R$ 5,50 | R$ 2,50 |

Esta tabela deveria funcionar da seguinte forma:

 1. Cada valor **selecionado** pelo usuário deve ser marcado como vencedor ao clique de um botão.
 2. O valor vencedor deve ser marcado de <span style="color:green">*verde*</span>
 3. O menor valor deve ser marcado de <span style="color:red"> *vermelho claro*</span>

# A situação encontrada

Explicado o funcionamento, vamos ao problema que encontrei; o código que preenchia esta tabela simplesmente **não funcionava** de acordo com o que era proposto.

Apesar das boas intenções do programador anterior, o DataGridView padrão do Windows Forms, não dava um suporte adequado à forma com que ele deseja expor os dados - usando uma tabela *pivotada*. Sendo assim, o  código fazia o seguinte:

 1. Buscava os dados do SQL
 2. Criava um DataTable personalizado
 3. Fazia um loop para preenchê-lo passando os dados do SQL
 4. Escondia os dados que não seriam visualizados pelo usuário, e jogava IDs importantes em posições como: linha[index-linha[Fornecedor]].

Ok. Mas e se por algum motivo viesse qualquer dado que "não batesse" com o código? Simples, corrigia-se no banco de dados.

Era um código macarrão.

# Evitando a fadiga
### Passo 1: Objetos > BindingSources/TableAdapters

Pensando em evitar problemas futuros e de manutenção nesta aplicação, troquei a ligação direta dos valores do SQL, que vinham através de BindingSources e TableAdapters no DataGridView, pelo uso de objetos de uma classe que representasse aqueles dados.

    public class ItemCotacaoMapa
        {
            public string Descricao { get; set; }
            public string Unidade { get; set; }
            public decimal Quantidade { get; set; }
            public Fornecedor Fornecedor { get; set; }
            public decimal Valor { get; set; }
            public bool Vencedor { get; set; }
            public int CodigoItem { get; set; }
            
            public ItemCotacaoMapa() {}
     
            public override string ToString()
            {
                var item = string.Format("Item: {0}", Descricao);
                return item;
            }
     
        }

Isto me gerou uma outra situação. Um DataGridView não aceita objetos de uma classe como dados. O que me levou a descobrir uma biblioteca de extensão para DataGridViews que fazia com que ela aceitasse objetos como dados. (ps. eu havia descoberto este projeto antes de começar a mudança =P) 

Falarei mais sobre isto a seguir, que foi um dos motivos de escrever esta epopeia.

### Passo 2: Adeus Tabela Pivotada

Acabar com o uso da tabela *pivotada* foi uma das medidas que tomei,  após verificar com o usuário se aquela forma de exibição era importante ou não, - *spoiler alert: "tanto faz, faça funcionar"* foi a resposta - modifiquei a forma como seria exibido aqueles dados:

| Produto | Quantidade | Fornecedor | Valor | Vencedor |
|--|--|--|--|--|
|Produto A| 10 | Fonecedor A | R$ 50 | True/False |
|Produto A| 10 | Fonecedor B | R$ 70 | True/False |
|Produto A| 10 | Fonecedor C | R$ 45 | True/False |
|Produto B| 5 | Fonecedor A | R$ 6 | True/False |
|Produto B| 5 | Fonecedor B | R$ 5,50 | True/False |
|Produto B| 5 | Fonecedor C | R$ 2,50 | True/False |


### Passo 3: As vantagens do código aberto

O passo 3 é muito especial, pois, é motivo de orgulho para mim nesse ano.

A biblioteca que encontrei para realizar toda esta mudança se chama [DataGridViewsExtensions](https://github.com/Givens24/DataGridViewExtensions) feita pelo Givens24. Ela consiste de algumas extensões que facilitam o uso de um DataGridView. Entretanto, elas tinham um "problema" que não atendia minha situação: campos do tipo bool, se transformavam em *"True/False"* na tabela e não dava a possibilidade de editar - de forma fácil - o valor daquele campo.

Como eu precisava que o usuário pudesse marcar ou desmarcar as linhas vencedoras, e o projeto original já não tinha mudanças a pelo menos 2 anos, simplesmente dei um **fork** e adicionei ele aos meus repositórios, mudei o código para identificar campos do objeto que fossem do tipo bool e que, ao gerar o novo DataGridView, ao invés de um texto com *True/False* fosse adicionar uma coluna com um checkbox. Você pode ver a mudança realizada [aqui](https://github.com/tassan/DataGridViewExtensions/commit/37e2a249799962a2271d1a60c8418027e9c347d2).

### Passo 4: Legenda

Utilizando objetos ficou muito mais fácil encontrar aqueles que possuíam o menor valor, os que eram vencedores e até os que tinham valores zerados. Para isso, utilizei [LINQ](https://pt.wikipedia.org/wiki/Language_Integrated_Query), um componente disponibilizado pela Microsoft, que facilita as consultas em listas de objetos (resumo grosseiro).

E o resultado final foi esse:

![Novo DataGridView](https://i.imgur.com/JjyBH4F.png)
# Concluindo

Apesar deste post ter ficado maior do que imaginava, fiquei orgulhoso do que consegui fazer. Mas é muito bom poder expressar essa coisa incrível que é a comunidade *open source*, onde tenho acesso ao código de outro desenvolvedor que provavelmente passou por problemas parecidos com os meus e ainda posso adaptá-lo ao meu *mundo* e compartilhar com outros. :)
