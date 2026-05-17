/* ============================================================
   ARSENAL DO DIRETOR — script.js
   ------------------------------------------------------------
   Foco: método estruturado escrito (não vídeo).
   Termos premium: Arsenal · Materiais Estratégicos · Guias de
   Aplicação · Método de Aplicação · Central do Diretor.

   COMO ADICIONAR DINÂMICAS:
     Edite o array DYNAMICS. Cada item:
       id, moduleId, level, title, category, difficulty,
       duration, objective, steps[], notes
   COMO ADICIONAR MÓDULOS: edite MODULES.
   COMO ADICIONAR MATERIAIS ESTRATÉGICOS: edite ARSENAL.
   ============================================================ */

// ===== DADOS =====
const MODULES = [
  { id:'m1', title:'Fundamentos do Diretor',  level:1, color:'#3a5f8a', desc:'Bases do trabalho em sala: presença, escuta e jogo.' },
  { id:'m2', title:'Improviso Estruturado',   level:1, color:'#8a3a5f', desc:'Métodos para improvisar com clareza e propósito.' },
  { id:'m3', title:'Voz e Dicção Aplicadas',  level:2, color:'#8a5f3a', desc:'Sistema de aquecimento, projeção e clareza.' },
  { id:'m4', title:'Expressão Corporal',      level:2, color:'#5f8a3a', desc:'Consciência corporal e linguagem cênica.' },
  { id:'m5', title:'Planejamento de Aulas',   level:2, color:'#3a8a8a', desc:'Como estruturar aulas e ensaios profissionais.' },
  { id:'m6', title:'Direção e Espetáculo',    level:3, color:'#8a3a3a', desc:'Direção avançada, cena e palco profissional.', premium:true },
];

const DYN_RAW = [[1, "m1", "aquecimento", "Iniciante", "10–15 min", "Bomba Humana", "Libertar corpo e voz quebrando rigidez inicial.", "Em pé, imaginar inflar como bomba com som crescente.|Ao sinal BOOM, explodir com som e movimento livre.|Repetir 3x aumentando a intensidade.", "Participe junto — sua entrega dá permissão ao grupo."],
[1, "m1", "aquecimento", "Iniciante", "10–15 min", "Zumbi Acordado", "Ativar corpo lento, presença e foco.", "Caminhar em câmera lenta como zumbi pesado.|Acordar partes do corpo a cada comando.|Encerrar com plena energia ativa.", "Use trilha sonora crescente para sincronizar o despertar."],
[1, "m1", "aquecimento", "Iniciante", "10–15 min", "Espelho Maluco", "Foco, escuta e liderança compartilhada.", "Duplas frente a frente.|Um lidera movimentos suaves; outro espelha em tempo real.|A cada 30s, dizer TROCA sem pausar.", "Movimentos suaves no início — bruscos geram frustração."],
[1, "m1", "aquecimento", "Iniciante", "10–15 min", "Sacudida Total", "Soltar tensões acumuladas.", "Sacudir cada parte do corpo: 8, 4, 2, 1 vezes.|Encerrar pulando e gritando todos juntos.", "8 min, qualquer grupo."],
[1, "m1", "aquecimento", "Iniciante", "10–15 min", "Velocidades", "Variar a qualidade do movimento.", "Caminhar pela sala em velocidade 1 (lentíssimo) a 10 (corrida).|O facilitador chama os números aleatoriamente.", "Adiciona qualidades (peso, leveza) na repetição."],
[1, "m1", "aquecimento", "Iniciante", "10–15 min", "Sons do Corpo", "Criar sinfonia coletiva apenas com sons corporais.", "Em círculo, um propõe um som (palma, estalo, pisada).|Camadas se somam progressivamente.|Reger volume e ritmo do conjunto.", "Treina escuta e construção coletiva."],
[1, "m1", "aquecimento", "Iniciante", "10–15 min", "Caça ao Abraço", "Quebrar barreira física com leveza.", "Todos circulam pela sala.|Em 60s, acumular o máximo de abraços possível.", "Simples, eficaz e muito divertido."],
[1, "m1", "aquecimento", "Iniciante", "10–15 min", "Estátua Louca", "Composição corporal espontânea.", "Música toca, todos dançam.|Ao parar, congelam em pose dramática.|O facilitador visita o museu de estátuas.", "Bom revelador de criatividade física."],
[1, "m1", "aquecimento", "Iniciante", "10–15 min", "Roda de Olhares", "Estabelecer presença coletiva pelo olhar.", "Em círculo, todos em silêncio cruzam olhares por 2 min.|Quando dois olhares se encontram, manter por 3 segundos.", "Cria intimidade segura antes do jogo."],
[1, "m1", "aquecimento", "Iniciante", "10–15 min", "Aquecimento Sonoro", "Liberar voz sem texto.", "Vibração labial 1 min.|Som de sirene grave→agudo.|Vogais abertas projetadas ao fundo da sala.", "Prepara aparelho fonador sem exigir clareza."],
[1, "m1", "aquecimento", "Iniciante", "10–15 min", "O Nó Humano", "Comunicação e cooperação.", "Círculo com mãos entrelaçadas aleatoriamente.|Desembaraçar sem soltar nenhuma mão.", "Revela imediatamente a dinâmica de grupo."],
[1, "m1", "aquecimento", "Iniciante", "10–15 min", "Pega-Pega dos Animais", "Desinibição corporal e espontaneidade.", "Cada um escolhe secretamente um animal.|Locomove-se como o animal escolhido.|O pegador também é um animal.", "Cria liberdade física sem julgamento."],
[1, "m1", "aquecimento", "Iniciante", "10–15 min", "Grito do Guerreiro", "Libertar tensão vocal e corporal coletivamente.", "Em círculo, cada um solta um grito com movimento.|O grupo repete em uníssono.", "Encerre com respiração profunda."],
[1, "m1", "aquecimento", "Iniciante", "10–15 min", "Câmera Lenta Dramática", "Humor e desinibição cênica.", "Escolher cena cotidiana (ex: perder ônibus).|Recriar em câmera lenta com trilha dramática.", "Bom para grupos travados."],
[1, "m1", "aquecimento", "Iniciante", "10–15 min", "Marionete Humana", "Confiança e entrega corporal.", "Em trios: boneco, manipulador, espectador.|Manipulador conduz visivelmente o boneco.|Rotacionar papéis.", "Trabalha entrega sem agressividade."],
[1, "m1", "apresentacao", "Iniciante", "10 min", "Nome + Gesto", "Memorizar nomes com expressividade.", "Em círculo, cada um diz o nome com gesto associado.|Grupo repete nome+gesto em uníssono.|Acumular nomes na sequência.", "Reforça vínculo logo no início."],
[1, "m1", "apresentacao", "Iniciante", "10 min", "Entrevista Maluca", "Apresentar-se de forma criativa.", "Duplas se entrevistam com perguntas absurdas.|Apresentar o colega ao grupo respeitando as respostas.", "Quebra o gelo via humor."],
[1, "m1", "apresentacao", "Iniciante", "10 min", "Eu Sou…", "Autoapresentação rápida.", "Cada um completa três frases: Eu sou… Eu gosto… Eu temo…|Apresentação curta de 30s.", "Boas para grupos novos."],
[1, "m1", "apresentacao", "Iniciante", "10 min", "Mapa Vivo", "Apresentar-se geograficamente.", "Imaginar mapa do país no chão.|Cada um se posiciona onde nasceu e conta uma história curta.", "Cria visão coletiva do grupo."],
[1, "m1", "apresentacao", "Iniciante", "10 min", "Objeto Pessoal", "Apresentar-se via objeto significativo.", "Cada um traz um objeto e narra sua relação com ele em 1 min.", "Aprofunda vínculo emocional."],
[1, "m1", "apresentacao", "Iniciante", "10 min", "Foto Falada", "Reconstruir uma memória pessoal.", "Descrever uma foto importante como se a mostrasse ao grupo.", "Treina narrativa sensorial."],
[1, "m1", "apresentacao", "Iniciante", "10 min", "Nome com Ritmo", "Apresentação musical.", "Bater palma em compasso 4/4.|Cada um diz nome no compasso com qualidade vocal escolhida.", "Boa para grupos infantis e jovens."],
[1, "m1", "apresentacao", "Iniciante", "10 min", "Linha do Tempo", "Compartilhar percurso pessoal.", "Caminhar uma linha imaginária no espaço.|Marcar 3 momentos importantes da vida.", "Cria empatia entre o grupo."],
[1, "m1", "apresentacao", "Iniciante", "10 min", "Quem Sou Hoje", "Apresentação no estado presente.", "Em pé, cada um diz: hoje eu cheguei sentindo…|Grupo escuta sem comentar.", "Boa abertura de encontro."],
[1, "m1", "apresentacao", "Iniciante", "10 min", "Apresentação Cantada", "Apresentar-se em melodia improvisada.", "Cada um canta nome e algo que ama em melodia livre.", "Desinibe e libera voz."],
[1, "m1", "apresentacao", "Iniciante", "10 min", "Apresentação em Dupla", "Conhecer-se via parceiro.", "Duplas conversam 3 min.|Apresentam o parceiro como se fosse a si mesmo.", "Trabalha escuta ativa."],
[1, "m1", "apresentacao", "Iniciante", "10 min", "Mosaico Coletivo", "Construir identidade do grupo.", "Cada um diz uma palavra que define seu momento.|Construir um cartaz coletivo de palavras.", "Encerre com leitura compartilhada."],
[1, "m1", "grupo", "Iniciante", "10–15 min", "Estátua Coletiva", "Construir imagem corporal em grupo.", "Propor um tema (festa, opressão, alegria).|Em 30s, grupo compõe estátua coletiva.|Discutir o que a imagem comunica.", "Introduz noção de composição visual."],
[1, "m1", "grupo", "Iniciante", "10–15 min", "Conversa em Língua Inventada", "Comunicação não verbal.", "Duplas conversam usando língua inventada.|Manter sentido emocional apenas pelo tom e gesto.", "Treina expressividade pura."],
[1, "m1", "grupo", "Iniciante", "10–15 min", "Roda Cega", "Desenvolver confiança coletiva.", "Metade do grupo de olhos vendados.|A outra metade conduz com toque suave pelo espaço.", "Ótimo para construir confiança."],
[1, "m1", "grupo", "Iniciante", "10–15 min", "Travessia em Silêncio", "Coordenação coletiva.", "Atravessar a sala em uma única fileira.|Sem comunicação verbal — apenas olhar e respiração.", "Revela liderança orgânica."],
[1, "m1", "grupo", "Iniciante", "10–15 min", "Roda dos Sentimentos", "Compartilhamento afetivo.", "Em círculo, cada um nomeia uma emoção do dia.|Grupo respira junto após cada fala.", "Cria segurança emocional."],
[1, "m1", "grupo", "Iniciante", "10–15 min", "Cumprimento Inventado", "Quebrar protocolos físicos.", "Cada dupla cria um cumprimento inédito.|Repetir circulando pela sala.", "Quebra rigidez física."],
[1, "m1", "grupo", "Iniciante", "10–15 min", "Coro de Vozes", "Sincronia vocal grupal.", "Grupo emite som contínuo coletivo.|Variar volume e altura em uníssono.", "Constrói escuta coletiva."],
[1, "m1", "grupo", "Iniciante", "10–15 min", "Pulso Compartilhado", "Encontrar ritmo comum.", "Em círculo, grupo encontra pulso único.|Manter por 3 min em silêncio.", "Fundamento da escuta cênica."],
[1, "m1", "grupo", "Iniciante", "10–15 min", "Toque Consciente", "Trabalhar contato físico seguro.", "Em duplas, exploração lenta de mãos.|Conduzir e ser conduzido alternadamente.", "Combine com consentimento explícito."],
[1, "m1", "grupo", "Iniciante", "10–15 min", "Caminhada do Grupo", "Coordenação em fluxo.", "Caminhar como bando seguindo líder rotativo.|Mudar líder sem aviso.", "Treina percepção periférica."],
[1, "m1", "grupo", "Iniciante", "10–15 min", "Imagem-Espelho", "Refletir o grupo.", "Metade observa, outra metade faz pose.|Inverter papéis e debater.", "Trabalha consciência da imagem."],
[1, "m1", "grupo", "Iniciante", "10–15 min", "Diálogo do Olhar", "Estabelecer presença pelo olhar.", "Duplas se olham em silêncio por 2 min.|Trocar de parceiro e repetir.", "Cria intimidade rápida."],
[1, "m1", "grupo", "Iniciante", "10–15 min", "Despedida em Roda", "Encerramento simbólico.", "Em círculo, cada um deixa uma palavra para o grupo.", "Ritualiza o fechamento do encontro."],
[1, "m2", "improviso", "Iniciante", "12–15 min", "Cenas de 30 Segundos", "Foco em começo, meio e fim.", "Duplas recebem tema.|Improvisam cena de 30s com estrutura mínima.|Comentar arco dramático.", "Brevidade força clareza."],
[1, "m2", "improviso", "Iniciante", "12–15 min", "Cena Mudará", "Criar cena sem texto.", "Duplas criam cena sem palavras.|Plateia narra o que viu.", "Desenvolve expressividade corporal."],
[1, "m2", "improviso", "Iniciante", "12–15 min", "Tema Sorteado", "Improviso a partir de estímulo.", "Sortear papel com tema.|Cena de 90s usando o tema.", "Boa para iniciantes."],
[1, "m2", "improviso", "Iniciante", "12–15 min", "Três Palavras-Gatilho", "Criação imediata a partir de restrições.", "Sortear 3 palavras (objeto, lugar, emoção).|Improvisar cena usando os três elementos.", "Reforça estrutura básica."],
[1, "m2", "improviso", "Iniciante", "12–15 min", "Cena com Bloqueio", "Aprender pelo contraste.", "Improviso onde ambos negam tudo.|Refazer aceitando tudo.|Comparar resultados.", "Mostra valor do SIM, E…"],
[1, "m2", "improviso", "Iniciante", "12–15 min", "Cena Cotidiana", "Verossimilhança cênica.", "Dupla escolhe cena cotidiana real.|Reproduzir com naturalismo.", "Estabelece base da verdade cênica."],
[1, "m2", "improviso", "Iniciante", "12–15 min", "Cena Absurda", "Liberar imaginação.", "Tema absurdo (peixe presidente, etc).|Levar a sério dramaticamente.", "Desinibe a criatividade."],
[1, "m2", "improviso", "Iniciante", "12–15 min", "Cena com Objeto", "Improviso a partir de adereço.", "Cada dupla recebe objeto cotidiano.|Criar cena justificando o objeto.", "Treina invenção a partir do real."],
[1, "m2", "improviso", "Iniciante", "12–15 min", "Cena em 3 Atos", "Treinar estrutura clássica.", "1 min apresentação, 1 min conflito, 1 min resolução.", "Estrutura visível para iniciantes."],
[1, "m2", "improviso", "Iniciante", "12–15 min", "Personagem Animal", "Composição corporal de personagem.", "Cada um escolhe animal.|Improvisar cena cotidiana com qualidade animal.", "Treina vocabulário físico."],
[1, "m2", "improviso", "Iniciante", "12–15 min", "Monólogo de 1 Minuto", "Sustentar cena solo.", "Cada um recebe início de frase.|Improvisar monólogo de 60s.", "Confronta o medo do palco solo."],
[1, "m2", "improviso", "Iniciante", "12–15 min", "Diálogo Restrito", "Treinar economia verbal.", "Dupla só pode usar 5 palavras pré-definidas.|Sustentar diálogo de 2 min.", "Força expressão pela intenção."],
[1, "m2", "improviso", "Iniciante", "12–15 min", "Cena em Câmera Lenta", "Treinar precisão.", "Cena cotidiana em câmera lenta total.|Manter intenção dramática.", "Expõe cada microdetalhe."],
[1, "m2", "improviso", "Iniciante", "12–15 min", "Cena em Câmera Rápida", "Treinar timing.", "Cena cotidiana em velocidade dobrada.|Manter clareza de cada ação.", "Bom para grupos avançados em jogo."],
[1, "m2", "improviso", "Iniciante", "12–15 min", "Cena Coral", "Composição coletiva.", "Grupo todo entra em cena.|Construir um único ambiente coletivo.", "Treina visão de conjunto."],
[1, "m1", "confianca", "Iniciante", "12–18 min", "Queda de Confiança", "Construir confiança física.", "Em trios: um cai, dois aparam.|Variar altura e direção da queda.", "Comece com quedas pequenas e progrida."],
[1, "m1", "confianca", "Iniciante", "12–18 min", "Guia Cego pelo Som", "Confiança auditiva.", "Um vendado, parceiro guia apenas com som.|Atravessar percurso seguro.", "Reforça escuta refinada."],
[1, "m1", "confianca", "Iniciante", "12–18 min", "Caminhada Cega", "Confiar no espaço.", "Vendado, atravessa sala lentamente.|Parceiro acompanha à distância para segurança.", "Não interfira a menos que perigoso."],
[1, "m1", "confianca", "Iniciante", "12–18 min", "Conduzir pelo Toque", "Liderança gentil.", "Duplas: um vendado, outro conduz por leve toque no ombro.", "Trabalha entrega corporal."],
[1, "m1", "confianca", "Iniciante", "12–18 min", "Trust Fall em Roda", "Confiança coletiva.", "Um no centro, grupo ao redor.|O do centro cai em qualquer direção.|Grupo apara e devolve.", "Faça apenas com grupo já formado."],
[1, "m1", "confianca", "Iniciante", "12–18 min", "Escultura de Confiança", "Modelagem física segura.", "Um modela o corpo do parceiro como argila.|Parceiro fica disponível em silêncio.", "Estabelece consentimento antes."],
[1, "m1", "confianca", "Iniciante", "12–18 min", "Caminhada Conjunta", "Sincronia de equipe.", "Grupo caminha de mãos dadas.|Sincronizar pulso sem palavras.", "Cria sensação de coletivo."],
[1, "m1", "confianca", "Iniciante", "12–18 min", "Apoio Mútuo", "Equilíbrio em duplas.", "Duplas costa-com-costa.|Sentar e levantar juntos sem usar mãos.", "Trabalha entrega de peso."],
[1, "m1", "confianca", "Iniciante", "12–18 min", "Trio de Equilíbrio", "Confiança em estrutura.", "Trios constroem figura de equilíbrio.|Sustentar 30s e desfazer.", "Foco em segurança visual."],
[1, "m1", "confianca", "Iniciante", "12–18 min", "Levantar o Companheiro", "Confiança e força coletiva.", "Grupo de 6 levanta um deitado.|Subir lentamente até a altura dos ombros.", "Solte ainda mais lentamente."],
[1, "m1", "confianca", "Iniciante", "12–18 min", "Olhar de Apoio", "Conexão silenciosa.", "Em duplas, manter olhar firme por 3 min.|Trocar de parceiro.", "Aprofunda presença."],
[1, "m1", "confianca", "Iniciante", "12–18 min", "Carregar nas Costas", "Confiar no parceiro.", "Em duplas, alternar carregar nas costas pela sala.", "Atenção à coluna do carregador."],
[1, "m1", "confianca", "Iniciante", "12–18 min", "Conexão de Mãos", "Diálogo silencioso pelas mãos.", "Duplas conversam só pelo toque das mãos.|Sem olhar e sem voz.", "Trabalha intimidade segura."],
[1, "m1", "confianca", "Iniciante", "12–18 min", "Confiança em Grupo", "Fortalecer vínculo coletivo.", "Grupo forma círculo apertado.|Um no centro se inclina em qualquer direção.|Grupo apara firme.", "Trabalha confiança coletiva."],
[1, "m1", "confianca", "Iniciante", "12–18 min", "Despedida com Abraço", "Encerramento ritual.", "Grupo se abraça em roda final.|Silêncio coletivo de 1 min.", "Sela o trabalho do dia."],
[2, "m4", "corpo", "Intermediário", "20–30 min", "Escultura Viva", "Consciência corporal tridimensional.", "Duplas: um escultor, outro argila.|Esculpir em silêncio absoluto.|A escultura ganha vida por 30s.|Galeria coletiva.", "Argila não tem vontade nessa fase."],
[2, "m4", "corpo", "Intermediário", "20–30 min", "Câmera Lenta Emocional", "Qualidade da presença cênica.", "Mover-se em câmera lenta total.|A cada 10s, mudar estado emocional.|Impossível mentir em câmera lenta.", "Treina precisão emocional."],
[2, "m4", "corpo", "Intermediário", "20–30 min", "Arquétipos em Movimento", "Habitar arquétipos.", "Transitar entre Guerreiro, Sábio e Criança.|Cada um com qualidade física distinta.", "Não imitar — habitar."],
[2, "m4", "corpo", "Intermediário", "20–30 min", "Peso e Leveza", "Explorar qualidades opostas.", "Grupos de 4 alternam peso máximo e leveza extrema.|Misturar: corpo pesado com voz leve.", "Contradições criam personagens únicos."],
[2, "m4", "corpo", "Intermediário", "20–30 min", "Espelho Assimétrico", "Liderança compartilhada.", "Duplas criam reflexos distorcidos.|Trabalhar escuta sem hierarquia.", "Ninguém lidera explicitamente."],
[2, "m4", "corpo", "Intermediário", "20–30 min", "Mapa do Corpo", "Acionar emoção por zona corporal.", "Cada zona corporal carrega uma emoção.|Diretor aciona zonas para compor estados.", "Treina o corpo como teclado emocional."],
[2, "m4", "corpo", "Intermediário", "20–30 min", "Contato-Impro Guiado", "Improvisação com contato permanente.", "Duplas mantêm um ponto de contato físico.|Improvisar movimento por 10 min.", "Trabalho de escuta tátil."],
[2, "m2", "improviso", "Intermediário", "15–25 min", "Sim, E… Avançado", "Subtexto no improviso.", "Aceitar + intenção oculta + relação.|Cada fala carrega segunda camada.|Variação em câmera lenta emocional.", "O subtexto é o coração da cena."],
[2, "m2", "improviso", "Intermediário", "15–25 min", "Jogo das Emoções Contraditórias", "Subtexto emocional.", "Cada ator recebe emoção secreta.|Cena sobre tema neutro.|Plateia tenta adivinhar a emoção.", "Troque emoções no meio da cena."],
[2, "m2", "improviso", "Intermediário", "15–25 min", "Gêneros Cinematográficos", "Treinar tom e gênero.", "Mesma cena em 3 gêneros: terror, comédia, romance.|Mudar intenção sem mudar texto.", "Gênero é intenção, não texto."],
[2, "m2", "improviso", "Intermediário", "15–25 min", "Status Reversal", "Trabalhar dinâmica de poder.", "Cena com status inicial claro.|O status se inverte ao longo da cena sem ser dito.", "Trabalha hierarquia cênica."],
[2, "m2", "improviso", "Intermediário", "15–25 min", "Freeze", "Substituição cênica.", "Qualquer um pode gritar FREEZE.|Assume a posição exata e cria nova cena.", "Treina foco e reflexo."],
[2, "m2", "improviso", "Intermediário", "15–25 min", "Cenas em Loop", "Camadas ocultas pela repetição.", "Mesma cena repetida com emoção diferente.|Cada rodada revela nova camada.", "Bom para descobrir o subtexto."],
[2, "m2", "improviso", "Intermediário", "15–25 min", "Improviso com Restrição", "Criação sob limite.", "Cena com regra arbitrária (só perguntas, etc).|Sustentar 3 min sem quebrar.", "Restrição produz criatividade."],
[2, "m5", "direcao", "Intermediário", "25–35 min", "Triângulo Dramático", "Estrutura dramática prática.", "Grupos de 3 recebem desejo + obstáculo + ambiente.|10 min para criar cena estruturada.|Cena deve ter começo, meio e fim.", "Base de toda dramaturgia."],
[2, "m5", "direcao", "Intermediário", "25–35 min", "Objeto Disparador", "Construção em fases.", "Fase 1: relação com objeto.|Fase 2: outro ator entra e interrompe.|Fase 3: cena completa com conflito e resolução.", "Bom para descobrir estrutura."],
[2, "m5", "direcao", "Intermediário", "25–35 min", "Cena em 3 Tempos", "Estrutura não-linear.", "Cena começa no presente.|Flashback para o passado.|Termina com decisão sobre o futuro.", "Treina coerência dramática."],
[2, "m5", "direcao", "Intermediário", "25–35 min", "Cotidiano Deformado", "Distorcer o real.", "Cena cotidiana real.|Adicionar um elemento absurdo no meio.|Manter naturalismo apesar do absurdo.", "Cria humor e estranhamento."],
[2, "m5", "direcao", "Intermediário", "25–35 min", "Cena com Título Poético", "Justificar título dado.", "Diretor dá título poético antes da cena.|Cena deve justificar o título ao final.", "Estimula imaginação simbólica."],
[2, "m5", "direcao", "Intermediário", "25–35 min", "Cena Documentário", "Ficção em estilo documental.", "Atores criam ficção com entrevistas e narração.|Estilo terceira pessoa observador.", "Trabalha distância crítica."],
[2, "m4", "emocao", "Intermediário", "20–30 min", "Memória Emotiva Calibrada", "Controle emocional artístico.", "Acessar memória pessoal de carga média.|Calibrar intensidade 3/7/10.|Aplicar a um texto.", "Trabalha consciência emocional."],
[2, "m4", "emocao", "Intermediário", "20–30 min", "Máscara Emocional", "Tensão entre interno e externo.", "Ator sente emoção A internamente.|Exibe emoção B para o parceiro.|Cena se desenvolve com essa tensão.", "A queda da máscara é o ponto alto."],
[2, "m4", "emocao", "Intermediário", "20–30 min", "Espectro Emocional", "Percorrer estados emocionais.", "Estados: entorpecido, tensão, contenção, vibração, explosão.|Percorrer os 5 durante um monólogo.", "Contenção é tão dramática quanto explosão."],
[2, "m4", "emocao", "Intermediário", "20–30 min", "Transferência Emocional", "Passar emoção sem contato.", "Ator transfere emoção via olhar.|Sem palavra, sem toque.", "Treina presença irradiante."],
[2, "m4", "emocao", "Intermediário", "20–30 min", "Monólogo em Eco", "Amplificação do subtexto.", "Um ator fala monólogo.|Segundo ator ecoa apenas palavras emocionalmente carregadas.", "Revela carga oculta do texto."],
[2, "m4", "emocao", "Intermediário", "20–30 min", "Diário de Emoção", "Mapear paleta emocional.", "Listar 10 emoções vividas na semana.|Encarnar cada uma por 1 min.", "Aumenta vocabulário emocional."],
[2, "m4", "emocao", "Intermediário", "20–30 min", "Emoção Pública/Privada", "Trabalhar dissimulação.", "Emoção interna privada vs. expressão pública.|Cena explora o jogo entre as duas.", "Treina sofisticação cênica."],
[2, "m5", "ritmo", "Intermediário", "20–25 min", "Metrônomo Interno", "Treino de tempo cênico.", "Com metrônomo audível, mover-se e falar em sincronia.|Depois sem metrônomo, manter pulso interno.|Adicionar pressão emocional.", "Atores aceleram sob nervosismo — treine isso."],
[2, "m5", "ritmo", "Intermediário", "20–25 min", "Pausa como Ação", "A pausa como escolha dramática.", "Pausa funcional: 3s antes de cada fala.|Pausa expressiva: pausa em momento de tensão.|Diálogo de pausas: responder após 5s.", "A pausa é a ação mais corajosa."],
[2, "m5", "ritmo", "Intermediário", "20–25 min", "Sincronias e Rupturas", "Tempo coletivo.", "Grupo em sincronia rítmica.|Diretor rompe com gesto.|Grupo recompõe sincronia novamente.", "Treina escuta de conjunto."],
[2, "m5", "ritmo", "Intermediário", "20–25 min", "Regência Cênica", "Direção como maestro.", "Diretor é regente da cena.|Gestos indicam volume, velocidade, intensidade.|Atores respondem em tempo real.", "Treina obediência criativa."],
[2, "m5", "ritmo", "Intermediário", "20–25 min", "Tempo Suspenso", "Trabalhar suspensão.", "Cena com momento de suspensão prolongada.|Encontrar o instante exato de retomada.", "O timing perfeito é treinável."],
[2, "m5", "ritmo", "Intermediário", "20–25 min", "Aceleração Controlada", "Construir clímax cênico.", "Cena com aceleração gradual.|Velocidade dobra a cada minuto.|Encontrar o ápice e cair.", "Treina construção de clímax."],
[2, "m3", "interpretacao", "Intermediário", "25–35 min", "Memória Sensorial Ativada", "Alimentar emoção via memória sensorial.", "Atores vendados exploram objetos com as mãos.|Diretor guia memória afetiva associada.|Improvisar cena carregando a sensação.", "Manter contato físico, não representar."],
[2, "m3", "interpretacao", "Intermediário", "25–35 min", "Ação Física com Objetivo", "Stanislavski — ação com intenção.", "Definir objetivo claro: quero que o outro faça X.|Executar ação física simples carregando o objetivo.|Parceiro reage genuinamente.", "Sem objetivo, vira mímica."],
[2, "m3", "interpretacao", "Intermediário", "25–35 min", "Método das Circunstâncias Dadas", "Improviso com contexto secreto.", "Cada ator recebe cartão com circunstâncias.|Improvisar cena cotidiana.|Grupo identifica as circunstâncias.", "Mude uma circunstância e observe a transformação."],
[2, "m3", "interpretacao", "Intermediário", "25–35 min", "Espelho Emocional", "Sincronia emocional cênica.", "Duplas sincronizam respiração e impulso emocional.|Antes de criar a cena.", "Cria comunhão pré-cena."],
[2, "m3", "interpretacao", "Intermediário", "25–35 min", "Máscara Neutra", "Corpo sem expressão facial.", "Ator com máscara neutra explora cena.|O corpo precisa contar tudo.", "Revela hábitos faciais que muletam o ator."],
[2, "m3", "interpretacao", "Intermediário", "25–35 min", "Supertexto", "Desejo profundo do personagem.", "Identificar o desejo além do que se diz.|Falar o texto carregando o desejo oculto.", "Diferencia texto e subtexto."],
[2, "m3", "interpretacao", "Intermediário", "25–35 min", "Impulso e Resposta", "Reatividade genuína.", "Ator age apenas quando recebe impulso real.|Sem antecipar, sem mecanizar.", "Treina escuta radical."],
[2, "m5", "direcao", "Intermediário", "25–40 min", "Arquitetura da Cena", "Estrutura clássica em prática.", "Identificar conflito inicial.|Construir desenvolvimento.|Marcar clímax.|Resolver com clareza.", "Evita cena de uma só temperatura."],
[2, "m5", "direcao", "Intermediário", "25–40 min", "Cena do Não-Dito", "Conflito apenas no subtexto.", "Cena cotidiana onde o conflito real nunca é dito.|Subtexto aparece em ações, pausas e foco.", "Após a cena, plateia narra o conflito real."],
[2, "m5", "direcao", "Intermediário", "25–40 min", "Cena em Camadas", "Reconfiguração coletiva.", "Cena começa com um ator.|Novo integrante entra a cada 2 min.|Cada chegada reorganiza tudo.", "Quem entra deve se integrar, não quebrar."],
[2, "m5", "direcao", "Intermediário", "25–40 min", "Ritmo e Pausa", "Respiração dramática.", "Mapear onde a cena acelera.|Onde desacelera.|Onde para totalmente.", "Treina pulso da cena."],
[2, "m5", "direcao", "Intermediário", "25–40 min", "Cena Reversa", "Causalidade ao contrário.", "Improvisar conhecendo apenas o final.|Construir o início que justifica esse final.", "Revela como o grupo constrói causalidade."],
[2, "m5", "direcao", "Intermediário", "25–40 min", "Tempo Dilatado", "Momento expandido.", "Repetir momento de maior tensão em câmera ultra-lenta.|Descobrir micro-impulsos invisíveis.", "Trabalha precisão de impulso."],
[2, "m5", "direcao", "Intermediário", "25–40 min", "Cena sem Palavras", "Comunicação puramente cênica.", "Narrativa apenas com corpo, objetos e espaço.|Nenhuma palavra permitida.", "Trabalha dramaturgia visual."],
[2, "m3", "relacao", "Intermediário", "25–35 min", "Mapa de Poder", "Hierarquia em movimento.", "Estabelecer poder inicial pela postura e voz.|Identificar ponto de virada.|Executar transferência visível de poder.", "Poder deve mudar no corpo, não no texto."],
[2, "m3", "relacao", "Intermediário", "25–35 min", "História Compartilhada", "Passado comum entre personagens.", "Duplas constroem 5 lembranças compartilhadas.|Cena no presente carregando essa história.", "Construa a mesma história de cada ponto de vista."],
[2, "m3", "relacao", "Intermediário", "25–35 min", "Escuta Ativa Radical", "Resposta de impulso real.", "Ator só responde após impulso autêntico do parceiro.|Sem antecipar, sem decorar timing.", "Revela atores que esperam vez de falar."],
[2, "m3", "relacao", "Intermediário", "25–35 min", "Negociação de Conflito", "Lógica de convivência cênica.", "Personagens com objetivos opostos.|Encontrar lógica que sustente a cena sem dissolver o conflito.", "Conflito é estrutura, não acidente."],
[2, "m3", "relacao", "Intermediário", "25–35 min", "Subtexto Físico", "Conflito no corpo.", "Texto neutro, conflito aparece só nos gestos.|Plateia narra conflito percebido.", "Ensina corpo como dramaturgia."],
[2, "m3", "relacao", "Intermediário", "25–35 min", "Distância Cênica", "Geometria do vínculo.", "Cena explora variações de distância física.|Cada distância carrega significado relacional.", "Treina linguagem espacial."],
[2, "m3", "voz", "Intermediário", "20–30 min", "Ressonadores em Ação", "Mapear ressonância corporal.", "Percorrer ressonadores: peitoral, nasal, craniano.|Sentir como cada um altera qualidade vocal.|Sem forçar a laringe.", "Volume não é presença — qualidade é."],
[2, "m3", "voz", "Intermediário", "20–30 min", "Trava-Língua em Contexto", "Articulação sob pressão emocional.", "Dizer trava-língua sussurrando.|Depois em raiva intensa.|Depois em choro.|Sem perder articulação.", "Treina dicção sob emoção real."],
[2, "m3", "voz", "Intermediário", "20–30 min", "Ritmo da Fala como Personagem", "Ritmo como dramaturgia.", "Personagem ansioso: rápido, frases curtas.|Personagem seguro: pausas longas, ritmo constante.|Personagem ingênuo: hesitante, autocorreções.", "Ritmo é escolha dramatúrgica."],
[2, "m3", "voz", "Intermediário", "20–30 min", "Texto sem Vogais", "Osso da fala.", "Articular apenas consoantes do texto.|Sentir como elas estruturam a fala.", "Revela arquitetura sonora do texto."],
[2, "m3", "voz", "Intermediário", "20–30 min", "Voz Corporal", "Voz a partir do corpo.", "Voz nasce em diferentes partes do corpo.|Explorar voz do pé, do peito, da cabeça.", "Voz não é só laringe."],
[2, "m3", "voz", "Intermediário", "20–30 min", "A Voz do Personagem", "Partitura vocal específica.", "Definir timbre, ritmo e pausas do personagem.|Manter partitura ao longo da cena.", "Treina consistência vocal."],
[2, "m3", "voz", "Intermediário", "20–30 min", "Projeção Direcional", "Voz com endereço.", "Lançar voz para pontos específicos do espaço.|Sem gritar, com intenção precisa.", "Diferencia projeção de força."],
[2, "m6", "espaco", "Intermediário", "25–35 min", "Mapeamento de Zonas de Poder", "Compreender forças do palco.", "Identificar zonas de força do espaço.|Cada zona tem energia diferente.|Escolher conscientemente onde estar.", "Treina leitura espacial."],
[2, "m6", "espaco", "Intermediário", "25–35 min", "A Cena Sem Marcação", "Padrões espontâneos.", "Improvisar sem marcação prévia.|Diretor revela padrões espaciais naturais.|Discutir intenção vs. acaso.", "Revela hábitos espaciais inconscientes."],
[2, "m6", "espaco", "Intermediário", "25–35 min", "Diagonais Dramáticas", "Caminho mais expressivo.", "A diagonal é o caminho mais longo do palco.|Treinar uso consciente da diagonal.", "Linguagem espacial clássica."],
[2, "m6", "espaco", "Intermediário", "25–35 min", "Composição de Grupo", "Imagens com hierarquia clara.", "Posicionar 3 ou mais atores no espaço.|Criar imagem com hierarquia visual.", "Treina olho de diretor."],
[2, "m6", "espaco", "Intermediário", "25–35 min", "Níveis e Planos", "Profundidade visual.", "Explorar chão, altura média, elevado.|Criar profundidade na cena.", "Diversifica linguagem espacial."],
[2, "m6", "espaco", "Intermediário", "25–35 min", "Cena com Mobília", "Espaço como dramaturgia.", "Distribuir objetos no espaço.|Cena justifica posição de cada objeto.", "O espaço conta a história."],
[3, "m6", "presenca", "Avançado", "30–45 min", "O Campo Magnético", "Espaço pessoal como extensão expressiva.", "Caminhar com olhar difuso.|Expandir campo de energia a 1m do corpo.|Quando dois campos se tocam, ambos param.|Reduzir campo para 50cm — espaço fica tenso.", "Observe quem atrai sem esforço."],
[3, "m6", "presenca", "Avançado", "30–45 min", "Ressonância Corporal", "Voz a partir de impulsos físicos.", "Ativar corpo como instrumento de ressonância.|Sincronizar ressonância sem tocar o parceiro.", "Grotowski — performer total."],
[3, "m6", "presenca", "Avançado", "30–45 min", "Os Três Centros", "Centro intelectual, emocional, físico.", "Cena conduzida pelo centro intelectual.|Outra pelo centro emocional.|Outra pelo centro físico.", "Cada centro gera presença distinta."],
[3, "m6", "presenca", "Avançado", "30–45 min", "Fogo Frio", "Intensidade com economia.", "Corpo imobilizado.|Manter energia interna em chama máxima.|Plateia sente sem ver ação.", "Presença sem movimento."],
[3, "m6", "presenca", "Avançado", "30–45 min", "Pulso Coletivo", "Ritmo compartilhado sem líder.", "Grupo encontra pulso comum.|Respiração sincronizada sem combinar.", "Fundamento da cena coral."],
[3, "m6", "presenca", "Avançado", "30–45 min", "Foco Roubado", "Consciência de foco cênico.", "Quem tem a cena?|Como transferir foco com precisão cirúrgica.", "Sem foco, não há narrativa."],
[3, "m6", "personagem", "Avançado", "40–60 min", "A Biografia Invisível", "Construir vida fictícia densa.", "Fase 1: infância.|Fase 2: trauma fundador.|Fase 3: hábitos atuais.|Improvisar dia comum do personagem.", "Contradições são o ouro."],
[3, "m6", "personagem", "Avançado", "40–60 min", "Corpo-Arquétipo", "Esforços de Laban no personagem.", "Definir esforço dominante: peso, tempo, fluência.|Encarnar arquétipo físico do personagem.", "Treina especificidade física."],
[3, "m6", "personagem", "Avançado", "40–60 min", "Máscaras Internas", "Camadas de identidade.", "Máscara social: como o personagem se apresenta.|Máscara íntima: como ele se vê.|Verdade: o que ele esconde de si.", "Toda grande personagem tem mentira própria."],
[3, "m6", "personagem", "Avançado", "40–60 min", "Animal Interior", "Qualidade animal do personagem.", "Escolher animal que carrega o personagem.|Encarnar 100% o animal.|Reduzir gradualmente até virar humano com vestígios.", "Lecoq — clássico."],
[3, "m6", "personagem", "Avançado", "40–60 min", "Morte do Personagem", "Último dia do personagem.", "Improvisar último dia de vida do personagem.|O que faz, diz, deixa para trás.", "Revela o que mais valoriza."],
[3, "m6", "personagem", "Avançado", "40–60 min", "Voz Interna do Personagem", "Pensamento por trás da fala.", "Falar o texto.|Outro ator narra os pensamentos por baixo.", "Trabalha consciência de subtexto."],
[3, "m6", "personagem", "Avançado", "40–60 min", "Personagem em Crise", "Comportamento sob pressão.", "Colocar personagem em situação extrema.|Observar escolhas inconscientes.", "Crise revela essência."],
[3, "m6", "improviso", "Avançado", "30–45 min", "Narrativa em Camadas", "4 camadas simultâneas de narrativa.", "Camada 1: ação.|Camada 2: relação.|Camada 3: ambiente.|Camada 4: tempo histórico.|3 rodadas adicionando camadas.", "Bogart — viewpoints."],
[3, "m6", "improviso", "Avançado", "30–45 min", "Jogo dos Obstáculos", "Resolução genuína sob colapso.", "Cena base com objetivo claro.|Obstáculos crescentes a cada minuto.|Chegar a colapso e encontrar resolução real.", "Sem resolução técnica."],
[3, "m6", "improviso", "Avançado", "30–45 min", "Espelho Partido", "Tempo cinestésico avançado.", "Duplas espelham com defasagem temporal.|Um atua, outro reflete 3s depois.", "Viewpoints — relação espacial."],
[3, "m6", "improviso", "Avançado", "30–45 min", "Gênero em Colapso", "Quebrar gênero a partir de dentro.", "Cena em gênero claro (terror, romance).|Em algum momento, gênero colapsa.|Encontrar novo gênero emergente.", "Treina risco cênico."],
[3, "m6", "improviso", "Avançado", "30–45 min", "Cena em Sussurro", "Intensidade pela contenção.", "Cena de máxima tensão dramática.|Toda em sussurro.|Trabalhar projeção contida.", "A contenção é poder."],
[3, "m6", "improviso", "Avançado", "30–45 min", "Cena Sem Ego", "Cena coletiva sem destaque.", "Cena onde ninguém pode roubar foco.|Tudo emerge do coletivo.", "Treina maturidade cênica."],
[3, "m6", "performance", "Avançado", "15–30 min", "O Ritual de Entrada", "Portal da cena.", "Desligamento do mundo externo.|Reconexão com o personagem.|Confirmação de presença coletiva.|Disponibilidade ao risco.", "Pratique até virar automático."],
[3, "m6", "performance", "Avançado", "15–30 min", "Aquecimento de Escuta", "Ensemble como organismo.", "Silêncio ativo de 5 min.|Pulso unificado pelo grupo.|Iniciar cena sem combinar.", "Ensemble começa antes do espetáculo."],
[3, "m6", "performance", "Avançado", "15–30 min", "Mapa de Intenções", "Risco consciente da noite.", "Qual medo vou enfrentar hoje?|Qual risco vou assumir?|Qual escolha nova vou tentar?", "Transforma medo em combustível."],
[3, "m6", "performance", "Avançado", "15–30 min", "Ativação Física Pré-Cena", "Romper bloqueio residual.", "30s de ativação intensa: pular, gritar, socar o ar.|Antes de entrar em cena.", "Quebra tensão acumulada."],
[3, "m6", "performance", "Avançado", "15–30 min", "Foco em Ponto Único", "Concentração total.", "Olhar para ponto fixo por 3 min.|Sem desviar, sem piscar muito.", "Centra a presença."],
[3, "m6", "performance", "Avançado", "15–30 min", "Diário de Risco", "Registro pós-performance.", "Anotar o que se arriscou.|O que se evitou.|O que se descobriu.", "Acelera desenvolvimento artístico."],
[3, "m6", "interpretacao", "Avançado", "30–60 min", "Ação Física Pura", "Método tardio de Stanislavski.", "Sequência de ações físicas concretas.|Sem buscar emoção.|Observar onde emoção emerge organicamente.", "Stanislavski tardio."],
[3, "m6", "interpretacao", "Avançado", "30–60 min", "Gestus Brechtiano", "Gesto como crítica social.", "Identificar gesto-síntese do personagem.|Gesto carrega posição social.|Repetir gesto em vários momentos da cena.", "Brecht — gestus como leitura."],
[3, "m6", "interpretacao", "Avançado", "30–60 min", "Viewpoints em Cena", "Tempo e espaço como linguagem.", "Aplicar viewpoints como lentes de análise.|Decisões cênicas baseadas em viewpoints.", "Bogart — vocabulário vivo."],
[3, "m6", "interpretacao", "Avançado", "30–60 min", "Lecoq — Corpo como Texto", "Corpo articula sentido.", "O corpo do ator articula o texto.|Sem ajuda da voz para significar.", "Lecoq — precisão técnica liberta."],
[3, "m6", "interpretacao", "Avançado", "30–60 min", "Decroux — Mimo Corporal", "Articulação corporal precisa.", "Trabalhar cada articulação separadamente.|Compor frase física como frase verbal.", "Mimo como gramática corporal."],
[3, "m6", "interpretacao", "Avançado", "30–60 min", "Strasberg — Memória Sensorial", "Memória detalhada.", "Reconstruir sensação física específica.|Aplicar à cena sem demonstrar.", "Strasberg — Actors Studio."],
[3, "m6", "interpretacao", "Avançado", "30–60 min", "Meisner — Repetição", "Verdade do momento.", "Duplas repetem observações um do outro.|Resposta sai do impulso, não da mente.", "Meisner — base americana."],
[3, "m6", "stanislavski", "Avançado", "45–90 min", "Memória Afetiva Estratificada", "Memória emocional controlada.", "Âncora: memória real de carga média.|Aprofundamento sensorial: cheiros, texturas, sons.|Transferência para o personagem.|Manter segurança psicológica.", "Strasberg + Stanislavski."],
[3, "m6", "stanislavski", "Avançado", "45–90 min", "Linha de Ações Físicas", "Ação produz emoção.", "Partitura de 8–12 ações físicas concretas.|Executar com plena atenção física.|Sem atuar emocionalmente.", "Brook usava no Mahabharata."],
[3, "m6", "stanislavski", "Avançado", "45–90 min", "Objetivos em Conflito", "Conflito autêntico via segredo.", "Dois atores recebem objetivos opostos secretos.|Nenhum sabe o objetivo do outro.|Conflito emerge organicamente.", "Group Theatre — Clurman."],
[3, "m6", "stanislavski", "Avançado", "45–90 min", "Circunstâncias Dadas Extremas", "Mesmo texto, contexto extremo.", "Cena cotidiana base.|Injetar circunstância radical: doença, pressão, segredo.|Reperformar.", "O mesmo diálogo vira peça diferente."],
[3, "m6", "stanislavski", "Avançado", "45–90 min", "Comunhão e Unidade", "Irradiação no ensemble.", "Ação coletiva sem líder.|Iniciar, pausar, finalizar em sincronia silenciosa.", "Stanislavski — irradiação."],
[3, "m6", "stanislavski", "Avançado", "45–90 min", "Construção do Super-Objetivo", "Motor de toda a vida do personagem.", "Identificar super-objetivo em frase de ação.|Improvisar em vários momentos da vida.|Testar se vibra mesmo nas pausas.", "Núcleo do sistema."],
[3, "m6", "meisner", "Avançado", "45–90 min", "Repetição Avançado", "Verdade pela repetição.", "Duplas repetem observações com camada emocional.|Cada repetição revela novo estado.|Sem esforço, sem antecipação.", "Meisner — núcleo."],
[3, "m6", "meisner", "Avançado", "45–90 min", "Atividade Independente", "Atividade real interrompida.", "Ator executa atividade real de alta exigência.|Parceiro entra com pedido difícil.|Cena emerge do conflito de atenção.", "Treina presença sob pressão."],
[3, "m6", "meisner", "Avançado", "45–90 min", "Preparação Emocional", "Estado emocional antes da cena.", "Ator prepara estado emocional verdadeiro antes de entrar.|Estado é trampolim, não destino.", "Meisner clássico."],
[3, "m6", "meisner", "Avançado", "45–90 min", "Cenas de Sonho", "Lógica onírica.", "Construir cena com lógica de sonho.|Sustentar a estranheza com seriedade.", "Trabalha imaginação radical."],
[3, "m6", "meisner", "Avançado", "45–90 min", "Texto como Veículo", "Texto serve à relação.", "Texto fica em segundo plano.|Foco total na relação ator-ator.", "Treina escuta acima do texto."],
[3, "m6", "meisner", "Avançado", "45–90 min", "Vida Entre as Cenas", "O que acontece offstage.", "Construir narrativa do que acontece entre cenas.|Entrar carregado dessa história.", "Personagem existe além da cena."],
[3, "m6", "viewpoints", "Avançado", "45–60 min", "Mapa de Tempo e Espacialidade", "Lentes de análise.", "Aplicar viewpoints de tempo e espaço.|Decisões cênicas como vocabulário.", "Bogart — SITI Company."],
[3, "m6", "viewpoints", "Avançado", "45–60 min", "Composição Cênica Coletiva", "Imagem coletiva ao vivo.", "Grupo compõe imagem em tempo real.|Sem ensaio prévio.|Atender a regras de composição visual.", "Treina olho de diretor coletivo."],
[3, "m6", "viewpoints", "Avançado", "45–60 min", "Arquitetura do Palco como Parceiro", "Espaço como ator.", "Explorar qualidades do espaço.|Cena emerge apenas do que o espaço sugere.", "Espaço é dramaturgia."],
[3, "m6", "viewpoints", "Avançado", "45–60 min", "Repetição e Variação de Forma", "Forma e variação.", "Repetir forma exata em variações.|Análise coletiva do significado emergente.", "Trabalha precisão formal."],
[3, "m6", "viewpoints", "Avançado", "45–60 min", "Escuta Tópica Avançada", "Escuta de pulso coletivo.", "Grupo se move em escuta total.|Decisões emergem do coletivo, não do indivíduo.", "Estado avançado de presença."],
[3, "m6", "viewpoints", "Avançado", "45–60 min", "Gesto e Texto: Contrapontos", "Tensão entre fala e gesto.", "Texto diz uma coisa.|Gesto contradiz o texto.|Plateia escolhe em que acreditar.", "Bertolt Brecht aplicado."],
[3, "m6", "fisico", "Avançado", "45–60 min", "Máscara Neutra e Presença Plena", "Presença sem excesso.", "Máscara neutra desativa expressão facial.|O corpo precisa contar tudo.|Transferir qualidade para o trabalho de personagem.", "Lecoq — clássico."],
[3, "m6", "fisico", "Avançado", "45–60 min", "Clown e Flop: Exposição Total", "Fracasso como matéria.", "Ator entra em cena com proposta clara.|Flop é assumido com humor.|Reconstrução em tempo real.", "Treina entrega radical."],
[3, "m6", "fisico", "Avançado", "45–60 min", "Partitura Física de Personagem", "Sequência física fixa.", "Compor sequência física do personagem.|Executar com precisão musical.|Camadas de texto sobre a partitura.", "Movimento como dramaturgia."],
[3, "m6", "fisico", "Avançado", "45–60 min", "Acrobacia Dramática", "Risco físico controlado.", "Movimento acrobático com sentido dramático.|Risco real, segurança técnica.", "Trabalhar com profissional habilitado."],
[3, "m6", "fisico", "Avançado", "45–60 min", "Impulso e Contato Improvisação", "Resposta orgânica corporal.", "Improviso com contato físico permanente.|Resposta emerge do corpo recebido.", "Treina escuta tátil radical."],
[3, "m6", "fisico", "Avançado", "45–60 min", "Solo Físico: Monólogo do Corpo", "Performance solo sem texto.", "Cena solo de 5 min sem palavras.|Silêncio e imobilidade tão expressivos quanto movimento.", "Treina performance solo."],
[3, "m6", "solo", "Avançado", "60–90 min", "Autobiografia Transformada", "Vida pessoal como matéria cênica.", "Selecionar episódio real.|Transformar em ficção cênica.|Encontrar distância crítica.", "Performance autoral."],
[3, "m6", "solo", "Avançado", "60–90 min", "Múltiplas Vozes, Um Corpo", "Vários personagens em um.", "Ator interpreta 4 vozes distintas.|Quinto personagem: o corpo puro sem voz.", "Solo coral."],
[3, "m6", "solo", "Avançado", "60–90 min", "Texto Encontrado e Montagem", "Material não-dramático em cena.", "Recolher textos não-dramáticos (lista de compras, notícia).|Montar em estrutura performática.", "Dramaturgia conceitual."],
[3, "m6", "solo", "Avançado", "60–90 min", "Confissão e Distância Crítica", "Verdade pessoal cênica.", "Confissão real do ator.|Encontrar distância para que vire cena.", "Performance e ética."],
[3, "m6", "solo", "Avançado", "60–90 min", "Objeto como Protagonista", "Cena focada no objeto.", "Objeto é o centro da cena.|Ator existe em função do objeto.", "Inverte a hierarquia cênica."],
[3, "m6", "solo", "Avançado", "60–90 min", "Performance Duracional", "Tempo expandido.", "Performance de 30+ min em ação contínua.|Sem narrativa convencional.", "Marina Abramović — tradição."],
[3, "m6", "solo", "Avançado", "60–90 min", "Solo Político e Testemunho", "Voz política pessoal.", "Identificar tema político urgente.|Construir solo de testemunho.|Equilíbrio entre estético e ético.", "Performance e cidadania."],
[3, "m6", "solo", "Avançado", "60–90 min", "A Última Peça", "Criar seu solo definitivo.", "Síntese de toda a formação.|Solo autoral completo.|Apresentação pública.", "Marco de conclusão da formação."]];
const DYNAMICS = DYN_RAW.map((r,i) => ({
  id:'d'+(i+1), level:r[0], moduleId:r[1], category:r[2],
  difficulty:r[3], duration:r[4], title:r[5], objective:r[6],
  steps:r[7].split('|'), notes:r[8]
}));

// ===== ARSENAL (materiais estratégicos / guias) =====
const ARSENAL = [
  { id:'a01', title:'Método dos 200+ Jogos Teatrais', cat:'metodo', tag:'Método', desc:'Sistema completo de aplicação prática por faixa etária.' },
  { id:'a02', title:'Guia de Aplicação — Iniciantes', cat:'guia', tag:'Guia', desc:'Estrutura semanal pronta para os primeiros 30 dias.' },
  { id:'a03', title:'Guia de Aplicação — Intermediário', cat:'guia', tag:'Guia', desc:'Plano de evolução para grupos já formados.' },
  { id:'a04', title:'Repertório de Cena — Volume 1', cat:'repertorio', tag:'Repertório', desc:'Cenas curtas selecionadas para ensaios e mostras.' },
  { id:'a05', title:'Repertório de Cena — Volume 2', cat:'repertorio', tag:'Repertório', desc:'Cenas de média complexidade com notas de direção.', premium:true },
  { id:'a06', title:'Manual Avançado do Diretor', cat:'metodo', tag:'Método', desc:'Método completo de direção profissional.', premium:true },
  { id:'b01', title:'Jogos de Improvisação Rápida', cat:'bonus', tag:'BÔNUS 01', desc:'30 jogos prontos de 5 a 30 minutos — aquecimento, engajamento, aprofundamento e experiências completas.', bonus:true },
  { id:'b02', title:'30 Roteiros de Aquecimento Vocal e Corporal', cat:'bonus', tag:'BÔNUS 02', desc:'Roteiros completos para cantores, atores e professores: corporal, vocal, combinado, pré-performance e desaquecimento.', bonus:true },
];

const ACHIEVEMENTS = [
  { id:'a1', icon:'🎭', name:'Primeiro Ato',     desc:'Concluiu sua primeira dinâmica',  check:p => p.done.length >= 1 },
  { id:'a2', icon:'🔥', name:'Em Cena',          desc:'5 dinâmicas concluídas',          check:p => p.done.length >= 5 },
  { id:'a3', icon:'⭐', name:'Estrela',          desc:'10 dinâmicas concluídas',         check:p => p.done.length >= 10 },
  { id:'a4', icon:'📘', name:'Estrategista',     desc:'Acessou 3 materiais estratégicos',check:p => p.pdfs.length >= 3 },
  { id:'a5', icon:'🏆', name:'Mestre do Palco',  desc:'Concluiu toda a trilha',          check:p => p.done.length >= DYNAMICS.length },
  { id:'a6', icon:'💎', name:'Nível Avançado',   desc:'Alcançou o Nível 3',              check:p => p.done.some(id => DYNAMICS.find(l=>l.id===id)?.level===3) },
  { id:'a7', icon:'❤️', name:'Curador',          desc:'Favoritou 3 dinâmicas',           check:p => p.favs.length >= 3 },
  { id:'a8', icon:'🎓', name:'Diretor Certificado',desc:'100% concluído',                check:p => p.done.length === DYNAMICS.length },
];

// ===== STATE =====
const STORAGE = { user:'dt_user', progress:'dt_progress' };
function loadProgress(){
  try { return JSON.parse(localStorage.getItem(STORAGE.progress)) || {done:[],favs:[],pdfs:[],last:null}; }
  catch { return {done:[],favs:[],pdfs:[],last:null}; }
}
function saveProgress(p){ localStorage.setItem(STORAGE.progress, JSON.stringify(p)); }

let progress = loadProgress();
let currentDynId = null;

// ===== LOADER =====
window.addEventListener('load', () => {
  setTimeout(()=> document.getElementById('globalLoader').classList.add('hide'), 600);
  initApp();
});

// ===== INIT =====
function initApp(){
  const user = localStorage.getItem(STORAGE.user);
  if(user){ showApp(); } else { showLogin(); }

  // ===== ACESSO LIBERADO (credenciais fixas do produto) =====
  const ACCESS_EMAIL = 'acessoimediato@outlook.com';
  const ACCESS_PASS  = '@2026';
  document.getElementById('loginForm').addEventListener('submit', e=>{
    e.preventDefault();
    const email = document.getElementById('email').value.trim().toLowerCase();
    const pass  = document.getElementById('password').value;
    if(!email || !pass) return toast('Preencha e-mail e senha');
    if(email !== ACCESS_EMAIL.toLowerCase() || pass !== ACCESS_PASS){
      return toast('Credenciais inválidas. Verifique o e-mail e a senha de acesso.');
    }
    localStorage.setItem(STORAGE.user, JSON.stringify({email}));
    toast('Bem-vindo(a) ao Arsenal!');
    showApp();
  });

  document.getElementById('logoutBtn').addEventListener('click', ()=>{
    localStorage.removeItem(STORAGE.user);
    location.reload();
  });

  document.querySelectorAll('[data-view]').forEach(el=>{
    el.addEventListener('click', e=>{ e.preventDefault(); switchView(el.dataset.view); closeSidebar(); });
  });
  document.querySelectorAll('[data-view-go]').forEach(el=>{
    el.addEventListener('click', e=>{ e.preventDefault(); switchView(el.dataset.viewGo); });
  });

  document.getElementById('menuBtn').addEventListener('click', toggleSidebar);

  document.getElementById('searchInput').addEventListener('input', e=>{
    filterDynamicsBySearch(e.target.value.toLowerCase());
  });

  document.getElementById('moduleFilters').addEventListener('click', e=>{
    if(!e.target.matches('.chip')) return;
    document.querySelectorAll('#moduleFilters .chip').forEach(c=>c.classList.remove('active'));
    e.target.classList.add('active');
    renderModules(e.target.dataset.filter);
  });

  document.getElementById('dynFilters').addEventListener('click', e=>{
    if(!e.target.matches('.chip')) return;
    document.querySelectorAll('#dynFilters .chip').forEach(c=>c.classList.remove('active'));
    e.target.classList.add('active');
    renderDynamics(e.target.dataset.dynFilter);
  });

  document.getElementById('arsenalFilters').addEventListener('click', e=>{
    if(!e.target.matches('.chip')) return;
    document.querySelectorAll('#arsenalFilters .chip').forEach(c=>c.classList.remove('active'));
    e.target.classList.add('active');
    renderArsenal(e.target.dataset.arsFilter);
  });

  document.querySelector('[data-action="continue-studying"]').addEventListener('click', ()=>{
    const last = progress.last || DYNAMICS[0].id;
    openDynamic(last);
  });

  document.querySelectorAll('[data-close-method]').forEach(el=>{
    el.addEventListener('click', closeMethod);
  });
  document.getElementById('doneBtn').addEventListener('click', markDone);
  document.getElementById('favBtn').addEventListener('click', toggleFav);
  document.getElementById('nextBtn').addEventListener('click', ()=> navDynamic(1));
  document.getElementById('prevBtn').addEventListener('click', ()=> navDynamic(-1));

  document.getElementById('aiStartBtn').addEventListener('click', ()=>{
    document.getElementById('aiChat').classList.remove('hidden');
    aiBot('Olá! Sou seu assistente teatral. Posso sugerir dinâmicas, métodos de aplicação e estruturas de ensaio. O que você precisa hoje?');
  });
  document.getElementById('aiForm').addEventListener('submit', e=>{
    e.preventDefault();
    const input = document.getElementById('aiInput');
    const msg = input.value.trim();
    if(!msg) return;
    aiUser(msg);
    input.value='';
    setTimeout(()=> aiBot(generateAIResponse(msg)), 700);
  });

  document.getElementById('certBtn').addEventListener('click', ()=>{
    toast('🎓 Certificação emitida! Verifique seu e-mail.');
  });

  renderAll();
}

// ===== VIEWS =====
function showLogin(){
  document.getElementById('loginScreen').classList.remove('hidden');
  document.getElementById('app').classList.add('hidden');
}
function showApp(){
  document.getElementById('loginScreen').classList.add('hidden');
  document.getElementById('app').classList.remove('hidden');
}
function switchView(name){
  document.querySelectorAll('[data-view-section]').forEach(s=>s.classList.remove('active'));
  const target = document.querySelector(`[data-view-section="${name}"]`);
  if(target) target.classList.add('active');
  document.querySelectorAll('.side-nav a').forEach(a=>a.classList.toggle('active', a.dataset.view===name));
  window.scrollTo({top:0,behavior:'smooth'});
  if(name==='favorites') renderFavorites();
  if(name==='dynamics') renderDynamics('all');
  if(name==='achievements') renderAchievements();
  if(name==='certificate') renderCertificate();
}
function toggleSidebar(){
  const sb = document.getElementById('sidebar');
  sb.classList.toggle('open');
  let scrim = document.querySelector('.scrim');
  if(!scrim){
    scrim = document.createElement('div');
    scrim.className='scrim';
    scrim.addEventListener('click', closeSidebar);
    document.body.appendChild(scrim);
  }
  scrim.classList.toggle('show', sb.classList.contains('open'));
}
function closeSidebar(){
  document.getElementById('sidebar').classList.remove('open');
  document.querySelector('.scrim')?.classList.remove('show');
}

// ===== RENDER =====
function renderAll(){
  renderStats();
  renderContinueRow();
  renderModules('all');
  renderModulesPreview();
  renderDynamics('all');
  renderArsenal('all');
  renderLevels();
  renderProgressBars();
}

function renderStats(){
  document.getElementById('statDynamics').textContent = DYNAMICS.length;
  document.getElementById('statArsenal').textContent  = ARSENAL.length;
  const pct = Math.round((progress.done.length / DYNAMICS.length) * 100);
  document.getElementById('statProgress').textContent = pct+'%';
}

function dynCard(d){
  const m = MODULES.find(x=>x.id===d.moduleId);
  const done = progress.done.includes(d.id);
  return `
    <article class="lesson-card dyn-card" data-dyn="${d.id}">
      <div class="lesson-thumb dyn-thumb" style="background:linear-gradient(135deg,${m?.color || '#333'},#0a0a0c)">
        <span class="dyn-cat-tag">${labelCat(d.category)}</span>
        ${done?'<div class="check">✓</div>':''}
      </div>
      <div class="lesson-meta">
        <span class="mod">${m?.title || ''} • ${d.duration}</span>
        <h3>${d.title}</h3>
        <p class="dyn-desc">${d.objective}</p>
        <div class="dyn-foot">
          <span class="meta-pill small">${d.difficulty}</span>
          <span class="meta-pill small">Nível ${d.level}</span>
        </div>
      </div>
    </article>`;
}

function labelCat(c){
  return { aquecimento:'Aquecimento', improviso:'Improviso', corpo:'Corpo', voz:'Voz', direcao:'Direção' }[c] || c;
}

function renderContinueRow(){
  const row = document.getElementById('continueRow');
  let list = DYNAMICS.filter(l => !progress.done.includes(l.id));
  if(progress.last){
    const l = DYNAMICS.find(x=>x.id===progress.last);
    if(l) list = [l, ...list.filter(x=>x.id!==l.id)];
  }
  list = list.slice(0,6);
  if(list.length===0){
    row.innerHTML = `<div class="glass" style="padding:1.4rem;text-align:center;width:100%">🎉 Você concluiu toda a trilha!</div>`;
    return;
  }
  row.innerHTML = list.map(dynCard).join('');
  bindDynClicks(row);
}

function renderModulesPreview(){
  const wrap = document.getElementById('modulesPreview');
  wrap.innerHTML = MODULES.slice(0,3).map(moduleCard).join('');
  bindModuleClicks(wrap);
}
function renderModules(filter){
  const wrap = document.getElementById('modulesGrid');
  const list = filter==='all' ? MODULES : MODULES.filter(m=>String(m.level)===filter);
  wrap.innerHTML = list.map(moduleCard).join('');
  bindModuleClicks(wrap);
}
function moduleCard(m){
  const dyns = DYNAMICS.filter(l=>l.moduleId===m.id);
  const done = dyns.filter(l=>progress.done.includes(l.id)).length;
  const pct = dyns.length ? Math.round((done/dyns.length)*100) : 0;
  return `
    <article class="module-card" data-module="${m.id}">
      <div class="module-cover" style="background:linear-gradient(135deg,${m.color},#0a0a0c)">
        ${m.title.split(' ')[0]}
      </div>
      <div class="module-body">
        ${m.premium?'<span class="badge-premium">AVANÇADO</span>':''}
        <h3>${m.title}</h3>
        <p>${m.desc}</p>
        <div class="module-progress"><span style="width:${pct}%"></span></div>
        <div class="module-foot">
          <small>${dyns.length} dinâmicas • ${pct}% concluído</small>
          <button class="btn btn-gold" style="padding:.5rem 1rem;font-size:.8rem">Acessar método</button>
        </div>
      </div>
    </article>`;
}
function bindModuleClicks(wrap){
  wrap.querySelectorAll('.module-card').forEach(card=>{
    card.addEventListener('click', ()=>{
      const id = card.dataset.module;
      const first = DYNAMICS.find(l=>l.moduleId===id);
      if(first) openDynamic(first.id);
    });
  });
}
function bindDynClicks(wrap){
  wrap.querySelectorAll('.dyn-card,.lesson-card').forEach(card=>{
    card.addEventListener('click', ()=> openDynamic(card.dataset.dyn));
  });
}

function renderDynamics(filter){
  const wrap = document.getElementById('dynamicsGrid');
  const list = filter==='all' ? DYNAMICS : DYNAMICS.filter(d=>d.category===filter);
  wrap.innerHTML = list.length
    ? list.map(dynCard).join('')
    : `<div class="glass" style="padding:1.4rem;text-align:center;grid-column:1/-1">Nenhuma dinâmica nesta categoria.</div>`;
  bindDynClicks(wrap);
}

function renderArsenal(filter){
  const wrap = document.getElementById('arsenalGrid');
  const list = filter==='all' ? ARSENAL : ARSENAL.filter(p=>p.cat===filter);
  wrap.innerHTML = list.map(p=>`
    <article class="arsenal-card ${p.bonus?'is-bonus':''}">
      <div class="arsenal-cover ${p.bonus?'cover-bonus':''}">
        <span class="arsenal-tag">${p.tag}</span>
        ${p.bonus?'<span class="bonus-ribbon">★ BÔNUS EXCLUSIVO</span>':''}
      </div>
      <div class="arsenal-meta">
        ${p.premium?'<span class="badge-premium">AVANÇADO</span>':''}
        ${p.bonus?'<span class="badge-bonus">CONTEÚDO BÔNUS</span>':''}
        <h3>${p.title}</h3>
        <p>${p.desc}</p>
        <div class="arsenal-actions">
          <button class="btn btn-outline" data-ars-open="${p.id}">Abrir</button>
          <button class="btn btn-gold" data-ars-access="${p.id}">${p.bonus?'Acessar Bônus':'Acessar Material'}</button>
        </div>
      </div>
    </article>`).join('');
  wrap.querySelectorAll('[data-ars-access]').forEach(el=>{
    el.addEventListener('click', ()=>{
      const id = el.dataset.arsAccess;
      if(!progress.pdfs.includes(id)){
        progress.pdfs.push(id);
        saveProgress(progress);
        checkAchievements();
      }
      toast('Material liberado ✓');
    });
  });
  wrap.querySelectorAll('[data-ars-open]').forEach(el=>{
    el.addEventListener('click', ()=> toast('Abrindo material estratégico...'));
  });
}

function renderFavorites(){
  const wrap = document.getElementById('favoritesGrid');
  const favs = DYNAMICS.filter(l=>progress.favs.includes(l.id));
  wrap.innerHTML = favs.length
    ? favs.map(dynCard).join('')
    : `<div class="glass" style="padding:1.4rem;text-align:center">Você ainda não favoritou nenhuma dinâmica.</div>`;
  bindDynClicks(wrap);
}

function renderLevels(){
  [1,2,3].forEach(lvl=>{
    const items = DYNAMICS.filter(l=>l.level===lvl);
    const done = items.filter(l=>progress.done.includes(l.id)).length;
    const pct = items.length ? Math.round((done/items.length)*100) : 0;
    const fill = document.querySelector(`[data-level-fill="${lvl}"]`);
    if(fill) fill.style.width = pct+'%';
    const num = document.querySelector(`[data-level-num="${lvl}"]`);
    if(num) num.textContent = pct+'%';
  });
}

function renderProgressBars(){
  const pct = Math.round((progress.done.length / DYNAMICS.length) * 100);
  document.getElementById('sideProgressFill').style.width = pct+'%';
  document.getElementById('sideProgressNum').textContent = pct;
}

function renderAchievements(){
  const wrap = document.getElementById('achievementsGrid');
  wrap.innerHTML = ACHIEVEMENTS.map(a=>{
    const ok = a.check(progress);
    return `<div class="achievement ${ok?'unlocked':''}">
      <div class="icon">${a.icon}</div>
      <h4>${a.name}</h4>
      <p>${a.desc}</p>
    </div>`;
  }).join('');
}

function renderCertificate(){
  const pct = Math.round((progress.done.length/DYNAMICS.length)*100);
  document.getElementById('certFill').style.width = pct+'%';
  document.getElementById('certStatus').textContent = pct+'% concluído';
  document.getElementById('certBtn').disabled = pct<100;
}

// ===== MODAL DE MÉTODO =====
function openDynamic(id){
  const d = DYNAMICS.find(x=>x.id===id);
  if(!d) return;
  currentDynId = id;
  progress.last = id; saveProgress(progress);

  const m = MODULES.find(x=>x.id===d.moduleId);
  document.getElementById('dynTitle').textContent      = d.title;
  document.getElementById('dynCat').textContent        = `${(m?.title||'')} • ${labelCat(d.category)}`;
  document.getElementById('dynLevel').textContent      = `Nível ${d.level}`;
  document.getElementById('dynDifficulty').textContent = d.difficulty;
  document.getElementById('dynDuration').textContent   = d.duration;
  document.getElementById('dynObjective').textContent  = d.objective;
  document.getElementById('dynNotes').textContent      = d.notes;
  document.getElementById('dynSteps').innerHTML        = `<ol class="method-steps">${d.steps.map(s=>`<li>${s}</li>`).join('')}</ol>`;

  document.getElementById('favBtn').textContent  = progress.favs.includes(id) ? '★ Favoritado' : '☆ Favoritar';
  document.getElementById('doneBtn').textContent = progress.done.includes(id) ? '✓ Concluída' : '✓ Marcar concluída';

  document.getElementById('methodModal').classList.remove('hidden');
  document.body.style.overflow='hidden';
}
function closeMethod(){
  document.getElementById('methodModal').classList.add('hidden');
  document.body.style.overflow='';
}
function navDynamic(dir){
  const idx = DYNAMICS.findIndex(l=>l.id===currentDynId);
  const next = DYNAMICS[idx+dir];
  if(next) openDynamic(next.id);
  else { closeMethod(); toast(dir>0?'Você concluiu toda a trilha!':'Esta é a primeira dinâmica'); }
}
function markDone(silent){
  if(!currentDynId) return;
  if(!progress.done.includes(currentDynId)){
    progress.done.push(currentDynId);
    saveProgress(progress);
    if(!silent) toast('Dinâmica concluída ✓');
    document.getElementById('doneBtn').textContent = '✓ Concluída';
    renderAll();
    checkAchievements();
  }
}
function toggleFav(){
  if(!currentDynId) return;
  const i = progress.favs.indexOf(currentDynId);
  if(i>-1){ progress.favs.splice(i,1); document.getElementById('favBtn').textContent='☆ Favoritar'; toast('Removido dos favoritos'); }
  else    { progress.favs.push(currentDynId); document.getElementById('favBtn').textContent='★ Favoritado'; toast('Adicionado aos favoritos ★'); }
  saveProgress(progress);
  checkAchievements();
}

// ===== BUSCA =====
function filterDynamicsBySearch(q){
  if(!q){ renderDynamics('all'); return; }
  const wrap = document.getElementById('dynamicsGrid');
  const matched = DYNAMICS.filter(l=> l.title.toLowerCase().includes(q) || l.objective.toLowerCase().includes(q));
  switchView('dynamics');
  wrap.innerHTML = matched.length
    ? `<div style="grid-column:1/-1"><h3 style="margin-bottom:1rem;color:var(--muted);font-family:Nunito;font-weight:700">Resultados (${matched.length})</h3></div>`
      + matched.map(dynCard).join('')
    : `<div class="glass" style="padding:1.4rem;text-align:center;grid-column:1/-1">Nenhum resultado para "${q}"</div>`;
  bindDynClicks(wrap);
}

// ===== ACHIEVEMENTS =====
function checkAchievements(){
  ACHIEVEMENTS.forEach(a=>{
    const key = 'dt_ach_'+a.id;
    if(a.check(progress) && !localStorage.getItem(key)){
      localStorage.setItem(key,'1');
      toast(`🏅 Conquista: ${a.name}`);
    }
  });
}

// ===== AI =====
function aiUser(msg){
  const wrap = document.getElementById('aiMessages');
  wrap.insertAdjacentHTML('beforeend', `<div class="ai-msg user">${escapeHtml(msg)}</div>`);
  wrap.scrollTop = wrap.scrollHeight;
}
function aiBot(msg){
  const wrap = document.getElementById('aiMessages');
  wrap.insertAdjacentHTML('beforeend', `<div class="ai-msg bot">${escapeHtml(msg)}</div>`);
  wrap.scrollTop = wrap.scrollHeight;
}
function generateAIResponse(q){
  q = q.toLowerCase();
  if(q.includes('aquecimento')) return 'Sugestão: 5 min de respiração diafragmática → espelho em duplas (8 min) → caminhada em ritmos variados (5 min).';
  if(q.includes('improvis'))    return 'Aplique o método "Sim, e..." em duplas: cada fala aceita a anterior e adiciona algo novo. 10 min é o ideal.';
  if(q.includes('voz') || q.includes('dicção')) return 'Aqueça com sirenes vocais (graves→agudos), trava-línguas em 3 velocidades e leitura projetada para o fundo da sala.';
  if(q.includes('plano') || q.includes('aula')) return 'Estrutura recomendada: Acolhimento (5min) → Aquecimento (15min) → Jogo central (25min) → Cena/aplicação (15min) → Roda final (10min).';
  return 'Posso te ajudar com dinâmicas, métodos de direção, planos de aula, exercícios vocais ou corporais. Pergunte algo mais específico!';
}
function escapeHtml(s){ return s.replace(/[&<>"']/g, c=>({ '&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;' }[c])); }

// ===== TOAST =====
let toastTimer;
function toast(msg){
  const t = document.getElementById('toast');
  t.textContent = msg;
  t.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(()=> t.classList.remove('show'), 2600);
}
