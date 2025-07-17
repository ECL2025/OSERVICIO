// Función para emitir el PDF con jsPDF
function emitirPDF() {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF({
        orientation: 'p',
        unit: 'mm',
        format: 'a4'  // Tamaño A4 (210mm x 297mm)
    });

    const margin = 15;
    const pageWidth = doc.internal.pageSize.width;  // 210 mm para A4
    const pageHeight = doc.internal.pageSize.height; // 297 mm para A4

    // Título de la boleta
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(15);
    const textWidth1 = doc.getTextWidth('NOTA DE VENTA ELECTRONICA');
    const centerX1 = (pageWidth - textWidth1) / 2;
    doc.text('NOTA DE VENTA ELECTRONICA', centerX1, margin);

    // Agregar datos al PDF
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(12);
    doc.text(`Fecha: ${document.getElementById('fecha').value}`, margin + 5, margin + 20);
    doc.text(`Boleta Nº: ${document.getElementById('nota-venta').value}`, margin + 5, margin + 30);
    doc.text(`DNI: ${document.getElementById('dni').value}`, margin + 5, margin + 40);
    doc.text(`Nombre del Cliente: ${document.getElementById('nombre').value}`, margin + 5, margin + 50);

    // Calcular la posición horizontal para centrar el texto
    const textCenter1 = (pageWidth - doc.getTextWidth(`Empresa: ${document.getElementById('empresa').value}`)) / 2;
    const textCenter2 = (pageWidth - doc.getTextWidth(`Dirección: ${document.getElementById('direccion').value}`)) / 2;

    // Calcular la posición vertical para centrar el texto
    const verticalOffset = (pageHeight - margin) / 2;

    // Agregar texto centrado
    doc.text(`Empresa: ${document.getElementById('empresa').value}`, textCenter1, verticalOffset + 5);
    doc.text(`Dirección: ${document.getElementById('direccion').value}`, textCenter2, verticalOffset + 15);

    // Cuadro para los productos
    const productBoxHeight = 60; // Altura ajustada del cuadro
    const productBoxY = margin + 65; // Y inicial de la caja
    const productBoxWidth = pageWidth - margin * 2; // Ancho del cuadro

    // Dibuja el cuadro para los productos
    doc.setLineWidth(0.5);
    doc.rect(margin, productBoxY, productBoxWidth, productBoxHeight); // Dibuja el cuadro

    // Producto 1
    doc.text(`Producto 1: ${document.getElementById('producto1').value}`, margin + 5, productBoxY + 10);
    doc.text(`Cantidad: ${document.getElementById('cantidad1').value}`, margin + 5, productBoxY + 20);
    doc.text(`Valor Unitario: S/ ${document.getElementById('precio1').value}`, margin + 5, productBoxY + 30);
    doc.text(`Total: S/ ${document.getElementById('total1').value}`, margin + 5, productBoxY + 40);

    // Si existe un segundo producto
    if (document.getElementById('producto2').value) {
        doc.text(`Producto 2: ${document.getElementById('producto2').value}`, margin + 5, productBoxY + 45);
        doc.text(`Cantidad: ${document.getElementById('cantidad2').value}`, margin + 5, productBoxY + 55);
        doc.text(`Valor Unitario: S/ ${document.getElementById('precio2').value}`, margin + 5, productBoxY + 65);
        doc.text(`Total: S/ ${document.getElementById('total2').value}`, margin + 5, productBoxY + 75);
    }

    // Cuadro para el total general
    const totalBoxHeight = 20; // Altura del cuadro para el total
    const totalBoxY = productBoxY + productBoxHeight + 5; // Y inicial de la caja
    doc.rect(margin, totalBoxY, productBoxWidth, totalBoxHeight); // Dibuja el cuadro

    // Total general dentro del cuadro
    doc.text(`Total General: S/ ${document.getElementById('totalGeneral').value}`, margin + 5, totalBoxY + 10);

    // Cuadro para la expresión en letras
    const letrasBoxHeight = 20; // Altura del cuadro para la expresión en letras
    const letrasBoxY = totalBoxY + totalBoxHeight + 5; // Y inicial de la caja
    doc.rect(margin, letrasBoxY, productBoxWidth, letrasBoxHeight); // Dibuja el cuadro

    // Expresión en letras
    doc.text(`${document.getElementById('totalLetras').value}`, margin + 5, letrasBoxY + 10);

    // Guardar el PDF
    doc.save('boleta-de-venta.pdf');

    // Limpiar los campos del formulario después de generar el PDF
    const form = document.getElementById('boleta-form');
    form.reset();
    document.getElementById('fecha').value = new Date().toLocaleDateString(); // Mantener la fecha actual
    document.getElementById('empresa').value = ''; // Limpiar empresa
    document.getElementById('direccion').value = ''; // Limpiar dirección
    document.getElementById('totalGeneral').value = ''; // Limpiar total
    document.getElementById('totalLetras').value = ''; // Limpiar total en letras
}
