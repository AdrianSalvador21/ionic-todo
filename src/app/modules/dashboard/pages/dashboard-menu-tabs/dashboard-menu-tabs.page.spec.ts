import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { DashboardMenuTabsPage } from './dashboard-menu-tabs.page';

describe('DashboardMenuTabsPage', () => {
  let component: DashboardMenuTabsPage;
  let fixture: ComponentFixture<DashboardMenuTabsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DashboardMenuTabsPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(DashboardMenuTabsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
