import React, {useState} from 'react';

function TelaLogin({onLogin}){
    const [idInput, setIdInput] = useState('');
    const [tipo, setTipo] = useState('aluno');

    const handleEntrar = (e) => {
        e.preventDefault();
        console.log("Tentando logar com:", idInput, tipo);

        if (!idInput) return alert("Digite um ID!");

        const usuario = {
            id: parseInt(idInput),
            tipo: tipo,
            nome: `Usuário Teste ${idInput}`
        };

        // Avisamos o App.js que alguém entrou
        onLogin(usuario);
    };

    return (
        <div style={{ 
            maxWidth: '400px', 
            margin: '50px auto', 
            padding: '20px', 
            border: '1px solid #ccc', 
            borderRadius: '8px', 
            textAlign: 'center' }}
        >
        <h2>Bem-vindo ao Sistema de Avaliação</h2>
        <p>Login</p>

        <form onSubmit={handleEntrar}>
            <div style={{marginBottom: '15px'}}>
                <label>Sou:</label>
                <select value={tipo} onChange={(e) => setTipo(e.target.value)}>
                    <option value="aluno">Aluno</option>
                    <option value="professor">Professor</option>
                </select>
            </div>

            <div style={{marginBottom: '15px'}}>
                <label>Meu Id/Matrícula</label>
                <br/>
                <input
                    type="number"
                    value={idInput}
                    onChange={(e) => setIdInput(e.target.value)}
                    placeholder={tipo === 'aluno' ? "Ex: 2025001" : "Ex: 4"}
                    style={{padding: '8px', width: '80%'}}
                />
            </div>

            <button type="submit" style={{ padding: '10px 20px', cursor: 'pointer' }}>
                Entrar
            </button>
        </form>

        <hr />
        <small style={{color: '#666'}}>
            <strong>Dica de Teste:</strong>
            Professor ID: 4 
            <br/>
            Aluno Matrícula: 2025001
        </small>
    </div>
    )
}

export default TelaLogin;