export const notifications = () => {
    var blocks;
    try {
        setInterval(function(){
            const settings = {
                method: 'GET',
                headers: { "Access-Control-Allow-Origin": "*", 'Authorization': 'Bearer ' + localStorage.userToken }
            };
            const res = await fetch('http://localhost:8002/notification',settings);
            blocks = await res.json();
            console.log(blocks)
        }, 1000);
    } catch (e) {
        console.log(e);
    }
}