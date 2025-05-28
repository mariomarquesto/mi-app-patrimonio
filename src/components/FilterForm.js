import React, { useState } from 'react';
import './FilterForm.css';
import itemsData from '../data/itemsData.json';

function FilterForm({ onSubmit }) {
  const [formData, setFormData] = useState({
    reparticion: '',
    descripcionReparticion: '',
    dependencia: '',
    descripcionDependencia: '',
    habitacion: '',
    descripcionHabitacion: '',
    cuentaEspecifica: '',
    checkCuentaEspecifica: false,
    motivo: '',
    checkMotivo: false,
    estado: '',
    checkEstado: false,
    cantidad: '',
    checkCantidad: false,
    orden: '',
    checkOrden: false,
    valor: '',
    checkValor: false,
    mes: '',
    checkMes: false,
    anio: '', // Campo para el año
    checkAnio: false,
    descripcionGeneral: '',
    especieItem: '',
    vidaUtil: '',
    amortizacionAnual: ''
  });

  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === 'checkbox' ? checked : value,
    }));

    if (name === 'descripcionDependencia') {
      if (value.length > 1) {
        const filteredSuggestions = itemsData.filter(item =>
          item.Descripcion &&
          typeof item.Descripcion === 'string' &&
          item.Descripcion.toLowerCase().includes(value.toLowerCase())
        );
        setSuggestions(filteredSuggestions);
        setShowSuggestions(true);
      } else {
        setSuggestions([]);
        setShowSuggestions(false);
      }
    }
  };

  const selectSuggestion = (item) => {
    console.log("Item seleccionado en selectSuggestion:", item);
    console.log("Valor de item.Especie:", item.Especie);
    console.log("Valor de item['Vida Util']:", item["Vida Util"]);
    console.log("Valor de item['Amortizacion Anual']:", item["Amortizacion Anual"]);
    console.log("Valor de item.Cuenta para Dependencia:", item.Cuenta);
    // Asumiendo que 'item' de itemsData.json puede tener una propiedad 'Año'
    console.log("Valor de item.Año (si existe):", item.Año);


    setFormData((prevData) => ({
      ...prevData,
      descripcionDependencia: item.Descripcion || '',
      dependencia: item.Cuenta || '',
      cuentaEspecifica: item.Cuenta || '',
      especieItem: item.Especie || '',
      vidaUtil: item["Vida Util"] || '',
      amortizacionAnual: item["Amortizacion Anual"] || '',
      anio: item.Año || prevData.anio // <--- AHORA ACTUALIZA EL CAMPO 'anio'
    }));
    setSuggestions([]);
    setShowSuggestions(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Datos del formulario a enviar:", formData); // <--- AÑADIDO PARA DEPURACIÓN
    onSubmit(formData);

    // Descomenta si quieres limpiar el formulario tras enviar
    setFormData({
      reparticion: '', descripcionReparticion: '', dependencia: '', descripcionDependencia: '',
      habitacion: '', descripcionHabitacion: '', cuentaEspecifica: '', checkCuentaEspecifica: false,
      motivo: '', checkMotivo: false, estado: '', checkEstado: false,
      cantidad: '', checkCantidad: false, orden: '', checkOrden: false,
      valor: '', checkValor: false, mes: '', checkMes: false, anio: '', checkAnio: false,
      descripcionGeneral: '', especieItem: '', vidaUtil: '', amortizacionAnual: ''
    });

  };

  return (
    <div className="filter-form-container">
      <form onSubmit={handleSubmit}>
        <div className="form-row">
          <label>Reparticion:</label>
          <input type="text" name="reparticion" value={formData.reparticion} onChange={handleChange} />
          <label>Descripcion:</label>
          <input type="text" name="descripcionReparticion" value={formData.descripcionReparticion} onChange={handleChange} className="description-input" />
        </div>

        <div className="form-row">
          <label>Dependencia:</label>
          <input type="text" name="dependencia" value={formData.dependencia} onChange={handleChange} />
          <label>Descripcion:</label>
          <div className="autocomplete-container">
            <input
              type="text"
              name="descripcionDependencia"
              value={formData.descripcionDependencia}
              onChange={handleChange}
              onBlur={() => setTimeout(() => setShowSuggestions(false), 100)}
              onFocus={() => { if (suggestions.length > 0) setShowSuggestions(true); }}
              className="description-input"
            />
            {showSuggestions && suggestions.length > 0 && (
              <ul className="suggestions-list">
                {suggestions.map((item) => (
                  <li
                    key={`${item.Cuenta}-${item.Especie}`}
                    onMouseDown={(e) => {
                      e.preventDefault();
                      selectSuggestion(item);
                    }}
                  >
                    {item.Descripcion}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        <div className="form-row">
          <label>Habitacion:</label>
          <input type="text" name="habitacion" value={formData.habitacion} onChange={handleChange} />
          <label>Descripcion:</label>
          <input type="text" name="descripcionHabitacion" value={formData.descripcionHabitacion} onChange={handleChange} className="description-input" />
        </div>

        <div className="form-row numbers-row">
          <label>Cuenta Específica:</label>
          <input type="text" name="cuentaEspecifica" value={formData.cuentaEspecifica} onChange={handleChange} />
          <input type="checkbox" name="checkCuentaEspecifica" checked={formData.checkCuentaEspecifica} onChange={handleChange} />

          <label>Motivo:</label>
          <input type="number" name="motivo" value={formData.motivo} onChange={handleChange} />
          <input type="checkbox" name="checkMotivo" checked={formData.checkMotivo} onChange={handleChange} />

          <label>Estado:</label>
          <input type="number" name="estado" value={formData.estado} onChange={handleChange} />
          <input type="checkbox" name="checkEstado" checked={formData.checkEstado} onChange={handleChange} />

          <label>Cantidad:</label>
          <input type="number" name="cantidad" value={formData.cantidad} onChange={handleChange} />
          <input type="checkbox" name="checkCantidad" checked={formData.checkCantidad} onChange={handleChange} />

          <label>Orden:</label>
          <input type="number" name="orden" value={formData.orden} onChange={handleChange} />
          <input type="checkbox" name="checkOrden" checked={formData.checkOrden} onChange={handleChange} />

          <label>Valor:</label>
          <input type="number" name="valor" value={formData.valor} onChange={handleChange} />
          <input type="checkbox" name="checkValor" checked={formData.checkValor} onChange={handleChange} />

          <label>Mes:</label>
          <input type="number" name="mes" value={formData.mes} onChange={handleChange} />
          <input type="checkbox" name="checkMes" checked={formData.checkMes} onChange={handleChange} />

          <label>Año:</label>
          <input type="number" name="anio" value={formData.anio} onChange={handleChange} />
          <input type="checkbox" name="checkAnio" checked={formData.checkAnio} onChange={handleChange} />
        </div>

        <div className="form-row">
          <label>Especie:</label>
          <input type="text" name="especieItem" value={formData.especieItem} onChange={handleChange} readOnly />
          <label>Vida Útil:</label>
          <input type="text" name="vidaUtil" value={formData.vidaUtil} onChange={handleChange} readOnly />
          <label>Amortización Anual:</label>
          <input type="text" name="amortizacionAnual" value={formData.amortizacionAnual} onChange={handleChange} readOnly />
        </div>

        <div className="form-row">
          <label>Descripción General:</label>
          <textarea name="descripcionGeneral" value={formData.descripcionGeneral} onChange={handleChange} rows={3} />
        </div>

        <div className="form-row">
          <button type="submit">Generar Fila y Añadir a Tabla</button>
        </div>
      </form>
    </div>
  );
}

export default FilterForm;