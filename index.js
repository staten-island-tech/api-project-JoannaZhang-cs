async function getData(){
    try{
        //go get data
        const response = await fetch(//link from api, use back tics, ${value} at the end);
        if (response.status != 200){
            throw new Eror (response);
        }else{
            const data = await response.json()
            //makes the response into json (java script object notation) data we can use
            console.log(data);
            document.getElementById("api-response").textContent = data.name;

        }
    } catch (error) {
        console.log(error);

    }
}
getData("//item")


//looking and testing api project 

//arrays equals for loop
//objects is different

//resources for layout: tailwindcss - flowbite & daistUI (on top fo tailwindcss)
//codepen: search for css cards