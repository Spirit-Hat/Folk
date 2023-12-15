export interface ProductdDTO {

  id:number;
  name:string;
  status:string;
  image: string[];
  previewImage: string;
  price: number;
  oldPrice? : number;
}
