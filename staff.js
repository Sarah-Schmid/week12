let form = $("#form")[0];
let textInput = $("#textInput")[0];
let dateInput = $("#dateInput")[0];
let textarea = $("#jobInput")[0];
let msg = $("#msg")[0];
let staff = $("#staff")[0];
let add = $("#add")[0];
let file = $("#avatar")[0];

form.addEventListener("submit", (e) => {
  e.preventDefault();
  formValidation();
});

let formValidation = () => {
  if (textInput.value === "") {
    console.log("failure");
    msg.innerHTML = "No staff member entered";
  } else {
    console.log("success");
    msg.innerHTML = "";
    acceptData();
    add.setAttribute("data-bs-dismiss", "modal");
    add.click();

    (() => {
      add.setAttribute("data-bs-dismiss", "");
    })();
  }
};

let data = [{}];

let acceptData = () => {
  data.push({
    text: textInput.value,
    date: dateInput.value,
    description: jobInput.value,
    file: avatar.value,
  });

  localStorage.setItem("data", JSON.stringify(data));

  console.log(data);
  createStaff();
};

let createStaff = () => {
  staff.innerHTML = "";
  data.map((x, y) => {
    return (staff.innerHTML += `
    <div id=${y}>
          <span class="fw-bold">${x.text}</span>
          <span class="small text-secondary">${x.date}</span>
          <p>${x.description}</p>
        <img>${x.file}</img>
          <span class="options">
            <i onClick= "editStaffMember(this)" data-bs-toggle="modal" data-bs-target="#form" class="fas fa-edit"></i>
            <i onClick ="deleteStaffMember(this);createStaff()" class="fas fa-trash-alt"></i>
          </span>
        </div>
    `);
  });

  resetForm();
};

let deleteStaffMember = (e) => {
  e.parentElement.parentElement.remove();
  data.splice(e.parentElement.parentElement.id, 1);
  localStorage.setItem("data", JSON.stringify(data));
  console.log(data);
};

let editStaffMember = (e) => {
  let selectedStaffMember = e.parentElement.parentElement;

  textInput.value = selectedStaffMember.children[0].innerHTML;
  dateInput.value = selectedStaffMember.children[1].innerHTML;
  textarea.value = selectedStaffMember.children[2].innerHTML;

  deleteStaffMember(e);
};

let resetForm = () => {
  textInput.value = "";
  dateInput.value = "";
  textarea.value = "";
  file.value = "";
};

(() => {
  data = JSON.parse(localStorage.getItem("data")) || [];
  console.log(data);
  createStaff();
})();
