export class Series {
  label: string;
  data: any[];
  
  constructor(label: string) {
    this.label = label;
  }
  
  add(val: any) {
    this.data.push(val);
  }
  
  clear() {
    this.data = [];
  }
  
  result() {
    let that = this;
    
    return {
      label: that.label,
      data: that.data
    }
  }
}
