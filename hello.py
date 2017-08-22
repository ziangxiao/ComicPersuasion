from flask import Flask
from flask import Response
app = Flask(__name__)

@app.route("/")
def hello():
    return "Hello World!"
	
@app.route("/xkcd/")
def xkcd():
    with open('comicGenerator/css/xkcd.css') as f:
	    return Response(f.read(), mimetype='text/css')

if __name__ == "__main__":
    app.run()