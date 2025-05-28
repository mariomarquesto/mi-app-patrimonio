import React, { useState, useRef } from 'react';
import Header from './components/Header';
import FilterForm from './components/FilterForm';
import DataTable from './components/DataTable';
import Footer from './components/Footer';
import PdfLayout from './components/PdfLayout'; // Importa el nuevo componente PdfLayout
import './App.css';

// Importar jsPDF y html2canvas para la generación de PDF
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';

function App() {
  const [generatedTableData, setGeneratedTableData] = useState([]);
  const [lastSubmittedFormData, setLastSubmittedFormData] = useState(null);
  // Referencia para el componente PdfLayout oculto que se usará para la captura
  const pdfLayoutRef = useRef(null);

  const handleFormSubmit = (formData) => {
    console.log("Datos del formulario recibidos para añadir a la tabla:", formData);
    setLastSubmittedFormData(formData);

    // Mapea los datos del formulario a la estructura de la fila de la tabla generada
    const newRow = {
      "Rep.": formData.reparticion || '',
      "Dep.": formData.dependencia || '',
      "Hab.": formData.habitacion || '',
      "Cuenta": formData.cuentaEspecifica || '',
      "Especie": formData.especieItem || '',
      "Motivo": formData.motivo || '',
      "Estado": formData.estado || '',
      "Cantidad": formData.cantidad || '',
      "Orden": formData.orden || '',
      "Valor": formData.valor || '',
      "Origen-Mes": formData.mes || '',
      "Origen-Año": formData.anio || '',
      "NReg": formData.nReg || '1', // Por defecto '1' como en el PDF de ejemplo
      "Descripción": formData.descripcionGeneral || formData.descripcionDependencia || ''
    };

    setGeneratedTableData((prevData) => [...prevData, newRow]);
  };

  const exportPdf = () => {
    // Asegurarse de que haya datos de formulario y al menos una fila en la tabla
    // y que la referencia al PdfLayout esté disponible
    if (pdfLayoutRef.current && lastSubmittedFormData && generatedTableData.length > 0) {
      // Capturar el contenido del componente PdfLayout con html2canvas
      html2canvas(pdfLayoutRef.current, {
        scale: 3, // Aumenta la escala para una mayor resolución de la imagen (ej. 300dpi)
        useCORS: true, // Habilita el uso de CORS si hay imágenes de otros dominios
        logging: true, // Habilita el log de html2canvas en la consola
        // Establece el ancho y alto del canvas para que coincida con A4 horizontal en píxeles a la escala deseada
        // 1mm = 3.779528px (a 96dpi), pero para alta resolución, se multiplica por la escala
        width: 297 * 3.779528 * 3, // Ancho A4 en píxeles * escala
        height: 210 * 3.779528 * 3, // Alto A4 en píxeles * escala
      }).then(canvas => {
        const imgData = canvas.toDataURL('image/png'); // Obtiene la imagen en base64
        const pdf = new jsPDF('l', 'mm', 'a4'); // Inicializa jsPDF en horizontal, mm, A4
        const pdfWidth = pdf.internal.pageSize.getWidth(); // Ancho del PDF en mm (297mm)
        const pdfHeight = pdf.internal.pageSize.getHeight(); // Alto del PDF en mm (210mm)

        // Calcula las dimensiones de la imagen para que encaje en la página del PDF, manteniendo la relación de aspecto
        const imgWidth = pdfWidth;
        const imgHeight = (canvas.height * imgWidth) / canvas.width;

        let currentY = 0; // Posición Y actual en el PDF
        let remainingImgHeight = imgHeight; // Altura restante de la imagen por dibujar

        // Lógica para manejar múltiples páginas si la imagen es más grande que una página del PDF
        while (remainingImgHeight > 0) {
          // Si el contenido actual excede la altura de la página, añade una nueva página
          if (currentY >= pdfHeight) {
            pdf.addPage();
            currentY = 0; // Reinicia la posición Y para la nueva página
          }

          // Calcula la altura de la porción de imagen a dibujar en la página actual
          const heightToDraw = Math.min(remainingImgHeight, pdfHeight - currentY);
          // Calcula el desplazamiento Y dentro de la imagen original para la porción actual
          const imgSliceY = imgHeight - remainingImgHeight;

          // Añade la porción de la imagen al PDF
          pdf.addImage(
            imgData,
            'PNG',
            0, // Posición X (desde el borde izquierdo)
            currentY, // Posición Y
            imgWidth, // Ancho de la imagen en el PDF
            heightToDraw, // Alto de la porción a dibujar
            null,
            'NONE',
            0, // Origen X en la imagen capturada
            imgSliceY // Origen Y en la imagen capturada (para cortar la imagen)
          );

          remainingImgHeight -= heightToDraw; // Reduce la altura restante
          currentY += heightToDraw; // Avanza la posición Y en el PDF
        }

        pdf.save("inventario_bienes.pdf"); // Guarda el PDF
      });
    } else {
      console.warn("No hay datos de formulario o tabla para exportar a PDF. Por favor, completa el formulario y genera al menos una fila.");
    }
  };

  return (
    <div className="app-container">
      <Header />
      <FilterForm onSubmit={handleFormSubmit} />

      {generatedTableData.length > 0 && (
        <div style={{ margin: '20px 0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h3>Tabla de Datos Ingresados</h3>
          <button onClick={exportPdf}>Descargar PDF</button>
        </div>
      )}

      {generatedTableData.length > 0 ? (
        <div className="generated-table-container">
          <DataTable data={generatedTableData} />
        </div>
      ) : (
        <p style={{ textAlign: 'center', marginTop: '20px' }}>Ingresa datos en el formulario y haz click en "Generar Fila" para añadir a la tabla.</p>
      )}

      {/* Componente oculto para la generación de PDF */}
      <PdfLayout
        ref={pdfLayoutRef}
        formData={lastSubmittedFormData}
        tableData={generatedTableData}
      />

      <Footer />
    </div>
  );
}

export default App;
