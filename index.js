async function getData(){
    try{
        //go get data
        const response = await fetch(//link from api, use back tics, ${value} at the end);
        if (response.status != 200){
            throw new Eror (response);
        }
    } catch (error) {
        console.log(error);

    }
}