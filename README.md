# 3D Animation Test Tool

## Narzędzie do przeprowadzania testów wydajności dwóch bibliotek do animacji 3D w przeglądarkowych interfejsach graficznych:
* Three.js
* Babylon.js

## Instalacja i uruchomienie:

Do uruchomienia narzędzia wymagane jest środowisko Node.js w wersji >16, przeglądarka internetowa, np. Google Chrome w wersji >97 oraz system linux, np. Ubuntu 20.04 LTS.

### 1. Uruchomienie lokalnego serwera

W zależności, czy chcemy przeprowadzić testy dla biblioteki Three.js czy Babylon.js, w odpowiednim katalogu (odpowiednio 'Three_js' lub 'Babylon_js') należy otworzyć terminal i wpisać następujące komendy:
* `npm install`
* `npm run dev`

W efekcie uruchomiony zostanie lokalny serwer pod adresem http://192.168.59.128:8080 ze stroną internetową zawierającą animację 3D.

### 2. Przeprowadzenie testów

Następnym krokiem jest uruchomienie narzędzia testowego. W folderze 'Puppeteer' należy otworzyć terminal i wpisać następujące komendy:
* `npm install`
* `node index.js`

Wynikiem działania narzędzia są 4 pliki:
* **report.json** - raport z danymi dotyczącymi ładowania strony, np. czas ładowania skryptów, drzewo wywołań, log zdarzeń i wiele innych.
* **FPS.jpg** - zrzut ekranu ze strony z informacją o min/max wartościach klatek na sekundę.
* **GPU.jpg** - zrzut ekranu ze strony z informacją o max zużyciu pamięci GPU.
* **report.html** - raport wygenerowany za pomocą narzędzia Google Lighthouse, które przeprowadza audyt strony pod kątem 5 różnych aspektów jej działania: Wydajność, PWA, Dostępność, Dobre Praktyki, SEO. Dla nas najbardziej istotne są wyniki wydajnościowe, które zawierają m.in. informacje o czasach FCP (First Contentful Paint) i FMP (First Meaningful Paint).

### 3. Wersja interaktywna
Przygotowane strony można również uruchomić samodzielnie bez wykorzystywania biblioteki Puppeteer. Aby to zrobić, należy otworzyć terminal w jednym z folderów (Three_js lub Babylon_js) i wpisać następujące komendy:

* `npm install`
* `npm run dev`

Strony możemy wyświetlić udając się pod adres http://192.168.59.128:8080.

****
##### Projekt stworzony na potrzeby pracy inżynierskiej.
##### Arkadiusz Dawid, Politechnika Warszawska - Wydział Elektroniki i Technik Informacyjnych, 2022