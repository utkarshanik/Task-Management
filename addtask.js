document.getElementById('taskForm').addEventListener('submit', async (event)=>{
  event.preventDefault();
   AddData();
} )

export  async function AddData() {
    
  const taskOwner = document.getElementById('inputtask').value;
  const taskName = document.getElementById('inputtaskname').value;
  const description = document.getElementById('desc').value;
  const startDate = document.getElementById('startdate').value;
  const endDate = document.getElementById('enddate').value;
  const dueDate = document.getElementById('duedate').value;
  const priority = document.getElementById('inputpriority').value;
  const status = document.getElementById('inputstatus').value;
  
  console.log(dueDate,priority,status,endDate,startDate)

  const taskData = {
    task_owner: taskOwner,
    task_name: taskName,
    task_detail: description,
    start_date: startDate,
    end_date: endDate,
    reminder: dueDate,
    priority: priority,
    status: status
  };

  async function AddTask(taskData) {
let response= await fetch('http://localhost:5000/api/task/add', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(taskData)
  })

  let data = await response.json()
  console.log('Success:', data);

}
AddTask(taskData)
}



