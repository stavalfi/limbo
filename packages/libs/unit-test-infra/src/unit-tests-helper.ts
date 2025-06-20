import { after, before, mock } from "node:test";
import nock from "nock";

export function setupUnitTests(): void {
  before(() => {
    mock.restoreAll();
    nock.cleanAll();
    nock.disableNetConnect();
  });

  after(() => {
    nock.enableNetConnect();
    nock.cleanAll();
    mock.restoreAll();
  });
}
