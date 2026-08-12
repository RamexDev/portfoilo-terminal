import { useCallback } from 'react';

/**
 * Tab-completion hook for the interactive terminal.
 *
 * Given the current input and a list of candidate tokens, returns the
 * completed input if exactly one candidate starts with the current token,
 * or the longest common prefix if multiple candidates match.
 */
export function useTabComplete(candidates: string[]) {
  return useCallback(
    (input: string): string | null => {
      // Tokenize by whitespace — complete the last token only
      const tokens = input.split(/\s+/);
      const last = tokens[tokens.length - 1] ?? '';

      // Empty input — list all candidates
      if (input.trim() === '') {
        return null; // caller can decide to print candidates
      }

      // If there's a trailing space, we're starting a new token
      const endsWithSpace = /\s$/.test(input);
      if (endsWithSpace) {
        return null;
      }

      const matches = candidates.filter((c) => c.toLowerCase().startsWith(last.toLowerCase()));

      if (matches.length === 0) return null;
      if (matches.length === 1) {
        const completed = matches[0];
        tokens[tokens.length - 1] = completed;
        return tokens.join(' ') + ' ';
      }

      // Multiple matches — extend to longest common prefix
      const sorted = [...matches].sort();
      let prefix = sorted[0];
      for (let i = 1; i < sorted.length; i++) {
        const candidate = sorted[i];
        let j = 0;
        while (j < prefix.length && j < candidate.length && prefix[j].toLowerCase() === candidate[j].toLowerCase()) {
          j++;
        }
        prefix = prefix.slice(0, j);
      }

      if (prefix.length > last.length) {
        tokens[tokens.length - 1] = prefix;
        return tokens.join(' ');
      }

      // No further completion possible — return null so caller can list matches
      return null;
    },
    [candidates],
  );
}
