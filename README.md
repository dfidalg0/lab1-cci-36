# Sunset Driving

Projeto de realidade aumentada introdutório ao Three.js para a matéria de CCI-36 do ITA

Grupo:

-   Ana Paula Schuch

-   Diego Fidalgo

-   Pedro Freitas

Link: http://sunset-driving.vercel.app

O projeto consiste em um carrinho que pode ser movido com as setas do teclado.

![](public/tela.png)

O carro foi construído com as primitivas `TorusGeometry`, `BoxGeometry` e `CylinderGeometry`.

A tecla `c` pode ser utilizada para mostrar/ocultar o carro, enquanto a tecla `t` para mostrar/ocultar os eixos, grid, instruções e posicionamento da lâmpada.

## Rodar Localmente

Faça o clone do repositório e instale as dependências necessárias com o comando:

```bash
$ npm install
```

Por fim, o comando abaixo roda a aplicação:

```bash
$ npm run dev
```

## Eixos

Os eixos foram determinados de forma que a direção positiva do eixo Z coincidisse com a direção da linha amarela central na figura e as linhas verticais da grade se mantivessem paralelas às linhas amarelas laterais.

A correção da inclinação da câmera em relação ao eixo Y a imperfeição da fotografia foi estimada para um aspecto de tela e este valor foi corrigido para outros tamanhos de tela através do seu seno como

```js
Math.asin(BASE_SIN * camera.aspect / BASE_ASPECT)
```

Outras imperfeições foram corrigidas para diversos tamanhos de tela com base na mesma ideia.
