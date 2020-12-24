import React, { useState, useEffect } from "react";

import api from "./services/api";

import "./styles.css";

function App() {
  const [projects, setProjects] = useState([]);
  const [url, setUrl] = useState("");
  const [title, setTitle] = useState("");
  const [techs, setTechs] = useState("");

  useEffect(() => {
    api.get('repositories').then(({ data }) => {
      setProjects(data);
    });
  }, []);

  async function handleAddRepository() {
    try {
      const { data } = await api.post('repositories', {
        url,
        title,
        techs: techs.split(" "),
      });
      setProjects([...projects, data]);
    } catch (err) {
      console.log(err);
    }
  }

  async function handleRemoveRepository(id) {
    try {
      await api.delete(`repositories/${id}`);
      setProjects(projects.filter(project => project.id !== id));
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div>
      <div>
        <input label="url" value={url} onChange={(e) => setUrl(e.target.value)} />
        <input label="title" value={title} onChange={(e) => setTitle(e.target.value)} />
        <input label="techs" value={techs} onChange={(e) => setTechs(e.target.value)} />
        <button onClick={handleAddRepository}>Adicionar</button>
      </div>
      <ul data-testid="repository-list">
        {
          projects.map(project => (
            <li key={String(project.id)}>
              {project.title}

              <button onClick={() => handleRemoveRepository(project.id)}>
                Remover
              </button>
            </li>
          ))
        }
      </ul>
    </div>
  );
}

export default App;
