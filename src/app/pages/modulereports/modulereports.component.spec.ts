import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ModulereportsComponent } from './modulereports.component';

describe('ModulereportsComponent', () => {
  let component: ModulereportsComponent;
  let fixture: ComponentFixture<ModulereportsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModulereportsComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ModulereportsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
