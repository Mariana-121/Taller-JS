// Nombre: Mariana Leal Rojas - Documento: 1077228370

function calcularNomina() {
    // 1. Captura de datos
    const nombre = document.getElementById('nombre').value;
    const edad = parseInt(document.getElementById('edad').value);
    const salario = parseFloat(document.getElementById('salario').value);
    const extras = parseFloat(document.getElementById('extras').value) || 0;
    const nivelRiesgo = document.getElementById('nivelRiesgo').value;

    // 2. Validaciones (Edge Cases)
    if (!nombre || !salario || !edad) {
        alert("Por favor, completa los campos obligatorios.");
        return;
    }

    if (salario < 0 || extras < 0) {
        alert("Los valores numéricos deben ser mayores a 0.");
        return;
    }

    if (edad < 18) {
        alert("Lo siento " + nombre + ", eres menor de edad.");
        return;
    }

    // 3. Constantes 2026
    const SALARIO_MINIMO = 1750905;
    const SUBSIDIO_TRANSPORTE = 249095;
    const VALOR_UVT = 52.37;

    // 4. Cálculos
    let totalGanado = salario + extras;
    let ibc = totalGanado * 0.70; 

    let auxilio = (salario <= (SALARIO_MINIMO * 2)) ? SUBSIDIO_TRANSPORTE : 0;
    
    let salud = ibc * 0.04;
    let pension = ibc * 0.04;
    
    // Cálculo ARL según nivel
    let tarifasARL = { "1": 0.00522, "2": 0.01044, "3": 0.02436, "4": 0.04350, "5": 0.06960 };
    let descuentoARL = ibc * (tarifasARL[nivelRiesgo] || 0);

    let deducciones = salud + pension + descuentoARL;
    let neto = (totalGanado + auxilio) - deducciones;

    // 5. Mostrar resultado
    document.getElementById('resultado').innerHTML = `
        <strong>--- RESULTADOS NOMINA 2026 ---</strong>
        Empleado: ${nombre}
        Salario Base: $${salario.toLocaleString()}
        Auxilio Transporte: $${auxilio.toLocaleString()}
        Deducciones (Salud, Pensión, ARL): $${deducciones.toLocaleString()}
        <strong>TOTAL NETO A RECIBIR: $${neto.toLocaleString()}</strong>
    `;
}
