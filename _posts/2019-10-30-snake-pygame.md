---
layout: post
title: "Jogo Snake em Python com Pygame"
date: 2019-10-30
categories: python pygame development portugues
tags: [open source, python, pygame, development]
---

O [Pygame](https://www.pygame.org/wiki/about) é uma biblioteca de código aberta, feita em python feito em cima de outra biblioteca, chamada [SDL](http://www.libsdl.org/). É uma biblioteca poderosa, mas que não se propõe a criar jogos absurdos como utilizando [Unity](https://unity.com/pt) ou [Unreal Engine](https://www.unrealengine.com/en-US/), porém, ela usa python o que a deixa muito divertida de se aprender.

### Configurando o ambiente

>Para quem usa Windows como eu usei nesse processo, recomendo instalar o [CMDER](https://cmder.net/) ele é um terminal aprimorado para o Windows. Nele você consegue utilizar algumas comandos que estão disponíveis no Linux. Recomendo o uso do mesmo durante o WTTD.

Primeiramente vamos criar um diretório para trabalhar nosso jogo:

```console
mkdir snake
cd snake
```
Depois de entrar no nosso diretório com o comando `cd snake`, vamos criar nosso ambiente virtual. E ativá-lo:

```
python -m venv snakenv
cd scripts
activate
```

Dei o nome de `snakenv` ao ambiente virtual, mas você pode colocar qualquer nome.

>Para quem usa outro sistema, o processo para ativar é diferente.

Volte ao diretório `snake`
```console
cd ..\..
```
Utilizando o pip, vamos instalar a biblioteca `pygame` no nosso virtual env.

```console
pip install pygame
```
---
**Aviso:** Pode acontecer de aparecer a seguinte mensagem:
>You are using pip version 19.0.3, however version 19.3.1 is available.
You should consider upgrading via the 'python -m pip install --upgrade pip' command.

A mensagem apenas informa que você esta utilizando uma versão mais antiga do pip e que há uma versão nova, e que você deveria considerar atualizar para uma mais recente com o comando:

```console
python -m pip install --upgrade pip
```
---

Agora temos o nosso projeto configurado com o `pygame` configurado no nosso virtualenv, particularmente, eu prefiro criar um ambiente virtual e instalar o pygame do que instalar ele entre as bibliotecas do python da máquina, utilizando o Windows eu tive alguns problemas ao fazer isso, por isso recomendo usar o virtualenv.

A partir daqui você pode abrir a nossa pasta como projeto no Pycharm, VS Code ou qualquer editor que lhe for mais confortável.

Para quem utilizar o VS Code, usando o terminal dentro da pasta do projeto, no meu caso `C:\Users\ftass\workspace\snake`, use o comando:

```console
code . 
```

Para abrir aquele diretório como projeto no VS Code. Feito isto, vamos criar um arquivo chamado `snake.py`.

```
touch snake.py
```

Com nosso arquivo criado, vamos então importar a biblioteca do `pygame`.

```python
import pygame
from pygame.locals import *
from sys import exit
```

Sempre que formos utilizar o `pygame`, faremos a importação do mesmo, e em seguida importamos `pygame.locals`, o módulo `locals` contém diversas constantes que já estão no pygame, mas utilizando `from pygame.locals import * ` nós importamos apenas as constantes que estão em pygame para um nível mais alto, não é essencial mas é conveniente.

A biblioteca `sys` entretanto, faz parte do próprio python, nós importamos o módulo `exit` para fechar o python logo após terminarmos de utilizar o pygame. Essa parte fará mais sentido com o resto do código abaixo:

```python
pygame.init()

screen = pygame.display.set_mode((640, 480), 0, 32)
screen.fill((0, 0, 0))
pygame.display.set_caption("Hello, World!")

running = True

while running:
    
    for event in pygame.event.get():
        if event.type == QUIT:
            pygame.quit()
            exit()
        
        pygame.display.update()
```

Para dar sorte no nosso tutorial, esse é nosso **hello world**.

Agora explicando o código, o comando **pygame.init()** é o que inicializa nosso pygame, importando as bibliotecas referenciadas. 

Logo em seguida nós definimos o que será a nossa tela, definindo sua área, resolução e preenchimento.

```python
screen = pygame.display.set_mode((640, 480), 0, 32)
```

**(640, 480)** -> Definimos que nossa janela tem as medidas 640 altura, 480 largura, utilizamos uma tupla para isto. Entretanto, nada nos impede de utilizar uma lista com dois elementos

**0** -> Este valor representa uma **flag** que é utilizada na criação do display, ela pode ser ativada e desativada.

Por exemplo:

```python
pygame.display.set_mode((1920, 1080), FULLSCREEN, 32)
```

Posso informar a flag **FULLSCREEN** para criar uma janela que ocupe a tela inteira, poderia também adicionar outra flag chamada **HWSURFACE** que informaria ao pygame, que aquele display deve ser acelerado por hardware.

```python
pygame.display.set_mode((1920, 1080), FULLSCREEN|HWSURFACE, 32)
```

E definimos também a profundidade da nossa tela, esta profundidade é a quantidade de _bits_ usados para armazenar cores, no nosso caso 32.

Preenchemos nossa tela com a cor preta `screen.fill((0, 0, 0))`, a função `fill` recebe uma tupla representando os valores RGB que representam cores. Em seguida, definimos o  título da nossa janela com `pygame.display.set_caption("Hello, World!")`.

Definidas as configurações da nossa tela, criamos então o __loop__ da nossa aplicação, por motivos de deixar mais simples o entendimento, gosto de criar a variavel `running` e definir ela como `True`, mas nada impede de que você passe `True` direto no nosso loop feito com `while`.

```python
while running:

    for event in pygame.event.get():
        if event.type == QUIT:
            pygame.quit()
            exit()
        
        
        pygame.display.update()
```

O código acima é bem simples, ele diz ao nosso script que, enquanto `running` for verdadeiro, que ele execute o loop for, que verifica pelos eventos levantados pelo pygame. Ou seja, ele verificará por todos os eventos até que encontre um evento do tipo `QUIT` (SAIR) e então executa o processo de encerramento do pygame com `pygame.quit()` e do python com `exit()`.

O comando `pygame.display.update()` é utilizado para atualizar a nossa tela, enquanto o loop roda, ele vai atualizando as informações na nossa tela. Qualquer comando que você deseje que seja exibido na tela para o usuário, deverá vir ANTES deste comando.

Por exemplo, vamos colocar as maçãs que nossa nossa cobrinha irá comer durante o jogo, para isso temos que definir o que é uma maçã dentro do nosso script:

```python
apple = pygame.Surface((10, 10))
apple.fill((255, 0, 0))
```

O pygame trabalha com o conceito de `Surface (superficie)`,  que é um objeto para representar uma imagem. Você pode aplicar isto para uma imagem externa ou no nosso caso, para o que nós definimos como imagem, um objeto de 10x10, preenchido com a cor vermelha. Nosso código ficará assim:

```python
import pygame
from pygame.locals import *
from sys import exit

pygame.init()

screen = pygame.display.set_mode((640, 480), 0, 32)
screen.fill((0, 0, 0))
pygame.display.set_caption("Hello, World!")

# Definindo a nossa maçã
apple = pygame.Surface((10, 10))
apple.fill((255, 0, 0))

running = True

while running:

    for event in pygame.event.get():
        if event.type == QUIT:
            pygame.quit()
            exit()

        pygame.display.update()
```

Porém, nossa maçã ainda não está sendo exibida, para isso devemos chamá-la dentro do nosso loop, definindo a posição que queremos a mesma. Vamos utilizar o comando `blit` que desenha uma imagem sobre outra. Este comando faz parte do módulo `Surface`, e pode ser aplicado em qualquer superficie, dito isto, iremos aplicá-lo na nossa tela da seguinte forma:

```python
screen.blit(apple, (30, 40))
```

Basicamente, nós estamos dizendo ao pygame: 
>Na nossa superficie *screen*, desenhe sobre ela nossa *apple*, na posição *(30, 40)*.

Só precisamos adicionar este código acima de `pygame.display.update()`. E isso fará com que um quadrado vermelho, de 10x10 seja desenhado na posição (30, 40). Entretanto, no jogo da Snake a maçã não fica em uma posição fixa, para isso, iremos randomizar a posição que a maçã é criada.

Primeiro importamos o módulo `random`:
```python
import random
```

Adicionamos esse código no começo do arquivo, junto aos outros imports.

Vamos definir agora as posições aleatórias da nossa maçã. Toda posição é definida pelas coordenadas X e Y, afinal o nosso jodo é Bi-dimensional, 2D. Logo, precisaremos de duas variavéis para receber estes valores.

```python
x = random.randint(0, 470)
y = random.randint(0, 630)
screen.blit(apple, (x, y))
```

Com isto, nossa maçã será exibida randomicamente pela tela. A exibição, neste momento é feita de forma indiscriminada por toda a tela; inclusice em posições não inteiras, o que faz com que tenhamos uma maçã em cima. Para isso melhorar isso, faremos o seguinte:

```python
x = random.randint(0, 470)
y = random.randint(0, 630)
screen.blit(apple, (x//10 * 10, y//10 * 10))
```

Nossos valores randomicos, serão dividos por 10 e multiplicados por 10, porém, está não é uma divisão comum, e sim uma divisão inteira, ou seja, faça o teste no terminal do python:

```console
x = 155
x / 10
15.5
x // 10
15
```

Com isso evitamos que seja desenhada uma maçã na posição 155.5, mas sim na posição 150.

Agora iremos criar a nossa snake, primeiramente vamos comentar o código que desenha as maçãs na tela.

```python
# x = random.randint(0, 630)
# y = random.randint(0, 470)
# screen.blit(apple, (x//10 * 10, y//10 * 10))
```

E vamos criar a nossa snake:

```python
# Definindo a nossa cobra
snake_positions = [(300, 300), (310, 300), (320, 300)]
snake = pygame.Surface((10, 10))
snake.fill((0, 255, 0))
```

A lógica para criar a cobra não é muito diferente para a maçã, entretanto, ela possui um tamanho real maior do que a maçã, por isso, criamos a variavel `snake_positions` definindo as coordenadas onde a cobra será exibida. Para exibi-la fazemos um loop nessas posições:

```python
for pos in snake_positions:
    screen.blit(snake, pos)
```

Usamos o loop para iterar entre as posições que definimos e usamos o comando para desenhar nossa cobra, que é uma imagem 10x10 da cor verde.

Neste momento, já temos como desenhar as maçãs e a cobra. Porém, caso descomentemos o código das maçãs, vamos ver que apenas a cobra é desenhada, e que há um erro na lógica da aplicação. É preciso fazer algumas mudanças, para que possamos interagir com o jogo e fazer com que tanto as maçãs quanto a cobra sejam colocadas na tela ao mesmo tempo.

Para isso vamos fazer algumas mudanças no código, primeiramente vamos extrair nosso código de posição aleatória para uma função.

```python
def posicao_aleatoria():
    x = random.randint(0, 630)
    y = random.randint(0, 470)
    return (x//10 * 10, y//10 * 10)
```

Feito isto, podemos chamar este código em outros momentos do nosso código, além disso, criaremos uma variavel para armazenar o valor aleatório inicial da nossa maçã:

```python
apple_position = posicao_aleatoria()
```

Agora conseguimos exibir a cobra e a maçã na tela do usuário. Nosso código se encontra assim:

```python
import pygame
import random
from pygame.locals import *
from sys import exit

pygame.init()

screen = pygame.display.set_mode((640, 480), 0, 32)
screen.fill((0, 0, 0))
pygame.display.set_caption("Snake em Python com Pygame")

# Definindo a nossa cobra
snake_positions = [(300, 300), (310, 300), (320, 300)]
snake = pygame.Surface((10, 10))
snake.fill((0, 255, 0))

def posicao_aleatoria():
    x = random.randint(0, 630)
    y = random.randint(0, 470)
    return (x//10 * 10, y//10 * 10)


# Definindo a nossa maçã
apple_position = posicao_aleatoria()
apple = pygame.Surface((10, 10))
apple.fill((255, 0, 0))

running = True

while running:

    for event in pygame.event.get():
        if event.type == QUIT:
            pygame.quit()
            exit()

        screen.blit(apple, apple_position)
        for pos in snake_positions:
            screen.blit(snake, pos)

        pygame.display.update()
```

Ainda não temos nenhum tipo de interação com o jogo, por isso iremos adicionar os comandos necessários para jogar.

Para simplificar, vamos mudar o nome da variavel `snake_positions` para `snake_pos`:

```python
snake_pos = [(300, 300), (310, 300), (320, 300)]
```
Iremos então criar um `if` para verificar os eventos lançados pelo pygame, igual ao que é feito para verificar o comando de saída, entretanto, este irá analisar os eventos de teclas pressionadas:

```python
if event.type == KEYDOWN:
    if event.key == K_UP:
        direcao = 0
    if event.key == K_DOWN:
        direcao = 2
    if event.key == K_RIGHT:
        direcao = 1
    if event.key == K_LEFT:
        direcao = 3
```

Adicionamos também, fora do loop do jogo, uma variavel chamada `direcao`, ela defini a direção inicial da cobra.

```python
direcao = 3 # Esquerda
```

Este código irá definir a nova posições da cobra, de acordo com as teclas pressionadas, no caso, as teclas direcionais (K_UP, K_DOWN, K_RIGHT, K_LEFT). 

Definido como é feito o recebimento do evento, é preciso colocar o jogo em movimento, para isso usaremos o código abaixo:

```python 
for i in range(len(snake_pos) - 1, 0, -1):
    snake_pos[i] = (snake_pos[i-1][0], snake_pos[i-1][1])

if direcao == 0:
        snake_pos[0] = (snake_pos[0][0], snake_pos[0][1] - 10)
if direcao == 1:
        snake_pos[0] = (snake_pos[0][0], snake_pos[0][1] + 10)
if direcao == 2:
        snake_pos[0] = (snake_pos[0][0] + 10, snake_pos[0][1])
if direcao == 3:
      snake_pos[0] = (snake_pos[0][0] - 10, snake_pos[0][1])
```

O código parece complexo, mas na realidade é simples. O loop decrescente feito com o for, serve para movimentar o corpo da cobra constantemente. Enquanto que os `if` servem para indicar a direção da cabeça da cobra.

Agora que já esta feito como movimentar esta cobra, temos que definir a velocidade do jogo, ou o nosso FPS. O pygame usa um objeto chamado `Clock` para isso, ele serve para fazer a contagem do tempo. Para isto basta declararmos uma variavel `clock` da seguinte maneira:

```python
clock = pygame.time.Clock()
```

E chamar a função `tick` logo antes do nosso primeiro loop:

```python
running = True

clock = pygame.time.Clock()

while running:
    clock.tick(10)

    for event in pygame.event.get():
        if event.type == QUIT:
            pygame.quit()
            exit()
```

Aqui nós definimos que a velocidade de atualização do nosso jogo é de 10 FPS, a cada 10 FPS nossa tela muda com a nova posição da cobra. Neste ponto, a cobra deixa um rastro verde pela tela, por que ela esta sobresvendo a nossa tela, para corrigir esse comportamento, basta mudar a chamada do preenchimento da tela `screen.fill((0, 0, 0))`, tirando do começo do script e trazendo para depois dos movimentos da cobra.

```python
screen.fill((0, 0, 0))
screen.blit(apple, apple_position)
for pos in snake_pos:
    screen.blit(snake, pos)
```

Agora já temos a cobra se movimentando pela tela, sendo controlada pelas teclas direcionais. Para concluir, precisamos implementar mais dois comportamentos, o de colisão com as maçãs e aumentar o tamanho da cobra cada vez que isso acontecer.

```python
def colisao(objetoA, objetoB):
    return (objetoA[0] == objetoB[0]) and (objetoA[1] == objetoB[1])
```

A função acima retorna `True` ou `False`, comparando as posições dos objetos, utilizaremos ela da seguinte forma:

```python
if colisao(snake_pos[0], apple_position):
    apple_position = posicao_aleatoria()
    snake_pos.append((0,0))
```

O nosso `if` vai verificar se a cabeça da cobra , a tupla na posição 0 `snake_pos[0]` está na mesma posição da maçã `apple_position`, caso seja verdadeiro, a maçã receberá uma nova posição aleatória na tela e a nossa cobra irá aumentar de tamanho.

Este é o fim do tutorial para criar um jogo Snake da forma mais simples possível. Do jeito que ele está agora, é possível ainda fazer várias modificações para aumentar a dificuldade dele e para dar `game over`, como colisão com a parede ou colisão com própria cobra.