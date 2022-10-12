function limpiarTablero() {
    arrayLimpiar.forEach(caja => {
        caja.removeAttribute("style");
        caja.innerHTML = '';
    })
    // celda.remove();
    miArray = [];
}

function set_niveles() {

    switch (nivel) {
        case 1:
            vidas = 1;
            movimientosTotales = 64;
            movimientos = 64;
            movimientosFaltantesBonus = 8;
            bonus = 0;
            break;
        case 2:
            vidas = 2;
            movimientosTotales = 56;
            movimientos = 56;
            movimientosFaltantesBonus = 10;
            bonus = 0;
             pintarCeldaInicial();
    registroDeCeldas();
            break;

        case 3:
            vidas == 3;
            movimientosTotales == 48;
            movimientos == 48;
            movimientosFaltantesBonus == 12;
            bonus = 0;
             pintarCeldaInicial();
    registroDeCeldas();
            break;
        case 4:
            vidas == 4;
            movimientosTotales == 40;
            movimientos == 40;
            movimientosFaltantesBonus == 14;
            bonus = 0;
             pintarCeldaInicial();
    registroDeCeldas();
            break;
        default:
            vidas == 5;
            movimientosTotales == 32;
            movimientos == 32;
            movimientosFaltantesBonus == 16;
            bonus = 0;
             pintarCeldaInicial();
    registroDeCeldas();
            break;
    }
}

function set_parametros() {

    if (siguiente_nivel) {
        limpiarTablero();
        nivel++;
        set_niveles();
        setTablero();
    } else {
        vidas--;
        if (vidas == 0) {
            vidas = 1;
            nivel = 1;
            bonus = 0;
        }
    }
    document.getElementById("Vidas").innerHTML = 'Vidas: ' + vidas;
    document.getElementById("Nivel").innerHTML = 'Nivel: ' + nivel;
    document.getElementById("Bonus").innerHTML = 'Bonus: +' + bonus;
    document.getElementById("Movimientos").innerHTML = 'Movimientos: ' + movimientos;
}


function setTablero() {
    if (nivel === 2) PintarNivel_2();
    if (nivel === 3) PintarNivel_3();
    if (nivel === 4) PintarNivel_4();
    if (nivel === 5) PintarNivel_5();
}

function PintarNivel_2() {
    arrayObstaculo = [(0, 6), (1, 6), (2, 6), (3, 6), (4, 6), (5, 6), (6, 6), (7, 6)];
    arrayObstaculo.forEach((a, b) => {
        // if (arrayObstaculo.find(element => { return element.a == x && element.b == y }) == undefined) {}
        celdaObstaculo = document.getElementById('c' + b + a);
        celdaObstaculo.setAttribute("style", "background-color:#900;");
        celdaObstaculo.innerHTML = '&#9816';
        miArray.push(celdaObstaculo);
    })
}


function PintarNivel_3() {
    arrayObstaculo = [];
    arrayObstaculo = [(0, 0), (1, 0), (2, 0), (3, 0), (4, 0), (5, 0), (6, 0), (7, 0)];
    arrayObstaculo.forEach((a, b) => {
        // if (arrayObstaculo.find(element => { return element.a == x && element.b == y }) == undefined) {}
        celdaObstaculo = document.getElementById('c' + b + a);
        celdaObstaculo.setAttribute("style", "background-color:#900;");
        celdaObstaculo.innerHTML = '&#9816';
    })
}


function PintarNivel_4() {
    arrayObstaculo = [];
    arrayObstaculo = [(4, 0), (4, 0), (4, 0), (4, 0), (4, 0), (4, 0), (4, 0), (4, 0)];
    arrayObstaculo.forEach((a, b) => {
        // if (arrayObstaculo.find(element => { return element.a == x && element.b == y }) == undefined) {}
        celdaObstaculo = document.getElementById('c' + b + a);
        celdaObstaculo.setAttribute("style", "background-color:#900;");
        celdaObstaculo.innerHTML = '&#9816';
        console.log(celdaObstaculo);
    })
}
