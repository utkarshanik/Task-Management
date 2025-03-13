  document.addEventListener('DOMContentLoaded',async function() {
    try
    {
        let response = await fetch('http://localhost:5000/api/task/view')
        let data= await response.json()
        const tableBody = document.querySelector('.showdata');
        tableBody.innerHTML = ''; // Clear any existing rows
  
        data.forEach((task, index) => {
          tableBody.innerHTML+=
          `
          <tr>
            <th scope="row">${index+1}</th>
            <td>${task.task_owner}</td>
            <td>${task.task_name}</td>
            <td>${task.task_detail}</td>
            <td>${task.start_date}</td>
            <td>${task.end_date}</td>
            <td>${task.reminder}</td>
            <td>${task.priority}</td>
            <td>${task.status}</td>
            <td> <button class="btn btn-success" type="button">Update</button></td>
            <td> <button class="btn btn-danger" type="button">Delete</button></td>
            </tr> `;
        });
    }
    catch(error)
    {
      console.error('Error fetching data:', error);
    }
    });
  

