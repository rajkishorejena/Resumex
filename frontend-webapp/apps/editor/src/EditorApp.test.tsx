import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import EditorApp from './EditorApp';

describe('EditorApp', () => {
  it('updates the live preview as the user types', () => {
    render(<EditorApp />);
    const textarea = screen.getByLabelText(/summary/i);
    fireEvent.change(textarea, { target: { value: 'Senior engineer' } });
    expect(screen.getByTestId('live-preview')).toHaveTextContent('Senior engineer');
  });
});
