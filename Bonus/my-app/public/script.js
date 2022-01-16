function get() {
            
    // XMLHttpRequest - 
    let req = new XMLHttpRequest();

    // XMLHttpRequest.open(method: string, url: string)
    req.open('GET', 'http://localhost:3000/shoes');

    req.onreadystatechange = () => {
        // readyState of 4 - DONE (operation is complete).
        if(req.readyState === 4){
            // req.response - is the data that returns from the address
            // JSON.parse() - convert to array. 
            let arr = JSON.parse(req.response);

            let result = '';
            result += `<th>ID</th><th>Brand</th><th>Model</th><th>Year</th>
            <th>Size</th><th>Amount</th><th>Edit</th><th></th>`

            for (const shoe of arr) {
                // tr -> table row, td -> table data(cell)
                result += `
                <tr>
                    <td>${shoe.id}</td>
                    <td>${shoe.brand}</td>
                    <td>${shoe.model}</td>
                    <td>${shoe.year}</td>
                    <td>${shoe.size}</td>
                    <td>${shoe.amount}</td>
                    <td><button onclick="put('${shoe.brand}')" class="btn btn-light">Edit</button></td>
                    <td><button onclick="deleteShoe('${shoe.model}')" class="btn-close btn-close-white"></button></td>
                </tr>
                `
            }

            document.getElementById('shoes').innerHTML = result;
        } 
    }
    req.send();
}

function post(){

    // get all the values from the inputs
    let sid = document.getElementById('sid').value;
    let sbrand = document.getElementById('sbrand').value;
    let smodel = document.getElementById('smodel').value;
    let syear = document.getElementById('syear').value;
    let ssize = document.getElementById('ssize').value;
    let samount = document.getElementById('samount').value;

    // call the post method in `/add` path:
    let req = new XMLHttpRequest();
    req.open('POST', 'http://localhost:3000/shoes/add');

    req.onreadystatechange = () =>{
        // when we finish adding new shoe - call the shoe's list again
        if(req.readyState === 4) get();
    }

    // define header of request
    req.setRequestHeader('Content-type', 'application/json');
    // send the values from user with request:
    // in req.send() - we can add the body
    req.send(JSON.stringify({"id":sid, "brand":sbrand, "model":smodel, 
    "year":syear, "size":ssize, "amount":samount }));
}

function put(brand){
    // input from user:
    let input = prompt('Enter the new amount');

    // call the post method in `/add` path:
    let req = new XMLHttpRequest();
    req.open('PUT', `http://localhost:3000/shoes/update/${brand}`);

    // after update - refresh the table:
    req.onreadystatechange = () => {
        if(req.readyState === 4) get();
    }

    // define header of request
    req.setRequestHeader('Content-type', 'application/json');
    // send the values from user with request:
    // in req.send() - we can add the body
    req.send(JSON.stringify({"newAmount":input}));
}


function deleteShoe(model){
    //let param = Number(param);
    let req = new XMLHttpRequest();
    req.open('DELETE', `http://localhost:3000/shoes/delete/${model}`);
    // show the updated table after request is sent. 
    req.onreadystatechange = () =>{
        if(req.readyState === 4) get();
    }
    req.send();
}