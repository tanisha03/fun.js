const container = document.querySelectorAll(".taskSection");
const draggables = document.querySelectorAll(".taskCard");

draggables.forEach(ele=>{
    ele.addEventListener("dragstart", ()=>{
        ele.classList.add('dragging');
        console.log("dagstart");
    });

    ele.addEventListener("dragend", ()=>{
        ele.classList.remove('dragging');
        console.log("dragend");
    });
});

container.forEach(ele=>{
    ele.addEventListener("dragover",(e)=>{
        e.preventDefault();
        console.log(e);
        const afterEle = getEleAfterDrag(ele, e.clientY);
        const draggingEle=document.querySelector('.dragging');
        ele.querySelector('ul').appendChild(draggingEle);
    })
});

function getEleAfterDrag(container,y){
    console.log(container);
    console.log(container.querySelectorAll('.draggable:not(.dragging)'));
    const draggableElements = [...container.querySelectorAll('.draggable:not(.dragging)')];
}