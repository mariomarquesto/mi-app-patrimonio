import React, { useState, useRef } from 'react';
import Header from './components/Header';
import FilterForm from './components/FilterForm';
import DataTable from './components/DataTable';
import Footer from './components/Footer';
import './App.css';

// Para la exportación a PDF
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

function App() {
  const [generatedTableData, setGeneratedTableData] = useState([]);
  const [lastSubmittedFormData, setLastSubmittedFormData] = useState(null);
  const tableRef = useRef(null);

  const handleFormSubmit = (formData) => {
    console.log("Datos del formulario recibidos para añadir a la tabla:", formData);
    setLastSubmittedFormData(formData);

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
      "NReg": 'GENERADO',
      "Descripción": formData.descripcionGeneral || formData.descripcionDependencia || ''
    };

    setGeneratedTableData((prevData) => [...prevData, newRow]);
  };

  const exportPdf = () => {
    if (tableRef.current && lastSubmittedFormData) {
      const pdf = new jsPDF('l', 'mm', 'a4'); // Orientación horizontal
      const margin = 15;
      let yOffset = margin;

      pdf.setFontSize(18);
      pdf.text("INVENTARIO DE BIENES", pdf.internal.pageSize.getWidth() / 2, yOffset, { align: 'center' });
      yOffset += 10;

      pdf.setFontSize(12);
      pdf.text("Contaduria General de la Provincia Departamento Patrimonial", pdf.internal.pageSize.getWidth() / 2, yOffset, { align: 'center' });
      yOffset += 15;

      pdf.setFontSize(10);
      
      // Construcción de la línea de Reparticion
      let reparticionText = `Reparticion: ${lastSubmittedFormData.reparticion || ''}`;
      if (lastSubmittedFormData.descripcionReparticion) {
        reparticionText += ` ${lastSubmittedFormData.descripcionReparticion}`;
      }
      pdf.text(reparticionText, margin, yOffset);
      yOffset += 7;

      // Construcción de la línea de Dependencia
      let dependenciaText = `Dependencia: ${lastSubmittedFormData.dependencia || ''}`;
      if (lastSubmittedFormData.descripcionDependencia) {
        dependenciaText += ` ${lastSubmittedFormData.descripcionDependencia}`;
      }
      pdf.text(dependenciaText, margin, yOffset);
      yOffset += 7;

      // Construcción de la línea de Habitacion
      let habitacionText = `Habitacion: ${lastSubmittedFormData.habitacion || ''}`;
      if (lastSubmittedFormData.descripcionHabitacion) {
        habitacionText += ` ${lastSubmittedFormData.descripcionHabitacion}`;
      }
      pdf.text(habitacionText, margin, yOffset);
      yOffset += 7;
      
      // Línea de Motivo
      pdf.text(`Motivo: ${lastSubmittedFormData.motivo || ''}`, margin, yOffset);
      yOffset += 15;

      // Descripción General antes de la tabla
      pdf.text(`Descripción: ${lastSubmittedFormData.descripcionGeneral || ''}`, margin, yOffset);
      yOffset += 10;

      html2canvas(tableRef.current, {
        scale: 2,
        useCORS: true,
        logging: true,
      }).then(canvas => {
        const imgData = canvas.toDataURL('image/png');
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = pdf.internal.pageSize.getHeight();

        const imgWidth = pdfWidth - 2 * margin;
        const imgHeight = canvas.height * imgWidth / canvas.width;

        let currentImgY = yOffset;
        let remainingImgHeight = imgHeight;

        while (remainingImgHeight > 0) {
          if (currentImgY >= pdfHeight - margin) {
            pdf.addPage();
            currentImgY = margin;
          }

          const heightToDraw = Math.min(remainingImgHeight, pdfHeight - currentImgY - margin);
          const imgSliceY = imgHeight - remainingImgHeight;

          pdf.addImage(
            imgData,
            'PNG',
            margin,
            currentImgY,
            imgWidth,
            heightToDraw,
            null,
            'NONE',
            0,
            0,
            imgSliceY
          );

          remainingImgHeight -= heightToDraw;
          currentImgY += heightToDraw;
        }

        pdf.save("inventario_bienes.pdf");
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
        <div ref={tableRef} className="generated-table-container">
          <DataTable data={generatedTableData} />
        </div>
      ) : (
        <p style={{ textAlign: 'center', marginTop: '20px' }}>Ingresa datos en el formulario y haz click en "Generar Fila" para añadir a la tabla.</p>
      )}

      <Footer />
    </div>
  );
}

export default App;
