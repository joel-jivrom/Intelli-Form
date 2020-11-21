import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ListService {
  list = JSON.parse(localStorage.getItem('List'));
  male: number;
  female:number;
  total: number;
  malePercent: any;
  femalePercent: any;
  constructor() { 
    
  }

  loadList() {
    var list = JSON.parse(localStorage.getItem('List'));
    
    if( list == null) {
      const sampleData = [
        {
          "Name" : "John doe",
          "Gender" : "Male",
          "Email" : "johndoe@mail.com",
          "Number" : "9123456789",
          "Message" : "Lorem ipsum is simerat"
        },
        {
          "Name" : "Richard A",
          "Gender" : "Male",
          "Email" : "richard@mail.com",
          "Number" : "8456987854",
          "Message" : "Lorem ipsum is simerat"
        },
        {
          "Name" : "Michelle",
          "Gender" : "Female",
          "Email" : "michelle@mail.com",
          "Number" : "7546985423",
          "Message" : "Lorem ipsum is simerat"
        },
        {
          "Name" : "Linda F",
          "Gender" : "Female",
          "Email" : "lindaf@mail.com",
          "Number" : "9312456987",
          "Message" : "Lorem ipsum is simerat"
        },
        {
          "Name" : "Lisa",
          "Gender" : "Female",
          "Email" : "lindaf@mail.com",
          "Number" : "9312456789",
          "Message" : "Lorem ipsum is simerat"
        },
        {
          "Name" : "Lyra",
          "Gender" : "Female",
          "Email" : "lyraf@mail.com",
          "Number" : "9412456789",
          "Message" : "Lorem ipsum is simerat"
        },
      ];
      localStorage.setItem('List', JSON.stringify(sampleData));
      this.setPercentages(sampleData)
      // console.log(" The List added: "+localStorage.getItem('List'));
      
    } else {
      this.setPercentages(list);
      // console.log(" The List stored: "+JSON.stringify(list));
    }

    console.log(" The list contains "+this.objectCount(list)+" items.");
    
  }

  getList() {
    return JSON.parse(localStorage.getItem('List'));
  }


  private genderCount(list) {
    let counter = 0;
    for(const obj of list) {
      if(obj.Gender === 'Male')
      counter++;
    }
    return counter;
  }

  private objectCount(list) {
    let counter = 0;
    for(const obj of list) {
      counter++;
    }
    return counter;
  
  }

  count(string) {
    this.list = JSON.parse(localStorage.getItem('List'));
    this.male = this.genderCount(this.list);
    this.total = this.objectCount(this.list);
    this.female = this.total - this.male;
    if(string ==="Male") {
      return this.male;
    } else if (string ==="Female") {
      return this.female;
    } else {
      return null;
    }
  }

  percentage(string) {
    this.list = JSON.parse(localStorage.getItem('List'));
    this.male = this.genderCount(this.list);
    this.total = this.objectCount(this.list);
    this.female = this.total - this.male;
    this.malePercent = ((this.male/this.total)*100);
    this.femalePercent = ((this.female/this.total)*100);
    if(string ==="Male") {
      localStorage.setItem('Males', this.malePercent);
      return this.malePercent;
    } else if (string ==="Female") {
      localStorage.setItem('Females', this.femalePercent);
      return this.femalePercent;
    } else {
      return null;
    }
  }

  private setPercentages(newList) {
    this.male = this.genderCount(newList);
    this.total = this.objectCount(newList);
    this.female = this.total - this.male;
    this.malePercent = ((this.male/this.total)*100);
    this.femalePercent = ((this.female/this.total)*100);
    localStorage.setItem('Females', this.femalePercent);
    localStorage.setItem('Males', this.malePercent);
  }

  addToList(formData) {
    this.list = JSON.parse(localStorage.getItem('List'));
    if(this.list != null){
      this.list.push(formData);
      this.setPercentages(this.list);
      localStorage.setItem('List', JSON.stringify(this.list));
    } else {
      this.list = [];
      this.list.push(formData);
      this.setPercentages(this.list);
      localStorage.setItem('List', JSON.stringify(this.list));
    }
  }
}
