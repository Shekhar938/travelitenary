import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItineraryResultComponent } from './itinerary-result.component';

describe('ItineraryResultComponent', () => {
  let component: ItineraryResultComponent;
  let fixture: ComponentFixture<ItineraryResultComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ItineraryResultComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ItineraryResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
