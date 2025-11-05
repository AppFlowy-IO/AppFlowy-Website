'use client';

import { Component, ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

/**
 * Error boundary to handle ChunkLoadError
 * Automatically reloads the page once when chunk loading fails
 * This typically happens after deployments when cached HTML
 * tries to load new chunk files that have different hashes
 */
export class ChunkLoadErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  componentDidMount() {
    if (typeof window === 'undefined') {
      return;
    }

    // Only clear the reload marker when we reach a clean render
    if (!this.state.hasError && sessionStorage.getItem('chunk-load-error-reloaded')) {
      sessionStorage.removeItem('chunk-load-error-reloaded');
    }
  }

  private handleManualReload = () => {
    if (typeof window === 'undefined') {
      return;
    }

    sessionStorage.removeItem('chunk-load-error-reloaded');
    window.location.reload();
  };

  static getDerivedStateFromError(error: Error): State {
    // Check if it's a chunk loading error
    const isChunkLoadError =
      error.name === 'ChunkLoadError' ||
      error.message.includes('Loading chunk') ||
      error.message.includes('ChunkLoadError');

    return { hasError: isChunkLoadError, error };
  }

  componentDidCatch(error: Error) {
    // Only handle chunk load errors
    const isChunkLoadError =
      error.name === 'ChunkLoadError' ||
      error.message.includes('Loading chunk') ||
      error.message.includes('ChunkLoadError');

    if (isChunkLoadError) {
      console.warn('[ChunkLoadError] Detected chunk loading failure, reloading page...');

      // Check if we've already reloaded (prevent infinite loops)
      const hasReloaded = sessionStorage.getItem('chunk-load-error-reloaded');

      if (!hasReloaded) {
        // Mark that we're reloading
        sessionStorage.setItem('chunk-load-error-reloaded', 'true');

        // Reload the page to get fresh HTML and chunks
        window.location.reload();
      } else {
        // Already reloaded once, don't loop
        console.error('[ChunkLoadError] Already reloaded once, not reloading again');
        sessionStorage.removeItem('chunk-load-error-reloaded');
      }
    }
  }

  render() {
    if (this.state.hasError) {
      // Show a brief loading message while reloading
      return (
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: '100vh',
            flexDirection: 'column',
            gap: '16px',
            padding: '20px',
            textAlign: 'center',
          }}
        >
          <div style={{ fontSize: '18px', fontWeight: 500 }}>Updating...</div>
          <div style={{ fontSize: '14px', color: '#666' }}>
            Loading the latest version
          </div>
          <button
            onClick={this.handleManualReload}
            style={{
              padding: '10px 16px',
              borderRadius: '8px',
              border: '1px solid #ccc',
              background: '#fff',
              fontSize: '14px',
              cursor: 'pointer',
            }}
          >
            Reload now
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}
