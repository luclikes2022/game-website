document.addEventListener('DOMContentLoaded', function(){
    const viewCounter = document.getElementById('viewCount');
    function fetchViewCount(){
        fetch('/api/views')
        .then(response=>response.json())
        .then(data=>{
            viewCounter.textContent=data.views;
        })
        .catch(error=>console.error('error fetching view count:', error));
    }

    function incramentViewCount(){
        fetch('/api/views',{method:'POST'})
        .then(response=>response.json())
        .then(data=>{
            viewCounter.textContent=data.views;
        })
        .catch(error=>console.error('error fetching view count:', error));
    }

    incramentViewCount();
    fetchViewCount();

});

