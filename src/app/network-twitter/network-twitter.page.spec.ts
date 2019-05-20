import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NetworkTwitterPage } from './network-twitter.page';

describe('NetworkTwitterPage', () => {
  let component: NetworkTwitterPage;
  let fixture: ComponentFixture<NetworkTwitterPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NetworkTwitterPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NetworkTwitterPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
