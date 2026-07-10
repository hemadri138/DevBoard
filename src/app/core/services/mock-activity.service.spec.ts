import { MockActivityService } from './mock-activity.service';

describe('MockActivityService', () => {
  it('expands activity rows to the configured virtual-scroll load size', () => {
    const service = new MockActivityService();
    const rows = service.expandRecentItems([], {
      preset: '30d',
      since: '2026-06-10T00:00:00.000Z',
      until: '2026-07-10T00:00:00.000Z'
    });

    expect(rows.length).toBe(5000);
    expect(rows.some((row) => row.type === 'pull-request')).toBeTrue();
    expect(rows.some((row) => /\/pull\/\d+$/.test(row.url))).toBeTrue();
    expect(rows.some((row) => /\/commit\/[a-f0-9]{40}$/.test(row.url))).toBeTrue();
  });
});
