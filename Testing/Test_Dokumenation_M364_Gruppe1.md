# Test Dokumentation Gruppe 1

## Test 1
| Bildgroesse            | Verkleinerungsgrad | Erwartete Bildgroesse |
|------------------------|--------------------|-----------------------|
| 500p x 500p            | 50%                | 250p x 250p           |


### hochgeladenes Bild:

![hochgeladenes Bild von Test1](Pictures/Testing1/50_Test1_500x500.png)

### zurueckkommendes Bild:

![zurueckkommendes Bild von Test1](Pictures/Testing1/Test1.png)

Resultat:
Der Test hat das Bild wie erwartet auf 250p x 250p verkleinert.

Duchgefuehrt am 21.12.2023 10:04

## Test 2
| Bildgroesse            | Verkleinerungsgrad | Erwartete Bildgroesse |
|------------------------|--------------------|-----------------------|
| 427p x 640p            | 50%                | 213.5p x 320p         |


### hochgeladenes Bild:

![hochgeladenes Bild von Test2](Pictures/Testing2/50_Testing2.png)

### zurueckkommendes Bild:

![zurueckkommendes Bild von Test2](Pictures/Testing2/Testing2.png)

Resultat:
Der Test hat das Bild nicht wie erwartet auf 213.5p x 320p verkleinert. Es hat das Bild auf 200p x 300p verkleinert.

Durchgefuehrt am 21.12.2023 10:16


## Test 3
| Bildgroesse         | Verkleinerungsgrad | Erwartete Bildgroesse |
|---------------------|--------------------|-----------------------|
| 500 x 500p          | 25%                | 125p x 125p           |


### hochgeladenes Bild:

![hochgeladenes Bild von Test3](Pictures/Testing3/25_Testing3.png)

### zurueckkommendes Bild:

![zurueckkommendes Bild von Test3](Pictures/Testing3/Testing3.png)

Resultat:
Das Bild wurde wie erwartet auf 125p x 125p verkleinert.

Durchgefuehrt am 21.12.2023 10:22


## Test 4
| Bildgroesse            | Verkleinerungsgrad | Erwartete Bildgroesse |
|------------------------|--------------------|-----------------------|
| 640p x 478p            | 75%                | 480p x 358.5p         |


### hochgeladenes Bild:

![hochgeladenes Bild von Test4](Pictures/Testing4/75_Testing4.jpg)

### zurueckkommendes Bild:

![zurueckkommendes Bild von Test4](Pictures/Testing4/Testing4.jpg)

Resultat:
Der Test hat das Bild nicht wie erwartet auf 480p x 358.5p verkleinert. Es hat das Bild auf 450p x 300p verkleinert.

Durchgefuehrt am 21.12.2023 10:32



## Test 5
| Bildgroesse            | Verkleinerungsgrad | Erwartete Bildgroesse            |
|------------------------|--------------------|----------------------------------|
| 500p x 500p            | -50%               | Bild sollte nicht erkannt werden |


### hochgeladenes Bild:

![hochgeladenes Bild von Test4](Pictures/Testing5/-50_Test1.png)

### zurueckkommendes Bild:
-> Gab keines

Resultat:
Wie erwartet hat die Lambda ueberhaupt nichts gemacht, da das Bild nicht erkannt wurde.

Durchgefuehrt am 22.12.2023 17:57


**Tests wurden alle von der Gruppe1 durchgefuehrt.**
