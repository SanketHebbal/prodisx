import { Component, OnInit } from '@angular/core';
import { TodoService } from '../todo.service';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html'
})

export class TodoListComponent implements OnInit 
{  
  todoArray = [];
  showDeletedMessage: boolean;

  constructor(private todoService: TodoService) {
  }
  
  ngOnInit() 
  {
    this.todoService.getTodo().subscribe(
      list => {
        this.todoArray = list.map(item => {
          return {
            $key: item.key,
            ...item.payload.val()
          };
        });
      });
  }

  onChange(val:any , key : any) {
    let status = val['srcElement']['value']
    this.todoService.setStatus(key , status )
    if(status == 'Completed')  
      this.onDelete(key)
  }

  onDelete($key) 
  {
    if (confirm('Task Completed ?')) 
    {
      this.todoService.deleteTodo($key);
      this.showDeletedMessage = true;
      setTimeout(() => this.showDeletedMessage = false, 3000);
    }
  } 
}