function createStore () {
  // Store deve possuir 4 partes, sendo:
  // 1. O estado da aplicação (the State).
  // 2. Um método para obter o estado atual.
  // 3. Funções de monitoramento (listener functions) que serão chamadas pelo armazenador quando o estado for modificado.
  // 4. Método para alterações no estado do armazenador. (Update State)

  let state
  const listeners = []

  const getState = () => state

  const subscribe = (listener) => {
    listeners.push(listener)
    return () => {
      listeners = listeners.filter(l => l !== listener)
    }
  }

  return {
    getState,
    subscribe
  }
} 