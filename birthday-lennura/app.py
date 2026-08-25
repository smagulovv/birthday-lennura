from flask import Flask, render_template

app = Flask(__name__)

# =========================
# НАСТРОЙКИ, КОТОРЫЕ МОЖНО МЕНЯТЬ
# =========================
YOUR_NAME = "Твоё имя"  # <-- замени на своё имя

@app.route("/")
def home():
    return render_template("index.html", your_name=YOUR_NAME)


if __name__ == "__main__":
    # 0.0.0.0 позволяет открыть сайт с телефона в той же Wi‑Fi сети.
    app.run(host="0.0.0.0", port=5000, debug=True)
