"use client";

export default function CloudRed({ 
  top = "50%", 
  right = null,
  left = null,
  bottom = null,
  width = "400px", 
  height = "400px",
  zIndex = 1000,
  opacity = 1,
  color = "red"
}) {
  const style = {
    position: 'absolute',
    width: width,
    height: height,
    zIndex: zIndex,
    pointerEvents: 'none',
    opacity: opacity,
  };
  
  if (bottom !== null) {
    style.bottom = bottom;
    if (left === "50%") {
      style.transform = 'translateX(-50%) translateY(50%)';
    } else {
      style.transform = 'translateY(50%)';
    }
  } else {
    style.top = top;
    if (left === "50%") {
      style.transform = 'translateX(-50%) translateY(-50%)';
    } else {
      style.transform = 'translateY(-50%)';
    }
  }
  
  if (right !== null) {
    style.right = right;
  }
  if (left !== null && left !== "50%") {
    style.left = left;
  } else if (left === "50%") {
    style.left = left;
  }
  
  const backgroundStyle = color === "black" 
    ? {
        background: "radial-gradient(circle, rgba(0, 0, 0, 0.9) 0%, rgba(0, 0, 0, 0.7) 20%, rgba(0, 0, 0, 0.5) 40%, rgba(0, 0, 0, 0.3) 60%, rgba(0, 0, 0, 0.1) 80%, transparent 100%)",
        borderRadius: "50%",
        filter: "blur(40px)",
      }
    : {};
  
  return (
    <div 
      className="cloud-red"
      style={{...style, ...backgroundStyle}}
    />
  );
}
