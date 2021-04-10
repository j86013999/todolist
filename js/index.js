

document.addEventListener("DOMContentLoaded", function(){
  


  // ==================資料2 從local storage取得資料==============================
  
    function get_tasks(){
      let tasks = JSON.parse(localStorage.getItem("tasks"));
      if(tasks){
        let list_html = "";
        tasks.forEach(function(item, i){
    
          list_html += `
            <li data-id="${item.item_id}">
              <div class="item_flex">
                <div class="left_block">
                  <div class="btn_flex">
                    <button type="button" class="btn_up">往上</button>
                    <button type="button" class="btn_down">往下</button>
                  </div>
                </div>
                <div class="middle_block">
                  <div class="star_block">
                    <span class="star${(item.star >= 1 ? " -on" : "")}" data-star="1"><i class="fas fa-star"></i></span>
                    <span class="star${(item.star >= 2 ? " -on" : "")}" data-star="2"><i class="fas fa-star"></i></span>
                    <span class="star${(item.star >= 3 ? " -on" : "")}" data-star="3"><i class="fas fa-star"></i></span>
                    <span class="star${(item.star >= 4 ? " -on" : "")}" data-star="4"><i class="fas fa-star"></i></span>
                    <span class="star${(item.star >= 5 ? " -on" : "")}" data-star="5"><i class="fas fa-star"></i></span>
                  </div>
                  <p class="para">${item.name}</p>
                  <input type="text" class="task_name_update -none" placeholder="更新待辦事項…" value="${item.name}">
                </div>
                <div class="right_block">
                  <div class="btn_flex">
                    <button type="button" class="btn_update">更新</button>
                    <button type="button" class="btn_delete">移除</button>
                  </div>
                </div>
              </div>
            </li>
          `;
    
        });
        
        let ul_task_list = document.getElementsByClassName("task_list")[0];
        ul_task_list.innerHTML = list_html;
      }
    }
    
    get_tasks(); // DOMContentLoaded 事件發生時，執行這裡的程式
  
  
    
  // ==================介面2 新增待辦事項==============================
  
    var input_task_name = document.getElementsByClassName('task_name')[0]
  
    input_task_name.addEventListener('focus', function(){
      this.closest("div.task_add_block").classList.add("-on");
    });
  
    input_task_name.addEventListener('blur', function(){
      this.closest("div.task_add_block").classList.remove("-on");
    });
  
  
    let task_add = document.getElementsByClassName("task_add")[0];
  
  
    // 按enter輸入
    input_task_name.addEventListener("keydown", function(e){
      if(e.keyCode == 13){
        task_add.click()
      }
    })
  
    task_add.addEventListener("click", function(){
    
      
      let task_text = (input_task_name.value).trim()
  
      if( task_text != "" ){
  
        let item_id = Date.now();
  
        let list_html = `
        <li data-id=${item_id}>
        <div class="item_flex">
          <div class="left_block">
            <div class="btn_flex">
              <button type="button" class="btn_up">往上</button>
              <button type="button" class="btn_down">往下</button>
            </div>
          </div>
          <div class="middle_block">
            <div class="star_block">
              <span class="star" data-star="1"><i class="fas fa-star"></i></span>
              <span class="star" data-star="2"><i class="fas fa-star"></i></span>
              <span class="star" data-star="3"><i class="fas fa-star"></i></span>
              <span class="star" data-star="4"><i class="fas fa-star"></i></span>
              <span class="star" data-star="5"><i class="fas fa-star"></i></span>
            </div>
            <p class="para">${task_text}</p>                
            <input type="text" class="task_name_update -none" placeholder="更新待辦事項…" value="${task_text}">
          </div>
          <div class="right_block">
            <div class="btn_flex">
              <button type="button" class="btn_update">更新</button>
              <button type="button" class="btn_delete">移除</button>
            </div>
          </div>
        </div>
      </li>
        `;
  
        var ul = document.getElementsByClassName("task_list")[0];
  
        ul.insertAdjacentHTML("afterbegin", list_html)
        input_task_name.value = "";
  
  
  // ==================資料1 新增資料至localstorage==============================
  
      let task = {
        "item_id": item_id,
        "name": task_text, // 新增的待辦事項文字
        "star": 0 // 預設 0
      };
      let tasks = JSON.parse(localStorage.getItem("tasks"));
      if(tasks){ // 若存在
        tasks.unshift(task);
      }else{ // 若不存在
        tasks = [task];
      }
      localStorage.setItem("tasks", JSON.stringify(tasks));
  
  
      }
    })
  
      // ==================介面3 移除與清空 & 資料3 移除與清空==============================
  
      // 移除鈕
      
    //let itemRemove = document.getElementsByClassName("btn_delete"); 
    
    /*
    for( let i = 0 ; i < itemRemove.length ; i++){
      // console.log(itemRemove[i]);
  
      let list = itemRemove[i].closest("li");
  
      itemRemove[i].addEventListener("click", function(e){
  
        // 取得待辦事項的 id
        let item_id = e.target.closest("li").getAttribute("data-id");
        // 從 localStorage 取得資料
        let tasks = JSON.parse(localStorage.getItem("tasks"));
        // 準備用來放要存到 localStorage 裡的資料
        let updated_tasks = [];
  
  
        let confirmCheck = confirm("確定刪除?");
  
        if(confirmCheck){
  
          list.classList.add("fade_out");
  
          setTimeout(function(){list.remove()}, 1000);
  
          tasks.forEach(function(task, i){
            if(item_id != task.item_id){ // id 不相同的時候              看不懂?
              updated_tasks.push(task); // 將物件資料放至新的陣列中
            }
          });
    
          // 回存至 localStorage
          localStorage.setItem("tasks", JSON.stringify(updated_tasks));
          
        }
      })
    }
    */
  
    document.addEventListener("click", function(e){
            
      if(e.target.classList.contains("btn_delete")){
  
        // 取得待辦事項的 id
        let item_id = e.target.closest("li").getAttribute("data-id");
        // 從 localStorage 取得資料
        let tasks = JSON.parse(localStorage.getItem("tasks"));
        // 準備用來放要存到 localStorage 裡的資料
        let updated_tasks = [];
  
        let confirmCheck = confirm("確定刪除?");
  
        if(confirmCheck){
          // console.log(e.target)

          e.target.closest("li").classList.add("fade_out");
  
          setTimeout(function(){e.target.closest("li").remove()}, 1000);
  
          tasks.forEach(function(task, i){
            if(item_id != task.item_id){ // id 不相同的時候              看不懂?
              updated_tasks.push(task); // 將物件資料放至新的陣列中
            }
          });
    
          // 回存至 localStorage
          localStorage.setItem("tasks", JSON.stringify(updated_tasks)); 
        }
      }
    });
  
      // 清空鈕
  
    let clearAll = document.getElementsByClassName("btn_empty")[0];
  
    clearAll.addEventListener("click", function(){
  
      let ul = document.getElementsByClassName("task_list")[0];
      let allList = ul.querySelectorAll("li");
      let confirmCheck = confirm("確定清空?");  //不會與上面衝到? 能否共用一個??
  
      for(let i = 0; i < allList.length; i++){   //不能用陣列迭代?
  
        if(confirmCheck){
  
          allList[i].classList.add("fade_out");
  
          setTimeout(function(){
              allList[i].remove();
              }  
          , 1000);
          localStorage.clear();
  
        }
      }
    })
  
    // ==================介面4 更新待辦事項==============================
    // ==================資料4 更新 localStorage 中，name 的資料===========
    document.addEventListener("click", function(e){
      if(e.target.classList.contains("btn_update")){
          // 取得更新事項的 id
        let item_id = e.target.closest("li").getAttribute("data-id");
        // 從 localStorage 取得資料
        let tasks = JSON.parse(localStorage.getItem("tasks"));


        let update_task_input = e.target.closest("div.right_block").previousElementSibling.querySelector("input.task_name_update")


          // 按enter輸入
        update_task_input.addEventListener("keydown", function(e){
          if(e.keyCode == 13){
            update_task_input.closest("div.middle_block").nextElementSibling.querySelector("button.btn_update").click()
          }
        })
        // 按enter輸入結束
        update_task_input.classList.toggle("-none")
        

        let update_task_name = (update_task_input.value).trim()
        let para = e.target.closest("div.right_block").previousElementSibling.querySelector("p.para")
        

        if(update_task_name == ""){
          alert('請輸入待辦事項')
          update_task_input.classList.remove("-none")
        }else{
          para.innerHTML = update_task_name
        }

        tasks.forEach(function(task, i){
          if(item_id == task.item_id){ // id 相同
            tasks[i].name = update_task_name; // 資料更新
          }
        });

        // 回存至 localStorage
        localStorage.setItem("tasks", JSON.stringify(tasks));
      }
    })


    //==================介面5 排序==============================

    


    // 往上按鈕
    document.addEventListener("click", function(e){
      if(e.target.classList.contains("btn_up")){
        let item_id = e.target.closest("ul>li").getAttribute("data-id");
        

        
        let li = e.target.closest("ul>li");
        let previousLi = e.target.closest("ul>li").previousElementSibling
        
        if(previousLi != null && item_id != null){
          items_sort(item_id, "up");
          previousLi.insertAdjacentHTML("beforebegin", li.outerHTML);
        li.remove();
        }
      }
    })


    //往下按鈕

    document.addEventListener("click", function(e){
      if(e.target.classList.contains("btn_down")){

        let item_id = e.target.closest("ul>li").getAttribute("data-id");

        
        let li = e.target.closest("ul>li");                        // 不能只寫li?
        let nextLi = e.target.closest("ul>li").nextElementSibling
        
        if(nextLi != null && item_id != null){
          items_sort(item_id, "down");
          nextLi.insertAdjacentHTML("afterend", li.outerHTML);
        li.remove();
        }
      }
    })

    //==================資料5 更新 localStorage 中的排序==============================

    // 寫成一個函式，因為可能會重覆呼叫
    function items_sort(item_id, direction){

      let tasks = JSON.parse(localStorage.getItem("tasks"));

      if(direction == "up"){ // 往上
        let current_li_index;
        let current_li_data;
        let before_li_data;

        tasks.forEach(function(task, i){
          if(item_id == task.item_id){
            current_li_index = i; // 取得點擊的那項 li 的索引值
            current_li_data = task; // 取得點擊到的那項 li 的資料
            before_li_data = tasks[i - 1]; // 取得點擊到的那項 li 的前一項資料
          }
        });
        tasks[current_li_index - 1] = current_li_data;
        tasks[current_li_index] = before_li_data;
      }
      

      if(direction == "down"){ // 往下
        let current_li_index;
        let current_li_data;
        let after_li_data;

        tasks.forEach(function(task, i){
          if(item_id == task.item_id){
            current_li_index = i; // 取得點擊的那項 li 的索引值
            current_li_data = task; // 取得點擊到的那項 li 的資料
            after_li_data = tasks[i + 1]; // 取得點擊到的那項 li 的下一項資料
          }
        });
        tasks[current_li_index] = after_li_data;
        tasks[current_li_index + 1] = current_li_data;
      }

      localStorage.setItem("tasks", JSON.stringify(tasks));
    }




     //==================資料6 重要性的星號==============================

    document.addEventListener("click", function(e){

      // console.log(e.target.closest("span.star"))

      if(e.target.closest("span.star")){

        let starAtt = e.target.closest("span.star").getAttribute("data-star");
        let starNum = e.target.closest("div.star_block").querySelectorAll("span.star");
        
        for( let i = 0; i < starNum.length; i++ ){
          starNum[i].classList.remove("-on")
          
          for( let j = 0; j < starAtt; j++ ){

            starNum[j].classList.add("-on")

          }
        }
        // 取得待辦事項的 id
        let item_id = e.target.closest("li").getAttribute("data-id");

        // 從 localStorage 取得資料
        let tasks = JSON.parse(localStorage.getItem("tasks"));
        tasks.forEach(function(task, i){
          if(item_id == task.item_id){ // id 相同
            tasks[i].star = starAtt; // 更新星號數
          }
        });

        // 回存至 localStorage
        localStorage.setItem("tasks", JSON.stringify(tasks));
        }


      

    })




    
    // document.addEventListener("click", function(e){
    //   if(e.target.closest("span")){
    //     let span_el = e.target.closest("span");
    //     if(span_el.classList.contains("star")){
    
    //       let current_star = parseInt(span_el.getAttribute("data-star"));
    //       let star_span = span_el.closest("div.star_block").querySelectorAll("span.star");
    //       //console.log(star_span);
    //       star_span.forEach(function(star_item, i){
    
    //         if( parseInt(star_item.getAttribute("data-star")) <= current_star ){
    //           star_span[i].classList.add("-on");
    //         }else{
    //           star_span[i].classList.remove("-on");
    //         }
    
    //       });

    

    
  
  
    
  
    
  
    
  
  
         
  
  
  
  
        
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  })