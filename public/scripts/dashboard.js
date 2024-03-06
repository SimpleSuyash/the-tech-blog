$(window).ready(() => {
    const postContainerEl = $("#post-container");
    const createBtn = $(".create");

    
    //post update link  and delete handler
    const editHandler = async (event) => {

        const id = $(event.target).data("id");
        try {
            //----------------------------------delete handler
            if($(event.target).hasClass("delete")){
                const response = await fetch(`/api/posts/${id}`, {
                    method: "DELETE",
                });

                if (response.ok) {
                    alert('Your post has been deleted!');
                    window.location.reload();
                } else {
                    alert("Failed to delete post");
                }
                //---------------------------------update link handler
                //it just opens a new page and fetches existing data in the form
                //so that user can edit them
                // that actual update  doesn't happen here
            }else if ($(event.target).hasClass("update")){
                const response = await fetch(`/dashboard/${id}`, {
                    method: "GET",
                    headers: {"Content-Type": "application/json"}
                });

                if (response.ok) {
                    window.location.replace(`/dashboard/${id}`);
                } else {
                    alert("Failed to get post update form!");
                }
            }//end of update/delete
        } catch (error) {
            console.log(error);
            res.status(500).json(error);
        }
        
    };

    //post create link handler
    const createHandler = async (event) => {
        const id = $(event.target).data("id");
        try {
            const response = await fetch(`/api/users/${id}`, {
                method: "GET",
                headers: {"Content-Type": "application/json"}
            });
    
            if (response.ok) {
                window.location.replace(`/api/users/${id}`);
            } else {
                alert("Failed to get post create form!");
            }
        } catch (error) {
            console.log(error);
        }
    };

    createBtn.on("click", createHandler);
    postContainerEl.on("click", "button", editHandler);
   
});

