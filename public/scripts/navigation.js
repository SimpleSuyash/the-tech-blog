$(document).ready(()=>{
    const dashboardBtn = $("#dashboard");

   

    const saveDashboardFlagToStorage = flag=>{
        localStorage.setItem("toOpenDashboard", JSON.stringify(flag));
    };

    //when Dashboard link is clicked from page's navbar
    const dashboardLinkHandler = async(event) =>{
        
        
        //saving post id to local storage for reference to redirect to correct post route
        //after login/sign up
        saveDashboardFlagToStorage(true);
        try{
            const response = await fetch(`/dashboard/`,{
                method: "GET",
                headers: {"Content-Type": "application/json"}
            });
            if (response.ok) {
                document.location.replace(`/dashboard/`);
            } else {
                alert('Failed to open the dashboard');
            }
        }catch(error){
            console.log(error);
        }
    };





   dashboardBtn.on("click",  dashboardLinkHandler);
});