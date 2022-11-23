
fetch('https://fakestoreapi.com/products').then((data) => {

   return data.json();

}).then((completedata) => {

   let data1 = "";

   completedata.map((values) => {

      data1 += `<div class="col-md-4 mb-5 "> 
        <div class="card"> 
            <h3>${values.category}</h3> 
            <img src=${values.image} alt="img" class"images"> 
            <div class="card-body"> 
                <h3 class="card-title"> ${values.title}</h3> 
                <p>${values.description}</p> 
                <h8 class="price"> $${values.price}</h8> 
                <button class="productsButton" onClick=" addToCartClicked('${values.title}', '${values.price}')" type="button">Add to Cart</button> 
            </div> 
        </div> </div>`
       

       
   });
 

   document.getElementById("cards").innerHTML = data1;
    
    localStorage.setItem(data1,JSON.stringify(completedata))
    
   fetch('https://fakestoreapi.com/products')
  .then(response => response.json())
  .then(json => console.log(json))
    
})



function addToCartClicked(title, price) {

    var itmno = document.getElementById("cartTable").childElementCount
    document.getElementById("cartTable").innerHTML += `
        <tr id='itm${itmno}'>
        <td></td>
            <td>${title}</td>
            <td>
                <input type='text' style='width:30px' value='1' onkeyup='changeQty(${itmno},this.value)'>
            </td>
            <td>${price}</td>
            <td>${price}</td>
        </tr>
    `;
    calculateSubTotal();   
}

function changeQty(rowNo, val){

    var totalTD = document.getElementById(`itm${rowNo}`).children[4];
  
    totalTD.innerText = parseFloat(document.getElementById(`itm${rowNo}`).children[3].innerText) * parseInt(val); 
    calculateSubTotal();
}
function calculateSubTotal(){
    var sum = 0;
    var tableBody = document.getElementById("cartTable")
    var i;
    var rows = tableBody.rows.length;
    for (i=0; i<rows; i++) 
    {
        var thisTrElem = tableBody.rows[i];
        var thisTdElem = thisTrElem.cells[4];		
        var thisTextNode = thisTdElem.childNodes.item(0);
      
        if (!isNaN(thisTextNode.data))
            sum += parseFloat(thisTextNode.data);
    } 
    document.getElementById("subtol").innerHTML = "$"+sum;
}
function emptycart(){
    document.getElementById("cartTable").innerHTML = ''
    document.getElementById("subtol").innerHTML = "$0";
}