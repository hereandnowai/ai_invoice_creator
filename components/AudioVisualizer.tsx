
import React, { useEffect, useRef } from 'react';

interface AudioVisualizerProps {
  stream: MediaStream | null;
  barColor?: string;
  backgroundColor?: string;
}

export const AudioVisualizer: React.FC<AudioVisualizerProps> = ({ 
  stream, 
  barColor = '#FFDF00', 
  backgroundColor = 'transparent' 
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const sourceRef = useRef<MediaStreamAudioSourceNode | null>(null);
  const animationFrameIdRef = useRef<number | null>(null);
  const dataArrayRef = useRef<Uint8Array | null>(null);

  useEffect(() => {
    if (stream && canvasRef.current) {
      const canvas = canvasRef.current;
      const canvasCtx = canvas.getContext('2d');

      if (!canvasCtx) return;

      // Resize canvas to match its display size for crisp rendering
      const rect = canvas.getBoundingClientRect();
      if (canvas.width !== rect.width || canvas.height !== rect.height) {
        canvas.width = rect.width;
        canvas.height = rect.height;
      }

      if (!audioContextRef.current) {
        audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
      }
      const audioContext = audioContextRef.current;

      if (!analyserRef.current) {
        analyserRef.current = audioContext.createAnalyser();
      }
      const analyser = analyserRef.current;
      analyser.fftSize = 256; 
      const bufferLength = analyser.frequencyBinCount; // This will be 128
      dataArrayRef.current = new Uint8Array(bufferLength);

      if (sourceRef.current) {
        sourceRef.current.disconnect(); 
      }
      sourceRef.current = audioContext.createMediaStreamSource(stream);
      sourceRef.current.connect(analyser);
      
      const draw = () => {
        if (!analyserRef.current || !dataArrayRef.current || !canvasRef.current || !canvasCtx) {
          return;
        }
        
        analyserRef.current.getByteFrequencyData(dataArrayRef.current);

        canvasCtx.fillStyle = backgroundColor;
        canvasCtx.fillRect(0, 0, canvas.width, canvas.height);

        canvasCtx.lineWidth = 3; 
        canvasCtx.strokeStyle = barColor;
        canvasCtx.lineCap = 'round'; 
        canvasCtx.lineJoin = 'round'; 

        // Glow effect for a "melting" look
        canvasCtx.shadowBlur = 6; 
        canvasCtx.shadowColor = barColor;

        canvasCtx.beginPath();

        const sliceWidth = canvas.width / bufferLength;
        let x = 0;

        for (let i = 0; i < bufferLength; i++) {
          // Scale barHeight, ensuring it doesn't exceed canvas height and provides good visual dynamics
          // dataArrayRef.current[i] is 0-255. Division by 2.0-3.0 is usually good.
          const barHeight = (dataArrayRef.current[i] / 2.5) * (canvas.height / 128); // Scale relative to canvas height
          const y = canvas.height - Math.min(barHeight, canvas.height); // Ensure y is within canvas

          if (i === 0) {
            canvasCtx.moveTo(x, y);
          } else {
            canvasCtx.lineTo(x, y);
          }
          x += sliceWidth;
        }
        
        // Optionally, ensure the line ends at the canvas edge if x hasn't reached it
        // canvasCtx.lineTo(canvas.width, canvas.height - (dataArrayRef.current[bufferLength-1] / 2.5));


        canvasCtx.stroke();

        // Reset shadow after drawing so it doesn't affect other things (if any)
        canvasCtx.shadowBlur = 0;

        animationFrameIdRef.current = requestAnimationFrame(draw);
      };

      draw();

    } else {
      // Cleanup when stream is removed
      if (animationFrameIdRef.current) {
        cancelAnimationFrame(animationFrameIdRef.current);
        animationFrameIdRef.current = null;
      }
      if (canvasRef.current) {
        const canvasCtx = canvasRef.current.getContext('2d');
        if (canvasCtx) {
            canvasCtx.clearRect(0,0, canvasRef.current.width, canvasRef.current.height);
        }
      }
    }

    return () => {
      if (animationFrameIdRef.current) {
        cancelAnimationFrame(animationFrameIdRef.current);
      }
      sourceRef.current?.disconnect();
      // analyserRef.current?.disconnect(); // Analyser is not connected to a destination
      // audioContextRef.current?.close(); // Avoid closing context if it might be shared or reused.
                                       // For this app, it's safer to leave open.
    };
  }, [stream, barColor, backgroundColor]);

  return (
    <canvas 
        ref={canvasRef} 
        style={{ width: '100%', height: '100%', display: 'block' }}
        // width/height attributes are set in useEffect now
    />
  );
};
