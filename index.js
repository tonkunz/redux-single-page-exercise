//Library Code
function createStore (reducer) {
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

  const dispatch = (action) => {
    state = reducer(state, action)
    listeners.forEach(listener => listener())
  }

  //Return a object
  return {
    getState,
    subscribe,
    dispatch
  }
}

//App Code
//Função Reducer
function todos (state = [], action) {
  switch(action.type){
    case 'ADD_TODO':
      return state.concat([action.todo])
    case 'REMOVE_TODO':
      return state.filter(todo => todo.id !== action.id)
    case 'TOGGLE_TODO':
      return state.map(todo => todo.id !== action.id) ? todo :
        Object.assign({}, todo, {complete: !todo.complete}))
    default :
      return state
  }  
}

//Code test
//Testando no console
const store = createStore(todos)

store.subscribe(() => (
  console.log('The new state is: ', store.getState())
))

store.dispatch({
  type : 'ADD_TODO',
  todo : {
    id: 0,
    name: 'Learn Redux',
    complete : false
  }
})