const container = document.querySelectorAll(".taskSection");
const draggables = document.querySelectorAll(".taskCard");

draggables.forEach(ele=>{
    ele.addEventListener("dragstart", ()=>{
        ele.classList.add('dragging');
    });

    ele.addEventListener("dragend", ()=>{
        ele.classList.remove('dragging');
    });
});

container.forEach(ele=>{
    ele.addEventListener("dragover",(e)=>{
        e.preventDefault();
        const afterEle = getEleAfterDrag(ele, e.clientY);
        if(afterEle){
            const draggingEle=document.querySelector('.dragging');
            ele.querySelector('ul').insertBefore(draggingEle,afterEle.element);
        }
        else{
            ele.querySelector('ul').appendChild(draggingEle);
        }
    })
});

function getEleAfterDrag(container,y){
    const draggableElements = [...container.querySelectorAll('.taskCard:not(.dragging)')];

    return draggableElements.reduce((closest, ele)=>{
        const eleVal=ele.getBoundingClientRect();
        const distance = y - (eleVal.top + eleVal.height/2);
        if(distance<0){
            if(Math.abs(distance)<closest.dist) return {dist:distance, element:ele};
            return closest;
        }
        return closest;
    },{dist:Number.MAX_VALUE, element:null});

}