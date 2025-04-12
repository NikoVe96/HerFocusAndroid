const data = {
  'Struktur og planlægning': {
    1: [
      {
        question:
          'Du er 5 min forsinket til din aftale og reagerer med: “Åh, jeg er sent på den, igen! Hvorfor kan jeg aldrig møde op til tiden?!”',
        options: [
          'Ignorering af det gode',
          'Alt eller intet',
          'Følelses ræsonnement',
        ],
        correct_option: 'Ignorering af det gode',
      },
      {
        question:
          'Du har glemt at tage skraldet ud, efter at have lovet din partner at du ville gøre det. Du reagerer med: “Jeg er heller ikke til at stole på! Jeg kan aldrig gøre noget rigtigt”',
        options: [
          'Tankelæsning',
          'Gøre ting større end de er',
          'Spår fremtiden',
        ],
        correct_option: 'Gøre ting større end de er',
      },
      {
        question:
          'Du får en opgave af din kollega og reagerer med: “Jeg vil aldrig kunne klare denne opgave. Jeg ved ikke hvor jeg skal starte og jeg vil sikkert alligevel fejle, så hvorfor skulle jeg overhovedet prøve?”',
        options: [
          'Spår fremtiden',
          'Gøre ting større end de er',
          'Alt eller intet',
        ],
        correct_option: 'Spår fremtiden',
      },
    ],
    2: [
      {
        question:
          'Hvilken metode anbefales for at håndtere ineffektive prioriteringer ved ADHD?',
        options: [
          'Ignorere mindre vigtige opgaver',
          'Prioritere opgaver baseret på deadlines',
          'Udskyde alle opgaver til sidste øjeblik',
        ],
        correct_option: 'Prioritere opgaver baseret på deadlines',
      },
      {
        question: 'Hvilket mindset anbefales for at overvinde perfektionisme?',
        options: [
          'Isolation mindset, hvor man arbejder alene og uafhængigt',
          'Fixed mindset, hvor man antager, at evner er statiske',
          'Growth mindset, hvor man fokuserer på udvikling gennem udfordringer',
        ],
        correct_option:
          'Growth mindset, hvor man fokuserer på udvikling gennem udfordringer',
      },
    ],
    3: [
      {
        question: 'Hvad er formålet med at oprette rutiner?',
        options: [
          'At forbedre dine sociale færdigheder',
          'At reducere stress og øge kontrollen',
          'At udvikle nye hobbyer',
        ],
        correct_option: 'At reducere stress og øge kontrollen',
      },
      {
        question: 'Hvad skal man gøre, når en opgave er fuldført?',
        options: [
          'Give dig selv ros for at have fuldført opgaven',
          'Ignorere det og fortsætte til næste opgave',
          'Blive irriteret, hvis man ikke nåede opgaven til tiden',
        ],
        correct_option: 'Give dig selv ros for at have fuldført opgaven',
      },
      {
        question: 'Hvilket værktøj anbefales til at optimere tidsstyring?',
        options: [
          'Noter på papir',
          'Sociale medier',
          'Tidsstyringsapps og kalendere',
        ],
        correct_option: 'Tidsstyringsapps og kalendere',
      },
    ],
    4: [
      {
        question:
          'Hvad er formålet med at give dig selv en score ved ugens ende?',
        options: [
          'At vurdere din præstation og forbedre fremtidige opnåelser af mål',
          'At sammenligne dig med andre',
          'At dokumentere hver enkelt detalje om dine daglige aktiviteter',
        ],
        correct_option:
          'At vurdere din præstation og forbedre fremtidige opnåelser af mål',
      },
      {
        question:
          'Hvordan kan du handle, hvis dine mål ikke blev nået i løbet af ugen?',
        options: [
          'Stoppe med at sætte mål og bare prøve mig frem',
          'Ignorere problemet og forsøge de samme mål igen',
          'Revurdere og justere målene efter behov',
        ],
        correct_option: 'Revurdere og justere målene efter behov',
      },
    ],
  },

  'Generel AD(H)D': {

    // Modul 1: Forståelse af ADHD-hjernen
    1: [
      {
        question: "Hvad er et centralt fokus i modulet 'Forståelse af ADHD-hjernen'?",
        options: [
          "Undersøgelse af hjernestruktur og funktion",
          "At lære matematik",
          "At opnå bedre sociale færdigheder",
        ],
        correct_option: "Undersøgelse af hjernestruktur og funktion",
      },
      {
        question: "Hvilket område i hjernen nævnes som vigtigt for planlægning og impulsregulering?",
        options: [
          "Præfrontal cortex",
          "Occipitallappen",
          "Hjernestammen",
        ],
        correct_option: "Præfrontal cortex",
      },
      {
        question: "Hvad er formålet med at reflektere over egne erfaringer med fokus og impulsivitet?",
        options: [
          "At forstå, hvordan dine adfærdsmønstre relaterer sig til hjernefunktion",
          "At kunne sammenligne med andre",
          "At ignorere dine symptomer",
        ],
        correct_option: "At forstå, hvordan dine adfærdsmønstre relaterer sig til hjernefunktion",
      },
    ],

    // Modul 2: Daglige Strategier og Copingværktøjer
    2: [
      {
        question: "Hvilken metode nævnes i modulet for at reducere distraktioner?",
        options: [
          "Implementering af mindfulness-øvelser",
          "At undgå al teknologi",
          "At ignorere stress",
        ],
        correct_option: "Implementering af mindfulness-øvelser",
      },
      {
        question: "Hvilket værktøj anbefales til at strukturere din dag?",
        options: [
          "Digitale kalenderløsninger",
          "At læse avisen",
          "At se tv-serier",
        ],
        correct_option: "Digitale kalenderløsninger",
      },
      {
        question: "Hvad er en vigtig del af at evaluere din daglige rutine?",
        options: [
          "At sætte målbare delmål",
          "At ignorere mindre opgaver",
          "At udsætte evalueringen",
        ],
        correct_option: "At sætte målbare delmål",
      },
    ],

    // Modul 3: Opbygning af Rutiner og Forbedring af Eksekutive Funktioner
    3: [
      {
        question: "Hvad er hovedformålet med at etablere faste rutiner ifølge modulet?",
        options: [
          "At reducere mental belastning og øge produktiviteten",
          "At gøre hverdagen mere uforudsigelig",
          "At undgå sociale aktiviteter",
        ],
        correct_option: "At reducere mental belastning og øge produktiviteten",
      },
      {
        question: "Hvilken teknik nævnes, der hjælper med at strukturere opgaver?",
        options: [
          "Fleksible tidsblokke",
          "At vente til sidste øjeblik",
          "At udføre opgaver tilfældigt",
        ],
        correct_option: "Fleksible tidsblokke",
      },
      {
        question: "Hvorfor er regelmæssig evaluering af dine rutiner vigtig?",
        options: [
          "For at kunne tilpasse og optimere din daglige struktur",
          "For at registrere dine fejl",
          "For at undgå at ændre noget",
        ],
        correct_option: "For at kunne tilpasse og optimere din daglige struktur",
      },
    ],
  },

  'AD(H)D og relationer': {

    // Modul 1: Kommunikation og ADHD – Udtryk Dig Effektivt
    1: [
      {
        question: "Hvad får du primært lært i modulet 'Kommunikation og ADHD – Udtryk Dig Effektivt'?",
        options: [
          "At udtrykke dine tanker klart og lytte aktivt",
          "At skrive akademiske opgaver",
          "At bruge humor til at dække over misforståelser",
        ],
        correct_option: "At udtrykke dine tanker klart og lytte aktivt",
      },
      {
        question: "Hvilken kommunikationsteknik fremhæves som vigtig i modulet?",
        options: [
          "Aktiv lytning",
          "At dominere samtalen",
          "At undgå øjenkontakt",
        ],
        correct_option: "Aktiv lytning",
      },
      {
        question: "Hvorfor er det vigtigt at reflektere over tidligere kommunikationsudfordringer?",
        options: [
          "For at forstå, hvordan ADHD påvirker dine interaktioner",
          "For at kunne sammenligne med kollegaer",
          "For at undgå fremtidige samtaler",
        ],
        correct_option: "For at forstå, hvordan ADHD påvirker dine interaktioner",
      },
    ],

    // Modul 2: Naviger i Familiære Dynamikker og Venskaber
    2: [
      {
        question: "Hvad er hovedformålet med modulet 'Naviger i Familiære Dynamikker og Venskaber'?",
        options: [
          "At identificere og håndtere konflikter i nære relationer",
          "At isolere sig fra familiemedlemmer",
          "At ignorere udfordringer i venskaber",
        ],
        correct_option: "At identificere og håndtere konflikter i nære relationer",
      },
      {
        question: "Hvilken metode anbefales for at styrke nære relationer?",
        options: [
          "Regelmæssige samtaler og feedback-sessioner",
          "At undgå at tale om konflikter",
          "At sammenligne dig selv med andre",
        ],
        correct_option: "Regelmæssige samtaler og feedback-sessioner",
      },
      {
        question: "Hvad opfordres du til at reflektere over i dette modul?",
        options: [
          "At tænke på både dine styrker og udfordringer i relationer",
          "At kun fokusere på dine fejl",
          "At ændre din personlighed helt",
        ],
        correct_option: "At tænke på både dine styrker og udfordringer i relationer",
      },
    ],

    // Modul 3: Arbejdsmiljø – Sæt Grænser og Opnå Støtte
    3: [
      {
        question: "Hvad er hovedfokus i modulet 'Arbejdsmiljø – Sæt Grænser og Opnå Støtte'?",
        options: [
          "At skabe et arbejdsmiljø, hvor dine behov anerkendes og støttes",
          "At konkurrere med kollegaer",
          "At undgå enhver form for feedback",
        ],
        correct_option: "At skabe et arbejdsmiljø, hvor dine behov anerkendes og støttes",
      },
      {
        question: "Hvilket redskab anbefales for at forbedre dine arbejdsrelationer?",
        options: [
          "At kommunikere dine grænser tydeligt",
          "At ignorere dine egne behov",
          "At arbejde helt alene",
        ],
        correct_option: "At kommunikere dine grænser tydeligt",
      },
      {
        question: "Hvorfor er det vigtigt at søge støtte på arbejdspladsen?",
        options: [
          "For at opnå anerkendelse og forbedre professionelle relationer",
          "For at vise, at du er uafhængig",
          "For at undgå at samarbejde med andre",
        ],
        correct_option: "For at opnå anerkendelse og forbedre professionelle relationer",
      },
    ],
  },

  'Kvinder med AD(H)D': {

    // Modul 1: At Genkende ADHD hos Kvinder
    1: [
      {
        question: "Hvad er en særlig udfordring ved at genkende ADHD hos kvinder?",
        options: [
          "Subtile, indre symptomer",
          "Klassisk hyperaktiv adfærd",
          "Fysisk motorisk uro"
        ],
        correct_option: "Subtile, indre symptomer",
      },
      {
        question: "Hvad betyder det, at symptomerne hos kvinder ofte er 'indre'?",
        options: [
          "At de kun påvirker den fysiske energi",
          "At symptomerne ikke nødvendigvis er synlige for andre, men påvirker følelseslivet",
          "At de altid manifesterer sig som hyperaktivitet"
        ],
        correct_option: "At symptomerne ikke nødvendigvis er synlige for andre, men påvirker følelseslivet",
      },
      {
        question: "Hvilken metode anbefales til at identificere ADHD hos kvinder ifølge modulet?",
        options: [
          "Selvevaluering og selvrefleksion",
          "Medicinering uden selvrefleksion",
          "At stole udelukkende på andres observationer"
        ],
        correct_option: "Selvevaluering og selvrefleksion",
      },
    ],

    // Modul 2: Strategier for Håndtering og Selvomsorg
    2: [
      {
        question: "Hvad er hovedfokus i modulet 'Strategier for Håndtering og Selvomsorg'?",
        options: [
          "At lære praktiske redskaber til struktur og selvomsorg",
          "At undgå sociale aktiviteter",
          "At fokusere på akademiske færdigheder"
        ],
        correct_option: "At lære praktiske redskaber til struktur og selvomsorg",
      },
      {
        question: "Hvilken metode anbefales typisk til at reducere stress hos kvinder med ADHD?",
        options: [
          "Anvendelse af digitale planlægningsværktøjer og mindfulness-teknikker",
          "At ignorere dagligdagens udfordringer",
          "At arbejde uden struktur"
        ],
        correct_option: "Anvendelse af digitale planlægningsværktøjer og mindfulness-teknikker",
      },
      {
        question: "Hvad er et vigtigt element i at implementere en handlingsplan ifølge modulet?",
        options: [
          "At sætte konkrete, målbare delmål",
          "At undlade at evaluere sin dagligdag",
          "At gentage de samme metoder uden ændringer"
        ],
        correct_option: "At sætte konkrete, målbare delmål",
      },
    ],

    // Modul 3: Relationer og Personlig Udvikling
    3: [
      {
        question: "Hvad lægger modulet 'Relationer og Personlig Udvikling' primært vægt på?",
        options: [
          "At forbedre kommunikation og styrke personlige relationer",
          "At reducere alle sociale interaktioner",
          "At fokusere udelukkende på karriereudvikling"
        ],
        correct_option: "At forbedre kommunikation og styrke personlige relationer",
      },
      {
        question: "Hvorfor er selvrefleksion vigtig i relation til dine relationer ifølge modulet?",
        options: [
          "For at forstå, hvordan ADHD påvirker dine interaktioner",
          "For at undgå at deltage i sociale sammenkomster",
          "For at eliminere følelsesmæssige reaktioner"
        ],
        correct_option: "For at forstå, hvordan ADHD påvirker dine interaktioner",
      },
      {
        question: "Hvilken metode anbefales for at styrke dine relationelle færdigheder?",
        options: [
          "At afprøve konkrete kommunikationsteknikker som aktiv lytning",
          "At undgå at udtrykke dine følelser",
          "At fokusere alene på dine egne behov"
        ],
        correct_option: "At afprøve konkrete kommunikationsteknikker som aktiv lytning",
      },
    ],

    // Modul 4: Karriere og Professionel Udvikling
    4: [
      {
        question: "Hvad fokuserer modulet 'Karriere og Professionel Udvikling' primært på?",
        options: [
          "At håndtere karrieremæssige udfordringer og udnytte styrker i arbejdslivet",
          "At forlade arbejdspladsen",
          "At fokusere på fritidsaktiviteter"
        ],
        correct_option: "At håndtere karrieremæssige udfordringer og udnytte styrker i arbejdslivet",
      },
      {
        question: "Hvilket redskab nævnes som en hjælp til at strukturere arbejdsdagen?",
        options: [
          "Brugen af tidsblokke og digitale planlægningsværktøjer",
          "At springe over planlægning",
          "At undgå at notere daglige opgaver"
        ],
        correct_option: "Brugen af tidsblokke og digitale planlægningsværktøjer",
      },
      {
        question: "Hvad er et centralt element i en handlingsplan for karriereudvikling?",
        options: [
          "At sætte konkrete, målbare karrieremål",
          "At undlade evaluering af egne præstationer",
          "At afvise feedback fra kolleger"
        ],
        correct_option: "At sætte konkrete, målbare karrieremål",
      },
    ],
  },
};

export default data;
