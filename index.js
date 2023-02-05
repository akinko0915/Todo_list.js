
// htmlからargumentをよぶ
const form =document.getElementById("form");
const input =document.getElementById("input");
const ul=document.getElementById("ul");

const todos = JSON.parse(localStorage.getItem("todos"));
//ローカルストレージにたまったデータが、リロードしたときに画面上にでるようにしていく//
//todosという配列は、localStrageからgetItemでtodosの配列からデータを取得することができる//
//JSON.parseで、もとの配列として扱うことができる//

if (todos){
    todos.forEach(todo=>{
        add(todo);
    });
}
//もしtodosが空じゃなかったら、trueだったら、liタグを追加する//

// いつそのアクションをおこすのかを指定する formオブジェクトのメソッドとしてaddEventListenerが定義してある//
form.addEventListener("submit", function(event){
    event.preventDefault();
    add();
});


//addという関数をつくっていく//
function add(todo){
    let todoText=input.value;
    //input.valueをvalueTextという変数名にする//

    //todoのリストがあったら、それはテキストとしてデータをとるようにする//
    if (todo){
        todoText=todo.text;
    }   

    //リストが空の状態でリスト化されないようにする//
    if (todoText){  
        //if(todoText){~}だけでもできる。なぜなら型変換がきいてるから。//
        const li= document.createElement("li");
        li.innerText = todoText;
        li.classList.add("list-group-item");
        //documentという機能の中のcreateElementでliに値を入れる。入れられた値は、todoText//
      
        if (todo && todo.completed){
            li.classList.add("text-decoration-line-through");
        }
        //todoのリストでかつ、完了しているとき textだけでなく完了というデータも保存する//


            //リストをけす//
            li.addEventListener("contextmenu",function(event){
            //contextmenuという右クリックがでてくるイベント//
            event.preventDefault();
            //通常右クリックされると、箱がでてくるが、そのデフォルトをけす//
            li.remove();
            saveData(); //ここで、ローカルストレージからもけす//
            }); 

            //todoリストに完了マークをつける//
            li.addEventListener("click", function(){
            li.classList.toggle
            ("text-decoration-line-through");
            //toggleというのは切り替える//
            //課題：リロードすると、完了が未完了になる→オブジェクト（複数のデータを1つにしたいとき：例＝名前と値をセットにする）//
            saveData();
            });

            //htmlにliがないから、ここでliがulの子分であることを定義づけている//
            ul.appendChild(li);
            input.value="";
            //エンターをおしてリストを追加した時に、inputの中身を空にする//
            saveData();
    }
}


//課題②リロードするたびにデータが消える。解決方法：１．保存する場所をつくる　２．ローカルストレージに保存できるようにする＝ブラウザにデータを保存しておく仕組み//
//saveDataという関数をつくっていく//
function saveData(){
    const lists= document.querySelectorAll("li");
    //liの中のデータを全部とれる//
    let todos =[];
    //配列にいれる準備 配列の名前はtodos//

    lists.forEach(list=>{
        let todo={
            text: list.innerText,
            completed: list.classList.contains("text-decoration-line-through")
        };
        
        todos.push(todo);
        //ループをつかって配列にいれていく//

        localStorage.setItem("todos", JSON.stringify(todos));    
        });
        //localStrageにarray（配列）として保存する→永続的に保存できる//

};

