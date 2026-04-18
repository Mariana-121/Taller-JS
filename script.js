// Nombre: [Mariana Leal Rojas]
// ID: [1077228370]

function calcularTodo() {
    // 1. Traer los datos de la página
    let nombre = document.getElementById('nombre').value;
    let edad = parseInt(document.getElementById('edad').value);
    let salario = parseFloat(document.getElementById('salarioBase').value);
    let comisiones = parseFloat(document.getElementById('comisiones').value) || 0;
    let extras = parseFloat(document.getElementById('horasExtra').value) || 0;
    let nivelRiesgo = document.getElementById('riesgo').value;

    // 2. Validaciones del Punto 2 
    if (edad < 18) {
        alert("Lo siento " + nombre + ", eres menor de edad, no puedes seguir.");
        return;
    }
    if (edad < 25) {
        alert("Te clasificas como: 'Usuario beneficiario por cotizante'. El proceso se detiene aquí.");
        return;
    }

    // 3. Empezar los cálculos (Punto 4)
    // Valores fijos para 2026 que puso la profe
    const SALARIO_MINIMO = 1750905;
    const SUBSIDIO_TRANSPORTE = 249095;
    const VALOR_UVT = 52.37;

    // Calcular el IBC (70% del total ganado sin auxilio)
    let totalGanado = salario + comisiones + extras;
    let ibc = totalGanado * 0.70;

    // Ver si le damos subsidio de transporte (solo si gana 2 mínimos o menos)
    let auxilio = 0;
    if (salario <= (SALARIO_MINIMO * 2)) {
        auxilio = SUBSIDIO_TRANSPORTE;
    }

    // Descuentos de ley
    let salud = ibc * 0.04;
    let pension = ibc * 0.04;

    // Fondo de solidaridad
    let fondoSolidaridad = 0;
    if (ibc >= (SALARIO_MINIMO * 4)) {
        fondoSolidaridad = ibc * 0.01;
    }

    // Calcular ARL según el nivel
    let tarifaARL = 0;
    if (nivelRiesgo == "1") tarifaARL = 0.00522;
    else if (nivelRiesgo == "2") tarifaARL = 0.01044;
    else if (nivelRiesgo == "3") tarifaARL = 0.02436;
    else if (nivelRiesgo == "4") tarifaARL = 0.04350;
    else if (nivelRiesgo == "5") tarifaARL = 0.06960;

    let descuentoARL = ibc * tarifaARL;

    // Retención en la fuente (Punto extra - lógica simplificada de la tabla)
    let baseUVT = (ibc - salud - pension) / VALOR_UVT;
    let impuestoRenta = 0;

    if (baseUVT > 95) {
        // Cálculo básico para el primer rango de la tabla
        impuestoRenta = (baseUVT - 95) * 0.19 * VALOR_UVT;
    }

    // 4. Totales finales
    let deduccionesTotales = salud + pension + fondoSolidaridad + descuentoARL + impuestoRenta;
    let sueldoNeto = (totalGanado + auxilio) - deduccionesTotales;

    // 5. Mostrar en pantalla
    document.getElementById('seccion-resultados').style.display = 'block';
    let zonaTexto = document.getElementById('mostrarDatos');
    
    zonaTexto.innerHTML = `
        <p><strong>Empleado:</strong> ${nombre}</p>
        <p><strong>IBC:</strong> $${ibc.toLocaleString()}</p>
        <p><strong>Auxilio Transporte:</strong> $${auxilio.toLocaleString()}</p>
        <p><strong>Descuentos (Salud, Pensión, ARL, etc):</strong> $${deduccionesTotales.toLocaleString()}</p>
        <hr>
        <h4>TOTAL A RECIBIR: $${sueldoNeto.toLocaleString()}</h4>
    `;
}