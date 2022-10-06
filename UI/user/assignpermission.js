function roles(){
    getData(`/roles`)
    .then((data =>{
        let roles = ``;
          for(let i = 0; i< data.length; i++){
            roles+=`
            <option value="${data[i].id}">${data[i].name}</option>   
            `
          }
          document.getElementById("dropdownarea").innerHTML = roles;
    }))
}
roles();

$(document).ready(function(){
    
     var multipleCancelButton = new Choices('#choices-multiple-remove-button', {
        removeItemButton: true,
        maxItemCount:10,
        searchResultLimit:0,
        renderChoiceLimit:10
      });  
 });