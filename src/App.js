import React, { useEffect, useState, useCallback } from 'react';

import Tasks from './components/Tasks/Tasks';
import NewTask from './components/NewTask/NewTask';
import Section from './components/UI/Section';
import useHttp from './hooks/use-http';

function App() {
  const [tasks, setTasks] = useState([]);
  
  const {isLoading, error, sendRequest: fetchTasks } = useHttp();

  useEffect(() => {
    const transformTasks = ((tasksObj) => {
      const loadedTasks = [];
  
        for (const taskKey in tasksObj) {
          loadedTasks.push({ id: taskKey, text: tasksObj[taskKey].text });
        }
  
        setTasks(loadedTasks);
    });
    fetchTasks({url: 'https://react-http-45535-default-rtdb.firebaseio.com/tasks.json'},transformTasks);
  }, [fetchTasks]);

  const taskAddHandler = (task) => {
    setTasks((prevTasks) => prevTasks.concat(task));
  };

  const deleteHandler = async () => {
    const response = await fetch(
      'https://react-http-45535-default-rtdb.firebaseio.com/tasks.json',{
        method : 'DELETE'
      }
    );
  }

  return (
    <React.Fragment>
      <NewTask onAddTask={taskAddHandler} />
      <Section>
        <button onClick={deleteHandler}>Delete Database</button>
      </Section>
      <Tasks
        items={tasks}
        loading={isLoading}
        error={error}
        onFetch={fetchTasks}
      />
    </React.Fragment>
  );
}

export default App;
