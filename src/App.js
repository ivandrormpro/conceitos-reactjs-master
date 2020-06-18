import React, { useState, useEffect } from 'react';
import Repository from './components/Repository';

import "./styles.css";
import api from './services/api';

function App() {

  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    api.get('repositories').then(response => {
      setRepositories(response.data);
    })
  }, []);

  async function handleAddRepository() {

    const response = await api.post('repositories', {
      title: 'Front-end com React',
      owner: 'Diego Silva',
      url: 'http://books.com',
      techs: ["Mecanica", "Electronica"],
      likes: 13
    });

    const repository = response.data;

    setRepositories([...repositories, repository]);
  }

  async function handleRemoveRepository(id) {
    try {
      const response = await api.delete(`repositories/${id}`);
      setRepositories(repositories.filter(item => item.id !== id));
    } catch (e) {
      console.log(`Nao existe objecto com o id : ${id}`);
    }
  }

  return (
    <>
      <Repository title='Repositorios da minha API' />
      <ul data-testid="repository-list">
        {repositories.map(repository =>
          <li key={repository.id}>
            {repository.title}
            <button type="button" onClick={() => handleRemoveRepository(repository.id)}>
              Remover
                </button>
          </li>)
        }
      </ul>
      <button type="button" onClick={handleAddRepository}>
        Adicionar
    </button>
    </>
  );
}

export default App;