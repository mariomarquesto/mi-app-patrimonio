// src/components/DataTable.js
import React from 'react';
import './DataTable.css';

function DataTable({ data }) {
  if (!data || data.length === 0) {
    return (
      <div className="data-table-container no-data">
        <p>No hay datos para mostrar en la tabla.</p>
      </div>
    );
  }

  const columns = Object.keys(data[0]);

  return (
    <div className="data-table-container">
      <table>
        <thead>
          <tr>
            {columns.map((col, index) => (
              // Asegúrate de que no haya espacios en blanco/saltos de línea extra aquí
              <th key={index}>{col}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {columns.map((col, colIndex) => (
                // Y aquí también
                <td key={`${rowIndex}-${colIndex}`}>{row[col]}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default DataTable;