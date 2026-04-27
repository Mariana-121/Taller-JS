// Nombre: Mariana Leal Rojas - Documento: 1077228370

//1. Ingreso de información básica
let nombre = prompt("Ingresa tu nombre completo:");
let edad = parseInt(prompt("Ingresa tu edad:"));
let tipoDoc = prompt("Tipo de documento (RC, TI, CC, PP, CE):").toUpperCase();
let documento = prompt("Número de documento (sin puntos ni comas):");

// 2. Validación de perfil según la edad
if (edad < 18) {
    alert("Lo siento " + nombre + ", eres menor de edad, no puedes seguir.");
} else if (edad < 25) {
    alert("Te clasificas como: 'Usuario beneficiario por cotizante'. El proceso se detiene aquí.");
} else {
    // Valores de referencia para el año 2026
    const SALARIO_MINIMO = 1750905;
    const SUBSIDIO_TRANSPORTE = 249095;
    const VALOR_UVT = 52.37;

    let salario, comisiones, extras, nivelRiesgo;

    // Validación para mayores de 60 años
    if (edad >= 60) {
        salario = parseFloat(prompt("Ingresa el valor de tu mesada pensional:"));
        comisiones = 0;
        extras = 0;
        nivelRiesgo = "1"; 
    } else {
        // Ingreso de información salarial
        salario = parseFloat(prompt("Ingresa tu salario base:"));
        comisiones = parseFloat(prompt("Ingresa tus comisiones (0 si no tiene):")) || 0;
        extras = parseFloat(prompt("Ingresa total horas extra (0 si no tiene):")) || 0;
        nivelRiesgo = prompt("Nivel de Riesgo ARL (1 a 5):");
    }

    // 4. Cálculo de Obligaciones Laborales
    let totalGanado = salario + comisiones + extras;
    let ibc = totalGanado * 0.70; 

    // Auxilio de transporte
    let auxilio = 0;
    if (salario <= (SALARIO_MINIMO * 2)) {
        auxilio = SUBSIDIO_TRANSPORTE;
    }

    // Descuentos de ley (Salud y Pensión)
    let salud = ibc * 0.04;
    let pension = ibc * 0.04;
    
    // Fondo de Solidaridad Pensional
    let fondoSolidaridad = 0;
    if (ibc >= (SALARIO_MINIMO * 4)) {
        fondoSolidaridad = ibc * 0.01;
    }
    pension += fondoSolidaridad;

    // Cálculo de ARL según nivel de riesgo
    let tarifaARL = 0;
    if (nivelRiesgo === "1") tarifaARL = 0.00522;
    else if (nivelRiesgo === "2") tarifaARL = 0.01044;
    else if (nivelRiesgo === "3") tarifaARL = 0.02436;
    else if (nivelRiesgo === "4") tarifaARL = 0.04350;
    else if (nivelRiesgo === "5") tarifaARL = 0.06960;
    
    let descuentoARL = ibc * tarifaARL;

    // Retención en la Fuente
    let baseUVT = (ibc - salud - (pension - fondoSolidaridad)) / VALOR_UVT;
    let impuestoRenta = 0;
    if (baseUVT > 95) {
        impuestoRenta = (baseUVT - 95) * 0.19 * VALOR_UVT;
    }

    // Totales finales
    let deduccionesTotales = salud + pension + descuentoARL + impuestoRenta;
    let sueldoNeto = (totalGanado + auxilio) - deduccionesTotales;

    // 5. Resultados por consola
    console.log("--- RESULTADOS SIMULADOR 2026 ---");
    console.log("Empleado: " + nombre);
    console.log("Documento: " + tipoDoc + " " + documento);
    console.log("Salario Base: $" + salario);
    console.log("IBC: $" + ibc);
    console.log("Auxilio Transporte: $" + auxilio);
    console.log("Deducciones Totales: $" + deduccionesTotales);
    console.log("TOTAL NETO A RECIBIR: $" + sueldoNeto);
}
