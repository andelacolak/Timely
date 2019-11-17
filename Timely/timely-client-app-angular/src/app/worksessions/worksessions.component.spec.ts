import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WorksessionsComponent } from './worksessions.component';

describe('WorksessionsComponent', () => {
  let component: WorksessionsComponent;
  let fixture: ComponentFixture<WorksessionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WorksessionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WorksessionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
