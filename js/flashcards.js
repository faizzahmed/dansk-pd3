/**
 * DANSK PD3 KNOWLEDGE HUB - Interactive Audio Flashcard Engine
 * 55 High-Frequency B2 Connectors, Collocations, Prepositions & Topic Vocab
 */

const STARRED_KEY = 'pd3_hub_starred_flashcards_v1';
let isFlipped = false;
let cardMode = 'da-first'; // 'da-first' or 'en-first'
let currentFilter = 'all';
let currentCardIndex = 0;
let activeCards = [];

const FLASHCARD_DATA = [
  // 1. EKSAMEN ORDTABEL CONNECTORS
  {
    id: 1,
    cat: 'ordtabel',
    catName: 'Eksamen Ordtabel',
    dk: 'Alligevel',
    pos: 'Adverbium (Forbindelsesord)',
    en: 'Nevertheless / Nonetheless / Anyway',
    exDk: 'Det regnede kraftigt, men vi gik alligevel en lang tur i skoven.',
    exEn: 'It rained heavily, but we went for a long walk in the forest anyway.',
    tip: 'Udtrykker en uventet kontrast modsat hvad man forventede. Hvis det står først i sætningen, kræves inversion (V2).'
  },
  {
    id: 2,
    cat: 'ordtabel',
    catName: 'Eksamen Ordtabel',
    dk: 'Dermed',
    pos: 'Adverbium (Konsekvens / Resultat)',
    en: 'Thereby / Thus / Consequently',
    exDk: 'Vi slukker lyset og sparer dermed mange penge på elregningen.',
    exEn: 'We turn off the lights and thereby save a lot of money on the electricity bill.',
    tip: 'Forbinder en handling direkte med dens logiske resultat. Meget brugt i Delprøve 2A/2B til konsekvenskæder.'
  },
  {
    id: 3,
    cat: 'ordtabel',
    catName: 'Eksamen Ordtabel',
    dk: 'Således',
    pos: 'Adverbium (Måde / Konklusion)',
    en: 'In this way / Thus',
    exDk: 'Bland ingredienserne grundigt; således opnår du den rette konsistens.',
    exEn: 'Mix the ingredients thoroughly; in this way you achieve the right consistency.',
    tip: 'Formelt ord. Angiver enten måden hvorpå noget sker, eller opsummerer en pointe (ligesom \'sådan\').'
  },
  {
    id: 4,
    cat: 'ordtabel',
    catName: 'Eksamen Ordtabel',
    dk: 'Især',
    pos: 'Adverbium (Fremhævelse)',
    en: 'Especially / Particularly',
    exDk: 'Mange danskere oplever stress i hverdagen, især de unge studerende.',
    exEn: 'Many Danes experience stress in daily life, especially young students.',
    tip: 'Bruges til at udpege en specifik undergruppe eller et særligt vigtigt eksempel.'
  },
  {
    id: 5,
    cat: 'ordtabel',
    catName: 'Eksamen Ordtabel',
    dk: 'Derfor',
    pos: 'Adverbium (Årsag og virkning)',
    en: 'Therefore / That is why',
    exDk: 'Bussen var aflyst, og derfor tog jeg cyklen på arbejde.',
    exEn: 'The bus was cancelled, and therefore I took the bicycle to work.',
    tip: 'Klassisk årsagskobler. Bemærk: Hvis sætningen starter med \'Derfor\', SKAL verbet komme lige efter: \'Derfor tog jeg...\''
  },
  {
    id: 6,
    cat: 'ordtabel',
    catName: 'Eksamen Ordtabel',
    dk: 'Imidlertid',
    pos: 'Adverbium (Modstilling)',
    en: 'However / Meanwhile',
    exDk: 'Vi havde planlagt et udendørs møde; det begyndte imidlertid at storme.',
    exEn: 'We had planned an outdoor meeting; however, a storm began.',
    tip: 'Højt B2-niveau. Placeres ofte centralt i sætningen efter verbet eller subjektet for elegant tekstsammenhæng.'
  },
  {
    id: 7,
    cat: 'ordtabel',
    catName: 'Eksamen Ordtabel',
    dk: 'Ligeledes',
    pos: 'Adverbium (Sidestilling / Tilføjelse)',
    en: 'Likewise / Similarly / Also',
    exDk: 'Selve kurset er gratis, og undervisningsmaterialerne er ligeledes uden beregning.',
    exEn: 'The course itself is free, and the teaching materials are likewise free of charge.',
    tip: 'Bruges til at tilføje et element med samme værdi eller egenskab. God erstatning for gentagelse af \'også\'.'
  },
  {
    id: 8,
    cat: 'ordtabel',
    catName: 'Eksamen Ordtabel',
    dk: 'Heldigvis',
    pos: 'Adverbium (Positiv vurdering)',
    en: 'Fortunately / Luckily',
    exDk: 'Bilen skred ud i svinget, men heldigvis kom ingen personer til skade.',
    exEn: 'The car skidded on the bend, but fortunately no people were injured.',
    tip: 'Modsat \'desværre\'. Giver en personlig holdning til hændelsen.'
  },
  {
    id: 9,
    cat: 'ordtabel',
    catName: 'Eksamen Ordtabel',
    dk: 'Tværtimod',
    pos: 'Adverbium (Stærk kontrast)',
    en: 'On the contrary / Quite the opposite',
    exDk: 'Jeg er ikke modstander af reformen; tværtimod mener jeg, den er nødvendig.',
    exEn: 'I am not an opponent of the reform; on the contrary, I believe it is necessary.',
    tip: 'Bruges altid efter en forudgående benægtelse (fx \'ikke\', \'aldrig\') for at understrege den modsatte sandhed.'
  },
  {
    id: 10,
    cat: 'ordtabel',
    catName: 'Eksamen Ordtabel',
    dk: 'Som nævnt',
    pos: 'Fast vending (Tilbagevisning)',
    en: 'As mentioned / As stated',
    exDk: 'Som nævnt i indledningen er der to markante årsager til udviklingen.',
    exEn: 'As mentioned in the introduction, there are two distinct causes for the trend.',
    tip: 'Skaber diskursiv sammenhæng mellem dine afsnit i Delprøve 2. Vær opmærksom på inversion bagefter!'
  },
  {
    id: 11,
    cat: 'ordtabel',
    catName: 'Eksamen Ordtabel',
    dk: 'Langt fra',
    pos: 'Fast vending (Gradbøjning)',
    en: 'Far from',
    exDk: 'Situationen på arbejdsmarkedet er langt fra tilfredsstillende.',
    exEn: 'The situation in the labor market is far from satisfactory.',
    tip: 'Forstærker en negativ konstatering eller mangel på opfyldelse af et mål.'
  },
  {
    id: 12,
    cat: 'ordtabel',
    catName: 'Eksamen Ordtabel',
    dk: 'Muligvis',
    pos: 'Adverbium (Forbehold / Nuancering)',
    en: 'Possibly / Perhaps',
    exDk: 'Udviklingen kan muligvis forklares med ændrede forbrugsvaner.',
    exEn: 'The development can possibly be explained by altered consumer habits.',
    tip: 'Nuanceringsmarkør. Viser B2-evne til ikke at generalisere for bombastisk.'
  },
  {
    id: 13,
    cat: 'ordtabel',
    catName: 'Eksamen Ordtabel',
    dk: 'Dernæst',
    pos: 'Adverbium (Rækkefølge)',
    en: 'Next / Subsequently / Secondly',
    exDk: 'Først undersøges problemets omfang, og dernæst vurderes de mulige tiltag.',
    exEn: 'First the extent of the problem is examined, and next the possible measures are evaluated.',
    tip: 'Perfekt til strukturering af Punkt 2 og Punkt 3 i Delprøve 2.'
  },
  {
    id: 14,
    cat: 'ordtabel',
    catName: 'Eksamen Ordtabel',
    dk: 'Derimod',
    pos: 'Adverbium (Modstilling)',
    en: 'On the other hand / By contrast',
    exDk: 'Mændene arbejder ofte over; kvinderne tager derimod mere ansvar i hjemmet.',
    exEn: 'Men often work overtime; women, by contrast, assume more responsibility in the home.',
    tip: 'Viser forskel mellem to grupper eller fænomener (især i grafbeskrivelse).'
  },
  {
    id: 15,
    cat: 'ordtabel',
    catName: 'Eksamen Ordtabel',
    dk: 'Desuden',
    pos: 'Adverbium (Tilføjelse)',
    en: 'Furthermore / Moreover / In addition',
    exDk: 'Han taler flydende dansk, og han har desuden fem års erhvervserfaring.',
    exEn: 'He speaks fluent Danish, and he furthermore has five years of work experience.',
    tip: 'Tilføjer et ekstra argument eller information. Hvis \'Desuden\' starter sætningen, følger verbet direkte: \'Desuden har han...\''
  },
  {
    id: 16,
    cat: 'ordtabel',
    catName: 'Eksamen Ordtabel',
    dk: 'Nemlig',
    pos: 'Adverbium (Præcisering / Forklaring)',
    en: 'You see / Namely / Because',
    exDk: 'Jeg kan ikke møde op i morgen; jeg skal nemlig til lægen.',
    exEn: 'I cannot show up tomorrow; you see, I am going to the doctor.',
    tip: 'Giver den underliggende begrundelse for den foregående sætning. Står ofte som centraladverbium efter verbet.'
  },
  {
    id: 17,
    cat: 'ordtabel',
    catName: 'Eksamen Ordtabel',
    dk: 'Til gengæld',
    pos: 'Fast vending (Kompensation / Modvægt)',
    en: 'On the other hand / In return (as a trade-off)',
    exDk: 'Lejligheden er temmelig lille; til gengæld er huslejen meget billig.',
    exEn: 'The apartment is quite small; on the other hand, the rent is very cheap.',
    tip: 'Bruges til at opveje en ulempe med en fordel (eller omvendt).'
  },
  {
    id: 18,
    cat: 'ordtabel',
    catName: 'Eksamen Ordtabel',
    dk: 'Ikke desto mindre',
    pos: 'Fast vending (B2 Konnektor)',
    en: 'Nevertheless / Nonetheless',
    exDk: 'Opgaven er yderst vanskelig; ikke desto mindre må vi finde en løsning nu.',
    exEn: 'The task is extremely difficult; nonetheless, we must find a solution now.',
    tip: 'Stærk B2-forbindelsesmarkør, der imponerer censor i Punkt 3 diskussionen.'
  },

  // 2. FASTE FORHOLDSORD & KOLLOKATIONER (PREPOSITIONS)
  {
    id: 19,
    cat: 'prep',
    catName: 'Faste Forholdsord',
    dk: 'Årsag til',
    pos: 'Substantiv + Præposition',
    en: 'Cause of / Reason for',
    exDk: 'Hvad er den væsentligste årsag til unges mistrivsel?',
    exEn: 'What is the most significant cause of youth distress?',
    tip: 'Husk altid forholdsordet \'til\' efter årsag (aldrig \'af\' eller \'for\').'
  },
  {
    id: 20,
    cat: 'prep',
    catName: 'Faste Forholdsord',
    dk: 'Konsekvens af',
    pos: 'Substantiv + Præposition',
    en: 'Consequence of',
    exDk: 'Manglende søvn kan være en alvorlig konsekvens af stress.',
    exEn: 'Lack of sleep can be a serious consequence of stress.',
    tip: 'Husk præpositionen \'af\' ved konsekvens (modsat \'årsag til\').'
  },
  {
    id: 21,
    cat: 'prep',
    catName: 'Faste Forholdsord',
    dk: 'Gevinst ved',
    pos: 'Substantiv + Præposition',
    en: 'Benefit / Advantage of / Gain by',
    exDk: 'En stor gevinst ved motion er et styrket immunforsvar og øget energi.',
    exEn: 'A major benefit of exercise is a strengthened immune system and increased energy.',
    tip: 'Bruges ofte ved evaluering af samfundsmæssige fordele i Punkt 3.'
  },
  {
    id: 22,
    cat: 'prep',
    catName: 'Faste Forholdsord',
    dk: 'Forhindring for',
    pos: 'Substantiv + Præposition',
    en: 'Obstacle to / Barrier for',
    exDk: 'Mangel på børnepasning kan være en reel forhindring for kvinders karriere.',
    exEn: 'Lack of childcare can be a real obstacle to women\'s careers.',
    tip: 'Husk præpositionen \'for\'. Bruges ved analyse af barrierer og udfordringer.'
  },
  {
    id: 23,
    cat: 'prep',
    catName: 'Faste Forholdsord',
    dk: 'Holdning til',
    pos: 'Substantiv + Præposition',
    en: 'Attitude towards / Opinion of',
    exDk: 'Hvad er din personlige holdning til forslaget om kortere arbejdstid?',
    exEn: 'What is your personal attitude towards the proposal for shorter working hours?',
    tip: 'Spørges der om din holdning, bruger du denne kollokation i indledningen.'
  },
  {
    id: 24,
    cat: 'prep',
    catName: 'Faste Forholdsord',
    dk: 'Grunde til',
    pos: 'Substantiv + Præposition',
    en: 'Reasons for',
    exDk: 'Der kan være mange forskellige grunde til, at folk skifter profession.',
    exEn: 'There can be many different reasons why people change professions.',
    tip: 'Efterfulgt af \'til\' eller \'til, at\' foran en ledsætning.'
  },
  {
    id: 25,
    cat: 'prep',
    catName: 'Faste Forholdsord',
    dk: 'Forklaring på',
    pos: 'Substantiv + Præposition',
    en: 'Explanation for',
    exDk: 'Forskerne leder efter en holdbar forklaring på den pludselige stigning.',
    exEn: 'The researchers are searching for a solid explanation for the sudden increase.',
    tip: 'Altid præpositionen \'på\' efter forklaring (ikke \'af\' eller \'til\').'
  },
  {
    id: 26,
    cat: 'prep',
    catName: 'Faste Forholdsord',
    dk: 'Planer for',
    pos: 'Substantiv + Præposition',
    en: 'Plans for',
    exDk: 'Regeringen har præsenteret ambitiøse planer for den grønne omstilling.',
    exEn: 'The government has presented ambitious plans for the green transition.',
    tip: 'Styrer præpositionen \'for\'.'
  },
  {
    id: 27,
    cat: 'prep',
    catName: 'Faste Forholdsord',
    dk: 'Råd til',
    pos: 'Verbum / Substantiv + Præposition',
    en: 'Money / Resources to afford',
    exDk: 'Mange enlige forsørgere har desværre ikke råd til en sommerferie.',
    exEn: 'Many single providers unfortunately do not have the money to afford a summer holiday.',
    tip: 'At \'have råd til\' betyder at have økonomisk kapacitet til noget.'
  },
  {
    id: 28,
    cat: 'prep',
    catName: 'Faste Forholdsord',
    dk: 'Tid til',
    pos: 'Substantiv + Præposition',
    en: 'Time for / Time to',
    exDk: 'I en travl hverdag er det afgørende at have tid til familien.',
    exEn: 'In a busy daily life, it is crucial to have time for the family.',
    tip: 'Klassisk eksamensudtryk i temaer om trivsel, stress og work-life balance.'
  },
  {
    id: 29,
    cat: 'prep',
    catName: 'Faste Forholdsord',
    dk: 'Problemer med',
    pos: 'Substantiv + Præposition',
    en: 'Problems with',
    exDk: 'Flere virksomheder oplever store problemer med at rekruttere faglært arbejdskraft.',
    exEn: 'Several companies experience major problems with recruiting skilled labor.',
    tip: 'Altid præpositionen \'med\' foran problemets kilde.'
  },
  {
    id: 30,
    cat: 'prep',
    catName: 'Faste Forholdsord',
    dk: 'Ønske om',
    pos: 'Substantiv + Præposition',
    en: 'Desire / Wish for',
    exDk: 'Borgerne udtrykker et stærkt ønske om mere indflydelse på lokalsamfundet.',
    exEn: 'Citizens express a strong desire for more influence on the local community.',
    tip: 'Styrer præpositionen \'om\'.'
  },
  {
    id: 31,
    cat: 'prep',
    catName: 'Faste Forholdsord',
    dk: 'Garanti for',
    pos: 'Substantiv + Præposition',
    en: 'Guarantee of',
    exDk: 'En høj uddannelse er desværre ingen garanti for at få et job med det samme.',
    exEn: 'A higher education is unfortunately no guarantee of getting a job immediately.',
    tip: 'Styrer præpositionen \'for\'.'
  },
  {
    id: 32,
    cat: 'prep',
    catName: 'Faste Forholdsord',
    dk: 'Betingelse for',
    pos: 'Substantiv + Præposition',
    en: 'Condition / Prerequisite for',
    exDk: 'Et godt helbred er en væsentlig betingelse for en høj livskvalitet.',
    exEn: 'Good health is an essential condition for a high quality of life.',
    tip: 'Betyder det samme som \'forudsætning for\'.'
  },
  {
    id: 33,
    cat: 'prep',
    catName: 'Faste Forholdsord',
    dk: 'Er afhængig af',
    pos: 'Adjektiv + Præposition',
    en: 'Is dependent on',
    exDk: 'Dansk erhvervsliv er i høj grad afhængigt af udenlandsk arbejdskraft.',
    exEn: 'Danish business is to a great extent dependent on foreign labor.',
    tip: 'Husk t-endelse på intetkøn: \'Erhvervslivet er afhængigt af...\''
  },
  {
    id: 34,
    cat: 'prep',
    catName: 'Faste Forholdsord',
    dk: 'Tage ansvar for',
    pos: 'Fast verbalt udtryk',
    en: 'To take responsibility for',
    exDk: 'Både forældre og skoler bør tage et fælles ansvar for børnenes trivsel.',
    exEn: 'Both parents and schools ought to take shared responsibility for children\'s well-being.',
    tip: 'Højt værdsat B2-frase til samfundsmæssige løsningsforslag i Punkt 3.'
  },

  // 3. B2 ARGUMENTATION & DISKUSSION
  {
    id: 35,
    cat: 'arg',
    catName: 'B2 Argumentation',
    dk: 'På den ene side... på den anden side...',
    pos: 'Balancemarkør',
    en: 'On the one hand... on the other hand...',
    exDk: 'På den ene side sparer man tid; på den anden side mister man det sociale fællesskab.',
    exEn: 'On the one hand you save time; on the other hand you lose the social community.',
    tip: 'Den vigtigste argumentationsteknik i Delprøve 2 Punkt 3. Vær opmærksom på V2-inversion i begge led!'
  },
  {
    id: 36,
    cat: 'arg',
    catName: 'B2 Argumentation',
    dk: 'Efter min mening...',
    pos: 'Holdningsmarkør',
    en: 'In my opinion...',
    exDk: 'Efter min mening bør politikerne prioritere den grønne omstilling højere.',
    exEn: 'In my opinion, politicians ought to prioritize the green transition higher.',
    tip: 'Erstatter fladt talesprog som \'jeg synes\'. Husk inversion: verbet \'bør\' følger direkte efter!'
  },
  {
    id: 37,
    cat: 'arg',
    catName: 'B2 Argumentation',
    dk: 'Dette vil medføre, at...',
    pos: 'Konsekvensformel',
    en: 'This will result in / entail that...',
    exDk: 'Dette vil medføre, at flere unge får mulighed for at gennemføre en uddannelse.',
    exEn: 'This will entail that more young people get the opportunity to complete an education.',
    tip: 'B2-kædeforbinder. \'at\' indleder en ledsætning (S-C-V-O ordstilling).'
  },
  {
    id: 38,
    cat: 'arg',
    catName: 'B2 Argumentation',
    dk: 'Det skyldes primært, at...',
    pos: 'Årsagsformel',
    en: 'This is primarily due to the fact that...',
    exDk: 'Stigningen skyldes primært, at det er blevet lettere at arbejde hjemmefra.',
    exEn: 'The increase is primarily due to the fact that it has become easier to work from home.',
    tip: 'Passivform af \'skylde\'. Fremragende til Punkt 2 i Delprøve 2A (grafanalyse).'
  },
  {
    id: 39,
    cat: 'arg',
    catName: 'B2 Argumentation',
    dk: 'Hvad angår [emne], så...',
    pos: 'Fokusmarkør / Pivot',
    en: 'As far as [topic] is concerned, ...',
    exDk: 'Hvad angår de økonomiske konsekvenser, så er eksperterne uenige.',
    exEn: 'As far as the economic consequences are concerned, experts disagree.',
    tip: 'Perfekt til at skifte emne eller besvare et specifikt underspørgsmål i Delprøve 1 eller 2.'
  },
  {
    id: 40,
    cat: 'arg',
    catName: 'B2 Argumentation',
    dk: 'Set ud fra et samfundsmæssigt perspektiv...',
    pos: 'Perspektiveringsmarkør',
    en: 'Seen from a societal perspective...',
    exDk: 'Set ud fra et samfundsmæssigt perspektiv er forebyggelse billigere end behandling.',
    exEn: 'Seen from a societal perspective, prevention is cheaper than treatment.',
    tip: 'Opfylder SIRIs krav om at løfte Punkt 3 fra et privat niveau op på et generelt samfundsniveau.'
  },
  {
    id: 41,
    cat: 'arg',
    catName: 'B2 Argumentation',
    dk: 'Man prøver med andre ord at...',
    pos: 'Præcisering',
    en: 'In other words, one is attempting to...',
    exDk: 'Man prøver med andre ord at løse et strukturelt problem med midlertidige lappeløsninger.',
    exEn: 'In other words, one is attempting to solve a structural problem with temporary quick fixes.',
    tip: 'Viser høj metasproglig refleksion i diskussionsdelen.'
  },
  {
    id: 42,
    cat: 'arg',
    catName: 'B2 Argumentation',
    dk: 'Det, mener jeg, er rigtigt / forkert.',
    pos: 'Indskudt vurdering',
    en: 'This, in my view, is right / wrong.',
    exDk: 'Nogle mener, at kvoter er nødvendige. Det, mener jeg, er helt rigtigt.',
    exEn: 'Some believe quotas are necessary. This, in my view, is entirely correct.',
    tip: 'Bemærk de to kommaer og den faste V2-ordstilling. Meget modent B2-dansk.'
  },
  {
    id: 43,
    cat: 'arg',
    catName: 'B2 Argumentation',
    dk: 'Afslutningsvist vil jeg pointere, at...',
    pos: 'Konklusionsmarkør',
    en: 'In conclusion, I would like to point out that...',
    exDk: 'Afslutningsvist vil jeg pointere, at dialog mellem parterne er vejen frem.',
    exEn: 'In conclusion, I would like to point out that dialogue between parties is the way forward.',
    tip: 'Undgå den overbrugte kliché \'Alt i alt\'. Brug denne elegante afslutningsformel i stedet.'
  },

  // 4. TEMA 1: ARBEJDE & KARRIERE
  {
    id: 44,
    cat: 'arbejde',
    catName: 'Tema: Arbejde',
    dk: 'Arbejdsvilkår',
    pos: 'Substantiv (Intetkøn pluralis)',
    en: 'Working conditions / Terms of employment',
    exDk: 'Gode arbejdsvilkår og en rimelig arbejdsbyrde mindsker risikoen for udbrændthed.',
    exEn: 'Good working conditions and a reasonable workload reduce the risk of burnout.',
    tip: 'Sammensat ord (arbejde + vilkår). Skrives altid i ét ord uden mellemrum.'
  },
  {
    id: 45,
    cat: 'arbejde',
    catName: 'Tema: Arbejde',
    dk: 'Fagforening',
    pos: 'Substantiv (Fælleskøn)',
    en: 'Trade union / Labor union',
    exDk: 'Den danske model bygger på, at fagforeninger og arbejdsgivere forhandler løn.',
    exEn: 'The Danish model is based on trade unions and employers negotiating wages.',
    tip: 'Kernebegreb i det danske samfund og på arbejdsmarkedet.'
  },
  {
    id: 46,
    cat: 'arbejde',
    catName: 'Tema: Arbejde',
    dk: 'Sygefravær',
    pos: 'Substantiv (Intetkøn)',
    en: 'Sick leave / Absenteeism',
    exDk: 'Et dårligt psykisk arbejdsmiljø medfører ofte et markant højere sygefravær.',
    exEn: 'A poor psychosocial work environment often entails significantly higher sick leave.',
    tip: 'Kombineres ofte med verber som \'at nedbringe sygefraværet\'.'
  },
  {
    id: 47,
    cat: 'arbejde',
    catName: 'Tema: Arbejde',
    dk: 'Efteruddannelse',
    pos: 'Substantiv (Fælleskøn)',
    en: 'Continuing education / Supplementary training',
    exDk: 'Løbende efteruddannelse er nødvendig for at bevare sine kompetencer på arbejdsmarkedet.',
    exEn: 'Continuous supplementary training is necessary to maintain one\'s skills in the labor market.',
    tip: 'Ofte brugt som løsningsforslag i opgaver om arbejdsløshed og omstilling.'
  },
  {
    id: 48,
    cat: 'arbejde',
    catName: 'Tema: Arbejde',
    dk: 'Udenlandsk arbejdskraft',
    pos: 'Fast substantivforbindelse',
    en: 'Foreign labor / International workforce',
    exDk: 'Mange sektorer i Danmark er i dag dybt afhængige af udenlandsk arbejdskraft.',
    exEn: 'Many sectors in Denmark are today deeply dependent on foreign labor.',
    tip: 'Et af de mest hyppige emner i PD3 opgave 2A og 2B.'
  },
  {
    id: 49,
    cat: 'arbejde',
    catName: 'Tema: Arbejde',
    dk: 'Barselsorlov',
    pos: 'Substantiv (Fælleskøn)',
    en: 'Parental leave / Maternity & paternity leave',
    exDk: 'Den nye lovgivning sikrer, at mænd tager en større øremærket del af barselsorloven.',
    exEn: 'The new legislation ensures that men take a larger earmarked share of parental leave.',
    tip: 'Vigtigt emne i debatter om ligestilling og karriere.'
  },

  // 5. TEMA 2: MILJØ, KLIMA & SUNDHED
  {
    id: 50,
    cat: 'miljo',
    catName: 'Tema: Miljø & Sundhed',
    dk: 'Grøn omstilling',
    pos: 'Fast substantivforbindelse',
    en: 'Green transition / Sustainable shift',
    exDk: 'Den grønne omstilling kræver massive investeringer i vindmøller og solceller.',
    exEn: 'The green transition requires massive investments in wind turbines and solar panels.',
    tip: 'Danmarks officielle politiske mål; et absolut must-know begreb til PD3.'
  },
  {
    id: 51,
    cat: 'miljo',
    catName: 'Tema: Miljø & Sundhed',
    dk: 'Bæredygtighed',
    pos: 'Substantiv (Fælleskøn)',
    en: 'Sustainability',
    exDk: 'Forbrugerne efterspørger i stigende grad produkter med fokus på bæredygtighed.',
    exEn: 'Consumers increasingly demand products with a focus on sustainability.',
    tip: 'Adjektivet er \'bæredygtig\' (bæredygtigt, bæredygtige).'
  },
  {
    id: 52,
    cat: 'miljo',
    catName: 'Tema: Miljø & Sundhed',
    dk: 'CO2-udledning',
    pos: 'Substantiv (Fælleskøn)',
    en: 'CO2 emission(s)',
    exDk: 'Det er et fælles samfundsansvar at nedbringe den samlede CO2-udledning.',
    exEn: 'It is a collective social responsibility to reduce total CO2 emissions.',
    tip: 'Kollokation: \'at nedbringe / reducere CO2-udledningen\'.'
  },
  {
    id: 53,
    cat: 'miljo',
    catName: 'Tema: Miljø & Sundhed',
    dk: 'Affaldssortering',
    pos: 'Substantiv (Fælleskøn)',
    en: 'Waste sorting / Garbage separation',
    exDk: 'Effektiv affaldssortering gør det muligt at genanvende plast og metal.',
    exEn: 'Effective waste sorting makes it possible to recycle plastic and metal.',
    tip: 'Sammensat ord. Skrives ud i ét ord.'
  },
  {
    id: 54,
    cat: 'miljo',
    catName: 'Tema: Miljø & Sundhed',
    dk: 'Trivsel',
    pos: 'Substantiv (Fælleskøn)',
    en: 'Well-being / Thriving / Welfare',
    exDk: 'Elevernes mentale trivsel i folkeskolen bør altid have højeste prioritet.',
    exEn: 'Pupils\' mental well-being in the public school ought always to have top priority.',
    tip: 'Verbet er \'at trives\' (han trives godt = he is thriving).'
  },
  {
    id: 55,
    cat: 'miljo',
    catName: 'Tema: Miljø & Sundhed',
    dk: 'Livskvalitet',
    pos: 'Substantiv (Fælleskøn)',
    en: 'Quality of life',
    exDk: 'Rent drikkevand og grønne naturområder bidrager markant til borgernes livskvalitet.',
    exEn: 'Clean drinking water and green nature areas contribute markedly to citizens\' quality of life.',
    tip: 'Hyppigt slutargument i essays om sundhed, natur og work-life balance.'
  }
];

function getStarredIds() {
  const saved = localStorage.getItem(STARRED_KEY);
  return saved ? JSON.parse(saved) : [];
}

function saveStarredIds(ids) {
  localStorage.setItem(STARRED_KEY, JSON.stringify(ids));
  updateStarredCount();
}

function updateStarredCount() {
  const count = getStarredIds().length;
  const btn = document.getElementById('starredFilterBtn');
  if (btn) btn.textContent = `⭐ Gemte Kort (${count})`;
}

function initFlashcards() {
  activeCards = [...FLASHCARD_DATA];
  currentCardIndex = 0;
  isFlipped = false;
  renderCurrentCard();
  updateStarredCount();
}

function filterCards(category, btnElement) {
  currentFilter = category;
  isFlipped = false;
  currentCardIndex = 0;

  document.querySelectorAll('.fc-filter-btn').forEach(b => b.classList.remove('active'));
  if (btnElement) btnElement.classList.add('active');

  if (category === 'all') {
    activeCards = [...FLASHCARD_DATA];
  } else if (category === 'starred') {
    const starred = getStarredIds();
    activeCards = FLASHCARD_DATA.filter(c => starred.includes(c.id));
    if (activeCards.length === 0) {
      alert('Du har ingen gemte kort endnu! Klik på stjernen (☆) på et kort for at gemme det her.');
      filterCards('all', document.querySelector('.fc-filter-btn'));
      return;
    }
  } else {
    activeCards = FLASHCARD_DATA.filter(c => c.cat === category);
  }

  renderCurrentCard();
}

function flipCurrentCard() {
  const inner = document.getElementById('flashcardInner');
  if (!inner) return;
  isFlipped = !isFlipped;
  if (isFlipped) {
    inner.classList.add('flipped');
  } else {
    inner.classList.remove('flipped');
  }
}

function nextCard() {
  if (activeCards.length === 0) return;
  currentCardIndex = (currentCardIndex + 1) % activeCards.length;
  resetCardFlip();
  renderCurrentCard();
}

function prevCard() {
  if (activeCards.length === 0) return;
  currentCardIndex = (currentCardIndex - 1 + activeCards.length) % activeCards.length;
  resetCardFlip();
  renderCurrentCard();
}

function resetCardFlip() {
  isFlipped = false;
  const inner = document.getElementById('flashcardInner');
  if (inner) inner.classList.remove('flipped');
}

function shuffleCards() {
  for (let i = activeCards.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [activeCards[i], activeCards[j]] = [activeCards[j], activeCards[i]];
  }
  currentCardIndex = 0;
  resetCardFlip();
  renderCurrentCard();
}

function toggleCardMode() {
  cardMode = cardMode === 'da-first' ? 'en-first' : 'da-first';
  const btn = document.getElementById('cardModeBtn');
  if (btn) {
    btn.textContent = cardMode === 'da-first' ? '🔄 Vis: Dansk ➔ Engelsk' : '🔄 Vis: Engelsk ➔ Dansk';
  }
  resetCardFlip();
  renderCurrentCard();
}

function toggleStarCurrent(e) {
  if (e) e.stopPropagation();
  if (activeCards.length === 0) return;
  const current = activeCards[currentCardIndex];
  let starred = getStarredIds();

  if (starred.includes(current.id)) {
    starred = starred.filter(id => id !== current.id);
  } else {
    starred.push(current.id);
  }
  saveStarredIds(starred);
  updateStarIcons(current.id);

  if (currentFilter === 'starred') {
    activeCards = FLASHCARD_DATA.filter(c => starred.includes(c.id));
    if (activeCards.length === 0) {
      filterCards('all', document.querySelector('.fc-filter-btn'));
      return;
    }
    if (currentCardIndex >= activeCards.length) {
      currentCardIndex = 0;
    }
    renderCurrentCard();
  }
}

function updateStarIcons(id) {
  const isStarred = getStarredIds().includes(id);
  const starChar = isStarred ? '★' : '☆';
  const color = isStarred ? '#dfa008' : '#595f69';
  
  const s1 = document.getElementById('fcStarBtn');
  const s2 = document.getElementById('fcBackStarBtn');
  const s3 = document.getElementById('fcStarBtnBottom');

  if (s1) { s1.textContent = starChar; s1.style.color = color; }
  if (s2) { s2.textContent = starChar; s2.style.color = color; }
  if (s3) {
    s3.innerHTML = isStarred ? '★ Gemt som svær' : '⭐ Gem som svær';
    s3.style.background = isStarred ? '#faecb8' : '#f4f2ea';
  }
}

function speakCurrentWord(e) {
  if (e) e.stopPropagation();
  if (activeCards.length === 0) return;
  const card = activeCards[currentCardIndex];
  if ('speechSynthesis' in window) {
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(card.dk);
    utterance.lang = 'da-DK';
    utterance.rate = 0.9;
    window.speechSynthesis.speak(utterance);
  }
}

function renderCurrentCard() {
  if (activeCards.length === 0) return;
  const card = activeCards[currentCardIndex];
  const total = activeCards.length;
  const num = currentCardIndex + 1;

  const counterEl = document.getElementById('cardCounterText');
  if (counterEl) counterEl.textContent = `Kort ${num} af ${total}`;

  const fillEl = document.getElementById('cardProgressFill');
  if (fillEl) fillEl.style.width = `${Math.round((num / total) * 100)}%`;

  const frontCat = document.getElementById('fcFrontCat');
  const frontWord = document.getElementById('fcFrontWord');
  const frontPos = document.getElementById('fcFrontPos');

  const backCat = document.getElementById('fcBackCat');
  const backWord = document.getElementById('fcBackWord');
  const backExDk = document.getElementById('fcBackExDk');
  const backExEn = document.getElementById('fcBackExEn');
  const backTip = document.getElementById('fcBackTip');

  if (cardMode === 'da-first') {
    if (frontCat) frontCat.textContent = card.catName;
    if (frontWord) frontWord.textContent = card.dk;
    if (frontPos) frontPos.textContent = card.pos;

    if (backCat) backCat.textContent = 'Engelsk Betydning';
    if (backWord) backWord.textContent = card.en;
    if (backExDk) backExDk.textContent = `"${card.exDk}"`;
    if (backExEn) backExEn.textContent = `"${card.exEn}"`;
    if (backTip) backTip.innerHTML = `💡 <strong>Eksamentip:</strong> ${card.tip}`;
  } else {
    if (frontCat) frontCat.textContent = 'Engelsk Hint';
    if (frontWord) frontWord.textContent = card.en;
    if (frontPos) frontPos.textContent = `Kategori: ${card.catName}`;

    if (backCat) backCat.textContent = 'Dansk Udtryk';
    if (backWord) backWord.textContent = card.dk;
    if (backExDk) backExDk.textContent = `"${card.exDk}"`;
    if (backExEn) backExEn.textContent = `"${card.exEn}"`;
    if (backTip) backTip.innerHTML = `💡 <strong>Eksamentip (${card.pos}):</strong> ${card.tip}`;
  }

  updateStarIcons(card.id);
}

// Keyboard shortcuts for Flashcard manipulation
window.addEventListener('keydown', (e) => {
  if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;

  if (e.code === 'Space') {
    e.preventDefault();
    flipCurrentCard();
  } else if (e.code === 'ArrowRight') {
    e.preventDefault();
    nextCard();
  } else if (e.code === 'ArrowLeft') {
    e.preventDefault();
    prevCard();
  } else if (e.code === 'KeyS') {
    e.preventDefault();
    toggleStarCurrent();
  }
});
