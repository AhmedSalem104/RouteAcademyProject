
//   **  popUp alert Show When Inputs was empty **
//--------------------------------------------------------------


/* if (website.websiteName == "" || website.uRLInput == "") {
    Swal.fire({

        html: `
            <div class=" main-div-error  object-fit-contain ">
            <div class="circles d-flex p-1 ">
                <span class="rounded-circle me-2"></span>
                <span class="rounded-circle me-2"></span>
                <span class="rounded-circle me-2"></span>
            </div>
            <div class="py-4">
                <h5 id="title-error-message" class="fw-bolder">Site Name or Url is not valid, Please follow the rules below :</h5>
    
            </div>
            <div class="d-flex py-1">
                <i class="fa-regular fa-circle-right px-2"></i>
                <h6 class="text-muted" >Site name must contain at least 3 characters</h6>
    
            </div>
            <div class="d-flex ">
                <i class="fa-regular fa-circle-right px-2 "></i>
                <h6 class="text-muted" >Site URL must be a valid one</h6>
            </div>
        </div>
            `,
        showCloseButton: true,


    });
}
else {
    return website;

} */


var WebsiteName = document.getElementById("WebsiteName");
var URLInput = document.getElementById("URLInput");
var websiteArr = JSON.parse(localStorage.getItem("websites")) ?? [];
var updateMode = false;
var cancelbtn = document.getElementById("cancelbtn")
var siteNameAlert = document.getElementById("siteNameAlert")
var urlAlert = document.getElementById("urlAlert")
var mainIndex;
displaywebsites();

function AddUpdatewebsite() {
    validProductData()


    if (isDataValid()) {
        if (!updateMode) {
            addwebsite(getwebsite());
        }
        else {
            updatewebsite(getwebsite())
        }
        onDataChange()
        clearForm()
    }
}
function getwebsite() {
    var website = {
        websiteName: WebsiteName.value,
        uRLInput: URLInput.value,

    }


    return website;

}
function updatewebsite(website) {
    websiteArr.splice(mainIndex, 1, website);
    updateMode = false;
    getCancle()
}
function addwebsite(website) {
    websiteArr.push(website);
    getCancle()

}
function displaywebsites() {
    var cartoona = "";
    for (var i = 1; i < websiteArr.length; i++) {
        cartoona += `  <tr class=" text-center">
            <td>${i}</td>
            <td>${websiteArr[i].websiteName}</td>
            <td><a target="_blank" id="visitBtn" href="${websiteArr[i].uRLInput}" class="btn text-white fs-6"><i class="fa-solid fa-eye pe-2 p-1"></i></i>Visit</a></td>
            <td><button onclick="deletewebsite(${i})" class="btn btn-danger text-white fs-6"><i class="fa-solid fa-trash-can p-1 "></i></i>Delete</button></td>
        </tr>`
    }

    document.getElementById("tableBody").innerHTML = cartoona

}
function onDataChange() {
    localStorage.setItem("websites", JSON.stringify(websiteArr))
    displaywebsites()
}
function deletewebsite(index) {
    websiteArr.splice(index, 1)
    onDataChange()
}
function patchwebsite(index) {
    mainIndex = index;
    updateMode = true;
    console.log(websiteArr[index])
    WebsiteName.value = websiteArr[index].websiteName
    URLInput.value = websiteArr[index].uRLInput
    cancelbtn.classList = "btn btn-secondary ms-2 my-5 d-inline"
}
function getCancle() {
    cancelbtn.classList = "btn btn-secondary ms-2 my-5 d-none"
    clearForm()

}
function clearForm() {
    WebsiteName.value = "";
    URLInput.value = "";

}


function isDataValid() {
    return /^[a-zA-Z ]{3,30}$/.test(WebsiteName.value) &&
        /^(((http|https):\/\/|)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,6}(:[0-9]{1,5})?(\/.*)?)$/.test(URLInput.value);
}

function validProductData() {
    if (/^[a-zA-Z ]{3,30}$/.test(WebsiteName.value)) {
        siteNameAlert.classList.add("d-none")
        WebsiteName.classList.add("is-valid")
        WebsiteName.classList.remove("is-invalid")


    }
    else {
        siteNameAlert.classList.remove("d-none")
        WebsiteName.classList.remove("is-valid")
        WebsiteName.classList.add("is-invalid")

    }

    if (/^(((http|https):\/\/|)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,6}(:[0-9]{1,5})?(\/.*)?)$/.test(URLInput.value)) {
        urlAlert.classList.add("d-none")
        URLInput.classList.add("is-valid")
        URLInput.classList.remove("is-invalid")
    }
    else {
        urlAlert.classList.remove("d-none")
        URLInput.classList.remove("is-valid")
        URLInput.classList.add("is-invalid")
    }
}
