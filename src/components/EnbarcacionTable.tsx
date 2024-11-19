
import React from "react";
import { Embarcacion } from "../types"; 

// Definimos las propiedades que recibirá este componente
interface EmbarcacionTableProps {
  // Lista de embarcaciones
  embarcaciones: Embarcacion[]; // Lista de embarcaciones a mostrar
  onEdit: (embarcacion: Embarcacion) => void; // Función cuando se edite
  onDelete: (id: number) => void; // Función para eliminar una embarcación
}

// Definimos el componente EmbarcacionTable
const EmbarcacionTable: React.FC<EmbarcacionTableProps> = ({
  embarcaciones,
  onEdit,
  onDelete,
}) => {
  return (
    <table
      border={1}
      cellPadding={10}
      cellSpacing={0}
      style={{ width: "100%", textAlign: "center" }}
    >
      <thead>
        <tr>
          <th>Id</th>
          <th>Nombre</th>
          <th>Capacidad</th>
          <th>Descripción</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        {embarcaciones.map((embarcacion) => (
          <tr key={embarcacion.id}>
            {/* Muestra cada campo de la embarcación en una celda */}
            <td>{embarcacion.id}</td>
            <td>{embarcacion.nombre}</td>
            <td>{embarcacion.capacidad}</td>
            <td>{embarcacion.descipcion}</td>
            <td>
              {/* Botones para editar y eliminar */}
              <button onClick={() => onEdit(embarcacion)} style={{ marginRight: "10px" }}>
                Editar
              </button>
              <button onClick={() => onDelete(embarcacion.id)}>Eliminar</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

// Exportamos el componente para su uso en otros archivos
export default EmbarcacionTable;
