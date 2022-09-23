

function deletePollingQuestion(id){
    fetch(`${baseUrl}/api/pollingquestion/`+id, {
        method: 'DELETE'
    }).then(()=>{
        let table = ""

        table += `
            <div  style=" 
            margin: auto;
            text-align: center;
            width: 50%;
            height: 5vh; text-align: center; 
            justify-content: center;
            font-size: large" 
            class="alert alert-danger" role="alert">
            Polling Question Deleted Successfully
            </div>`

        document.getElementById("formSubmitted").innerHTML = table

        setTimeout(()=>{
            document.getElementById("formSubmitted").innerHTML = ""
        },2000)
    })
    setTimeout(() => {
        getPollingQuestion()
    }, 200);
}

getPollingQuestion()

function getPollingQuestion() {
    let table = ""
    fetch(`${baseUrl}/api/admin/pollingquestion`,{
        headers:{
            "Content-Type":"application/json",   
        }
    })
    .then((response)=>response.json()).catch(()=>{})
    .then((data)=> {
        table += `
        <tr style="width: 100%; display: flex; justify-content: space-between;" class="tablepoint">
        <th style="width: 10%;" class="toptable ">Q .NO</th>
        <th style="width: 75%;" class="toptable ">Question</th>
        <th style="width: 20%;" class="toptable ">Area</th>
        <th style="width: 15%;" class="toptable ">Action</th>
        </tr>`
        for (let i = 0; i < data.length; i++) {
            if(data[i].question.length > 13){
                data[i].question = data[i].question.slice(0,15)+`<a>...more</a>`
            }
            table += `
        <tr class="tablepoint " style="width: 100%; display: flex; justify-content: space-between;" >
        <td style="width: 10%;" class="datatable">${i+1}</td>
        <td style="width: 75%;" class="datatable mouseHand" onclick="showPollingQuestionDetails(${data[i].id})">${data[i].question}</td>
        <td style="width: 20%;" class="datatable mouseHand" onclick="showPollingQuestionDetails(${data[i].id})">${data[i].area.name}</td>
        <td style="width: 15%;" class="datatable"> 

        <a  href="/pollingquestion/addpollingquestion.html?id=${data[i].id}">
        <i onclick="modal(${data[i].id})" data-bs-toggle="modal" data-bs-target="#exampleModal"  
        style="padding-right: 15px; margin-right: 15px;"  class="fa fa-pencil"></i>
        </a>

        <i onclick="deletePollingQuestion(${data[i].id})"  style="padding-right: 15px; margin-right: 15px;" class="fa fa-close"></i>
        
        </td>
    </tr>`
        // count = 1
        // table +=  `<tr>
        // <td><span style="padding-left: 5.5%; margin-left: 5.5%;"  ></span><b>Options :</b> </td>
        // </tr>`

        // data[i].pollingOptions.forEach((item) => {
        //     table+=
        //     ` <tr >
        //          <td> <span style="padding-left: 6%; margin-left: 6%;"  >${count}</span> - ${item.option} </td>
        //      </tr>`;

        //      count += 1;
        //     })    
        }
        
        document.getElementById("datatables-reponsive").innerHTML = table;
    })
}

function showPollingQuestionDetails(id){
    alert(id)
}   
// let data1 = []
// function modal(id){
//     uid = id
//     count1 = 0
//     table = ""
//     fetch("http://localhost:8081/api/pollingquestion/"+id,{
//         headers:{
//             "Content-Type":"application/json",
//         }
//     })
//     .then((response)=>response.json())
//     .then((data)=> {
//         data1 = data
//         setTimeout(() => {
//             modalContent(data)
//         },250);        
// })
// }

// let arr = [] ;
// let count1 = 0
// let uid;

// function modalContent(data){
//     arr = []
//     for (let i = 0; i < data.pollingOptions.length; i++) {
//         if (sid == i) {
//         console.log(i);
//         }else{
//             arr.push(data.pollingOptions[i].option);
//         }
//     }
    
//     for (let i = 0; i < count1; i++) {
//         arr.push("");
//     }

// table = ""
// for (let i = 0; i < arr.length; i++) {
//     if (data.pollingOptions.length == 1) {
//         table += `
//     <tr>
//     <td>
//     <input style="margin-top: 10px;" type="text" class="form-control" id="pollingoption${i}" aria-describedby="emailHelp" placeholder="Enter Option">
//     </td>
//     <td> 
//     <i onclick="addOption(${i})"  
//     style="padding-right: 15px; margin-right: 15px;padding-left: 15px; margin-left: 15px;"  class="fa fa-plus"></i>
//     </td>
//     </tr>`
// }else{
//     table += `
//     <tr>
//     <td>
//     <input style="margin-top: 10px;" type="text" class="form-control" id="pollingoption${i}" aria-describedby="emailHelp" placeholder="Enter Option">
//     </td>
//     <td> 
//     <i onclick="addOption(${i})"  
//     style="padding-right: 15px; margin-right: 15px;padding-left: 15px; margin-left: 15px;"  class="fa fa-plus"></i>
//     <i onclick="subtractOption(${i})"  style="padding-right: 15px; margin-right: 15px;" 
//     class="fa fa-minus"></i>
//     </td>
//     </tr>    `
// }
// }
// document.getElementById("dynamicoption").innerHTML = table;
// document.getElementById("pollingquestion").value = data.question;
// for (let i = 0; i < arr.length; i++) {
// document.getElementById("pollingoption"+i).value = arr[i];

// }
// }

// function addOption(id){
//     count1 ++;
//     modalContent(data1)
// }

// let sid = null;

// function subtractOption(id){
    
//     count1 -- ;
//     console.log(id);
//     sid = id
    
    // arr.splice(id,1)
    
    // let pollingOption = []
    
    // for (let i = 0; i < arr.length; i++) {
        //     console.log(i);
        //     if (i != id) {
            //         let option = document.getElementById("pollingoption"+i).value;
    //         pollingOption.push(option);
    //     }
    // }
    
    // modalContent(data1)
    // option()
    
    // for (let i = 0; i < pollingOption.length; i++) {
    //     // console.log( pollingOption[i]);
    //     document.getElementById("pollingoption"+i).value = pollingOption[i];

    // }
// }


    // function updatePollingQuetion(){
    
    //     let pollingQuestion = document.getElementById("pollingquestion").value;
    //     let pollingOption = []
    
    //     console.log(arr);
    
    //     for (let i = 0; i < arr.length; i++) {
    //         let option = document.getElementById("pollingoption"+i).value;
    //         options = {option}
    //         pollingOption.push(options);
    //     }
    
    //     newPollingQuestion = {question : pollingQuestion ,
    //         pollingOptions : pollingOption}
    
    //     console.log(newPollingQuestion);
    
    //     fetch('http://localhost:8081/api/pollingquestion/'+uid, {
    //             method: 'PUT',
    //             headers: {
    //                 'Content-Type': 'application/json',
    //             },
    //             body: JSON.stringify(newPollingQuestion),
    //         })
    //             .then(response => response.json())
    //             .then(data => {
    //                 console.log('Success:', data);
    //             })
    //             .catch((error) => {
    //                 console.error('Error:', error);
    //             });
    //             setTimeout(() => {
    //                 getPollingQuestion()
    //             }, 1000);
    
    // }