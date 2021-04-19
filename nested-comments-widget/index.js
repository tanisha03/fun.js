var commentArr = new Array();

document.addEventListener('DOMContentLoaded', ()=>{
    console.log("DOM Loaded");
    
    const btnAdd = document.getElementById("add-comment");
    btnAdd.addEventListener("click", ()=>{
        let name=document.getElementById("name").value;
        let username=document.getElementById("username").value;
        let comment=document.getElementById("content").value;
        addComment(name,username,comment);
    },false);

    const commentList= document.getElementById("commentList");
    commentList.addEventListener("click", (e)=>{
        const ActionID=e.target.id.split("-")[0];
        const commentID=e.target.id.split("-")[1];
        if(ActionID==="reply"){
            let inputEle = `
                <li id="input-${commentID}">
                    <div id="user-details">
                        <input type="text" id="name-${commentID}" placeholder="Enter Name" value="John Doe" />
                        <input type="text" id="username-${commentID}" placeholder="Enter Username" value="johndoe" />
                    </div>
                    <div id="comment-section">
                        <textarea rows="5" id="content-${commentID}" placeholder="Join the discussion...."></textarea><br/>
                        <button id="addReply-${commentID}">Submit</button>
                    </div>
                </li>
            `;

            const childList = document.getElementById(`childlist-${commentID}`);
            console.log("CHILDLIST", childList);
            if(childList===null){
                const childHTML=`
                    <ul id="childlist-${commentID}">
                        ${inputEle}
                    </ul>
                `;
                document.getElementById(`comment-${commentID}`).innerHTML+=childHTML;
            }
            else{
                childList.innerHTML=inputEle+childList.innerHTML;
            }
        }
        else if(ActionID==="addReply"){
            let name=document.getElementById(`name-${commentID}`).value;
            let username=document.getElementById(`username-${commentID}`).value;
            let comment=document.getElementById(`content-${commentID}`).value;
            console.log(name,username,comment,document.getElementById(`content-${commentID}`));
            addComment(name,username,comment, commentID);
        }
    },false);

},false);

var getCommentTemplate = (comment) => {
    let id=comment.id;
    let listElem=`
        <li id="comment-${id}">
            <div id="description">
                <a href="#">@${comment.username}</a>
                <span>${comment.lastUpdated.toISOString().slice(0,10)}</span>
            </div>
            <p>${comment.comment}</p>
            <div id="actions">
                <button id="reply-${id}">Reply</button>
            </div>
    `;
    if(comment.childrenIds.length != 0) {
		listElem += `<ul id="childlist-${id}">`;
		comment.childrenIds.forEach(commentId=> {
			listElem += getCommentTemplate(commentArr[commentId]);
		});
		listElem += "</ul>";
	}	
    listElem+="</li>";
    return listElem;
};

var renderComments = () =>{
    let commentList='';
    let rootComments=[];
    commentArr.forEach(comment=>{
        console.log(comment);
        if(comment.parentID === null || comment.parentID == "null") {
			rootComments.push(comment);
		}
    });
    console.log(rootComments);
    rootComments.forEach(comment=> {
		commentList += getCommentTemplate(comment);
        console.log("TEMP", commentList);
	});
    document.getElementById("commentList").innerHTML=commentList;
};

var addComment= (name, username,comment, parent) => {
    var comment = new Comment(commentArr.length,name, username, comment,parent);
    commentArr.push(comment);
    if(parent != null) {
		commentArr[parent].childrenIds.push(commentArr.length-1);
	} 
    console.log(commentArr);
    renderComments();
};

function Comment(id, name, username, comment, parentID){
    this.id=id;
    this.name=name;
    this.username=username;
    this.comment=comment;
    this.lastUpdated=new Date();
    this.parentID=parentID || null;
    this.childrenIds = [];
};