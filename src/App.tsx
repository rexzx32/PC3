import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

interface Embarcacion {
  id: number;
  nombre: string;
  capacidad: number;
  descripcion: string;
}

const App: React.FC = () => {
  const [embarcaciones, setEmbarcaciones] = useState<Embarcacion[]>([]);
  const [nombre, setNombre] = useState('');
  const [capacidad, setCapacidad] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [error, setError] = useState<string | null>(null);

  // Obtener la lista de embarcaciones desde la API
  useEffect(() => {
    const fetchEmbarcaciones = async () => {
      try {
        const response = await axios.get('http://localhost:8081/api/embarcaciones');
        setEmbarcaciones(response.data);
      } catch (error) {
        setError('Error al obtener embarcaciones');
        console.error('Error al obtener embarcaciones:', error);
      }
    };

    fetchEmbarcaciones();
  }, []);

  // Manejar el envío del formulario para crear una nueva embarcación
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const nuevaEmbarcacion = {
      nombre,
      capacidad: Number(capacidad),
      descripcion,
    };

    try {
      await axios.post('http://localhost:8081/api/embarcaciones', nuevaEmbarcacion);
      alert('Embarcación creada exitosamente');

      // Actualizar la lista de embarcaciones después de crear una nueva
      setEmbarcaciones([...embarcaciones, { id: Date.now(), ...nuevaEmbarcacion }]);

      // Limpiar los campos del formulario
      setNombre('');
      setCapacidad('');
      setDescripcion('');
    } catch (error) {
      setError('Error al crear la embarcación');
      console.error('Error al crear la embarcación:', error);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await axios.delete(`http://localhost:8081/api/embarcaciones/${id}`);
      setEmbarcaciones((prevEmbarcaciones) =>
        prevEmbarcaciones.filter((embarcacion) => embarcacion.id !== id)
      );
      alert('Embarcación eliminada correctamente');
    } catch (error) {
      setError('Error al eliminar la embarcación');
      console.error('Error al eliminar la embarcación:', error);
      alert('Hubo un problema al eliminar la embarcación.');
    }
  };

  return (
    <div className="container py-4">
      <header className="bg-success text-white text-center py-3 rounded mb-4">
        <h1>Embarcación</h1>
      </header>

      <div className="row">
        {error && <div className="alert alert-danger">{error}</div>}
        {/* Sección de lista de embarcaciones */}
        <div className="col-md-6 mb-4">
          <h2>Lista de Embarcaciones</h2>
          <table className="table table-striped">
            <thead className="thead-dark">
              <tr>
                <th>Nombre</th>
                <th>Capacidad (toneladas)</th>
                <th>Descripción</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {embarcaciones.map((embarcacion) => (
                <tr key={embarcacion.id}>
                  <td>{embarcacion.nombre}</td>
                  <td>{embarcacion.capacidad}</td>
                  <td>{embarcacion.descripcion}</td>
                  <td>
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => handleDelete(embarcacion.id)}
                    >
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Sección de creación de embarcaciones */}
        <div className="col-md-6">
          <h2>Crear Embarcación</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Nombre:</label>
              <input
                type="text"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                className="form-control"
                required
              />
            </div>
            <div className="form-group">
              <label>Capacidad (toneladas):</label>
              <input
                type="number"
                value={capacidad}
                onChange={(e) => setCapacidad(e.target.value)}
                className="form-control"
                required
              />
            </div>
            <div className="form-group">
              <label>Descripción:</label>
              <textarea
                value={descripcion}
                onChange={(e) => setDescripcion(e.target.value)}
                className="form-control"
                required
              />
            </div>
            <button type="submit" className="btn btn-success">
              Crear
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default App;