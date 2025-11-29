"use client"

import { useEffect, useRef, useState, useCallback } from "react"
import { Maximize2, X, RotateCcw, ZoomIn, ZoomOut } from "lucide-react"
import { Button } from "@/components/ui/button"
import * as THREE from "three"

interface Room360ViewerProps {
  panoramaUrl: string
  roomName: string
}

export function Room360Viewer({ panoramaUrl, roomName }: Room360ViewerProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null)
  const sceneRef = useRef<THREE.Scene | null>(null)
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null)
  const sphereRef = useRef<THREE.Mesh | null>(null)
  const animationFrameRef = useRef<number | undefined>(undefined)

  const isDragging = useRef(false)
  const previousMousePosition = useRef({ x: 0, y: 0 })
  const sphereRotation = useRef({ x: 0, y: 0 })

  const [isFullscreen, setIsFullscreen] = useState(false)
  const [fov, setFov] = useState(75)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if (!containerRef.current) return

    const container = containerRef.current
    const width = container.clientWidth
    const height = container.clientHeight

    const scene = new THREE.Scene()
    scene.background = new THREE.Color(0x1a0a10)
    sceneRef.current = scene

    const camera = new THREE.PerspectiveCamera(fov, width / height, 0.1, 1000)
    camera.position.set(0, 0, 0.1) // Slightly offset to avoid rendering issues
    cameraRef.current = camera

    // Renderer setup
    const renderer = new THREE.WebGLRenderer({ antialias: true })
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.setSize(width, height)
    container.appendChild(renderer.domElement)
    rendererRef.current = renderer

    const geometry = new THREE.SphereGeometry(500, 64, 32)
    // Flip the geometry inside out so texture renders on inside
    geometry.scale(-1, 1, 1)

    // Load panorama texture with proper settings for equirectangular
    const textureLoader = new THREE.TextureLoader()
    setIsLoading(true)

    const texture = textureLoader.load(
      panoramaUrl,
      () => {
        setIsLoading(false)
      },
      undefined,
      (error) => {
        console.error("Error loading panorama:", error)
        setIsLoading(false)
      },
    )

    texture.colorSpace = THREE.SRGBColorSpace
    texture.minFilter = THREE.LinearFilter
    texture.magFilter = THREE.LinearFilter
    texture.mapping = THREE.EquirectangularReflectionMapping

    const material = new THREE.MeshBasicMaterial({
      map: texture,
      side: THREE.BackSide, // Render inside of sphere
    })

    const sphere = new THREE.Mesh(geometry, material)
    sphereRef.current = sphere
    scene.add(sphere)

    const onPointerDown = (event: PointerEvent) => {
      isDragging.current = true
      previousMousePosition.current = { x: event.clientX, y: event.clientY }
      container.style.cursor = "grabbing"
    }

    const onPointerMove = (event: PointerEvent) => {
      if (!isDragging.current) return

      const deltaX = event.clientX - previousMousePosition.current.x
      const deltaY = event.clientY - previousMousePosition.current.y

      sphereRotation.current.y += deltaX * 0.005
      sphereRotation.current.x += deltaY * 0.005

      // Limit vertical rotation to prevent flipping
      sphereRotation.current.x = Math.max(-Math.PI / 2 + 0.1, Math.min(Math.PI / 2 - 0.1, sphereRotation.current.x))

      if (sphereRef.current) {
        sphereRef.current.rotation.y = sphereRotation.current.y
        sphereRef.current.rotation.x = sphereRotation.current.x
      }

      previousMousePosition.current = { x: event.clientX, y: event.clientY }
    }

    const onPointerUp = () => {
      isDragging.current = false
      container.style.cursor = "grab"
    }

    const onPointerLeave = () => {
      isDragging.current = false
      container.style.cursor = "grab"
    }

    const onWheel = (event: WheelEvent) => {
      event.preventDefault()
      const newFov = camera.fov + event.deltaY * 0.05
      camera.fov = THREE.MathUtils.clamp(newFov, 30, 100)
      camera.updateProjectionMatrix()
      setFov(camera.fov)
    }

    // Touch events for mobile
    const onTouchStart = (event: TouchEvent) => {
      if (event.touches.length === 1) {
        isDragging.current = true
        previousMousePosition.current = {
          x: event.touches[0].clientX,
          y: event.touches[0].clientY,
        }
      }
    }

    const onTouchMove = (event: TouchEvent) => {
      if (!isDragging.current || event.touches.length !== 1) return
      event.preventDefault()

      const deltaX = event.touches[0].clientX - previousMousePosition.current.x
      const deltaY = event.touches[0].clientY - previousMousePosition.current.y

      sphereRotation.current.y += deltaX * 0.005
      sphereRotation.current.x += deltaY * 0.005
      sphereRotation.current.x = Math.max(-Math.PI / 2 + 0.1, Math.min(Math.PI / 2 - 0.1, sphereRotation.current.x))

      if (sphereRef.current) {
        sphereRef.current.rotation.y = sphereRotation.current.y
        sphereRef.current.rotation.x = sphereRotation.current.x
      }

      previousMousePosition.current = {
        x: event.touches[0].clientX,
        y: event.touches[0].clientY,
      }
    }

    const onTouchEnd = () => {
      isDragging.current = false
    }

    // Add event listeners
    container.addEventListener("pointerdown", onPointerDown)
    container.addEventListener("pointermove", onPointerMove)
    container.addEventListener("pointerup", onPointerUp)
    container.addEventListener("pointerleave", onPointerLeave)
    container.addEventListener("wheel", onWheel, { passive: false })
    container.addEventListener("touchstart", onTouchStart, { passive: false })
    container.addEventListener("touchmove", onTouchMove, { passive: false })
    container.addEventListener("touchend", onTouchEnd)

    // Animation loop
    const animate = () => {
      animationFrameRef.current = requestAnimationFrame(animate)
      renderer.render(scene, camera)
    }

    animate()

    // Handle resize
    const handleResize = () => {
      const newWidth = container.clientWidth
      const newHeight = container.clientHeight
      camera.aspect = newWidth / newHeight
      camera.updateProjectionMatrix()
      renderer.setSize(newWidth, newHeight)
    }

    window.addEventListener("resize", handleResize)

    // Cleanup
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
      }
      container.removeEventListener("pointerdown", onPointerDown)
      container.removeEventListener("pointermove", onPointerMove)
      container.removeEventListener("pointerup", onPointerUp)
      container.removeEventListener("pointerleave", onPointerLeave)
      container.removeEventListener("wheel", onWheel)
      container.removeEventListener("touchstart", onTouchStart)
      container.removeEventListener("touchmove", onTouchMove)
      container.removeEventListener("touchend", onTouchEnd)
      window.removeEventListener("resize", handleResize)

      renderer.dispose()
      geometry.dispose()
      material.dispose()
      texture.dispose()

      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement)
      }
    }
  }, [panoramaUrl, fov])

  // Update FOV when changed externally
  useEffect(() => {
    if (cameraRef.current) {
      cameraRef.current.fov = fov
      cameraRef.current.updateProjectionMatrix()
    }
  }, [fov])

  const handleZoomIn = () => {
    setFov((prev) => Math.max(30, prev - 10))
  }

  const handleZoomOut = () => {
    setFov((prev) => Math.min(100, prev + 10))
  }

  const handleReset = useCallback(() => {
    sphereRotation.current = { x: 0, y: 0 }
    if (sphereRef.current) {
      sphereRef.current.rotation.x = 0
      sphereRef.current.rotation.y = 0
    }
    setFov(75)
  }, [])

  const viewerContent = (
    <div
      ref={containerRef}
      className={`relative overflow-hidden rounded-lg bg-[#1a0a10] cursor-grab ${
        isFullscreen ? "w-full h-full" : "aspect-[16/9]"
      }`}
      style={{ touchAction: "none" }}
    >
      {/* Loading indicator */}
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-[#1a0a10] z-20">
          <div className="flex flex-col items-center gap-3">
            <div className="w-10 h-10 border-4 border-[#D4AF37] border-t-transparent rounded-full animate-spin" />
            <p className="text-[#F5E6C8] text-sm">Loading 360° View...</p>
          </div>
        </div>
      )}

      {/* Controls */}
      <div className="absolute top-4 right-4 flex gap-2 z-10">
        <Button
          size="icon"
          variant="secondary"
          className="bg-[#5C0A1E]/80 hover:bg-[#8B1538] text-[#F5E6C8] backdrop-blur-sm"
          onClick={handleZoomIn}
        >
          <ZoomIn className="w-4 h-4" />
        </Button>
        <Button
          size="icon"
          variant="secondary"
          className="bg-[#5C0A1E]/80 hover:bg-[#8B1538] text-[#F5E6C8] backdrop-blur-sm"
          onClick={handleZoomOut}
        >
          <ZoomOut className="w-4 h-4" />
        </Button>
        <Button
          size="icon"
          variant="secondary"
          className="bg-[#5C0A1E]/80 hover:bg-[#8B1538] text-[#F5E6C8] backdrop-blur-sm"
          onClick={handleReset}
        >
          <RotateCcw className="w-4 h-4" />
        </Button>
        <Button
          size="icon"
          variant="secondary"
          className="bg-[#5C0A1E]/80 hover:bg-[#8B1538] text-[#F5E6C8] backdrop-blur-sm"
          onClick={() => setIsFullscreen(!isFullscreen)}
        >
          {isFullscreen ? <X className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
        </Button>
      </div>

      {/* Instructions */}
      <div className="absolute top-4 left-4 bg-[#5C0A1E]/80 backdrop-blur-sm px-3 py-2 rounded-lg z-10">
        <p className="text-[#F5E6C8] text-xs">Drag to look around 360° • Scroll to zoom</p>
      </div>

      {/* Room name */}
      <div className="absolute bottom-4 left-4 bg-[#5C0A1E]/80 backdrop-blur-sm px-4 py-2 rounded-lg z-10">
        <p className="text-[#D4AF37] text-sm font-medium">{roomName}</p>
      </div>

      {/* FOV indicator */}
      <div className="absolute bottom-4 right-4 bg-[#5C0A1E]/80 backdrop-blur-sm px-3 py-2 rounded-lg z-10">
        <p className="text-[#F5E6C8] text-xs">FOV: {Math.round(fov)}°</p>
      </div>
    </div>
  )

  if (isFullscreen) {
    return <div className="fixed inset-0 z-50 bg-black flex items-center justify-center">{viewerContent}</div>
  }

  return viewerContent
}