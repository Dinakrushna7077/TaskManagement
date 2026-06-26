import { Component, computed, effect, Signal, signal, WritableSignal } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  imports: [FormsModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('Task Management');
  protected caption=signal("New Task");
  
task:string="";
date:string="";
hh=signal(0);
mm=signal(0);
message=signal("");
msgClass="";
updateId=0;
taskList:{id:number,task:string,date:string,hh:number,mm:number}[]=[];
formValidation=()=>{
  if(this.task.trim()!=="")
  {
    if(this.date!=="")
    {
      if((this.mm()!==0&&this.hh()===0)||(this.mm()===0&&this.hh()!==0)||(this.mm()!==0&&this.hh()!==0))
      {
        return true;
      }
      else
      {
        this.showMessage("Please Enter Duration time","text-danger");
        (document.getElementById('hhInput') as HTMLInputElement).focus();
      }
    }
    else
    {
      this.showMessage("Please Enter Date","text-danger");
      (document.getElementById('dateInput') as HTMLInputElement).focus();
    }
  }
  else
  {
    this.showMessage("Please Enter Task Name","text-danger");
    (document.getElementById('taskInput') as HTMLInputElement).focus();
  }
  return false;
}
addTask=()=>{
    let i=this.taskList.length+1;
    console.log(i);
    this.taskList.push({id:i,task:this.task.trim(),date:this.date,hh:this.hh(),mm:this.mm()});
    this.setDefaultValue();
    (document.getElementById('taskInput') as HTMLInputElement).focus();
    this.showMessage("New task created...","text-success");
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
  this.setDefaultValue();
  (document.getElementById('taskInput') as HTMLInputElement).focus();
}

//edit task
editTask=(i:number)=>{
  let _task=this.taskList.find(t=>t.id==i);
  console.log(_task);
  console.log(this.taskList);
  if(_task!=null)
  {
    this.task=_task.task;
    this.date=_task.date;
    this.updateId=_task.id;
    this.hh.set(_task.hh);
    this.mm.set(_task.mm);
    this.caption.set("Edit Task");
    (document.getElementById('taskInput') as HTMLInputElement).focus();
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
    this.showMessage("Update Successfully...","text-success");
  }
  else
  {
    this.showMessage("Task Unavailable...","text-danger");
  }
  this.caption.set("New Task");
  this.setDefaultValue();
}
//cancel update
cancelEdit=()=>{
  this.setDefaultValue();
  this.updateId=0;
  this.caption.set("New Task");
}
constructor()
{
      this.taskList.push(
        {id:1,task:"Learning .Net Core",date:"2026-06-12",hh:1,mm:30},
        {id:2,task:"Learning Angular",date:"2026-06-12",hh:2,mm:30},
        {id:3,task:"Practice Query",date:"2026-06-12",hh:1,mm:0}
      );
  effect(()=>{
    this.mm.set(Math.floor(this.mm()))
    if(this.mm()>60)
    {
      this.hh.set(this.hh()+Math.floor(this.mm()/60));
      this.mm.set(this.mm()%60);
    }
  })
}

}
