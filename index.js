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
const ADD_TODO = 'ADD_TODO'
const REMOVE_TODO = 'REMOVE_TODO'
const TOGGLE_TODO = 'TOGGLE_TODO'
const ADD_GOAL = 'ADD_GOAL'
const REMOVE_GOAL = 'REMOVE_GOAL'

//Action Creators
function addTodoAction (todo) {
  return {
    type: ADD_TODO,
    todo
  }
}

function removeTodoAction (id) {
  return {
    type: REMOVE_TODO,
    id
  }
}

function toggleTodoAction (id) {
  return {
    type: TOGGLE_TODO,
    id
  }
}

function addGoalAction (goal) {
  return {
    type: ADD_GOAL,
    goal
  }
}

function removeGoalAction (id) {
  return {
    type: REMOVE_GOAL,
    id
  }
}

//Reducer functions
function todos (state = [], action) {
  switch(action.type){
    case ADD_TODO:
      return state.concat([action.todo])
    case REMOVE_TODO:
      return state.filter(todo => todo.id !== action.id)
    case TOGGLE_TODO:
      return state.map(todo => todo.id !== action.id ? todo :
        Object.assign({}, todo, {complete: !todo.complete}))
    default :
      return state
  }  
}

function goals (state = [], action){
  switch(action.type){
    case ADD_GOAL:
      return state.concat([action.goal])
    case REMOVE_GOAL:
      return state.filter(goal => goal.id !== action.id)
    default :
      return state
  }
}

//Root reducer
function app (state = {}, action){
  return {
    todos: todos(state.todos, action),
    goals: goals(state.goals, action)
  }
}

//Code test
//Testando no console
const store = createStore(app)

store.subscribe(() => (
  console.log('The new state is: ', store.getState())
))

store.dispatch(addTodoAction({
  id: 0,
  name: 'Lavar o carro',
  complete: false,
}))

store.dispatch(addTodoAction({
  id: 1,
  name: 'Banhar o cão',
  complete: false,
}))

store.dispatch(addTodoAction({
  id: 2,
  name: 'Ir para academia',
  complete: true,
}))

store.dispatch(removeTodoAction(1))

store.dispatch(toggleTodoAction(0))

store.dispatch(addGoalAction({
  id: 0,
  name: 'Aprender Redux'
}))

store.dispatch(addGoalAction({
  id: 1,
  name: 'Aprender React Native'
}))

store.dispatch(removeGoalAction(0))