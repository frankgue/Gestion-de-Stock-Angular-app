import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListScategoryComponent } from './list-scategory.component';

describe('ListScategoryComponent', () => {
  let component: ListScategoryComponent;
  let fixture: ComponentFixture<ListScategoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ListScategoryComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListScategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
