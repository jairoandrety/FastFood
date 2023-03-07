/*
fetch("./students.json")
.then(response => {
    return response.json();
})
.then(function (data){
    for(var i=0; i < data.students.length; i++){
        document.getElementById("lol").innerHTML +=
        data.students[i].firstName + " " + data.students[i].lastName + "<br>";
    }
    console.debug(data.students);
})
.catch(function (error){
    console.log(error);
});
*/