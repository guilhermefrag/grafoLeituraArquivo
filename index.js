//Adair Locks, Vinicios Santos, Guilherme Fragnani

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
      const valorVertice = item[1],
        vAtual = grafo.getVerticePorNome(valorVertice),
        ultimoNumero = String(valorVertice).slice(-1);

      if (valorVertice == 101) {
        const vAnterior = grafo.getVerticePorNome(valorVertice - 99),
          vProximo = grafo.getVerticePorNome(valorVertice + 1);

        vAnterior && grafo.addAresta(vAtual, vAnterior);
        vProximo && grafo.addAresta(vAtual, vProximo);
      }

      if (ultimoNumero == 1 && valorVertice !== 101) {
        const v100Mais = grafo.getVerticePorNome(valorVertice + 100),
          v1Mais = grafo.getVerticePorNome(valorVertice + 1),
          v99Menos = grafo.getVerticePorNome(valorVertice - 99),
          v101Mais = grafo.getVerticePorNome(valorVertice + 101);

        v100Mais && grafo.addAresta(vAtual, v100Mais);
        v1Mais && grafo.addAresta(vAtual, v1Mais);
        v99Menos && grafo.addAresta(vAtual, v99Menos);
        v101Mais && grafo.addAresta(vAtual, v101Mais);
      }

      if (ultimoNumero == 2) {
        const vAntFinalTres = grafo.getVerticePorNome(valorVertice - 99),
          vAntFinalDois = grafo.getVerticePorNome(valorVertice - 100),
          vAntFinalUm = grafo.getVerticePorNome(valorVertice - 101),
          vProximoFinalTres = grafo.getVerticePorNome(valorVertice + 1),
          v1Menos = grafo.getVerticePorNome(valorVertice - 1),
          vProximoFinalDois = grafo.getVerticePorNome(valorVertice + 100),
          vProximoFinalUm = grafo.getVerticePorNome(valorVertice + 99);

        vAntFinalTres && grafo.addAresta(vAtual, vAntFinalTres);
        vAntFinalDois && grafo.addAresta(vAtual, vAntFinalDois);
        vAntFinalUm && grafo.addAresta(vAtual, vAntFinalUm);
        vProximoFinalTres && grafo.addAresta(vAtual, vProximoFinalTres);
        vProximoFinalDois && grafo.addAresta(vAtual, vProximoFinalDois);
        vProximoFinalUm && grafo.addAresta(vAtual, vProximoFinalUm);
        v1Menos && grafo.addAresta(vAtual, v1Menos);
      }

      if (ultimoNumero == 3) {
        const v100Mais = grafo.getVerticePorNome(valorVertice + 100),
          v99Mais = grafo.getVerticePorNome(valorVertice + 99),
          v101Mais = grafo.getVerticePorNome(valorVertice + 101),
          v1Menos = grafo.getVerticePorNome(valorVertice - 1),
          v1Mais = grafo.getVerticePorNome(valorVertice + 1);

        v100Mais && grafo.addAresta(vAtual, v100Mais);
        v99Mais && grafo.addAresta(vAtual, v99Mais);
        v101Mais && grafo.addAresta(vAtual, v101Mais);
        v1Menos && grafo.addAresta(vAtual, v1Menos);
        v1Mais && grafo.addAresta(vAtual, v1Mais);
      }

      if (ultimoNumero == 4) {
        const v100Mais = grafo.getVerticePorNome(valorVertice + 100),
          v1Menos = grafo.getVerticePorNome(valorVertice - 1),
          v99Menos = grafo.getVerticePorNome(valorVertice - 99),
          v99Mais = grafo.getVerticePorNome(valorVertice + 99),
          v100Menos = grafo.getVerticePorNome(valorVertice - 100);

        v100Mais && grafo.addAresta(vAtual, v100Mais);
        v1Menos && grafo.addAresta(vAtual, v1Menos);
        v100Menos && grafo.addAresta(vAtual, v100Menos);
        v99Menos && grafo.addAresta(vAtual, v99Menos);
        v99Mais && grafo.addAresta(vAtual, v99Mais);
      }
    });

    console.log(grafo.toString());

    fs.writeFile("C:\\Temp\\texto.txt", grafo.toString(), function (erro) {
      if (erro) {
        throw erro;
      }

      return;
    });

    let duplicados = '\n Grafos com duplicidade: \n\n';

    nosComDuplicidade.forEach((item) => duplicados += `Linha: ${item[0]} - Valor: ${item[1]}\n`);

    fs.appendFile("C:\\Temp\\texto.txt", duplicados, function (erro) {
      if (erro) {
        throw erro;
      }

      return;
    });

    let negativos = '\n Grafos negativos: \n\n';

    nosNegativos.forEach((item) => negativos += `Linha: ${item[0]} - Valor: ${item[1]}\n`);

    fs.appendFile("C:\\Temp\\texto.txt", negativos, function (erro) {
      if (erro) {
        throw erro;
      }

      return;
    });
  }
});
