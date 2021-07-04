import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MazeControlComponent } from './maze-control.component';

describe('MazeControlComponent', () => {
  let component: MazeControlComponent;
  let fixture: ComponentFixture<MazeControlComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MazeControlComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MazeControlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
