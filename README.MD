# Naked-JSON
Naked JSON is very similar to classic JSON, but it contains raw data only and no property names.
## Motivation
The motivation is to remove redundant information from the JSON structure 
to reduce the number of required characters. This reduces the usage of memory or disk space and 
in the case of network transfer it reduces the network traffic an increases the transfer speed.

### Size comparison

````json
//JSON
{
  "firstName": "John",
  "lastName": "Doe",
  "gender": null,
  "isMarried": true,
  "numberOfChildren": 2,
  "contact": {
    "email": "john.doe@byteagenten.de",
    "phone": "+49 177 849002233",
    "address": {
      "street": "Nordostpark 25",
      "city": "90411 Nürnberg",
      "country": "Germany"
    }
  },
  "experiences": [
    {
      "technologie": "Java",
      "level": 10,
      "yearsOfExperience": 5
    },
    {
      "technologie": "C#",
      "level": 6,
      "yearsOfExperience": 3
    },
    {
      "technologie": "Angular",
      "level": 8,
      "yearsOfExperience": 5
    }
  ],
  "dateOfBirth": {
    "year": 1992,
    "month": 10,
    "day": 7
  }
}
````

````json lines
//Naked-JSON
{
  'John','Doe',null,true,2,
  {
    'john.doe@byteagenten.de','+49 177 849002233',
    {
        'Nordostpark 25','90411 Nürnberg','Germany'
    }
  },
  [
    {'Java',10,5},
    {'C#',6,3},
    {'Angular',8,5}
  ],
  {1992,10,7}
}
````

|                      | JSON     | Naked-JSON | Ratio  |
|----------------------|----------|------------|--------|
| Number of characters | 475      | 175        | ~ 37 % | 

Der Unterschied zwischen JSON und Naked-JSON hängt natürlich sehr stark von dem Aufbau des zugrundeliegenden Objekts ab.
Je länger die Attributbezeichnungen sind, desto größer natürlich die Einsparung. 
Speichert oder überträgt man nur einige wenige Objekte ist die Einsparung eher irrelevant. 
Bei mehreren tausend kann es aber zu einer deutlichen Verbesserung der Performance 
beitragen. Hier wird dann auch deutlich wie groß der Anteil an redundanter Information im 
Falle von JSON ist, der immer wieder mit Übertragen wird.

### Tradeoff

Da die Attributnamen nicht in dem Naked-JSON enthalten sind ist die einzige Information
welche die Bedeutung eines Wertes eindeutig definiert, dessen Position innerhalb der Werteliste.
D.h. um ein Naked-JSON zu interpretieren muss die exakte Struktur inklusive der Reihnefolge 
aller Attribute des Ausgangsobjekts bekannt sein.

### 
