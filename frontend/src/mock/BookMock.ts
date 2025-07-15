export type Capitulo = {
  id: number;
  capitulo: number;
  titulo: string;
  paginas: number;
  conteudo: string;
};

export type Livro = {
  titulo: string;
  autor: string;
  anoLancamento: number;
  totalCapitulos: number;
  totalPaginas: number;
  descricao: string;
  capitulos: Capitulo[];
};

export const books: Livro[] = [
  {
    titulo: "Dom Casmurro",
    autor: "Machado de Assis",
    anoLancamento: 1899,
    totalCapitulos: 148,
    totalPaginas: 256,
    descricao:
      "Dom Casmurro é um dos maiores clássicos da literatura brasileira, escrito por Machado de Assis. A obra conta a história de Bentinho, um homem introspectivo e ciumento que revisita suas memórias da juventude, marcado pelo relacionamento com Capitu. Com uma narrativa rica em ironia e ambiguidade, o romance aborda temas como ciúmes, dúvida, religiosidade, traição e memória, deixando ao leitor a tarefa de julgar o que é verdade ou invenção.",
    capitulos: [
      {
        id: 1,
        capitulo: 1,
        titulo: "Capítulo 1 - Do Título",
        paginas: 6,
        conteudo:
          "Uma noite destas, vindo da cidade para o Engenho Novo, encontrei num trem da Central um rapaz aqui do bairro, que eu conheço de vista e de chapéu.",
      },
      {
        id: 2,
        capitulo: 2,
        titulo: "Capítulo 2 - Do Livro",
        paginas: 6,
        conteudo:
          "Agora que expliquei o título, passo a escrever o livro. Antes disso, porém, digamos os motivos que me põem a pena na mão...",
      },
      {
        id: 3,
        capitulo: 3,
        titulo: "Capítulo 3 - A Denúncia",
        paginas: 7,
        conteudo:
          "Ia entrar na sala de visitas, quando ouvi proferir o meu nome e escondi-me atrás da porta. A casa era a da Rua de Mata-Cavalos...",
      },
      {
        id: 4,
        capitulo: 4,
        titulo: "Capítulo 4 - A Primeira Lição",
        paginas: 8,
        conteudo:
          "José Dias amava os superlativos. Era um modo de dar feição monumental às ideias; não as havendo, servia a prolongar as frases...",
      },
      {
        id: 5,
        capitulo: 5,
        titulo: "Capítulo 5 - O Agregado",
        paginas: 15,
        conteudo:
          "Era nosso agregado desde muitos anos; meu pai ainda estava na antiga fazenda de Itaguaí, e eu acabava de nascer...",
      },
      {
        id: 6,
        capitulo: 6,
        titulo: "Capítulo 6 - O Seminário",
        paginas: 6,
        conteudo:
          "Mamãe desejava que eu fosse padre, e para isso fui mandado ao seminário. Lá vivi dias de dúvida, entre a vocação religiosa e o amor por Capitu...",
      },
      {
        id: 7,
        capitulo: 7,
        titulo: "Capítulo 7 - A Decisão",
        paginas: 5,
        conteudo:
          "Deixei o seminário. Voltei para casa decidido a enfrentar o mundo e conquistar Capitu, apesar dos olhares reprovadores e das pressões familiares...",
      },
      {
        id: 8,
        capitulo: 8,
        titulo: "Capítulo 8 - O Casamento",
        paginas: 7,
        conteudo:
          "Depois de muitas dificuldades e esperas, casei-me com Capitu. Nosso lar era simples, mas havia amor — pelo menos, assim parecia...",
      },
      {
        id: 9,
        capitulo: 9,
        titulo: "Capítulo 9 - Ezequiel",
        paginas: 6,
        conteudo:
          "Tivemos um filho, Ezequiel. Desde cedo, eu o observava, tentando ver se era mesmo meu. A dúvida crescia a cada dia, e com ela, o ciúme...",
      },
      {
        id: 10,
        capitulo: 10,
        titulo: "Capítulo 10 - As Dúvidas",
        paginas: 5,
        conteudo:
          "Comecei a desconfiar de tudo: da fidelidade de Capitu, das semelhanças entre Ezequiel e Escobar, meu melhor amigo. A paz do lar já não existia...",
      },
      {
        id: 11,
        capitulo: 11,
        titulo: "Capítulo 11 - A Separação",
        paginas: 6,
        conteudo:
          "A tensão entre Bentinho e Capitu cresce. A dúvida sobre a fidelidade dela o corrói, e ele a envia com o filho para o exterior. A separação é amarga e definitiva.",
      },
      {
        id: 12,
        capitulo: 12,
        titulo: "Capítulo 12 - A Solidão",
        paginas: 7,
        conteudo:
          "Bentinho se vê só, mergulhado em lembranças e arrependimentos. Relembra os momentos felizes e se questiona sobre as decisões que tomou.",
      },
      {
        id: 13,
        capitulo: 13,
        titulo: "Capítulo 13 - A Visita de José Dias",
        paginas: 6,
        conteudo:
          "José Dias volta a visitá-lo e revive episódios do passado. A conversa revela como a visão externa sempre influenciou as escolhas de Bentinho.",
      },
      {
        id: 14,
        capitulo: 14,
        titulo: "Capítulo 14 - Lembranças do Seminário",
        paginas: 7,
        conteudo:
          "Ele volta a refletir sobre os dias no seminário, as dúvidas vocacionais, e o sentimento que nutria por Capitu mesmo naquele ambiente sagrado.",
      },
      {
        id: 15,
        capitulo: 15,
        titulo: "Capítulo 15 - O Retrato",
        paginas: 6,
        conteudo:
          "Diante de um retrato antigo de Capitu, Bentinho mergulha em lembranças e se debate entre saudade e rancor.",
      },
    ],
  },
  {
    titulo: "Memórias Póstumas de Brás Cubas",
    autor: "Machado de Assis",
    anoLancamento: 1881,
    totalCapitulos: 160,
    totalPaginas: 208,
    descricao:
      "Memórias Póstumas de Brás Cubas é uma das obras mais importantes de Machado de Assis e da literatura brasileira. Narrado por um defunto-autor, o livro apresenta reflexões filosóficas, irônicas e críticas à sociedade do século XIX, com uma estrutura inovadora e fragmentada. Brás Cubas revisita sua vida com humor mordaz, destacando sua infância, amores, fracassos e ilusões, questionando os valores da elite e da própria existência.",
    capitulos: [
      {
        id: 1,
        capitulo: 1,
        titulo: "Capítulo 1 - Óbito do Autor",
        paginas: 6,
        conteudo:
          "Brás Cubas inicia sua narrativa a partir de sua própria morte, descrevendo seu enterro e as reações dos presentes.",
      },
      {
        id: 2,
        capitulo: 2,
        titulo: "Capítulo 2 - O Emplasto",
        paginas: 7,
        conteudo:
          "Ele introduz sua grande ideia: um emplasto anti-hipocondríaco, revelando sua vaidade e desejo de glória.",
      },
      {
        id: 3,
        capitulo: 3,
        titulo: "Capítulo 3 - Genealogia",
        paginas: 8,
        conteudo:
          "Explora suas origens familiares, remontando ao fundador da família e aos sucessos do pai.",
      },
      {
        id: 4,
        capitulo: 4,
        titulo: "Capítulo 4 - A ideia fixa",
        paginas: 6,
        conteudo:
          "Reflete sobre a persistência de sua ideia fixa, com digressões filosóficas e referências históricas.",
      },
      {
        id: 5,
        capitulo: 5,
        titulo: "Capítulo 5 - Em que aparece a orelha de uma Senhora",
        paginas: 7,
        conteudo:
          "Relata o impacto de um golpe de ar e insinua seu envolvimento com uma mulher misteriosa.",
      },
      {
        id: 6,
        capitulo: 6,
        titulo: "Capítulo 6 - Chimène, qui l’eût dit? Rodrigue, qui l’eût cru?",
        paginas: 8,
        conteudo:
          "Descreve a visita de Virgília e revive memórias de juventude e um amor passado.",
      },
      {
        id: 7,
        capitulo: 7,
        titulo: "Capítulo 7 - O Delírio",
        paginas: 6,
        conteudo:
          "Narra um delírio intenso envolvendo um hipopótamo e uma jornada simbólica até a origem dos séculos.",
      },
      {
        id: 8,
        capitulo: 8,
        titulo: "Capítulo 8 - Razão contra Sandice",
        paginas: 7,
        conteudo:
          "A razão retorna à sua mente e expulsa a sandice, restaurando sua sanidade.",
      },
      {
        id: 9,
        capitulo: 9,
        titulo: "Capítulo 9 - Transição",
        paginas: 8,
        conteudo:
          "Liga seu delírio à juventude e inicia o retorno à sua história de vida desde o nascimento.",
      },
      {
        id: 10,
        capitulo: 10,
        titulo: "Capítulo 10 - Naquele dia",
        paginas: 6,
        conteudo:
          "Recorda o dia do seu nascimento e os primeiros momentos celebrados pela família com orgulho.",
      },
      {
        id: 11,
        capitulo: 11,
        titulo: "Capítulo 11 - O Menino",
        paginas: 6,
        conteudo:
          "Brás Cubas descreve os primeiros anos de sua infância, destacando seu comportamento mimado e a afeição dos pais.",
      },
      {
        id: 12,
        capitulo: 12,
        titulo: "Capítulo 12 - O Bedelho",
        paginas: 7,
        conteudo:
          "Relembra um episódio cômico de sua juventude, quando tentou espiar as mulheres e foi repreendido, revelando traços de sua vaidade precoce.",
      },
      {
        id: 13,
        capitulo: 13,
        titulo: "Capítulo 13 - O Rabecão",
        paginas: 7,
        conteudo:
          "Faz uma comparação entre o início e o fim da vida, usando o rabecão (carroça funerária) como metáfora cínica da existência.",
      },
      {
        id: 14,
        capitulo: 14,
        titulo: "Capítulo 14 - A Escola",
        paginas: 8,
        conteudo:
          "Recorda os tempos de escola, professores e colegas. Mostra sua astúcia e como buscava destaque mesmo em tenra idade.",
      },
      {
        id: 15,
        capitulo: 15,
        titulo: "Capítulo 15 - O Cavalo",
        paginas: 7,
        conteudo:
          "Narra com humor sua primeira queda de cavalo, e as reflexões filosóficas que tirou do tombo, numa crítica à vaidade.",
      },
    ],
  },
];
