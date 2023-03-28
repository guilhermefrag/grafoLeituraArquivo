import * as path from "./diretorio.js";
import * as fs from "fs";

class Grafo {
  constructor() {
    this.vertices = [];
    this.arestas = [];
  }

  addVertice(nome) {
    let v = new Vertice(nome);
    this.vertices.push(v);
    return v;
  }

  addAresta(origem, destino) {
    let a = new Aresta(origem, destino);
    origem.addAdj(a);
    this.arestas.push(a);
    return a;
  }

  getVerticePorNome(nomeVertice) {
    return this.vertices.find(v => v.nome == nomeVertice);
  }

  toString() {
    let representacaoGrafos = "";

    for (let i = 0; i < this.vertices.length; i++) {
      representacaoGrafos += `${this.vertices[i].nome} -> `;

      let listaAresta = this.vertices[i].adj;
      for (let j = 0; j < listaAresta.length; j++) {
        representacaoGrafos += `"["${listaAresta[j].destino.nome}]"`;
        representacaoGrafos += " -> ";
      }
      representacaoGrafos += "[/]";
      representacaoGrafos += "\n";
    }
    return representacaoGrafos;
  }
}

class Vertice {
  constructor(nome) {
    this.nome = nome;
    this.adj = [];
  }

  addAdj(a) {
    this.adj.push(a);
  }

  toString() {
    return this.nome;
  }
}

class Aresta {
  constructor(origem, destino) {
    this.origem = origem;
    this.destino = destino;
  }
}

fs.readFile(`${path.homeWindows}/configs.txt`, "utf8", (err, data) => {
  if (err) {
    console.error(err);
  } else {

    let nosNegativos = [];
    let nosComDuplicidade = [];
    let nosGrafos = [];

    //como é iterado em linhas de arquivo n da de fazer forEach nem .map()
    for (const linha of data.split("\n")) {

      const linhaDividida = linha.split(":");

      //nem precisava disso na real, mas é bom pra garantir que não vai dar erro
      if (linhaDividida.length !== 2) {
        continue;
      }

      const numeroDaLinha = linhaDividida[0].trim();
      const valorDaLinha = linhaDividida[1].trim();

      if (numeroDaLinha === "Linha1") {
      } else if (parseInt(valorDaLinha) < 0) {
        //Insere no array de numeros negativos
        nosNegativos.push([numeroDaLinha, parseInt(valorDaLinha)]);
      } else if (nosGrafos.find((item) => item[1] === parseInt(valorDaLinha))) {
        //Se já existe dentro do grafo, ele não duplica, apenas continua
        nosComDuplicidade.push([numeroDaLinha, parseInt(valorDaLinha)]);

      } else if (parseInt(valorDaLinha)) {
        //Aqui preenche o array de números que serão usados no grafo
        nosGrafos.push([numeroDaLinha, parseInt(valorDaLinha)]);
      }
    }

    const grafo = new Grafo();

    nosGrafos.forEach(item => grafo.addVertice(item[1]));

    nosGrafos.forEach(item => {
      const valorVertice = item[1];

      if (String(valorVertice).slice(-1) == 1) {
        const vAnterior = grafo.getVerticePorNome(valorVertice - 99),
          vProximo = grafo.getVerticePorNome(valorVertice + 101),
          vAtual = grafo.getVerticePorNome(valorVertice);

        vAnterior && grafo.addAresta(vAnterior, vAtual);
        vProximo && grafo.addAresta(vProximo, vAtual);
      }

      if (String(valorVertice).slice(-1) == 2) {
        const vAntFinalTres = grafo.getVerticePorNome(valorVertice - 99),
          vAntFinalDois = grafo.getVerticePorNome(valorVertice - 100),
          vAntFinalUm = grafo.getVerticePorNome(valorVertice - 101),
          vProximoFinalTres = grafo.getVerticePorNome(valorVertice + 101),
          vProximoFinalDois = grafo.getVerticePorNome(valorVertice + 100),
          vProximoFinalUm = grafo.getVerticePorNome(valorVertice + 99),
          vAtual = grafo.getVerticePorNome(valorVertice);

        vAntFinalTres && grafo.addAresta(vAntFinalTres, vAtual);
        vAntFinalDois && grafo.addAresta(vAntFinalDois, vAtual);
        vAntFinalUm && grafo.addAresta(vAntFinalUm, vAtual);
        vProximoFinalTres && grafo.addAresta(vProximoFinalTres, vAtual);
        vProximoFinalDois && grafo.addAresta(vProximoFinalDois, vAtual);
        vProximoFinalUm && grafo.addAresta(vProximoFinalUm, vAtual);
      }
    });

    console.log(grafo.toString());

    // nosNegativos.map((item) => console.log(`Linha: ${item[0]} - Valor: ${item[1]}`));
    // console.log("--------------------------------------------------")
    // nosComDuplicidade.map((item) => console.log(`Linha: ${item[0]} - Valor: ${item[1]}`));
    // console.log("--------------------------------------------------")
    // nosGrafos.map((item) => console.log(`Linha: ${item[0]} - Valor: ${item[1]}`));
  }
});


// aqui é o grafo


// let g = new Grafo();
// let c = g.addVertice("Criciúma");
// let i = g.addVertice("Içara");
// let a = g.addVertice("Ararangua");
// let t = g.addVertice("Torres");

// g.addAresta(c, i);
// g.addAresta(c, t);
// g.addAresta(i, a);
// g.addAresta(a, t);

// console.log(g.toString());






function criarListaAdjacencia(lista) {
  let grafo = new Grafo();

  let numerosPositivos = lista.filter(numero => parseInt(numero) > 0 && !isNaN(numero));
  let numerosUnicos = [...new Set(numerosPositivos)];

  numerosUnicos.forEach((numero, index) => {
    let verticeAtual = grafo.addVertice(numero);

    if (index > 0 && numerosUnicos[index-1]) {
      let verticeAnterior = grafo.getVerticePorNome(numerosUnicos[index-1]);
      grafo.addAresta(verticeAtual, verticeAnterior);
    }

    if (index < numerosUnicos.length - 1 && numerosUnicos[index+1]) {
      let verticeSeguinte = grafo.getVerticePorNome(numerosUnicos[index+1]);
      grafo.addAresta(verticeAtual, verticeSeguinte);
    }
  });

  return grafo;
}
