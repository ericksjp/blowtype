import Database from 'better-sqlite3';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dbPath = process.env.DB_FILE || path.join(__dirname, '../../database.sqlite');
const db: Database.Database = new Database(dbPath);

db.pragma('foreign_keys = ON');

const createUsersTable = `
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    email TEXT UNIQUE NOT NULL,
    username TEXT NOT NULL,
    password TEXT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )
`;

const createBooksTable = `
  CREATE TABLE IF NOT EXISTS books (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    author TEXT NOT NULL,
    year_published INTEGER NOT NULL,
    description TEXT NOT NULL,
    total_chapters INTEGER NOT NULL,
    total_pages INTEGER NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )
`;

const createChaptersTable = `
  CREATE TABLE IF NOT EXISTS chapters (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    book_id INTEGER NOT NULL,
    chapter_number INTEGER NOT NULL,
    title TEXT NOT NULL,
    total_pages INTEGER NOT NULL,
    FOREIGN KEY (book_id) REFERENCES books (id) ON DELETE CASCADE
  )
`;

const createPagesTable = `
  CREATE TABLE IF NOT EXISTS pages (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    chapter_id INTEGER NOT NULL,
    page_number INTEGER NOT NULL,
    content TEXT NOT NULL,
    FOREIGN KEY (chapter_id) REFERENCES chapters (id) ON DELETE CASCADE
  )
`;

const createTypingResultsTable = `
  CREATE TABLE IF NOT EXISTS typing_results (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL,
    book_id INTEGER NOT NULL,
    chapter_id INTEGER NOT NULL,
    page_id INTEGER NOT NULL,
    page_number INTEGER NOT NULL,
    wpm REAL NOT NULL,
    accuracy REAL NOT NULL,
    duration INTEGER NOT NULL,
    errors_count INTEGER NOT NULL,
    completed_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE,
    FOREIGN KEY (book_id) REFERENCES books (id) ON DELETE CASCADE,
    FOREIGN KEY (chapter_id) REFERENCES chapters (id) ON DELETE CASCADE,
    FOREIGN KEY (page_id) REFERENCES pages (id) ON DELETE CASCADE
  )
`;

db.exec(createUsersTable);
db.exec(createBooksTable);
db.exec(createChaptersTable);
db.exec(createPagesTable);
db.exec(createTypingResultsTable);

const seedData = () => {
db.exec("DELETE FROM books");
db.exec("VACUUM");
  const existingBooks = db.prepare('SELECT COUNT(*) as count FROM books').get() as { count: number };
  
  if (existingBooks.count === 0) {
    
    const insertBook = db.prepare(`
      INSERT INTO books (title, author, year_published, description, total_chapters, total_pages)
      VALUES (?, ?, ?, ?, ?, ?)
    `);
    
    const bookResult = insertBook.run(
      'Dom Casmurro',
      'Machado de Assis',
      1899,
      'Dom Casmurro é um dos maiores clássicos da literatura brasileira, escrito por Machado de Assis. A obra conta a história de Bentinho, um homem introspectivo e ciumento que revisita suas memórias da juventude, marcado pelo relacionamento com Capitu. Com uma narrativa rica em ironia e ambiguidade, o romance aborda temas como ciúmes, dúvida, religiosidade, traição e memória, deixando ao leitor a tarefa de julgar o que é verdade ou invenção.',
      15,
      256
    );
    
    const bookId = bookResult.lastInsertRowid as number;
    
    const insertChapter = db.prepare(`
      INSERT INTO chapters (book_id, chapter_number, title, total_pages)
      VALUES (?, ?, ?, ?)
    `);
    
    const insertPage = db.prepare(`
      INSERT INTO pages (chapter_id, page_number, content)
      VALUES (?, ?, ?)
    `);
    
    const chapters = [
      {
        chapter_number: 1,
        title: "Capítulo 1 - Do Título",
        total_pages: 6,
        content: "Uma noite destas, vindo da cidade para o Engenho Novo, encontrei no trem da Central um rapaz aqui do bairro, que eu conheço de vista e de chapéu. Cumprimentou-me, sentou-se ao pé de mim, falou da lua e dos ministros, e acabou recitando-me versos. A viagem era curta, e os versos pode ser que não fossem inteiramente maus. Sucedeu, porém, que, como eu estava cansado, fechei os olhos três ou quatro vezes; tanto bastou para que ele interrompesse a leitura e metesse os versos no bolso."
      },
      {
        chapter_number: 2,
        title: "Capítulo 2 - Do Livro",
        total_pages: 6,
        content: "Agora que expliquei o título, passo a escrever o livro. Antes disso, porém, digamos os motivos que me põem a pena na mão. Vivo só, com um criado. A casa em que moro é própria; fi-la construir de propósito, levado de um desejo tão particular que me vexa imprimi-lo, mas vá lá. Um dia, há bastantes anos, lembrou-me reproduzir no Engenho Novo a casa em que me criei na antiga Rua de Mata-cavalos, dando-lhe o mesmo aspecto e economia daquela outra, que desapareceu."
      },
      {
        chapter_number: 3,
        title: "Capítulo 3 - A Denúncia",
        total_pages: 7,
        content: "Ia entrar na sala de visitas, quando ouvi proferir o meu nome e escondi-me atrás da porta. A casa era a da Rua de Mata-Cavalos, eu tinha quinze anos. José Dias falava à minha mãe da minha aptidão para a carreira eclesiástica. Segundo ele, eu não pensava em moças, nem em brinquedos, e ainda agora não saía da igreja da Glória, onde estivera ouvindo missa."
      },
      {
        chapter_number: 4,
        title: "Capítulo 4 - A Primeira Lição",
        total_pages: 8,
        content: "José Dias amava os superlativos. Era um modo de dar feição monumental às ideias; não as havendo, servia a prolongar as frases. Levantou-se para ir buscar o sobretudo, que estava na cadeira do canto, e aproveitou o ensejo para conchegar ao peito as pontas do colete. Deste movimento resultava ficar-lhe a pessoa mais aprumada e também mais alta. Era necessário ser alto. José Dias dava parte dos seus setenta anos aos vinte e nove do século; fora soldado, e a disciplina militar deixa sempre alguma coisa."
      },
      {
        chapter_number: 5,
        title: "Capítulo 5 - O Agregado",
        total_pages: 15,
        content: "Era nosso agregado desde muitos anos; meu pai ainda estava na antiga fazenda de Itaguaí, e eu acabava de nascer. Um dia apareceu ali vendendo-se por médico homeopata; levava um Manual e uma botica. Havia então epidemia por aquelas partes, e vários fazendeiros e alguns da família tinham morrido de febres. Meu pai, que não acreditava na medicina da escola, nem desacreditava inteiramente na homeopatia, deixou experimentar o sistema. José Dias sarou a todos; pelo menos, os que tomaram os seus glóbulos não morreram, e a epidemia cessou."
      },
      {
        chapter_number: 6,
        title: "Capítulo 6 - Tio Cosme",
        total_pages: 6,
        content: "Tio Cosme vivia conosco também, desde que minha mãe enviuvou. Era irmão de meu pai, solteirão. Dormia uma cadeira de voltaire, ao lado da mesa de chá, lendo jornais ou cochilando. Prima Justina dizia que ele só prestava para produzir moléstia de fígado. Prima Justina... Aqui devia ser o lugar dela, mas falemos primeiro de tio Cosme. Era homem de paz; dava-se bem com os anjos e com os homens."
      },
      {
        chapter_number: 7,
        title: "Capítulo 7 - Dona Glória",
        total_pages: 5,
        content: "Minha mãe era boa criatura. Quando lhe morreu o marido, Pedro de Albuquerque Santiago, contava trinta e um anos de idade, e podia voltar para Itaguaí. Não quis; preferiu ficar perto da igreja em que meu pai fora sepultado. Vendeu a fazendola e os escravos, comprou alguns que pôs ao ganho ou alugou, uma dúzia de prédios, certo número de apólices, e deixou-se estar na casa de Mata-cavalos, onde eu nasci."
      },
      {
        chapter_number: 8,
        title: "Capítulo 8 - É Tempo",
        total_pages: 7,
        content: "Agora é tempo de saber que entre as pessoas da nossa convivência familiar houve uma que não vivia conosco nem aparecia às refeições. Era uma senhora, já viúva também, irmã de José Dias, D. Sancha, que morava na Tijuca e vinha às vezes fazer-nos visitas de alguns dias. Tinha certa autoridade na família, conquistada às vezes por conselhos acertados em ocasiões melindrosas."
      },
      {
        chapter_number: 9,
        title: "Capítulo 9 - A Ópera",
        total_pages: 6,
        content: "A vida é uma ópera e uma grande ópera. O tenor e o barítono lutam pelo soprano, em presença do baixo e dos comprimários, quando não são o soprano e o contralto que lutam pelo tenor, em presença do mesmo baixo e dos mesmos comprimários. Há coros numerosos, muitos bailados, e a orquestração é excelente... Mas, confesso que o libretto é confuso."
      },
      {
        chapter_number: 10,
        title: "Capítulo 10 - Aceito a Teoria",
        total_pages: 8,
        content: "Aceito a teoria do meu velho Marcolini, não só pela verossimilhança, que é muita vez toda a verdade, mas porque a minha vida se casa bem com ela. Cantei um duo terníssimo, depois um trio, depois um quatuor... Mas não adiantemos; vamos à primeira parte, em que eu vim a este mundo por uma casualidade amorosa. Quero dizer, meu pai não contava comigo ao casar; veio depois, como um acréscimo."
      },
      {
        chapter_number: 11,
        title: "Capítulo 11 - A Promessa",
        total_pages: 9,
        content: "O que me lembrava da promessa era justamente a ocasião de a cumprir, e a pessoa interessada nela. Não era só minha mãe que me queria padre. Tio Cosme, que não tinha filhos, também gostava da idéia. Prima Justina achou que eu daria um padre bonito. José Dias é que foi mais longe nas esperanças; chegou a dizer que eu podia vir a ser papa."
      },
      {
        chapter_number: 12,
        title: "Capítulo 12 - Na Varanda",
        total_pages: 7,
        content: "Fui para a varanda, onde ninguém me viu nem ouviu a dureza com que tratei o agregado; no entanto, eu bem sei que foi elle a causa inconsciente da minha crise. O que José Dias disse ou insinuou, minha mãe o tinha ouvido já da boca de prima Justina, e mais claro. Justina foi sempre de pouco miolo; disse tudo à nossa velha, e minha mãe ficou com o espírito agitado."
      },
      {
        chapter_number: 13,
        title: "Capítulo 13 - Capitu",
        total_pages: 10,
        content: "Na varanda, lembrou-me a dor que senti quando ouvi do José Dias que minha mãe estava decidida a meter-me no seminário. Era verdade; eu acabava de confirmar a notícia pela própria boca dela. Mas a dor que então me veio foi diminuindo, à medida que o tempo passava e eu me ia acostumando à idéia de separação; não porque a separação em si mesma fosse menos dura, mas porque o motivo dela era santo e digno."
      },
      {
        chapter_number: 14,
        title: "Capítulo 14 - A Inscrição",
        total_pages: 6,
        content: "Capitu deu-me as costas, voltando-se para o muro. Fiquei olhando as letras, traçadas no estuque, e perguntei-lhe quem lhe ensinara a escrever. — Foi o professor de primeiras letras. — Escreve bem. Capitu sorriu com gosto, pegou de um tijolo e riscou no muro algumas letras. Como me não acudisse logo à memória o sentido delas, Capitu entendeu que eu não sabia ler a sua letra, e apagou-as com a palma da mão."
      },
      {
        chapter_number: 15,
        title: "Capítulo 15 - Outra Voz Secreta",
        total_pages: 8,
        content: "Há uma força que nos impele para os nossos destinos, conforme a natureza deles, boa ou má força, segundo são os destinos. Se me lembra bem, a que a mim me impelia era boa, ou pelo menos assim a entendia. Talvez não fosse mais que a força comum a todos, e a direção é que fazia a diferença. Eu compreendia bem que minha mãe nutria esperanças; não ousava perguntar-lhe quais, mas adivinhava-as."
      }
    ];
    
    const splitContentIntoPages = (content: string, wordsPerPage: number = 50): string[] => {
      const words = content.split(' ');
      const pages: string[] = [];
      
      for (let i = 0; i < words.length; i += wordsPerPage) {
        const pageWords = words.slice(i, i + wordsPerPage);
        pages.push(pageWords.join(' '));
      }
      
      return pages.length > 0 ? pages : [content];
    };
    
    for (const chapter of chapters) {
      const chapterResult = insertChapter.run(bookId, chapter.chapter_number, chapter.title, chapter.total_pages);
      const chapterId = chapterResult.lastInsertRowid as number;
      
      const pages = splitContentIntoPages(chapter.content);
      
      for (let i = 0; i < pages.length; i++) {
        insertPage.run(chapterId, i + 1, pages[i]);
      }
    }
    
    console.log('seed complete');
  }
};

export const initDatabase = () => {
  seedData();
};

export { db as default };
