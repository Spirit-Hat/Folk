import {Component, Input, OnInit} from '@angular/core';
import {SVG} from "../../../../environments/environment";
import {CatalogDTO} from "../add-product/add-product.component";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AlertTips} from "../../../../service/alertTips";
import {API} from "../../../../service/api/API";

@Component({
  selector: 'fc-add-catalog',
  templateUrl: './add-catalog.component.html',
  styleUrls: ['./add-catalog.component.scss']
})
export class AddCatalogComponent implements OnInit {

  public alertErrors = new AlertTips();
  public svg = SVG;

  categoryList: CatalogDTO[] = []

  formCatalog : any;
  renameFormCatalog: any;
  selectedId: number | undefined;

  constructor(
    private api: API
  ) { }

  ngOnInit(): void {
    this.getCatolog()
    this.formCatalog = new FormGroup({
      'catalog': new FormControl(null,[
        Validators.required,
        // Validators.pattern('^[a-zA-Zа-яієїґА-ЯІЄЇҐ\']+'),
        Validators.maxLength(30)])
    })
    this.renameFormCatalog = new FormGroup({
      'select-catalog': new FormControl(null,[
        Validators.required,
        // Validators.pattern('^[a-zA-Zа-яієїґА-ЯІЄЇҐ\']+'),
        Validators.maxLength(30)])
    })
  }

  addNewCatalog(){
    if(this.formCatalog.invalid) return
    this.api.saveCategory(this.catalog.value).subscribe(
      response =>{
        console.log("Category Create",response)
        this.getCatolog()
      }
    )
  }
  getCatolog(){
    this.api.getAllCategories().subscribe(categories => {
      this.categoryList = categories;
      console.log(categories);
    });

  }
  renameCatalog(){
    if(this.renameFormCatalog.invalid) return
    // this.selectedId= undefined;
    if(this.selectedId)
    this.api.updateCategory(this.selectedId,this.selectCatalog.value).subscribe(
      (response) => {
        console.log('Category updated successfully:', response);
        this.getCatolog()
      }
    )
  }
  deleteCategory(id:number){
    this.api.deleteCategory(id).subscribe(
      (response) => {
        console.log('Category updated successfully:', response);
        this.getCatolog()
      }
    )
  }
  get selectCatalog() {return this.renameFormCatalog.get('select-catalog');}
  get catalog() { return this.formCatalog.get('catalog'); }
}
