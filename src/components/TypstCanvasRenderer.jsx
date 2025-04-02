// src/components/TypstCanvasRenderer.jsx
import React, { useRef, useEffect, useState } from 'react';
import { createTypstCompiler, createTypstRenderer } from '@myriaddreamin/typst.ts';

const TypstCanvasRenderer = ({ typstContent, width = 800, height = 600 }) => {
  const canvasRef = useRef(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState(null);
  const [compiler, setCompiler] = useState(null);
  const [renderer, setRenderer] = useState(null);

  // Initialize the typst compiler/renderer
  useEffect(() => {
    const initTypst = async () => {
      try {
        // Create compiler and renderer instances with CDN paths
        const compilerInstance = await createTypstCompiler({
          getModule: () => 'https://cdn.jsdelivr.net/npm/@myriaddreamin/typst-ts-web-compiler/pkg/typst_ts_web_compiler_bg.wasm',
        });
        
        const rendererInstance = await createTypstRenderer({
          getModule: () => 'https://cdn.jsdelivr.net/npm/@myriaddreamin/typst-ts-renderer/pkg/typst_ts_renderer_bg.wasm',
        });
        
        setCompiler(compilerInstance);
        setRenderer(rendererInstance);
        setIsLoaded(true);
      } catch (err) {
        console.error('Failed to initialize Typst:', err);
        setError('Failed to initialize Typst renderer');
      }
    };

    initTypst();
  }, []);

  // Render the content to canvas
  useEffect(() => {
    if (!isLoaded || !canvasRef.current || !typstContent || !compiler || !renderer) return;

    const renderToCanvas = async () => {
      try {
        // Compile the Typst content
        const artifact = await compiler.compile({
          mainContent: typstContent,
        });
        
        // Render to canvas
        await renderer.render({
          artifact,
          container: canvasRef.current,
          backgroundColor: '#ffffff',
        });
        
        setError(null);
      } catch (err) {
        console.error('Error rendering Typst document:', err);
        setError('Error rendering document. Check your Typst syntax.');
      }
    };

    renderToCanvas();
  }, [typstContent, isLoaded, compiler, renderer]);

  if (error) {
    return (
      <div className="typst-canvas-error">
        <p>{error}</p>
        <canvas ref={canvasRef} width={width} height={height} style={{ display: 'none' }} />
      </div>
    );
  }

  return (
    <div className="typst-canvas-container">
      {!isLoaded && <div className="typst-loading">Loading Typst renderer...</div>}
      <canvas 
        ref={canvasRef} 
        width={width} 
        height={height} 
        style={{ width: '100%', height: 'auto', display: isLoaded ? 'block' : 'none' }}
      />
    </div>
  );
};

export default TypstCanvasRenderer;