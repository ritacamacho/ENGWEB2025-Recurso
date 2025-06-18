# Teste de Engenharia Web 2025 (Recurso) 


## Persistência de Dados 🗂️

De forma a preparar o `dataset` utilizado, alterei todos os campos de `id` para `_id`, de forma a facilitar o processo de importação para a base de dados em `MongoDB`.
Todos os restantes campos foram cuidadosamente mantidos, renomeados ou normalizados, garantindo a consistência e compatibilidade com o esquema.


## Instruções de Execução 🛠️


### Rodar a Base de Dados 📦

Para a base de dados, rodar o `docker container` através de:

```
$ docker compose up -d
```


### Rodar Backend ⚙️

Entrar na diretoria com a aplicação:
```
$ cd ex1
```

Instalar dependências:
```
$ npm i
```

Iniciar a aplicação:
```
$ npm start
```

O serviço estará disponível na porta `18000` (`localhost:18000`).


### Rodar Frontend 🎨

Entrar na diretoria com a aplicação:
```
$ cd ex2
```

Instalar dependências:
```
$ npm i
```

Iniciar a aplicação:
```
$ npm start
```

O serviço estará disponível na porta `18001` (`localhost:18001`).