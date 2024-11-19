import React, { useState, useEffect } from "react";
import { Embarcacion } from "../types"; 


interface EmbarcacionFormProps {
  
  onSubmit: (embarcacion: Embarcacion | Omit<Embarcacion, "id">) => void;
  initialData?: Embarcacion;
  onCancel?: () => void;
}

const EmbarcacionForm: React.FC<EmbarcacionFormProps> = ({
  onSubmit,
  initialData,
  onCancel,
}) => {
 
  const [nombre, setNombre] = useState(initialData?.nombre || ""); // Estado para el nombre
  const [capacidad, setCapacidad] = useState(initialData?.capacidad || 0); // Estado para la capacidad
  const [descripcion, setDescripcion] = useState(initialData?.descipcion || ""); // Estado para la descripción

  
  useEffect(() => {
    if (initialData) {
      setNombre(initialData?.nombre || "");
      setCapacidad(initialData?.capacidad || 0);
      setDescripcion(initialData?.descipcion || "");
    } else {
      setNombre("");
      setCapacidad(0);
      setDescripcion("");
    }
  }, [initialData]);

  const handleSubmit = (e: React.FormEvent) => {
   
    e.preventDefault();
   
    console.log({
        id: initialData?.id, // Asegúrate de que no sea undefined
        nombre: nombre,
        capacidad: capacidad,
        descipcion: descripcion,
    });
    
    onSubmit({
      id: initialData?.id,
      nombre: nombre,
      capacidad: capacidad,
      descipcion: descripcion,
    });
    
    if (!initialData) {
      setNombre("");
      setCapacidad(0);
      setDescripcion("");
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: "20px" }}>
      {/* Título del formulario que cambia según si se está editando o creando */}
      <h2>{initialData ? "Editar Embarcación" : "Crear Embarcación"}</h2>
      
      {/* Campo de texto para el nombre */}
      <input
        type="text"
        placeholder="Nombre de la embarcación"
        value={nombre}
        onChange={(e) => setNombre(e.target.value)}
        required
        style={{ marginBottom: "10px", marginRight: "10px" }}
      />

      {/* Campo numérico para la capacidad */}
      <input
        type="number"
        placeholder="Capacidad (toneladas)"
        value={capacidad}
        onChange={(e) => setCapacidad(Number(e.target.value))}
        required
        min={0}
        style={{ marginBottom: "10px", marginRight: "10px" }}
      />

      {/* Campo de texto para la descripción */}
      <textarea
        placeholder="Descripción de la embarcación"
        value={descripcion}
        onChange={(e) => setDescripcion(e.target.value)}
        style={{ marginBottom: "10px", marginRight: "10px", width: "100%" }}
      />

      {/* Botones para guardar y cancelar */}
      <button type="submit" style={{ marginRight: "10px" }}>
        {initialData ? "Actualizar" : "Crear"}
      </button>

      {initialData && onCancel && (
        <button type="button" onClick={onCancel}>
          Cancelar
        </button>
      )}
    </form>
  );
};

export default EmbarcacionForm;
