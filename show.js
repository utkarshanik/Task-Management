let id2='';
  const taskOwner = document.getElementById('inputtask');
  const taskName = document.getElementById('inputtaskname');
  const description = document.getElementById('desc');
  const startDate = document.getElementById('startdate');
  const endDate = document.getElementById('enddate');
  const dueDate = document.getElementById('duedate');
  const priority = document.getElementById('inputpriority');
  const statu = document.getElementById('inputstatus');

  document.addEventListener('DOMContentLoaded',async function() {
    try
    {
        let response = await fetch('http://localhost:5000/api/task/view')
        let data= await response.json()
        const tableBody = document.querySelector('.showdata');
        tableBody.innerHTML = ''; // Clear any existing rows
  
        data.forEach((task, index) => {
          tableBody.innerHTML+=
          ` <tr>
            <th scope="row">${index+1}</th>
            <td>${task.task_owner}</td>
            <td>${task.task_name}</td>
            <td>${task.task_detail}</td>
            <td>${task.start_date}</td>
            <td>${task.end_date}</td>
            <td>${task.reminder}</td>
            <td>${task.priority}</td>
            <td>${task.status}</td>
            <td><button type="button" class="btn btn-success btn-update"  data-bs-toggle="modal" data-updateid=${task.task_id} data-bs-target="#staticBackdrop">Update</button></td>

            <td> <button class="btn btn-danger btn-delete " data-deleteid=${task.task_id} type="button">Delete</button></td>
            </tr> `;
          });
          // <td> <button class="btn btn-success btn-update" data-updateid=${task.task_id} type="button">Update</button></td>

        //Delete The task
        let del= document.querySelectorAll(".btn-delete");
        // console.log(del)
        
        del.forEach((item)=>{
          item.addEventListener('click',async()=>{
           const  TASK_id= {id:item.dataset.deleteid}
           let response = await fetch('http://localhost:5000/api/task/delete',{
              method:'DELETE',
              headers:{
                'Content-Type':'Application/json',
              },
              body:JSON.stringify(TASK_id)
           })

           let data= await response.json();
           console.log(data);

          })
        })
      
      //Showing data to Update the task 
       let upd= document.querySelectorAll(".btn-update")
        upd.forEach((item)=>{
          item.addEventListener('click',async()=>{
              let upid={id:item.dataset.updateid}
              console.log(upid);
              let response= await fetch('http://localhost:5000/api/task/updateShow',{
                method:'POST',
                headers:{
                  'Content-Type':'Application/json',
                },
                body:JSON.stringify(upid)
              })

              let [data]= await response.json();
              console.log(data,typeof data);

              function date_change(start_date, type = 'date') {
                const rawDate = new Date(start_date);
                
                if (type === 'datetime-local') {
                  // Format to 'YYYY-MM-DDTHH:MM' for datetime-local input
                  const formattedDateTimeLocal = rawDate.toISOString().slice(0, 16);
                  console.log(formattedDateTimeLocal);
                  return formattedDateTimeLocal;
                } else {
                  // Default to 'YYYY-MM-DD' for date input
                  const formattedDate = rawDate.toISOString().split('T')[0];
                  console.log(formattedDate);
                  return formattedDate;
                }
              }

              taskOwner.value=`${data.task_owner}`;
              taskName.value=`${data.task_name}`;
              description.value=`${data.task_detail}`;
              startDate.value=`${date_change(data.start_date)}`;              
              endDate.value=`${date_change(data.end_date)}`;
              dueDate.value=`${date_change(data.reminder,'datetime-local')}`;
              priority.value=`${data.priority}`;
              statu.value=`${data.status}`;

              
              //  let a= document.querySelector('.sub');
              //  a.addEventListener('click',async()=>{
                //   let response= fetch(` `,)
                //  })
                // let task_id=`${data.task_id}`
                // console.log(task_id);
              
                id2=`${data.task_id}`;
                console.log(id2);  
                
                document.getElementById('taskForm').addEventListener('submit', async (event)=>{
                  event.preventDefault();

                  const taskOwner = document.getElementById('inputtask').value;
                  const taskName = document.getElementById('inputtaskname').value;
                  const description = document.getElementById('desc').value;
                  const startDate = document.getElementById('startdate').value;
                  const endDate = document.getElementById('enddate').value;
                  const dueDate = document.getElementById('duedate').value;
                  const priority = document.getElementById('inputpriority').value;
                  const status = document.getElementById('inputstatus').value;

              const taskData = {
                id:id2,
                task_owner: taskOwner,
                task_name: taskName,
                task_detail: description,
                start_date: startDate,
                end_date: endDate,
                reminder: dueDate,
                priority: priority,
                status: status
              };

              let response = await fetch(`http://localhost:5000/api/task/updatedata`,
                {
                  method:'PUT',
                  headers:{
                    'Content-Type':'application/json'
                  },
                  body:JSON.stringify(taskData)
                })

                let data = await response.json()
                console.log('Success:', data);

             } )
             
          })
        })
    }
    catch(error)
    {
      console.error('Error fetching data:', error);
    }
    });
  

