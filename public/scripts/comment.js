$(document).ready(()=>{

    const postBtn = $("#post");
    const commentTxtArea = $("#comment");

    const url = window.location.toString();
    const post_id= url.charAt(url.length-1);
    

    const postHandler = async(event) =>{
        const content = commentTxtArea.val();
        if(comment && $.trim(comment)!==0){
            try{
                const response = await fetch(`/api/comments/`,{
                    method: "POST",
                    body: JSON.stringify({content, post_id}),
                    headers: {"Content-Type": "application/json"}
                });
                if (response.ok) {
                    document.location.reload();
                } else {
                    alert('Failed to create the comment!');
                }
            }catch(error){
                console.log(error);
            }
        }else{
            commentTxtArea.val("");
            commentTxtArea.focus();
        }
    };

    postBtn.on("click", postHandler);
});