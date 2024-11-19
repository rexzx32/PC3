import React, { useState, useEffect } from 'react';
import axios from 'axios';

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

  // Obtener la lista de embarcaciones desde la API
  useEffect(() => {
    const fetchEmbarcaciones = async () => {
      try {
        const response = await axios.get('http://localhost:8081/api/embarcaciones');
        setEmbarcaciones(response.data);
      } catch (error) {
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
      console.error('Error al crear la embarcación:', error);
    }
  };

  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <h1>Embarcación</h1>
      </header>

      <div style={styles.main}>
        {/* Sección de lista de embarcaciones */}
        <div style={styles.listSection}>
          <h2>Lista de Embarcaciones</h2>
          <ul>
            {embarcaciones.map((embarcacion) => (
              <li key={embarcacion.id} style={styles.listItem}>
                <strong>{embarcacion.nombre}</strong> - {embarcacion.capacidad} toneladas
                <p>{embarcacion.descripcion}</p>
              </li>
            ))}
          </ul>
        </div>

        {/* Sección de creación de embarcaciones */}
        <div style={styles.formSection}>
          <h2>Crear Embarcación</h2>
          <form onSubmit={handleSubmit}>
            <div>
              <label>Nombre:</label>
              <input
                type="text"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                style={styles.input}
                required
              />
            </div>
            <div>
              <label>Capacidad (toneladas):</label>
              <input
                type="number"
                value={capacidad}
                onChange={(e) => setCapacidad(e.target.value)}
                style={styles.input}
                required
              />
            </div>
            <div>
              <label>Descripción:</label>
              <textarea
                value={descripcion}
                onChange={(e) => setDescripcion(e.target.value)}
                style={styles.textarea}
                required
              />
            </div>
            <button type="submit" style={styles.button}>
              Crear
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    fontFamily: 'Arial, sans-serif',
    textAlign: 'center',
    padding: '20px',
  },
  header: {
    backgroundColor: '#f4f4f4',
    padding: '10px',
    borderRadius: '5px',
    marginBottom: '20px',
  },
  main: {
    display: 'flex',
    justifyContent: 'space-around',
    gap: '20px',
  },
  listSection: {
    width: '40%',
    border: '1px solid #ccc',
    padding: '10px',
    borderRadius: '5px',
  },
  listItem: {
    marginBottom: '10px',
    textAlign: 'left' as const,
  },
  formSection: {
    width: '40%',
    border: '1px solid #ccc',
    padding: '10px',
    borderRadius: '5px',
  },
  input: {
    width: '100%',
    padding: '5px',
    margin: '10px 0',
    borderRadius: '5px',
    border: '1px solid #ccc',
  },
  textarea: {
    width: '100%',
    padding: '5px',
    margin: '10px 0',
    borderRadius: '5px',
    border: '1px solid #ccc',
    resize: 'none' as const,
  },
  button: {
    backgroundColor: '#007BFF',
    color: '#fff',
    padding: '10px 20px',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
};

export default App;