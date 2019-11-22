import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { element } from 'protractor';
import { Subject } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { ElementSchemaRegistry } from '@angular/compiler';
import { DataService } from 'src/app/services/data.service';
import { AngularFireAuth } from 'angularfire2/auth';

@Component({
  selector: 'app-members',
  templateUrl: './members.component.html',
  styleUrls: ['./members.component.css']
})
export class MembersComponent implements OnInit {

  projectKey : string;
  requestedProject : any
  memberList = []
  memberInfo = null
  selectedMembers=[];

  constructor(private db: AngularFireDatabase , 
              private data : DataService , 
              private afAuth: AngularFireAuth){
    this.data.currentMessage$.subscribe(message => {
      this.projectKey = message
      this.getDetails()
      this.getMemberList()
    })
   }

  ngOnInit() { 
  }

  getMemberList()
  {
    this.db.list(`projects/${this.projectKey}/members`).snapshotChanges().subscribe(
      list => {
        this.memberList = list.map(item => {
          return {
            $key: item.key,
            ...item.payload.val()
          };
        });
      });
  }

  SearchMembers(frm) {
    this.selectedMembers = [];
    let keys = frm.value.skills;
    let  user = []
    this.db.list("Users").snapshotChanges().
      subscribe(
        list => {
          user = list.map(item => {
            return {
              $key: item.key,
              ...item.payload.val()
            };
        });
        // logic
        user.forEach(element => {
            for(var i = 0 ; i < keys.length; i++)
            { 
              if(!element["skills"].includes(keys[i]))
                break
            }            
            if(i == keys.length)
            { 
              for(var j = 0 ; j < this.memberList.length ; j++)
              {
                if ( this.memberList[j]['id'] == element['$key'])
                { 
                  break
                }   
              }
              if (j == this.memberList.length) // not a member of team
              { 
                console.log("Checking his request list")
                this.db.database.ref(`Users/${element['$key']}`).child('requests').once('value' , snap => 
                {
                  if ( snap.val() == null)
                  { 
                    console.log("List is empty so ready to add")
                    this.selectedMembers.push(element)
                  }
                  else
                  {
                    let requests =  [];
                    requests = snap.val()
                    for(var k = 0 ; k < requests.length ; k++)
                    {
                      if ( requests[k]['projectId'] == this.projectKey)
                        break;
                    }
                    if ( k == requests.length )
                    {
                      this.selectedMembers.push(element)
                    }
                    else
                    {
                      console.log("Request is already sent")
                    }
                  }
                })
              }
              else // already in team
              {
                console.log("Already in team") 
              }
            }
        });
    });  
  }

  getDetails()
  {
    let path = 'projects/'+ this.projectKey

    this.db.database.ref(path).on('value' , snap => {
      this.requestedProject = snap.val()
    })
  }

  sendRequest(key)
  { 
    this.db.database.ref(`Users/${key}`).child('requests').push({
      projectId : this.projectKey , 
      name : this.requestedProject['name'] , 
      description : this.requestedProject['description']
    })
  }

  Details(key)
  {
    this.db.database.ref(`Users/${key}`).on('value' , snap => {
      this.memberInfo = snap.val();
      console.log(this.memberInfo)
    })
  }
  onChange(event) {
  }
}
 