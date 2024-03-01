
$(document).ready(() => {
    const titleEl = $("#title");
    const postTxtArea = $("#post");
    const updateBtn = $("#update");
    const cancelBtn = $("#cancel");

    const enterKeyHandler = event =>{
        if(event.key === "Enter"){
            event.preventDefault();
        }
    };

    const titleChangeHandler = event =>{

        if($.trim(titleEl.text())===""){
            updateBtn.attr("disabled", true);
        }else{
            updateBtn.removeAttr("disabled");
        }
    };

    const postChangeHandler = event =>{
        
        if( $.trim(postTxtArea.val())==="" ){
            updateBtn.attr("disabled", true);
        }else{
            updateBtn.removeAttr("disabled");
            if(event.key === "Enter"){
                updateHandler();
            }
        }
    };

    const updateHandler = async(event) =>{
        const id = $(event.target).data("id");

        
       
        const response = await fetch(`/api/posts/${id}`,{
            method: "PUT",
            body: JSON.stringify({
                title: $.trim(titleEl.text()),
                content: $.trim(postTxtArea.val())
            }),
            headers: {"Content-Type": "application/json"}
        });

        if(response.ok){
            document.location.replace("/dashboard");
        }else{
            alert('Failed to update post!');
        }
  

    };

    const cancelHandler = event =>{
        document.location.replace("/dashboard");
    };
 

    titleEl.on("keydown", enterKeyHandler);
    postTxtArea.on("keyup", postChangeHandler);
    titleEl.on("keyup", titleChangeHandler);
    updateBtn.on("click", updateHandler);
    cancelBtn.on("click", cancelHandler);
});