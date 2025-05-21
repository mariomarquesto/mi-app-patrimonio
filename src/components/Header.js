import React from 'react';
import './Header.css'; // Asegúrate de crear este archivo CSS para estilos

function Header() {
  return (
    <div className="header-container">
      <h2>Carga de Novedades PATRIMONIO</h2>
      <div className="header-buttons">
        <button>Imprimir</button>
        <button>Exportar a txt</button>
        <button>Marcar Todos</button>
        <button>Desmarcar Todos</button>
        <input type="text" placeholder="Rep." />
        <input type="text" placeholder="Dep." />
        <input type="text" placeholder="Hab." />
      </div>
    </div>
  );
}

export default Header;