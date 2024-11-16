import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MeninoVencedorComponent } from './menino-vencedor.component';

describe('MeninoVencedorComponent', () => {
  let component: MeninoVencedorComponent;
  let fixture: ComponentFixture<MeninoVencedorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MeninoVencedorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MeninoVencedorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
