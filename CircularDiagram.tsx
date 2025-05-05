"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"

interface SegmentProps {
  id: string
  title: string
  icon: string
  color: string
  description: string
}

const segments: SegmentProps[] = [
  {
    id: "planning",
    title: "Planning",
    icon: "📋",
    color: "#FFCC00", // Yellow
    description: "Define project scope, requirements, and timeline",
  },
  {
    id: "design",
    title: "Design",
    icon: "🎨",
    color: "#FF9933", // Orange
    description: "Create wireframes, mockups, and architecture diagrams",
  },
  {
    id: "development",
    icon: "💻",
    title: "Development",
    color: "#FF5050", // Red
    description: "Write code and implement features",
  },
  {
    id: "testing",
    title: "Testing",
    icon: "🔍",
    color: "#9966CC", // Purple
    description: "Perform unit, integration, and user acceptance testing",
  },
  {
    id: "deployment",
    title: "Deployment",
    icon: "🚀",
    color: "#3366CC", // Blue
    description: "Release the software to production environment",
  },
  {
    id: "maintenance",
    title: "Maintenance",
    icon: "🔧",
    color: "#009999", // Teal
    description: "Monitor, fix bugs, and implement improvements",
  },
  {
    id: "analysis",
    title: "Analysis",
    icon: "📊",
    color: "#66CC33", // Green
    description: "Gather feedback and analyze performance metrics",
  },
]

export default function CircularDiagram() {
  const [activeSegment, setActiveSegment] = useState<string | null>(null)
  const [isAnimating, setIsAnimating] = useState(true)
  const [rotation, setRotation] = useState(0)

  const totalSegments = segments.length
  const segmentAngle = 360 / totalSegments
  const radius = 150
  const centerX = 200
  const centerY = 200
  const innerRadius = 70

  // Auto-rotate animation
  useEffect(() => {
    if (!isAnimating) return

    const interval = setInterval(() => {
      setRotation((prev) => (prev + 1) % 360)
    }, 50)

    return () => clearInterval(interval)
  }, [isAnimating])

  // Calculate SVG path for a segment
  const getSegmentPath = (index: number, isActive: boolean) => {
    const startAngle = index * segmentAngle
    const endAngle = (index + 1) * segmentAngle

    const expandedRadius = isActive ? radius + 10 : radius

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
      anchor: angle > 90 && angle < 270 ? "end" : "start",
      alignmentBaseline: angle > 0 && angle < 180 ? "hanging" : "alphabetic",
    }
  }

  return (
    <div className="w-full max-w-3xl mx-auto">
      <div className="flex flex-col items-center">
        <div className="relative w-[400px] h-[400px]">
          <svg width="400" height="400" viewBox="0 0 400 400">
            <motion.g
              animate={{ rotate: isAnimating ? rotation : 0 }}
              transition={{ type: "tween", ease: "linear" }}
              style={{ transformOrigin: "center" }}
            >
              {segments.map((segment, index) => (
                <g key={segment.id}>
                  <motion.path
                    d={getSegmentPath(index, activeSegment === segment.id)}
                    fill={segment.color}
                    stroke="#fff"
                    strokeWidth={2}
                    whileHover={{ scale: 1.05 }}
                    transition={{ type: "spring", stiffness: 300 }}
                    onClick={() => {
                      setActiveSegment(segment.id)
                      setIsAnimating(false)
                    }}
                    style={{ cursor: "pointer" }}
                  />
                  <motion.text
                    x={getIconPosition(index).x}
                    y={getIconPosition(index).y}
                    textAnchor="middle"
                    dominantBaseline="middle"
                    fill="#fff"
                    fontSize="24"
                    fontWeight="bold"
                    style={{ pointerEvents: "none" }}
                  >
                    {segment.icon}
                  </motion.text>
                </g>
              ))}
            </motion.g>

            {/* Center circle */}
            <circle
              cx={centerX}
              cy={centerY}
              r={innerRadius - 5}
              fill="#fff"
              stroke="#333"
              strokeWidth={2}
              onClick={() => {
                setActiveSegment(null)
                setIsAnimating(true)
              }}
              style={{ cursor: "pointer" }}
            />

            <text
              x={centerX}
              y={centerY - 10}
              textAnchor="middle"
              dominantBaseline="middle"
              fontSize="14"
              fontWeight="bold"
            >
              Software
            </text>
            <text
              x={centerX}
              y={centerY + 10}
              textAnchor="middle"
              dominantBaseline="middle"
              fontSize="14"
              fontWeight="bold"
            >
              Life Cycle
            </text>
          </svg>

          {/* Labels */}
          <div className="absolute inset-0">
            <svg width="400" height="400" viewBox="0 0 400 400">
              {segments.map((segment, index) => (
                <g key={`label-${segment.id}`}>
                  <line
                    x1={getIconPosition(index).x}
                    y1={getIconPosition(index).y}
                    x2={getLabelPosition(index).x}
                    y2={getLabelPosition(index).y}
                    stroke="#333"
                    strokeWidth={1}
                    strokeDasharray="2,2"
                  />
                  <text
                    x={getLabelPosition(index).x}
                    y={getLabelPosition(index).y}
                    textAnchor={getLabelPosition(index).anchor}
                    dominantBaseline={getLabelPosition(index).alignmentBaseline}
                    fontSize="12"
                    fontWeight="bold"
                  >
                    {segment.title}
                  </text>
                </g>
              ))}
            </svg>
          </div>
        </div>

        {/* Description */}
        <div className="mt-8 p-4 bg-gray-100 rounded-lg w-full max-w-md">
          {activeSegment ? (
            <div>
              <h3 className="text-xl font-bold" style={{ color: segments.find((s) => s.id === activeSegment)?.color }}>
                {segments.find((s) => s.id === activeSegment)?.title}
              </h3>
              <p className="mt-2">{segments.find((s) => s.id === activeSegment)?.description}</p>
            </div>
          ) : (
            <div className="text-center">
              <p>Click on a segment to see details</p>
            </div>
          )}
        </div>

        <button
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          onClick={() => {
            setActiveSegment(null)
            setIsAnimating(!isAnimating)
          }}
        >
          {isAnimating ? "Pause Animation" : "Start Animation"}
        </button>
      </div>
    </div>
  )
}
