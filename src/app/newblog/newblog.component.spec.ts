import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewblogComponent } from './newblog.component';

describe('NewblogComponent', () => {
  let component: NewblogComponent;
  let fixture: ComponentFixture<NewblogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NewblogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewblogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
