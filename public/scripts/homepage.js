$(document).ready(()=>{
    const mainContainer = $("main");

   

    const savePostIdToStorage = id=>{
        localStorage.setItem("postId", JSON.stringify(id));
    };

    //when post-preview page's Read Full Article buttton is clicked
    const mainContainerHandler = async(event) =>{
        
        const id = $(event.target).data("id");
        //saving post id to local storage for reference to redirect to correct post route
        //after login/sign up
        savePostIdToStorage(id);
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