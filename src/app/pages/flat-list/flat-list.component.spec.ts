import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FlatsListComponent } from './flat-list.component';

describe('FlatListComponent', () => {
  let component: FlatsListComponent;
  let fixture: ComponentFixture<FlatsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FlatsListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FlatsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
