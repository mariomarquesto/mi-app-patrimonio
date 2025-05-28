import React from "react";
import "./PdfLayout.css";

const PdfLayout = React.forwardRef(({ formData, tableData }, ref) => {
  if (!formData || !tableData || tableData.length === 0) {
    return null;
  }

  return (
    <div ref={ref} className="pdf-layout-container">
      {/* Cabecera */}
      <div className="pdf-header">
        <div className="pdf-header-left">
          <p>Contaduría General de la Provincia</p>
          <p>Departamento Patrimonial</p>
        </div>

        <h1 className="pdf-main-title">INVENTARIO DE BIENES</h1>

        <div className="pdf-header-right">
          <p>Fecha de Impresión: 12/12/2024 ............Página 1 de 1</p>
        </div>
      </div>

      {/* Datos del formulario */}
      <div className="pdf-form-data">
        <p>
          <span>Repartición:</span> {formData.reparticion || ""}{" "}
          {formData.descripcionReparticion || "DIREC EDUC SECUNDARIA"}
        </p>
        <p>
          <span>Dependencia:</span> {formData.dependencia || ""}{" "}
          {"ESCUELA DE COMERCIO N°1"}
        </p>
        <p>
          <span>Habitación:</span> {formData.habitacion || ""}{" "}
          {formData.descripcionHabitacion || "DIRECCION"}
        </p>
        <p>
          <span>Motivo:</span> {formData.motivo || ""}
        </p>
      </div>

      {/* Tabla */}
      <table className="pdf-table">
        <thead>
          <tr>
            <th>Cuenta</th>
            <th>Especie</th>
            <th>Motivo</th>
            <th>Estado</th>
            <th>Cantidad</th>
            <th>Orden</th>
            <th>Valor</th>
            <th>Mes</th>
            <th>Año</th>
            <th>Bien</th>
            <th>NR</th>
          </tr>
        </thead>
        <tbody>
          {tableData.map((row, index) => (
            <tr key={index}>
              <td>{row.Cuenta || ""}</td>
              <td>{row.Especie || ""}</td>
              <td>{row.Motivo || ""}</td>
              <td>{row.Estado || ""}</td>
              <td>{row.Cantidad || ""}</td>
              <td>{row.Orden || ""}</td>
              <td>{row.Valor || ""}</td>
              <td>{row["Origen-Mes"] || ""}</td>
              <td>{row["Origen-Año"] || ""}</td>
              <td>{row.Descripción || ""}</td>
              <td>{row.NReg || ""}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pie de página */}
      <div className="pdf-footer">
        <p>Cant. de bienes de la hab.: {tableData.length}</p>
      </div>
    </div>
  );
});

export default PdfLayout;
