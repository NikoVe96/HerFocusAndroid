const facts = [
    {
        title: 'Sene diagnoser',
        fact: 'Kvinder med ADHD bliver ofte diagnosticeret sent – typisk i 20’erne, 30’erne eller endda 40’erne – fordi deres symptomer ofte er mere subtile eller skjult bag sociale forventninger.'
    },
    {
        title: 'Historiske kvinder med ADHD-træk',
        fact: 'Selvom ADHD først er blevet diagnosticeret i nyere tid, mener forskere, at berømte kvinder som forfatteren Virginia Woolf og eventyreren Amelia Earhart muligvis havde træk, der kunne pege på ADHD.'
    },
    {
        title: '"Maskeringens" mestre',
        fact: 'Kvinder med ADHD er ofte dygtige til at "maskere" deres symptomer, altså skjule og tilpasse sig sociale normer, hvilket kan overraske mange, når diagnosen først bliver stillet.'
    },
    {
        title: 'Dopaminjagt',
        fact: 'ADHD-hjerner søger ekstra meget dopamin, og derfor søger kvinder med ADHD ofte stimulerende, spændende og spontane oplevelser.'
    },
    {
        title: 'Planner-entusiaster',
        fact: 'Mange kvinder med ADHD elsker kalendere, notesbøger, farverige kuglepenne og apps – selvom det kan være svært rent faktisk at holde styr på det hele i praksis.'
    },
    {
        title: 'Multitasking-eksperter',
        fact: 'Selvom det kan være svært at holde fokus længe på én ting, er kvinder med ADHD ofte exceptionelt gode til at jonglere mange tanker, idéer og opgaver samtidig.'
    },
    {
        title: 'Skjult for øjnene af os',
        fact: 'Kvinder viser oftere indre symptomer (såsom dagdrømmeri, distraktion og angst) i stedet for tydelig hyperaktivitet, hvilket gør ADHD sværere at opdage tidligt.'
    },
    {
        title: 'Superfokus som superkraft',
        fact: 'Mange kvinder med ADHD oplever perioder med ekstrem fokusering (hyperfokus), hvilket kan gøre dem dygtige inden for kreative eller akademiske områder, når noget virkelig interesserer dem.'
    },
    {
        title: 'Nutidens forbilleder',
        fact: 'Kendte kvinder der åbent fortæller om deres ADHD inkluderer gymnast Simone Biles, skuespiller Emma Watson, Paris Hilton og skuespiller Zooey Deschanel.'
    },
    {
        title: 'Sociale sommerfugle',
        fact: 'Mange kvinder med ADHD er nysgerrige, åbne og sociale, hvilket gør dem særligt mindeværdige i sociale situationer.'
    },
    {
        title: 'Natteravne',
        fact: 'Mange kvinder med ADHD oplever, at deres hjerner fungerer bedst sent på dagen eller natten, hvor de ofte føler sig mest kreative og produktive.'
    },
    {
        title: 'Rutiner på en sjov måde',
        fact: 'Mange kvinder med ADHD har succes med at gøre hverdagsopgaver sjovere ved at lave dem til spil eller små belønningsbaserede udfordringer, der øger motivationen.'
    },
    {
        title: 'Eventyrlystne sjæle',
        fact: 'Kvinder med ADHD har ofte en stor appetit på nye oplevelser, hvilket gør dem fremragende til innovation, iværksætteri og eventyr.'
    },
    {
        title: 'Udbredelse',
        fact: 'Cirka 5-7 % af børn og unge og omtrent 2-5 % af voksne har ADHD på verdensplan.'
    },
    {
        title: 'Neurologisk lidelse',
        fact: ' ADHD er en neurologisk tilstand, der påvirker hjernens evne til at regulere opmærksomhed, aktivitet og impulskontrol.'
    },
    {
        title: 'ADHD forsvinder ikke nødvendigvis med alderen',
        fact: 'Cirka 50-70 % af børn med ADHD har stadig symptomer som voksne.'
    },
    {
        title: 'Kreativitet',
        fact: 'Personer med ADHD har ofte en ekstraordinær evne til at tænke kreativt, utraditionelt og innovativt.'
    },
    {
        title: 'Medicinsk behandling virker ofte effektivt',
        fact: 'Medicin mod ADHD kan hjælpe mange med at få styr på koncentration, impulskontrol og hyperaktivitet, men er mest effektivt i kombination med psykologisk støtte.'
    },
    {
        title: 'Arvelighed spiller en stor rolle',
        fact: 'ADHD er en af de mest arvelige psykiatriske lidelser. Hvis en forælder har ADHD, er risikoen høj for, at barnet også får det.'
    },
    {
        title: 'Dopamin ubalance',
        fact: ' Personer med ADHD har typisk lavere niveauer af neurotransmitteren dopamin, som hjælper med at styre opmærksomhed og belønningssystemer.'
    },
    {
        title: 'Voksne med ADHD oplever ofte udfordringer..',
        fact: '.. som vanskeligheder med organisering, tidsstyring, relationer, økonomi og karriere, men kan samtidig have store kreative og innovative evner.'
    },
    {
        title: 'Problemløsning og innovation',
        fact: 'ADHD-hjerner ser ofte anderledes på tingene og er gode til at finde innovative løsninger på komplekse problemer.'
    },
    {
        title: 'Rutiner er afgørende',
        fact: 'Struktur, faste rutiner, og tydelige rammer hjælper ofte personer med ADHD med at få en bedre hverdag.'
    },
    {
        title: 'Misforståelser',
        fact: 'Mange tror fejlagtigt, at ADHD handler om dovenskab, manglende disciplin eller dårligt forældreskab. Faktisk er ADHD en veldokumenteret neurologisk lidelse.'
    },
    {
        title: 'Ikke kun hyperaktivitet',
        fact: 'Mange forbinder ADHD med hyperaktive børn, men lidelsen kan også optræde primært som koncentrationsvanskeligheder og opmærksomhedsproblemer uden tydelig hyperaktivitet.'
    },
    {
        title: 'Hyperfokus',
        fact: 'Selvom ADHD forbindes med opmærksomhedsproblemer, oplever mange også hyperfokus – en tilstand af intens koncentration på aktiviteter, de finder interessante.'
    },
    {
        title: 'Høj energi',
        fact: 'Mange med ADHD har et højt energiniveau, som kan være en styrke i kreative og dynamiske miljøer.'
    },
    {
        title: 'Fysisk aktivitet hjælper hjernen',
        fact: 'Regelmæssig motion kan reducere ADHD-symptomer, forbedre fokus og humør og øge energiniveauet.'
    },
    {
        title: 'Tre typer af ADHD',
        fact: 'Overvejende uopmærksom type (ofte kaldet ADD), Overvejende hyperaktiv-impulsiv type og Kombineret type (både opmærksomheds- og hyperaktivitetsproblemer)'
    },
    {
        title: 'Søvnproblemer er hyppige',
        fact: 'Mange med ADHD har udfordringer med søvnrytme og søvnkvalitet, hvilket kan forværre symptomerne.'
    },
]

export default facts;