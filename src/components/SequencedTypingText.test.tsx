import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { SequencedTypingText } from './SequencedTypingText';

// Mock the animate-ui components
vi.mock('./animate-ui/primitives/texts/typing', () => ({
  TypingText: ({ children, text, delay, duration, ...props }: any) => (
    <span data-testid={`typing-text-${text}`} data-delay={delay} data-duration={duration} {...props}>
      {text}
      {children}
    </span>
  ),
  TypingTextCursor: () => <span data-testid="cursor">|</span>,
}));

describe('SequencedTypingText', () => {
  describe('Line Delay Calculations', () => {
    it('should calculate delays correctly for multiple texts', () => {
      const texts = ['Hello', 'World'];
      render(
        <SequencedTypingText
          texts={texts}
          keystrokeDuration={100}
          delayOffset={500}
          textGap={0}
        />
      );

      const firstText = screen.getByTestId('typing-text-Hello');
      const secondText = screen.getByTestId('typing-text-World');

      // First text: starts at delayOffset
      expect(firstText).toHaveAttribute('data-delay', '500');

      // Second text: delayOffset + (5 chars * 100ms) = 1000ms
      expect(secondText).toHaveAttribute('data-delay', '1000');
    });

    it('should include textGap in delay calculations', () => {
      const texts = ['Hi', 'Bye'];
      render(
        <SequencedTypingText
          texts={texts}
          keystrokeDuration={50}
          delayOffset={0}
          textGap={1000}
        />
      );

      const firstText = screen.getByTestId('typing-text-Hi');
      const secondText = screen.getByTestId('typing-text-Bye');

      // First text: starts at 0
      expect(firstText).toHaveAttribute('data-delay', '0');

      // Second text: 0 + (2 chars * 50ms) + 1000ms textGap = 1100ms
      expect(secondText).toHaveAttribute('data-delay', '1100');
    });

    it('should handle three texts correctly', () => {
      const texts = ['A', 'BB', 'CCC'];
      render(
        <SequencedTypingText
          texts={texts}
          keystrokeDuration={10}
          delayOffset={100}
          textGap={50}
        />
      );

      const text1 = screen.getByTestId('typing-text-A');
      const text2 = screen.getByTestId('typing-text-BB');
      const text3 = screen.getByTestId('typing-text-CCC');

      // Text 1: 100
      expect(text1).toHaveAttribute('data-delay', '100');

      // Text 2: 100 + (1 * 10) + 50 = 160
      expect(text2).toHaveAttribute('data-delay', '160');

      // Text 3: 160 + (2 * 10) + 50 = 230
      expect(text3).toHaveAttribute('data-delay', '230');
    });
  });

  describe('Rendering', () => {
    it('should render all texts', () => {
      const texts = ['First', 'Second', 'Third'];
      render(<SequencedTypingText texts={texts} />);

      expect(screen.getByTestId('typing-text-First')).toBeInTheDocument();
      expect(screen.getByTestId('typing-text-Second')).toBeInTheDocument();
      expect(screen.getByTestId('typing-text-Third')).toBeInTheDocument();
    });

    it('should apply keystrokeDuration to all texts', () => {
      const texts = ['One', 'Two'];
      render(<SequencedTypingText texts={texts} keystrokeDuration={25} />);

      const allTexts = screen.getAllByTestId(/^typing-text-/);
      allTexts.forEach((text) => {
        expect(text).toHaveAttribute('data-duration', '25');
      });
    });

    it('should pass through additional props to TypingText', () => {
      render(
        <SequencedTypingText
          texts={['Test']}
          className="custom-class"
          data-custom="value"
        />
      );

      const text = screen.getByTestId('typing-text-Test');
      expect(text).toHaveClass('custom-class');
      expect(text).toHaveAttribute('data-custom', 'value');
    });
  });

  describe('Cursor Behavior', () => {
    it('should not render cursor when cursor config is not provided', () => {
      render(<SequencedTypingText texts={['Hello']} />);
      expect(screen.queryByTestId('cursor')).not.toBeInTheDocument();
    });

    it('should render cursor on first line when showImmediately is true', () => {
      render(
        <SequencedTypingText
          texts={['First', 'Second']}
          cursor={{ showImmediately: true }}
        />
      );

      // At time 0, cursor should be on first line
      expect(screen.getByTestId('cursor')).toBeInTheDocument();
    });

    it('should show cursor on correct line at correct time', () => {
      render(
        <SequencedTypingText
          texts={['AAA', 'BBB']}
          keystrokeDuration={100}
          delayOffset={500}
          textGap={200}
          cursor={{ showImmediately: false }}
        />
      );

      // Initially no cursor (before delayOffset)
      expect(screen.queryByTestId('cursor')).not.toBeInTheDocument();

      // At 500ms, first line starts typing - cursor appears
      vi.advanceTimersByTime(500);
      expect(screen.getByTestId('cursor')).toBeInTheDocument();

      // First line finishes at 500 + (3 * 100) = 800ms
      // Cursor should disappear at 800 + (200/2) = 900ms
      vi.advanceTimersByTime(400); // Now at 900ms
      expect(screen.queryByTestId('cursor')).not.toBeInTheDocument();

      // Second line cursor appears at 800 + (200/2) = 900ms (already there)
      // Should reappear immediately
      vi.advanceTimersByTime(1); // Now at 901ms
      expect(screen.getByTestId('cursor')).toBeInTheDocument();
    });

    it('should persist cursor on last line when persistenceDuration is null', () => {
      render(
        <SequencedTypingText
          texts={['Test']}
          keystrokeDuration={10}
          delayOffset={100}
          cursor={{ showImmediately: false, persistenceDuration: null }}
        />
      );

      // Cursor appears at 100ms
      vi.advanceTimersByTime(100);
      expect(screen.getByTestId('cursor')).toBeInTheDocument();

      // Text finishes at 100 + (4 * 10) = 140ms
      vi.advanceTimersByTime(40);

      // Cursor should still be there (persists forever)
      vi.advanceTimersByTime(10000);
      expect(screen.getByTestId('cursor')).toBeInTheDocument();
    });

    it('should hide cursor after persistenceDuration on last line', () => {
      render(
        <SequencedTypingText
          texts={['Test']}
          keystrokeDuration={10}
          delayOffset={100}
          cursor={{ showImmediately: false, persistenceDuration: 500 }}
        />
      );

      // Cursor appears at 100ms
      vi.advanceTimersByTime(100);
      expect(screen.getByTestId('cursor')).toBeInTheDocument();

      // Text finishes at 100 + (4 * 10) = 140ms
      // Cursor should hide at 140 + 500 = 640ms
      vi.advanceTimersByTime(539); // Now at 639ms
      expect(screen.getByTestId('cursor')).toBeInTheDocument();

      vi.advanceTimersByTime(1); // Now at 640ms
      expect(screen.queryByTestId('cursor')).not.toBeInTheDocument();
    });

    it('should handle cursor with textGap split between lines', () => {
      render(
        <SequencedTypingText
          texts={['AA', 'BB']}
          keystrokeDuration={100}
          delayOffset={0}
          textGap={400}
          cursor={{ showImmediately: true }}
        />
      );

      // Cursor starts on first line immediately
      expect(screen.getByTestId('cursor')).toBeInTheDocument();

      // First line finishes at 0 + (2 * 100) = 200ms
      // Cursor stays for textGap/2 = 200ms more, so until 400ms
      vi.advanceTimersByTime(400);
      expect(screen.queryByTestId('cursor')).not.toBeInTheDocument();

      // Second line cursor appears at 200 + 400 - (400/2) = 400ms
      // Already at 400ms, so cursor should reappear
      vi.advanceTimersByTime(1);
      expect(screen.getByTestId('cursor')).toBeInTheDocument();
    });
  });

  describe('Edge Cases', () => {
    it('should handle single text', () => {
      render(<SequencedTypingText texts={['Solo']} />);
      expect(screen.getByTestId('typing-text-Solo')).toBeInTheDocument();
    });

    it('should handle empty text in array', () => {
      render(<SequencedTypingText texts={['', 'Content']} />);
      expect(screen.getByTestId('typing-text-')).toBeInTheDocument();
      expect(screen.getByTestId('typing-text-Content')).toBeInTheDocument();
    });

    it('should handle zero keystrokeDuration', () => {
      const texts = ['Fast'];
      render(
        <SequencedTypingText
          texts={texts}
          keystrokeDuration={0}
          delayOffset={100}
        />
      );

      const text = screen.getByTestId('typing-text-Fast');
      expect(text).toHaveAttribute('data-delay', '100');
    });

    it('should handle very long texts', () => {
      const longText = 'A'.repeat(1000);
      render(
        <SequencedTypingText
          texts={[longText]}
          keystrokeDuration={1}
          delayOffset={0}
        />
      );

      const text = screen.getByTestId(`typing-text-${longText}`);
      expect(text).toHaveAttribute('data-delay', '0');
    });

    it('should handle cursor with persistenceDuration of 0', () => {
      render(
        <SequencedTypingText
          texts={['Quick']}
          keystrokeDuration={10}
          delayOffset={0}
          cursor={{ showImmediately: true, persistenceDuration: 0 }}
        />
      );

      // Cursor appears immediately
      expect(screen.getByTestId('cursor')).toBeInTheDocument();

      // Text finishes at 0 + (5 * 10) = 50ms
      // Cursor should disappear at 50 + 0 = 50ms
      vi.advanceTimersByTime(50);
      expect(screen.queryByTestId('cursor')).not.toBeInTheDocument();
    });
  });

  describe('Complex Scenarios', () => {
    it('should handle multiple lines with complex timing', () => {
      const texts = ['Product · Development', 'Intelligent Guidance'];
      render(
        <SequencedTypingText
          texts={texts}
          keystrokeDuration={24}
          delayOffset={1000}
          textGap={2000}
          cursor={{ showImmediately: false, persistenceDuration: 3000 }}
        />
      );

      // Line 1: 21 chars, delay = 1000
      const line1 = screen.getByTestId('typing-text-Product · Development');
      expect(line1).toHaveAttribute('data-delay', '1000');

      // Line 2: delay = 1000 + (21 * 24) + 2000 = 3504
      const line2 = screen.getByTestId('typing-text-Intelligent Guidance');
      expect(line2).toHaveAttribute('data-delay', '3504');

      // Cursor timing:
      // - Appears at 1000ms (first line starts)
      vi.advanceTimersByTime(1000);
      expect(screen.getByTestId('cursor')).toBeInTheDocument();

      // - Line 1 finishes at 1504ms, cursor stays until 1504 + 1000 = 2504ms
      vi.advanceTimersByTime(1504); // Now at 2504ms
      expect(screen.queryByTestId('cursor')).not.toBeInTheDocument();

      // - Line 2 cursor appears at 3504 - 1000 = 2504ms (already there)
      vi.advanceTimersByTime(1); // Now at 2505ms
      expect(screen.getByTestId('cursor')).toBeInTheDocument();

      // - Line 2 finishes at 3504 + (20 * 24) = 3984ms
      // - Cursor disappears at 3984 + 3000 = 6984ms
      vi.advanceTimersByTime(4479); // Now at 6984ms
      expect(screen.queryByTestId('cursor')).not.toBeInTheDocument();
    });
  });
});
