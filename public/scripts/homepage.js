$(document).ready(()=>{
    const mainContainer = $("main");


    const mainContainerHandler = async(event) =>{
        
        const id = $(event.target).data("id");

        try{
            const response = await fetch(`/api/posts/${id}`,{
                method: "GET",
                headers: {"Content-Type": "application/json"}
            });
            if (response.ok) {
                document.location.replace(`/api/posts/${id}`);
            } else {
                alert('Failed to open the article');
            }
        }catch(error){
            console.log(error);
        }
    };





    mainContainer.on("click", "button", mainContainerHandler);
});