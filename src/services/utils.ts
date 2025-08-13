  
  
  export const utils= {

    formatTime: (miliseconds:number) => {
      const sec_str = (Math.floor(miliseconds / 1000) % 60).toString().padStart(2, "0");
      const min_str = (Math.floor(miliseconds / 60000) % 60).toString().padStart(2, "0");
      const hour_str = (Math.floor(miliseconds / 3600000) % 60).toString().padStart(2, "0");
      
      return hour_str + ":" + min_str + ":" + sec_str; 
    },

    padNum: (n : number) => { return n.toString().padStart(2, "0") }
}