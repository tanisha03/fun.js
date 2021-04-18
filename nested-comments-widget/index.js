var commentArr = new Array();

document.addEventListener('DOMContentLoaded', ()=>{
    console.log("DOM Loaded");
    
    const btnAdd = document.getElementById("add-comment");
    btnAdd.addEventListener("click", ()=>{
        let name=document.getElementById("name").value;
        let username=document.getElementById("username").value;
        let comment=document.getElementById("comment").value;
        addComment(name,username,comment);
    },false);

},false);

var getCommentTemplate = (comment) => {
    let id=comment.id;
    let listEle=`
        <li id="comment-${id}">
            <div id="description">
                <a href="#">@${comment.username}</a>
                <span>${comment.lastUpdated.toISOString().slice(0,10)}</span>
            </div>
            <p>${comment.comment}</p>
            <div id="actions">
                <button>Reply</button>
            </div>
        </li>
    `;
    return listEle;
};

var renderComments = () =>{
    let commentList='';
    commentArr.forEach(comment=>{
        commentList+=getCommentTemplate(comment);
    });
    console.log(commentList);
    document.getElementById("commentList").innerHTML=commentList;
};

var addComment= (name, username,comment) => {
    var comment = new Comment(commentArr.length,name, username, comment);
    commentArr.push(comment);
    renderComments();
};

function Comment(id, name, username, comment, parentID){
    this.id=id;
    this.name=name;
    this.username=username;
    this.comment=comment;
    this.lastUpdated=new Date();
    this.parentID=parentID;
};