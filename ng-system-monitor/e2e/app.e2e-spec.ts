import { NgSystemMonitorPage } from './app.po';

describe('ng-system-monitor App', () => {
  let page: NgSystemMonitorPage;

  beforeEach(() => {
    page = new NgSystemMonitorPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
