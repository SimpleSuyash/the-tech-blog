$(document).ready(() => {
    const postContainerEl = $("#post-container");
    const createBtn = $(".create");

    

    const editHandler = async (event) => {
        const id = $(event.target).data("id");
        //delete handler
        if($(event.target).hasClass("delete")){
            const response = await fetch(`/api/posts/${id}`, {
                method: "DELETE",
            });

            if (response.ok) {
                document.location.replace("/dashboard");
            } else {
                alert("Failed to delete project");
            }
            //update handler
        }else if ($(event.target).hasClass("update")){
            const response = await fetch(`/dashboard/${id}`, {
                method: "GET",
                headers: {"Content-Type": "application/json"}
            });

            if (response.ok) {
                document.location.replace(`/dashboard/${id}`);
            } else {
                alert("Failed to update project");
            }
        }//end of update/delete
    };

    const createHandler = async (event) => {

    };

    createBtn.on("click", createHandler);
    postContainerEl.on("click", "button", editHandler);
   
});

