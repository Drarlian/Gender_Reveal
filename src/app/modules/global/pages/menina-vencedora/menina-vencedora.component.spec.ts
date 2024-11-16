import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MeninaVencedoraComponent } from './menina-vencedora.component';

describe('MeninaVencedoraComponent', () => {
  let component: MeninaVencedoraComponent;
  let fixture: ComponentFixture<MeninaVencedoraComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MeninaVencedoraComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MeninaVencedoraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
