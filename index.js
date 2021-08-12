const taskContainer = document.querySelector(".task__container");
let globalTaskData = [];

const saveToLocalStorage = () => // Update the localStorage
localStorage.setItem("tasky", JSON.stringify({ cards: globalTaskData }));

const generateHTML = ( taskData ) => `<div id=${taskData.id} class="col-md-6 col-lg-4 my-4">
<div class="card ">
  <div class="card-header d-flex justify-content-end gap-2">
    <button class="btn btn-outline-info"><i class="fas fa-edit"></i></button>
    <button class="btn btn-outline-danger" name=${taskData.id} onclick="deleteCard.apply(this, arguments)"><i class="fas fa-trash" name=${taskData.id}></i></button>
  </div>
  <div class="card-body">
    <img src=${taskData.image} alt="image" class="card-img">
    <h5 class="card-title mt-4">${taskData.title}</h5>
    <p class="card-text">${taskData.description}</p>
    <span class="badge bg-primary">${taskData.type}</span>
  </div>
  <div class="card-footer ">
    <button class="btn btn-outline-primary">Open Task</button>
  </div>
</div>
</div>`;

const InsertToDOM = (content) => taskContainer.insertAdjacentHTML("beforeend",content);

const addNewCard =  () => {
    //fetch task data
    const taskData = {
        id: `${Date.now()}`,
        title: document.getElementById("TaskTitle").value,
        image: document.getElementById("ImageURL").value,
        type: document.getElementById("TaskType").value,
        description: document.getElementById("TaskDesc").value,
    };

    globalTaskData.push(taskData);

    // Update the localStorage
    saveToLocalStorage();



    // Generate an HTML 
    const newCard = generateHTML(taskData);

  // Inject it to DOM
    InsertToDOM(newCard);
  // Now Clear the form
  document.getElementById("TaskTitle").value="",
  document.getElementById("ImageURL").value="",
  document.getElementById("TaskType").value="",
  document.getElementById("TaskDesc").value=""

  return;
};

const loadExistingCards = () => {
  //check local storage
  const getData = localStorage.getItem("tasky");
  
  //parse JSON data, if exist
  if (!getData) return;

  const taskCards = JSON.parse(getData);

  globalTaskData = taskCards.cards;

  globalTaskData.map((taskData) => {
  //generate HTML code for those data

  const newCard = generateHTML(taskData);

  //inject it to the DOM
    InsertToDOM(newCard);
    return;
  });
};
  const deleteCard = (event) => {
    const targetID = event.target.getAttribute("name");
    const elementType = event.target.tagName;
    const removeTask = globalTaskData.filter((task) => task.id !== targetID);
    globalTaskData = removeTask;

    // Update the localStorage
    saveToLocalStorage();

    // access DOM to remove card
    if(elementType === "BUTTON"){
      return taskContainer.removeChild(
        event.target.parentNode.parentNode.parentNode
      );
    } else {
      return taskContainer.removeChild(
        event.target.parentNode.parentNode.parentNode.parentNode
      );
    }
  };