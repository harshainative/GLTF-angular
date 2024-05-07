import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SceneObjectComponent } from './scene-object.component';

describe('SceneObjectComponent', () => {
  let component: SceneObjectComponent;
  let fixture: ComponentFixture<SceneObjectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SceneObjectComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SceneObjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
