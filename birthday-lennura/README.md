# Birthday Lennura — маленький цифровой подарок

## Структура

```text
birthday-lennura/
├── app.py
├── templates/
│   └── index.html
├── static/
│   ├── style.css
│   ├── script.js
│   ├── images/
│   │   └── photos/
│   └── music/
│       └── song.mp3   <-- добавляется тобой
└── README.md
```

## Установка

Проверь Python:

```powershell
python --version
```

В папке проекта установи Flask:

```powershell
python -m pip install flask
```

## Запуск

```powershell
python app.py
```

На компьютере открой:

```text
http://127.0.0.1:5000
```

## Имя

В `app.py` замени:

```python
YOUR_NAME = "Твоё имя"
```

## Фотографии

Положи изображения в:

```text
static/images/photos/
```

Например:

```text
static/images/photos/roller.jpg
static/images/photos/skates.jpg
static/images/photos/drawing.jpg
```

В `templates/index.html` у нужной карточки замени:

```html
data-image=""
```

на:

```html
data-image="/static/images/photos/roller.jpg"
```

Подпись меняется через `data-caption="..."`.

## Музыка

Если у тебя есть законно полученный аудиофайл и право его использовать, переименуй его в `song.mp3` и положи сюда:

```text
static/music/song.mp3
```

Музыка не запускается автоматически — её нужно включить кнопкой.

## Телефон

Компьютер и телефон должны быть в одной Wi‑Fi сети. Запусти сайт, затем в PowerShell:

```powershell
ipconfig
```

Найди `IPv4 Address`, например `192.168.1.25`, и на телефоне открой:

```text
http://192.168.1.25:5000
```

При запросе Windows Firewall разреши Python доступ в частной сети.

## Интернет

Для постоянной ссылки проект можно разместить на сервисе с поддержкой Python/Flask, например Render, Railway или PythonAnywhere. Перед публикацией отключи `debug=True` и используй production WSGI-запуск.

Не загружай в репозиторий секретные ключи и используй только музыку/фотографии, на которые у тебя есть право.
