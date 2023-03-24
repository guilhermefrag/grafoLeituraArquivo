import * as path from "./diretorio.js";
import * as fs from "fs";

fs.readFile(`${path.homeLinux}/configs.txt`, "utf8", (err, data) => {
  if (err) {
    console.error(err);
  } else {

    let nosNegativos= [];
    let nosComDuplicidade = [];
    
    //como é iterado em linhas de arquivo n da de fazer forEach nem .map()
    for (const linha of data.split("\n")) {

      const linhaDividida = linha.split(":");

      //nem precisava disso na real, mas é bom pra garantir que não vai dar erro
      if (linhaDividida.length !== 2) {
        continue;
      }

      const numeroDaLinha = linhaDividida[0].trim();
      const nomeDaLinha = linhaDividida[1].trim();
      
      if (numeroDaLinha === "Linha1") {
        console.log(nomeDaLinha)
      }else if (parseInt(nomeDaLinha) < 0) {
        //Insere no array de numeros negativos
        nosNegativos.push([numeroDaLinha, parseInt(nomeDaLinha)]);
      }else if (nosComDuplicidade.includes(parseInt(nomeDaLinha))) {
        //Se já existe dentro do grafo, ele não duplica, apenas continua
        continue;
      }else if (parseInt(nomeDaLinha)){
        //Aqui fica a lógica principal do grafo
        nosComDuplicidade.push([numeroDaLinha, parseInt(nomeDaLinha)]);
      }
    }
    nosNegativos.map((item) => console.log(`Linha: ${item[0]} - Valor: ${item[1]}`));
    nosComDuplicidade.map((item) => console.log(`Linha: ${item[0]} - Valor: ${item[1]}`));
  }
});


// aqui é o grafo
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