document.addEventListener("DOMContentLoaded", () => {
    const btnMatch = document.getElementById("btnMatch");
    const btnReinicio = document.getElementById("btnReinicio");
    const resultado = document.getElementById("resultado");

    // Ocultar la tarjeta al inicio
    resultado.style.display = "none";

    btnMatch.addEventListener("click", function (e) {
        e.preventDefault(); // Evita que el formulario recargue la página

        const lugar = document.getElementById("lugar").value;
        const valor = document.getElementById("valor").value;
        const compromiso = document.getElementById("compromiso").value;

        Papa.parse("data/productos.csv", {
            download: true,
            header: true,
            complete: function (results) {
                const fila = results.data.find(row =>
                    row["¿Dónde vivís?"].trim() === lugar &&
                    row["¿Qué valorás más?"].trim() === valor &&
                    row["¿Compromiso?"].trim() === compromiso
                );

                if (fila) {
                    document.getElementById("producto-nombre").textContent = fila["Producto sugerido"];
                    document.getElementById("producto-beneficio").textContent = fila["Beneficio clave"];
                    document.getElementById("producto-frase").textContent = fila["Frase motivadora"];

                    // Imagen opcional
                    document.getElementById("producto-img").src = `images/${fila["Producto sugerido"]}.png`;

                    document.getElementById("blur-overlay").style.display = "block";
                    resultado.style.display = "block";

                } else {
                    alert("No se encontró coincidencia.");
                }
            }
        });
    });

    btnReinicio.addEventListener("click", function () {
        document.getElementById("blur-overlay").style.display = "none";
        resultado.style.display = "none";
        document.getElementById("quiz-form").reset();
    });
});
