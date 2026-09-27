import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import TemplatesApp from './TemplatesApp';

describe('TemplatesApp', () => {
  it('updates the selected template when a card is clicked', () => {
    render(<TemplatesApp />);
    fireEvent.click(screen.getByTestId('template-classic'));
    expect(screen.getByTestId('selected-template')).toHaveTextContent('classic');
  });
});
