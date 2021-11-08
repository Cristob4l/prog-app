from flask import Flask, render_template

app = Flask(__name__)

@app.route('/')
def home():
    return render_template('home.html')

@app.route('/about')
def about():
    return render_template('about.html')

@app.route('/Login')
def Login():
    return render_template('Login.html')

@app.route('/Register')
def Register():
    return render_template('Register.html')

@app.route('/Camiones')
def Camiones():
    return render_template('Camiones.html')

@app.route('/Camion1')
def Camion1():
    return render_template('Camion1.html')

@app.route('/Introkomatsu')
def Introkomatsu():
    return render_template('Introkomatsu.html')

@app.route('/Camion2')
def Camion2():
    return render_template('Camion2.html')

@app.route('/Camion3')
def Camion3():
    return render_template('Camion3.html')

@app.route('/Camion4')
def Camion4():
    return render_template('Camion4.html')

@app.route('/Camion5')
def Camion5():
    return render_template('Camion5.html')

@app.route('/Monitoreo')
def Monitoreo():
    return render_template('Monitoreo.html')

@app.route('/Ubicacion1')
def Ubicacion1():
    return render_template('Ubicacion1.html')

@app.route('/CRUDeq')
def CRUDeq():
    return render_template('CRUDeq.html')

@app.route('/CRUDco')
def CRUDco():
    return render_template('CRUDco.html')

@app.route('/Registrar1')
def Registrar1():
    return render_template('Registrar1.html')

@app.route('/Mantenimiento1')
def Mantenimiento1():
    return render_template('Mantenimiento1.html')

@app.route('/Bitacora1')
def Bitacora1():
    return render_template('Bitacora1.html')

@app.route('/Fechas1')
def Fechas1():
    return render_template('Fechas1.html')

@app.route('/ModeloAna1')
def ModeloAna1():
    return render_template('ModeloAna1.html')


if __name__ == '__main__':
    app.run(debug=True)


