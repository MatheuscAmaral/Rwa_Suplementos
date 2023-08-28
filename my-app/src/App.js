import './App.css';

function App() {
  const name = 'Matheus'

  const newName = name.toUpperCase()

  return (
    <div className="App">
      <h1>Olá, {name}</h1>
      <p>Meu {newName}</p>
      <p>soma: {2 + 2}</p>
    </div>
  );
}

export default App;
