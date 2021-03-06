require("babel-polyfill");
import abstract from "./abstract.js";

export default class Plates extends abstract{


  constructor(screenManager){
    super(screenManager);
  }

  async init(){
    await this.setScreen("plates");

    this.addListener("click_b2", (e)=>{
      this.changePage("home");
    });
    
    this.addListener("click_b4", (e)=>{
      this.changePage("plate", this.plates[this.currentIndex]);
    });
    this.addListener("click_b5", (e)=>{
      this.changePage("plate", this.plates[this.currentIndex+1]);
    });
    this.addListener("click_b6", (e)=>{
      this.changePage("plate", this.plates[this.currentIndex+2]);
    });
    this.addListener("click_b7", (e)=>{
      this.changePage("plate", this.plates[this.currentIndex+3]);
    });
    this.addListener("click_b8", (e)=>{
      this.changePage("plate", this.plates[this.currentIndex+4]);
    });
    
    this.plates = await this.nanoDLP.getPlates();
    console.log(this.plates);
    let gap = 100/(this.plates.length-4);
    
    this.addListener("number", (scroll)=>{
      scroll = Math.floor((100-scroll)/gap);
      if(scroll<=this.plates.length-5)
        this.updateList(scroll);
    });
    
    this.updateList(0);
  }
  
  async updateList(index){  
    this.currentIndex = index;
    this.setText("b4", (index+1) + ". " + this.plates[index].Path);
    this.setText("b5", (index+2) + ". " + this.plates[index+1].Path);
    this.setText("b6", (index+3) + ". " + this.plates[index+2].Path);
    this.setText("b7", (index+4) + ". " + this.plates[index+3].Path);
    this.setText("b8", (index+5) + ". " + this.plates[index+4].Path);
  }
}
