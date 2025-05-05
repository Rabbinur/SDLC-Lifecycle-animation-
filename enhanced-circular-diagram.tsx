"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"

interface SegmentProps {
  id: string
  title: string
  icon: React.ReactNode
  color: string
  description: string
}

const segments: SegmentProps[] = [
  {
    id: "planning",
    title: "Planning",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
        <path
          fillRule="evenodd"
          d="M7.502 6h7.128A3.375 3.375 0 0118 9.375v9.375a3 3 0 003-3V6.108c0-1.505-1.125-2.811-2.664-2.94a48.972 48.972 0 00-.673-.05A3 3 0 0015 1.5h-1.5a3 3 0 00-2.663 1.618c-.225.015-.45.032-.673.05C8.662 3.295 7.554 4.542 7.502 6zM13.5 3A1.5 1.5 0 0012 4.5h4.5A1.5 1.5 0 0015 3h-1.5z"
          clipRule="evenodd"
        />
        <path
          fillRule="evenodd"
          d="M3 9.375C3 8.339 3.84 7.5 4.875 7.5h9.75c1.036 0 1.875.84 1.875 1.875v11.25c0 1.035-.84 1.875-1.875 1.875h-9.75A1.875 1.875 0 013 20.625V9.375zm9.586 4.594a.75.75 0 00-1.172-.938l-2.476 3.096-.908-.907a.75.75 0 00-1.06 1.06l1.5 1.5a.75.75 0 001.116-.062l3-3.75z"
          clipRule="evenodd"
        />
      </svg>
    ),
    color: "#FFCC00", // Yellow
    description: "Define project scope, requirements, and timeline. Create detailed plans for development phases.",
  },
  {
    id: "design",
    title: "Design",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
        <path d="M21.721 12.752a9.711 9.711 0 00-.945-5.003 12.754 12.754 0 01-4.339 2.708 18.991 18.991 0 01-.214 4.772 17.165 17.165 0 005.498-2.477zM14.634 15.55a17.324 17.324 0 00.332-4.647c-.952.227-1.945.347-2.966.347-1.021 0-2.014-.12-2.966-.347a17.515 17.515 0 00.332 4.647 17.385 17.385 0 005.268 0zM9.772 17.119a18.963 18.963 0 004.456 0A17.182 17.182 0 0112 21.724a17.18 17.18 0 01-2.228-4.605zM7.777 15.23a18.87 18.87 0 01-.214-4.774 12.753 12.753 0 01-4.34-2.708 9.711 9.711 0 00-.944 5.004 17.165 17.165 0 005.498 2.477zM21.356 14.752a9.765 9.765 0 01-7.478 6.817 18.64 18.64 0 001.988-4.718 18.627 18.627 0 005.49-2.098zM2.644 14.752c1.682.971 3.53 1.688 5.49 2.099a18.64 18.64 0 001.988 4.718 9.765 9.765 0 01-7.478-6.816zM13.878 2.43a9.755 9.755 0 016.116 3.986 11.267 11.267 0 01-3.746 2.504 18.63 18.63 0 00-2.37-6.49zM12 2.276a17.152 17.152 0 012.805 7.121c-.897.23-1.837.353-2.805.353-.968 0-1.908-.122-2.805-.353A17.151 17.151 0 0112 2.276zM10.122 2.43a18.629 18.629 0 00-2.37 6.49 11.266 11.266 0 01-3.746-2.504 9.754 9.754 0 016.116-3.985z" />
      </svg>
    ),
    color: "#FF9933", // Orange
    description: "Create wireframes, mockups, and architecture diagrams. Design user interfaces and experiences.",
  },
  {
    id: "development",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
        <path
          fillRule="evenodd"
          d="M14.447 3.027a.75.75 0 01.527.92l-4.5 16.5a.75.75 0 01-1.448-.394l4.5-16.5a.75.75 0 01.921-.526zM16.72 6.22a.75.75 0 011.06 0l5.25 5.25a.75.75 0 010 1.06l-5.25 5.25a.75.75 0 11-1.06-1.06L21.44 12l-4.72-4.72a.75.75 0 010-1.06zm-9.44 0a.75.75 0 010 1.06L2.56 12l4.72 4.72a.75.75 0 11-1.06 1.06L.97 12.53a.75.75 0 010-1.06l5.25-5.25a.75.75 0 011.06 0z"
          clipRule="evenodd"
        />
      </svg>
    ),
    title: "Development",
    color: "#FF5050", // Red
    description: "Write code and implement features. Build the software according to specifications.",
  },
  {
    id: "testing",
    title: "Testing",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
        <path d="M12 .75a8.25 8.25 0 00-4.135 15.39c.686.398 1.115 1.008 1.134 1.623a.75.75 0 00.577.706c.352.083.71.148 1.074.195.323.041.6-.218.6-.544v-4.661a6.714 6.714 0 01-.937-.171.75.75 0 11.374-1.453 5.261 5.261 0 002.626 0 .75.75 0 11.374 1.452 6.712 6.712 0 01-.937.172v4.66c0 .327.277.586.6.545.364-.047.722-.112 1.074-.195a.75.75 0 00.577-.706c.02-.615.448-1.225 1.134-1.623A8.25 8.25 0 0012 .75z" />
        <path
          fillRule="evenodd"
          d="M9.013 19.9a.75.75 0 01.877-.597 11.319 11.319 0 004.22 0 .75.75 0 11.28 1.473 12.819 12.819 0 01-4.78 0 .75.75 0 01-.597-.876zM9.754 22.344a.75.75 0 01.824-.668 13.682 13.682 0 002.844 0 .75.75 0 11.156 1.492 15.156 15.156 0 01-3.156 0 .75.75 0 01-.668-.824z"
          clipRule="evenodd"
        />
      </svg>
    ),
    color: "#9966CC", // Purple
    description: "Perform unit, integration, and user acceptance testing. Identify and fix bugs.",
  },
  {
    id: "deployment",
    title: "Deployment",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
        <path
          fillRule="evenodd"
          d="M9.315 7.584C12.195 3.883 16.695 1.5 21.75 1.5a.75.75 0 01.75.75c0 5.056-2.383 9.555-6.084 12.436A6.75 6.75 0 019.75 22.5a.75.75 0 01-.75-.75v-4.131A15.838 15.838 0 016.382 15H2.25a.75.75 0 01-.75-.75 6.75 6.75 0 017.815-6.666zM15 6.75a2.25 2.25 0 100 4.5 2.25 2.25 0 000-4.5z"
          clipRule="evenodd"
        />
        <path d="M5.26 17.242a.75.75 0 10-.897-1.203 5.243 5.243 0 00-2.05 5.022.75.75 0 00.625.627 5.243 5.243 0 005.022-2.051.75.75 0 10-1.202-.897 3.744 3.744 0 01-3.008 1.51c0-1.23.592-2.323 1.51-3.008z" />
      </svg>
    ),
    color: "#3366CC", // Blue
    description: "Release the software to production environment. Ensure smooth transition to live systems.",
  },
  {
    id: "maintenance",
    title: "Maintenance",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
        <path
          fillRule="evenodd"
          d="M12 6.75a5.25 5.25 0 016.775-5.025.75.75 0 01.313 1.248l-3.32 3.319c.063.475.276.934.641 1.299.365.365.824.578 1.3.64l3.318-3.319a.75.75 0 011.248.313 5.25 5.25 0 01-5.472 6.756c-1.018-.086-1.87.1-2.309.634L7.344 21.3A3.298 3.298 0 112.7 16.657l8.684-7.151c.533-.44.72-1.291.634-2.309A5.342 5.342 0 0112 6.75zM4.117 19.125a.75.75 0 01.75-.75h.008a.75.75 0 01.75.75v.008a.75.75 0 01-.75.75h-.008a.75.75 0 01-.75-.75v-.008z"
          clipRule="evenodd"
        />
      </svg>
    ),
    color: "#009999", // Teal
    description: "Monitor, fix bugs, and implement improvements. Provide ongoing support and updates.",
  },
  {
    id: "analysis",
    title: "Analysis",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
        <path d="M18.375 2.25c-1.035 0-1.875.84-1.875 1.875v15.75c0 1.035.84 1.875 1.875 1.875h.75c1.035 0 1.875-.84 1.875-1.875V4.125c0-1.036-.84-1.875-1.875-1.875h-.75zM9.75 8.625c0-1.036.84-1.875 1.875-1.875h.75c1.036 0 1.875.84 1.875 1.875v11.25c0 1.035-.84 1.875-1.875 1.875h-.75a1.875 1.875 0 01-1.875-1.875V8.625zM3 13.125c0-1.036.84-1.875 1.875-1.875h.75c1.036 0 1.875.84 1.875 1.875v6.75c0 1.035-.84 1.875-1.875 1.875h-.75A1.875 1.875 0 013 19.875v-6.75z" />
      </svg>
    ),
    color: "#66CC33", // Green
    description: "Gather feedback and analyze performance metrics. Identify areas for improvement.",
  },
]

export default function EnhancedCircularDiagram() {
  const [activeSegment, setActiveSegment] = useState<string | null>(null)
  const [isAnimating, setIsAnimating] = useState(true)
  const [rotation, setRotation] = useState(0)
  const [autoRotateSpeed, setAutoRotateSpeed] = useState(1)
  const [highlightedSegment, setHighlightedSegment] = useState<string | null>(null)

  const animationRef = useRef<number | null>(null)
  const lastTimeRef = useRef<number>(0)

  const totalSegments = segments.length
  const segmentAngle = 360 / totalSegments
  const radius = 150
  const centerX = 200
  const centerY = 200
  const innerRadius = 70

  // Auto-rotate animation using requestAnimationFrame for smoother animation
  useEffect(() => {
    if (!isAnimating) {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
      return
    }

    const animate = (time: number) => {
      if (!lastTimeRef.current) {
        lastTimeRef.current = time
      }

      const deltaTime = time - lastTimeRef.current
      lastTimeRef.current = time

      setRotation((prev) => (prev + (autoRotateSpeed * deltaTime) / 50) % 360)
      animationRef.current = requestAnimationFrame(animate)
    }

    animationRef.current = requestAnimationFrame(animate)

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [isAnimating, autoRotateSpeed])

  // Calculate SVG path for a segment
  const getSegmentPath = (index: number, isActive: boolean, isHighlighted: boolean) => {
    const startAngle = index * segmentAngle
    const endAngle = (index + 1) * segmentAngle

    const expandedRadius = isActive ? radius + 15 : isHighlighted ? radius + 8 : radius

    const startRadians = (startAngle - 90) * (Math.PI / 180)
    const endRadians = (endAngle - 90) * (Math.PI / 180)

    const startX = centerX + innerRadius * Math.cos(startRadians)
    const startY = centerY + innerRadius * Math.sin(startRadians)

    const endX = centerX + innerRadius * Math.cos(endRadians)
    const endY = centerY + innerRadius * Math.sin(endRadians)

    const startOuterX = centerX + expandedRadius * Math.cos(startRadians)
    const startOuterY = centerY + expandedRadius * Math.sin(startRadians)

    const endOuterX = centerX + expandedRadius * Math.cos(endRadians)
    const endOuterY = centerY + expandedRadius * Math.sin(endRadians)

    const largeArcFlag = segmentAngle > 180 ? 1 : 0

    return `
      M ${startX} ${startY}
      L ${startOuterX} ${startOuterY}
      A ${expandedRadius} ${expandedRadius} 0 ${largeArcFlag} 1 ${endOuterX} ${endOuterY}
      L ${endX} ${endY}
      A ${innerRadius} ${innerRadius} 0 ${largeArcFlag} 0 ${startX} ${startY}
    `
  }

  // Calculate position for icon
  const getIconPosition = (index: number) => {
    const angle = index * segmentAngle + segmentAngle / 2
    const radians = (angle - 90) * (Math.PI / 180)
    const distance = innerRadius + (radius - innerRadius) / 2

    return {
      x: centerX + distance * Math.cos(radians),
      y: centerY + distance * Math.sin(radians),
    }
  }

  // Calculate position for label
  const getLabelPosition = (index: number) => {
    const angle = index * segmentAngle + segmentAngle / 2
    const radians = (angle - 90) * (Math.PI / 180)
    const distance = radius + 30

    return {
      x: centerX + distance * Math.cos(radians),
      y: centerY + distance * Math.sin(radians),
      angle: angle > 90 && angle < 270 ? angle + 180 : angle,
      anchor: angle > 90 && angle < 270 ? "end" : "start",
      alignmentBaseline: angle > 0 && angle < 180 ? "hanging" : "alphabetic",
    }
  }

  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="flex flex-col items-center">
        <div className="relative w-[400px] h-[400px]">
          <svg width="400" height="400" viewBox="0 0 400 400">
            <defs>
              <filter id="glow" x="-30%" y="-30%" width="160%" height="160%">
                <feGaussianBlur stdDeviation="5" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
              </filter>
            </defs>

            <motion.g animate={{ rotate: isAnimating ? rotation : 0 }} style={{ transformOrigin: "center" }}>
              {segments.map((segment, index) => {
                const isActive = activeSegment === segment.id
                const isHighlighted = highlightedSegment === segment.id

                return (
                  <g key={segment.id}>
                    <motion.path
                      d={getSegmentPath(index, isActive, isHighlighted)}
                      fill={segment.color}
                      stroke="#fff"
                      strokeWidth={2}
                      filter={isActive || isHighlighted ? "url(#glow)" : "none"}
                      whileHover={{ scale: 1.05 }}
                      transition={{ type: "spring", stiffness: 300 }}
                      onClick={() => {
                        setActiveSegment(segment.id)
                        setIsAnimating(false)
                      }}
                      onMouseEnter={() => setHighlightedSegment(segment.id)}
                      onMouseLeave={() => setHighlightedSegment(null)}
                      style={{ cursor: "pointer" }}
                    />
                    <motion.g
                      animate={{
                        scale: isActive ? 1.2 : isHighlighted ? 1.1 : 1,
                        opacity: isActive || isHighlighted ? 1 : 0.9,
                      }}
                      style={{
                        color: "#fff",
                        transformOrigin: `${getIconPosition(index).x}px ${getIconPosition(index).y}px`,
                      }}
                    >
                      <foreignObject
                        x={getIconPosition(index).x - 12}
                        y={getIconPosition(index).y - 12}
                        width="24"
                        height="24"
                        style={{ pointerEvents: "none" }}
                      >
                        <div className="flex items-center justify-center w-full h-full">{segment.icon}</div>
                      </foreignObject>
                    </motion.g>
                  </g>
                )
              })}
            </motion.g>

            {/* Center circle */}
            <motion.circle
              cx={centerX}
              cy={centerY}
              r={innerRadius - 5}
              fill="#fff"
              stroke="#333"
              strokeWidth={2}
              whileHover={{ scale: 1.05 }}
              onClick={() => {
                setActiveSegment(null)
                setIsAnimating(true)
              }}
              style={{ cursor: "pointer" }}
            />

            <text
              x={centerX}
              y={centerY - 15}
              textAnchor="middle"
              dominantBaseline="middle"
              fontSize="16"
              fontWeight="bold"
            >
              Software
            </text>
            <text
              x={centerX}
              y={centerY + 5}
              textAnchor="middle"
              dominantBaseline="middle"
              fontSize="16"
              fontWeight="bold"
            >
              Developer
            </text>
            <text
              x={centerX}
              y={centerY + 25}
              textAnchor="middle"
              dominantBaseline="middle"
              fontSize="16"
              fontWeight="bold"
            >
              Life Cycle
            </text>
          </svg>

          {/* Labels */}
          <div className="absolute inset-0 pointer-events-none">
            <svg width="400" height="400" viewBox="0 0 400 400">
              {segments.map((segment, index) => {
                const labelPos = getLabelPosition(index)
                return (
                  <g key={`label-${segment.id}`}>
                    <line
                      x1={getIconPosition(index).x}
                      y1={getIconPosition(index).y}
                      x2={labelPos.x}
                      y2={labelPos.y}
                      stroke="#333"
                      strokeWidth={1}
                      strokeDasharray="2,2"
                    />
                    <g transform={`translate(${labelPos.x}, ${labelPos.y}) rotate(${labelPos.angle})`}>
                      <text
                        x={0}
                        y={0}
                        textAnchor="middle"
                        dominantBaseline="middle"
                        fontSize="12"
                        fontWeight="bold"
                        transform={`rotate(${labelPos.angle > 90 && labelPos.angle < 270 ? 180 : 0})`}
                        style={{ fill: segment.color }}
                      >
                        {segment.title}
                      </text>
                    </g>
                  </g>
                )
              })}
            </svg>
          </div>
        </div>

        {/* Description */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeSegment || "default"}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="mt-8 p-6 bg-white rounded-lg shadow-lg w-full max-w-md"
          >
            {activeSegment ? (
              <div>
                <h3
                  className="text-xl font-bold flex items-center gap-2"
                  style={{ color: segments.find((s) => s.id === activeSegment)?.color }}
                >
                  <span
                    className="text-white p-1 rounded-full"
                    style={{ backgroundColor: segments.find((s) => s.id === activeSegment)?.color }}
                  >
                    {segments.find((s) => s.id === activeSegment)?.icon}
                  </span>
                  {segments.find((s) => s.id === activeSegment)?.title}
                </h3>
                <p className="mt-3 text-gray-700">{segments.find((s) => s.id === activeSegment)?.description}</p>
              </div>
            ) : (
              <div className="text-center">
                <p className="text-gray-600">Click on a segment to see details about that phase</p>
                <p className="mt-2 text-sm text-gray-500">
                  The software development life cycle represents the process used to build software applications from
                  initial planning through maintenance.
                </p>
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        <div className="mt-6 flex flex-wrap gap-4 justify-center">
          <button
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
            onClick={() => {
              setActiveSegment(null)
              setIsAnimating(!isAnimating)
            }}
          >
            {isAnimating ? "Pause Animation" : "Start Animation"}
          </button>

          {isAnimating && (
            <div className="flex items-center gap-2">
              <label className="text-sm text-gray-700">Speed:</label>
              <input
                type="range"
                min="0.2"
                max="3"
                step="0.1"
                value={autoRotateSpeed}
                onChange={(e) => setAutoRotateSpeed(Number.parseFloat(e.target.value))}
                className="w-32"
              />
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
