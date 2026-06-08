import { render, screen, waitFor } from '@testing-library/react';
import TransparencyTable from '@/components/Transparansi/TransparencyTable';
import * as transparency from '@/lib/transparency';

jest.mock('@/lib/transparency');

describe('TransparencyTable', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders table with records', async () => {
    const mockRecords = [
      {
        id: 1,
        activity: 'Pemerintahan',
        category: 'Pemerintahan',
        budget: 1250000000,
        realized: 920000000,
        note: 'Gaji & Ops Kantor',
        status: 'PUBLISHED' as const,
        createdAt: '2024-01-01T00:00:00.000Z',
        updatedAt: '2024-01-01T00:00:00.000Z',
      },
    ];

    (transparency.getPublishedTransparencyRecords as jest.Mock).mockResolvedValue(mockRecords);

    render(<TransparencyTable />);

    await waitFor(() => {
      expect(screen.getByText('Rincian Realisasi APBD Desa')).toBeInTheDocument();
      expect(screen.getByText('Pemerintahan')).toBeInTheDocument();
    });
  });

  it('shows empty state when no records', async () => {
    (transparency.getPublishedTransparencyRecords as jest.Mock).mockResolvedValue([]);

    render(<TransparencyTable />);

    await waitFor(() => {
      expect(screen.getByText('Rincian Realisasi APBD Desa')).toBeInTheDocument();
      expect(screen.getByText('TOTAL')).toBeInTheDocument();
    });
  });
});