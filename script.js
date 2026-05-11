// Nombre: Mariana Leal Rojas - Documento: 1077228370

function calcularNomina() {
    // 1. Obtención de valores desde el HTML
    const nombre = document.getElementById('nombre').value;
    const edad = parseInt(document.getElementById('edad').value);
    const documento = document.getElementById('documento').value;
    const salario = parseFloat(document.getElementById('salario').value);
    const extras = parseFloat(document.getElementById('extras').value) || 0;
    const nivelRiesgo = document.getElementById('nivelRiesgo').value;

    // 2. Validaciones de Seguridad y Rango (Edge Cases del Taller)
    
    // Validar campos vacíos
    if (!nombre || isNaN(edad) || !documento || isNaN(salario)) {
        alert("Error: Todos los campos son obligatorios.");
        return;
    }

    // Validar Edad (Rango 18 - 120 años)
    if (edad < 18) {
        alert("Error: " + nombre + ", el sistema solo permite usuarios mayores de edad (18+).");
        return;
    } else if (edad > 120) {
        alert("Error: Por favor ingresa una edad válida (Máximo 120 años).");
        return;
    }

    // Validar Documento (Límite de caracteres definido en el taller)
    if (documento.length < 6 || documento.length > 10) {
        alert("Error: El número de documento debe tener entre 6 y 10 dígitos.");
        return;
    }

    // Validar Salario Negativo
    if (salario < 1) {
        alert("Error: El número ingresado debe ser mayor a 1.");
        return;
    }

    // 3. Constantes Legales para 2026
    const SALARIO_MINIMO = 1750905;
    const SUBSIDIO_TRANSPORTE = 249095;
    const VALOR_UVT = 52.37;

    // 4. Lógica de Cálculos Laborales
    let totalGanado = salario + extras;
    let ibc = totalGanado * 0.70; // Ingreso Base de Cotización (70%)

    // Cálculo de Auxilio de Transporte (Si gana 2 SMMLV o menos)
    let auxilio = (salario <= (SALARIO_MINIMO * 2)) ? SUBSIDIO_TRANSPORTE : 0;
    
    // Descuentos de Salud y Pensión (4% cada uno sobre el IBC)
    let salud = ibc * 0.04;
    let pension = ibc * 0.04;
    
    // Cálculo de ARL según nivel seleccionado
    const tarifasARL = { 
        "1": 0.00522, 
        "2": 0.01044, 
        "3": 0.02436, 
        "4": 0.04350, 
        "5": 0.06960 
    };
    let descuentoARL = ibc * tarifasARL[nivelRiesgo];

    // Totales
    let deduccionesTotales = salud + pension + descuentoARL;
    let sueldoNeto = (totalGanado + auxilio) - deduccionesTotales;

    // 5. Salida de resultados en el HTML
    const resultadoDiv = document.getElementById('resultado');
    resultadoDiv.style.display = "block"; // Hace visible el cuadro de resultado
    
    resultadoDiv.innerHTML = `
        <h2 style="color: #2c3e50; margin-top: 0;">--- RESULTADOS SIMULADOR 2026 ---</h2>
        <p><strong>Empleado:</strong> ${nombre}</p>
        <p><strong>Documento:</strong> ${documento}</p>
        <p><strong>Salario Base:</strong> $${salario.toLocaleString('es-CO')}</p>
        <p><strong>Auxilio Transporte:</strong> $${auxilio.toLocaleString('es-CO')}</p>
        <hr>
        <p><strong>IBC (70%):</strong> $${ibc.toLocaleString('es-CO')}</p>
        <p><strong>Deducciones Totales:</strong> $${deduccionesTotales.toLocaleString('es-CO')}</p>
        <h3 style="color: #27ae60;">TOTAL NETO A RECIBIR: $${sueldoNeto.toLocaleString('es-CO')}</h3>
    `;
}
