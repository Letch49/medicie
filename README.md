# Медицинская программа для предсказания лечения болезни

## Текущние проблемы данных
### Ранжирование
* Строковые данные необходимо проранжировать на неуникальные значени
* Пол нужно проранжировать на 1 и 2
* null необходимо перевести в числа
### Проблема парсинга данных
* Болезнь требуется перевести в номинальнкую шкалу (не обязательно, но если программа будет расшираться, то обязательно)
* Все строковые данные требуется перевести в номинальные шкалы, если некоторая совокупность данных, то требуется перевести в массив или объект состоящий из номинальных шкал (обязательно)
* Биохоимию требуется разнести на отдельные строки, т.к. для ИИ невозможно распарсить строку анализов
* Требуются веса (приоритеты в шкале от 0 до 1) для данных, т.е. какой параметр будет более сильнее влиять на итоговый результат

## Как это работает?
ИИ ищет максимально походящие лечение исходя из набора данных переданных на вход

## Данные
* data.json - входные текущие данные
* mydata.json - преобразованные данные
* result.json - результат работы программы

## TODO:
* Пользовательский интерфейс - требуется поиск подходящего лечения
* Поиск подходящего лечения - требует полную нормализацию данных


## Примерный вид объекта
```
        "input": {
            "Болезнь": id болезни или [id1,id2,... Болезней],
            "age": 67,
            "Пол": id пола,
            "Показания": [id1,id2,... список показаний],
            "stomach": 1,
            "s_irritation": 1,
            "nausea": 1,
            "умеренные": 1,
            "pain_upper": 0,
            "temperature": 0,
            "gall_bladder": 0,
            "alcohol": 0,
            "vomitting": 1,
            "dry_mouth": 0,
            "weakness": 0,
            "hemoglobin": 138,
            "erythrocyte:": 4.68,
            "leukocyte": 10.4,
            "Язык": [id1,id2..., список состояний языка],
            "Биохимия": {
                "Общий белок": float number,
                "Креатинин": float number,...
            }
        },
        "output": {
            "Лечение": 1
        }
```
