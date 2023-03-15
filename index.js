import * as path from "./diretorio.js";
import * as fs from "fs";

fs.readFile(`${path.homeLinux}/configs.txt`, "utf8", (err, data) => {
  if (err) {
    console.error(err);
  } else {
    // console.log(data);
  }
});

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

let g = new Grafo();
let c = g.addVertice("Criciúma");
let i = g.addVertice("Içara");
let a = g.addVertice("Ararangua");
let t = g.addVertice("Torres");

g.addAresta(c, i);
g.addAresta(c, t);
g.addAresta(i, a);
g.addAresta(a, t);

console.log(g.toString());