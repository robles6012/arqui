import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductCrearComponent } from './product-crear.component';

describe('ProductCrearComponent', () => {
  let component: ProductCrearComponent;
  let fixture: ComponentFixture<ProductCrearComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductCrearComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProductCrearComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
