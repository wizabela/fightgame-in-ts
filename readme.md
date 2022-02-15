ZADANIE KONCOWE NA ETAP TYPESCRIPT
Tworzymy grę, w której walczy się z różnymi wojownikami. Wojownicy są tworzeni przez inne osoby w systemie.


1 Aplikacja składa się z 3 części:

1. Rejestracja wojownika
2. Arena walk
3. Sala sław

Nie będziemy teraz implementowali jeszcze żadnej autoryzacji i uwierzytelnienia. Czyli każdy może stworzyć dowolnego wojownika i dowolnie przeprowadzać walki.

Wszystkie dane są zapisywane w bazie danych.
Rejestracja wojownika polega na wpisaniu jego danych:
- Imię - musi być unikalne w stosunku do wszystkich wojowników*
- Siła
- Obrona
- Wytrzymałość
- Zwinność

Trudność polega na tym, że do rozdania jest łącznie 10 punktów.
Każda statystyka musi wynosić min. 1.
Łącznie statystyki muszą wynosić 10.
Te informacje kiedy zostaną zapisane nigdy się nie zmieniają. Tzn. np. podczas walki utrata obrony jest tymczasowa, nie powinna zostać zapisana między walkami.1
- Liczba zwycięstw: domyślnie O

Arena walk
Arena polega na tym, że wybieramy z dwóch select-ów dwóch różnych przeciwników (nie można tych samych). Walczą oni ze sobą, na końcu widzimy log całej walki na frontendzie.

Algorytm walki (można go zmodyfikować, to tylko propozycja):
1. Każdy na początku ma tyle punktów życia (HP) ile wynosi jego wytrzymałość * 10.
   Każdy ma na oczątku tyle tarczy (DP) ile wynosi jego obrona.
2. Wojownik, który zaczyna wykonuje atak o wartości równej jego sile
3. Jeżeli wojownik atakowany ma tarczę + zwinność większą niż siła ataku, to: 3.1. Odejmowane mu jest tarcza w wysokości ataku. 3.2.A) Jeżeli atak był większy niż tarcza, to odejmowana jest mu od życia pozostała ilość siły ataku. 3.2.B) Jeżeli atak byt maksymalnie tyle ile wynosi aktualnie tarcza, to nie jest odejmowane życie.
4. Następuje zmiana kolejności i teraz atakowany zostaje atakującym, a atakujacy zostaje atakowanym.
5. Powtarzamy punkty 2 - 4 tak długo, dopóki ktoś nie umrze, czyli jego HP nie spadnie do min. O. Gdy jeden z wojowników umrze, to atakujący zostaje zwycięzcą. Zapisujemy mu w bazie +1 do zwycięstw.
   Podczas walki, powinien się generować dokładny log, który zostanie zwrócony na frontend. Powinien on zawierać szczegółowe informacje -kto kogo atakuje, czy powiodła się obrona, ile zostało zabrane z tarczy itp.
* *
Sala sław
Jest to miejsce, w którym wypisujemy 10 najlepszych śmiałków.
Najwyżej pokazujemy tych z największą ilością zwycięstw.
Pokazujemy na liście: pozycję, ilość zwycięstw i imię wojownika.
* Realizacja: Unique na bazie / Logika / Unique + logi 
** Możesz zrobić bardzo ładną wersję tego - poprzez do czy innych kolorów w zależności od typu sytuacji.'

Oto poprawiony algorytm do zadania końcowego:
1. Każdy na początku ma tyle punktów życia (HP) ile wynosi jego wytrzymałość * 10. Każdy ma na oczątku tyle tarczy (DP) ile wynosi jego obrona.
2. Wojownik, który zaczyna wykonuje atak o wartości równej jego sile
3. Jeżeli wojownik atakowany ma tarczę + zwinność większą niż siła ataku, to:
   3.1. Odejmowane mu jest tarcza w wysokości ataku.
   3.2.A) Jeżeli atak był większy niż tarcza, to odejmowana jest mu od życia pozostała ilość siły ataku.
   3.2.B) Jeżeli atak był maksymalnie tyle ile wynosi aktualnie tarcza, to nie jest odejmowane życie.
   3.2. Jeżeli warunek 3 NIE JEST SPEŁNIONY to po prostu od życia odejmujemy atak
4. Następuje zmiana kolejności i teraz atakowany zostaje atakującym, a atakujacy zostaje atakowanym.
5. Powtarzamy punkty 2 - 4 tak długo, dopóki ktoś nie umrze, czyli jego HP nie spadnie do min. 0. Gdy jeden z wojowników umrze, to atakujący zostaje zwycięzcą. Zapisujemy mu w bazie +1 do zwycięstw.

PLAN developmentu:
v1.0
1. SKonfigurować WebstormProjects
2. Potrzebne paczki i konfiguracja TYPESCRIPT
3. Konfiguracja expressu. Folder publiczny - pliki statyczne
4. Ogólna struktura routerów - ścieżek - zaplanować jakie te ścieżki będą:
Strona główna
/
Rejestracja Wojownika
 formularz
 zapisanie
Arena walk
 formularz wyboru uzytkownika
 przeprowadzenie walki - log walki
Sala sław
 lista najlepszych wojowników
5. Zaplanowanie widoków/ ogólna struktura widoków/ ogólna struktura
6. Rekordy dla Wojownika
 Nazwa db: megak_arena
 Tabele:
    - warrior
        - ID - UUID (VARCHAR(36))
        - Imię - VARCHAR(50) - unikalne
        - Siła - TINYINT(2) - BO MAX 10
        - Obrona - TINYINT(2)
        - Wytrzymałość - TINYINT(2)
        - Zwinność - TINYINT(2)
        - Liczba zwycięstw: domyślna wartość 0 - INT(11)
7. Logika związana z tworzeniem wojowników
8. Logika związana z salą sław
9. Logika związana z areną walk

v2.0
1. Log walki, Można zrobić ładną wersję, np. przez dodanie ikon czy innych kolorów w zależności od sytuacji
2. Dodać frontendowy JS, który ułatwi rozdawanie punktów u wojowników
