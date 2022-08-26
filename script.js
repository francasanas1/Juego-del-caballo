var sec = 00;
var min = 00;
var celdaAnterior;
var celda;
var celda1;
let miArray = [];
let tablero = new Array(8);
var movimientos;
var opciones;
var x1;
var y1;
var caja1;
let arrayBonus = [];
var bonus;
var celda_bonus;
var chequeoCeldaRequerido;
var movimientosFaltantesBonus;
var movimientosTotales;
var nivel;
var vidas;

function pad(val) {
    let valString = val.toString();
    if (valString.length < 2) {
        return '0' + valString;
    } else {
        return valString;
    }
}

function cronometro() {
    sec++;
    if (sec >= 60) {
        sec = 0;
        min++;
        if (min >= 60) {
            min = 0;
        }
    }
    tiempo = document.getElementById("Tiempo").innerHTML = 'Tiempo: ' + pad(min) + ":" + pad(sec);
}

function pintarCeldaInicial() {
    celda = document.getElementById('c' + x + y);
    celda.setAttribute("style", "background-color:green;");
    celda.innerHTML = '&#9816';
}

function registroDeCeldas() {
    celdaOscura = Array.from(document.getElementsByClassName('CasillaOscura'));
    celdaClara = Array.from(document.getElementsByClassName('CasillaClara'));

    const celdas = celdaOscura.concat(celdaClara);
    celdas.forEach(celda1 => {
        celda1.addEventListener('click', () => chequeoCelda(celda1, 'green'))
    })

}

function chequeoCelda(celda1, color) {
    x1 = celda.id[2];
    y1 = celda.id[1];
    x2 = celda1.id[2];
    y2 = celda1.id[1];
    // console.log(x1);
    armarArray(x1, y1);
    chequeoTrue = true;
    chequeoCeldaRequerido = true;

    if (!opciones) {
        if (bonus) chequeoCeldaRequerido = false;
    }

    dif_x = x1 - x2;
    dif_y = y1 - y2;

    if (chequeoCeldaRequerido) {
        chequeoTrue = false;
        if (dif_x == 1 && dif_y == 2) chequeoTrue = true; // izquierda - arriba largo
        if (dif_x == 2 && dif_y == 1) chequeoTrue = true; // izquierda - arriba corto
        if (dif_x == -1 && dif_y == 2) chequeoTrue = true; // derecha - arriba largo
        if (dif_x == -2 && dif_y == 1) chequeoTrue = true; // derecha - arriba corto

        if (dif_x == 1 && dif_y == -2) chequeoTrue = true; // izquierda - abajo largo
        if (dif_x == 2 && dif_y == -1) chequeoTrue = true; // izquierda - abajo corto
        if (dif_x == -1 && dif_y == -2) chequeoTrue = true; // derecha - abajo largo
        if (dif_x == -2 && dif_y == -1) chequeoTrue = true; // derecha - abajo corto

    } else {
        if (miArray.find(element => { return element.x == x2 && element.y == y2 }) == undefined) {
            bonus--;
            document.getElementById("Bonus").innerHTML = 'Bonus: +' + bonus;
            if (bonus === 0) document.getElementById("Bonus").innerHTML = '';
            console.log(bonus);
        }
    }



    miArray.forEach(caja1 => {
        if (caja1.x === x2 && caja1.y === y2) {
            chequeoTrue = false;
        }
    });

    if (chequeoTrue) {
        pintarCeldaSelec(celda1, color);
        movimientos--;
        document.getElementById("Movimientos").innerHTML = 'Movimientos: ' + movimientos;
        chequeoPerder(x2, y2);

    }
    contador_Bonus();
    chequeoGanar();
    document.getElementById("Vidas").innerHTML = 'Vidas: ' + vidas;
    document.getElementById("Nivel").innerHTML = 'Nivel: ' + nivel;
}

function armarArray(x1, y1) {
    let caja = {
        x: x1,
        y: y1
    }
    miArray.push(caja);
    // console.log(miArray);
}

function pintarCeldaSelec(celda1, color) {
    celda.setAttribute("style", "background-color:#900;");
    celda = celda1;
    celda1.style.background = color;
    celda1.innerHTML = '&#9816';

}

function inicioJuego() {
    // pedirUsuario();
    setInterval(cronometro, 1000);
    movimientos = 63;
    bonus = 0;
    nivel = 1;
    x = Math.round(Math.random() * 7);
    y = Math.round(Math.random() * 7);
    for (i = 0; i < 8; i++) tablero[i] = new Array(8);
    pintarCeldaInicial();
    registroDeCeldas();
    set_niveles();
    
}

function chequeoGanar() {
    ganar = true;
    if (movimientos > 0) ganar = false;
    if (ganar) alert('Ganaste');
    // console.log(ganar);
}

function chequeoPerder(x2, y2) {
    opciones = 0;

    chequeoMovimiento(x2, y2, 1, 2);
    chequeoMovimiento(x2, y2, 2, 1);
    chequeoMovimiento(x2, y2, -1, 2);
    chequeoMovimiento(x2, y2, -2, 1);

    chequeoMovimiento(x2, y2, 1, -2);
    chequeoMovimiento(x2, y2, 2, -1);
    chequeoMovimiento(x2, y2, -1, -2);
    chequeoMovimiento(x2, y2, -2, -1);

    document.getElementById("Opciones").innerHTML = 'Opciones: ' + opciones;
    chequeoBonus();
}

function chequeoMovimiento(x2, y2, mov_x, mov_y) {
    move_x = parseInt(x2) + mov_x;
    move_y = parseInt(y2) + mov_y;
    if (move_x >= 0 && move_x < 8 && move_y >= 0 && move_y < 8) {
        if (miArray.find(element => { return element.x == move_x && element.y == move_y }) == undefined) {
            opciones++;
        }
    }

}

function chequeoBonus() {

    if ((movimientosTotales - movimientos) % movimientosFaltantesBonus == 0) {
        pintarBonus();
        clickBonus(celda_bonus);
    }
    if (opciones == 0 && bonus == 0) alert('Perdiste');
    document.getElementById("Bonus").innerHTML = 'Bonus: +' + bonus
    // console.log(bonus);
}

function clickBonus(celda_bonus) {
    celda_bonus.addEventListener('click', () => bonus++);

}
// arrayBonus.forEach(elem => {
//     elem.addEventListener('click', () => {
//         bonus = bonus + 1,
//             document.getElementById("Bonus").innerHTML = 'Bonus: +' + bonus
//     }
//     );
// })

function pintarBonus() {
    x_bonus = Math.round(Math.random() * 7);
    y_bonus = Math.round(Math.random() * 7);
    if (x_bonus != x2 && y_bonus != y2 && miArray.find(element => { return element.x == x_bonus && element.y == y_bonus }) == undefined) {
        celda_bonus = document.getElementById('c' + y_bonus + x_bonus);
        celda_bonus.setAttribute("style", "background-color:#D4AF37");
        celda_bonus.innerHTML = '&#9819';
        arrayBonus.push(celda_bonus);
        // console.log(arrayBonus);
    } else {
        pintarBonus();
    }

}

function contador_Bonus() {
    console.log(movimientosFaltantesBonus);
    if (movimientos > movimientosTotales - (movimientosFaltantesBonus * 1)) {
        mov_faltantes = movimientos - ( movimientosTotales - (movimientosFaltantesBonus * 1));
        document.getElementById("Movimientos_faltantes").innerHTML = 'Movimientos faltantes bonus: ' + mov_faltantes;
    } else if (movimientos >  movimientosTotales - (movimientosFaltantesBonus * 2)) {
        mov_faltantes = movimientos - ( movimientosTotales - (movimientosFaltantesBonus * 2));
        document.getElementById("Movimientos_faltantes").innerHTML = 'Movimientos faltantes bonus: ' + mov_faltantes;
    } else if (movimientos >  movimientosTotales - (movimientosFaltantesBonus * 3)) {
        mov_faltantes = movimientos - ( movimientosTotales - (movimientosFaltantesBonus * 3));
        document.getElementById("Movimientos_faltantes").innerHTML = 'Movimientos faltantes bonus: ' + mov_faltantes;
    } else if (movimientos >  movimientosTotales - (movimientosFaltantesBonus * 4)) {
        mov_faltantes = movimientos - ( movimientosTotales - (movimientosFaltantesBonus * 4));
        document.getElementById("Movimientos_faltantes").innerHTML = 'Movimientos faltantes bonus: ' + mov_faltantes;
    } else if (movimientos >  movimientosTotales - (movimientosFaltantesBonus * 5)) {
        mov_faltantes = movimientos - ( movimientosTotales - (movimientosFaltantesBonus * 5));
        document.getElementById("Movimientos_faltantes").innerHTML = 'Movimientos faltantes bonus: ' + mov_faltantes;
    } else if (movimientos >  movimientosTotales - (movimientosFaltantesBonus * 6)) {
        mov_faltantes = movimientos - ( movimientosTotales - (movimientosFaltantesBonus * 6));
        document.getElementById("Movimientos_faltantes").innerHTML = 'Movimientos faltantes bonus: ' + mov_faltantes;
    }
}

inicioJuego();
