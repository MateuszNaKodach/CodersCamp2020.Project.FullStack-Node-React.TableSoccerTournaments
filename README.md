# CodersCamp 2020 - Projekt końcowy (FullStack — Node.js + React)
**CodersCamp (coderscamp.edu.pl) - Największy otwarty kurs programowania webowego** 

### Wprowadzenie
Gratulacje! 
Udało Wam się dotrzeć prawie do końca kursu. 
Posiadacie już wiele umiejętności, które są konieczne, aby rozpocząć karierę programisty.
W trakcie tego projektu powinniście dowieść, że jesteście gotowi wykonywać kompletne aplikacje webowe.
Wraz ze zbieraniem wymagań, dzieleniem pracy, zarządzaniem, całym procesem wytwórczym, testowaniem oraz wdrażaniem.

### Zasady wykonywania projektu (wspólne dla wszystkich grup i mentorów): 

##### W projekcie każdy z uczestników powinien zaprezentować praktyczną znajomość poniższych zagadnień związanych z Node.js i React:

**Node.js / Express**
- REST API
- zakładanie konta użytkownika
- autoryzacja i autentykacja użytkownika, różne uprawnienia. Wykorzystanie Json Web Token.
- wykorzystanie bazy danych (NoSQL lub SQL)
- integracja z jakimś zewnętrznym systemem (np. wysyłanie e-maili)
- pisanie testów

**React**
- Komunikacja klient — serwer
- functional component
- React hooks
- tworzenie list komponentów
- JSX
- pisanie testów

Aplikacja musi korzystać z bazy danych (noSQL lub SQL) i zostać wykonana w architekturze Klient-Serwer (składać się co najmniej z 3 jednostek wdrożeniowych, tzn.: aplikacja webowa, backend i baza danych). 

Back-end zależy zaimplementować za pomocą frameworka Express.js lub NestJS (uczą się go backendowcy w ostatnim rozdziale).

Front-end wykonajcie przy użyciu biblioteki React. 
Jeśli czujecie się na siłach, zastosujcie Redux do zarządzania stanem (frontendowcy poznają go w ostatnim dziale).

Ponieważ projekt jest bardzo duży, będziecie na niego mieli 2 razy więcej czasu, niż poprzednio.
Sugerujemy w czasie działu 5 implementować część back-endową, a wczasie działu 6-tego część front-endową.
Wiedzę uzyskaną w dziale 6-tym możecie wykorzystać w projekcie, ale nie jest to koniecznie.
Ale to Wy odpowiadacie za powodzenie projektu, więc podejmujcie decyzje, korzystajcie z porad bardziej doświadczonych
i zróbcie coś niesamowitego! W trakcie trwania projektu odbędą się dwie prezentacje (z częstotliwością jak dotychczas).
Najprawdodpoboniej na pierwszym spotkaniu zaprezentujecie samo REST API. Warto przygotować je tak, jakby miało być odrębnym produktem!
A na prezentacji kończącej projekt z Reacta, pokażecie jak działa wszystko razem.

##### W trakcie trwania projektu należy wyznaczyć w zespole następujące role
tak jak opisano w przypadku poprzedniego projektu.

##### Sposób oceny projektu (i wszystkich kolejnych projektów na CodersCamp)
tak jak opisano w przypadku poprzedniego projektu.


### Projekt końcowy — aplikacja webowa
Teraz przechodzimy do przykładowego projektu, który został przygotowany przez organizatorów kursu.
Proponowany projekt pozwala na zastosowania większości umiejętności, jakie powinniście posiąśc w trakcie przerabiania działu.
Jednakże jeśli macie pomysł na projekt podobnej skali, który spełni opisane na górze wymagania i czujecie się na siłach
w zdefiniowaniu funkcjonalności, przygotowaniu ekranów i podzieleniu go na zadania — to nic nie stoi na przeszkodzie,
aby wykonać np. coś związanego z zainteresowaniami Waszej grupy :)
**W tym przypadku zachęcamy jeszcze bardziej niż zazwyczaj, aby wykonać coś innego niż proponowany temat.
Ten projekt będzie swoistym zwieńczeniem i podsumowaniem wszystkiego, co nauczyliście się w trakcie trwania CodersCamp.
Przykładowy projekt dajemy Wam głównie po to, abyście odczuli skalę, w której stronę powinniście dążyć przy określaniu własnego pomysłu.**
Możecie też zaimplementować Kino, ale zupełnie inaczej (lepiej) niż tutaj jest zaproponowane. 
Niech wasza prezentacja zwali z nóg uczestników.
Pamiętajcie tylko, że czas jest ograniczony i musicie zdążyć z aplikacją do prezentacji. 
Ten projekt jest niezwykle ważny dla waszej przyszłej programistycznej kariery. Można powiedzieć, że od tego zależy wasze być albo nie być podczas poszukiwania pierwszej pracy. W protoflio Junior Developera znakomicie sprwdzają się tego rodzaju projekty - a okazja do wykonania go w zespole i to pod okiem mentora - już może Wam się więcej nie powtórzyć.
Więc dajcie z siebie wszystko i powodzenia!
 
Czas porzucić narrację CodersCamp i wcielić się w członka zespołu projektowego, jeśli decydujecie się wykonać aplikację dla kina...

### MonoKino — Założenia projektowe
Gratulacje! 
Po ostatnim sukcesie Waszemu zespołowi udało się znaleźć pierwszego przedsiębiorcę, 
który będzie chciał z Waszą pomocą opracować całą aplikację webową.

Wasz klient jest właścicielem sieci kin o nazwie MonoKino.
MonoKino zaczynało w jednym mniejszym mieście, a teraz chcą wyjść na skalę ogólnopolską.
Obecna prowadzona jest rezerwacja jedynie przez email lub rozmowy telefoniczne, a opłaty za bilety są rozliczanie przy pomocy gotówki.

Ciągle zwiększanie się liczby placówek i klientów wymaga zautomatyzowania tych procesów.
Automatyzacja powinna zostać wykonana przy pomocy aplikacji webowej. Klient w niedalekiej przyszłości zapewne będzie chciał także wersję mobilną.
Może dobrze byłoby przygotować aplikację od razu na działanie na telefonach? Dacie radę zaproponować klientowi coś co spełni także to wymaganie?

Z analizy wynika, że największą konkurencją jest znana sieć kin, której stronę znajdziecie [TUTAJ](https://multikino.pl/repertuar/wroclaw-pasaz-grunwaldzki/teraz-gramy/alfabetyczny). 
Jak to często bywa, klient chce, aby jego strona była: „taka jak u konkurencji” i oczywiście nowoczesna. 
**Liczy się także czas „time to market”, dlatego na samym początku, trzeba się skupić, tylko na koniecznych do przynoszenia profitu funkcjonalnościach.**
Te mniej ważne można zawsze dorobić po deadline.
Aplikacja ma obsłużyć cały proces rezerwacji i sprzedaży biletów: od momentu **wyboru filmu**,
poprzez **rezerwację miejsc**, aż do **płatności** (początkowo system płatności może być zamockowany). Warto pomyśleć też o automatyzacja **sprawdzania biletów** przy wejściu do kina.
Po stronie panelu administracyjnego klient spodziewa się funkcjonalności, które pomogą mu konfigurować cały proces.

Aby sprostać oczekiwaniom klienta, zapoznajcie się z dokładniejszym opisem działania sieci kin. 
Poniżej są przedstawione najważniejsze terminy z dokładnymi wyjaśnieniami. 


### Wymagania
Klient wraz z analitykiem biznesowym spisali podstawowe wymagania co do projektu.
Jednakże nie krępujcie się przed ich doprecyzowaniem / zmianami, czy też ulepszeniami.
To Wy jesteście profesjonalistami w swoim fachu i Klient ufa, że zrobicie wszystko jak najlepiej.
Jeśli uważacie, że jakichś informacji Wam brakuje, najlepiej, jeśli Product Owner spróbuje uzupełnić luki w wymaganiach wraz z klientem.
Wymagania podzielono na dwie sekcje. Aplikację dla widza i panel administracyjny.

#### Aplikacja dla widza (repertuar, rezerwacja i zakup biletów)

##### Prototyp interfejsu użytkownika

Niestety współpraca z grafikiem projektującym interfejs nie układała się najlepiej i jego praca nie została skończona.
Wasz zespół zobowiązał się do pokrycia wymaganych funkcjonalności, chociaż nie na wszystko znajdziecie projekty interfejsu.
Możecie sami wykonać projekty ekranów i/lub od razu implementować. Warto wzorować się na rozwiązaniach konkurencyjnych.
Projekt grafika znajdziecie tutaj: https://www.figma.com/file/cuKLOWensUxkq5dYB082yd/CodersCamp2020.Project.FullStack-Node-React.Cinema?node-id=4412%3A3065

##### Wymagania funkcjonalne:
1. Klient może zarejestrować się w systemie, podając imię, nazwisko, hasło i adres e-mail.
1. Klient może zalogować się w systemie, podając adres e-mail i hasło.
1. Klient może przeglądać filmy „nadchodzące". Czyli takie, które są dostępne dla kina, ale nie zaplanowano jeszcze dla nich żadnych seansów.
1. Klient wybiera film i seans, na jaki chce kupić bilet / zarezerwować miejsce.
1. Klient może przeczytać szczegóły o filmie takie jak: Tytuł, rok produkcji, opis fabuły, plakat, kategorie (może być kilka), czas trwania.
1. W przypadku rezerwacji miejsca płatność odbywa się w kasie. Jeśli klient kupuje bilet, płatności należy dokonać on-line.
1. Rezerwacji może dokonać jedynie zarejestrowany klient. 
1. Zakupu można dokonać bez rejestracji — podając jedynie adres email.
1. Jeśli rezerwacja nie zostanie odebrana na 15 minut przed rozpoczęciem seans, miejsce zostaje zwolnione, a rezerwacja anulowana.
1. Jeden klient nie może zarezerwować więcej niż 20 miejsc na jeden seans. 
1. Klient powinien zostać poinformowany o statusie swojej płatności w systemie.
1. Klient powinien otrzymać bilet na podany przy zakupie / rejestracji adres email.


#### Panel Administracyjny (zarządzanie filmami, planowanie repertuaru, sale kinowe)

##### Prototyp interfejsu użytkownika
Przygotowanie projektu od 0 lub implementacja bez projektu.

##### Wymagania funkcjonalne:
1. Administrator wprowadza informację o placówkach w sieci kin. Sieć ma zamiar posiadać Kina w różnych miastach na całym świecie. 
Dlatego konieczne jest, aby prowadzić ewidencję Kin sieci. Kino musi mieć swój unikalny numer identyfikacyjny. Każda placówka ma określony adres i godziny otwarcia.
1. Administrator wprowadza informacje o filmie, który będzie dostępy dla wszystkich placówek w sieci.
1. Usunięcie filmu powinno skutkować odwołaniem wszystkich zaplanowanych projekcji, anulowaniem rezerwacji i wysłaniem do klientów, którzy zakupili bilety, wiadomości o zwrocie kosztów.
1. Administrator wprowadza informacje o seansach w danych kinie i przypisuje do seansu salę kinową i film oraz określa godzinę.
1. W danej sali kinowej nie mogą odbywać się 2 seanse jednocześnie. Dodatkowo między seansami należy zachować co najmniej 15 minutową przerwę na sprzątanie.
1. Seans musi się kończyć co najmniej 15 minut przed zamknięciem kina i zaczynać minimum 15 minut po otwarciu kina.
1. Każda sala kinowa ma określone, ile posiada kolumn i rzędów (zakładamy uproszczony model prostokąta).
1. Administrator zarządza listą cen za bilety. Wybiera jakie bilety są dostępne na które seanse. (np. na seans premierowy nie obowiązują zniżki, ale na resztę można zakupić bilet studencki).
1. Administrator otrzymuje raport w czasie rzeczywistym o liczbie sprzedanych i zarezerwowanych miejsc. Dzięki temu będzie mógł podejmować
decyzje, które zwiększa przychód.
1. Administrator może konfigurować czy na dany seans można zostawiać (w czasie zakupu lub rezerwacji) puste miejsca na rogu rzędów.
Tę zasadę może zmienić w każdym momencie.
1. Administrator może włączyć specjalny tryb pandemii, w którym muszą być przynajmniej 2 miejsca odstępu w jednym rzędzie, między miejscami
z 2 różnych rezerwacji / zakupów.


## Możliwe usprawnienia i dodatkowe funkcjonalności:
1. Integracja z zewnętrznym systemem płatności — np. PayU (wykorzystać Sandbox, który umożliwia testowanie płatności bez prawdziwych transakcji)
1. Sprawdzanie biletów — generowanie kodu QR z zakupionym biletem. Bilet jest „sprawdzony” po zeskanowaniu kodu QR telefonem.
1. Kreator do ustawiania miejsc na sali w bardziej skomplikowany sposób niż wspomniany prostokąt.

## Dodatkowe zadania (wykraczające poza zakres kursu):
1. Wykonanie testów E2E, przy użyciu odpowiedniego narzędzia. Proponujemy np. Cypress.
1. Utworzenie Storybook dla zdefiniowanych komponentów.

Wszelkie inne dodane przez Was funkcjonalności czy usprawnienia infrastrukturalne należy przedstawić w README.md projektu :)
