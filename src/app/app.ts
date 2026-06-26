import { Component, computed, effect, Signal, signal, WritableSignal } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  imports: [FormsModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  //protected readonly title = signal('TaskManagement');
  
task:string="";
date:string="";
hh=signal(0);
mm=signal(0);
message=signal("");
msgClass="";
updateId=0;
taskList:{id:number,task:string,date:string,hh:number,mm:number}[]=[];
addTask=()=>{
  if(this.task.trim()!==""&& this.date.trim()!=="")
  {
    let i=this.taskList.length+1;
    console.log(this.mm())
    this.taskList.push({id:i,task:this.task.trim(),date:this.date,hh:this.hh(),mm:this.mm()});
    this.setDefaultValue();
    const taskInput = document.getElementById('taskInput') as HTMLInputElement;
    taskInput.focus();
    this.showMessage("New task created...","text-success");
  }
  else
  {
    this.showMessage("Please fill all the fields","text-danger");
  }
}
setDefaultValue=()=>{
    this.task="";
    this.date="";
    this.hh.set(0);
    this.mm.set(0);
}
showMessage = (msg: string,cls:string) => {
  this.message.set(msg);
  this.msgClass=cls;
  setTimeout(() => {
    this.message.set('');
    this.msgClass="";
  }, 7000);
}
//Delete task
deleteTask=(index:number)=>{
  this.taskList.splice(index,1);
  this.showMessage("Task Deleted Successfully...","text-success");
}

//edit task
editTask=(i:number)=>{
  const _task=this.taskList.find(t=>t.id=i);
  if(_task!=null)
  {
    this.task=_task.task;
    this.date=_task.date;
    this.updateId=_task.id;
    this.hh.set(_task.hh);
    this.mm.set(_task.mm);
  }
}
//update task
updateTask=(updateId:number)=>
{
  const _task=this.taskList.find(t=>t.id=updateId);
  if(_task!=null)
  {
    _task.date=this.date;
    _task.task=this.task;
    _task.hh=this.hh();
    _task.mm=this.mm();
    this.setDefaultValue()
    this.showMessage("Update Successfully...","text-success");
  }
  else
  {
    this.setDefaultValue()
    this.showMessage("Task Unavailable...","text-danger");
  }
}
constructor()
{
  effect(()=>{
    if(this.mm()>60)
    {
      this.hh.set(Math.floor(this.mm()/60));
      this.mm.set(this.mm()%60);
    }
  })
}

}
