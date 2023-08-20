## Requisitos

- NodeJS

## Instalação

Instale os pacotes:

```bash
$ npm install
```

## Comandos

Rodar o brute force em uma aplicação:

```bash
$ node index.js [url]
```

Especificar uma wordlist em um caminho diferente:

```bash
$ node index.js [url] -f [path]
```

Especificar o tempo de delay entre as requisições (padrão: 200ms):

```bash
$ node index.js [url] -d [ms]
```

Para mais informações:

```bash
$ node index.js --help
```