import os
from re import X
import sys
from flask import Flask, render_template, request, session



app = Flask(__name__)
app.debug = True


@app.route('/')
def home():
    return render_template("login.html") 

@app.route('/', methods= ["GET", "POST"])
def login():



    if request.method == 'POST':
        email = request.form['email']
        password = request.form['password']

        if email==None:

            return render_template("login.html")

        if len(email)>0:
            if password != None:
                return render_template("index.html")

            else:

                return render_template("login.html")
        else:

            return render_template("login.html")
    else:
        
        return render_template("login.html")



if __name__ == '__main__':
    app.secret_key = "pinchellave"
    app.run(debug=True)
