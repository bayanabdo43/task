let fName = document.querySelector(".fName");
let lName = document.querySelector(".lName");
let date = document.querySelector(".date");
let amount = document.querySelector(".amount");
let search = document.querySelector(".search");
let btnCreate = document.querySelector(".btnCreate");
let btnUpdate = document.querySelector(".btnUpdate")
let btnSearchByName = document.querySelector(".btnSearchByName");
let searchByAmount = document.querySelector(".searchByAmount");
let localIndex ;
var regex ={
    fName :/[a-zA-Z]{3,9}$/,
    lName :/[a-zA-Z]{3,9}$/,
    amount : /^.{1,6}$/,
}
let customerData ;

if(localStorage.custome != null){
    customerData = JSON.parse(localStorage.custome)
}else{
    customerData = []
}


/////// Create Customer
btnCreate.addEventListener('click', function(){
    if(fName.value !=""&& date.value !=""&&amount.value!=""){
        let newCustomer = {
        fName:fName.value,
        lName:lName.value,
        date:date.value,
        amount:amount.value,
    }
    customerData.push(newCustomer);
    localStorage.setItem('custome',JSON.stringify(customerData))
    clearInput()
    displayCustomer(customerData)
    }
})
//////// Clear Input
function clearInput(){
    fName.value="";
    lName.value="";
    date.value="";
    amount.value="";
}
/////// Display Customer
function displayCustomer(list){
    let cartona =``;
    for(let i=0;i<list.length;i++){
        cartona+=`<tr>
                    <td>${[i+1]}</td>
                    <td>${list[i].fName} ${list[i].lName}</td>
                    <td>${list[i].date}</td>
                    <td>${list[i].amount}</td>
                    <td><button onclick="getDataToUpdate(${i})" id="Update" class="btn btn-light rounded-5">Update</button></td>
                    <td><button onclick="deletCustomer(${i})" id="Delete" class="btn btn-danger rounded-5">Delete</button></td>
                </tr> `
    }
    document.getElementById("myData").innerHTML=cartona;
    let deletAll = document.querySelector("#deletAll")
    if(list.length>0){
        deletAll.innerHTML =`<button onclick="deletAll()" class="btnDeletAll letSpacing btn btn-danger w-100 rounded-5">Delet All Customer (${list.length})</button>`
    }else{
        deletAll.innerHTML = ``
    }
}
displayCustomer(customerData)
//////// Delet Customer
function deletCustomer(i){
    customerData.splice(i,1);
    updateLocalStorg()
    displayCustomer(customerData)
}
/////// Delet All Customer
function deletAll(){
    localStorage.clear()
    customerData.splice(0)
    displayCustomer(customerData)
}
/////// Update Customer
function getDataToUpdate(i){
    localIndex=i;
    fName.value=customerData[i].fName;
    lName.value=customerData[i].lName;
    date.value=customerData[i].date;
    amount.value=customerData[i].amount;
    btnCreate.classList.add("d-none");
    btnUpdate.classList.remove("d-none");
    scroll({
        top:0,
        behavior:'smooth',
    })
}
btnUpdate.addEventListener('click',function updateCustomer(){ 
    if(fName.value !=""&& date.value !=""&&amount.value!=""){
        customerData[localIndex].fName=fName.value;
        customerData[localIndex].lName=lName.value;
        customerData[localIndex].date=date.value;
        customerData[localIndex].amount=amount.value;
        displayCustomer(customerData)
        updateLocalStorg()
        btnCreate.classList.remove("d-none");
        btnUpdate.classList.add("d-none");
        clearInput()
    }
})
/////////// Update Local Storg
function updateLocalStorg(){
    localStorage.custome=JSON.stringify(customerData);
}
/////////// validate
function validate(element){
    if(regex[element.id].test(element.value)== true){
        element.nextElementSibling.classList.add('d-none')
    }else{
        element.nextElementSibling.classList.remove('d-none')
    }
}
/////////// Searsh
let searchMood = "name";
function getSearshMood(id){
    if(id == 'searchByName'){
        searchMood = "name";
        search.placeholder ="Searsh By Name";
    }else{
        searchMood = "amount";
        search.placeholder ="Searsh By Amount";
    }
    search.focus()
}
function inputSearch(value){
    var searchCust = []
    if(searchMood=="name"){
        for(let i =0;i<customerData.length;i++){
            if(customerData[i].fName.toLowerCase().includes(value.toLowerCase())){
                searchCust.push(customerData[i])  
            }
        }
    }else{
        for(let i =0;i<customerData.length;i++){
            if(customerData[i].amount.toLowerCase().includes(value.toLowerCase())){
                searchCust.push(customerData[i])  
            }
        }
    }
    displayCustomer(searchCust)
}
//////////// 
const ctx = document.getElementById('myChart');

        new Chart(ctx, {
            type: 'bar',
            data: {
                labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
                datasets: [{
                    label: '# of Votes',
                    data: [12, 19, 3, 5, 2, 3],
                    borderWidth: 1
                }]
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });

////////////////////////////////////////////////
async function hh(){
    let res = await fetch("customer.json");
    let finalRes = await res.json()
    console.log("finalRes");
}
hh()
 
// var xReq = new XMLHttpRequest();
// xReq.open('GET','./customer.json');
// xReq.onload = function(){
//     var xData = JSON.parse(xReq.responseText)
//     document.write(xData[0]);
// };
// xReq.send();

// fetch("customer.json")
// .then(response => response.json())
// .then (data => showInfo(data));
// function showInfo(data){
//     console.log(data.customers);
// }