async function fetchData() {
  try {
    const res = await fetch(
      "https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json"
    );
    const data = await res.json();
    return data;
  } catch (error) {
    console.error(error);
  }
}

function injectToDom(list) {
  const memberListDOM = document.getElementById("member-section");
  while (memberListDOM.hasChildNodes()) {
    memberListDOM.removeChild(memberListDOM.firstChild);
  }

  const table = document.createElement("table");
  table.classList = "table table-hover data";
  table.id = "catTable";
  table.innerHTML = `
                <thead>
                    <tr>
                        <th scope="col"><input class="form-check-input" type="checkbox" value="" onchange="allChecked(this)"></th>
                        <th scope="col">${capitalizeFirstLetter(
                          list.length > 0 ? Object.keys(list[0])[1] : "Name"
                        )}</th>
                        <th scope="col">${capitalizeFirstLetter(
                          list.length > 0 ? Object.keys(list[0])[2] : "Email"
                        )}</th>
                        <th scope="col">${capitalizeFirstLetter(
                          list.length > 0 ? Object.keys(list[0])[3] : "Role"
                        )}</th>
                        <th scope="col">Actions</th>
                    </tr>
                </thead>`;
  memberListDOM.appendChild(table);
  const tbody = document.createElement("tbody");
  let result = "";
  list.forEach((ele) => {
    result += `
                    <tr>
                        <th scope="row"><input class="form-check-input" type="checkbox" value="${ele.id}" id="${ele.id}" onchange="checkBox(this)"></th>
                        <td>${ele.name}</td>
                        <td>${ele.email}</td>
                        <td>${ele.role}</td>
                        <td><i class="fa-solid fa-pen-to-square mx-1" onclick="rowEdit(String(${ele.id}))" style="color:blue"></i><i class="fa-solid fa-floppy-disk mx-1 save" onclick="rowSave(String(${ele.id}))"></i> <i class="fa-solid fa-trash-can mx-1" onclick="rowDelete(String(${ele.id}))"style="color:red"></i></td>
                    </tr>
    `;
  });
  tbody.innerHTML = result;
  table.appendChild(tbody);
}

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

function alertFunction(message, type) {
  const alertPlaceholder = document.getElementById("liveAlertPlaceholder");

  const alert = (message, type) => {
    const wrapper = document.createElement("div");
    wrapper.innerHTML = [
      `<div class="alert alert-${type} alert-dismissible" role="alert">`,
      `   <div>${message}</div>`,
      '   <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>',
      "</div>",
    ].join("");

    alertPlaceholder.append(wrapper);
  };
  alert(message, type);
}
export { fetchData, injectToDom, alertFunction };
