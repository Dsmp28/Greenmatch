// Espera a que todo el contenido HTML esté cargado antes de ejecutar el código
document.addEventListener("DOMContentLoaded", () => {
    // Obtiene los botones y el contenedor de resultado del DOM
    const btnMatch = document.getElementById("btnMatch");
    const btnReinicio = document.getElementById("btnReinicio");
    const resultado = document.getElementById("resultado");

    // Al iniciar, oculta el área donde se muestran los resultados
    resultado.style.display = "none";

    // Al hacer clic en “Match” (buscar coincidencia)
    btnMatch.addEventListener("click", function (e) {
        e.preventDefault(); 
        // Evita que el formulario se envíe y recargue la página

        // Lee los valores seleccionados por el usuario en el formulario
        const lugar = document.getElementById("lugar").value;
        const valor = document.getElementById("valor").value;
        const compromiso = document.getElementById("compromiso").value;

        // Utiliza PapaParse para leer el CSV de productos de forma remota
        Papa.parse("data/productos.csv", {
            download: true,   // Indica que debe descargar el archivo
            header: true,     // La primera línea contiene los nombres de columna
            complete: function (results) {
                // Busca en los datos la fila que coincida exactamente con las tres respuestas
                const fila = results.data.find(row =>
                    row["¿Dónde vivís?"].trim() === lugar &&
                    row["¿Qué valorás más?"].trim() === valor &&
                    row["¿Compromiso?"].trim() === compromiso
                );

                if (fila) {
                    // Si se encuentra una coincidencia, muestra los detalles del producto sugerido
                    document.getElementById("producto-nombre").textContent =
                        fila["Producto sugerido"];
                    document.getElementById("producto-beneficio").textContent =
                        fila["Beneficio clave"];
                    document.getElementById("producto-frase").textContent =
                        fila["Frase motivadora"];

                    // Si existe una imagen para ese producto, actualiza su fuente
                    document.getElementById("producto-img").src =
                        `images/${fila["Producto sugerido"]}.png`;

                    // Muestra el overlay de desenfoque y el área de resultados
                    document.getElementById("blur-overlay").style.display = "block";
                    resultado.style.display = "block";
                } else {
                    // Si no hay coincidencias, alerta al usuario
                    alert("No se encontró coincidencia.");
                }
            }
        });
    });

    // Al hacer clic en “Reinicio”, oculta resultados y resetea el formulario
    btnReinicio.addEventListener("click", function () {
        document.getElementById("blur-overlay").style.display = "none";
        resultado.style.display = "none";
        document.getElementById("quiz-form").reset();
    });
});
