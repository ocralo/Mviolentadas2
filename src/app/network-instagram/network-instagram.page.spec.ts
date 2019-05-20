import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NetworkInstagramPage } from './network-instagram.page';

describe('NetworkInstagramPage', () => {
  let component: NetworkInstagramPage;
  let fixture: ComponentFixture<NetworkInstagramPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NetworkInstagramPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NetworkInstagramPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
